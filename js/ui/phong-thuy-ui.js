/* ============================================================
   phong-thuy-ui.js — Module UI cho trang Phong Thủy
   Lịch Việt Nam 888
   Export hàm initPhongThuy() được gọi bởi app.js
   Phụ thuộc: can-chi-engine.js, lunar-engine.js,
              thap-nhi-truc.js, tuc-ngu.js, phong-thuy-ai.js
   ============================================================ */

/* ============================================================
   DỮ LIỆU NGŨ HÀNH
   ============================================================ */
var PT_NGU_HANH = [
  {
    key: 'kim',
    ten: 'Kim',
    icon: '🪙',
    mau: 'Trắng / Vàng',
    huong: 'Tây, Tây Bắc',
    mua: 'Thu',
    so: '4, 9',
    moTa: 'Kim loại, khoáng sản'
  },
  {
    key: 'moc',
    ten: 'Mộc',
    icon: '🌳',
    mau: 'Xanh lá',
    huong: 'Đông, Đông Nam',
    mua: 'Xuân',
    so: '3, 8',
    moTa: 'Cây cối, sinh trưởng'
  },
  {
    key: 'thuy',
    ten: 'Thủy',
    icon: '💧',
    mau: 'Đen / Xanh dương',
    huong: 'Bắc',
    mua: 'Đông',
    so: '1, 6',
    moTa: 'Nước, chảy, trí tuệ'
  },
  {
    key: 'hoa',
    ten: 'Hỏa',
    icon: '🔥',
    mau: 'Đỏ',
    huong: 'Nam',
    mua: 'Hạ',
    so: '2, 7',
    moTa: 'Lửa, nhiệt, sáng tạo'
  },
  {
    key: 'tho',
    ten: 'Thổ',
    icon: '🌍',
    mau: 'Vàng / Nâu',
    huong: 'Trung tâm',
    mua: 'Trung gian',
    so: '5, 10',
    moTa: 'Đất, bền vững, trung tín'
  }
];

/* ============================================================
   DỮ LIỆU HƯỚNG TỐT THEO CHI NGÀY
   Theo Can Chi ngày → hướng xuất hành tốt (truyền thống)
   ============================================================ */
var PT_HUONG_THEO_CAN = {
  'Giáp': [
    { icon: '⬆', ten: 'Bắc', moTa: 'Hướng chính cát' },
    { icon: '↗', ten: 'Đông Bắc', moTa: 'Tài lộc' },
    { icon: '➡', ten: 'Đông', moTa: 'Sinh khí' }
  ],
  'Kỷ': [
    { icon: '⬆', ten: 'Bắc', moTa: 'Hướng chính cát' },
    { icon: '↗', ten: 'Đông Bắc', moTa: 'Tài lộc' },
    { icon: '➡', ten: 'Đông', moTa: 'Sinh khí' }
  ],
  'Ất': [
    { icon: '⬇', ten: 'Nam', moTa: 'Hướng chính cát' },
    { icon: '↘', ten: 'Đông Nam', moTa: 'Quan lộc' },
    { icon: '➡', ten: 'Đông', moTa: 'Sinh khí' }
  ],
  'Canh': [
    { icon: '⬇', ten: 'Nam', moTa: 'Hướng chính cát' },
    { icon: '↘', ten: 'Đông Nam', moTa: 'Quan lộc' },
    { icon: '⬅', ten: 'Tây', moTa: 'Bình an' }
  ],
  'Bính': [
    { icon: '↗', ten: 'Đông Bắc', moTa: 'Hướng cát' },
    { icon: '⬅', ten: 'Tây', moTa: 'Tài lộc' },
    { icon: '⬆', ten: 'Bắc', moTa: 'Quý nhân' }
  ],
  'Tân': [
    { icon: '↗', ten: 'Đông Bắc', moTa: 'Hướng cát' },
    { icon: '⬅', ten: 'Tây', moTa: 'Tài lộc' },
    { icon: '↙', ten: 'Tây Nam', moTa: 'Bình an' }
  ],
  'Đinh': [
    { icon: '↘', ten: 'Đông Nam', moTa: 'Hướng cát' },
    { icon: '↗', ten: 'Đông Bắc', moTa: 'Quý nhân' },
    { icon: '⬆', ten: 'Bắc', moTa: 'Tài lộc' }
  ],
  'Nhâm': [
    { icon: '↘', ten: 'Đông Nam', moTa: 'Hướng cát' },
    { icon: '⬇', ten: 'Nam', moTa: 'Sinh khí' },
    { icon: '⬆', ten: 'Bắc', moTa: 'Bình an' }
  ],
  'Mậu': [
    { icon: '⬇', ten: 'Nam', moTa: 'Hướng chính cát' },
    { icon: '↙', ten: 'Tây Nam', moTa: 'Tài lộc' },
    { icon: '↘', ten: 'Đông Nam', moTa: 'Quý nhân' }
  ],
  'Quý': [
    { icon: '⬇', ten: 'Nam', moTa: 'Hướng chính cát' },
    { icon: '↙', ten: 'Tây Nam', moTa: 'Tài lộc' },
    { icon: '⬅', ten: 'Tây', moTa: 'Bình an' }
  ]
};

