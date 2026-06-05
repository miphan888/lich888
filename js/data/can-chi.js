/* ============================================================
   can-chi.js — Dữ liệu Thiên Can, Địa Chi, Ngũ Hành, Nạp Âm
   Lịch Việt Nam 888
   ============================================================ */

/* ---- 10 Thiên Can ---- */
var THIEN_CAN = [
  'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu',
  'Kỷ',  'Canh', 'Tân', 'Nhâm', 'Quý'
];

/* ---- 12 Địa Chi ---- */
var DIA_CHI = [
  'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ',
  'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'
];

/* ---- Ngũ Hành của 10 Thiên Can ---- */
var NGU_HANH_CAN = {
  'Giáp': 'Mộc', 'Ất':  'Mộc',
  'Bính': 'Hỏa', 'Đinh': 'Hỏa',
  'Mậu':  'Thổ', 'Kỷ':  'Thổ',
  'Canh': 'Kim', 'Tân':  'Kim',
  'Nhâm': 'Thủy','Quý':  'Thủy'
};

/* ---- Ngũ Hành của 12 Địa Chi ---- */
var NGU_HANH_CHI = {
  'Tý':   'Thủy', 'Sửu':  'Thổ',
  'Dần':  'Mộc',  'Mão':  'Mộc',
  'Thìn': 'Thổ',  'Tỵ':   'Hỏa',
  'Ngọ':  'Hỏa',  'Mùi':  'Thổ',
  'Thân': 'Kim',  'Dậu':  'Kim',
  'Tuất': 'Thổ',  'Hợi':  'Thủy'
};

/* ---- Âm Dương của 10 Thiên Can (Dương: index chẵn, Âm: index lẻ) ---- */
var AM_DUONG_CAN = {
  'Giáp': 'Dương', 'Ất':   'Âm',
  'Bính': 'Dương', 'Đinh': 'Âm',
  'Mậu':  'Dương', 'Kỷ':   'Âm',
  'Canh': 'Dương', 'Tân':  'Âm',
  'Nhâm': 'Dương', 'Quý':  'Âm'
};

/* ---- Âm Dương của 12 Địa Chi ---- */
var AM_DUONG_CHI = {
  'Tý':   'Dương', 'Sửu':  'Âm',
  'Dần':  'Dương', 'Mão':  'Âm',
  'Thìn': 'Dương', 'Tỵ':   'Âm',
  'Ngọ':  'Dương', 'Mùi':  'Âm',
  'Thân': 'Dương', 'Dậu':  'Âm',
  'Tuất': 'Dương', 'Hợi':  'Âm'
};

/* ---- 60 Nạp Âm Giáp Tý (theo thứ tự từ Giáp Tý đến Quý Hợi) ---- */
/* Mỗi cặp 2 năm có cùng Nạp Âm, mảng 30 phần tử */
var NAP_AM_60 = [
  /* 0  Giáp Tý,  Ất Sửu  */ 'Hải Trung Kim',
  /* 1  Bính Dần, Đinh Mão */ 'Lư Trung Hỏa',
  /* 2  Mậu Thìn, Kỷ Tỵ   */ 'Đại Lâm Mộc',
  /* 3  Canh Ngọ, Tân Mùi  */ 'Lộ Bàng Thổ',
  /* 4  Nhâm Thân, Quý Dậu */ 'Kiếm Phong Kim',
  /* 5  Giáp Tuất, Ất Hợi  */ 'Sơn Đầu Hỏa',
  /* 6  Bính Tý,  Đinh Sửu */ 'Giản Hạ Thủy',
  /* 7  Mậu Dần, Kỷ Mão    */ 'Thành Đầu Thổ',
  /* 8  Canh Thìn, Tân Tỵ  */ 'Bạch Lạp Kim',
  /* 9  Nhâm Ngọ, Quý Mùi  */ 'Dương Liễu Mộc',
  /* 10 Giáp Thân, Ất Dậu  */ 'Tuyền Trung Thủy',
  /* 11 Bính Tuất, Đinh Hợi */ 'Ốc Thượng Thổ',
  /* 12 Mậu Tý,  Kỷ Sửu   */ 'Tích Lịch Hỏa',
  /* 13 Canh Dần, Tân Mão  */ 'Tùng Bách Mộc',
  /* 14 Nhâm Thìn, Quý Tỵ  */ 'Trường Lưu Thủy',
  /* 15 Giáp Ngọ, Ất Mùi   */ 'Sa Trung Kim',
  /* 16 Bính Thân, Đinh Dậu */ 'Sơn Hạ Hỏa',
  /* 17 Mậu Tuất, Kỷ Hợi   */ 'Bình Địa Mộc',
  /* 18 Canh Tý,  Tân Sửu  */ 'Bích Thượng Thổ',
  /* 19 Nhâm Dần, Quý Mão  */ 'Kim Bạc Kim',
  /* 20 Giáp Thìn, Ất Tỵ   */ 'Phúc Đăng Hỏa',
  /* 21 Bính Ngọ, Đinh Mùi  */ 'Thiên Hà Thủy',
  /* 22 Mậu Thân, Kỷ Dậu   */ 'Đại Trạch Thổ',
  /* 23 Canh Tuất, Tân Hợi  */ 'Thoa Xuyến Kim',
  /* 24 Nhâm Tý,  Quý Sửu  */ 'Tang Đố Mộc',
  /* 25 Giáp Dần, Ất Mão   */ 'Đại Khê Thủy',
  /* 26 Bính Thìn, Đinh Tỵ  */ 'Sa Trung Thổ',
  /* 27 Mậu Ngọ, Kỷ Mùi    */ 'Thiên Thượng Hỏa',
  /* 28 Canh Thân, Tân Dậu  */ 'Thạch Lựu Mộc',
  /* 29 Nhâm Tuất, Quý Hợi  */ 'Đại Hải Thủy'
];

