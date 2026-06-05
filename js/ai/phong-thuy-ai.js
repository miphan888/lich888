// ══════════════════════════════════════════════════════
// PHONG-THUY-AI.JS — AI module cho Phong Thủy
// Dùng AIService.ask() gọi qua Worker proxy
// ══════════════════════════════════════════════════════

// AI được gọi trực tiếp từ phong-thuy-ui.js hàm ptGoiAI()
// File này để dự phòng nếu cần tách logic AI riêng

var PhongThuyAI = {
  tuVan: function(question) {
    if (typeof AIService === 'undefined' || typeof AIService.ask !== 'function') {
      return Promise.reject(new Error('AI Service chưa sẵn sàng'));
    }

    var sys = 'Bạn là chuyên gia Phong Thủy Việt Nam. Trả lời câu hỏi về: hướng nhà, hướng bàn làm việc, màu sắc hợp mệnh, cách bố trí nhà cửa văn phòng, ngày tốt giờ tốt, vật phẩm phong thủy. Trả lời tiếng Việt, thực tế, 150-300 từ.';

    return AIService.ask(sys, question);
  }
};