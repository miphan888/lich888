/* ============================================================
   van-khan-ui.js — Module UI chính cho trang Văn Khấn
   Lịch Việt Nam 888
   ============================================================ */

/* ============================================================
   CẤU HÌNH DANH MỤC
   ============================================================ */
var VK_CATEGORIES = [
  { key: 'Tất Cả',    icon: '📜', label: 'Tất Cả'     },
  { key: 'Gia Tiên',  icon: '🏠', label: 'Gia Tiên'   },
  { key: 'Lễ Tết',   icon: '🎋', label: 'Lễ Tết'     },
  { key: 'Hôn Nhân', icon: '💍', label: 'Hôn Nhân'   },
  { key: 'Thôi Nôi', icon: '👶', label: 'Thôi Nôi'   },
  { key: 'Tang Lễ',  icon: '🕯', label: 'Tang Lễ'    },
  { key: 'Nhà Mới',  icon: '🏡', label: 'Nhà Mới'    },
  { key: 'Khai Trương', icon: '🎊', label: 'Khai Trương' },
  { key: 'Chùa Đền', icon: '⛩', label: 'Chùa Đền'   },
  { key: 'Xe Mới',   icon: '🚗', label: 'Xe Mới'     }
];

/* ============================================================
   CẤU HÌNH FIELD CHO TỪNG FIELD KEY
   ============================================================ */
var VK_FIELD_CONFIG = {
  tenChuNha: {
    label: 'Tên chủ nhà / tín chủ',
    placeholder: 'VD: Nguyễn Văn An',
    type: 'text',
    required: true
  },
  diaChi: {
    label: 'Địa chỉ',
    placeholder: 'VD: Số 12, phố Hàng Bông, quận Hoàn Kiếm, Hà Nội',
    type: 'text',
    required: true
  },
  ngayDuong: {
    label: 'Ngày cúng (dương lịch)',
    placeholder: '',
    type: 'date',
    required: true
  },
  tenVo: {
    label: 'Tên vợ / chồng (nếu có)',
    placeholder: 'VD: Trần Thị Bình (để trống nếu không có)',
    type: 'text',
    required: false
  },
  tenOngBa: {
    label: 'Tên người được cúng / tưởng niệm',
    placeholder: 'VD: Nguyễn Văn Hùng',
    type: 'text',
    required: true
  },
  moiQuanHe: {
    label: 'Mối quan hệ với người cúng',
    placeholder: '',
    type: 'select',
    options: ['Ông', 'Bà', 'Bố', 'Mẹ', 'Ông nội', 'Bà nội', 'Ông ngoại', 'Bà ngoại', 'Cụ', 'Cô', 'Chú', 'Bác', 'Anh', 'Chị'],
    required: true
  },
  tenCon: {
    label: 'Tên con / em bé',
    placeholder: 'VD: Nguyễn Minh Khang',
    type: 'text',
    required: true
  },
  tenCuaHang: {
    label: 'Tên cửa hàng / doanh nghiệp',
    placeholder: 'VD: Cửa hàng Thời Trang Thanh Xuân',
    type: 'text',
    required: true
  },
  tenChua: {
    label: 'Tên chùa / đền / miếu',
    placeholder: 'VD: Chùa Hương, Đền Hùng...',
    type: 'text',
    required: false
  },
  bienSoXe: {
    label: 'Biển số xe',
    placeholder: 'VD: 51G-123.45',
    type: 'text',
    required: true
  },
  diaChiMoi: {
    label: 'Địa chỉ nhà mới / cơ sở mới',
    placeholder: 'VD: Số 5, đường Lê Lợi, quận 1, TP.HCM',
    type: 'text',
    required: true
  },
  tenChong: {
    label: 'Tên chú rể / chồng',
    placeholder: 'VD: Nguyễn Văn Hải',
    type: 'text',
    required: true
  },
  gioiTinhCon: {
    label: 'Giới tính của bé',
    placeholder: '',
    type: 'select',
    options: ['Bé trai', 'Bé gái'],
    required: true
  },
  loiCauKhanBoSung: {
    label: 'Lời cầu khấn riêng (không bắt buộc)',
    placeholder: 'Nhập thêm lời cầu nguyện riêng... VD: Cầu cho con thi đậu đại học, cầu bà nội mau khỏe bệnh...',
    type: 'textarea',
    required: false
  }
};

/* ============================================================
   STATE MODULE
   ============================================================ */
