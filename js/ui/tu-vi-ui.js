/* ============================================================
   tu-vi-ui.js — Module UI cho trang Tử Vi Đẩu Số
   Lịch Việt Nam 888
   Export hàm initTuVi() được gọi bởi app.js
   ============================================================ */

/* ---- Lưu lá số hiện tại để AI luận giải ---- */
var _tvLaSoHienTai = null;

/* ---- Tên 12 cung theo thứ tự lá số ---- */
var TV_TEN_CUNG = [
  'Mệnh','Phụ Mẫu','Phúc Đức','Điền Trạch',
  'Quan Lộc','Nô Bộc','Thiên Di','Tật Ách',
  'Tài Bạch','Tử Tức','Phu Thê','Huynh Đệ'
];

/* ---- Vị trí 12 cung trên grid 4x4 (bỏ ô giữa) ---- */
/* Grid 4 cột x 4 hàng = 16 ô, 4 ô giữa (5,6,9,10 theo 1-index) là trung tâm */
/* Thứ tự đi vòng ngoài: dưới trái → trên trái → trên phải → dưới phải */
var TV_GRID_ORDER = [8, 7, 6, 5, 4, 3, 2, 1, 0, 11, 10, 9];
/* Vị trí cell trong grid (0-indexed, 4 cột) tương ứng với thứ tự vòng ngoài */
var TV_CELL_POS = [12, 8, 4, 0, 1, 2, 3, 7, 11, 15, 14, 13];

/* ============================================================
   initTuVi — Hàm khởi tạo, app.js gọi sau khi inject HTML
   ============================================================ */
function initTuVi() {
  /* Bind tab switching */
  _tvBindTabs();
  /* Bind nút đóng popup */
  _tvBindPopup();
  /* Focus vào field đầu tiên */
  var hoTenEl = document.getElementById('tv-ho-ten');
  if (hoTenEl) {
    setTimeout(function() { hoTenEl.focus(); }, 100);
  }
}

/* ============================================================
   tvLapLaSo — Được gọi khi bấm nút "Lập Lá Số Tử Vi"
   (onclick inline trong tu-vi.html)
   ============================================================ */
