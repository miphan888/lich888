/* ============================================================
   can-chi-engine.js — Engine tính Can Chi, Tiết Khí, Thập Nhị Trực,
   Giờ Hoàng Đạo / Hắc Đạo, Nạp Âm, Hướng xuất hành
   Lịch Việt Nam 888
   Phụ thuộc: can-chi.js (global), tiet-khi.js (global), lunar-engine.js
   ============================================================ */

var CanChiEngine = (function() {
  'use strict';

  /* ============================================================
     CAN CHI NĂM
     ============================================================ */

  function getCanNam(nam) {
    var idx = (nam - 4) % 10;
    if (idx < 0) idx += 10;
    return THIEN_CAN[idx];
  }

  function getChiNam(nam) {
    var idx = (nam - 4) % 12;
    if (idx < 0) idx += 12;
    return DIA_CHI[idx];
  }

  function getCanChiNam(nam) {
    return { can: getCanNam(nam), chi: getChiNam(nam) };
  }

  /* ============================================================
     CAN CHI THÁNG
     Tháng âm lịch → Can Chi tháng dựa trên can năm
     ============================================================ */

  /* Bảng Can đầu tháng Giêng theo Can năm */
  var CAN_THANG_GIENG = {
    'Giáp': 2, 'Kỷ':   2,
    'Ất':   4, 'Canh': 4,
    'Bính': 6, 'Tân':  6,
    'Đinh': 8, 'Nhâm': 8,
    'Mậu':  0, 'Quý':  0
  };

  function getCanThang(thangAm, canNam) {
    var startIdx = CAN_THANG_GIENG[canNam];
    if (startIdx === undefined) startIdx = 0;
    var idx = (startIdx + thangAm - 1) % 10;
    return THIEN_CAN[idx];
  }

  /* Tháng 1 âm lịch = Dần (index 2), tháng 2 = Mão (index 3), ... */
  function getChiThang(thangAm) {
    var idx = (thangAm + 1) % 12;
    return DIA_CHI[idx];
  }

  function getCanChiThang(thangAm, canNam) {
    return {
      can: getCanThang(thangAm, canNam),
      chi: getChiThang(thangAm)
    };
  }

  /* ============================================================
     CAN CHI NGÀY
     ============================================================ */

  /* ---- Tính số Julian từ ngày dương lịch ---- */
  function _jdFromDate(dd, mm, yyyy) {
    var a  = Math.floor((14 - mm) / 12);
    var y  = yyyy + 4800 - a;
    var m  = mm + 12 * a - 3;
    var jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y
           + Math.floor(y / 4) - Math.floor(y / 100)
           + Math.floor(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y
         + Math.floor(y / 4) - 32083;
    }
    return jd;
  }

  function getCanNgayFromJD(jd) {
    var idx = (jd + 9) % 10;
    if (idx < 0) idx += 10;
    return THIEN_CAN[idx];
  }

  function getChiNgayFromJD(jd) {
    var idx = (jd + 1) % 12;
    if (idx < 0) idx += 12;
    return DIA_CHI[idx];
  }

  function getCanChiNgay(dd, mm, yyyy) {
    var jd = _jdFromDate(dd, mm, yyyy);
    return {
      can: getCanNgayFromJD(jd),
      chi: getChiNgayFromJD(jd),
      jd:  jd
    };
  }

  /* ============================================================
     CAN CHI GIỜ
     ============================================================ */

  function getChiGio(hour) {
    var adjusted = (hour + 1) % 24;
    var idx = Math.floor(adjusted / 2);
    return DIA_CHI[idx];
  }

  /* Quy tắc Can giờ Tý theo Can ngày */
  var CAN_GIO_TY = {
    'Giáp': 0, 'Kỷ':   0,
    'Ất':   2, 'Canh': 2,
    'Bính': 4, 'Tân':  4,
    'Đinh': 6, 'Nhâm': 6,
    'Mậu':  8, 'Quý':  8
  };

  function getCanGio(chiGio, canNgay) {
    var startIdx = CAN_GIO_TY[canNgay];
    if (startIdx === undefined) startIdx = 0;
    var chiIdx = DIA_CHI.indexOf(chiGio);
    if (chiIdx === -1) chiIdx = 0;
    var idx = (startIdx + chiIdx) % 10;
    return THIEN_CAN[idx];
  }

  function getCanChiGio(hour, canNgay) {
    var chi = getChiGio(hour);
    var can = getCanGio(chi, canNgay);
    return { can: can, chi: chi };
  }

  /* ============================================================
     TIẾT KHÍ — tính Solar Longitude bằng thuật toán gần đúng
     ============================================================ */

  function getSolarLongitude(dd, mm, yyyy) {
    var jd  = _jdFromDate(dd, mm, yyyy);
    var T   = (jd - 2451545.0) / 36525;
    var T2  = T * T;
    var dr  = Math.PI / 180;
    var M   = 357.52910 + 35999.05030 * T - 0.0001559 * T2;
    var L0  = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    var DL  = (1.914600 - 0.004817 * T) * Math.sin(dr * M)
            + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M)
            +  0.000290 * Math.sin(dr * 3 * M);
    var L   = L0 + DL;
    var omega = 125.04 - 1934.136 * T;
    L = L - 0.00569 - 0.00478 * Math.sin(dr * omega);
    L = L % 360;
    if (L < 0) L += 360;
    return L;
  }

  function getTietKhiNgay(dd, mm, yyyy) {
    var lng = getSolarLongitude(dd, mm, yyyy);
    return getTietKhiByLng(lng);
  }

  /* ============================================================
     THẬP NHỊ TRỰC
     ============================================================ */

  var THAP_NHI_TRUC = [
    'Kiến', 'Trừ', 'Mãn', 'Bình',
    'Định', 'Chấp', 'Phá', 'Nguy',
    'Thành', 'Thu', 'Khai', 'Bế'
  ];

  function getThapNhiTruc(chiNgay, chiThang) {
    var iNgay  = DIA_CHI.indexOf(chiNgay);
    var iThang = DIA_CHI.indexOf(chiThang);
    if (iNgay === -1 || iThang === -1) return THAP_NHI_TRUC[0];
    var idx = (iNgay - iThang + 12) % 12;
    return THAP_NHI_TRUC[idx];
  }

  /* ---- Lấy thông tin chi tiết trực (từ THAP_NHI_TRUC_DATA trong thap-nhi-truc.js) ---- */
  function getThucData(tenTruc) {
    if (typeof THAP_NHI_TRUC_DATA !== 'undefined') {
      for (var i = 0; i < THAP_NHI_TRUC_DATA.length; i++) {
        if (THAP_NHI_TRUC_DATA[i].ten === tenTruc) return THAP_NHI_TRUC_DATA[i];
      }
    }
    return null;
  }

  /* ============================================================
     GIỜ HOÀNG ĐẠO / HẮC ĐẠO
     6 sao Hoàng Đạo cố định: Thanh Long, Minh Đường, Kim Quỹ,
     Bảo Quang, Ngọc Đường, Tư Mệnh
     Thứ tự 12 sao theo vòng 12 Chi bắt đầu từ Can ngày
     ============================================================ */

  /*
   * Quy tắc: 12 sao xoay theo vòng Địa Chi tính từ giờ Tý của ngày.
   * Sao bắt đầu giờ Tý phụ thuộc Can ngày:
   * Giáp/Kỷ → Tý = Thanh Long (index 0)
   * Ất/Canh → Tý = Minh Đường (index 1)  — tức +1
   * Bính/Tân → Tý = Kim Quỹ (index 4)
   * Đinh/Nhâm → Tý = Ngọc Đường (index 7)
   * Mậu/Quý → Tý = Tư Mệnh (index 11)
   *
   * 12 sao theo thứ tự:
   * Thanh Long(H), Minh Đường(H), Thiên Hình(X), Chu Tước(X),
   * Kim Quỹ(H), Bảo Quang(H), Bạch Hổ(X), Ngọc Đường(H),
   * Thiên Lao(X), Huyền Vũ(X), Tư Mệnh(H), Câu Trận(X)
   * H=Hoàng Đạo, X=Hắc Đạo
   */
  var MUOI_HAI_SAO = [
    { ten: 'Thanh Long', hoangDao: true  },
    { ten: 'Minh Đường', hoangDao: true  },
    { ten: 'Thiên Hình', hoangDao: false },
    { ten: 'Chu Tước',   hoangDao: false },
    { ten: 'Kim Quỹ',    hoangDao: true  },
    { ten: 'Bảo Quang',  hoangDao: true  },
    { ten: 'Bạch Hổ',   hoangDao: false },
    { ten: 'Ngọc Đường', hoangDao: true  },
    { ten: 'Thiên Lao',  hoangDao: false },
    { ten: 'Huyền Vũ',   hoangDao: false },
    { ten: 'Tư Mệnh',    hoangDao: true  },
    { ten: 'Câu Trận',   hoangDao: false }
  ];

  /* Sao khởi đầu giờ Tý (index 0 = Thanh Long) theo Can ngày */
  var SAO_BAT_DAU_TY = {
    'Giáp': 0,  'Kỷ':   0,
    'Ất':   2,  'Canh': 2,
    'Bính': 4,  'Tân':  4,
    'Đinh': 6,  'Nhâm': 6,
    'Mậu':  8,  'Quý':  8
  };

  /* ---- Lấy danh sách 12 giờ với trạng thái Hoàng Đạo / Hắc Đạo ---- */
  function getDanhSachGio(canNgay) {
    var startSao = SAO_BAT_DAU_TY[canNgay];
    if (startSao === undefined) startSao = 0;

    var result = [];
    for (var i = 0; i < DIA_CHI.length; i++) {
      var chi      = DIA_CHI[i];
      var saoIdx   = (startSao + i) % 12;
      var sao      = MUOI_HAI_SAO[saoIdx];
      var gioInfo  = GIO_DIA_CHI[i];
      result.push({
        chi:      chi,
        sao:      sao.ten,
        loai:     sao.hoangDao ? 'Hoàng Đạo' : 'Hắc Đạo',
        good:     sao.hoangDao,
        from:     gioInfo ? gioInfo.from : (i * 2 - 1),
        to:       gioInfo ? gioInfo.to   : (i * 2 + 1)
      });
    }
    return result;
  }

  /* ============================================================
     HƯỚNG XUẤT HÀNH
     ============================================================ */

  function getHuongXuatHanh(canNgay) {
    return {
      hyThan:   HUONG_HY_THAN[canNgay]   || '—',
      taiThan:  HUONG_TAI_THAN[canNgay]  || '—',
      quyNhan:  HUONG_QUY_NHAN[canNgay]  || '—',
      hacThan:  HUONG_HAC_THAN[canNgay]  || '—'
    };
  }

  /* ============================================================
     NẠP ÂM
     ============================================================ */

  function getNapAmCanChi(can, chi) {
    return getNapAm(can, chi);
  }

  /* ============================================================
     PHÂN TÍCH ĐẦY ĐỦ MỘT NGÀY DL
     Trả về object tổng hợp tất cả thông tin lịch
     ============================================================ */
  function phanTichNgay(dd, mm, yyyy, tz) {
    tz = (tz !== undefined) ? tz : 7;

    /* Chuyển sang âm lịch */
    var am = LunarEngine.convertSolar2Lunar(dd, mm, yyyy, tz);

    /* Can Chi ngày */
    var ccNgay  = getCanChiNgay(dd, mm, yyyy);

    /* Can Chi tháng (theo âm lịch) */
    var canNam  = getCanNam(am.year);
    var ccThang = getCanChiThang(am.month, canNam);

    /* Can Chi năm âm lịch */
    var ccNam   = getCanChiNam(am.year);

    /* Nạp Âm */
    var napAmNgay  = getNapAm(ccNgay.can,  ccNgay.chi);
    var napAmThang = getNapAm(ccThang.can, ccThang.chi);
    var napAmNam   = getNapAm(ccNam.can,   ccNam.chi);

    /* Tiết Khí */
    var tietKhi = getTietKhiNgay(dd, mm, yyyy);

    /* Thập Nhị Trực */
    var tenTruc  = getThapNhiTruc(ccNgay.chi, ccThang.chi);
    var trucData = getThucData(tenTruc);

    /* Danh sách 12 giờ với sao cai quản */
    var danhSachGio = getDanhSachGio(ccNgay.can);

    /* Hướng xuất hành */
    var huong = getHuongXuatHanh(ccNgay.can);

    /* Thứ trong tuần */
    var thuMap = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    var dow    = new Date(yyyy, mm - 1, dd).getDay();

    return {
      duong:       { dd: dd, mm: mm, yyyy: yyyy },
      am:          am,
      thu:         thuMap[dow],
      ccNgay:      ccNgay,
      ccThang:     ccThang,
      ccNam:       ccNam,
      napAmNgay:   napAmNgay,
      napAmThang:  napAmThang,
      napAmNam:    napAmNam,
      tietKhi:     tietKhi,
      truc:        tenTruc,
      trucData:    trucData,
      danhSachGio: danhSachGio,
      huong:       huong
    };
  }

  /* ============================================================
     Public API
     ============================================================ */
  return {
    getCanNam:          getCanNam,
    getChiNam:          getChiNam,
    getCanChiNam:       getCanChiNam,
    getCanThang:        getCanThang,
    getChiThang:        getChiThang,
    getCanChiThang:     getCanChiThang,
    getCanChiNgay:      getCanChiNgay,
    getCanGio:          getCanGio,
    getCanChiGio:       getCanChiGio,
    getChiGio:          getChiGio,
    getSolarLongitude:  getSolarLongitude,
    getTietKhiNgay:     getTietKhiNgay,
    getThapNhiTruc:     getThapNhiTruc,
    getDanhSachGio:     getDanhSachGio,
    getHuongXuatHanh:   getHuongXuatHanh,
    getNapAmCanChi:     getNapAmCanChi,
    phanTichNgay:       phanTichNgay,
    THAP_NHI_TRUC:      THAP_NHI_TRUC,
    MUOI_HAI_SAO:       MUOI_HAI_SAO
  };
})();