/* ============================================================
   STATE
   ============================================================ */
var _ptNgayHienTai = null;   /* Ngày đang tra cứu */
var _ptIsAILoading = false;  /* Đang gọi AI */

/* ============================================================
   initPhongThuy — Điểm khởi động, app.js gọi
   ============================================================ */
function initPhongThuy() {
  /* Điền ngày hiện tại */
  var now = new Date();
  var ngayEl  = document.getElementById('pt-ngay');
  var thangEl = document.getElementById('pt-thang');
  var namEl   = document.getElementById('pt-nam');
  if (ngayEl)  ngayEl.value  = now.getDate();
  if (thangEl) thangEl.value = now.getMonth() + 1;
  if (namEl)   namEl.value   = now.getFullYear();

  /* Hiện tục ngữ ngẫu nhiên */
  ptRandomTucNgu();

  /* Render bảng Thập Nhị Trực */
  _ptRenderTrucTable(null);

  /* Render bảng Ngũ Hành */
  _ptRenderNguHanh();

  /* Tự động tra cứu ngày hôm nay */
  ptTraCuu();
}

/* ============================================================
   ptRandomTucNgu — Hiện ngẫu nhiên 1 câu tục ngữ
   ============================================================ */
function ptRandomTucNgu() {
  var el = document.getElementById('pt-tucngu-text');
  if (!el) return;
  if (!TUC_NGU_DATA || !TUC_NGU_DATA.length) {
    el.textContent = 'Không tải được dữ liệu tục ngữ.';
    return;
  }
  var idx = Math.floor(Math.random() * TUC_NGU_DATA.length);
  el.textContent = TUC_NGU_DATA[idx];
}

/* ============================================================
   ptTraCuu — Tra cứu ngày, hiện 12 giờ + hướng + info ngày
   ============================================================ */
function ptTraCuu() {
  /* Lấy giá trị form */
  var dd   = parseInt(document.getElementById('pt-ngay')  ? document.getElementById('pt-ngay').value  : 0);
  var mm   = parseInt(document.getElementById('pt-thang') ? document.getElementById('pt-thang').value : 0);
  var yyyy = parseInt(document.getElementById('pt-nam')   ? document.getElementById('pt-nam').value   : 0);

  /* Kiểm tra */
  if (!dd || !mm || !yyyy || dd < 1 || dd > 31 || mm < 1 || mm > 12 || yyyy < 1900 || yyyy > 2100) {
    showToast('Vui lòng nhập ngày hợp lệ (1900–2100)', 'error');
    return;
  }

  /* Kiểm tra ngày tồn tại thực sự */
  var testDate = new Date(yyyy, mm - 1, dd);
  if (testDate.getMonth() !== mm - 1) {
    showToast('Ngày không tồn tại. Vui lòng kiểm tra lại.', 'error');
    return;
  }

  /* Phân tích ngày qua CanChiEngine */
  var info = CanChiEngine.phanTichNgay(dd, mm, yyyy, 7);
  _ptNgayHienTai = info;

  /* Hiện thông tin ngày */
  _ptRenderNgayInfo(info);

  /* Hiện 12 giờ */
  _ptRenderGioGrid(info);

  /* Hiện hướng tốt */
  _ptRenderHuong(info);

  /* Cập nhật bảng Trực với highlight ngày hiện tại */
  _ptRenderTrucTable(info.truc);

  /* Hiện các section */
  var ngaySection  = document.getElementById('pt-ngay-section');
  var gioSection   = document.getElementById('pt-gio-section');
  var huongSection = document.getElementById('pt-huong-section');
  if (ngaySection)  ngaySection.style.display  = '';
  if (gioSection)   gioSection.style.display   = '';
  if (huongSection) huongSection.style.display = '';
}

/* ============================================================
   _ptRenderNgayInfo — Hiện thông tin ngày
   ============================================================ */