var _vkState = {
  activeCat:    'Tất Cả',    // Danh mục đang chọn
  searchQuery:  '',           // Từ khóa tìm kiếm
  currentBai:   null,         // Bài đang mở (object từ VAN_KHAN_DATA)
  formData:     {},           // Dữ liệu form đã điền
  currentStep:  1,            // Bước hiện tại (1/2/3)
  previewHtml:  '',           // HTML bài khấn đã xử lý
  isAiLoading:  false         // Đang chờ AI
};

/* ============================================================
   initVanKhan — Điểm khởi động được app.js gọi
   ============================================================ */
function initVanKhan() {
  /* Render danh mục */
  _vkRenderCats();

  /* Render lưới ban đầu */
  _vkRenderGrid();

  /* Gắn sự kiện tìm kiếm */
  var searchEl = document.getElementById('vk-search');
  if (searchEl) {
    searchEl.addEventListener('input', function() {
      _vkState.searchQuery = this.value.trim();
      _vkRenderGrid();
      _vkToggleAiBtn();
    });
  }

  /* Gắn sự kiện nút AI tìm kiếm */
  var aiBtn = document.getElementById('vk-ai-search-btn');
  if (aiBtn) {
    aiBtn.addEventListener('click', _vkHandleAiSearch);
  }

  /* Gắn sự kiện đóng modal */
  var closeBtn = document.getElementById('vk-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', _vkCloseModal);
  }

  /* Click overlay để đóng */
  var overlay = document.getElementById('vk-overlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        _vkCloseModal();
      }
    });
  }

  /* Phím Escape đóng modal */
  document.addEventListener('keydown', _vkHandleKeyDown);
}

/* ============================================================
   RENDER DANH MỤC
   ============================================================ */
function _vkRenderCats() {
  var container = document.getElementById('vk-cats');
  if (!container) return;

  var html = '';

  for (var i = 0; i < VK_CATEGORIES.length; i++) {
    var cat = VK_CATEGORIES[i];

    /* Đếm số bài trong danh mục */
    var count = 0;
    if (cat.key === 'Tất Cả') {
      count = VAN_KHAN_DATA.length;
    } else {
      for (var j = 0; j < VAN_KHAN_DATA.length; j++) {
        if (VAN_KHAN_DATA[j].category === cat.key) count++;
      }
    }

    /* Cũng thêm "Xe Mới" từ category Khai Trương nếu cần */
    var isActive = (_vkState.activeCat === cat.key) ? ' active' : '';

    html += '<button class="vk-cat-btn' + isActive + '" data-cat="' + cat.key + '">' +
              '<span class="cat-icon">' + cat.icon + '</span>' +
              cat.label +
              '<span class="cat-count">' + count + '</span>' +
            '</button>';
  }

  container.innerHTML = html;

  /* Gắn sự kiện click danh mục */
  var btns = container.querySelectorAll('.vk-cat-btn');
  for (var k = 0; k < btns.length; k++) {
    btns[k].addEventListener('click', function() {
      _vkState.activeCat = this.getAttribute('data-cat');
      _vkState.searchQuery = '';
      var searchEl = document.getElementById('vk-search');
      if (searchEl) searchEl.value = '';

      /* Cập nhật active state */
      var allBtns = document.querySelectorAll('.vk-cat-btn');
      for (var m = 0; m < allBtns.length; m++) {
        allBtns[m].classList.remove('active');
      }
      this.classList.add('active');

      _vkRenderGrid();
      _vkToggleAiBtn();
    });
  }
}

/* ============================================================
   LỌC DỮ LIỆU
   ============================================================ */
function _vkFilterData() {
  var results = [];
  var query   = _vkState.searchQuery.toLowerCase();
  var cat     = _vkState.activeCat;

  for (var i = 0; i < VAN_KHAN_DATA.length; i++) {
    var bai = VAN_KHAN_DATA[i];

    /* Lọc theo danh mục */
    if (cat !== 'Tất Cả' && bai.category !== cat) continue;

    /* Lọc theo từ khóa */
    if (query) {
      var haystack = (bai.title + ' ' + bai.category + ' ' + bai.description).toLowerCase();
      if (haystack.indexOf(query) === -1) continue;
    }

    results.push(bai);
  }

  return results;
}

/* ============================================================
   ICON THEO DANH MỤC
   ============================================================ */
