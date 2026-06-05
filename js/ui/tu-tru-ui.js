// ══════════════════════════════════════════════════════
// TU-TRU-UI.JS — Giao diện Tứ Trụ Bát Tự
// Hiện kết quả đầy đủ KHÔNG cần AI
// AI chỉ là tính năng bổ sung
// ══════════════════════════════════════════════════════

var _tuTru = null; // Lưu kết quả phân tích

// ─── COLORS NGŨ HÀNH ────────────────────────────────
var HANH_COLORS = {
  'Mộc': { color: '#2D6A00', bg: '#e8f5e0' },
  'Hỏa': { color: '#B80000', bg: '#fce8e8' },
  'Thổ': { color: '#7A5500', bg: '#fff3d0' },
  'Kim': { color: '#555555', bg: '#f0f0f0' },
  'Thủy': { color: '#004080', bg: '#e0f0ff' }
};

var HANH_NGHE = {
  'Mộc': 'Giáo dục, xuất bản, thời trang, nông nghiệp, gỗ nội thất',
  'Hỏa': 'Năng lượng, nhà hàng, giải trí, truyền thông, điện tử',
  'Thổ': 'Bất động sản, xây dựng, nông sản, gốm sứ, khoáng sản',
  'Kim': 'Cơ khí, ngân hàng, tài chính, kim loại, ô tô, công nghệ',
  'Thủy': 'Vận tải, du lịch, thủy sản, nước giải khát, logistics'
};

var HANH_HUONG = {
  'Mộc': 'Đông',
  'Hỏa': 'Nam',
  'Thổ': 'Trung tâm, Đông Bắc, Tây Nam',
  'Kim': 'Tây',
  'Thủy': 'Bắc'
};

var HANH_MAU = {
  'Mộc': 'Xanh lá, xanh lục',
  'Hỏa': 'Đỏ, hồng, tím, cam',
  'Thổ': 'Vàng, nâu, be',
  'Kim': 'Trắng, bạc, xám',
  'Thủy': 'Đen, xanh đậm, xanh dương'
};

var HANH_SO = {
  'Mộc': '3, 8',
  'Hỏa': '2, 7',
  'Thổ': '5, 0 (10)',
  'Kim': '4, 9',
  'Thủy': '1, 6'
};

// Tương sinh
var TUONG_SINH = {
  'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim', 'Kim': 'Thủy', 'Thủy': 'Mộc'
};

// Tương khắc
var TUONG_KHAC = {
  'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim', 'Kim': 'Mộc'
};

// Thập Thần tên
var THAP_THAN_TEN = [
  'Tỷ Kiên', 'Kiếp Tài', 'Thực Thần', 'Thương Quan', 'Thiên Tài',
  'Chính Tài', 'Thiên Quan', 'Chính Quan', 'Thiên Ấn', 'Chính Ấn'
];

// ─── KHỞI TẠO ────────────────────────────────────────
function initTuTru() {
  var fields = ['batu-day', 'batu-month', 'batu-year'];
  for (var i = 0; i < fields.length; i++) {
    var el = document.getElementById(fields[i]);
    if (el) {
      el.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') tuTruPhanTich();
      });
    }
  }
}

