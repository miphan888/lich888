/* ============================================================
   app.js — Router, Load Section, Init Chung
   Lịch Việt Nam 888
   FILE SỬA LẠI: đổi DEFAULT_SECTION, thêm inline fallback HTML,
   sửa path fetch, sửa header-today
   ============================================================ */

/* ---- Cache HTML sections đã load ---- */
var _sectionCache = {};

/* ---- Section đang hiển thị ---- */
var _currentSection = null;

/* ---- HTML inline fallback cho section chưa có file pages/ ---- */
var SECTION_INLINE_HTML = {
  'lich-am': [
    '<div class="app-container" style="text-align:center;padding:var(--sp-xl);">',
    '  <h2 style="font-size:2rem;margin-bottom:var(--sp-md);">📅 Lịch Âm Dương</h2>',
    '  <p style="color:var(--ink3);font-size:1.1rem;">Chức năng đang được phát triển.</p>',
    '  <p style="color:var(--ink3);margin-top:var(--sp-sm);">Vui lòng quay lại sau!</p>',
    '</div>'
  ].join(''),
  'tu-tru': [
    '<div class="app-container" style="text-align:center;padding:var(--sp-xl);">',
    '  <h2 style="font-size:2rem;margin-bottom:var(--sp-md);">🔮 Tứ Trụ</h2>',
    '  <p style="color:var(--ink3);font-size:1.1rem;">Chức năng đang được phát triển.</p>',
    '  <p style="color:var(--ink3);margin-top:var(--sp-sm);">Vui lòng quay lại sau!</p>',
    '</div>'
  ].join(''),
  'phong-thuy': [
    '<div class="app-container" style="text-align:center;padding:var(--sp-xl);">',
    '  <h2 style="font-size:2rem;margin-bottom:var(--sp-md);">🧭 Phong Thủy</h2>',
    '  <p style="color:var(--ink3);font-size:1.1rem;">Chức năng đang được phát triển.</p>',
    '  <p style="color:var(--ink3);margin-top:var(--sp-sm);">Vui lòng quay lại sau!</p>',
    '</div>'
  ].join('')
};

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

  /* Nếu có inline HTML fallback và đã biết không có file → dùng ngay */
  if (SECTION_INLINE_HTML[name] && !_sectionHasFile(name)) {
    setTimeout(function() {
      _injectSection(appEl, name, SECTION_INLINE_HTML[name]);
    }, 100);
    return;
  }

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
      /* Cache lại */
      _sectionCache[name] = html;
      _injectSection(appEl, name, html);
    })
    .catch(function(err) {
      console.warn('[App] Không fetch được pages/' + name + '.html:', err.message);
      /* Thử dùng inline fallback */
      if (SECTION_INLINE_HTML[name]) {
        _injectSection(appEl, name, SECTION_INLINE_HTML[name]);
      } else {
        /* Fallback thân thiện */
        appEl.innerHTML =
          '<div class="app-container" style="text-align:center;padding:var(--sp-xl);">' +
            '<p style="font-size:2rem;margin-bottom:var(--sp-md);">⚠️</p>' +
            '<p style="color:var(--ink2);font-size:1rem;margin-bottom:var(--sp-md);">' +
              'Không thể tải nội dung. Vui lòng dùng Live Server (VS Code) hoặc server local.' +
            '</p>' +
            '<button class="btn btn-secondary btn-sm" onclick="_currentSection=null;loadSection(\'' + name + '\')">↻ Thử lại</button>' +
          '</div>';
      }
    });
}

/* ---- Đánh dấu section nào có file pages/ (đã fetch thành công trước đó) ---- */
var _confirmedFiles = {
  'van-khan':   true,
  'tu-vi':      true,
  'tu-tru':     true,
  'lich-am':    true,
  'phong-thuy': true
};
function _sectionHasFile(name) {
  return !!_confirmedFiles[name];
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

/* Hiện/ẩn element */
function showEl(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

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

  /* Load section mặc định: van-khan (luôn có file) */
  loadSection('van-khan');
})();
