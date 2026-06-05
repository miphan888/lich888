// ══════════════════════════════════════════════════════
// PHONG-THUY-UI.JS — Giao diện Phong Thủy
// ══════════════════════════════════════════════════════

function initPhongThuy() {
  // Điền ngày hôm nay
  var now = new Date();
  var dEl = document.getElementById('pt-day');
  var mEl = document.getElementById('pt-month');
  var yEl = document.getElementById('pt-year');
  if (dEl) dEl.value = now.getDate();
  if (mEl) mEl.value = now.getMonth() + 1;
  if (yEl) yEl.value = now.getFullYear();

  // Render bảng trực
  ptRenderTruc();

  // Render ngũ hành info
  ptRenderNguHanh();

  // Render tục ngữ random
  ptRenderTucNgu();

  // Tự động xem giờ cho hôm nay
  ptXemGio();
}

// ─── XEM GIỜ HOÀNG ĐẠO ──────────────────────────────
function ptXemGio() {
  var dd = parseInt(document.getElementById('pt-day').value);
  var mm = parseInt(document.getElementById('pt-month').value);
  var yy = parseInt(document.getElementById('pt-year').value);

  if (!dd || !mm || !yy) { alert('Nhập đầy đủ ngày tháng năm.'); return; }

  try {
    // Tính Can Chi ngày
    var jd = ptJuliusDay(dd, mm, yy);
    var canNgay = (jd + 9) % 10;
    var chiNgay = (jd + 1) % 12;

    var CAN = (typeof CAN_DATA !== 'undefined') ? CAN_DATA :
              ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
    var CHI = (typeof CHI_DATA !== 'undefined') ? CHI_DATA :
              ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

    // Hiện can ngày
    var canNgayEl = document.getElementById('pt-can-ngay');
    if (canNgayEl) canNgayEl.textContent = CAN[canNgay] + ' ' + CHI[chiNgay];

    // Tính trực ngày
    var trucNgay = ptTinhTruc(dd, mm, yy);
    var trucEl = document.getElementById('pt-truc-ngay');
    if (trucEl) trucEl.textContent = 'Trực ' + trucNgay;

    // Render 12 giờ
    ptRenderGioGrid(canNgay, CHI);

    // Render thông tin ngày
    ptRenderNgayInfo(dd, mm, yy, canNgay, chiNgay, CAN, CHI, trucNgay);

    // Render hướng xuất hành
    ptRenderHuong(canNgay);

    // Highlight trực trong bảng
    ptHighlightTruc(trucNgay);

    // Hiện kết quả
    document.getElementById('pt-gio-result').style.display = '';
    document.getElementById('pt-ngay-info').style.display = '';

  } catch (e) {
    console.error('[PhongThuy]', e);
    alert('Lỗi: ' + e.message);
  }
}

// ─── RENDER GRID 12 GIỜ ──────────────────────────────
function ptRenderGioGrid(canNgay, CHI) {
  var grid = document.getElementById('pt-gio-grid');
  if (!grid) return;

  // Tính giờ hoàng đạo theo Can ngày
  var hoangDao = ptTinhHoangDao(canNgay);

  var GIO_RANGE = [
    '23:00-01:00','01:00-03:00','03:00-05:00','05:00-07:00',
    '07:00-09:00','09:00-11:00','11:00-13:00','13:00-15:00',
    '15:00-17:00','17:00-19:00','19:00-21:00','21:00-23:00'
  ];

  var SAO_HOANG = ['Thanh Long','Minh Đường','Thiên Hình','Chu Tước','Kim Quỹ','Thiên Đức',
                   'Bạch Hổ','Ngọc Đường','Thiên Lao','Huyền Vũ','Tư Mệnh','Câu Trận'];

  // Vị trí bắt đầu Thanh Long theo Can ngày
  var startPos = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
  var start = startPos[canNgay] || 0;

  var html = '';
  for (var i = 0; i < 12; i++) {
    var saoIdx = (i + 12 - start) % 12;
    var saoTen = SAO_HOANG[saoIdx] || '';
    var isHoang = hoangDao.indexOf(i) !== -1;

    html += '<div class="gio-item ' + (isHoang ? 'hoang' : 'hac') + '">';
    html += '<div class="gio-chi">' + CHI[i] + '</div>';
    html += '<div class="gio-time">' + GIO_RANGE[i] + '</div>';
    html += '<div class="gio-badge">' + (isHoang ? '✓ Hoàng Đạo' : '✗ Hắc Đạo') + '</div>';
    html += '<div style="font-size:9px;color:var(--ink3);margin-top:2px">' + saoTen + '</div>';
    html += '</div>';
  }
  grid.innerHTML = html;
}

