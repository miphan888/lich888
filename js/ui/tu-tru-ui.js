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
    var data = null;

    // Gọi BatTuEngine
    if (typeof BatTuEngine !== 'undefined') {
      // Liệt kê tất cả methods có trong engine
      var methods = Object.keys(BatTuEngine);
      console.log('[TuTru] BatTuEngine methods:', methods);

      if (typeof BatTuEngine.phanTich === 'function') {
        data = BatTuEngine.phanTich(day, month, year, gio, tz, gioiTinh);
      } else if (typeof BatTuEngine.phanTichBatTu === 'function') {
        data = BatTuEngine.phanTichBatTu(day, month, year, gio, tz, gioiTinh);
      } else if (typeof BatTuEngine.tinhBatTu === 'function') {
        data = BatTuEngine.tinhBatTu(day, month, year, gio, tz);
      } else if (typeof BatTuEngine.calculate === 'function') {
        data = BatTuEngine.calculate(day, month, year, gio, tz);
      } else {
        // Thử gọi method đầu tiên tìm thấy
        for (var k = 0; k < methods.length; k++) {
          if (typeof BatTuEngine[methods[k]] === 'function') {
            console.log('[TuTru] Trying method:', methods[k]);
            try {
              data = BatTuEngine[methods[k]](day, month, year, gio, tz, gioiTinh);
              if (data) break;
            } catch(ee) { console.log('[TuTru] Method failed:', methods[k], ee); }
          }
        }
      }
    }

    // Thử hàm global
    if (!data && typeof phanTichBatTu === 'function') data = phanTichBatTu(day, month, year, gio, tz);
    if (!data && typeof tinhBatTu === 'function') data = tinhBatTu(day, month, year, gio, tz);
    if (!data && typeof tinhTuTru === 'function') data = tinhTuTru(day, month, year, gio, tz);

    // Fallback: tự tính từ can-chi-engine
    if (!data) {
      console.log('[TuTru] Engine không trả dữ liệu, dùng fallback tự tính');
      data = tuTruTuTinh(day, month, year, gio, tz);
    }

    if (!data) {
      alert('Không thể phân tích. Kiểm tra Console (F12) để xem chi tiết.');
      return;
    }

    // ═══ CHUẨN HÓA DỮ LIỆU ═══
    // Engine có thể trả format khác nhau, chuẩn hóa về format chung

    var CAN = (typeof CAN_DATA !== 'undefined') ? CAN_DATA :
              ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
    var CHI = (typeof CHI_DATA !== 'undefined') ? CHI_DATA :
              ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
    var NGU_HANH_CAN = ['Mộc','Mộc','Hỏa','Hỏa','Thổ','Thổ','Kim','Kim','Thủy','Thủy'];
    var NGU_HANH_CHI = ['Thủy','Thổ','Mộc','Mộc','Thổ','Hỏa','Hỏa','Thổ','Kim','Kim','Thổ','Thủy'];

    // Nếu data chưa có tuTru, build từ các field riêng lẻ
    if (!data.tuTru) {
      var cNam = 0, cThang = 0, cNgay = 0, cGio = 0;
      var zNam = 0, zThang = 0, zNgay = 0, zGio = 0;

      // Thử nhiều format field name
      if (data.canNam !== undefined) {
        cNam = data.canNam; zNam = data.chiNam;
        cThang = data.canThang; zThang = data.chiThang;
        cNgay = data.canNgay; zNgay = data.chiNgay;
        cGio = data.canGio || 0; zGio = data.chiGio || 0;
      } else if (data.nam && typeof data.nam === 'object') {
        cNam = data.nam.can || 0; zNam = data.nam.chi || 0;
        cThang = data.thang ? data.thang.can || 0 : 0; zThang = data.thang ? data.thang.chi || 0 : 0;
        cNgay = data.ngay ? data.ngay.can || 0 : 0; zNgay = data.ngay ? data.ngay.chi || 0 : 0;
        cGio = data.gio ? data.gio.can || 0 : 0; zGio = data.gio ? data.gio.chi || 0 : 0;
      } else if (data.yearPillar || data.year) {
        var yp = data.yearPillar || data.year || {};
        var mp = data.monthPillar || data.month || {};
        var dp = data.dayPillar || data.day || {};
        var hp = data.hourPillar || data.hour || {};
        cNam = yp.can || yp.stem || 0; zNam = yp.chi || yp.branch || 0;
        cThang = mp.can || mp.stem || 0; zThang = mp.chi || mp.branch || 0;
        cNgay = dp.can || dp.stem || 0; zNgay = dp.chi || dp.branch || 0;
        cGio = hp.can || hp.stem || 0; zGio = hp.chi || hp.branch || 0;
      }

      // Nếu giá trị là string, chuyển về index
      if (typeof cNam === 'string') cNam = CAN.indexOf(cNam);
      if (typeof zNam === 'string') zNam = CHI.indexOf(zNam);
      if (typeof cThang === 'string') cThang = CAN.indexOf(cThang);
      if (typeof zThang === 'string') zThang = CHI.indexOf(zThang);
      if (typeof cNgay === 'string') cNgay = CAN.indexOf(cNgay);
      if (typeof zNgay === 'string') zNgay = CHI.indexOf(zNgay);
      if (typeof cGio === 'string') cGio = CAN.indexOf(cGio);
      if (typeof zGio === 'string') zGio = CHI.indexOf(zGio);

      // Đảm bảo index hợp lệ
      cNam = ((cNam || 0) + 10) % 10;
      zNam = ((zNam || 0) + 12) % 12;
      cThang = ((cThang || 0) + 10) % 10;
      zThang = ((zThang || 0) + 12) % 12;
      cNgay = ((cNgay || 0) + 10) % 10;
      zNgay = ((zNgay || 0) + 12) % 12;
      cGio = ((cGio || 0) + 10) % 10;
      zGio = ((zGio || 0) + 12) % 12;

      // Nạp Âm
      var naNam = '', naThang = '', naNgay = '', naGio = '';
      if (typeof getNapAmCanChi === 'function') {
        naNam = getNapAmCanChi(cNam, zNam) || '';
        naThang = getNapAmCanChi(cThang, zThang) || '';
        naNgay = getNapAmCanChi(cNgay, zNgay) || '';
        naGio = getNapAmCanChi(cGio, zGio) || '';
      }

      data.tuTru = {
        nam:   { can: cNam, chi: zNam, canStr: CAN[cNam], chiStr: CHI[zNam], hanh: NGU_HANH_CAN[cNam], napAm: naNam },
        thang: { can: cThang, chi: zThang, canStr: CAN[cThang], chiStr: CHI[zThang], hanh: NGU_HANH_CAN[cThang], napAm: naThang },
        ngay:  { can: cNgay, chi: zNgay, canStr: CAN[cNgay], chiStr: CHI[zNgay], hanh: NGU_HANH_CAN[cNgay], napAm: naNgay },
        gio:   { can: cGio, chi: zGio, canStr: CAN[cGio], chiStr: CHI[zGio], hanh: NGU_HANH_CAN[cGio], napAm: naGio }
      };
    } else {
      // tuTru đã có nhưng có thể thiếu canStr/chiStr
      var keys4 = ['nam', 'thang', 'ngay', 'gio'];
      for (var ki = 0; ki < keys4.length; ki++) {
        var tr = data.tuTru[keys4[ki]];
        if (!tr) continue;
        if (!tr.canStr && typeof tr.can === 'number') tr.canStr = CAN[tr.can];
        if (!tr.chiStr && typeof tr.chi === 'number') tr.chiStr = CHI[tr.chi];
        if (!tr.hanh && typeof tr.can === 'number') tr.hanh = NGU_HANH_CAN[tr.can];
        if (!tr.napAm && typeof tr.can === 'number' && typeof getNapAmCanChi === 'function') {
          tr.napAm = getNapAmCanChi(tr.can, tr.chi) || '';
        }
      }
    }

    // Đảm bảo có nhatChu
    if (!data.nhatChu) {
      data.nhatChu = data.tuTru.ngay;
    }

    // Đảm bảo có nguHanh
    if (!data.nguHanh) {
      var dem = { 'Kim': 0, 'Mộc': 0, 'Thủy': 0, 'Hỏa': 0, 'Thổ': 0 };
      var k4 = ['nam', 'thang', 'ngay', 'gio'];
      for (var di = 0; di < k4.length; di++) {
        var tru = data.tuTru[k4[di]];
        if (!tru) continue;
        var hCan = (typeof tru.can === 'number') ? NGU_HANH_CAN[tru.can] : tru.hanh;
        var hChi = (typeof tru.chi === 'number') ? NGU_HANH_CHI[tru.chi] : '';
        if (hCan && dem[hCan] !== undefined) dem[hCan]++;
        if (hChi && dem[hChi] !== undefined) dem[hChi]++;
      }
      data.nguHanh = dem;
    }

    console.log('[TuTru] Data chuẩn hóa:', data);

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
    console.error('[TuTru] Lỗi:', e);
    alert('Lỗi phân tích: ' + e.message + '\nXem F12 Console để biết chi tiết.');
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

    // Engine trả về can/chi là STRING (tên), không phải index
    var canStr = t.can || '?';
    var chiStr = t.chi || '?';
    var hanh = t.nguHanh || '';
    var isNC = (i === 2);
    var hc = HANH_COLORS[hanh] || { color: '#333', bg: '#f5f5f5' };

    // Nạp Âm
    var napAm = '';
    if (typeof getNapAmCanChi === 'function') {
      // getNapAmCanChi nhận index, cần tìm index từ tên
      var canIdx = ptTimIndex(canStr, ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý']);
      var chiIdx = ptTimIndex(chiStr, ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi']);
      if (canIdx >= 0 && chiIdx >= 0) {
        napAm = getNapAmCanChi(canIdx, chiIdx) || '';
      }
    }

    html += '<div style="background:#fff;border:' + (isNC ? '2px solid var(--red)' : '1px solid var(--cream3)') + ';border-radius:6px;padding:14px;text-align:center">';
    html += '<div style="font-size:11px;color:var(--ink3);text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:10px">' + labels[i] + (isNC ? ' ★' : '') + '</div>';
    html += '<div style="font-family:Noto Serif,serif;font-size:20px;font-weight:700;color:var(--red);line-height:1.2">' + canStr + '</div>';
    html += '<div style="font-family:Noto Serif,serif;font-size:20px;font-weight:700;color:var(--red);line-height:1.2">' + chiStr + '</div>';
    if (hanh) html += '<div style="font-size:12px;color:' + hc.color + ';margin-top:6px;font-weight:600">' + hanh + '</div>';
    if (napAm) html += '<div style="font-size:11px;color:var(--ink3);margin-top:4px">' + napAm + '</div>';
    html += '</div>';
  }
  html += '</div>';
  wrap.innerHTML = html;
}

