/* ============================================================
   app.js — Router, Load Section, Init Chung
   Lịch Việt Nam 888
   ============================================================ */

/* ---- Cache HTML sections đã load ---- */
var _sectionCache = {};

/* ---- Section đang hiển thị ---- */
var _currentSection = null;

/* ---- Map section → hàm init tương ứng ---- */
var SECTION_INIT_MAP = {
  'lich-am':    function() { if (typeof initLichAm    === 'function') initLichAm();    },
  'tu-vi':      function() { if (typeof initTuVi      === 'function') initTuVi();      },
  'tu-tru':     function() { if (typeof initTuTru     === 'function') initTuTru();     },
  'phong-thuy': function() { if (typeof initPhongThuy === 'function') initPhongThuy(); },
  'van-khan':   function() { if (typeof initVanKhan   === 'function') initVanKhan();   }
};

/* ============================================================
   loadSection — Load và inject HTML section vào #app
   ============================================================ */
function loadSection(name) {
  /* Danh sách section hợp lệ */
  var validSections = ['lich-am', 'tu-vi', 'tu-tru', 'phong-thuy', 'van-khan'];
  if (validSections.indexOf(name) === -1) {
    showToast('Section không hợp lệ: ' + name, 'error');
    return;
  }

  /* Không load lại nếu đang hiển thị cùng section */
  if (_currentSection === name) return;
  _currentSection = name;

  /* Cập nhật active tab */
  _updateActiveTab(name);

  var appEl = document.getElementById('app');
  if (!appEl) return;

  /* Hiện loading */
  appEl.innerHTML = '<div class="app-loading"><div class="loading-spinner"></div><p>Đang tải...</p></div>';

  /* Kiểm tra cache */
  if (_sectionCache[name]) {
    _injectSection(appEl, name, _sectionCache[name]);
    return;
  }

  /* Fetch HTML từ pages/ */
  fetch('pages/' + name + '.html')
    .then(function(response) {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.text();
    })
    .then(function(html) {
      /* Cache lại để lần sau không fetch nữa */
      _sectionCache[name] = html;
      _injectSection(appEl, name, html);
    })
    .catch(function(err) {
      console.warn('[App] Không fetch được pages/' + name + '.html:', err.message);
      /* Hiện thông báo lỗi thân thiện — nhắc dùng live server */
      appEl.innerHTML =
        '<div class="app-container" style="text-align:center;padding:var(--sp-xl);">' +
          '<p style="font-size:2.5rem;margin-bottom:var(--sp-md);">⚠️</p>' +
          '<p style="color:var(--ink2);font-size:1.1rem;font-weight:600;margin-bottom:var(--sp-sm);">' +
            'Không thể tải nội dung mục này.' +
          '</p>' +
          '<p style="color:var(--ink3);font-size:0.95rem;margin-bottom:var(--sp-md);">' +
            'Vui lòng mở ứng dụng qua <strong>Live Server</strong> (VS Code) ' +
            'hoặc server local — không mở trực tiếp từ file://.' +
          '</p>' +
          '<button class="btn btn-secondary btn-sm" ' +
            'onclick="_currentSection=null;loadSection(\'' + name + '\')">↻ Thử lại</button>' +
        '</div>';
    });
}

/* ---- Inject HTML vào app container và gọi init ---- */
function _injectSection(appEl, name, html) {
  /* Inject HTML */
  appEl.innerHTML = html;

  /* Scroll lên đầu */
  window.scrollTo({ top: 0, behavior: 'smooth' });

  /* Gọi hàm init tương ứng sau khi DOM sẵn sàng */
  setTimeout(function() {
    var initFn = SECTION_INIT_MAP[name];
    if (initFn) {
      try {
        initFn();
      } catch(e) {
        console.error('[App] Lỗi init section', name, e);
        showToast('Lỗi khởi tạo ' + name + ': ' + e.message, 'error');
      }
    }
  }, 50);
}

/* ---- Cập nhật active tab ---- */
function _updateActiveTab(name) {
  var tabs = document.querySelectorAll('.nav-tab');
  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    var section = tab.getAttribute('data-section');
    if (section === name) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  }
}

/* ============================================================
   showToast — Hiện toast notification
   ============================================================ */
function showToast(message, type, duration) {
  type     = type     || 'default';
  duration = duration || 3000;

  var container = document.getElementById('toast-container');
  if (!container) return;

  var toast = document.createElement('div');
  toast.className = 'toast' + (type !== 'default' ? ' toast-' + type : '');
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(function() {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, duration + 300);
}

/* ============================================================
   Hiển thị ngày hôm nay ở header
   ============================================================ */
function _updateHeaderToday() {
  var now  = new Date();
  var days = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
  var thu  = days[now.getDay()];
  var d    = now.getDate();
  var m    = now.getMonth() + 1;
  var y    = now.getFullYear();
  var str  = thu + ', ' + _pad(d) + '/' + _pad(m) + '/' + y;

  var solarEl = document.getElementById('today-solar');
  if (solarEl) solarEl.textContent = str;
}

/* ---- Pad số ---- */
function _pad(n) {
  return n < 10 ? '0' + n : String(n);
}

/* ============================================================
   Tiện ích chung dùng xuyên app
   ============================================================ */

/* Lấy giá trị input an toàn */
function getInputVal(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

/* Set text content an toàn */
function setText(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text || '';
}

/* Set innerHTML an toàn */
function setHtml(id, html) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = html || '';
}

/* Hiện element (xóa class hidden) */
function showEl(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

/* Ẩn element (thêm class hidden) */
function hideEl(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

/* Tạo element nhanh */
function el(tag, cls, text) {
  var e = document.createElement(tag);
  if (cls)  e.className   = cls;
  if (text) e.textContent = text;
  return e;
}

/* ============================================================
   Khởi động app
   ============================================================ */
(function init() {
  /* Cập nhật header ngày hôm nay */
  _updateHeaderToday();
  setInterval(_updateHeaderToday, 60000);

  /* Load section mặc định: lich-am */
  loadSection('lich-am');
})();
