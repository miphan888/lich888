// ══════════════════════════════════════════════════════
// TEMPLATE-ENGINE.JS — Xử lý thay thế placeholder
// ══════════════════════════════════════════════════════

/**
 * Xử lý template và thay thế tất cả placeholder
 * @param {object} vanKhan - Đối tượng bài văn khấn
 * @param {object} formData - Dữ liệu người dùng nhập
 * @param {boolean} forPrint - true = dùng thẻ <strong>, false = dùng <strong class="filled">
 * @returns {string} HTML đã xử lý
 */
function processTemplate(vanKhan, formData, forPrint = false) {
  let content = vanKhan.content;

  // 1. Xử lý ngày âm lịch
  if (formData.ngayDuong) {
    const parts = formData.ngayDuong.split('-');
    if (parts.length === 3) {
      const ngayFormatted = formatNgayAmLich(parts[2], parts[1], parts[0]);
      content = content.replace(/\{\{ngayAmLich\}\}/g, wrapFilled(ngayFormatted, forPrint));
    }
  }

  // 2. Xử lý suffix tự động
  if (formData.tenVo && formData.tenVo.trim()) {
    content = content.replace(/\{\{tenVoSuffix\}\}/g, wrapFilled(` cùng vợ là ${formData.tenVo.trim()}`, forPrint));
  } else {
    content = content.replace(/\{\{tenVoSuffix\}\}/g, '');
  }

  if (formData.tenChong && formData.tenChong.trim()) {
    content = content.replace(/\{\{tenChongSuffix\}\}/g, wrapFilled(` cùng chồng là ${formData.tenChong.trim()}`, forPrint));
  } else {
    content = content.replace(/\{\{tenChongSuffix\}\}/g, '');
  }

  // 3. conLabel
  if (formData.gioiTinhCon === 'Gái') {
    content = content.replace(/\{\{conLabel\}\}/g, 'con gái');
  } else {
    content = content.replace(/\{\{conLabel\}\}/g, 'con trai');
  }

  // 4. Thay thế tất cả placeholder đơn giản
  const fields = [
    'tenChuNha','tenChong','tenVo','tenCon','diaChi','diaChiMoi',
    'tenOngBa','moiQuanHe','tenCuaHang','tenChua','bienSoXe','gioiTinhCon'
  ];

  fields.forEach(field => {
    const regex = new RegExp(`\\{\\{${field}\\}\\}`, 'g');
    const val = formData[field] ? formData[field].trim() : '';
    if (val) {
      content = content.replace(regex, wrapFilled(val, forPrint));
    } else {
      content = content.replace(regex, '<span class="placeholder-empty">............</span>');
    }
  });

  // 5. Xóa bất kỳ placeholder còn sót lại
  content = content.replace(/\{\{[^}]+\}\}/g, '<span class="placeholder-empty">............</span>');

  return content;
}

function wrapFilled(value, forPrint) {
  if (forPrint) {
    return `<strong>${value}</strong>`;
  }
  return `<strong class="filled">${value}</strong>`;
}

/**
 * Lấy giá trị mặc định ngày hôm nay theo định dạng YYYY-MM-DD
 */
function getTodayString() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Config cho từng field: label, type, placeholder
 */
const FIELD_CONFIG = {
  tenChuNha:   { label: 'Họ tên chủ nhà / người đại diện', type: 'text',     ph: 'VD: Nguyễn Văn An',      required: true },
  tenChong:    { label: 'Họ tên người chồng',               type: 'text',     ph: 'VD: Nguyễn Văn An',      required: false },
  tenVo:       { label: 'Họ tên người vợ',                  type: 'text',     ph: 'VD: Trần Thị Bình',      required: false },
  tenCon:      { label: 'Họ tên con',                       type: 'text',     ph: 'VD: Nguyễn Minh Khoa',   required: true },
  gioiTinhCon: { label: 'Giới tính con',                    type: 'select',   opts: ['Trai','Gái'],          required: true },
  diaChi:      { label: 'Địa chỉ gia đình',                 type: 'textarea', ph: 'Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố', required: true },
  diaChiMoi:   { label: 'Địa chỉ nhà mới',                  type: 'textarea', ph: 'Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố', required: true },
  ngayDuong:   { label: 'Ngày cúng (Dương lịch)',           type: 'date',     ph: '',                        required: true },
  tenOngBa:    { label: 'Họ tên người đã mất',              type: 'text',     ph: 'VD: Nguyễn Văn Thắng',   required: true },
  moiQuanHe:   { label: 'Mối quan hệ',                      type: 'text',     ph: 'VD: Cha, Mẹ, Ông Nội, Bà Ngoại...', required: true },
  tenCuaHang:  { label: 'Tên cửa hàng / công ty',           type: 'text',     ph: 'VD: Cửa hàng Hoa Việt',  required: true },
  tenChua:     { label: 'Tên chùa / đền / phủ',             type: 'text',     ph: 'VD: Chùa Trấn Quốc',     required: true },
  bienSoXe:    { label: 'Biển số xe',                       type: 'text',     ph: 'VD: 51G-123.45',          required: true },
};