function tvLapLaSo() {
  /* --- Đọc form --- */
  var hoTen    = getInputVal('tv-ho-ten');
  var gioiTinh = getInputVal('tv-gioi-tinh') || 'nam';
  var ngay     = parseInt(getInputVal('tv-ngay'),  10);
  var thang    = parseInt(getInputVal('tv-thang'), 10);
  var nam      = parseInt(getInputVal('tv-nam'),   10);
  var gioSinh  = getInputVal('tv-gio');   /* Địa Chi giờ, vd: "Tý" */

  /* --- Validate --- */
  if (!ngay || !thang || !nam) {
    showToast('Vui lòng nhập đầy đủ ngày, tháng, năm sinh.', 'error');
    return;
  }
  if (ngay < 1 || ngay > 31 || thang < 1 || thang > 12) {
    showToast('Ngày hoặc tháng không hợp lệ.', 'error');
    return;
  }
  if (nam < 1900 || nam > 2100) {
    showToast('Năm sinh phải từ 1900 đến 2100.', 'error');
    return;
  }

  /* --- Gọi engine tính lá số --- */
  var params = {
    hoTen:     hoTen || 'Không rõ',
    gioiTinh:  gioiTinh,
    ngay:      ngay,
    thang:     thang,
    nam:       nam,
    gioSinh:   gioSinh || 'Tý',   /* Mặc định Tý nếu không rõ */
    muiGio:    7
  };

  var laSo;
  try {
    laSo = TuViEngine.lapLaSo(params);
  } catch(e) {
    console.error('[TuViUI] Lỗi engine:', e);
    showToast('Lỗi tính lá số: ' + e.message, 'error');
    return;
  }

  /* Lưu lại để AI dùng */
  _tvLaSoHienTai = laSo;

  /* --- Render kết quả --- */
  _tvRenderTuTru(laSo);
  _tvRenderMenhGrid(laSo);
  _tvRenderLaSo(laSo);
  _tvRenderDaiVan(laSo);
  _tvRenderTieuVan(laSo);

  /* Hiện khu vực kết quả */
  showEl('tv-result');

  /* Reset tab AI về trạng thái ban đầu */
  var aiBox = document.getElementById('tv-ai-result-box');
  if (aiBox) aiBox.innerHTML = '';

  /* Cuộn xuống kết quả */
  setTimeout(function() {
    var resultEl = document.getElementById('tv-result');
    if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

/* ============================================================
   _tvRenderTuTru — Render ô Tứ Trụ (Năm, Tháng, Ngày, Giờ)
   ============================================================ */
function _tvRenderTuTru(laSo) {
  var container = document.getElementById('tv-tu-tru');
  if (!container) return;

  var tru = laSo.tuTru;
  var items = [
    { label: 'Năm',   data: tru.nam   },
    { label: 'Tháng', data: tru.thang },
    { label: 'Ngày',  data: tru.ngay  },
    { label: 'Giờ',   data: tru.gio   }
  ];

  var html = '';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    var cc = (it.data.can || '?') + ' ' + (it.data.chi || '?');
    html +=
      '<div class="tv-tru-item">' +
        '<div class="tv-tru-label">' + it.label + '</div>' +
        '<div class="tv-tru-can-chi">' + cc + '</div>' +
        '<div class="tv-tru-hanh">' + (it.data.hanh || '') + '</div>' +
      '</div>';
  }
  container.innerHTML = html;
}

/* ============================================================
   _tvRenderMenhGrid — Render Mệnh, Cục, Chủ Mệnh, Thân Chủ
   ============================================================ */
function _tvRenderMenhGrid(laSo) {
  var container = document.getElementById('tv-menh-grid');
  if (!container) return;

  var items = [
    { label: 'Mệnh',       value: laSo.menhHanh,  sub: 'Ngũ Hành' },
    { label: 'Cục',        value: laSo.cucTen,     sub: 'Số ' + laSo.cucSo },
    { label: 'Chủ Mệnh',  value: laSo.chuMenh,    sub: 'Tinh chủ mệnh' },
    { label: 'Thân Chủ',  value: laSo.thanChu,     sub: 'Tinh thân chủ' }
  ];

  var html = '';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    html +=
      '<div class="tv-menh-item">' +
        '<div class="tv-menh-label">' + it.label + '</div>' +
        '<div class="tv-menh-value">' + (it.value || '?') + '</div>' +
        '<div class="tv-menh-sub">' + it.sub + '</div>' +
      '</div>';
  }
  container.innerHTML = html;
}

/* ============================================================
   _tvRenderLaSo — Render lưới 12 cung 4x4
   ============================================================ */
function _tvRenderLaSo(laSo) {
  var container = document.getElementById('tv-la-so-grid');
  if (!container) return;

  var cacCung  = laSo.cacCung;   /* mảng 12 cung từ engine, index 0-11 = Tý-Hợi */

  /* Tạo 16 cell, 4 cell giữa là trung tâm */
  /* Vị trí trung tâm: cell index 5,6,9,10 (4 cols) */
  var centerCells = { 5: true, 6: true, 9: true, 10: true };

  /* Map: cell position → cung index trong cacCung */
  /* TV_CELL_POS[i] = vị trí cell của cung thứ i trong vòng ngoài */
  /* TV_GRID_ORDER[i] = index cung tương ứng trong cacCung */
  var cellToCung = {};
  for (var gi = 0; gi < TV_CELL_POS.length; gi++) {
    cellToCung[TV_CELL_POS[gi]] = TV_GRID_ORDER[gi];
  }

  var html = '';
  for (var ci = 0; ci < 16; ci++) {
    if (centerCells[ci]) {
      /* Ô trung tâm: hiện tên & mệnh chủ */
      if (ci === 5) {
        html +=
          '<div class="tv-cung tv-cung-trung-tam" style="grid-column:span 2;grid-row:span 2;">' +
            '<div class="tv-trung-tam-name">' + (laSo.hoTen || 'Lá Số') + '</div>' +
            '<div class="tv-trung-tam-divider"></div>' +
            '<div class="tv-trung-tam-info">Mệnh: ' + (laSo.menhHanh || '') + '</div>' +
            '<div class="tv-trung-tam-info">' + (laSo.cucTen || '') + '</div>' +
          '</div>';
      }
      /* ci 6, 9, 10 bỏ qua (đã dùng span) */
      continue;
    }

    var cungIdx = cellToCung[ci];
    if (cungIdx === undefined) continue;
    var cung = cacCung[cungIdx];
    if (!cung) continue;

    /* Xây HTML sao */
    var saoHtml = '';
    var saoList = cung.sao || [];
    for (var si = 0; si < saoList.length && si < 8; si++) {
      var sao = saoList[si];
      var saoClass = 'tv-sao';
      if (sao.loai === 'chinh-tinh' || sao.loai === 'chinh') {
        saoClass += ' tv-sao-chinh-tinh';
      } else if (sao.loai === 'phu-tinh' || sao.loai === 'phu') {
        saoClass += ' tv-sao-phu-tinh';
      } else if (sao.loai === 'tu-hoa') {
        saoClass += ' tv-sao-cat';
      } else {
        saoClass += ' tv-sao-tap-tinh';
      }
      saoHtml += '<span class="' + saoClass + '">' + sao.ten + '</span>';
    }
    if (saoList.length > 8) {
      saoHtml += '<span class="tv-sao tv-sao-tap-tinh">+' + (saoList.length - 8) + '</span>';
    }

    /* Badge Mệnh / Thân */
    var badgeHtml = '';
    if (cung.laMenhCung) badgeHtml += '<span class="tv-cung-badge tv-badge-menh">Mệnh</span>';
    if (cung.laThanCung) badgeHtml += '<span class="tv-cung-badge tv-badge-than">Thân</span>';

    /* Tuần triệt */
    var truietClass = cung.tuanKhong ? ' tv-cung-triet' : '';

    html +=
      '<div class="tv-cung' + truietClass + '" onclick="tvShowCungPopup(' + cungIdx + ')" style="cursor:pointer;">' +
        badgeHtml +
        '<div class="tv-cung-header">' +
          '<span class="tv-cung-name">' + (cung.ten || TV_TEN_CUNG[cungIdx] || '') + '</span>' +
          '<span class="tv-cung-chi">' + (cung.diaChi || '') + '</span>' +
        '</div>' +
        '<div class="tv-cung-sao">' + saoHtml + '</div>' +
      '</div>';
  }

  container.innerHTML = html;
}

/* ============================================================
   tvShowCungPopup — Hiện popup chi tiết cung khi click
   ============================================================ */
function tvShowCungPopup(cungIdx) {
  if (!_tvLaSoHienTai) return;
  var cung = _tvLaSoHienTai.cacCung[cungIdx];
  if (!cung) return;

  var titleEl = document.getElementById('tv-popup-title');
  var bodyEl  = document.getElementById('tv-popup-body');
  var overlay = document.getElementById('tv-popup-overlay');

  if (!titleEl || !bodyEl || !overlay) return;

  /* Tiêu đề popup */
  titleEl.textContent = 'Cung ' + cung.ten + ' — ' + cung.diaChi;

  /* Danh sách sao chi tiết */
  var saoList = cung.sao || [];
  var saoHtml = '';
  if (saoList.length === 0) {
    saoHtml = '<p style="color:var(--ink3);font-style:italic;">Không có sao trong cung này.</p>';
  } else {
    saoHtml = '<div style="display:flex;flex-wrap:wrap;gap:var(--sp-xs);">';
    for (var i = 0; i < saoList.length; i++) {
      var sao = saoList[i];
      var loaiLabel = '';
      var loaiColor = 'var(--ink2)';
      if (sao.loai === 'chinh-tinh' || sao.loai === 'chinh') {
        loaiLabel = '★ Chính Tinh';
        loaiColor = 'var(--gold)';
      } else if (sao.loai === 'phu-tinh' || sao.loai === 'phu') {
        loaiLabel = '☆ Phụ Tinh';
        loaiColor = 'var(--primary)';
      } else if (sao.loai === 'tu-hoa') {
        loaiLabel = '◈ Tứ Hóa';
        loaiColor = 'var(--green-good)';
      } else {
        loaiLabel = '· Tạp Tinh';
        loaiColor = 'var(--ink3)';
      }
      saoHtml +=
        '<div style="background:var(--surface2);border-radius:var(--radius-sm);padding:var(--sp-xs) var(--sp-sm);min-width:120px;">' +
          '<div style="font-weight:600;color:' + loaiColor + ';">' + sao.ten + '</div>' +
          '<div style="font-size:0.75rem;color:var(--ink3);">' + loaiLabel + ' · ' + (sao.hanh || '') + '</div>' +
        '</div>';
    }
    saoHtml += '</div>';
  }

  /* Thông tin bổ sung */
  var extraHtml = '';
  if (cung.laMenhCung) extraHtml += '<p style="color:var(--gold);font-weight:600;margin-top:var(--sp-sm);">⭐ Đây là Cung Mệnh</p>';
  if (cung.laThanCung) extraHtml += '<p style="color:var(--primary);font-weight:600;margin-top:var(--sp-xs);">💫 Đây là Cung Thân</p>';
  if (cung.tuanKhong)  extraHtml += '<p style="color:var(--red-bad);margin-top:var(--sp-xs);">⚠️ Cung bị Triệt</p>';

  bodyEl.innerHTML =
    '<div style="padding:var(--sp-md);">' +
      '<h4 style="margin-bottom:var(--sp-sm);color:var(--ink1);">Các sao trong cung:</h4>' +
      saoHtml +
      extraHtml +
    '</div>';

  /* Hiện overlay */
  overlay.classList.remove('hidden');
}

/* ============================================================
   _tvBindPopup — Bind sự kiện đóng popup
   ============================================================ */
function _tvBindPopup() {
  var closeBtn = document.getElementById('tv-popup-close');
  var overlay  = document.getElementById('tv-popup-overlay');

  if (closeBtn) {
    closeBtn.onclick = function() {
      if (overlay) overlay.classList.add('hidden');
    };
  }

  if (overlay) {
    overlay.onclick = function(e) {
      if (e.target === overlay) overlay.classList.add('hidden');
    };
  }
}

/* ============================================================
   _tvRenderDaiVan — Render lưới Đại Vận
   ============================================================ */
function _tvRenderDaiVan(laSo) {
  var container = document.getElementById('tv-dai-van-grid');
  if (!container) return;

  var daiVanList  = laSo.daiVanList  || [];
  var dvHienTai   = laSo.dvHienTai;
  var namHienTai  = new Date().getFullYear();

  var html = '';
  for (var i = 0; i < daiVanList.length; i++) {
    var dv = daiVanList[i];
    var isHienTai = dvHienTai && dv.namBatDau === dvHienTai.namBatDau;
    var cls = 'tv-dai-van-item' + (isHienTai ? ' hien-tai' : '');

    html +=
      '<div class="' + cls + '">' +
        '<div class="tv-dv-tuoi">Tuổi ' + (dv.tuoiBatDau || '') + (dv.tuoiKetThuc ? '–' + dv.tuoiKetThuc : '+') + '</div>' +
        '<div class="tv-dv-can-chi">' + (dv.can || '') + ' ' + (dv.chi || '') + '</div>' +
        '<div class="tv-dv-nam">' + (dv.namBatDau || '') + '–' + (dv.namKetThuc || '') + '</div>' +
        (isHienTai ? '<div class="tv-dv-badge">Hiện tại</div>' : '') +
      '</div>';
  }

  container.innerHTML = html || '<p style="color:var(--ink3);padding:var(--sp-md);">Không tính được Đại Vận.</p>';
}

/* ============================================================
   _tvRenderTieuVan — Render Tiểu Vận của đại vận hiện tại
   ============================================================ */
function _tvRenderTieuVan(laSo) {
  var container = document.getElementById('tv-tieu-van-grid');
  if (!container) return;

  var tieuVanList = laSo.tieuVanList || [];
  var namHienTai  = new Date().getFullYear();

  var html = '';
  for (var i = 0; i < tieuVanList.length; i++) {
    var tv = tieuVanList[i];
    var isNow = tv.nam === namHienTai;
    var cls   = 'tv-dai-van-item' + (isNow ? ' hien-tai' : '');

    html +=
      '<div class="' + cls + '" style="min-width:100px;">' +
        '<div class="tv-dv-can-chi">' + (tv.can || '') + ' ' + (tv.chi || '') + '</div>' +
        '<div class="tv-dv-nam">Năm ' + (tv.nam || '') + '</div>' +
        (isNow ? '<div class="tv-dv-badge">Hiện tại</div>' : '') +
      '</div>';
  }

  container.innerHTML = html || '<p style="color:var(--ink3);">Không có dữ liệu tiểu vận.</p>';
}

/* ============================================================
   _tvBindTabs — Bind sự kiện chuyển tab (Đại Vận / AI Luận Giải)
   ============================================================ */
function _tvBindTabs() {
  var tabWrap = document.querySelector('.tv-tabs-wrap');
  if (!tabWrap) return;

  var tabBtns = tabWrap.querySelectorAll('.tab-btn');
  for (var i = 0; i < tabBtns.length; i++) {
    (function(btn) {
      btn.onclick = function() {
        /* Bỏ active tất cả tab btn */
        for (var j = 0; j < tabBtns.length; j++) {
          tabBtns[j].classList.remove('active');
        }
        btn.classList.add('active');

        /* Ẩn tất cả tab content */
        var contents = tabWrap.querySelectorAll('.tab-content');
        for (var k = 0; k < contents.length; k++) {
          contents[k].classList.remove('active');
        }

        /* Hiện tab content tương ứng */
        var targetId = btn.getAttribute('data-tab');
        var targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.classList.add('active');
      };
    })(tabBtns[i]);
  }
}

/* ============================================================
   tvLuanGiai — Gọi AI luận giải lá số
   (onclick inline trong tu-vi.html)
   ============================================================ */
function tvLuanGiai() {
  if (!_tvLaSoHienTai) {
    showToast('Vui lòng lập lá số trước.', 'error');
    return;
  }

  /* Kiểm tra AI module */
  if (typeof TuViAI === 'undefined' || typeof TuViAI.luanGiai !== 'function') {
    showToast('Module AI chưa sẵn sàng.', 'error');
    return;
  }

  var btn   = document.getElementById('tv-btn-ai');
  var aiBox = document.getElementById('tv-ai-result-box');
  if (!aiBox) return;

  /* Trạng thái loading */
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang luận giải...'; }
  aiBox.innerHTML =
    '<div style="text-align:center;padding:var(--sp-lg);color:var(--ink3);">' +
      '<div class="loading-spinner" style="margin:0 auto var(--sp-md);"></div>' +
      '<p>AI đang phân tích lá số...</p>' +
    '</div>';

  /* Gọi AI */
  TuViAI.luanGiai(_tvLaSoHienTai, function(err, ketQua) {
    if (btn) { btn.disabled = false; btn.textContent = '✨ Luận Giải Lá Số bằng AI'; }

    if (err) {
      aiBox.innerHTML =
        '<div style="color:var(--red-bad);padding:var(--sp-md);">' +
          '<strong>Lỗi:</strong> ' + err +
        '</div>';
      return;
    }

    /* Render kết quả: chuyển dòng thành <p> */
    var paragraphs = ketQua.split('\n');
    var html = '';
    for (var i = 0; i < paragraphs.length; i++) {
      var p = paragraphs[i].trim();
      if (p) {
        html += '<p style="margin-bottom:var(--sp-sm);line-height:1.75;">' + p + '</p>';
      }
    }

    aiBox.innerHTML =
      '<div style="background:var(--surface2);border-radius:var(--radius-md);padding:var(--sp-lg);margin-top:var(--sp-md);">' +
        '<h4 style="margin-bottom:var(--sp-md);color:var(--gold);">🌟 Luận Giải Lá Số Tử Vi</h4>' +
        html +
        '<p style="font-size:0.8rem;color:var(--ink3);margin-top:var(--sp-md);border-top:1px solid var(--border1);padding-top:var(--sp-sm);">' +
          'Thông tin mang tính tham khảo, không thay thế tư vấn chuyên gia.' +
        '</p>' +
      '</div>';
  });
}
