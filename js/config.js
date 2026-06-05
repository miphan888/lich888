/* ============================================================
   config.js — Cấu hình ứng dụng
   Lịch Việt Nam 888
   KHÔNG chứa API key — AI gọi qua Cloudflare Worker proxy
   ============================================================ */

var APP_CONFIG = {
  /* ---- AI Proxy — Cloudflare Worker (API key ẩn trên Worker) ---- */
  AI_PROXY_URL: 'https://tuvi888-api.miphan888.workers.dev',
  GEMINI_MODEL: 'gemini-2.0-flash',

  /* ---- Cài đặt chung ---- */
  TIMEZONE: 7,         // UTC+7 (Việt Nam)
  VERSION: '2.0',
  APP_NAME: 'Lịch Việt Nam 888',

  /* ---- AI Settings ---- */
  AI_MAX_TOKENS: 1024,
  AI_TEMPERATURE: 0.7,
  AI_CACHE_TTL: 3600000,   // 1 giờ (ms)
  AI_RETRY_COUNT: 1,       // Retry 1 lần nếu lỗi 429
  AI_RETRY_DELAY: 2000,    // Đợi 2 giây trước khi retry

  /* ---- UI Settings ---- */
  TOAST_DURATION: 3000,    // 3 giây
  SECTION_CACHE: true,     // Cache HTML section đã load

  /* ---- Các section hợp lệ ---- */
  SECTIONS: ['lich-am', 'tu-vi', 'tu-tru', 'phong-thuy', 'van-khan'],

  /* ---- Default section ---- */
  DEFAULT_SECTION: 'lich-am'
};
