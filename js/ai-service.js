/* ============================================================
   ai-service.js — Module gọi AI qua Cloudflare Worker Proxy
   Lịch Việt Nam 888
   Phụ thuộc: config.js (load trước)
   KHÔNG gọi trực tiếp Google API — tất cả qua Worker proxy
   Worker URL: https://tuvi888-api.miphan888.workers.dev
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

  /* ---- Xây dựng request body gửi đến Worker proxy ---- */
  function _buildRequestBody(systemPrompt, userMessage) {
    /* Worker nhận format này, tự thêm API key rồi forward đến Gemini */
    var body = {
      model: APP_CONFIG.GEMINI_MODEL,
      contents: [
        {
          parts: [{ text: userMessage }]
        }
      ],
      generationConfig: {
        temperature: APP_CONFIG.AI_TEMPERATURE,
        maxOutputTokens: APP_CONFIG.AI_MAX_TOKENS,
        topP: 0.8,
        topK: 40
      }
    };

    /* Nếu có system prompt, thêm vào dạng system_instruction */
    if (systemPrompt) {
      body.system_instruction = {
        parts: [{ text: systemPrompt }]
      };
    }

    return body;
  }

  /* ---- Gọi Worker proxy với retry khi gặp 429 ---- */
  function _callWorkerAPI(systemPrompt, userMessage, retryCount) {
    retryCount = retryCount || 0;

    var workerURL = APP_CONFIG.AI_PROXY_URL;
    var body = _buildRequestBody(systemPrompt, userMessage);

    return fetch(workerURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(function(response) {
      /* Rate limit — đợi 2 giây rồi thử lại 1 lần */
      if (response.status === 429) {
        if (retryCount < APP_CONFIG.AI_RETRY_COUNT) {
          return new Promise(function(resolve) {
            setTimeout(function() {
              resolve(_callWorkerAPI(systemPrompt, userMessage, retryCount + 1));
            }, APP_CONFIG.AI_RETRY_DELAY);
          });
        }
        throw new Error('RATE_LIMIT');
      }

      /* Lỗi hệ thống Worker hoặc Gemini */
      if (response.status === 500) {
        throw new Error('SERVER_ERROR');
      }

      if (!response.ok) {
        throw new Error('HTTP_ERROR_' + response.status);
      }

      return response.json();
    })
    .then(function(data) {
      /* Xử lý response format Gemini trả về từ Worker */
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

    /* Trả kết quả từ cache nếu còn hiệu lực */
    if (useCache && _isCacheValid(_cache[cacheKey])) {
      return Promise.resolve(_cache[cacheKey].value);
    }

    /* Không gọi trùng — nếu đang pending thì trả promise đó */
    if (_pendingRequests[cacheKey]) {
      return _pendingRequests[cacheKey];
    }

    var promise = _callWorkerAPI(systemPrompt, userMessage)
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

  /* ---- Xử lý lỗi hiển thị thân thiện cho user ---- */
  function getErrorMessage(err) {
    var msg = err ? (err.message || String(err)) : '';

    if (msg === 'RATE_LIMIT') {
      return '⏳ AI đang bận, vui lòng thử lại sau ít giây.';
    }
    if (msg === 'SERVER_ERROR') {
      return '⚙️ Lỗi hệ thống AI. Vui lòng thử lại sau.';
    }
    if (msg === 'SAFETY_BLOCK') {
      return '🔒 Nội dung bị lọc. Vui lòng thử lại với yêu cầu khác.';
    }
    if (msg === 'NO_CANDIDATES' || msg === 'EMPTY_RESPONSE') {
      return '😕 AI không tạo được kết quả. Vui lòng thử lại.';
    }
    if (msg.indexOf('HTTP_ERROR') === 0) {
      var code = msg.replace('HTTP_ERROR_', '');
      return '🌐 Lỗi kết nối (mã ' + code + '). Kiểm tra lại kết nối mạng.';
    }
    if (msg.indexOf('Failed to fetch') > -1 || msg.indexOf('NetworkError') > -1) {
      return '🌐 Không thể kết nối. Kiểm tra lại internet.';
    }

    return '❌ Lỗi không xác định: ' + msg;
  }

  /* ---- Xóa cache ---- */
  function clearCache() {
    _cache = {};
  }

  /* ---- Luôn configured vì dùng Worker proxy (không cần API key ở client) ---- */
  function isConfigured() {
    return true;
  }

  /* ---- Public API ---- */
  return {
    ask: ask,
    getErrorMessage: getErrorMessage,
    clearCache: clearCache,
    isConfigured: isConfigured
  };
})();