// ─── TÍNH GIỜ HOÀNG ĐẠO ─────────────────────────────
function ptTinhHoangDao(canNgay) {
  // Hoàng Đạo theo Can ngày (index Địa Chi)
  var bangHD = [
    [0,1,4,5,8,9],   // Giáp, Kỷ
    [2,3,6,7,10,11],  // Ất, Canh
    [0,1,4,5,8,9],   // Bính, Tân
    [2,3,6,7,10,11],  // Đinh, Nhâm
    [0,1,4,5,8,9],   // Mậu, Quý
  ];

  // Bảng chi tiết hơn theo từng Can
  var hdMap = {
    0: [0,1,4,5,8,9],    // Giáp
    1: [2,3,6,7,10,11],   // Ất
    2: [0,1,4,5,8,9],    // Bính
    3: [2,3,6,7,10,11],   // Đinh
    4: [0,1,4,5,8,9],    // Mậu
    5: [0,1,4,5,8,9],    // Kỷ
    6: [2,3,6,7,10,11],   // Canh
    7: [0,1,4,5,8,9],    // Tân
    8: [2,3,6,7,10,11],   // Nhâm
    9: [0,1,4,5,8,9]     // Quý
  };

  // Dùng engine nếu có
  if (typeof getGioHoangDao === 'function') {
    var result = getGioHoangDao(canNgay);
    if (result && result.length) return result;
  }

  return hdMap[canNgay] || [0,1,4,5,8,9];
}

// ─── RENDER THÔNG TIN NGÀY ───────────────────────────
function ptRenderNgayInfo(dd, mm, yy, canNgay, chiNgay, CAN, CHI, trucNgay) {
  var wrap = document.getElementById('pt-ngay-detail');
  if (!wrap) return;

  // Ngày âm lịch
  var amLich = '—';
  if (typeof convertSolar2Lunar === 'function') {
    var lunar = convertSolar2Lunar(dd, mm, yy, 7);
    if (lunar) {
      var ld = Array.isArray(lunar) ? lunar[0] : lunar.day;
      var lm = Array.isArray(lunar) ? lunar[1] : lunar.month;
      var ly = Array.isArray(lunar) ? lunar[2] : lunar.year;
      amLich = ld + '/' + lm + ' âm lịch (năm ' + ly + ')';
    }
  }

  // Can Chi năm
  var canNam = (yy + 6) % 10;
  var chiNam = (yy + 8) % 12;

  // Nạp Âm
  var napAm = '—';
  if (typeof getNapAmCanChi === 'function') {
    napAm = getNapAmCanChi(canNgay, chiNgay) || '—';
  }

  var html = '';
  html += '<div class="info-row"><span class="info-label">Ngày dương</span><span class="info-value">' + dd + '/' + mm + '/' + yy + '</span></div>';
  html += '<div class="info-row"><span class="info-label">Ngày âm</span><span class="info-value red">' + amLich + '</span></div>';
  html += '<div class="info-row"><span class="info-label">Can Chi ngày</span><span class="info-value">' + CAN[canNgay] + ' ' + CHI[chiNgay] + '</span></div>';
  html += '<div class="info-row"><span class="info-label">Can Chi năm</span><span class="info-value">' + CAN[canNam] + ' ' + CHI[chiNam] + '</span></div>';
  html += '<div class="info-row"><span class="info-label">Nạp Âm ngày</span><span class="info-value gold">' + napAm + '</span></div>';
  html += '<div class="info-row"><span class="info-label">Thập Nhị Trực</span><span class="info-value">' + trucNgay + '</span></div>';

  wrap.innerHTML = html;
}

// ─── RENDER HƯỚNG XUẤT HÀNH ──────────────────────────
function ptRenderHuong(canNgay) {
  var wrap = document.getElementById('pt-huong-grid');
  if (!wrap) return;

  var huong = null;
  if (typeof getHuongXuatHanh === 'function') {
    huong = getHuongXuatHanh(canNgay);
  }

  if (!huong) {
    // Fallback bảng cố định
    var HY_THAN = ['Đông Bắc','Tây Bắc','Tây Nam','Nam','Bắc','Đông Bắc','Tây Bắc','Tây Nam','Nam','Bắc'];
    var TAI_THAN = ['Đông','Đông','Nam','Nam','Bắc','Bắc','Tây','Tây','Nam','Đông'];
    huong = {
      hyThan: HY_THAN[canNgay] || '—',
      taiThan: TAI_THAN[canNgay] || '—',
      quanNhan: 'Đông Nam',
      hacThan: 'Tây'
    };
  }

  var html = '';
  html += '<div class="result-box highlight"><div class="rb-label">Hỷ Thần</div><div class="rb-value" style="font-size:16px">' + (huong.hyThan || '—') + '</div><div class="rb-sub">Hướng vui mừng</div></div>';
  html += '<div class="result-box highlight"><div class="rb-label">Tài Thần</div><div class="rb-value" style="font-size:16px">' + (huong.taiThan || '—') + '</div><div class="rb-sub">Hướng tài lộc</div></div>';
  html += '<div class="result-box"><div class="rb-label">Quý Nhân</div><div class="rb-value" style="font-size:16px">' + (huong.quanNhan || huong.quyNhan || '—') + '</div><div class="rb-sub">Hướng quý nhân</div></div>';
  html += '<div class="result-box"><div class="rb-label">Hắc Thần ⚠</div><div class="rb-value" style="font-size:16px;color:#c00">' + (huong.hacThan || '—') + '</div><div class="rb-sub">Hướng cần tránh</div></div>';

  wrap.innerHTML = html;
}

