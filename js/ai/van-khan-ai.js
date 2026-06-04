/* ============================================================
   van-khan-ai.js — Module AI cho chức năng tìm / tạo văn khấn
   Lịch Việt Nam 888
   ============================================================ */

var VanKhanAI = (function() {
  'use strict';

  /* ============================================================
     SYSTEM PROMPT — Chuyên gia văn khấn truyền thống Việt Nam
     ============================================================ */
  var SYSTEM_PROMPT =
    'Bạn là chuyên gia văn khấn truyền thống Việt Nam. ' +
    'Soạn văn khấn CHÍNH THỐNG theo cấu trúc chuẩn: ' +
    'Nam mô A Di Đà Phật (3 lần), Lạy các vị thần Phật, Tín chủ xưng danh, ' +
    'Trình thưa lý do, Cầu xin phù hộ, Kết (Chúng con lễ bạc tâm thành...). ' +
    'Ngôn từ trang trọng, thành kính, đúng phong tục Việt Nam. ' +
    'Dùng các placeholder sau trong nội dung bài khấn: ' +
    '{{tenChuNha}}, {{diaChi}}, {{ngayAmLich}}, {{tenVoSuffix}}. ' +
    'Chỉ dùng các field sau trong requiredFields và optionalFields: ' +
    'tenChuNha, diaChi, ngayDuong, tenVo, tenOngBa, moiQuanHe, tenCon, ' +
    'tenCuaHang, tenChua, bienSoXe, diaChiMoi, tenChong, gioiTinhCon. ' +
    'LUÔN trả về JSON THUẦN (không có markdown, không có ```json), ' +
    'theo đúng cấu trúc: ' +
    '{"found":true,"vanKhan":{"title":"...","category":"...","description":"...",' +
    '"requiredFields":["tenChuNha","diaChi","ngayDuong"],' +
    '"optionalFields":["tenVo"],' +
    '"content":"Nội dung bài văn khấn với placeholder...",' +
    '"note":"Lễ vật chuẩn bị..."}}. ' +
    'Nếu yêu cầu không liên quan đến văn khấn, trả {"found":false}.';

  /* ============================================================
     searchOrCreate — Tìm kiếm hoặc tạo bài văn khấn mới bằng AI
     @param {string} query — Từ khóa tìm kiếm của người dùng
     @returns {Promise<{found:boolean, vanKhan:Object|null}>}
     ============================================================ */
  function searchOrCreate(query) {
    if (!query || query.trim() === '') {
      return Promise.reject(new Error('Từ khóa tìm kiếm không được để trống'));
    }

    var userMessage =
      'Người dùng muốn tìm hoặc soạn bài văn khấn với nhu cầu sau: "' + query + '". ' +
      'Hãy tìm kiếm trong kho văn khấn truyền thống Việt Nam. ' +
      'Nếu tìm thấy bài phù hợp, soạn đầy đủ theo cấu trúc chuẩn. ' +
      'Chỉ trả JSON, không giải thích thêm.';

    return AIService.ask(SYSTEM_PROMPT, userMessage, { cache: true })
      .then(function(rawText) {
        return _parseAiResponse(rawText);
      });
  }

  /* ============================================================
     _parseAiResponse — Parse kết quả JSON từ AI
     @param {string} rawText — Chuỗi JSON thô từ AI trả về
     @returns {{found:boolean, vanKhan:Object|null}}
     ============================================================ */
  function _parseAiResponse(rawText) {
    if (!rawText) {
      return { found: false, vanKhan: null };
    }

    /* Làm sạch: loại bỏ markdown code block nếu có */
    var cleaned = rawText
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim();

    /* Tìm JSON object đầu tiên trong chuỗi */
    var startIdx = cleaned.indexOf('{');
    var endIdx   = cleaned.lastIndexOf('}');

    if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
      console.warn('[VanKhanAI] Không tìm thấy JSON trong response:', rawText.substring(0, 200));
      return { found: false, vanKhan: null };
    }

    var jsonStr = cleaned.substring(startIdx, endIdx + 1);

    try {
      var parsed = JSON.parse(jsonStr);

      /* Kiểm tra cấu trúc */
      if (typeof parsed.found !== 'boolean') {
        console.warn('[VanKhanAI] Response thiếu field "found"');
        return { found: false, vanKhan: null };
      }

      if (!parsed.found) {
        return { found: false, vanKhan: null };
      }

      /* Kiểm tra vanKhan object */
      if (!parsed.vanKhan || typeof parsed.vanKhan !== 'object') {
        console.warn('[VanKhanAI] Response thiếu field "vanKhan"');
        return { found: false, vanKhan: null };
      }

      var vk = parsed.vanKhan;

      /* Đảm bảo các field bắt buộc tồn tại */
      if (!vk.title || !vk.content) {
        console.warn('[VanKhanAI] vanKhan thiếu title hoặc content');
        return { found: false, vanKhan: null };
      }

      /* Chuẩn hóa requiredFields */
      if (!Array.isArray(vk.requiredFields) || vk.requiredFields.length === 0) {
        vk.requiredFields = ['tenChuNha', 'diaChi', 'ngayDuong'];
      }

      /* Chuẩn hóa optionalFields */
      if (!Array.isArray(vk.optionalFields)) {
        vk.optionalFields = ['tenVo'];
      }

      /* Chuẩn hóa category */
      var validCats = ['Gia Tiên', 'Lễ Tết', 'Hôn Nhân', 'Thôi Nôi', 'Tang Lễ', 'Nhà Mới', 'Khai Trương', 'Chùa Đền', 'Xe Mới'];
      if (!vk.category || validCats.indexOf(vk.category) === -1) {
        vk.category = 'Gia Tiên'; /* Mặc định */
      }

      return { found: true, vanKhan: vk };

    } catch (e) {
      console.error('[VanKhanAI] Lỗi parse JSON:', e, '\nJSON string:', jsonStr.substring(0, 300));
      return { found: false, vanKhan: null };
    }
  }

  /* ============================================================
     generateCustom — Tạo bài văn khấn tùy chỉnh từ mô tả chi tiết
     (Dùng cho trường hợp user mô tả nhu cầu phức tạp)
     @param {string} description — Mô tả chi tiết nhu cầu
     @returns {Promise<{found:boolean, vanKhan:Object|null}>}
     ============================================================ */
  function generateCustom(description) {
    if (!description || description.trim() === '') {
      return Promise.reject(new Error('Mô tả không được để trống'));
    }

    var userMessage =
      'Hãy soạn bài văn khấn theo mô tả chi tiết sau: "' + description + '". ' +
      'Soạn đầy đủ, trang trọng, đúng phong tục Việt Nam. ' +
      'Chỉ trả JSON, không giải thích.';

    return AIService.ask(SYSTEM_PROMPT, userMessage, { cache: false })
      .then(function(rawText) {
        return _parseAiResponse(rawText);
      });
  }

  /* ============================================================
     Public API
     ============================================================ */
  return {
    searchOrCreate: searchOrCreate,
    generateCustom: generateCustom
  };

})();
