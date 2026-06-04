/* ============================================================
   sao-tu-vi.js — Dữ liệu 108+ sao trong hệ thống Tử Vi Đẩu Số
   Phân loại: Chính Tinh (14), Phụ Tinh, Tạp Tinh
   Lịch Việt Nam 888
   ============================================================ */

var SAO_TU_VI = (function() {
  'use strict';

  /* ============================================================
     14 CHÍNH TINH và cung an theo Cục
     Mỗi sao có: tên, loại, ngũ hành, ý nghĩa ngắn
     ============================================================ */
  var CHINH_TINH = [
    { ten: 'Tử Vi',    loai: 'chinh', hanh: 'Thổ', y_nghia: 'Chủ tinh, quyền quý, phú quý, lãnh đạo' },
    { ten: 'Thiên Cơ', loai: 'chinh', hanh: 'Mộc', y_nghia: 'Cơ mưu, biến động, thông minh, linh hoạt' },
    { ten: 'Thái Dương',loai: 'chinh', hanh: 'Hỏa', y_nghia: 'Phú quý, công danh, sự nghiệp, ánh sáng' },
    { ten: 'Vũ Khúc',  loai: 'chinh', hanh: 'Kim', y_nghia: 'Tài lộc, thực tế, cương nghị, độc lập' },
    { ten: 'Thiên Đồng',loai: 'chinh', hanh: 'Thủy', y_nghia: 'Phúc đức, nhân từ, hưởng thụ, an nhàn' },
    { ten: 'Liêm Trinh',loai: 'chinh', hanh: 'Hỏa', y_nghia: 'Quan lộc, uy quyền, nghiêm túc' },
    { ten: 'Thiên Phủ', loai: 'chinh', hanh: 'Thổ', y_nghia: 'Kho lẫm, giàu có, tích lũy, ổn định' },
    { ten: 'Thái Âm',  loai: 'chinh', hanh: 'Thủy', y_nghia: 'Điền trạch, phụ nữ, tinh tế, văn học' },
    { ten: 'Tham Lang',loai: 'chinh', hanh: 'Mộc/Thủy', y_nghia: 'Đào hoa, đa tài, giao tiếp, hưởng lạc' },
    { ten: 'Cự Môn',   loai: 'chinh', hanh: 'Thủy', y_nghia: 'Thị phi, khẩu tài, biện luận, cô đơn' },
    { ten: 'Thiên Tướng',loai: 'chinh', hanh: 'Thủy', y_nghia: 'Ấn tướng, trung thành, hỗ trợ, bảo vệ' },
    { ten: 'Thiên Lương',loai: 'chinh', hanh: 'Mộc', y_nghia: 'Phúc thọ, y học, từ thiện, trưởng lão' },
    { ten: 'Thất Sát', loai: 'chinh', hanh: 'Kim', y_nghia: 'Sát khí, dũng mãnh, phá cách, biến động' },
    { ten: 'Phá Quân', loai: 'chinh', hanh: 'Thủy', y_nghia: 'Phá hoại, cải tổ, sáng tạo, tiên phong' }
  ];

  /* ============================================================
     PHỤ TINH (Lộc Tồn, Thiên Mã và các sao phụ quan trọng)
     ============================================================ */
  var PHU_TINH = [
    /* Tứ Hóa sao */
    { ten: 'Hóa Lộc',  loai: 'phu', hanh: 'Thổ',  y_nghia: 'Lộc, tài lộc tốt, phát tài' },
    { ten: 'Hóa Quyền',loai: 'phu', hanh: 'Mộc',  y_nghia: 'Quyền thế, lãnh đạo, uy tín' },
    { ten: 'Hóa Khoa', loai: 'phu', hanh: 'Thủy', y_nghia: 'Khoa danh, văn học, thi cử' },
    { ten: 'Hóa Kỵ',  loai: 'phu', hanh: 'Thủy', y_nghia: 'Thị phi, trở ngại, hao hụt' },
    /* Sao phụ tốt */
    { ten: 'Lộc Tồn',  loai: 'phu', hanh: 'Thổ',  y_nghia: 'Lộc vị, bảo thủ, giàu có' },
    { ten: 'Thiên Mã', loai: 'phu', hanh: 'Hỏa',  y_nghia: 'Đi xa, di chuyển, hoạt động' },
    { ten: 'Văn Khúc', loai: 'phu', hanh: 'Thủy', y_nghia: 'Văn học, nghệ thuật, thông minh' },
    { ten: 'Văn Xương',loai: 'phu', hanh: 'Kim',  y_nghia: 'Khoa cử, văn chương, thi đỗ' },
    { ten: 'Tả Phụ',   loai: 'phu', hanh: 'Thổ',  y_nghia: 'Phụ tá, quý nhân giúp đỡ' },
    { ten: 'Hữu Bật',  loai: 'phu', hanh: 'Thủy', y_nghia: 'Phụ tá, quý nhân giúp đỡ' },
    { ten: 'Thiên Khôi',loai: 'phu', hanh: 'Hỏa', y_nghia: 'Quý nhân, may mắn, phúc lành' },
    { ten: 'Thiên Việt',loai: 'phu', hanh: 'Hỏa', y_nghia: 'Quý nhân, trợ giúp đắc lực' },
    { ten: 'Thiên Quan',loai: 'phu', hanh: 'Thổ',  y_nghia: 'Quan lộc, thăng tiến, địa vị' },
    { ten: 'Thiên Phúc',loai: 'phu', hanh: 'Thổ',  y_nghia: 'Phúc đức, an lành, tốt lành' },
    /* Sao xấu */
    { ten: 'Kình Dương',loai: 'phu', hanh: 'Kim',  y_nghia: 'Hung tinh, tai họa, thương tích' },
    { ten: 'Đà La',    loai: 'phu', hanh: 'Kim',  y_nghia: 'Hung tinh, trì trệ, phiền não' },
    { ten: 'Hỏa Tinh', loai: 'phu', hanh: 'Hỏa',  y_nghia: 'Hung tinh, nóng nảy, tai họa' },
    { ten: 'Linh Tinh',loai: 'phu', hanh: 'Hỏa',  y_nghia: 'Hung tinh, bất ngờ, biến cố' },
    { ten: 'Địa Không', loai: 'phu', hanh: 'Hỏa', y_nghia: 'Hung tinh, hao tán, vô ích' },
    { ten: 'Địa Kiếp', loai: 'phu', hanh: 'Hỏa',  y_nghia: 'Hung tinh, tổn thất, cướp đoạt' }
  ];

  /* ============================================================
     TẠP TINH (các sao nhỏ bổ sung)
     ============================================================ */
  var TAP_TINH = [
    { ten: 'Thiên Hình',loai: 'tap', hanh: 'Kim',  y_nghia: 'Hình phạt, pháp luật, nghiêm khắc' },
    { ten: 'Thiên Diêu',loai: 'tap', hanh: 'Thủy', y_nghia: 'Đào hoa, phong lưu, hấp dẫn' },
    { ten: 'Thiên Riêu',loai: 'tap', hanh: 'Thủy', y_nghia: 'Thủy tai, hư hao, lưu động' },
    { ten: 'Phong Cáo', loai: 'tap', hanh: 'Thủy', y_nghia: 'Sóng gió, thị phi, tai vạ' },
    { ten: 'Thiên Khốc',loai: 'tap', hanh: 'Kim',  y_nghia: 'Tang thương, đau khổ, cô đơn' },
    { ten: 'Thiên Hư',  loai: 'tap', hanh: 'Thổ',  y_nghia: 'Hư hao, không thực chất' },
    { ten: 'Thiên Đức', loai: 'tap', hanh: 'Thổ',  y_nghia: 'Phúc đức, may mắn, cứu trợ' },
    { ten: 'Nguyệt Đức',loai: 'tap', hanh: 'Thổ',  y_nghia: 'Phúc đức, trợ giúp, giải hạn' },
    { ten: 'Long Trì',  loai: 'tap', hanh: 'Thủy', y_nghia: 'Tài nghệ, sáng tạo, nghệ thuật' },
    { ten: 'Phượng Các',loai: 'tap', hanh: 'Hỏa',  y_nghia: 'Uy quyền, tôn quý, danh dự' },
    { ten: 'Đẩu Quân', loai: 'tap', hanh: 'Kim',   y_nghia: 'Quân sự, võ thuật, cứng rắn' },
    { ten: 'Tam Thai',  loai: 'tap', hanh: 'Thổ',  y_nghia: 'Quý tướng, địa vị, thăng tiến' },
    { ten: 'Bát Tọa',  loai: 'tap', hanh: 'Thổ',   y_nghia: 'Ổn định, ngôi vị, tự tin' },
    { ten: 'Ân Quang', loai: 'tap', hanh: 'Thổ',   y_nghia: 'Ân sủng, quý nhân, được giúp' },
    { ten: 'Thiên Quý',loai: 'tap', hanh: 'Thổ',   y_nghia: 'Quý nhân, may mắn, tốt lành' },
    { ten: 'Cô Thần',  loai: 'tap', hanh: 'Hỏa',   y_nghia: 'Cô đơn, thiếu trợ giúp' },
    { ten: 'Quả Tú',   loai: 'tap', hanh: 'Hỏa',   y_nghia: 'Cô đơn, góa bụa, lẻ loi' },
    { ten: 'Đào Hoa',  loai: 'tap', hanh: 'Mộc',   y_nghia: 'Tình cảm, lãng mạn, hấp dẫn' },
    { ten: 'Hồng Loan',loai: 'tap', hanh: 'Thủy',  y_nghia: 'Hôn nhân, tình duyên, vui vẻ' },
    { ten: 'Thiên Hỷ', loai: 'tap', hanh: 'Thủy',  y_nghia: 'Hỷ sự, may mắn, niềm vui' },
    { ten: 'Bệnh Phù', loai: 'tap', hanh: 'Thổ',   y_nghia: 'Bệnh tật, tai ương, ốm đau' },
    { ten: 'Phục Binh',loai: 'tap', hanh: 'Kim',   y_nghia: 'Ẩn náu, thủ cũ, không rõ' },
    { ten: 'Quan Phủ', loai: 'tap', hanh: 'Kim',   y_nghia: 'Quan tụng, kiện cáo, tranh chấp' },
    { ten: 'Tiểu Hao', loai: 'tap', hanh: 'Hỏa',   y_nghia: 'Hao tán nhỏ, tốn kém' },
    { ten: 'Đại Hao',  loai: 'tap', hanh: 'Hỏa',   y_nghia: 'Hao tán lớn, mất mát nhiều' }
  ];

  /* ============================================================
     12 TÊN CUNG TỬ VI
     ============================================================ */
  var CUNG_TEN = [
    'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch',
    'Quan Lộc', 'Nô Bộc', 'Thiên Di', 'Tật Ách',
    'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'
  ];

  /* ============================================================
     12 ĐỊA CHI
     ============================================================ */
  var DIA_CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];

  /* ============================================================
     10 THIÊN CAN
     ============================================================ */
  var THIEN_CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];

  /* ============================================================
     NGŨ HÀNH NẠP ÂM — 60 năm Can Chi
     ============================================================ */
  var NAP_AM = [
    'Kim','Kim','Hỏa','Hỏa','Mộc','Mộc','Thủy','Thủy','Thổ','Thổ',
    'Thổ','Thổ','Kim','Kim','Hỏa','Hỏa','Mộc','Mộc','Thủy','Thủy',
    'Thủy','Thủy','Thổ','Thổ','Kim','Kim','Hỏa','Hỏa','Mộc','Mộc',
    'Mộc','Mộc','Thủy','Thủy','Thổ','Thổ','Kim','Kim','Hỏa','Hỏa',
    'Hỏa','Hỏa','Mộc','Mộc','Thủy','Thủy','Thổ','Thổ','Kim','Kim',
    'Kim','Kim','Hỏa','Hỏa','Mộc','Mộc','Thủy','Thủy','Thổ','Thổ'
  ];

  /* ============================================================
     CỤC SỐ theo Mệnh Ngũ Hành
     ============================================================ */
  var CUC_SO = {
    'Kim': 4, /* Kim Tứ Cục */
    'Mộc': 3, /* Mộc Tam Cục */
    'Thủy': 2, /* Thủy Nhị Cục */
    'Hỏa': 6, /* Hỏa Lục Cục */
    'Thổ': 5  /* Thổ Ngũ Cục */
  };

  /* ============================================================
     TÊN CỤC
     ============================================================ */
  var CUC_TEN = {
    2: 'Thủy Nhị Cục',
    3: 'Mộc Tam Cục',
    4: 'Kim Tứ Cục',
    5: 'Thổ Ngũ Cục',
    6: 'Hỏa Lục Cục'
  };

  /* ============================================================
     CHỦ MỆNH theo Địa Chi năm sinh
     ============================================================ */
  var CHU_MENH = {
    'Tý': 'Tham Lang', 'Sửu': 'Cự Môn',  'Dần': 'Lộc Tồn',
    'Mão': 'Văn Khúc', 'Thìn': 'Liêm Trinh', 'Tỵ': 'Vũ Khúc',
    'Ngọ': 'Phá Quân', 'Mùi': 'Vũ Khúc',    'Thân': 'Phá Quân',
    'Dậu': 'Văn Khúc', 'Tuất': 'Liêm Trinh', 'Hợi': 'Tham Lang'
  };

  /* ============================================================
     THÂN CHỦ theo Địa Chi năm sinh
     ============================================================ */
  var THAN_CHU = {
    'Tý': 'Linh Tinh', 'Sửu': 'Thiên Tướng', 'Dần': 'Thiên Đồng',
    'Mão': 'Văn Xương', 'Thìn': 'Thiên Cơ',  'Tỵ': 'Hỏa Tinh',
    'Ngọ': 'Thiên Tướng','Mùi': 'Thiên Đồng', 'Thân': 'Văn Xương',
    'Dậu': 'Thiên Cơ',  'Tuất': 'Hỏa Tinh', 'Hợi': 'Thiên Cơ'
  };

  /* Public API */
  return {
    CHINH_TINH: CHINH_TINH,
    PHU_TINH:   PHU_TINH,
    TAP_TINH:   TAP_TINH,
    CUNG_TEN:   CUNG_TEN,
    DIA_CHI:    DIA_CHI,
    THIEN_CAN:  THIEN_CAN,
    NAP_AM:     NAP_AM,
    CUC_SO:     CUC_SO,
    CUC_TEN:    CUC_TEN,
    CHU_MENH:   CHU_MENH,
    THAN_CHU:   THAN_CHU
  };
})();