// ─── HÀM CHÍNH: PHÂN TÍCH ───────────────────────────
function tuTruPhanTich() {
  var ten = document.getElementById('batu-ten').value.trim() || 'Chưa nhập';
  var day = parseInt(document.getElementById('batu-day').value);
  var month = parseInt(document.getElementById('batu-month').value);
  var year = parseInt(document.getElementById('batu-year').value);
  var gio = parseInt(document.getElementById('batu-gio').value);
  var tz = parseInt(document.getElementById('batu-tz').value);
  var gtEl = document.querySelector('input[name="batu-gt"]:checked');
  var gioiTinh = gtEl ? gtEl.value : 'nam';

  if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
    alert('Vui lòng nhập đầy đủ ngày tháng năm sinh hợp lệ.');
    return;
  }

  try {
    // Gọi engine — hỗ trợ nhiều format
    var data = null;

    if (typeof BatTuEngine !== 'undefined') {
      if (typeof BatTuEngine.phanTich === 'function') {
        data = BatTuEngine.phanTich(day, month, year, gio, tz, gioiTinh);
      } else if (typeof BatTuEngine.tinhBatTu === 'function') {
        data = BatTuEngine.tinhBatTu(day, month, year, gio, tz);
      }
    }

    if (!data && typeof tinhTuTru === 'function') {
      data = tinhTuTru(day, month, year, gio, tz);
    }

    if (!data) {
      // Fallback: tự tính từ can-chi-engine nếu có
      data = tuTruTuTinh(day, month, year, gio, tz);
    }

    if (!data) {
      alert('Không thể phân tích. Kiểm tra bat-tu-engine.js');
      return;
    }

    data.ten = ten;
    data.gioiTinh = gioiTinh;
    data.ngaySinh = { day: day, month: month, year: year, gio: gio, tz: tz };
    _tuTru = data;

    // Render tất cả
    renderTuTru();
    renderThapThan();
    renderNguHanh();
    renderSinhKhac();
    renderThanVuong();
    renderDungThan();
    renderLoiKhuyen();

    // Hiện kết quả
    document.getElementById('batu-ho-ten').textContent = ten;
    document.getElementById('batu-result').style.display = '';
    document.getElementById('batu-tabs').style.display = '';
    tuTruTab('nguhanh');

  } catch (e) {
    console.error('[TuTru]', e);
    alert('Lỗi phân tích: ' + e.message);
  }
}

// ─── FALLBACK: TỰ TÍNH TỪ CAN-CHI-ENGINE ────────────
function tuTruTuTinh(dd, mm, yy, gio, tz) {
  // Cần lunar-engine và can-chi-engine
  if (typeof convertSolar2Lunar === 'undefined' || typeof getCanChi === 'undefined') {
    return null;
  }

  var lunar = convertSolar2Lunar(dd, mm, yy, tz);
  if (!lunar) return null;

  var CAN = (typeof CAN_DATA !== 'undefined') ? CAN_DATA :
            ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
  var CHI = (typeof CHI_DATA !== 'undefined') ? CHI_DATA :
            ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

  // Can Chi năm (âm lịch)
  var lunarYear = Array.isArray(lunar) ? lunar[2] : lunar.year;
  var canNam = (lunarYear + 6) % 10;
  var chiNam = (lunarYear + 8) % 12;

  // Can Chi ngày (Julius Day)
  var jd = tuTruJD(dd, mm, yy);
  var canNgay = (jd + 9) % 10;
  var chiNgay = (jd + 1) % 12;

  // Can Chi tháng (theo Can năm)
  var lunarMonth = Array.isArray(lunar) ? lunar[1] : lunar.month;
  var canThang = (canNam * 2 + lunarMonth) % 10;
  var chiThang = (lunarMonth + 1) % 12;

  // Can Chi giờ
  var canGio = 0, chiGio = 0;
  if (gio >= 0 && gio <= 11) {
    chiGio = gio;
    canGio = (canNgay * 2 + gio) % 10;
  }

  // Ngũ Hành cho Can
  var NGU_HANH_CAN = ['Mộc','Mộc','Hỏa','Hỏa','Thổ','Thổ','Kim','Kim','Thủy','Thủy'];
  var NGU_HANH_CHI = ['Thủy','Thổ','Mộc','Mộc','Thổ','Hỏa','Hỏa','Thổ','Kim','Kim','Thổ','Thủy'];

  // Nạp Âm
  var napAmNam = '', napAmThang = '', napAmNgay = '', napAmGio = '';
  if (typeof getNapAmCanChi === 'function') {
    napAmNam = getNapAmCanChi(canNam, chiNam);
    napAmThang = getNapAmCanChi(canThang, chiThang);
    napAmNgay = getNapAmCanChi(canNgay, chiNgay);
    if (gio >= 0) napAmGio = getNapAmCanChi(canGio, chiGio);
  }

  return {
    tuTru: {
      nam:   { can: canNam, chi: chiNam, canStr: CAN[canNam], chiStr: CHI[chiNam], hanh: NGU_HANH_CAN[canNam], napAm: napAmNam },
      thang: { can: canThang, chi: chiThang, canStr: CAN[canThang], chiStr: CHI[chiThang], hanh: NGU_HANH_CAN[canThang], napAm: napAmThang },
      ngay:  { can: canNgay, chi: chiNgay, canStr: CAN[canNgay], chiStr: CHI[chiNgay], hanh: NGU_HANH_CAN[canNgay], napAm: napAmNgay },
      gio:   { can: canGio, chi: chiGio, canStr: CAN[canGio], chiStr: CHI[chiGio], hanh: NGU_HANH_CAN[canGio], napAm: napAmGio }
    },
    nhatChu: { can: canNgay, chi: chiNgay, canStr: CAN[canNgay], chiStr: CHI[chiNgay], hanh: NGU_HANH_CAN[canNgay] },
    nguHanh: tuTruDemNguHanh(canNam, chiNam, canThang, chiThang, canNgay, chiNgay, canGio, chiGio, NGU_HANH_CAN, NGU_HANH_CHI),
    thangSinh: lunarMonth
  };
}