function _ptRenderNgayInfo(info) {
  var el = document.getElementById('pt-ngay-result');
  if (!el) return;

  var amLich = info.am;
  var amStr  = _ptPad(amLich.day) + '/' + _ptPad(amLich.month) + (amLich.leap ? '*' : '') + '/' + amLich.year;

  var items = [
    { label: 'Ngày dương',  val: _ptPad(info.duong.dd) + '/' + _ptPad(info.duong.mm) + '/' + info.duong.yyyy },
    { label: 'Ngày âm',     val: amStr },
    { label: 'Can Chi ngày', val: info.ccNgay.can + ' ' + info.ccNgay.chi },
    { label: 'Can Chi tháng', val: info.ccThang.can + ' ' + info.ccThang.chi },
    { label: 'Can Chi năm', val: info.ccNam.can + ' ' + info.ccNam.chi },
    { label: 'Trực',        val: info.truc },
    { label: 'Tiết Khí',    val: info.tietKhi || '—' }
  ];

  var html = '';
  for (var i = 0; i < items.length; i++) {
    html +=
      '<div class="pt-ngay-item">' +
        '<div class="pt-ngay-item-label">' + items[i].label + '</div>' +
        '<div class="pt-ngay-item-val">' + items[i].val + '</div>' +
      '</div>';
  }
  el.innerHTML = html;
}

/* ============================================================
   _ptRenderGioGrid — Render grid 12 giờ Hoàng Đạo / Hắc Đạo
   ============================================================ */
function _ptRenderGioGrid(info) {
  var el = document.getElementById('pt-gio-grid');
  if (!el) return;

  var danhSachGio = info.danhSachGio; /* Từ CanChiEngine.phanTichNgay */
  var html = '';

  for (var i = 0; i < danhSachGio.length; i++) {
    var gio    = danhSachGio[i];
    var cls    = gio.good ? 'hoang-dao' : 'hac-dao';
    var badge  = gio.good ? 'Hoàng Đạo' : 'Hắc Đạo';
    var from   = _ptFormatGio(gio.from);
    var to     = _ptFormatGio(gio.to);

    html +=
      '<div class="pt-gio-cell ' + cls + '">' +
        '<div class="pt-gio-chi">' + gio.chi + '</div>' +
        '<div class="pt-gio-khung">' + from + '–' + to + 'h</div>' +
        '<div class="pt-gio-badge">' + badge + '</div>' +
      '</div>';
  }

  el.innerHTML = html;
}

/* ============================================================
   _ptRenderHuong — Render hướng tốt xuất hành
   ============================================================ */
function _ptRenderHuong(info) {
  var el = document.getElementById('pt-huong-grid');
  if (!el) return;

  var canNgay = info.ccNgay.can;
  var huongList = PT_HUONG_THEO_CAN[canNgay];

  /* Fallback nếu không tìm thấy */
  if (!huongList) {
    huongList = [
      { icon: '⬇', ten: 'Nam',   moTa: 'Hướng cát chung' },
      { icon: '➡', ten: 'Đông',  moTa: 'Sinh khí' },
      { icon: '↘', ten: 'Đông Nam', moTa: 'Tài lộc' }
    ];
  }

  var html = '';
  for (var i = 0; i < huongList.length; i++) {
    var h = huongList[i];
    html +=
      '<div class="pt-huong-cell">' +
        '<div class="pt-huong-icon">' + h.icon + '</div>' +
        '<div class="pt-huong-ten">' + h.ten + '</div>' +
        '<div class="pt-huong-mo-ta">' + h.moTa + '</div>' +
      '</div>';
  }

  el.innerHTML = html;
}

/* ============================================================
   _ptRenderTrucTable — Render bảng 12 Trực, highlight trực hiện tại
   ============================================================ */
function _ptRenderTrucTable(trucHienTai) {
  var tbody = document.getElementById('pt-truc-tbody');
  if (!tbody) return;

  /* Dùng THAP_NHI_TRUC_DATA từ thap-nhi-truc.js */
  if (!THAP_NHI_TRUC_DATA || !THAP_NHI_TRUC_DATA.length) {
    tbody.innerHTML = '<tr><td colspan="4">Không tải được dữ liệu Thập Nhị Trực.</td></tr>';
    return;
  }

  var html = '';
  for (var i = 0; i < THAP_NHI_TRUC_DATA.length; i++) {
    var t      = THAP_NHI_TRUC_DATA[i];
    var isHL   = (t.ten === trucHienTai);
    var clsRow = isHL ? 'highlight' : '';

    html +=
      '<tr class="' + clsRow + '">' +
        '<td class="pt-truc-ten">' + t.icon + ' ' + t.ten + (isHL ? ' ★' : '') + '</td>' +
        '<td>' + t.moTa + '</td>' +
        '<td class="pt-truc-tot">✓ ' + t.viecTot.join('<br>✓ ') + '</td>' +
        '<td class="pt-truc-xau">✗ ' + t.viecXau.join('<br>✗ ') + '</td>' +
      '</tr>';
  }

  tbody.innerHTML = html;
}

