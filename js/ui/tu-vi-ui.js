/* ============================================================
   tu-vi-ui.js — Module UI Tử Vi Đẩu Số
   Lịch Việt Nam 888
   VIẾT LẠI HOÀN TOÀN — Sạch, không xung đột
   ============================================================ */

var _laSo = null; /* Lá số hiện tại — dùng trong toàn bộ module */

/* ============================================================
   initTuVi — app.js gọi sau khi inject HTML
   ============================================================ */
function initTuVi() {
  console.log('[TuVi] initTuVi() called');

  /* Bind Enter key cho các field số */
  var fields = ['tv-day', 'tv-month', 'tv-year'];
  for (var i = 0; i < fields.length; i++) {
    (function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.onkeypress = function(e) {
          if (e.key === 'Enter') tvLapLaSo();
        };
      }
    })(fields[i]);
  }

  /* Click overlay đóng popup */
  var popup = document.getElementById('tv-cung-popup');
  if (popup) {
    popup.onclick = function(e) {
      if (e.target === popup) tvDongPopup();
    };
  }

  console.log('[TuVi] initTuVi() done');
}

/* ============================================================
   tvLapLaSo — Nút "Lập Lá Số" gọi hàm này
   ============================================================ */
function tvLapLaSo() {
  console.log('[TuVi] tvLapLaSo() START');

  /* BƯỚC 1: Đọc form */
  var hoTen = (document.getElementById('tv-ten') || {}).value || '';

  var gioiTinhEl = document.querySelector('input[name="tv-gt"]:checked');
  var gioiTinh = gioiTinhEl ? gioiTinhEl.value : 'nam';

  var ngay  = parseInt((document.getElementById('tv-day')   || {}).value, 10);
  var thang = parseInt((document.getElementById('tv-month') || {}).value, 10);
  var nam   = parseInt((document.getElementById('tv-year')  || {}).value, 10);
  var chiGio = (document.getElementById('tv-gio') || {}).value || '';

  console.log('[TuVi] Form values:', { hoTen:hoTen, gioiTinh:gioiTinh, ngay:ngay, thang:thang, nam:nam, chiGio:chiGio });

  /* BƯỚC 2: Validate */
  if (!ngay || !thang || !nam) {
    alert('Vui lòng nhập đầy đủ ngày, tháng, năm sinh.');
    return;
  }
  if (ngay < 1 || ngay > 31 || thang < 1 || thang > 12) {
    alert('Ngày hoặc tháng không hợp lệ.');
    return;
  }
  if (nam < 1900 || nam > 2100) {
    alert('Năm sinh phải từ 1900 đến 2100.');
    return;
  }

  /* BƯỚC 3: Gọi engine */
  console.log('[TuVi] Calling TuViEngine.lapLaSo...');

  if (typeof TuViEngine === 'undefined') {
    alert('TuViEngine chưa được load. Kiểm tra script order trong index.html.');
    return;
  }

  var params = {
    hoTen:     hoTen || 'Không rõ',
    gioiTinh:  gioiTinh,
    ngay:      ngay,
    thang:     thang,
    nam:       nam,
    chiGio:    chiGio || 'Tý',
    muiGio:    7
  };

  var ketQua;
  try {
    ketQua = TuViEngine.lapLaSo(params);
  } catch (e) {
    console.error('[TuVi] Engine error:', e);
    alert('Lỗi tính lá số: ' + e.message);
    return;
  }

  console.log('[TuVi] Engine result:', ketQua);

  if (!ketQua) {
    alert('Engine trả về null. Kiểm tra console.');
    return;
  }

  /* BƯỚC 4: Lưu lá số */
  _laSo = ketQua;
  window._currentLaSo = ketQua;

  /* BƯỚC 5: Render kết quả */
  console.log('[TuVi] Rendering results...');

  /* Hiển thị tên */
  var tenDisplay = document.getElementById('tv-ten-display');
  if (tenDisplay) tenDisplay.textContent = hoTen || 'Không rõ';

  tvRenderTuTru(ketQua);
  tvRenderMenhInfo(ketQua);
  tvRenderLaSo(ketQua);
  tvRenderDaiVan(ketQua);

  /* BƯỚC 6: Hiện sections */
  var summary = document.getElementById('tv-summary');
  if (summary) summary.style.display = '';

  var main = document.getElementById('tv-main');
  if (main) main.style.display = '';

  /* Đặt lại tab về Lá Số */
  tvShowTab('la-so');

  /* Cuộn xuống kết quả */
  setTimeout(function() {
    var el = document.getElementById('tv-summary');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);

  console.log('[TuVi] tvLapLaSo() DONE');
}

/* ============================================================
   tvRenderTuTru — Render 4 trụ
   ============================================================ */
function tvRenderTuTru(ls) {
  console.log('[TuVi] tvRenderTuTru', ls.tuTru);
  var container = document.getElementById('tv-tu-tru');
  if (!container) return;

  var tru = ls.tuTru || {};
  var items = [
    { label: 'Năm',   data: tru.nam   || {} },
    { label: 'Tháng', data: tru.thang || {} },
    { label: 'Ngày',  data: tru.ngay  || {} },
    { label: 'Giờ',   data: tru.gio   || {} }
  ];

  var html = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:8px">';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    var d = it.data;
    var canStr = d.can || '?';
    var chiStr = d.chi || '?';
    var hanhStr = d.hanh || '';
    html += '<div style="background:#fff9f0;border:1px solid var(--cream3,#e8dcc8);border-radius:6px;padding:10px;text-align:center">';
    html += '<div style="font-size:10px;color:var(--ink3,#888);font-weight:600;margin-bottom:4px">' + it.label + '</div>';
    html += '<div style="font-size:15px;font-weight:700;color:var(--red,#8B1A1A)">' + canStr + '</div>';
    html += '<div style="font-size:14px;font-weight:700;color:var(--ink,#1a1a1a)">' + chiStr + '</div>';
    html += '<div style="font-size:11px;color:var(--ink3,#888);margin-top:4px">' + hanhStr + '</div>';
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

/* ============================================================
   tvRenderMenhInfo — Render mệnh, cục, chủ mệnh, thân chủ
   ============================================================ */
function tvRenderMenhInfo(ls) {
  console.log('[TuVi] tvRenderMenhInfo');
  var container = document.getElementById('tv-menh-info');
  if (!container) return;

  var items = [
    { label: 'Mệnh',      value: ls.menhHanh || '?',  sub: 'Ngũ Hành' },
    { label: 'Cục',       value: ls.cucTen    || '?',  sub: 'Số ' + (ls.cucSo || '?') },
    { label: 'Chủ Mệnh', value: ls.chuMenh   || '?',  sub: 'Tinh chủ mệnh' },
    { label: 'Thân Chủ', value: ls.thanChu   || '?',  sub: 'Tinh thân chủ' }
  ];

  var html = '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:8px">';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    html += '<div class="result-box">';
    html += '<div class="rb-label">' + it.label + '</div>';
    html += '<div class="rb-value">' + it.value + '</div>';
    html += '<div class="rb-sub">' + it.sub + '</div>';
    html += '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

/* ============================================================
   tvRenderLaSo — Render grid 4x4 cho 12 cung
   Dùng explicit grid-column/grid-row cho từng cung
   ============================================================ */
function tvRenderLaSo(ls) {
  console.log('[TuVi] tvRenderLaSo, cacCung:', ls.cacCung ? ls.cacCung.length : 'N/A');
  var wrap = document.getElementById('tv-la-so-grid');
  if (!wrap) return;
  if (!ls || !ls.cacCung) {
    wrap.innerHTML = '<p style="color:red">Lỗi: cacCung không tồn tại trong kết quả engine.</p>';
    return;
  }

  var CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

  /* Tìm cung theo địa chi index */
  function timCungByChi(chiIdx) {
    for (var i = 0; i < ls.cacCung.length; i++) {
      var c = ls.cacCung[i];
      var dc = c.diaChi;
      if (typeof dc === 'string') dc = CHI.indexOf(dc);
      if (dc === chiIdx) return { cung: c, idx: i };
    }
    return null;
  }

  /* Bản đồ 12 cung: { chiIdx, col, row } (1-indexed cho CSS grid) */
  var MAP = [
    { chi: 5,  col: 1, row: 1 }, /* Tỵ    */
    { chi: 6,  col: 2, row: 1 }, /* Ngọ   */
    { chi: 7,  col: 3, row: 1 }, /* Mùi   */
    { chi: 8,  col: 4, row: 1 }, /* Thân  */
    { chi: 4,  col: 1, row: 2 }, /* Thìn  */
    { chi: 9,  col: 4, row: 2 }, /* Dậu   */
    { chi: 3,  col: 1, row: 3 }, /* Mão   */
    { chi: 10, col: 4, row: 3 }, /* Tuất  */
    { chi: 2,  col: 1, row: 4 }, /* Dần   */
    { chi: 1,  col: 2, row: 4 }, /* Sửu   */
    { chi: 0,  col: 3, row: 4 }, /* Tý    */
    { chi: 11, col: 4, row: 4 }  /* Hợi   */
  ];

  var html = '<div style="display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,auto);gap:4px;max-width:760px;margin:0 auto">';

  /* Ô trung tâm 2x2 */
  html += '<div style="grid-column:2/4;grid-row:2/4;';
  html += 'background:linear-gradient(135deg,#FDF6E3,#F5E6C8);';
  html += 'border:1px solid #e8d5a0;border-radius:8px;';
  html += 'display:flex;flex-direction:column;align-items:center;justify-content:center;';
  html += 'padding:12px;text-align:center;min-height:120px;">';
  html += '<div style="font-size:16px;color:var(--red,#8B1A1A);font-weight:700;margin-bottom:4px">Lá Số Tử Vi</div>';
  html += '<div style="font-size:12px;color:#555;margin-bottom:4px">' + (ls.hoTen || '') + '</div>';
  html += '<div style="font-size:12px;font-weight:600;color:#333">Mệnh: ' + (ls.menhHanh || '?') + '</div>';
  html += '<div style="font-size:11px;color:#666">Cục: <strong style="color:var(--red,#8B1A1A)">' + (ls.cucTen || '?') + '</strong></div>';
  html += '<div style="font-size:10px;color:#888;margin-top:4px">' + (ls.ngaySinh || '') + '</div>';
  html += '</div>';

  /* 12 cung */
  for (var g = 0; g < MAP.length; g++) {
    var m = MAP[g];
    var found = timCungByChi(m.chi);
    var cung = found ? found.cung : null;
    var cungIdx = found ? found.idx : -1;

    html += '<div style="grid-column:' + m.col + ';grid-row:' + m.row + ';';

    if (cung) {
      var tenCung = cung.ten || '—';
      var diaChi = cung.diaChi;
      if (typeof diaChi === 'number') diaChi = CHI[diaChi] || '?';
      var saoArr = cung.sao || [];
      var isMenh = cung.laMenhCung;
      var isThan = cung.laThanCung;
      var isKhong = cung.tuanKhong;

      if (isMenh) {
        html += 'border:2px solid #c0392b;background:#FFF5F5;';
      } else if (isThan) {
        html += 'border:2px solid #c9a000;background:#FFFDF0;';
      } else {
        html += 'border:1px solid #ddd;background:#FFFDF5;';
      }
      html += 'border-radius:5px;padding:6px;font-size:11px;min-height:110px;';
      html += 'position:relative;cursor:pointer;overflow:hidden"';
      if (cungIdx >= 0) html += ' onclick="tvMoCungPopup(' + cungIdx + ')"';
      html += '>';

      /* Tên cung */
      html += '<div style="font-size:9px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:0.4px">' + tenCung + '</div>';
      /* Địa Chi */
      html += '<div style="font-size:12px;font-weight:700;color:#444;margin-bottom:3px">' + diaChi + (isKhong ? ' ✗' : '') + '</div>';

      /* Badge */
      if (isMenh) html += '<span style="position:absolute;top:3px;right:3px;font-size:8px;padding:1px 4px;border-radius:2px;background:#c0392b;color:#FFD700;font-weight:700">M</span>';
      if (isThan) html += '<span style="position:absolute;top:3px;right:3px;font-size:8px;padding:1px 4px;border-radius:2px;background:#c9a000;color:#fff;font-weight:700">T</span>';

      /* Các sao */
      if (saoArr.length > 0) {
        html += '<div style="display:flex;flex-wrap:wrap;gap:2px;margin-top:3px">';
        for (var si = 0; si < saoArr.length; si++) {
          var sao = saoArr[si];
          var tenSao = (typeof sao === 'string') ? sao : (sao.ten || '?');
          html += '<span style="font-size:9px;font-weight:600;padding:1px 3px;border-radius:2px;' + tvSaoStyle(tenSao) + '">' + tenSao + '</span>';
        }
        html += '</div>';
      }
    } else {
      html += 'border:1px dashed #ddd;background:#fafafa;border-radius:5px;padding:6px;min-height:110px">';
      html += '<div style="font-size:11px;color:#bbb">' + CHI[m.chi] + '</div>';
    }

    html += '</div>';
  }

  html += '</div>';
  wrap.innerHTML = html;
  console.log('[TuVi] tvRenderLaSo DONE');
}

/* ============================================================
   tvRenderDaiVan — Render danh sách đại vận
   ============================================================ */
function tvRenderDaiVan(ls) {
  console.log('[TuVi] tvRenderDaiVan');
  var wrap = document.getElementById('tv-dai-van-list');
  if (!wrap) return;

  var daiVanList = ls.daiVanList || [];
  var dvHienTai  = ls.dvHienTai;

  if (daiVanList.length === 0) {
    wrap.innerHTML = '<p style="color:#888;padding:16px">Không có dữ liệu đại vận.</p>';
    return;
  }

  /* Tiểu Vận */
  var tieuVanHtml = '';
  var tieuVanList = ls.tieuVanList || [];
  var namHT = new Date().getFullYear();
  if (tieuVanList.length > 0) {
    tieuVanHtml = '<div style="margin-top:16px"><div style="font-weight:700;margin-bottom:8px;font-size:13px;color:#444">📆 Tiểu Vận Đại Vận Hiện Tại</div>';
    tieuVanHtml += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
    for (var t = 0; t < tieuVanList.length; t++) {
      var tv = tieuVanList[t];
      var isNow = (tv.nam === namHT);
      tieuVanHtml += '<div style="border:1px solid ' + (isNow ? '#c9a000' : '#ddd') + ';border-radius:4px;padding:6px 10px;background:' + (isNow ? '#FFFDF0' : '#fff') + ';min-width:90px;text-align:center">';
      tieuVanHtml += '<div style="font-size:11px;font-weight:700;color:' + (isNow ? '#c9a000' : '#444') + '">' + (tv.can || '') + ' ' + (tv.chi || '') + '</div>';
      tieuVanHtml += '<div style="font-size:10px;color:#888">' + (tv.nam || '') + '</div>';
      if (isNow) tieuVanHtml += '<div style="font-size:9px;color:#c9a000;font-weight:700">Năm nay</div>';
      tieuVanHtml += '</div>';
    }
    tieuVanHtml += '</div></div>';
  }

  var html = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px">';
  for (var i = 0; i < daiVanList.length; i++) {
    var dv = daiVanList[i];
    var isHT = dvHienTai && dv.namBatDau === dvHienTai.namBatDau;
    html += '<div style="border:1px solid ' + (isHT ? '#c9a000' : '#e0d5c0') + ';border-radius:6px;padding:10px;background:' + (isHT ? 'linear-gradient(135deg,#FFF8E7,#FFF0C0)' : '#fff') + ';text-align:center">';
    html += '<div style="font-size:10px;color:#888;margin-bottom:4px">Tuổi ' + (dv.tuoi || '') + '</div>';
    html += '<div style="font-size:14px;font-weight:700;color:' + (isHT ? '#8B1A1A' : '#333') + '">' + (dv.can || '') + ' ' + (dv.chi || '') + '</div>';
    html += '<div style="font-size:10px;color:#888">' + (dv.namBatDau || '') + '–' + (dv.namKetThuc || '') + '</div>';
    if (isHT) html += '<div style="font-size:10px;color:#c9a000;font-weight:700;margin-top:4px">★ ĐANG ĐI</div>';
    html += '</div>';
  }
  html += '</div>';
  html += tieuVanHtml;

  wrap.innerHTML = html;
}

/* ============================================================
   tvMoCungPopup — Mở popup chi tiết cung
   ============================================================ */
function tvMoCungPopup(idx) {
  console.log('[TuVi] tvMoCungPopup', idx);
  if (!_laSo || !_laSo.cacCung) return;
  var cung = _laSo.cacCung[idx];
  if (!cung) return;

  var CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
  var tenCung = cung.ten || '—';
  var diaChi = cung.diaChi;
  if (typeof diaChi === 'number') diaChi = CHI[diaChi] || '?';

  var titleEl = document.getElementById('tv-popup-title');
  if (titleEl) titleEl.textContent = tenCung + ' (' + diaChi + ')';

  var contentEl = document.getElementById('tv-popup-content');
  if (!contentEl) return;

  var saoArr = cung.sao || [];
  var html = '';

  /* Danh sách sao */
  html += '<div style="margin-bottom:12px">';
  html += '<div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:8px">Các Sao Trong Cung</div>';
  html += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
  if (saoArr.length === 0) {
    html += '<span style="color:#999;font-style:italic">Không có sao</span>';
  }
  for (var i = 0; i < saoArr.length; i++) {
    var sao = saoArr[i];
    var tenSao = (typeof sao === 'string') ? sao : (sao.ten || '?');
    html += '<span style="font-size:12px;font-weight:600;padding:3px 8px;border-radius:4px;' + tvSaoStyle(tenSao) + '">' + tenSao + '</span>';
  }
  html += '</div></div>';

  /* Badges */
  if (cung.laMenhCung) html += '<div style="color:#c0392b;font-weight:700;margin-bottom:6px">⭐ Đây là Cung Mệnh</div>';
  if (cung.laThanCung) html += '<div style="color:#c9a000;font-weight:700;margin-bottom:6px">💫 Đây là Cung Thân</div>';
  if (cung.tuanKhong)  html += '<div style="color:#c0392b;margin-bottom:6px">⚠️ Cung nằm trong Tuần Không</div>';

  /* Luận giải từng sao */
  for (var si = 0; si < saoArr.length; si++) {
    var s = saoArr[si];
    var sTen = (typeof s === 'string') ? s : (s.ten || '?');
    var sData = null;
    if (typeof CHINH_TINH_DATA !== 'undefined') sData = CHINH_TINH_DATA[sTen];
    if (!sData && typeof PHU_TINH_DATA !== 'undefined') sData = PHU_TINH_DATA[sTen];
    if (!sData && typeof SAT_TINH_DATA !== 'undefined') sData = SAT_TINH_DATA[sTen];
    if (!sData && typeof TU_HOA_DATA !== 'undefined') sData = TU_HOA_DATA[sTen];
    if (sData) {
      html += '<div style="background:#fff;border:1px solid #e8d5a0;border-radius:6px;padding:10px;margin-bottom:8px">';
      html += '<strong style="color:#8B1A1A">' + sTen + '</strong>';
      if (sData.nguHanh) html += ' <span style="font-size:11px;color:#888">(' + sData.nguHanh + ')</span>';
      html += '<div style="font-size:12px;color:#555;margin-top:6px;line-height:1.6">';
      var luanGiai = '';
      if (sData.cung && sData.cung[tenCung]) luanGiai = sData.cung[tenCung];
      else if (sData.hieuUng && sData.hieuUng[tenCung]) luanGiai = sData.hieuUng[tenCung];
      else if (sData.hieuUng && sData.hieuUng['chung']) luanGiai = sData.hieuUng['chung'];
      else if (sData.dacTinh) luanGiai = sData.dacTinh;
      html += luanGiai;
      html += '</div></div>';
    }
  }

  contentEl.innerHTML = html;

  var popup = document.getElementById('tv-cung-popup');
  if (popup) popup.classList.add('open');
}

/* ============================================================
   tvDongPopup — Đóng popup
   ============================================================ */
function tvDongPopup() {
  var popup = document.getElementById('tv-cung-popup');
  if (popup) popup.classList.remove('open');
}

/* ============================================================
   tvShowTab — Chuyển tab la-so / dai-van / luan-giai
   ============================================================ */
function tvShowTab(name) {
  var tabs = ['la-so', 'dai-van', 'luan-giai'];

  for (var i = 0; i < tabs.length; i++) {
    var el = document.getElementById('tv-tab-' + tabs[i]);
    if (el) el.style.display = (tabs[i] === name) ? '' : 'none';
  }

  var btns = document.querySelectorAll('#tv-tabs .sub-tab');
  for (var j = 0; j < btns.length; j++) {
    btns[j].className = 'sub-tab' + (j === tabs.indexOf(name) ? ' active' : '');
  }

  /* Render luận giải khi chuyển sang tab */
  if (name === 'luan-giai' && _laSo) {
    var lgWrap = document.getElementById('tv-luan-giai-content');
    if (lgWrap && typeof renderLuanGiaiTuVi === 'function') {
      console.log('[TuVi] Calling renderLuanGiaiTuVi...');
      lgWrap.innerHTML = renderLuanGiaiTuVi(_laSo);
      /* Bind tab luận giải */
      if (typeof lgChuyenTab === 'function') lgChuyenTab(0);
    }
  }
}

/* ============================================================
   tvSaoStyle — Trả về CSS inline string theo loại sao
   ============================================================ */
function tvSaoStyle(tenSao) {
  var CT = ['Tử Vi','Thiên Cơ','Thái Dương','Vũ Khúc','Thiên Đồng','Liêm Trinh',
            'Thiên Phủ','Thái Âm','Tham Lang','Cự Môn','Thiên Tướng','Thiên Lương','Thất Sát','Phá Quân'];
  var SAT = ['Kình Dương','Đà La','Hỏa Tinh','Linh Tinh','Địa Không','Địa Kiếp'];
  var CAT = ['Tả Phụ','Hữu Bật','Văn Xương','Văn Khúc','Lộc Tồn','Thiên Mã','Thiên Khôi','Thiên Việt'];
  var HOA = ['Hóa Lộc','Hóa Quyền','Hóa Khoa','Hóa Kỵ'];

  for (var i = 0; i < CT.length; i++) {
    if (tenSao === CT[i]) return 'color:#7B0000;background:rgba(123,0,0,0.08);';
  }
  for (var j = 0; j < SAT.length; j++) {
    if (tenSao === SAT[j]) return 'color:#800;background:rgba(128,0,0,0.05);border:1px dashed #a00;';
  }
  for (var k = 0; k < CAT.length; k++) {
    if (tenSao === CAT[k]) return 'color:#1A5C00;background:rgba(26,92,0,0.08);';
  }
  for (var h = 0; h < HOA.length; h++) {
    if (tenSao === HOA[h]) {
      if (tenSao === 'Hóa Kỵ') return 'color:#800;background:rgba(128,0,0,0.08);border:1px solid #c00;';
      return 'color:#8B6914;background:rgba(139,105,20,0.1);';
    }
  }
  return 'color:#555;background:rgba(0,0,0,0.04);';
}