// Tính Julius Day
function tuTruJD(dd, mm, yy) {
  var a = Math.floor((14 - mm) / 12);
  var y = yy + 4800 - a;
  var m = mm + 12 * a - 3;
  return dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

// Đếm Ngũ Hành
function tuTruDemNguHanh(canNam, chiNam, canThang, chiThang, canNgay, chiNgay, canGio, chiGio, NHC, NHCH) {
  var dem = { 'Kim': 0, 'Mộc': 0, 'Thủy': 0, 'Hỏa': 0, 'Thổ': 0 };
  var cans = [canNam, canThang, canNgay, canGio];
  var chis = [chiNam, chiThang, chiNgay, chiGio];
  for (var i = 0; i < 4; i++) {
    if (NHC[cans[i]]) dem[NHC[cans[i]]]++;
    if (NHCH[chis[i]]) dem[NHCH[chis[i]]]++;
  }
  return dem;
}

// ─── RENDER 4 TRỤ ────────────────────────────────────
function renderTuTru() {
  var wrap = document.getElementById('batu-4tru');
  if (!wrap || !_tuTru) return;

  var tru = _tuTru.tuTru;
  if (!tru) return;

  var labels = ['Trụ Năm', 'Trụ Tháng', 'Trụ Ngày', 'Trụ Giờ'];
  var keys = ['nam', 'thang', 'ngay', 'gio'];
  var html = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">';

  for (var i = 0; i < 4; i++) {
    var t = tru[keys[i]];
    if (!t) continue;
    var canStr = t.canStr || '?';
    var chiStr = t.chiStr || '?';
    var hanh = t.hanh || '';
    var napAm = t.napAm || '';
    var isNC = (i === 2);
    var hc = HANH_COLORS[hanh] || { color: '#333', bg: '#f5f5f5' };

    html += '<div style="background:#fff;border:' + (isNC ? '2px solid var(--red)' : '1px solid var(--cream3)') + ';border-radius:6px;padding:14px;text-align:center">';
    html += '<div style="font-size:11px;color:var(--ink3);text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:10px">' + labels[i] + (isNC ? ' ★' : '') + '</div>';
    html += '<div style="font-family:Noto Serif,serif;font-size:20px;font-weight:700;color:var(--red);line-height:1.2">' + canStr + '</div>';
    html += '<div style="font-family:Noto Serif,serif;font-size:20px;font-weight:700;color:var(--red);line-height:1.2">' + chiStr + '</div>';
    html += '<div style="font-size:12px;color:' + hc.color + ';margin-top:6px;font-weight:600">' + hanh + '</div>';
    if (napAm) html += '<div style="font-size:11px;color:var(--ink3);margin-top:4px">' + napAm + '</div>';
    html += '</div>';
  }
  html += '</div>';
  wrap.innerHTML = html;
}

// ─── RENDER THẬP THẦN ────────────────────────────────
function renderThapThan() {
  var wrap = document.getElementById('batu-thap-than');
  if (!wrap || !_tuTru || !_tuTru.tuTru) return;

  var tru = _tuTru.tuTru;
  var nhatChu = _tuTru.nhatChu || tru.ngay;
  if (!nhatChu) return;

  var ncCan = (typeof nhatChu.can === 'number') ? nhatChu.can : 0;
  var labels = ['Năm', 'Tháng', 'Ngày', 'Giờ'];
  var keys = ['nam', 'thang', 'ngay', 'gio'];

  var html = '<div style="font-size:13px;font-weight:600;color:var(--ink2);margin-bottom:8px">Thập Thần</div>';
  html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';

  for (var i = 0; i < 4; i++) {
    var t = tru[keys[i]];
    if (!t) continue;
    var tCan = (typeof t.can === 'number') ? t.can : 0;
    var ttIdx = (tCan - ncCan + 10) % 10;
    var ttName = THAP_THAN_TEN[ttIdx] || '—';
    if (i === 2) ttName = 'Nhật Chủ';

    html += '<div style="text-align:center;font-size:12px;padding:6px;background:#fff;border:1px solid var(--cream3);border-radius:4px">';
    html += '<div style="color:var(--ink3)">' + labels[i] + '</div>';
    html += '<div style="color:var(--red);font-weight:600">' + ttName + '</div>';
    html += '</div>';
  }
  html += '</div>';
  wrap.innerHTML = html;
}

// ─── RENDER NGŨ HÀNH BARS ────────────────────────────
function renderNguHanh() {
  var wrap = document.getElementById('batu-hanh-bars');
  var nxWrap = document.getElementById('batu-hanh-nhanxet');
  if (!wrap || !_tuTru) return;

  var nh = _tuTru.nguHanh;
  if (!nh) { wrap.innerHTML = ''; return; }

  var total = 0;
  var hanhs = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
  for (var i = 0; i < hanhs.length; i++) total += (nh[hanhs[i]] || 0);
  if (total === 0) total = 1;

  var vuong = '', thieu = '';
  var maxVal = 0, minVal = 99;

  var html = '';
  for (var j = 0; j < hanhs.length; j++) {
    var h = hanhs[j];
    var val = nh[h] || 0;
    var pct = Math.round(val / total * 100);
    var hc = HANH_COLORS[h] || { color: '#333', bg: '#eee' };

    if (val > maxVal) { maxVal = val; vuong = h; }
    if (val < minVal) { minVal = val; thieu = h; }

    html += '<div class="hanh-bar-row">';
    html += '<div class="hanh-bar-label" style="color:' + hc.color + '">' + h + '</div>';
    html += '<div class="hanh-bar-track"><div class="hanh-bar-fill" style="width:' + pct + '%;background:' + hc.color + '"></div></div>';
    html += '<div class="hanh-bar-count">' + val + '/8 (' + pct + '%)</div>';
    html += '</div>';
  }
  wrap.innerHTML = html;

  if (nxWrap) {
    var nxHtml = '<div class="luan-giai-box"><h3>📊 Nhận Xét Ngũ Hành</h3><p>';
    nxHtml += '<strong style="color:' + (HANH_COLORS[vuong] || {}).color + '">' + vuong + '</strong> vượng nhất (' + maxVal + '/8). ';
    if (minVal === 0) {
      nxHtml += '<strong style="color:' + (HANH_COLORS[thieu] || {}).color + '">' + thieu + '</strong> hoàn toàn thiếu — cần bổ sung.';
    } else {
      nxHtml += '<strong style="color:' + (HANH_COLORS[thieu] || {}).color + '">' + thieu + '</strong> yếu nhất (' + minVal + '/8).';
    }
    nxHtml += '</p></div>';
    nxWrap.innerHTML = nxHtml;
  }
}

// ─── RENDER TƯƠNG SINH TƯƠNG KHẮC ────────────────────
function renderSinhKhac() {
  var wrap = document.getElementById('batu-sinh-khac');
  if (!wrap) return;

  var html = '<div style="font-size:13px;color:var(--ink2);line-height:2">';
  html += '<p><strong>Tương Sinh:</strong></p>';
  html += '<p>';
  var hanhs = ['Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy'];
  for (var i = 0; i < hanhs.length; i++) {
    var h = hanhs[i];
    var hc = HANH_COLORS[h] || {};
    html += '<strong style="color:' + hc.color + '">' + h + '</strong>';
    html += (i < 4) ? ' → sinh → ' : ' → sinh → ';
  }
  html += '<strong style="color:' + HANH_COLORS['Mộc'].color + '">Mộc</strong>';
  html += '</p>';

  html += '<p style="margin-top:8px"><strong>Tương Khắc:</strong></p><p>';
  var khac = [['Mộc','Thổ'],['Thổ','Thủy'],['Thủy','Hỏa'],['Hỏa','Kim'],['Kim','Mộc']];
  for (var k = 0; k < khac.length; k++) {
    var a = khac[k][0], b = khac[k][1];
    html += '<strong style="color:' + HANH_COLORS[a].color + '">' + a + '</strong>';
    html += ' ⚔ ';
    html += '<strong style="color:' + HANH_COLORS[b].color + '">' + b + '</strong>';
    if (k < 4) html += ' · ';
  }
  html += '</p></div>';

  // Highlight Nhật Chủ
  if (_tuTru && _tuTru.nhatChu) {
    var ncHanh = _tuTru.nhatChu.hanh || '';
    if (ncHanh) {
      html += '<div style="margin-top:12px;padding:10px;background:var(--cream);border-radius:6px;font-size:13px">';
      html += 'Nhật Chủ <strong style="color:' + (HANH_COLORS[ncHanh] || {}).color + '">' + ncHanh + '</strong>';
      html += ' → sinh ' + (TUONG_SINH[ncHanh] || '') + ', khắc ' + (TUONG_KHAC[ncHanh] || '');
      html += '</div>';
    }
  }
  wrap.innerHTML = html;
}

// ─── RENDER THÂN VƯỢNG / NHƯỢC ───────────────────────
function renderThanVuong() {
  var wrap = document.getElementById('batu-than-vuong');
  if (!wrap || !_tuTru) return;

  var tru = _tuTru.tuTru;
  var nc = _tuTru.nhatChu || tru.ngay;
  if (!nc) return;

  var ncHanh = nc.hanh || '';
  var nh = _tuTru.nguHanh || {};

  // Hành sinh Nhật Chủ
  var sinhNC = '';
  for (var k in TUONG_SINH) { if (TUONG_SINH[k] === ncHanh) { sinhNC = k; break; } }

  // Đếm hỗ trợ vs khắc chế
  var hoTro = (nh[ncHanh] || 0) + (nh[sinhNC] || 0);
  var khacChe = 0;
  for (var h in nh) { if (h !== ncHanh && h !== sinhNC) khacChe += nh[h]; }

  var isVuong = hoTro >= khacChe;
  var ketLuan = isVuong ? 'THÂN VƯỢNG' : 'THÂN NHƯỢC';

  _tuTru.thanVuong = isVuong;

  var html = '<div class="result-grid" style="grid-template-columns:1fr 1fr;margin-top:0">';

  // Ô Nhật Chủ
  html += '<div class="result-box highlight">';
  html += '<div class="rb-label">Nhật Chủ</div>';
  html += '<div class="rb-value" style="color:' + (HANH_COLORS[ncHanh] || {}).color + '">' + (nc.canStr || '') + ' ' + ncHanh + '</div>';
  html += '</div>';

  // Ô Kết Luận
  html += '<div class="result-box highlight">';
  html += '<div class="rb-label">Kết Luận</div>';
  html += '<div class="rb-value" style="color:' + (isVuong ? '#1A5C00' : '#B80000') + '">' + ketLuan + '</div>';
  html += '</div>';
  html += '</div>';

  // Giải thích
  html += '<div class="luan-giai-box" style="margin-top:14px"><h3>📋 Giải Thích</h3><p>';
  html += 'Nhật Chủ <strong>' + (nc.canStr || '') + '</strong> thuộc hành <strong style="color:' + (HANH_COLORS[ncHanh] || {}).color + '">' + ncHanh + '</strong>. ';
  html += 'Lực hỗ trợ (cùng hành + hành sinh): <strong>' + hoTro + '</strong>/8. ';
  html += 'Lực khắc chế: <strong>' + khacChe + '</strong>/8. ';
  if (isVuong) {
    html += 'Nhật Chủ được hỗ trợ nhiều hơn → <strong style="color:#1A5C00">Thân Vượng</strong>. ';
    html += 'Cần hành khắc/tiết chế để cân bằng.';
  } else {
    html += 'Nhật Chủ bị khắc chế nhiều hơn → <strong style="color:#B80000">Thân Nhược</strong>. ';
    html += 'Cần hành sinh/hỗ trợ để bổ sung.';
  }
  html += '</p></div>';
  wrap.innerHTML = html;
}

// ─── RENDER DỤNG THẦN ────────────────────────────────
function renderDungThan() {
  var wrap = document.getElementById('batu-dung-than');
  if (!wrap || !_tuTru) return;

  var nc = _tuTru.nhatChu || (_tuTru.tuTru ? _tuTru.tuTru.ngay : null);
  if (!nc) return;

  var ncHanh = nc.hanh || '';
  var isVuong = _tuTru.thanVuong;

  var dungThan = '', hyThan = '', kyThan = '';

  if (isVuong) {
    dungThan = TUONG_KHAC[ncHanh] || '';
    hyThan = TUONG_SINH[ncHanh] ? TUONG_KHAC[TUONG_SINH[ncHanh]] || '' : '';
    for (var k in TUONG_SINH) { if (TUONG_SINH[k] === ncHanh) { kyThan = k; break; } }
  } else {
    for (var k2 in TUONG_SINH) { if (TUONG_SINH[k2] === ncHanh) { dungThan = k2; break; } }
    hyThan = ncHanh;
    kyThan = TUONG_KHAC[ncHanh] || '';
  }

  _tuTru.dungThan = dungThan;
  _tuTru.hyThan = hyThan;
  _tuTru.kyThan = kyThan;

  var html = '<div class="result-grid" style="grid-template-columns:repeat(3,1fr);margin-top:0">';

  html += '<div class="result-box highlight"><div class="rb-label">Dụng Thần</div>';
  html += '<div class="rb-value" style="color:' + (HANH_COLORS[dungThan] || {}).color + '">' + dungThan + '</div>';
  html += '<div class="rb-sub">Hành cần bổ sung</div></div>';

  html += '<div class="result-box"><div class="rb-label">Hỷ Thần</div>';
  html += '<div class="rb-value" style="color:' + (HANH_COLORS[hyThan] || {}).color + '">' + hyThan + '</div>';
  html += '<div class="rb-sub">Hành hỗ trợ</div></div>';

  html += '<div class="result-box"><div class="rb-label">Kỵ Thần</div>';
  html += '<div class="rb-value" style="color:' + (HANH_COLORS[kyThan] || {}).color + '">' + kyThan + '</div>';
  html += '<div class="rb-sub">Hành cần tránh</div></div>';

  html += '</div>';
  wrap.innerHTML = html;
}

// ─── RENDER LỜI KHUYÊN ──────────────────────────────
function renderLoiKhuyen() {
  var wrap = document.getElementById('batu-loi-khuyen');
  if (!wrap || !_tuTru || !_tuTru.dungThan) return;

  var dt = _tuTru.dungThan;
  var hc = HANH_COLORS[dt] || { color: '#333' };

  var html = '<div class="sk-grid">';

  html += '<div class="sk-box"><div class="sk-title">🎨 Màu Sắc Hợp</div>';
  html += '<div class="sk-item" style="color:' + hc.color + ';font-weight:600">' + (HANH_MAU[dt] || '') + '</div></div>';

  html += '<div class="sk-box"><div class="sk-title">🧭 Hướng Hợp</div>';
  html += '<div class="sk-item" style="color:' + hc.color + ';font-weight:600">' + (HANH_HUONG[dt] || '') + '</div></div>';

  html += '<div class="sk-box"><div class="sk-title">💼 Nghề Nghiệp Hợp</div>';
  html += '<div class="sk-item">' + (HANH_NGHE[dt] || '') + '</div></div>';

  html += '<div class="sk-box"><div class="sk-title">🔢 Số Hợp</div>';
  html += '<div class="sk-item" style="color:' + hc.color + ';font-weight:600">' + (HANH_SO[dt] || '') + '</div></div>';

  html += '</div>';
  wrap.innerHTML = html;
}

// ─── CHUYỂN TAB ──────────────────────────────────────
function tuTruTab(name) {
  var tabs = ['nguhanh', 'thanvuong', 'dungthan', 'ailuan'];
  for (var i = 0; i < tabs.length; i++) {
    var el = document.getElementById('tab-' + tabs[i]);
    if (el) el.style.display = (tabs[i] === name) ? '' : 'none';
  }

  var btns = document.querySelectorAll('#batu-tabs .sub-tab');
  for (var j = 0; j < btns.length; j++) {
    btns[j].className = 'sub-tab' + (j === tabs.indexOf(name) ? ' active' : '');
  }
}

// ─── GỌI AI ──────────────────────────────────────────
function tuTruGoiAI() {
  if (!_tuTru) { alert('Vui lòng phân tích trước.'); return; }

  var loading = document.getElementById('batu-ai-loading');
  var result = document.getElementById('batu-ai-result');
  if (loading) loading.style.display = '';
  if (result) result.style.display = 'none';

  var tru = _tuTru.tuTru;
  var msg = 'Phân tích Tứ Trụ Bát Tự cho ' + _tuTru.ten + ' (' + _tuTru.gioiTinh + '):\n';
  msg += 'Trụ Năm: ' + tru.nam.canStr + ' ' + tru.nam.chiStr + ' (' + tru.nam.hanh + ')\n';
  msg += 'Trụ Tháng: ' + tru.thang.canStr + ' ' + tru.thang.chiStr + ' (' + tru.thang.hanh + ')\n';
  msg += 'Trụ Ngày: ' + tru.ngay.canStr + ' ' + tru.ngay.chiStr + ' (' + tru.ngay.hanh + ') — Nhật Chủ\n';
  if (tru.gio) msg += 'Trụ Giờ: ' + tru.gio.canStr + ' ' + tru.gio.chiStr + ' (' + tru.gio.hanh + ')\n';
  msg += 'Thân: ' + (_tuTru.thanVuong ? 'Vượng' : 'Nhược') + '\n';
  msg += 'Dụng Thần: ' + (_tuTru.dungThan || '') + '\n';

  if (typeof AIService === 'undefined' || typeof AIService.ask !== 'function') {
    if (loading) loading.style.display = 'none';
    if (result) {
      result.style.display = '';
      result.innerHTML = '<div class="luan-giai-box"><p>⚠️ AI Service chưa sẵn sàng. Kết quả phân tích cục bộ phía trên vẫn đầy đủ và chính xác.</p></div>';
    }
    return;
  }

  var sysPrompt = 'Bạn là chuyên gia Tứ Trụ Bát Tự. Dựa trên Bát Tự, phân tích: 1) Nhật Chủ vượng/nhược tại sao, 2) Dụng thần giải thích, 3) Sự nghiệp tài chính sức khỏe tình cảm, 4) Màu sắc hướng nghề hợp. Trả lời tiếng Việt 250-400 từ.';

  AIService.ask(sysPrompt, msg).then(function(text) {
    if (loading) loading.style.display = 'none';
    if (result) {
      result.style.display = '';
      result.innerHTML = '<div class="luan-giai-box"><h3>🤖 AI Luận Đoán</h3><p>' + text.replace(/\n/g, '<br>') + '</p></div>';
    }
  }).catch(function(err) {
    if (loading) loading.style.display = 'none';
    if (result) {
      result.style.display = '';
      result.innerHTML = '<div class="luan-giai-box"><p>⚠️ ' + (err.message || 'AI tạm bận') + '. Kết quả cục bộ phía trên vẫn đầy đủ.</p></div>';
    }
  });
}

// ─── HELPER: MÀU HÀNH CHO CSS CLASS ─────────────────
function tuTruMauHanh(hanh) {
  var map = { 'Mộc': 'moc', 'Hỏa': 'hoa', 'Thổ': 'tho', 'Kim': 'kim', 'Thủy': 'thuy' };
  return map[hanh] || '';
}