function _vkCatIcon(category) {
  var map = {
    'Gia Tiên':    '🏠',
    'Lễ Tết':      '🎋',
    'Hôn Nhân':    '💍',
    'Thôi Nôi':    '👶',
    'Tang Lễ':     '🕯',
    'Nhà Mới':     '🏡',
    'Khai Trương': '🎊',
    'Chùa Đền':    '⛩',
    'Xe Mới':      '🚗'
  };
  return map[category] || '📜';
}

/* ============================================================
   RENDER LƯỚI BÀI KHẤN
   ============================================================ */
function _vkRenderGrid() {
  var container = document.getElementById('vk-grid');
  if (!container) return;

  var list = _vkFilterData();

  if (list.length === 0) {
    /* Không có kết quả */
    container.innerHTML =
      '<div class="vk-empty" style="grid-column:1/-1;">' +
        '<span class="vk-empty-icon">🔍</span>' +
        '<p>Không tìm thấy bài văn khấn phù hợp.</p>' +
        '<p style="font-size:0.85rem;">Hãy thử tìm kiếm bằng AI bên dưới!</p>' +
      '</div>';
    return;
  }

  var html = '';

  for (var i = 0; i < list.length; i++) {
    var bai = list[i];
    var icon = _vkCatIcon(bai.category);

    html += '<div class="vk-card" data-id="' + bai.id + '">' +
              '<span class="vk-card-icon">' + icon + '</span>' +
              '<div class="vk-card-title">' + _vkEscape(bai.title) + '</div>' +
              '<span class="vk-card-cat">' + _vkEscape(bai.category) + '</span>' +
              '<p class="vk-card-desc">' + _vkEscape(bai.description) + '</p>' +
            '</div>';
  }

  container.innerHTML = html;

  /* Gắn sự kiện click card */
  var cards = container.querySelectorAll('.vk-card');
  for (var j = 0; j < cards.length; j++) {
    cards[j].addEventListener('click', function() {
      var id = parseInt(this.getAttribute('data-id'), 10);
      _vkOpenBai(id);
    });
  }
}

/* ============================================================
   HIỆN/ẨN NÚT AI TÌM KIẾM
   ============================================================ */
function _vkToggleAiBtn() {
  var btn = document.getElementById('vk-ai-search-btn');
  if (!btn) return;

  var query = _vkState.searchQuery;

  if (query.length >= 2) {
    /* Cập nhật label */
    var label = document.getElementById('vk-ai-search-label');
    if (label) {
      label.textContent = 'Tìm bài văn khấn "' + query + '" bằng AI';
    }
    btn.classList.remove('hidden');
  } else {
    btn.classList.add('hidden');
  }
}

/* ============================================================
   MỞ BÀI KHẤN (bắt đầu flow 3 bước)
   ============================================================ */