/* ---- Bảng tra Nạp Âm theo Can Chi ---- */
function getNapAm(can, chi) {
  var iCan = THIEN_CAN.indexOf(can);
  var iChi = DIA_CHI.indexOf(chi);
  if (iCan === -1 || iChi === -1) return '';
  /* Vị trí trong chu kỳ 60, chia đôi lấy index trong mảng 30 */
  var idx60 = ((iChi % 12) * 5 + Math.floor(iCan / 2)) % 30;
  return NAP_AM_60[idx60] || '';
}

/* ---- Ngũ Hành tương sinh ---- */
var TUONG_SINH = {
  'Mộc': 'Hỏa',
  'Hỏa': 'Thổ',
  'Thổ': 'Kim',
  'Kim':  'Thủy',
  'Thủy': 'Mộc'
};

/* ---- Ngũ Hành tương khắc ---- */
var TUONG_KHAC = {
  'Mộc': 'Thổ',
  'Thổ': 'Thủy',
  'Thủy': 'Hỏa',
  'Hỏa': 'Kim',
  'Kim':  'Mộc'
};

/* ---- Màu CSS variable cho mỗi Ngũ Hành ---- */
var NGU_HANH_COLOR = {
  'Kim':   'var(--kim-color)',
  'Mộc':   'var(--moc-color)',
  'Thủy':  'var(--thuy-color)',
  'Hỏa':   'var(--hoa-color)',
  'Thổ':   'var(--tho-color)'
};

/* ---- Giờ Địa Chi theo khung giờ thực ---- */
var GIO_DIA_CHI = [
  { chi: 'Tý',   from: 23, to: 1  },
  { chi: 'Sửu',  from: 1,  to: 3  },
  { chi: 'Dần',  from: 3,  to: 5  },
  { chi: 'Mão',  from: 5,  to: 7  },
  { chi: 'Thìn', from: 7,  to: 9  },
  { chi: 'Tỵ',   from: 9,  to: 11 },
  { chi: 'Ngọ',  from: 11, to: 13 },
  { chi: 'Mùi',  from: 13, to: 15 },
  { chi: 'Thân', from: 15, to: 17 },
  { chi: 'Dậu',  from: 17, to: 19 },
  { chi: 'Tuất', from: 19, to: 21 },
  { chi: 'Hợi',  from: 21, to: 23 }
];

/* ---- Tên sao cai quản 12 giờ (theo thứ tự Địa Chi) ---- */
/* Dùng cho hiển thị giờ Hoàng Đạo / Hắc Đạo */
var SAO_GIO = [
  /* Tý   */ 'Thanh Long',
  /* Sửu  */ 'Minh Đường',
  /* Dần  */ 'Thiên Hình',
  /* Mão  */ 'Chu Tước',
  /* Thìn */ 'Kim Quỹ',
  /* Tỵ   */ 'Bảo Quang',
  /* Ngọ  */ 'Bạch Hổ',
  /* Mùi  */ 'Ngọc Đường',
  /* Thân */ 'Thiên Lao',
  /* Dậu  */ 'Huyền Vũ',
  /* Tuất */ 'Tư Mệnh',
  /* Hợi  */ 'Câu Trận'
];

/* ---- Tên sao Hoàng Đạo (6 sao tốt) ---- */
/* Thanh Long, Minh Đường, Kim Quỹ, Bảo Quang, Ngọc Đường, Tư Mệnh */
var SAO_HOANG_DAO = ['Thanh Long', 'Minh Đường', 'Kim Quỹ', 'Bảo Quang', 'Ngọc Đường', 'Tư Mệnh'];

/* ---- Hướng Hỷ Thần theo Can ngày ---- */
/* Hỷ Thần: hướng vui mừng, xuất hành gặp may */
var HUONG_HY_THAN = {
  'Giáp': 'Đông Bắc', 'Ất': 'Đông Bắc',
  'Bính': 'Tây Bắc',  'Đinh': 'Tây Bắc',
  'Mậu':  'Tây Bắc',  'Kỷ': 'Đông',
  'Canh': 'Tây Nam',  'Tân': 'Tây Nam',
  'Nhâm': 'Nam',      'Quý': 'Nam'
};

/* ---- Hướng Tài Thần theo Can ngày ---- */
var HUONG_TAI_THAN = {
  'Giáp': 'Đông Nam', 'Ất': 'Đông',
  'Bính': 'Nam',      'Đinh': 'Đông Nam',
  'Mậu':  'Đông',    'Kỷ': 'Bắc',
  'Canh': 'Tây',     'Tân': 'Tây Bắc',
  'Nhâm': 'Bắc',    'Quý': 'Tây'
};

/* ---- Hướng Quý Nhân theo Can ngày ---- */
var HUONG_QUY_NHAN = {
  'Giáp': 'Đông Bắc', 'Ất': 'Tây Bắc',
  'Bính': 'Tây',      'Đinh': 'Tây Nam',
  'Mậu':  'Đông Bắc', 'Kỷ': 'Tây Bắc',
  'Canh': 'Đông',     'Tân': 'Đông Nam',
  'Nhâm': 'Nam',      'Quý': 'Đông'
};

/* ---- Hướng Hắc Thần (hướng xấu, tránh xuất hành) theo Can ngày ---- */
var HUONG_HAC_THAN = {
  'Giáp': 'Bắc',     'Ất': 'Tây',
  'Bính': 'Đông',    'Đinh': 'Bắc',
  'Mậu':  'Tây',    'Kỷ': 'Nam',
  'Canh': 'Nam',    'Tân': 'Đông',
  'Nhâm': 'Tây',   'Quý': 'Bắc'
};