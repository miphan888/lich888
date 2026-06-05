/* ============================================================
   tu-vi-engine.js — Engine tính lá số Tử Vi Đẩu Số
   An 14 chính tinh + phụ tinh + tạp tinh
   Tính Đại Vận, Tiểu Vận, Mệnh Cục
   Lịch Việt Nam 888
   ============================================================ */

var TuViEngine = (function() {
  'use strict';

  /* ============================================================
     THIÊN CAN và ĐỊA CHI
     ============================================================ */
  var THIEN_CAN  = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
  var DIA_CHI    = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
  var NGU_HANH   = ['Kim','Kim','Hỏa','Hỏa','Mộc','Mộc','Thủy','Thủy','Thổ','Thổ'];

  /* ============================================================
     TÍNH THIÊN CAN VÀ ĐỊA CHI CỦA NĂM
     ============================================================ */
  function getCanChiNam(nam) {
    var canIdx = (nam - 4)  % 10;
    var chiIdx = (nam - 4)  % 12;
    if (canIdx < 0) canIdx += 10;
    if (chiIdx < 0) chiIdx += 12;
    return {
      can: THIEN_CAN[canIdx],
      chi: DIA_CHI[chiIdx],
      canIdx: canIdx,
      chiIdx: chiIdx
    };
  }

  /* ============================================================
     TÍNH THIÊN CAN VÀ ĐỊA CHI CỦA THÁNG ÂM LỊCH
     ============================================================ */
  function getCanChiThang(namCan, thangAm) {
    /* Bảng Can tháng theo Can năm */
    var bang = {
      0: 2, /* Giáp/Kỷ → tháng 1 = Bính Dần (canIdx=2) */
      1: 4, /* Ất/Canh → tháng 1 = Mậu Dần */
      2: 6, /* Bính/Tân → tháng 1 = Canh Dần */
      3: 8, /* Đinh/Nhâm → tháng 1 = Nhâm Dần */
      4: 0, /* Mậu/Quý → tháng 1 = Giáp Dần */
      5: 2, 6: 4, 7: 6, 8: 8, 9: 0
    };
    var canDau  = bang[namCan % 10];
    var canIdx  = (canDau + thangAm - 1) % 10;
    var chiIdx  = (thangAm + 1) % 12; /* Tháng 1 = Dần (idx=2) */
    return {
      can: THIEN_CAN[canIdx],
      chi: DIA_CHI[(thangAm + 1) % 12],
      canIdx: canIdx,
      chiIdx: (thangAm + 1) % 12
    };
  }

  /* ============================================================
     TÍNH THIÊN CAN VÀ ĐỊA CHI CỦA NGÀY
     (Dùng JDN)
     ============================================================ */
  function getCanChiNgay(ngay, thang, nam) {
    /* Tính Julian Day Number */
    var a  = Math.floor((14 - thang) / 12);
    var y2 = nam + 4800 - a;
    var m2 = thang + 12 * a - 3;
    var jdn = ngay + Math.floor((153 * m2 + 2) / 5) + 365 * y2 +
              Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045;
    var canIdx = (jdn + 9) % 10;
    var chiIdx = (jdn + 1) % 12;
    if (canIdx < 0) canIdx += 10;
    if (chiIdx < 0) chiIdx += 12;
    return {
      can: THIEN_CAN[canIdx],
      chi: DIA_CHI[chiIdx],
      canIdx: canIdx,
      chiIdx: chiIdx
    };
  }

  /* ============================================================
     TÍNH THIÊN CAN CỦA GIỜ
     ============================================================ */
  function getCanGio(chiGioIdx, canNgayIdx) {
    /* Bảng can giờ theo can ngày */
    var bang = { 0:0, 1:2, 2:4, 3:6, 4:8, 5:0, 6:2, 7:4, 8:6, 9:8 };
    var canDau = bang[canNgayIdx % 10];
    var canIdx = (canDau + chiGioIdx) % 10;
    return {
      can: THIEN_CAN[canIdx],
      chi: DIA_CHI[chiGioIdx],
      canIdx: canIdx,
      chiIdx: chiGioIdx
    };
  }

  /* ============================================================
     TÍNH NGŨ HÀNH NẠP ÂM CỦA NĂM
     ============================================================ */
  function getNapAmNam(canIdx, chiIdx) {
    /* 60 hoa giáp, 2 năm cùng nạp âm */
    var idx60 = (canIdx % 10) + (chiIdx % 12);
    /* Map cặp can-chi sang nạp âm */
    var napAmMap = [
      /* Giáp Tý, Ất Sửu */ 'Kim', /* Bính Dần, Đinh Mão */ 'Hỏa',
      /* Mậu Thìn, Kỷ Tỵ */ 'Mộc', /* Canh Ngọ, Tân Mùi */ 'Thổ',
      /* Nhâm Thân, Quý Dậu */ 'Kim', /* Giáp Tuất, Ất Hợi */ 'Hỏa',
      /* Bính Tý, Đinh Sửu */ 'Thủy', /* Mậu Dần, Kỷ Mão */ 'Thổ',
      /* Canh Thìn, Tân Tỵ */ 'Kim', /* Nhâm Ngọ, Quý Mùi */ 'Mộc',
      /* Giáp Thân, Ất Dậu */ 'Thủy', /* Bính Tuất, Đinh Hợi */ 'Thổ',
      /* Mậu Tý, Kỷ Sửu */ 'Hỏa', /* Canh Dần, Tân Mão */ 'Mộc',
      /* Nhâm Thìn, Quý Tỵ */ 'Thủy', /* Giáp Ngọ, Ất Mùi */ 'Kim',
      /* Bính Thân, Đinh Dậu */ 'Hỏa', /* Mậu Tuất, Kỷ Hợi */ 'Mộc',
      /* Canh Tý, Tân Sửu */ 'Thổ', /* Nhâm Dần, Quý Mão */ 'Kim',
      /* Giáp Thìn, Ất Tỵ */ 'Hỏa', /* Bính Ngọ, Đinh Mùi */ 'Thủy',
      /* Mậu Thân, Kỷ Dậu */ 'Thổ', /* Canh Tuất, Tân Hợi */ 'Kim',
      /* Nhâm Tý, Quý Sửu */ 'Mộc', /* Giáp Dần, Ất Mão */ 'Thủy',
      /* Bính Thìn, Đinh Tỵ */ 'Thổ', /* Mậu Ngọ, Kỷ Mùi */ 'Hỏa',
      /* Canh Thân, Tân Dậu */ 'Mộc', /* Nhâm Tuất, Quý Hợi */ 'Thủy'
    ];

    /* Tra bảng theo cặp can-chi (mỗi cặp chiếm 1 phần tử, 2 năm/cặp) */
    var idx60Pair = (canIdx + chiIdx * 5) % 30;
    return napAmMap[idx60Pair % napAmMap.length] || 'Thổ';
  }

  /* ============================================================
     XÁC ĐỊNH MỆNH NGŨ HÀNH và CỤC SỐ
     ============================================================ */
  function getMenhCuc(ngaySinh, thangAmLich, namSinh, chiGioIdx) {
    var ccNam = getCanChiNam(namSinh);

    /* Mệnh ngũ hành theo nạp âm năm sinh */
    var napAm = getNapAmNam(ccNam.canIdx, ccNam.chiIdx);

    /* Cục số */
    var cucMap = { 'Kim':4, 'Mộc':3, 'Thủy':2, 'Hỏa':6, 'Thổ':5 };
    var cucSo  = cucMap[napAm] || 2;

    return {
      menhHanh: napAm,
      cucSo:    cucSo,
      cucTen:   SAO_TU_VI.CUC_TEN[cucSo] || (napAm + ' Cục'),
      chiNam:   ccNam.chi,
      canNam:   ccNam.can
    };
  }

  /* ============================================================
     AN 12 CUNG TRÊN 12 ĐỊA CHI
     Mệnh cung = f(tháng âm, giờ sinh)
     ============================================================ */
  function anMenhCung(thangAm, chiGioIdx) {
    /*
     * Nguyên tắc:
     * - Bắt đầu từ tháng Dần (index 2 trong DIA_CHI)
     * - Tháng 1 âm = Dần, tháng 2 = Mão, ...
     * - Đếm ngược chiều địa chi từ cung tháng theo giờ sinh
     */
    var cungThang = (thangAm + 1) % 12; /* Tháng 1 = Dần idx=2 */
    /* Cung Mệnh = lấy cung tháng, đếm ngược theo giờ */
    var menhCungIdx = (cungThang - chiGioIdx + 12) % 12;
    /* Thân cung = đối xung với Mệnh (cách 6 cung) */
    var thanCungIdx = (menhCungIdx + 6) % 12;
    return {
      menhCungIdx: menhCungIdx,
      thanCungIdx: thanCungIdx
    };
  }

  /* ============================================================
     AN 12 TÊN CUNG vào 12 Địa Chi
     Thứ tự cung bắt đầu từ Mệnh và đi thuận chiều
     ============================================================ */
  function anTenCung(menhCungIdx) {
    /* 12 tên cung theo thứ tự chuẩn */
    var tenCung = SAO_TU_VI.CUNG_TEN;
    var result  = new Array(12);
    for (var i = 0; i < 12; i++) {
      var diaChiIdx = (menhCungIdx + i) % 12;
      result[diaChiIdx] = {
        ten:       tenCung[i],
        diaChiIdx: diaChiIdx,
        diaChi:    DIA_CHI[diaChiIdx]
      };
    }
    return result;
  }

  /* ============================================================
     AN TỬ VI TINH (chính tinh đứng đầu) THEO CỤC
     ============================================================ */
  function anTuViTinh(cucSo, ngayAmLich) {
    /*
     * Thuật toán an Tử Vi:
     * - Từ ngày âm lịch và cục số tìm cung an Tử Vi
     * - Nếu ngayAmLich % cucSo == 0 → Tử Vi ở cung Dần
     * - Nếu dư r: đếm từ Dần đi tới r bước rồi đếm lùi (1 Dần, 2 Sửu, ...)
     */
    var du     = ngayAmLich % cucSo;
    var thuong = Math.floor(ngayAmLich / cucSo);

    var tuViIdx; /* Index trong 12 Địa Chi */

    if (du === 0) {
      /* Chẵn chia hết: Tử Vi ở cung Dần (idx=2) + số lần thương */
      tuViIdx = (2 + thuong - 1) % 12;
    } else {
      /* Đếm xuôi từ Dần theo thương rồi lùi theo dư */
      var xuoi = (2 + thuong) % 12;
      tuViIdx  = (xuoi - du + 12) % 12;
    }

    return tuViIdx;
  }

  /* ============================================================
     AN 14 CHÍNH TINH từ vị trí Tử Vi
     Mỗi sao có khoảng cách cố định so với Tử Vi
     ============================================================ */
  function anChinhTinh(tuViIdx) {
    /*
     * Khoảng cách các chính tinh so với Tử Vi (theo chiều thuận/nghịch)
     * Dương (thuận chiều địa chi): +
     * Âm (ngược chiều): -
     */
    var bangAn = [
      /* [tên, khoảng cách từ Tử Vi, thuận=true/nghịch=false] */
      { ten: 'Tử Vi',     kc: 0,  thuan: true  },
      { ten: 'Thiên Cơ',  kc: 1,  thuan: false },
      { ten: 'Thái Dương',kc: 2,  thuan: true  }, /* Từ Tử Vi +2 (lùi 4 so với công thức khác) */
      { ten: 'Vũ Khúc',   kc: 3,  thuan: true  },
      { ten: 'Thiên Đồng',kc: 4,  thuan: true  },
      { ten: 'Liêm Trinh',kc: 7,  thuan: true  }, /* Lùi thêm 3 */
      /* Nhóm Thiên Phủ ngược: Phủ ở cung đối xung với Tử Vi */
      { ten: 'Thiên Phủ', kc: 6,  thuan: false, base: 'phu' },
      { ten: 'Thái Âm',   kc: 1,  thuan: true,  base: 'phu' },
      { ten: 'Tham Lang', kc: 2,  thuan: true,  base: 'phu' },
      { ten: 'Cự Môn',    kc: 3,  thuan: true,  base: 'phu' },
      { ten: 'Thiên Tướng',kc: 4, thuan: true,  base: 'phu' },
      { ten: 'Thiên Lương',kc: 5, thuan: true,  base: 'phu' },
      { ten: 'Thất Sát',  kc: 6,  thuan: true,  base: 'phu' },
      { ten: 'Phá Quân',  kc: 10, thuan: true,  base: 'phu' }
    ];

    /* Thiên Phủ ở cung đối xung với Tử Vi (cách 6 cung) */
    var thuPhufIdx = (tuViIdx + 6) % 12;

    var result = {}; /* ten → diaChiIdx */

    for (var i = 0; i < bangAn.length; i++) {
      var sao = bangAn[i];
      var base = (sao.base === 'phu') ? thuPhufIdx : tuViIdx;
      var idx;
      if (sao.thuan) {
        idx = (base + sao.kc) % 12;
      } else {
        idx = (base - sao.kc + 12) % 12;
      }
      result[sao.ten] = idx;
    }

    return result;
  }

  /* ============================================================
     AN PHỤ TINH theo Can năm và Chi năm
     ============================================================ */
  function anPhuTinh(canNamIdx, chiNamIdx, chiGioIdx, menhCungIdx) {
    var result = {};

    /* Lộc Tồn theo Can năm */
    var locTonBang = [2,3,5,6,2,3,8,9,11,0]; /* idx trong DIA_CHI */
    result['Lộc Tồn'] = locTonBang[canNamIdx];

    /* Thiên Mã theo Chi năm */
    var maBang = { 0:8, 1:11, 2:5, 3:2, 4:8, 5:11, 6:5, 7:2, 8:8, 9:11, 10:5, 11:2 };
    result['Thiên Mã'] = maBang[chiNamIdx] || 0;

    /* Kình Dương (trước Lộc Tồn 1 bước) */
    result['Kình Dương'] = (locTonBang[canNamIdx] + 1) % 12;

    /* Đà La (sau Lộc Tồn 1 bước, đi ngược) */
    result['Đà La'] = (locTonBang[canNamIdx] - 1 + 12) % 12;

    /* Hỏa Tinh theo Chi năm + giờ sinh */
    var hoaBang = { 0:2, 1:11, 2:8, 3:5, 4:2, 5:11, 6:8, 7:5, 8:2, 9:11, 10:8, 11:5 };
    result['Hỏa Tinh'] = (hoaBang[chiNamIdx] + chiGioIdx) % 12;

    /* Linh Tinh */
    var linhBang = { 0:9, 1:0, 2:3, 3:6, 4:9, 5:0, 6:3, 7:6, 8:9, 9:0, 10:3, 11:6 };
    result['Linh Tinh'] = (linhBang[chiNamIdx] + chiGioIdx) % 12;

    /* Thiên Khôi + Thiên Việt theo Can năm */
    var khoiBang = [1, 0, 11, 8, 1, 0, 3, 2, 9, 8];
    var vietBang = [7, 8, 0, 11, 7, 8, 5, 6, 3, 2];
    result['Thiên Khôi'] = khoiBang[canNamIdx];
    result['Thiên Việt'] = vietBang[canNamIdx];

    /* Văn Xương theo Chi năm */
    var xuongBang = { 0:9, 1:8, 2:7, 3:6, 4:5, 5:4, 6:9, 7:8, 8:7, 9:6, 10:5, 11:4 };
    result['Văn Xương'] = xuongBang[chiNamIdx] || 0;

    /* Văn Khúc theo Chi năm */
    var khucBang = { 0:4, 1:5, 2:6, 3:7, 4:8, 5:9, 6:4, 7:5, 8:6, 9:7, 10:8, 11:9 };
    result['Văn Khúc'] = khucBang[chiNamIdx] || 0;

    /* Tả Phụ theo tháng âm */
    /* (đặt ở cung Thìn rồi tính theo tháng) */
    result['Tả Phụ']  = menhCungIdx;
    result['Hữu Bật'] = (menhCungIdx + 6) % 12;

    /* Địa Không + Địa Kiếp theo giờ sinh */
    result['Địa Không'] = (chiGioIdx + 11) % 12;
    result['Địa Kiếp']  = (12 - chiGioIdx) % 12;

    /* Đào Hoa theo Chi năm */
    var daoHoaBang = { 0:9, 1:6, 2:3, 3:0, 4:9, 5:6, 6:3, 7:0, 8:9, 9:6, 10:3, 11:0 };
    result['Đào Hoa'] = daoHoaBang[chiNamIdx] || 0;

    /* Hồng Loan + Thiên Hỷ theo Chi năm */
    var hongLoanBang = { 0:9, 1:8, 2:7, 3:6, 4:5, 5:4, 6:3, 7:2, 8:1, 9:0, 10:11, 11:10 };
    result['Hồng Loan'] = hongLoanBang[chiNamIdx] || 0;
    result['Thiên Hỷ']  = (hongLoanBang[chiNamIdx] + 6) % 12;

    /* Cô Thần + Quả Tú theo Chi năm */
    var coThanBang = { 0:0, 1:0, 2:3, 3:3, 4:3, 5:6, 6:6, 7:6, 8:9, 9:9, 10:9, 11:0 };
    result['Cô Thần'] = coThanBang[chiNamIdx] || 0;
    result['Quả Tú']  = (coThanBang[chiNamIdx] + 3) % 12;

    return result;
  }

  /* ============================================================
     TỨ HÓA theo Can năm
     ============================================================ */
  function tinhTuHoa(canNamIdx, chinhTinhMap) {
    /* Bảng Tứ Hóa theo Can năm */
    var tuHoaBang = [
      /* Giáp */ { loc:'Liêm Trinh', quyen:'Phá Quân', khoa:'Vũ Khúc',    ky:'Thái Dương' },
      /* Ất  */ { loc:'Thiên Cơ',   quyen:'Thiên Lương',khoa:'Tử Vi',      ky:'Thái Âm'   },
      /* Bính */ { loc:'Thiên Đồng',quyen:'Thiên Cơ',  khoa:'Văn Xương',  ky:'Liêm Trinh'},
      /* Đinh */ { loc:'Thái Âm',   quyen:'Thiên Đồng',khoa:'Thiên Cơ',   ky:'Cự Môn'    },
      /* Mậu  */ { loc:'Tham Lang', quyen:'Thái Âm',   khoa:'Hữu Bật',    ky:'Thiên Cơ'  },
      /* Kỷ  */ { loc:'Vũ Khúc',   quyen:'Tham Lang',  khoa:'Thiên Lương',ky:'Văn Khúc'  },
      /* Canh */ { loc:'Thái Dương',quyen:'Vũ Khúc',   khoa:'Thái Âm',    ky:'Thiên Đồng'},
      /* Tân */ { loc:'Cự Môn',    quyen:'Thái Dương',  khoa:'Văn Khúc',   ky:'Văn Xương' },
      /* Nhâm */ { loc:'Thiên Lương',quyen:'Tử Vi',    khoa:'Tả Phụ',     ky:'Vũ Khúc'   },
      /* Quý */ { loc:'Phá Quân',  quyen:'Thiên Lương', khoa:'Thái Âm',    ky:'Tham Lang' }
    ];

    var hoa = tuHoaBang[canNamIdx];
    var result = {};

    /* Gắn Hóa vào cung của sao tương ứng */
    if (hoa && chinhTinhMap[hoa.loc]  !== undefined) result[chinhTinhMap[hoa.loc]]  = (result[chinhTinhMap[hoa.loc]]  || []).concat(['Hóa Lộc']);
    if (hoa && chinhTinhMap[hoa.quyen]!== undefined) result[chinhTinhMap[hoa.quyen]]= (result[chinhTinhMap[hoa.quyen]]|| []).concat(['Hóa Quyền']);
    if (hoa && chinhTinhMap[hoa.khoa] !== undefined) result[chinhTinhMap[hoa.khoa]] = (result[chinhTinhMap[hoa.khoa]] || []).concat(['Hóa Khoa']);
    if (hoa && chinhTinhMap[hoa.ky]   !== undefined) result[chinhTinhMap[hoa.ky]]   = (result[chinhTinhMap[hoa.ky]]   || []).concat(['Hóa Kỵ']);

    return result;
  }

  /* ============================================================
     TÍNH ĐẠI VẬN
     ============================================================ */
  function tinhDaiVan(cucSo, gioiTinh, canNamIdx, chiNamIdx, namSinh) {
    /*
     * Quy tắc:
     * - Nam + Can dương (0,2,4,6,8) hoặc Nữ + Can âm → đi thuận
     * - Nam + Can âm hoặc Nữ + Can dương → đi nghịch
     * - Mỗi đại vận = cucSo năm
     * - Can Chi đại vận tính từ Can Chi tháng 1 âm lịch
     */
    var canDuong = (canNamIdx % 2 === 0); /* Can chẵn = dương */
    var namDuong = (gioiTinh === 'nam');
    var thuanChieu = (namDuong && canDuong) || (!namDuong && !canDuong);

    /* Can Chi tháng 1 làm gốc */
    var thang1CanIdx = ((canNamIdx % 10) * 2 + 2) % 10; /* Giáp/Kỷ năm → Bính tháng 1 */
    var thang1ChiIdx = 2; /* Tháng 1 âm = Dần (idx 2) */

    var daiVan = [];
    for (var i = 0; i < 12; i++) {
      var tuoi     = cucSo * (i + 1);
      var namBatDau = namSinh + tuoi - cucSo + 1;
      var namKetThuc = namSinh + tuoi;

      /* Can Chi đại vận */
      var offset = i + 1;
      var dvCanIdx, dvChiIdx;
      if (thuanChieu) {
        dvCanIdx = (thang1CanIdx + offset) % 10;
        dvChiIdx = (thang1ChiIdx + offset) % 12;
      } else {
        dvCanIdx = (thang1CanIdx - offset + 100) % 10;
        dvChiIdx = (thang1ChiIdx - offset + 120) % 12;
      }

      /* Ngũ Hành của Can */
      var hanhBang = ['Mộc','Mộc','Hỏa','Hỏa','Thổ','Thổ','Kim','Kim','Thủy','Thủy'];

      daiVan.push({
        stt:       i + 1,
        tuoi:      tuoi,
        namBatDau: namBatDau,
        namKetThuc:namKetThuc,
        can:       SAO_TU_VI.THIEN_CAN[dvCanIdx],
        chi:       DIA_CHI[dvChiIdx],
        hanh:      hanhBang[dvCanIdx],
        canIdx:    dvCanIdx,
        chiIdx:    dvChiIdx
      });
    }

    return daiVan;
  }

  /* ============================================================
     TÍNH TIỂU VẬN (10 tiểu vận trong 1 đại vận)
     ============================================================ */
  function tinhTieuVan(daiVanHienTai, namSinh, gioiTinh, canNamIdx) {
    var canDuong   = (canNamIdx % 2 === 0);
    var namDuong   = (gioiTinh === 'nam');
    var thuanChieu = (namDuong && canDuong) || (!namDuong && !canDuong);

    var tieuVan = [];
    var canBase = daiVanHienTai.canIdx;
    var chiBase = daiVanHienTai.chiIdx;
    var hanhBang = ['Mộc','Mộc','Hỏa','Hỏa','Thổ','Thổ','Kim','Kim','Thủy','Thủy'];

    for (var i = 0; i < 10; i++) {
      var nam = daiVanHienTai.namBatDau + i;
      var tvCanIdx, tvChiIdx;
      if (thuanChieu) {
        tvCanIdx = (canBase + i) % 10;
        tvChiIdx = (chiBase + i) % 12;
      } else {
        tvCanIdx = (canBase - i + 100) % 10;
        tvChiIdx = (chiBase - i + 120) % 12;
      }
      tieuVan.push({
        nam:    nam,
        tuoi:   nam - namSinh,
        can:    SAO_TU_VI.THIEN_CAN[tvCanIdx],
        chi:    DIA_CHI[tvChiIdx],
        hanh:   hanhBang[tvCanIdx],
        canIdx: tvCanIdx,
        chiIdx: tvChiIdx
      });
    }

    return tieuVan;
  }

  /* ============================================================
     TÍNH TUẦN VÀ TRIỆT
     ============================================================ */
  function tinhTuanTriet(canNamIdx, chiNamIdx) {
    /* Tuần = cặp Can Chi bắt đầu từ Giáp, khoảng 10 năm */
    /* 2 Địa Chi bị bỏ qua = Tuần Trống (Không) */
    var tuan   = Math.floor(chiNamIdx / 2) * 2; /* Tuần gần nhất */
    var khong1 = (tuan + 10) % 12;
    var khong2 = (tuan + 11) % 12;

    /* Triệt: dựa trên can tháng và giờ */
    var triet1 = (canNamIdx * 2) % 12;
    var triet2 = (triet1 + 1) % 12;

    return {
      khong1: DIA_CHI[khong1],
      khong2: DIA_CHI[khong2],
      triet1: DIA_CHI[triet1],
      triet2: DIA_CHI[triet2]
    };
  }

  /* ============================================================
     HÀM CHÍNH: Lập toàn bộ lá số
     ============================================================ */
  function lapLaSo(params) {
    /*
     * params: {
     *   hoTen, gioiTinh ('nam'|'nu'),
     *   ngay, thang, nam  (dương lịch),
     *   chiGio (tên địa chi giờ, hoặc ''),
     *   muiGio (số, mặc định 7)
     * }
     */
    var ngay      = parseInt(params.ngay, 10)  || 1;
    var thang     = parseInt(params.thang, 10) || 1;
    var nam       = parseInt(params.nam, 10)   || 1990;
    var gioiTinh  = params.gioiTinh || 'nam';

    /* Chỉ số giờ trong 12 Địa Chi */
    var chiGioIdx = 0;
    if (params.chiGio) {
      for (var k = 0; k < DIA_CHI.length; k++) {
        if (DIA_CHI[k] === params.chiGio) { chiGioIdx = k; break; }
      }
    }

    /* 1. Can Chi năm */
    var ccNam = getCanChiNam(nam);

    /* 2. Can Chi tháng (dùng tháng âm ≈ tháng dương để đơn giản) */
    var thangAm = thang; /* Xấp xỉ */
    var ccThang = getCanChiThang(ccNam.canIdx, thangAm);

    /* 3. Can Chi ngày */
    var ccNgay = getCanChiNgay(ngay, thang, nam);

    /* 4. Can Chi giờ */
    var ccGio = getCanGio(chiGioIdx, ccNgay.canIdx);
    if (!params.chiGio) {
      ccGio = { can: '?', chi: 'Không rõ', canIdx: 0, chiIdx: 0 };
    }

    /* 5. Mệnh Cục */
    var menhCuc = getMenhCuc(ngay, thangAm, nam, chiGioIdx);

    /* 6. An cung Mệnh */
    var cungAn   = anMenhCung(thangAm, chiGioIdx);
    var tenCungs = anTenCung(cungAn.menhCungIdx);

    /* 7. An Tử Vi tinh */
    var tuViIdx     = anTuViTinh(menhCuc.cucSo, ngay);
    var chinhTinhMap = anChinhTinh(tuViIdx);

    /* 8. An phụ tinh */
    var phuTinhMap = anPhuTinh(ccNam.canIdx, ccNam.chiIdx, chiGioIdx, cungAn.menhCungIdx);

    /* 9. Tứ Hóa */
    var tuHoaMap = tinhTuHoa(ccNam.canIdx, chinhTinhMap);

    /* 10. Tuần Triệt */
    var tuanTriet = tinhTuanTriet(ccNam.canIdx, ccNam.chiIdx);

    /* 11. Ghép sao vào từng cung */
    var cacCung = [];
    for (var i = 0; i < 12; i++) {
      var cungInfo = tenCungs[i] || { ten: '?', diaChiIdx: i, diaChi: DIA_CHI[i] };
      var saoList  = [];

      /* Chính tinh */
      var ct = SAO_TU_VI.CHINH_TINH;
      for (var ci = 0; ci < ct.length; ci++) {
        if (chinhTinhMap[ct[ci].ten] === i) {
          saoList.push({ ten: ct[ci].ten, loai: 'chinh-tinh', hanh: ct[ci].hanh });
        }
      }

      /* Phụ tinh */
      var ptKeys = Object.keys(phuTinhMap);
      for (var pi = 0; pi < ptKeys.length; pi++) {
        if (phuTinhMap[ptKeys[pi]] === i) {
          var pt = SAO_TU_VI.PHU_TINH;
          for (var pj = 0; pj < pt.length; pj++) {
            if (pt[pj].ten === ptKeys[pi]) {
              saoList.push({ ten: pt[pj].ten, loai: 'phu-tinh', hanh: pt[pj].hanh });
              break;
            }
          }
        }
      }

      /* Tứ Hóa */
      if (tuHoaMap[i]) {
        var hoas = tuHoaMap[i];
        for (var hi = 0; hi < hoas.length; hi++) {
          saoList.push({ ten: hoas[hi], loai: 'tu-hoa', hanh: 'Thổ' });
        }
      }

      cacCung.push({
        idx:          i,
        ten:          cungInfo.ten,
        diaChi:       DIA_CHI[i],
        laMenhCung:   (i === cungAn.menhCungIdx),
        laThanCung:   (i === cungAn.thanCungIdx),
        sao:          saoList,
        tuanKhong:    (DIA_CHI[i] === tuanTriet.khong1 || DIA_CHI[i] === tuanTriet.khong2)
      });
    }

    /* 12. Đại Vận */
    var daiVanList   = tinhDaiVan(menhCuc.cucSo, gioiTinh, ccNam.canIdx, ccNam.chiIdx, nam);

    /* Xác định đại vận hiện tại */
    var namHienTai = new Date().getFullYear();
    var dvHienTai  = daiVanList[0];
    for (var dv = 0; dv < daiVanList.length; dv++) {
      if (namHienTai >= daiVanList[dv].namBatDau && namHienTai <= daiVanList[dv].namKetThuc) {
        dvHienTai = daiVanList[dv];
        break;
      }
    }

    /* 13. Tiểu Vận */
    var tieuVanList = dvHienTai ? tinhTieuVan(dvHienTai, nam, gioiTinh, ccNam.canIdx) : [];

    /* 14. Chủ Mệnh + Thân Chủ */
    var chuMenh  = SAO_TU_VI.CHU_MENH[ccNam.chi]  || '?';
    var thanChu  = SAO_TU_VI.THAN_CHU[ccNam.chi]  || '?';

    /* 15. Kết quả tổng */
    return {
      /* Thông tin cơ bản */
      hoTen:       params.hoTen || '',
      gioiTinh:    gioiTinh,
      ngaySinh:    ngay + '/' + thang + '/' + nam,

      /* Tứ Trụ */
      tuTru: {
        nam:   { can: ccNam.can,   chi: ccNam.chi,   hanh: NGU_HANH[ccNam.canIdx]   },
        thang: { can: ccThang.can, chi: ccThang.chi, hanh: NGU_HANH[ccThang.canIdx] },
        ngay:  { can: ccNgay.can,  chi: ccNgay.chi,  hanh: NGU_HANH[ccNgay.canIdx]  },
        gio:   { can: ccGio.can,   chi: ccGio.chi,   hanh: NGU_HANH[ccGio.canIdx]   }
      },

      /* Mệnh - Cục */
      menhHanh:  menhCuc.menhHanh,
      cucTen:    menhCuc.cucTen,
      cucSo:     menhCuc.cucSo,
      chuMenh:   chuMenh,
      thanChu:   thanChu,

      /* Cung */
      menhCungIdx: cungAn.menhCungIdx,
      thanCungIdx: cungAn.thanCungIdx,
      cacCung:     cacCung,

      /* Đại Vận */
      daiVanList:  daiVanList,
      dvHienTai:   dvHienTai,
      tieuVanList: tieuVanList,

      /* Tuần Triệt */
      tuanTriet: tuanTriet
    };
  }

  /* ---- Public API ---- */
  return {
    lapLaSo:        lapLaSo,
    getCanChiNam:   getCanChiNam,
    getCanChiNgay:  getCanChiNgay,
    tinhDaiVan:     tinhDaiVan
  };

})();