// ─── ĐỔI NGÀY DƯƠNG → ÂM ────────────────────────────
function ptDoiNgay() {
  var dd = parseInt(document.getElementById('pt-dc-d').value);
  var mm = parseInt(document.getElementById('pt-dc-m').value);
  var yy = parseInt(document.getElementById('pt-dc-y').value);

  if (!dd || !mm || !yy) { alert('Nhập đầy đủ ngày tháng năm.'); return; }

  var resultEl = document.getElementById('pt-doi-ngay-result');
  if (!resultEl) return;

  var CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
  var CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

  var html = '<h3>📅 Kết Quả Đổi Ngày</h3><p>';

  if (typeof convertSolar2Lunar === 'function') {
    var lunar = convertSolar2Lunar(dd, mm, yy, 7);
    if (lunar) {
      var ld = Array.isArray(lunar) ? lunar[0] : lunar.day;
      var lm = Array.isArray(lunar) ? lunar[1] : lunar.month;
      var ly = Array.isArray(lunar) ? lunar[2] : lunar.year;
      html += 'Ngày dương: <strong>' + dd + '/' + mm + '/' + yy + '</strong><br>';
      html += 'Ngày âm: <strong style="color:var(--red)">' + ld + '/' + lm + ' âm lịch (năm ' + ly + ')</strong><br>';
    }
  }

  var jd = ptJuliusDay(dd, mm, yy);
  var canN = (jd + 9) % 10;
  var chiN = (jd + 1) % 12;
  html += 'Can Chi ngày: <strong>' + CAN[canN] + ' ' + CHI[chiN] + '</strong>';

  var napAm = '';
  if (typeof getNapAmCanChi === 'function') {
    napAm = getNapAmCanChi(canN, chiN);
    if (napAm) html += '<br>Nạp Âm: <strong style="color:var(--gold)">' + napAm + '</strong>';
  }

  html += '</p>';
  resultEl.innerHTML = html;
  resultEl.style.display = '';
}

// ─── RENDER BẢNG TRỰC ────────────────────────────────
function ptRenderTruc() {
  var tbody = document.getElementById('pt-truc-tbody');
  if (!tbody) return;
  if (typeof THAP_NHI_TRUC === 'undefined') return;

  var html = '';
  for (var i = 0; i < THAP_NHI_TRUC.length; i++) {
    var t = THAP_NHI_TRUC[i];
    html += '<tr id="truc-row-' + t.ten + '">';
    html += '<td class="truc-name">' + t.ten + '<br><span style="font-size:11px;font-weight:400;color:var(--ink3)">' + t.moTa + '</span></td>';
    html += '<td class="tot">' + t.tot.join(', ') + '</td>';
    html += '<td class="xau">' + t.xau.join(', ') + '</td>';
    html += '</tr>';
  }
  tbody.innerHTML = html;
}

// ─── HIGHLIGHT TRỰC NGÀY ─────────────────────────────
function ptHighlightTruc(trucTen) {
  // Bỏ highlight cũ
  var rows = document.querySelectorAll('#pt-truc-tbody tr');
  for (var i = 0; i < rows.length; i++) {
    rows[i].className = '';
  }
  // Highlight mới
  var row = document.getElementById('truc-row-' + trucTen);
  if (row) row.className = 'truc-highlight';
}