function _vkOpenBai(id) {
  /* Tìm bài theo id */
  var bai = null;
  for (var i = 0; i < VAN_KHAN_DATA.length; i++) {
    if (VAN_KHAN_DATA[i].id === id) {
      bai = VAN_KHAN_DATA[i];
      break;
    }
  }
  if (!bai) return;

  /* Reset state */
  _vkState.currentBai  = bai;
  _vkState.formData    = {};
  _vkState.currentStep = 1;
  _vkState.previewHtml = '';

  /* Cập nhật tiêu đề modal */
  var titleEl = document.getElementById('vk-modal-title');
  if (titleEl) titleEl.textContent = bai.title;

  /* Render bước 1 */
  _vkRenderStep1();

  /* Mở modal */
  var overlay = document.getElementById('vk-overlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

/* ============================================================
   BƯỚC 1 — RENDER FORM
   ============================================================ */
function _vkRenderStep1() {
  _vkUpdateStepIndicator(1);

  var bai = _vkState.currentBai;
  if (!bai) return;

  /* Tập hợp tất cả field: required + optional (trừ loiCauKhanBoSung) */
  var allFields = [];

  /* Required fields */
  for (var i = 0; i < bai.requiredFields.length; i++) {
    allFields.push({ key: bai.requiredFields[i], required: true });
  }

  /* Optional fields (ngoại trừ loiCauKhanBoSung - luôn nằm cuối) */
  if (bai.optionalFields) {
    for (var j = 0; j < bai.optionalFields.length; j++) {
      if (bai.optionalFields[j] !== 'loiCauKhanBoSung') {
        allFields.push({ key: bai.optionalFields[j], required: false });
      }
    }
  }

  /* Render các field */
  var fieldsHtml = '';
  for (var k = 0; k < allFields.length; k++) {
    fieldsHtml += _vkRenderField(allFields[k].key, allFields[k].required);
  }

  /* Luôn thêm field "Lời cầu khấn bổ sung" ở cuối form */
  fieldsHtml += _vkRenderLoiCauBoSung();

  var bodyEl = document.getElementById('vk-modal-body');
  if (!bodyEl) return;

  bodyEl.innerHTML =
    '<div class="vk-form-grid" id="vk-form-grid">' +
      fieldsHtml +
    '</div>' +
    '<div class="vk-form-footer">' +
      '<button class="btn btn-primary" id="vk-btn-preview" disabled>' +
        'Xem trước bài khấn →' +
      '</button>' +
    '</div>';

  /* Điền lại giá trị cũ nếu có */
  _vkRestoreFormValues();

  /* Gắn sự kiện validate */
  _vkBindFormEvents();
}

/* ---- Render một field dựa vào key ---- */
function _vkRenderField(key, isRequired) {
  var cfg = VK_FIELD_CONFIG[key];
  if (!cfg) return '';

  var reqMark = isRequired ? '<span class="req">*</span>' : '';
  var fullWidth = (cfg.type === 'textarea' || key === 'diaChi' || key === 'diaChiMoi') ? ' full-width' : '';
  var inputId   = 'vkf-' + key;

  var inputHtml = '';

  if (cfg.type === 'text') {
    inputHtml = '<input type="text" id="' + inputId + '" class="vk-form-input"' +
                  ' data-vkfield="' + key + '"' +
                  ' placeholder="' + _vkEscape(cfg.placeholder) + '"' +
                  (isRequired ? ' required' : '') +
                  '>';

  } else if (cfg.type === 'date') {
    /* Đặt giá trị mặc định là hôm nay */
    var today = _vkTodayIso();
    inputHtml = '<input type="date" id="' + inputId + '" class="vk-form-input"' +
                  ' data-vkfield="' + key + '"' +
                  ' value="' + today + '"' +
                  (isRequired ? ' required' : '') +
                  '>';

  } else if (cfg.type === 'select') {
    var optionsHtml = '<option value="">-- Chọn --</option>';
    if (cfg.options) {
      for (var i = 0; i < cfg.options.length; i++) {
        optionsHtml += '<option value="' + _vkEscape(cfg.options[i]) + '">' + _vkEscape(cfg.options[i]) + '</option>';
      }
    }
    inputHtml = '<select id="' + inputId + '" class="vk-form-select"' +
                  ' data-vkfield="' + key + '"' +
                  (isRequired ? ' required' : '') +
                  '>' + optionsHtml + '</select>';

  } else if (cfg.type === 'textarea') {
    inputHtml = '<textarea id="' + inputId + '" class="vk-form-textarea"' +
                  ' data-vkfield="' + key + '"' +
                  ' placeholder="' + _vkEscape(cfg.placeholder) + '"' +
                  (isRequired ? ' required' : '') +
                  '></textarea>';
  }

  return '<div class="vk-form-group' + fullWidth + '">' +
           '<label class="vk-form-label" for="' + inputId + '">' +
             _vkEscape(cfg.label) + reqMark +
           '</label>' +
           inputHtml +
         '</div>';
}

/* ---- Render field "Lời cầu khấn bổ sung" — luôn cuối form ---- */
function _vkRenderLoiCauBoSung() {
  return '<div class="vk-form-group full-width">' +
           '<label class="vk-form-label" for="vkf-loiCauKhanBoSung">' +
             '🙏 Lời cầu khấn riêng (không bắt buộc)' +
           '</label>' +
           '<textarea id="vkf-loiCauKhanBoSung"' +
             ' class="vk-form-textarea"' +
             ' data-vkfield="loiCauKhanBoSung"' +
             ' placeholder="Nhập thêm lời cầu nguyện riêng... VD: Cầu cho con thi đậu đại học, cầu bà nội mau khỏe bệnh..."' +
             ' style="min-height:80px;resize:vertical;"' +
           '></textarea>' +
           '<p class="vk-form-note">Nếu điền, lời cầu sẽ được chèn vào bài khấn trước đoạn kết.</p>' +
         '</div>';
}

/* ---- Điền lại giá trị cũ từ _vkState.formData ---- */
function _vkRestoreFormValues() {
  var inputs = document.querySelectorAll('[data-vkfield]');
  for (var i = 0; i < inputs.length; i++) {
    var key = inputs[i].getAttribute('data-vkfield');
    if (_vkState.formData[key] !== undefined) {
      inputs[i].value = _vkState.formData[key];
    }
  }
}

/* ---- Gắn sự kiện form: validate + enable nút preview ---- */
function _vkBindFormEvents() {
  var inputs = document.querySelectorAll('[data-vkfield]');

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('input', _vkValidateForm);
    inputs[i].addEventListener('change', _vkValidateForm);
  }

  /* Gắn sự kiện nút preview */
  var previewBtn = document.getElementById('vk-btn-preview');
  if (previewBtn) {
    previewBtn.addEventListener('click', _vkGoToPreview);
  }

  /* Validate ngay lần đầu */
  _vkValidateForm();
}

/* ---- Validate form: enable/disable nút preview ---- */
function _vkValidateForm() {
  var bai = _vkState.currentBai;
  if (!bai) return;

  var allOk = true;

  /* Kiểm tra các required fields */
  for (var i = 0; i < bai.requiredFields.length; i++) {
    var key = bai.requiredFields[i];
    var el  = document.getElementById('vkf-' + key);
    if (el && el.value.trim() === '') {
      allOk = false;
      break;
    }
  }

  /* Enable/disable nút */
  var btn = document.getElementById('vk-btn-preview');
  if (btn) {
    btn.disabled = !allOk;
  }
}

/* ============================================================
   BƯỚC 2 — XEM TRƯỚC BÀI KHẤN
   ============================================================ */
function _vkGoToPreview() {
  /* Lưu dữ liệu form vào state */
  var inputs = document.querySelectorAll('[data-vkfield]');
  for (var i = 0; i < inputs.length; i++) {
    var key = inputs[i].getAttribute('data-vkfield');
    _vkState.formData[key] = inputs[i].value.trim();
  }

  /* Xử lý template */
  var processedContent = _vkProcessTemplate(_vkState.currentBai.content, _vkState.formData);

  /* Lưu preview HTML */
  _vkState.previewHtml = processedContent;
  _vkState.currentStep = 2;

  _vkRenderStep2(processedContent);
}

/* ---- Xử lý template: thay placeholder bằng giá trị thực ---- */
function _vkProcessTemplate(template, data) {
  var result = template;

  /* 1. Tính ngày âm lịch từ ngayDuong */
  var ngayAmLich = _vkCalcLunarDate(data.ngayDuong);

  /* 2. Tính {{tenVoSuffix}} */
  var tenVoSuffix = '';
  if (data.tenVo && data.tenVo.trim() !== '') {
    tenVoSuffix = ' cùng vợ (chồng) là ' + data.tenVo.trim();
  }

  /* 3. Thay các placeholder chuẩn */
  result = result.replace(/\{\{ngayAmLich\}\}/g, ngayAmLich);
  result = result.replace(/\{\{tenVoSuffix\}\}/g, tenVoSuffix);

  /* 4. Thay các field khác */
  var fieldKeys = Object.keys(data);
  for (var i = 0; i < fieldKeys.length; i++) {
    var key = fieldKeys[i];
    if (key === 'loiCauKhanBoSung') continue; /* Xử lý riêng */
    if (data[key]) {
      var re = new RegExp('\\{\\{' + key + '\\}\\}', 'g');
      result = result.replace(re, data[key]);
    }
  }

  /* 5. Xử lý {{hoTen}} — lấy phần họ từ tenChuNha */
  if (data.tenChuNha) {
    var parts   = data.tenChuNha.trim().split(' ');
    var hoTen   = parts[0] || data.tenChuNha;
    result = result.replace(/\{\{hoTen\}\}/g, hoTen);
  }

  /* 6. Chèn lời cầu bổ sung nếu có — TRƯỚC đoạn kết */
  if (data.loiCauKhanBoSung && data.loiCauKhanBoSung.trim() !== '') {
    var bonus     = 'Ngoài ra, tín chủ con còn thành tâm kính xin: ' + data.loiCauKhanBoSung.trim();
    var ketPattern = /(Chúng con lễ bạc tâm thành|Tín chủ con lễ bạc tâm thành)/;
    if (ketPattern.test(result)) {
      result = result.replace(ketPattern, bonus + '\n\n$1');
    } else {
      /* Nếu không tìm thấy đoạn kết, chèn trước dòng cuối */
      var lines   = result.split('\n');
      lines.splice(lines.length - 2, 0, '\n' + bonus);
      result = lines.join('\n');
    }
  }

  return result;
}

/* ---- Tính ngày âm lịch từ chuỗi ISO date ---- */
function _vkCalcLunarDate(ngayDuong) {
  if (!ngayDuong) return '[ngày tháng]';

  try {
    var parts = ngayDuong.split('-');
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var d = parseInt(parts[2], 10);

    /* Dùng LunarEngine nếu đã load */
    if (typeof LunarEngine !== 'undefined' && LunarEngine.solarToLunar) {
      var lunar   = LunarEngine.solarToLunar(d, m, y, APP_CONFIG.TIMEZONE);
      var leapStr = lunar.isLeap ? ' (nhuận)' : '';
      return 'ngày ' + lunar.lunarDay + ' tháng ' + lunar.lunarMonth + leapStr + ' năm ' + lunar.lunarYear;
    }
  } catch (e) {
    /* Engine chưa sẵn sàng — fallback */
  }

  /* Fallback: dùng ngày dương */
  if (ngayDuong) {
    var p2    = ngayDuong.split('-');
    return 'ngày ' + parseInt(p2[2], 10) + ' tháng ' + parseInt(p2[1], 10) + ' năm ' + p2[0];
  }
  return '[ngày tháng]';
}

/* ---- Render bước 2: Preview ---- */
function _vkRenderStep2(content) {
  _vkUpdateStepIndicator(2);

  var bai = _vkState.currentBai;

  /* Chuyển content thành HTML có highlight */
  var previewHtml = _vkContentToHtml(content, _vkState.formData);

  /* Lễ vật */
  var leVatHtml = '';
  if (bai.note) {
    leVatHtml =
      '<div class="vk-le-vat">' +
        '<div class="vk-le-vat-title">🕯 Lễ vật chuẩn bị</div>' +
        '<p class="vk-le-vat-text">' + _vkEscape(bai.note) + '</p>' +
      '</div>';
  }

  var bodyEl = document.getElementById('vk-modal-body');
  if (!bodyEl) return;

  bodyEl.innerHTML =
    '<div class="vk-preview-box" id="vk-preview-content">' +
      previewHtml +
    '</div>' +
    leVatHtml +
    '<div class="vk-preview-footer">' +
      '<button class="btn btn-secondary" id="vk-btn-back">← Quay lại sửa</button>' +
      '<button class="btn btn-primary" id="vk-btn-print">🖨 In / Xuất PDF</button>' +
    '</div>';

  /* Gắn sự kiện */
  var backBtn  = document.getElementById('vk-btn-back');
  var printBtn = document.getElementById('vk-btn-print');

  if (backBtn)  backBtn.addEventListener('click',  _vkGoBack);
  if (printBtn) printBtn.addEventListener('click', _vkPrint);
}

/* ---- Chuyển content thành HTML: bôi đỏ phần đã điền ---- */
function _vkContentToHtml(content, data) {
  /* Escape HTML trước */
  var escaped = _vkEscape(content);

  /* Bôi đỏ các giá trị đã điền */
  var fieldKeys = Object.keys(data);
  for (var i = 0; i < fieldKeys.length; i++) {
    var key = fieldKeys[i];
    if (key === 'loiCauKhanBoSung') continue;
    var val = data[key];
    if (!val || val.trim() === '') continue;

    /* Tìm và bọc bằng span.vk-filled */
    var escapedVal = _vkEscape(val);
    var re         = new RegExp(_vkEscapeRegex(escapedVal), 'g');
    escaped = escaped.replace(re, '<span class="vk-filled">' + escapedVal + '</span>');
  }

  /* Highlight lời cầu bổ sung */
  if (data.loiCauKhanBoSung && data.loiCauKhanBoSung.trim()) {
    var bonusEscaped = _vkEscape('Ngoài ra, tín chủ con còn thành tâm kính xin: ' + data.loiCauKhanBoSung.trim());
    var reBonus = new RegExp(_vkEscapeRegex(bonusEscaped), 'g');
    escaped = escaped.replace(reBonus,
      '<span class="vk-bonus-highlight">' + bonusEscaped + '</span>'
    );
  }

  /* Chuyển xuống dòng thành <br> */
  escaped = escaped.replace(/\n/g, '<br>');

  return escaped;
}

/* ============================================================
   BƯỚC 3 — IN / XUẤT PDF
   ============================================================ */
function _vkPrint() {
  _vkUpdateStepIndicator(3);

  var bai     = _vkState.currentBai;
  var content = _vkState.previewHtml;

  /* Chuẩn bị vùng in */
  var printArea = document.getElementById('vk-print-area');
  if (!printArea) return;

  /* Nội dung in — plain text, serif font, tự co giãn */
  printArea.innerHTML =
    '<div id="vk-print-doc" style="' +
      'font-family:var(--font-serif);' +
      'font-size:var(--vk-print-fs,13pt);' +
      'line-height:1.9;' +
      'color:#000;' +
      'white-space:pre-wrap;' +
      'word-break:break-word;' +
      'padding:0;' +
      'margin:0;' +
    '">' +
      '<div style="text-align:center;font-size:1.15em;font-weight:700;margin-bottom:0.8em;letter-spacing:2px;">' +
        _vkEscape(bai.title).toUpperCase() +
      '</div>' +
      _vkContentForPrint(content, _vkState.formData) +
    '</div>';

  /* Tự scale font để vừa 1 trang A4 */
  _vkAutoScaleFont();

  /* Gọi print */
  window.print();
}

/* ---- Chuyển content thành dạng in (bold lời cầu bổ sung) ---- */
function _vkContentForPrint(content, data) {
  var escaped = _vkEscape(content).replace(/\n/g, '<br>');

  /* In đậm lời cầu bổ sung */
  if (data.loiCauKhanBoSung && data.loiCauKhanBoSung.trim()) {
    var bonusText   = _vkEscape('Ngoài ra, tín chủ con còn thành tâm kính xin: ' + data.loiCauKhanBoSung.trim());
    var rePrint     = new RegExp(_vkEscapeRegex(bonusText), 'g');
    escaped = escaped.replace(rePrint, '<strong>' + bonusText + '</strong>');
  }

  return escaped;
}

/* ---- Auto scale font nếu nội dung dài ---- */
function _vkAutoScaleFont() {
  /* Thử từ 13pt xuống 7.5pt */
  var sizes = [13, 12, 11, 10, 9.5, 9, 8.5, 8, 7.5];
  var A4_HEIGHT_PT = 1052; /* 297mm × 3.78px/mm ≈ 1052px */

  for (var i = 0; i < sizes.length; i++) {
    var printArea = document.getElementById('vk-print-area');
    if (!printArea) break;
    printArea.style.setProperty('--vk-print-fs', sizes[i] + 'pt');

    /* Kiểm tra chiều cao */
    var doc = document.getElementById('vk-print-doc');
    if (doc && doc.scrollHeight <= A4_HEIGHT_PT) {
      break;
    }
  }
}

/* ============================================================
   ĐIỀU HƯỚNG BƯỚC
   ============================================================ */
function _vkGoBack() {
  _vkState.currentStep = 1;
  _vkRenderStep1();
}

/* ---- Cập nhật step indicator ---- */
function _vkUpdateStepIndicator(activeStep) {
  for (var s = 1; s <= 3; s++) {
    var stepEl = document.getElementById('vk-step-' + s);
    if (!stepEl) continue;
    stepEl.classList.remove('active', 'done');
    if (s < activeStep) {
      stepEl.classList.add('done');
      var numEl = stepEl.querySelector('.vk-step-num');
      if (numEl) numEl.textContent = '✓';
    } else if (s === activeStep) {
      stepEl.classList.add('active');
      var numEl2 = stepEl.querySelector('.vk-step-num');
      if (numEl2) numEl2.textContent = s;
    } else {
      var numEl3 = stepEl.querySelector('.vk-step-num');
      if (numEl3) numEl3.textContent = s;
    }
  }
}

/* ============================================================
   ĐÓNG MODAL
   ============================================================ */
function _vkCloseModal() {
  var overlay = document.getElementById('vk-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  /* Xóa vùng in */
  var printArea = document.getElementById('vk-print-area');
  if (printArea) printArea.innerHTML = '';
}

/* ---- Xử lý phím Escape ---- */
function _vkHandleKeyDown(e) {
  if (e.key === 'Escape') {
    _vkCloseModal();
  }
}

/* ============================================================
   AI TÌM KIẾM / TẠO BÀI MỚI
   ============================================================ */
function _vkHandleAiSearch() {
  var query = _vkState.searchQuery;
  if (!query || query.length < 2) return;

  if (_vkState.isAiLoading) return;
  _vkState.isAiLoading = true;

  /* Ẩn nút AI, hiện loading */
  var btn = document.getElementById('vk-ai-search-btn');
  if (btn) btn.classList.add('hidden');

  /* Hiện loading trong grid */
  var grid = document.getElementById('vk-grid');
  if (grid) {
    grid.innerHTML =
      '<div class="vk-ai-loading" style="grid-column:1/-1;">' +
        '<span class="vk-ai-loading-icon">✨</span>' +
        '<p>AI đang tìm kiếm bài văn khấn phù hợp...</p>' +
        '<p style="font-size:0.8rem;margin-top:8px;">Vui lòng chờ trong giây lát</p>' +
      '</div>';
  }

  /* Gọi AI service */
  VanKhanAI.searchOrCreate(query)
    .then(function(result) {
      _vkState.isAiLoading = false;

      if (result && result.found && result.vanKhan) {
        /* Tạo bài tạm thời từ kết quả AI */
        var aiBai = {
          id:             99999,
          slug:           'ai-generated',
          title:          result.vanKhan.title || ('Văn Khấn: ' + query),
          category:       result.vanKhan.category || 'Gia Tiên',
          description:    result.vanKhan.description || 'Bài văn khấn được tạo bởi AI.',
          requiredFields: result.vanKhan.requiredFields || ['tenChuNha', 'diaChi', 'ngayDuong'],
          optionalFields: result.vanKhan.optionalFields || ['tenVo'],
          content:        result.vanKhan.content || '',
          note:           result.vanKhan.note || ''
        };

        /* Render kết quả AI như card đặc biệt */
        if (grid) {
          grid.innerHTML =
            '<div style="grid-column:1/-1;text-align:center;color:var(--gold);font-size:0.85rem;margin-bottom:var(--sp-sm);">' +
              '✨ AI đã tìm thấy bài văn khấn phù hợp' +
            '</div>' +
            '<div class="vk-card" id="vk-ai-result-card" style="border-color:var(--gold);grid-column:1/-1;">' +
              '<span class="vk-card-icon">✨</span>' +
              '<div class="vk-card-title">' + _vkEscape(aiBai.title) + '</div>' +
              '<span class="vk-card-cat">' + _vkEscape(aiBai.category) + '</span>' +
              '<p class="vk-card-desc">' + _vkEscape(aiBai.description) + '</p>' +
            '</div>';

          /* Gắn sự kiện click card AI */
          var aiCard = document.getElementById('vk-ai-result-card');
          if (aiCard) {
            /* Tạm thêm vào VAN_KHAN_DATA để dùng _vkOpenBai */
            VAN_KHAN_DATA.push(aiBai);
            aiCard.addEventListener('click', function() {
              _vkOpenBai(99999);
            });
          }
        }

        /* Hiện lại nút AI */
        if (btn) btn.classList.remove('hidden');

      } else {
        /* Không tìm thấy */
        if (grid) {
          grid.innerHTML =
            '<div class="vk-ai-error" style="grid-column:1/-1;">' +
              '<p>AI không tìm thấy bài văn khấn phù hợp với "' + _vkEscape(query) + '".</p>' +
              '<p style="font-size:0.85rem;margin-top:8px;">Vui lòng thử từ khóa khác.</p>' +
            '</div>';
        }
        if (btn) btn.classList.remove('hidden');
      }
    })
    .catch(function(err) {
      _vkState.isAiLoading = false;
      var errMsg = AIService.getErrorMessage(err);

      if (grid) {
        grid.innerHTML =
          '<div class="vk-ai-error" style="grid-column:1/-1;">' +
            '<p>' + _vkEscape(errMsg) + '</p>' +
          '</div>';
      }
      if (btn) btn.classList.remove('hidden');
    });
}

/* ============================================================
   TIỆN ÍCH
   ============================================================ */

/* Escape HTML */
function _vkEscape(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Escape chuỗi để dùng trong RegExp */
function _vkEscapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* Lấy ngày hôm nay dạng ISO yyyy-mm-dd */
function _vkTodayIso() {
  var now = new Date();
  var y   = now.getFullYear();
  var m   = String(now.getMonth() + 1).padStart(2, '0');
  var d   = String(now.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + d;
}