// Helper: tìm index trong mảng
function ptTimIndex(str, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === str) return i;
  }
  return -1;
}

// ─── RENDER THẬP THẦN ────────────────────────────────
function renderThapThan() {
  var wrap = document.getElementById('batu-thap-than');
  if (!wrap || !_tuTru) return;

  // Dùng cacThan từ engine nếu có
  var cacThan = _tuTru.cacThan;
  var tru = _tuTru.tuTru;
  if (!tru) return;

  var labels = ['Năm', 'Tháng', 'Ngày', 'Giờ'];
  var html = '<div style="font-size:13px;font-weight:600;color:var(--ink2);margin-bottom:8px">Thập Thần</div>';
  html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">';

  var thanValues = ['', '', 'Nhật Chủ', ''];
  if (cacThan) {
    thanValues[0] = cacThan.canNam || '';
    thanValues[1] = cacThan.canThang || '';
    thanValues[3] = cacThan.canGio || '';
  }

  for (var i = 0; i < 4; i++) {
    var ttName = thanValues[i] || '—';
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

  // Engine trả về nguHanh hoặc nguHanhRaw
  var nh = _tuTru.nguHanh || _tuTru.nguHanhRaw;
  if (!nh) { wrap.innerHTML = ''; return; }

  // Engine dùng key không dấu: Kim, Moc, Thuy, Hoa, Tho
  // Cần map lại
  var mapped = {
    'Kim':  nh.Kim  || nh['Kim']  || 0,
    'Mộc':  nh.Moc  || nh['Mộc']  || 0,
    'Thủy': nh.Thuy || nh['Thủy'] || 0,
    'Hỏa':  nh.Hoa  || nh['Hỏa']  || 0,
    'Thổ':  nh.Tho  || nh['Thổ']  || 0
  };

  var total = 0;
  var hanhs = ['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'];
  for (var i = 0; i < hanhs.length; i++) total += mapped[hanhs[i]];
  if (total === 0) total = 1;

  var vuong = '', thieu = '';
  var maxVal = 0, minVal = 99;

  var html = '';
  for (var j = 0; j < hanhs.length; j++) {
    var h = hanhs[j];
    var val = mapped[h];
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
    var nxHtml = '<div class="luan-giai-box"><h3>📊 Nhận Xét</h3><p>';
    nxHtml += '<strong style="color:' + (HANH_COLORS[vuong] || {}).color + '">' + vuong + '</strong> vượng nhất (' + maxVal + '/8). ';
    if (minVal === 0) {
      nxHtml += '<strong style="color:' + (HANH_COLORS[thieu] || {}).color + '">' + thieu + '</strong> hoàn toàn thiếu.';
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

  var vn = _tuTru.vuongNhuoc;
  if (!vn) {
    wrap.innerHTML = '<p>Không đủ dữ liệu phân tích.</p>';
    return;
  }

  var ncHanh = vn.nhNgay || '';
  var isVuong = vn.vuong;
  _tuTru.thanVuong = isVuong;

  var html = '<div class="result-grid" style="grid-template-columns:1fr 1fr;margin-top:0">';
  html += '<div class="result-box highlight"><div class="rb-label">Nhật Chủ</div>';
  html += '<div class="rb-value" style="color:' + (HANH_COLORS[ncHanh] || {}).color + '">' + vn.canNgay + ' ' + ncHanh + '</div></div>';
  html += '<div class="result-box highlight"><div class="rb-label">Kết Luận</div>';
  html += '<div class="rb-value" style="color:' + (isVuong ? '#1A5C00' : '#B80000') + '">' + vn.ketLuan + '</div></div>';
  html += '</div>';

  html += '<div class="luan-giai-box" style="margin-top:14px"><h3>📋 Giải Thích</h3><p>';
  html += 'Nhật Chủ <strong>' + vn.canNgay + '</strong> thuộc hành <strong style="color:' + (HANH_COLORS[ncHanh] || {}).color + '">' + ncHanh + '</strong>. ';
  html += 'Điểm tháng: <strong>' + vn.diemThang + '</strong>/4. ';
  html += 'Điểm hỗ trợ: <strong>' + vn.diemHoTro + '</strong>. ';
  html += 'Tổng: <strong>' + vn.tongDiem + '</strong>. ';
  html += vn.vuong ? 'Thân được hỗ trợ nhiều → <strong style="color:#1A5C00">Thân Vượng</strong>.'
                   : 'Thân bị khắc chế nhiều → <strong style="color:#B80000">Thân Nhược</strong>.';
  html += '</p></div>';
  wrap.innerHTML = html;
}

// ─── RENDER DỤNG THẦN ────────────────────────────────
function renderDungThan() {
  var wrap = document.getElementById('batu-dung-than');
  if (!wrap || !_tuTru) return;

  var dt = _tuTru.dungThan || _tuTru.dungThanRaw;
  if (!dt) {
    wrap.innerHTML = '<p>Không đủ dữ liệu.</p>';
    return;
  }

  _tuTru.dungThanStr = dt.dungThan;

  var html = '<div class="result-grid" style="grid-template-columns:repeat(3,1fr);margin-top:0">';
  html += '<div class="result-box highlight"><div class="rb-label">Dụng Thần</div>';
  html += '<div class="rb-value" style="color:' + (HANH_COLORS[dt.dungThan] || {}).color + '">' + dt.dungThan + '</div>';
  html += '<div class="rb-sub">Hành cần bổ sung</div></div>';

  html += '<div class="result-box"><div class="rb-label">Hỷ Thần</div>';
  html += '<div class="rb-value" style="color:' + (HANH_COLORS[dt.hyThan] || {}).color + '">' + dt.hyThan + '</div>';
  html += '<div class="rb-sub">Hành hỗ trợ</div></div>';

  html += '<div class="result-box"><div class="rb-label">Kỵ Thần</div>';
  html += '<div class="rb-value" style="color:' + (HANH_COLORS[dt.kyThan] || {}).color + '">' + dt.kyThan + '</div>';
  html += '<div class="rb-sub">Hành cần tránh</div></div>';
  html += '</div>';

  if (dt.lyGiai) {
    html += '<div class="luan-giai-box" style="margin-top:14px"><p>' + dt.lyGiai + '</p></div>';
  }

  wrap.innerHTML = html;
}

// ─── RENDER LỜI KHUYÊN ──────────────────────────────
// ─── RENDER LỜI KHUYÊN ──────────────────────────────
function renderLoiKhuyen() {
  var wrap = document.getElementById('batu-loi-khuyen');
  if (!wrap || !_tuTru) return;

  var dungThan = _tuTru.dungThan || '';
  var hyThan = _tuTru.hyThan || '';
  var kyThan = _tuTru.kyThan || '';
  var ncHanh = (_tuTru.nhatChu && _tuTru.nhatChu.hanh) ? _tuTru.nhatChu.hanh : '';

  if (!dungThan) {
    wrap.innerHTML = '<p style="color:var(--ink3)">Vui lòng phân tích trước để xem lời khuyên.</p>';
    return;
  }

  // Bảng dữ liệu
  var MAU_SAC = {
    'Mộc': 'Xanh lá, xanh lục, xanh ngọc',
    'Hỏa': 'Đỏ, hồng, cam, tím, magenta',
    'Thổ': 'Vàng, nâu, be, nâu đất, kem',
    'Kim': 'Trắng, bạc, xám, ánh kim',
    'Thủy': 'Đen, xanh đậm, xanh dương, tím than'
  };

  var HUONG = {
    'Mộc': 'Đông, Đông Nam',
    'Hỏa': 'Nam',
    'Thổ': 'Trung tâm, Đông Bắc, Tây Nam',
    'Kim': 'Tây, Tây Bắc',
    'Thủy': 'Bắc'
  };

  var NGHE = {
    'Mộc': 'Giáo dục, sách báo, xuất bản, thời trang, thiết kế, nông nghiệp, gỗ nội thất, hoa cây cảnh, dệt may, giấy',
    'Hỏa': 'Năng lượng, điện tử, nhà hàng, ẩm thực, giải trí, truyền thông, quảng cáo, nhiếp ảnh, mỹ thuật, chiếu sáng',
    'Thổ': 'Bất động sản, xây dựng, vật liệu, nông sản, gốm sứ, khoáng sản, kho bãi, trung gian, tư vấn',
    'Kim': 'Cơ khí, ngân hàng, tài chính, chứng khoán, kim loại, ô tô, xe máy, công nghệ, luật, quân đội',
    'Thủy': 'Vận tải, du lịch, thủy sản, nước giải khát, logistics, hàng hải, xuất nhập khẩu, truyền thông, ngoại giao'
  };

  var SO = {
    'Mộc': '3, 8, 33, 38, 83, 88',
    'Hỏa': '2, 7, 27, 72, 77',
    'Thổ': '0, 5, 10, 50, 55',
    'Kim': '4, 9, 49, 94, 99',
    'Thủy': '1, 6, 16, 61, 66'
  };

  var MUA = {
    'Mộc': 'Xuân (tháng 1-3 âm lịch)',
    'Hỏa': 'Hạ (tháng 4-6 âm lịch)',
    'Thổ': 'Cuối mỗi mùa (tháng 3, 6, 9, 12 âm lịch)',
    'Kim': 'Thu (tháng 7-9 âm lịch)',
    'Thủy': 'Đông (tháng 10-12 âm lịch)'
  };

  var VAT_PHAM = {
    'Mộc': 'Cây xanh, đồ gỗ, sách, tranh phong cảnh, tượng rồng gỗ',
    'Hỏa': 'Đèn pha lê, nến, tranh mặt trời, đồ đỏ, đá ruby',
    'Thổ': 'Đá phong thủy, gốm sứ, tượng Phật, hũ tài lộc, thạch anh vàng',
    'Kim': 'Chuông gió kim loại, đồng hồ, tượng kim loại, đá thạch anh trắng',
    'Thủy': 'Bể cá, thác nước mini, tranh biển, đá obsidian, gương'
  };

  var hcDT = HANH_COLORS[dungThan] || { color: '#333', bg: '#f5f5f5' };
  var hcHT = HANH_COLORS[hyThan] || { color: '#333', bg: '#f5f5f5' };
  var hcKT = HANH_COLORS[kyThan] || { color: '#333', bg: '#f5f5f5' };

  var html = '';

  // Tổng quan
  html += '<div class="luan-giai-box" style="margin-bottom:16px">';
  html += '<h3>📋 Tổng Quan Mệnh</h3>';
  html += '<p>Nhật Chủ thuộc hành <strong style="color:' + (HANH_COLORS[ncHanh] || {}).color + '">' + ncHanh + '</strong>. ';
  html += 'Thân <strong>' + (_tuTru.thanVuong ? 'Vượng' : 'Nhược') + '</strong>. ';
  html += 'Dụng Thần là <strong style="color:' + hcDT.color + '">' + dungThan + '</strong> — ';
  if (_tuTru.thanVuong) {
    html += 'cần hành khắc chế/tiết chế Nhật Chủ để cân bằng.';
  } else {
    html += 'cần hành sinh trợ Nhật Chủ để bổ sung sức mạnh.';
  }
  html += '</p></div>';

  // Grid lời khuyên
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">';

  // Màu sắc hợp
  html += '<div class="sk-box">';
  html += '<div class="sk-title">🎨 Màu Sắc Nên Dùng</div>';
  html += '<div class="sk-item"><strong style="color:' + hcDT.color + '">Dụng (' + dungThan + '):</strong> ' + (MAU_SAC[dungThan] || '') + '</div>';
  html += '<div class="sk-item"><strong style="color:' + hcHT.color + '">Hỷ (' + hyThan + '):</strong> ' + (MAU_SAC[hyThan] || '') + '</div>';
  html += '<div class="sk-item" style="color:#c00"><strong>Tránh (' + kyThan + '):</strong> ' + (MAU_SAC[kyThan] || '') + '</div>';
  html += '</div>';

  // Hướng hợp
  html += '<div class="sk-box">';
  html += '<div class="sk-title">🧭 Hướng Nhà / Bàn Làm Việc</div>';
  html += '<div class="sk-item"><strong style="color:' + hcDT.color + '">Tốt nhất:</strong> ' + (HUONG[dungThan] || '') + '</div>';
  html += '<div class="sk-item"><strong style="color:' + hcHT.color + '">Tốt:</strong> ' + (HUONG[hyThan] || '') + '</div>';
  html += '<div class="sk-item" style="color:#c00"><strong>Tránh:</strong> ' + (HUONG[kyThan] || '') + '</div>';
  html += '</div>';

  // Nghề nghiệp
  html += '<div class="sk-box">';
  html += '<div class="sk-title">💼 Nghề Nghiệp Hợp</div>';
  html += '<div class="sk-item"><strong style="color:' + hcDT.color + '">' + dungThan + ':</strong> ' + (NGHE[dungThan] || '') + '</div>';
  html += '<div class="sk-item"><strong style="color:' + hcHT.color + '">' + hyThan + ':</strong> ' + (NGHE[hyThan] || '') + '</div>';
  html += '</div>';

  // Số hợp
  html += '<div class="sk-box">';
  html += '<div class="sk-title">🔢 Số Hợp (Điện Thoại, Biển Số)</div>';
  html += '<div class="sk-item"><strong style="color:' + hcDT.color + '">Tốt nhất (' + dungThan + '):</strong> ' + (SO[dungThan] || '') + '</div>';
  html += '<div class="sk-item"><strong style="color:' + hcHT.color + '">Tốt (' + hyThan + '):</strong> ' + (SO[hyThan] || '') + '</div>';
  html += '<div class="sk-item" style="color:#c00"><strong>Tránh (' + kyThan + '):</strong> ' + (SO[kyThan] || '') + '</div>';
  html += '</div>';

  // Mùa vượng
  html += '<div class="sk-box">';
  html += '<div class="sk-title">🌸 Mùa Vượng Nhất</div>';
  html += '<div class="sk-item"><strong style="color:' + hcDT.color + '">' + dungThan + ':</strong> ' + (MUA[dungThan] || '') + '</div>';
  html += '<div class="sk-item"><strong style="color:' + hcHT.color + '">' + hyThan + ':</strong> ' + (MUA[hyThan] || '') + '</div>';
  html += '</div>';

  // Vật phẩm phong thủy
  html += '<div class="sk-box">';
  html += '<div class="sk-title">🏺 Vật Phẩm Phong Thủy</div>';
  html += '<div class="sk-item"><strong style="color:' + hcDT.color + '">' + dungThan + ':</strong> ' + (VAT_PHAM[dungThan] || '') + '</div>';
  html += '<div class="sk-item"><strong style="color:' + hcHT.color + '">' + hyThan + ':</strong> ' + (VAT_PHAM[hyThan] || '') + '</div>';
  html += '</div>';

  html += '</div>'; // đóng grid

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