// ─── RENDER NGŨ HÀNH ─────────────────────────────────
function ptRenderNguHanh() {
  var wrap = document.getElementById('pt-ngu-hanh-info');
  if (!wrap) return;

  var html = '<p style="font-size:13px;color:var(--ink2);line-height:1.8">';
  html += '<strong>Tương Sinh:</strong> ';
  html += '<strong style="color:#2D6A00">Mộc</strong> → ';
  html += '<strong style="color:#B80000">Hỏa</strong> → ';
  html += '<strong style="color:#7A5500">Thổ</strong> → ';
  html += '<strong style="color:#555">Kim</strong> → ';
  html += '<strong style="color:#004080">Thủy</strong> → ';
  html += '<strong style="color:#2D6A00">Mộc</strong>';
  html += '</p><p style="font-size:13px;color:var(--ink2);line-height:1.8;margin-top:6px">';
  html += '<strong>Tương Khắc:</strong> ';
  html += '<strong style="color:#2D6A00">Mộc</strong> ⚔ <strong style="color:#7A5500">Thổ</strong> · ';
  html += '<strong style="color:#7A5500">Thổ</strong> ⚔ <strong style="color:#004080">Thủy</strong> · ';
  html += '<strong style="color:#004080">Thủy</strong> ⚔ <strong style="color:#B80000">Hỏa</strong> · ';
  html += '<strong style="color:#B80000">Hỏa</strong> ⚔ <strong style="color:#555">Kim</strong> · ';
  html += '<strong style="color:#555">Kim</strong> ⚔ <strong style="color:#2D6A00">Mộc</strong>';
  html += '</p>';
  wrap.innerHTML = html;
}

// ─── RENDER TỤC NGỮ ─────────────────────────────────
function ptRenderTucNgu() {
  var el = document.getElementById('pt-tuc-ngu');
  if (!el || typeof TUC_NGU_DATA === 'undefined') return;
  var idx = Math.floor(Math.random() * TUC_NGU_DATA.length);
  el.textContent = '"' + TUC_NGU_DATA[idx] + '"';
}

// ─── TÍNH TRỰC NGÀY ─────────────────────────────────
function ptTinhTruc(dd, mm, yy) {
  if (typeof getTruc === 'function') {
    var t = getTruc(dd, mm, yy);
    if (t) return t;
  }
  if (typeof phanTichNgay === 'function') {
    var pt = phanTichNgay(dd, mm, yy, 7);
    if (pt && pt.truc) return pt.truc;
    if (pt && pt.trucData && pt.trucData.ten) return pt.trucData.ten;
  }
  // Fallback
  var jd = ptJuliusDay(dd, mm, yy);
  var chiNgay = (jd + 1) % 12;
  var trucList = ['Kiến','Trừ','Mãn','Bình','Định','Chấp','Phá','Nguy','Thành','Thu','Khai','Bế'];

  var lunar = null;
  if (typeof convertSolar2Lunar === 'function') {
    lunar = convertSolar2Lunar(dd, mm, yy, 7);
  }
  var lunarMonth = lunar ? (Array.isArray(lunar) ? lunar[1] : lunar.month) : mm;
  var chiThang = (lunarMonth + 1) % 12;
  var trucIdx = (chiNgay - chiThang + 12) % 12;
  return trucList[trucIdx] || 'Kiến';
}

// ─── JULIUS DAY ──────────────────────────────────────
function ptJuliusDay(dd, mm, yy) {
  var a = Math.floor((14 - mm) / 12);
  var y = yy + 4800 - a;
  var m = mm + 12 * a - 3;
  return dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

// ─── GỌI AI TƯ VẤN ──────────────────────────────────
function ptGoiAI() {
  var question = document.getElementById('pt-ai-question').value.trim();
  if (!question) { alert('Vui lòng nhập câu hỏi.'); return; }

  var loading = document.getElementById('pt-ai-loading');
  var result = document.getElementById('pt-ai-result');
  if (loading) loading.style.display = '';
  if (result) result.style.display = 'none';

  if (typeof AIService === 'undefined' || typeof AIService.ask !== 'function') {
    if (loading) loading.style.display = 'none';
    if (result) {
      result.style.display = '';
      result.innerHTML = '<div class="luan-giai-box"><p>⚠️ AI chưa sẵn sàng. Vui lòng thử lại sau.</p></div>';
    }
    return;
  }

  var sys = 'Bạn là chuyên gia Phong Thủy Việt Nam. Trả lời về hướng nhà, màu sắc hợp mệnh, bố trí nhà cửa, ngày giờ tốt, vật phẩm phong thủy. Tiếng Việt, 150-300 từ, thực tế.';

  AIService.ask(sys, question).then(function(text) {
    if (loading) loading.style.display = 'none';
    if (result) {
      result.style.display = '';
      result.innerHTML = '<div class="luan-giai-box"><h3>🤖 AI Tư Vấn</h3><p>' + text.replace(/\n/g, '<br>') + '</p></div>';
    }
  }).catch(function(err) {
    if (loading) loading.style.display = 'none';
    if (result) {
      result.style.display = '';
      result.innerHTML = '<div class="luan-giai-box"><p>⚠️ ' + (err.message || 'AI tạm bận') + '</p></div>';
    }
  });
}