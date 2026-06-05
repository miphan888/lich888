/* ============================================================
   ai-service.js — Module gọi Gemini API dùng chung
   Lịch Việt Nam 888
   Phụ thuộc: config.js (load trước)
   ============================================================ */

var AIService = (function() {
  'use strict';

  /* ---- Cache lưu kết quả đã gọi ---- */
  var _cache = {};
  var _pendingRequests = {};

  /* ---- Tạo cache key từ prompt ---- */
  function _makeKey(systemPrompt, userMessage) {
    var combined = (systemPrompt || '') + '|||' + (userMessage || '');
    var hash = 0;
    for (var i = 0; i < combined.length; i++) {
      var chr = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return 'ai_' + Math.abs(hash).toString(36);
  }

  /* ---- Kiểm tra cache còn hiệu lực ---- */
  function _isCacheValid(entry) {
    if (!entry) return false;
    var age = Date.now() - entry.timestamp;
    return age < APP_CONFIG.AI_CACHE_TTL;
  }

  /* ---- Xây dựng request body cho Gemini ---- */
  function _buildRequestBody(systemPrompt, userMessage) {
    var parts = [];

    if (systemPrompt) {
      parts.push({
        text: 'HƯỚNG DẪN HỆ THỐNG:\n' + systemPrompt + '\n\n---\n\nYÊU CẦU:\n' + userMessage
      });
    } else {
      parts.push({ text: userMessage });
    }

    return {
      contents: [{
        role: 'user',
        parts: parts
      }],
      generationConfig: {
        temperature: APP_CONFIG.AI_TEMPERATURE,
        maxOutputTokens: APP_CONFIG.AI_MAX_TOKENS,
        topP: 0.8,
        topK: 40
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
      ]
    };
  }

  /* ---- Gọi Gemini API với retry ---- */
  function _callGeminiAPI(systemPrompt, userMessage, retryCount) {
    retryCount = retryCount || 0;

    /* Lấy key từ APP_CONFIG (đã được tổng hợp từ api-key.js) */
    var apiKey = APP_CONFIG.GEMINI_API_KEY;

    /* Kiểm tra key */
    if (!apiKey || apiKey === '' || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      return Promise.reject(new Error('API_KEY_NOT_SET'));
    }

    var model = APP_CONFIG.GEMINI_MODEL;
    var url   = APP_CONFIG.GEMINI_ENDPOINT + model + ':generateContent?key=' + apiKey;
    var body  = _buildRequestBody(systemPrompt, userMessage);

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(function(response) {
      /* Rate limit — thử lại sau delay */
      if (response.status === 429) {
        if (retryCount < APP_CONFIG.AI_RETRY_COUNT) {
          return new Promise(function(resolve) {
            setTimeout(function() {
              resolve(_callGeminiAPI(systemPrompt, userMessage, retryCount + 1));
            }, APP_CONFIG.AI_RETRY_DELAY * (retryCount + 1));
          });
        }
        throw new Error('RATE_LIMIT');
      }

      /* API key không hợp lệ hoặc đã bị vô hiệu hóa */
      if (response.status === 401 || response.status === 403) {
        throw new Error('API_KEY_INVALID');
      }

      if (!response.ok) {
        throw new Error('HTTP_ERROR_' + response.status);
      }

      return response.json();
    })
    .then(function(data) {
      if (!data.candidates || !data.candidates.length) {
        throw new Error('NO_CANDIDATES');
      }

      var candidate = data.candidates[0];

      if (candidate.finishReason === 'SAFETY') {
        throw new Error('SAFETY_BLOCK');
      }

      if (!candidate.content || !candidate.content.parts || !candidate.content.parts.length) {
        throw new Error('EMPTY_RESPONSE');
      }

      var text = candidate.content.parts
        .filter(function(p) { return p.text; })
        .map(function(p) { return p.text; })
        .join('\n');

      return text.trim();
    });
  }

  /* ---- Hàm public chính: gọi AI ---- */
  function ask(systemPrompt, userMessage, options) {
    options  = options  || {};
    var useCache = options.cache !== false;

    var cacheKey = _makeKey(systemPrompt, userMessage);

    if (useCache && _isCacheValid(_cache[cacheKey])) {
      return Promise.resolve(_cache[cacheKey].value);
    }

    if (_pendingRequests[cacheKey]) {
      return _pendingRequests[cacheKey];
    }

    var promise = _callGeminiAPI(systemPrompt, userMessage)
      .then(function(result) {
        if (useCache) {
          _cache[cacheKey] = { value: result, timestamp: Date.now() };
        }
        delete _pendingRequests[cacheKey];
        return result;
      })
      .catch(function(err) {
        delete _pendingRequests[cacheKey];
        throw err;
      });

    _pendingRequests[cacheKey] = promise;
    return promise;
  }

  /* ---- Xử lý lỗi hiển thị cho user ---- */
  function getErrorMessage(err) {
    var msg = err ? (err.message || String(err)) : '';

    if (msg === 'API_KEY_NOT_SET') {
      return '⚠️ Chưa có API Key. Tạo file <strong>js/api-key.js</strong> với nội dung:<br><code>var GEMINI_KEY = \'your-key\';</code><br>Lấy key tại <a href="https://aistudio.google.com/apikey" target="_blank">aistudio.google.com/apikey</a>';
    }
    if (msg === 'API_KEY_INVALID') {
      return '🔑 API key không hợp lệ hoặc đã bị vô hiệu hóa. Tạo key mới tại <a href="https://aistudio.google.com/apikey" target="_blank">aistudio.google.com/apikey</a> và cập nhật file js/api-key.js.';
    }
    if (msg === 'RATE_LIMIT') {
      return '⏳ Đang bận xử lý nhiều yêu cầu. Vui lòng thử lại sau ít giây.';
    }
    if (msg === 'SAFETY_BLOCK') {
      return '🔒 Nội dung bị chặn bởi bộ lọc an toàn. Vui lòng thử lại với yêu cầu khác.';
    }
    if (msg === 'NO_CANDIDATES' || msg === 'EMPTY_RESPONSE') {
      return '😕 AI không tạo được kết quả. Vui lòng thử lại.';
    }
    if (msg.indexOf('HTTP_ERROR') === 0) {
      var code = msg.replace('HTTP_ERROR_', '');
      return '🌐 Lỗi kết nối mạng (mã ' + code + '). Vui lòng kiểm tra internet.';
    }
    if (msg.indexOf('Failed to fetch') > -1 || msg.indexOf('NetworkError') > -1) {
      return '🌐 Không thể kết nối internet. Vui lòng kiểm tra mạng.';
    }

    return '❌ Lỗi không xác định: ' + msg;
  }

  /* ---- Xóa cache ---- */
  function clearCache() {
    _cache = {};
  }

  /* ---- Kiểm tra API key đã được cấu hình chưa ---- */
  function isConfigured() {
    var key = APP_CONFIG.GEMINI_API_KEY;
    return key && key !== '' && key !== 'YOUR_GEMINI_API_KEY_HERE' && key.length > 10;
  }

  /* ---- Public API ---- */
  return {
    ask: ask,
    getErrorMessage: getErrorMessage,
    clearCache: clearCache,
    isConfigured: isConfigured
  };
})();
