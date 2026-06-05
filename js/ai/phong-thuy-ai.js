/* ============================================================
   phong-thuy-ai.js — Module AI cho trang Phong Thủy
   Lịch Việt Nam 888
   Phụ thuộc: ai-service.js
   ============================================================ */

/* ---- System prompt cho Phong Thủy AI ---- */
var PT_SYSTEM_PROMPT = [
  'Bạn là chuyên gia phong thủy và thuật số phương Đông người Việt Nam.',
  'Kiến thức bao gồm: Ngũ Hành, Bát Quái, Can Chi, Thập Nhị Trực, hướng nhà, bố cục nội thất.',
  'Trả lời bằng tiếng Việt, rõ ràng, thực tế, dễ áp dụng.',
  'Không dùng từ ngữ mê tín quá mức. Kết hợp truyền thống với thực tiễn.',
  'Trả lời ngắn gọn (dưới 300 từ), có cấu trúc rõ ràng.',
  'Nếu câu hỏi không liên quan đến phong thủy hoặc lịch Việt Nam, lịch sự từ chối.'
].join(' ');

/* ---- Hàm gọi AI tư vấn phong thủy ---- */
function ptAITuVan(cauHoi, callback) {
  if (!cauHoi || !cauHoi.trim()) {
    callback(null, 'Vui lòng nhập câu hỏi.');
    return;
  }

  AIService.ask(PT_SYSTEM_PROMPT, cauHoi.trim(), { cache: false })
    .then(function(result) {
      callback(result, null);
    })
    .catch(function(err) {
      callback(null, AIService.getErrorMessage(err));
    });
}