/* ============================================================
   _ptRenderNguHanh — Render grid Ngũ Hành
   ============================================================ */
function _ptRenderNguHanh() {
  var el = document.getElementById('pt-ngu-hanh-grid');
  if (!el) return;

  var html = '';
  for (var i = 0; i < PT_NGU_HANH.length; i++) {
    var nh = PT_NGU_HANH[i];
    html +=
      '<div class="pt-nh-cell ' + nh.key + '">' +
        '<div class="pt-nh-icon">' + nh.icon + '</div>' +
        '<div class="pt-nh-ten">' + nh.ten + '</div>' +
        '<div class="pt-nh-info">' +
          '🎨 ' + nh.mau + '<br>' +
          '🧭 ' + nh.huong + '<br>' +
          '🌿 ' + nh.mua + '<br>' +
          '#️⃣ ' + nh.so +
        '</div>' +
      '</div>';
  }

  el.innerHTML = html;
}

/* ============================================================
   ptAskAI — Gọi AI tư vấn phong thủy
   ============================================================ */
function ptAskAI() {
  if (_ptIsAILoading) return;

  var questionEl = document.getElementById('pt-ai-question');
  var resultBox  = document.getElementById('pt-ai-result-box');
  var btn        = document.getElementById('pt-ai-btn');

  if (!questionEl || !resultBox) return;

  var cauHoi = questionEl.value.trim();
  if (!cauHoi) {
    showToast('Vui lòng nhập câu hỏi phong thủy.', 'error');
    return;
  }

  /* Kiểm tra có API key không */
  if (!AIService.isConfigured()) {
    resultBox.style.display = '';
    resultBox.innerHTML =
      '<div class="pt-no-key-msg">' +
        '⚠️ Chưa có API Key. Để dùng chức năng AI, bạn cần:<br>' +
        '1. Vào <a href="https://aistudio.google.com/apikey" target="_blank">aistudio.google.com/apikey</a> tạo key mới<br>' +
        '2. Tạo file <code>js/api-key.js</code> với nội dung:<br>' +
        '<code>var GEMINI_KEY = \'key-của-bạn\';</code><br>' +
        '3. Tải lại trang (F5)' +
      '</div>';
    return;
  }

  /* Loading */
  _ptIsAILoading = true;
  if (btn) btn.disabled = true;
  resultBox.style.display = '';
  resultBox.innerHTML =
    '<div class="pt-ai-loading">' +
      '<div class="loading-spinner"></div>' +
      'AI đang phân tích phong thủy...' +
    '</div>';

  /* Thêm context ngày hiện tại nếu đã tra cứu */
  var context = '';
  if (_ptNgayHienTai) {
    var info = _ptNgayHienTai;
    context = '\n\n[Ngày tra cứu: ' +
      _ptPad(info.duong.dd) + '/' + _ptPad(info.duong.mm) + '/' + info.duong.yyyy +
      ', Can Chi: ' + info.ccNgay.can + ' ' + info.ccNgay.chi +
      ', Năm ' + info.ccNam.can + ' ' + info.ccNam.chi +
      ', Trực ' + info.truc + ']';
  }

  ptAITuVan(cauHoi + context, function(result, errMsg) {
    _ptIsAILoading = false;
    if (btn) btn.disabled = false;

    if (errMsg) {
      resultBox.innerHTML = '<div class="pt-ai-result" style="color:#c62828;">' + errMsg + '</div>';
    } else {
      /* Chuyển markdown cơ bản → HTML */
      var html = result
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
      resultBox.innerHTML = '<div class="pt-ai-result">' + html + '</div>';
    }
  });
}

/* ============================================================
   Tiện ích nội bộ
   ============================================================ */

/* Pad số 2 chữ số */
function _ptPad(n) {
  return n < 10 ? '0' + n : String(n);
}

/* Format giờ (xử lý giờ 23 = 23:00, giờ 1 = 01:00) */
function _ptFormatGio(h) {
  if (h < 0)  h += 24;
  if (h >= 24) h -= 24;
  return _ptPad(h);
}
