/* ============================================================
   tu-vi-ai.js — Module AI luận giải lá số Tử Vi Đẩu Số
   Dùng AIService.ask() từ ai-service.js (Gemini API)
   Lịch Việt Nam 888
   ============================================================ */

var TuViAI = (function() {
  'use strict';

  /* ============================================================
     SYSTEM PROMPT — Thầy Tử Vi uyên thâm
     ============================================================ */
  var SYSTEM_PROMPT =
    'Bạn là một thầy Tử Vi Đẩu Số uyên thâm với hơn 40 năm kinh nghiệm nghiên cứu và luận giải ' +
    'mệnh lý phương Đông. Bạn am hiểu sâu sắc 14 chính tinh, phụ tinh, tạp tinh, các cung mệnh, ' +
    'tài, quan, tử tức, phu thê, điền trạch, thiên di, tật ách, phúc đức, phụ mẫu, huynh đệ, nô bộc. ' +
    'Khi luận giải lá số, bạn:\n' +
    '1. Đánh giá tổng thể mệnh cục và các chính tinh trong cung Mệnh\n' +
    '2. Phân tích vận tài lộc và sự nghiệp (cung Quan Lộc, Tài Bạch)\n' +
    '3. Nhận xét tình duyên hôn nhân (cung Phu Thê)\n' +
    '4. Xem xét sức khỏe (cung Tật Ách)\n' +
    '5. Luận giải con cái (cung Tử Tức)\n' +
    '6. Đánh giá đại vận hiện tại và hướng phát triển\n' +
    'Viết bằng tiếng Việt thuần túy, 400-600 từ, giọng văn trang trọng nhưng dễ hiểu. ' +
    'Chia thành các đoạn ngắn. Cuối bài đưa ra lời khuyên thực tế 2-3 câu. ' +
    'KHÔNG dùng ký hiệu markdown (**, ##, -, *). Viết văn xuôi tự nhiên.';

  /* ============================================================
     _buildUserMessage — Xây dựng message mô tả lá số
     ============================================================ */
  function _buildUserMessage(laSo) {
    var msg = '';

    /* Thông tin cơ bản */
    msg += 'THÔNG TIN LÁ SỐ TỬ VI\n';
    msg += 'Họ tên: ' + (laSo.hoTen || 'Không rõ') + '\n';
    msg += 'Giới tính: ' + (laSo.gioiTinh === 'nu' ? 'Nữ' : 'Nam') + '\n';
    msg += 'Ngày sinh dương lịch: ' + (laSo.ngaySinh || '') + '\n\n';

    /* Tứ Trụ */
    msg += 'TỨ TRỤ SINH\n';
    var tru = laSo.tuTru || {};
    msg += 'Năm:   ' + _ccStr(tru.nam)   + '\n';
    msg += 'Tháng: ' + _ccStr(tru.thang) + '\n';
    msg += 'Ngày:  ' + _ccStr(tru.ngay)  + '\n';
    msg += 'Giờ:   ' + _ccStr(tru.gio)   + '\n\n';

    /* Mệnh - Cục */
    msg += 'MỆNH VÀ CỤC\n';
    msg += 'Mệnh: ' + (laSo.menhHanh || '?') + '\n';
    msg += 'Cục:  ' + (laSo.cucTen   || '?') + ' (số ' + (laSo.cucSo || '?') + ')\n';
    msg += 'Chủ Mệnh: ' + (laSo.chuMenh || '?') + '\n';
    msg += 'Thân Chủ: ' + (laSo.thanChu  || '?') + '\n\n';

    /* 12 Cung và sao */
    msg += 'CHI TIẾT 12 CUNG\n';
    var cacCung = laSo.cacCung || [];
    for (var i = 0; i < cacCung.length; i++) {
      var cung = cacCung[i];
      var saoNames = [];
      var saoList  = cung.sao || [];
      for (var j = 0; j < saoList.length; j++) {
        saoNames.push(saoList[j].ten);
      }
      var extras = [];
      if (cung.laMenhCung) extras.push('★MỆNH★');
      if (cung.laThanCung) extras.push('☆THÂN☆');
      if (cung.tuanKhong)  extras.push('[TRIỆT]');

      msg += 'Cung ' + cung.ten + ' (' + cung.diaChi + ')' +
             (extras.length ? ' ' + extras.join(' ') : '') + ': ' +
             (saoNames.join(', ') || 'Rỗng') + '\n';
    }

    /* Đại vận hiện tại */
    var dv = laSo.dvHienTai;
    if (dv) {
      msg += '\nĐẠI VẬN HIỆN TẠI\n';
      msg += 'Đại vận: ' + (dv.can || '') + ' ' + (dv.chi || '') +
             ', tuổi ' + (dv.tuoiBatDau || '') + '–' + (dv.tuoiKetThuc || '') +
             ', năm ' + (dv.namBatDau || '') + '–' + (dv.namKetThuc || '') + '\n';
    }

    msg += '\nHãy luận giải toàn diện lá số này theo yêu cầu đã nêu.';
    return msg;
  }

  /* ---- Helper: Can Chi string ---- */
  function _ccStr(tru) {
    if (!tru) return '?';
    return (tru.can || '') + ' ' + (tru.chi || '') + ' (' + (tru.hanh || '') + ')';
  }

  /* ============================================================
     luanGiai — Hàm công khai: gọi AI, trả kết quả qua callback
     callback(err, text)
     ============================================================ */
  function luanGiai(laSo, callback) {
    if (!laSo) {
      callback('Không có dữ liệu lá số.', null);
      return;
    }

    /* Kiểm tra AIService */
    if (typeof AIService === 'undefined') {
      callback('AIService chưa được tải.', null);
      return;
    }

    /* Kiểm tra API key */
    if (!AIService.isConfigured()) {
      callback(
        'Chưa cấu hình API Key. Mở file js/config.js và điền GEMINI_API_KEY.',
        null
      );
      return;
    }

    var userMessage = _buildUserMessage(laSo);

    AIService.ask(SYSTEM_PROMPT, userMessage, { cache: false })
      .then(function(text) {
        callback(null, text);
      })
      .catch(function(err) {
        var errMsg = AIService.getErrorMessage(err);
        callback(errMsg, null);
      });
  }

  /* Public API */
  return {
    luanGiai: luanGiai
  };

})();
