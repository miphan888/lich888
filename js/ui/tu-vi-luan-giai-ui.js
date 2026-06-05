// ══════════════════════════════════════════════════════
// TU-VI-LUAN-GIAI-UI.JS — Logic + Render Luận Giải Tử Vi
// PHIÊN BẢN NÂNG CẤP CHUYÊN GIA v2.0
// Hoàn toàn cục bộ, KHÔNG cần AI
// Lịch Việt Nam 888
// ══════════════════════════════════════════════════════

var _lgTabActive = 0;

// ─── HÀM CHÍNH: LUẬN GIẢI TỔNG QUÁT ─────────────────

function luanGiaiTuVi(laSo) {
  if (!laSo || !laSo.cacCung) return null;

  var ls = _normalizeLaSo(laSo);

  var result = {
    menhCach:     luanMenhCach(ls),
    tinhCach:     luanTinhCach(ls),
    suNghiep:     luanCungChiTiet(ls, 'Quan Lộc'),
    taiLoc:       luanCungChiTiet(ls, 'Tài Bạch'),
    tinhDuyen:    luanCungChiTiet(ls, 'Phu Thê'),
    sucKhoe:      luanCungChiTiet(ls, 'Tật Ách'),
    conCai:       luanCungChiTiet(ls, 'Tử Tức'),
    phucDuc:      luanCungChiTiet(ls, 'Phúc Đức'),
    thienDi:      luanCungChiTiet(ls, 'Thiên Di'),
    dienTrach:    luanCungChiTiet(ls, 'Điền Trạch'),
    phuMau:       luanCungChiTiet(ls, 'Phụ Mẫu'),
    huyDe:        luanCungChiTiet(ls, 'Huynh Đệ'),
    noBoc:        luanCungChiTiet(ls, 'Nô Bộc'),
    menhCung:     luanCungChiTiet(ls, 'Mệnh'),
    luuYDacBiet:  luanLuuYDacBiet(ls),
    loiKhuyen:    luanLoiKhuyen(ls),
    diemRadar:    tinhDiemRadar(ls),
    tongDiem:     0,
    ketLuan:      ''
  };

  result.tongDiem = tinhDiemLaSo(ls);
  result.ketLuan  = ketLuanTongQuat(result.tongDiem);

  return result;
}

// ─── NORMALIZE ──────────────────────────────────────

function _normalizeLaSo(laSo) {
  if (!laSo) return laSo;
  var cung = laSo.cung || laSo.cacCung || [];
  var normalCung = [];
  for (var i = 0; i < cung.length; i++) {
    var c = cung[i];
    var saoRaw = c.sao || [];
    var saoArr = [];
    for (var j = 0; j < saoRaw.length; j++) {
      var s = saoRaw[j];
      saoArr.push(typeof s === 'string' ? s : (s.ten || ''));
    }
    normalCung.push({
      ten: c.ten,
      diaChi: c.diaChi,
      sao: saoArr,
      laMenhCung: c.laMenhCung,
      laThanCung: c.laThanCung,
      tuanKhong: c.tuanKhong,
      idx: i
    });
  }
  var ls = {};
  for (var k in laSo) { if (laSo.hasOwnProperty(k)) ls[k] = laSo[k]; }
  ls.cung = normalCung;
  return ls;
}

// ─── LUẬN MỆNH CÁCH (NÂNG CẤP) ───────────────────────

function luanMenhCach(laSo) {
  var cachFound = [];
  if (typeof CACH_CUC !== 'undefined') {
    var i;
    for (i = 0; i < CACH_CUC.thuongCach.length; i++) {
      try {
        if (CACH_CUC.thuongCach[i].dieuKien(laSo)) {
          cachFound.push({
            ten: CACH_CUC.thuongCach[i].ten,
            hang: 'Thượng Cách',
            moTa: CACH_CUC.thuongCach[i].moTa,
            danhGia: CACH_CUC.thuongCach[i].danhGia,
            diem: 90
          });
        }
      } catch(e) {}
    }
    for (i = 0; i < CACH_CUC.trungCach.length; i++) {
      try {
        if (CACH_CUC.trungCach[i].dieuKien(laSo)) {
          cachFound.push({
            ten: CACH_CUC.trungCach[i].ten,
            hang: 'Trung Cách',
            moTa: CACH_CUC.trungCach[i].moTa,
            danhGia: CACH_CUC.trungCach[i].danhGia,
            diem: 60
          });
        }
      } catch(e) {}
    }
    for (i = 0; i < CACH_CUC.haCach.length; i++) {
      try {
        if (CACH_CUC.haCach[i].dieuKien(laSo)) {
          cachFound.push({
            ten: CACH_CUC.haCach[i].ten,
            hang: 'Hạ Cách',
            moTa: CACH_CUC.haCach[i].moTa,
            danhGia: CACH_CUC.haCach[i].danhGia,
            diem: 30
          });
        }
      } catch(e) {}
    }
  }

  // Sắp xếp theo thứ tự quan trọng: Thượng > Trung > Hạ
  cachFound.sort(function(a, b) { return b.diem - a.diem; });

  if (cachFound.length === 0) {
    var menhSao = laySaoCung(laSo, 'Mệnh');
    var chinhTinh = timChinhTinh(menhSao);
    if (chinhTinh.length > 0) {
      var tenCT = chinhTinh.join(' + ');
      var mv = 0;
      for (var ci = 0; ci < chinhTinh.length; ci++) mv += _saoMieuVuongLS(laSo, chinhTinh[ci]);
      mv = Math.round(mv / chinhTinh.length);
      var mvTen = (typeof MIEU_VUONG_TEN !== 'undefined') ? (MIEU_VUONG_TEN[mv] || 'Bình') : 'Bình';
      cachFound.push({
        ten: tenCT + ' tọa Mệnh (' + mvTen + ')',
        hang: mv >= 4 ? 'Trung Khá' : mv >= 3 ? 'Trung Bình' : 'Dưới Trung Bình',
        moTa: tenCT + ' tọa thủ cung Mệnh ở mức ' + mvTen + '.',
        danhGia: mv >= 4 ? 'Chính tinh sáng, cơ bản tốt' : mv >= 3 ? 'Chính tinh trung bình' : 'Chính tinh tối, cần cẩn thận',
        diem: mv * 15
      });
    } else {
      cachFound.push({
        ten: 'Mệnh Vô Chính Diệu',
        hang: 'Hạ Cách',
        moTa: 'Cung Mệnh không có chính tinh tọa thủ. Phụ thuộc hoàn toàn vào cung đối và tam hợp.',
        danhGia: 'Cần nỗ lực nhiều hơn người thường, dựa vào quý nhân',
        diem: 30
      });
    }
  }
  return cachFound;
}

// ─── LUẬN TỔ HỢP SAO TRONG CUNG ─────────────────────

function luanToHopSao(saoArr) {
  var result = [];
  if (typeof TO_HOP_SAO === 'undefined') return result;

  // Tìm tổ hợp 2 sao
  for (var t = 0; t < TO_HOP_SAO.length; t++) {
    var tohop = TO_HOP_SAO[t];
    var count = 0;
    for (var s = 0; s < tohop.sao.length; s++) {
      for (var k = 0; k < saoArr.length; k++) {
        if (saoArr[k] === tohop.sao[s]) { count++; break; }
      }
    }
    if (count === tohop.sao.length) {
      result.push({ ten: tohop.ten, moTa: tohop.moTa, tot: tohop.tot });
    }
  }

  // Tìm tương tác sao đôi
  if (typeof SAO_TUONG_TAC !== 'undefined') {
    for (var i = 0; i < saoArr.length; i++) {
      for (var j = i + 1; j < saoArr.length; j++) {
        var key1 = saoArr[i] + '+' + saoArr[j];
        var key2 = saoArr[j] + '+' + saoArr[i];
        var tuongTac = SAO_TUONG_TAC[key1] || SAO_TUONG_TAC[key2];
        if (tuongTac) {
          // Kiểm tra chưa có trong result
          var daCoChinhTinh = false;
          for (var r = 0; r < result.length; r++) {
            if (result[r].moTa === tuongTac) { daCoChinhTinh = true; break; }
          }
          if (!daCoChinhTinh) {
            result.push({ ten: saoArr[i] + ' + ' + saoArr[j], moTa: tuongTac, tot: null });
          }
        }
      }
    }
  }

  return result;
}

// ─── LUẬN CUNG ĐỐI CHIẾU ────────────────────────────

function luanCungDoiChieu(laSo, tenCung) {
  if (!laSo || !laSo.cung) return null;
  var ci = -1;
  for (var i = 0; i < laSo.cung.length; i++) {
    if (laSo.cung[i].ten === tenCung) { ci = i; break; }
  }
  if (ci < 0) return null;
  var doiIdx = (ci + 6) % 12;
  var doiCung = laSo.cung[doiIdx];
  if (!doiCung) return null;

  var saoArr = doiCung.sao || [];
  var saoNames = [];
  for (var j = 0; j < saoArr.length; j++) {
    saoNames.push(typeof saoArr[j] === 'string' ? saoArr[j] : (saoArr[j].ten || ''));
  }

  var ct = timChinhTinh(saoNames);
  var nhanDinh = [];

  if (ct.length === 0) {
    nhanDinh.push('Cung đối chiếu (' + doiCung.ten + ') không có chính tinh.');
  } else {
    for (var k = 0; k < ct.length; k++) {
      var mv = _saoMieuVuongLS(laSo, ct[k]);
      var mvTen = (typeof MIEU_VUONG_TEN !== 'undefined') ? (MIEU_VUONG_TEN[mv] || 'Bình') : 'Bình';
      var ctData = (typeof CHINH_TINH_DATA !== 'undefined') ? CHINH_TINH_DATA[ct[k]] : null;
      var luanTxt = '';
      if (ctData && ctData.cung && ctData.cung[tenCung]) {
        luanTxt = ctData.cung[tenCung];
      }
      nhanDinh.push(ct[k] + ' (' + mvTen + ') từ ' + doiCung.ten + ' chiếu về: ' + (luanTxt || ctData ? ctData.dacTinh : ''));
    }
  }

  // Xét sát tinh đối chiếu
  var sat = timSatTinh(saoNames);
  if (sat.length > 0) {
    nhanDinh.push('Cung đối có sát tinh: ' + sat.join(', ') + ' — cần đề phòng ảnh hưởng xấu từ hướng đối.');
  }

  // Xét cát tinh đối chiếu
  var phu = timPhuTinh(saoNames);
  if (phu.length > 0) {
    nhanDinh.push('Cung đối có quý tinh: ' + phu.join(', ') + ' — được hỗ trợ từ hướng đối.');
  }

  return { tenCung: doiCung.ten, sao: saoNames, nhanDinh: nhanDinh };
}

// ─── LUẬN TAM HỢP ────────────────────────────────────

function luanTamHop(laSo, tenCung) {
  if (!laSo || !laSo.cung) return null;
  var ci = -1;
  for (var i = 0; i < laSo.cung.length; i++) {
    if (laSo.cung[i].ten === tenCung) { ci = i; break; }
  }
  if (ci < 0) return null;

  var th1Idx = (ci + 4) % 12;
  var th2Idx = (ci + 8) % 12;
  var th1 = laSo.cung[th1Idx];
  var th2 = laSo.cung[th2Idx];

  var result = [];

  function phanTichTamHopCung(cungObj) {
    if (!cungObj) return;
    var saoArr = cungObj.sao || [];
    var saoNames = [];
    for (var j = 0; j < saoArr.length; j++) {
      saoNames.push(typeof saoArr[j] === 'string' ? saoArr[j] : (saoArr[j].ten || ''));
    }
    var ct = timChinhTinh(saoNames);
    var phu = timPhuTinh(saoNames);
    var sat = timSatTinh(saoNames);
    var nhanDinh = [];

    for (var k = 0; k < ct.length; k++) {
      var mv = _saoMieuVuongLS(laSo, ct[k]);
      var mvTen = (typeof MIEU_VUONG_TEN !== 'undefined') ? (MIEU_VUONG_TEN[mv] || 'Bình') : 'Bình';
      var ctData = (typeof CHINH_TINH_DATA !== 'undefined') ? CHINH_TINH_DATA[ct[k]] : null;
      var luanTxt = '';
      if (ctData && ctData.cung && ctData.cung[tenCung]) luanTxt = ctData.cung[tenCung];
      else if (ctData) luanTxt = ctData.dacTinh;
      nhanDinh.push(ct[k] + ' (' + mvTen + ') hội chiếu: ' + luanTxt);
    }
    if (phu.length > 0) nhanDinh.push('Cát tinh: ' + phu.join(', ') + ' trợ lực từ tam hợp.');
    if (sat.length > 0) nhanDinh.push('Sát tinh: ' + sat.join(', ') + ' từ tam hợp, cần đề phòng.');

    result.push({ tenCung: cungObj.ten, sao: saoNames, nhanDinh: nhanDinh });
  }

  phanTichTamHopCung(th1);
  phanTichTamHopCung(th2);

  return result;
}

// ─── LUẬN TÍNH CÁCH ───────────────────────────────────

function luanTinhCach(laSo) {
  var menhSao = laySaoCung(laSo, 'Mệnh');
  var chinhTinh = timChinhTinh(menhSao);
  var lines = [];

  for (var i = 0; i < chinhTinh.length; i++) {
    var ct = chinhTinh[i];
    var data = (typeof CHINH_TINH_DATA !== 'undefined') ? CHINH_TINH_DATA[ct] : null;
    if (data) {
      var mv = _saoMieuVuongLS(laSo, ct);
      var mvTen = (typeof MIEU_VUONG_TEN !== 'undefined') ? (MIEU_VUONG_TEN[mv] || 'Bình') : 'Bình';
      lines.push(ct + ' (' + mvTen + '): ' + data.dacTinh);
    }
    // Luận giới tính
    if (typeof LUAN_GIOI_TINH !== 'undefined' && LUAN_GIOI_TINH[ct]) {
      var gioiTinh = laSo.gioiTinh || laSo.phai || '';
      var isNam = (gioiTinh === 'Nam' || gioiTinh === 'nam' || gioiTinh === 'M');
      var isNu = (gioiTinh === 'Nữ' || gioiTinh === 'nu' || gioiTinh === 'nu' || gioiTinh === 'F');
      if (isNam) lines.push('→ [Nam] ' + LUAN_GIOI_TINH[ct].nam);
      else if (isNu) lines.push('→ [Nữ] ' + LUAN_GIOI_TINH[ct].nu);
      else lines.push('→ [Nam] ' + LUAN_GIOI_TINH[ct].nam + ' / [Nữ] ' + LUAN_GIOI_TINH[ct].nu);
    }
  }

  var satTinh = timSatTinh(menhSao);
  for (var j = 0; j < satTinh.length; j++) {
    var stData = (typeof SAT_TINH_DATA !== 'undefined') ? SAT_TINH_DATA[satTinh[j]] : null;
    if (stData && stData.hieuUng && stData.hieuUng['Mệnh']) lines.push(satTinh[j] + ': ' + stData.hieuUng['Mệnh']);
  }

  var phuTinh = timPhuTinh(menhSao);
  for (var k = 0; k < phuTinh.length; k++) {
    var ptData = (typeof PHU_TINH_DATA !== 'undefined') ? PHU_TINH_DATA[phuTinh[k]] : null;
    if (ptData && ptData.hieuUng && ptData.hieuUng['Mệnh']) lines.push(phuTinh[k] + ': ' + ptData.hieuUng['Mệnh']);
  }

  var hoaTinh = timHoaTinh(menhSao);
  for (var h = 0; h < hoaTinh.length; h++) {
    var htData = (typeof TU_HOA_DATA !== 'undefined') ? TU_HOA_DATA[hoaTinh[h]] : null;
    if (htData && htData.hieuUng && htData.hieuUng['Mệnh']) lines.push(hoaTinh[h] + ': ' + htData.hieuUng['Mệnh']);
  }

  // Xét tổ hợp sao trong Mệnh
  var tohop = luanToHopSao(menhSao);
  for (var t = 0; t < tohop.length; t++) {
    lines.push('★ Tổ Hợp ' + tohop[t].ten + ': ' + tohop[t].moTa);
  }

  if (lines.length === 0) lines.push('Cung Mệnh vô chính diệu — tính cách phụ thuộc vào sao phụ và cung đối chiếu.');
  return lines;
}

// ─── LUẬN CHI TIẾT TỪNG CUNG (NÂNG CẤP) ─────────────

function luanCungChiTiet(laSo, tenCung) {
  var saoArr = laySaoCung(laSo, tenCung);
  var result = {
    tenCung: tenCung,
    chinhTinh: [],
    phuTinh: [],
    satTinh: [],
    hoaTinh: [],
    nhanDinh: [],
    toHopDacBiet: [],
    doiChieu: null,
    tamHop: null,
    luanGioiTinh: [],
    tuanTriet: '',
    diemCung: 50
  };

  // Kiểm tra Tuần Triệt
  if (laSo.cung) {
    for (var ci2 = 0; ci2 < laSo.cung.length; ci2++) {
      if (laSo.cung[ci2].ten === tenCung && laSo.cung[ci2].tuanKhong) {
        result.tuanTriet = 'Cung này bị Tuần Không — sao trong cung giảm lực đáng kể.';
        break;
      }
    }
  }

  if (!saoArr || saoArr.length === 0) {
    result.nhanDinh.push('Cung ' + tenCung + ' không có sao — xem cung đối chiếu.');
    result.diemCung = 40;
    result.doiChieu = luanCungDoiChieu(laSo, tenCung);
    result.tamHop = luanTamHop(laSo, tenCung);
    return result;
  }

  var diemCung = 50;

  var CT = ['Tử Vi','Thiên Cơ','Thái Dương','Vũ Khúc','Thiên Đồng','Liêm Trinh','Thiên Phủ','Thái Âm','Tham Lang','Cự Môn','Thiên Tướng','Thiên Lương','Thất Sát','Phá Quân'];
  var SAT = ['Kình Dương','Đà La','Hỏa Tinh','Linh Tinh','Địa Không','Địa Kiếp'];
  var PHU = ['Tả Phụ','Hữu Bật','Văn Xương','Văn Khúc','Lộc Tồn','Thiên Mã','Thiên Khôi','Thiên Việt'];
  var HOA = ['Hóa Lộc','Hóa Quyền','Hóa Khoa','Hóa Kỵ'];

  for (var i = 0; i < saoArr.length; i++) {
    var ten = saoArr[i];
    var isChinhTinh = false, isSat = false, isPhu = false, isHoa = false;
    for (var c = 0; c < CT.length; c++) { if (ten === CT[c]) { isChinhTinh = true; break; } }
    for (var s = 0; s < SAT.length; s++) { if (ten === SAT[s]) { isSat = true; break; } }
    for (var p = 0; p < PHU.length; p++) { if (ten === PHU[p]) { isPhu = true; break; } }
    for (var h = 0; h < HOA.length; h++) { if (ten === HOA[h]) { isHoa = true; break; } }

    if (isChinhTinh) {
      var ctData = (typeof CHINH_TINH_DATA !== 'undefined') ? CHINH_TINH_DATA[ten] : null;
      var mv = _saoMieuVuongLS(laSo, ten);
      var mvTen = (typeof MIEU_VUONG_TEN !== 'undefined') ? (MIEU_VUONG_TEN[mv] || 'Bình') : 'Bình';
      var luanGiai = '';
      if (ctData && ctData.cung && ctData.cung[tenCung]) luanGiai = ctData.cung[tenCung];
      else if (ctData) luanGiai = ctData.dacTinh;
      result.chinhTinh.push({ ten: ten, mv: mv, mvTen: mvTen, luanGiai: luanGiai });
      diemCung += (mv - 3) * 8;

      // Luận giới tính cho chính tinh đặc biệt
      if (typeof LUAN_GIOI_TINH !== 'undefined' && LUAN_GIOI_TINH[ten]) {
        var gioiTinh = laSo.gioiTinh || laSo.phai || '';
        var isNam = (gioiTinh === 'Nam' || gioiTinh === 'nam' || gioiTinh === 'M');
        var isNu = (gioiTinh === 'Nữ' || gioiTinh === 'nu' || gioiTinh === 'F');
        if (isNam) result.luanGioiTinh.push({ sao: ten, luan: '[Nam] ' + LUAN_GIOI_TINH[ten].nam });
        else if (isNu) result.luanGioiTinh.push({ sao: ten, luan: '[Nữ] ' + LUAN_GIOI_TINH[ten].nu });
        else result.luanGioiTinh.push({ sao: ten, luan: '[Nam] ' + LUAN_GIOI_TINH[ten].nam });
      }

    } else if (isSat) {
      var stData = (typeof SAT_TINH_DATA !== 'undefined') ? SAT_TINH_DATA[ten] : null;
      var stLG = '';
      if (stData && stData.hieuUng && stData.hieuUng[tenCung]) stLG = stData.hieuUng[tenCung];
      else if (stData && stData.hieuUng && stData.hieuUng['chung']) stLG = stData.hieuUng['chung'];
      result.satTinh.push({ ten: ten, luanGiai: stLG });
      diemCung -= 10;
    } else if (isPhu) {
      var ptData = (typeof PHU_TINH_DATA !== 'undefined') ? PHU_TINH_DATA[ten] : null;
      var ptLG = '';
      if (ptData && ptData.hieuUng && ptData.hieuUng[tenCung]) ptLG = ptData.hieuUng[tenCung];
      else if (ptData && ptData.hieuUng && ptData.hieuUng['chung']) ptLG = ptData.hieuUng['chung'];
      result.phuTinh.push({ ten: ten, luanGiai: ptLG });
      diemCung += 5;
    } else if (isHoa) {
      var hoaData = (typeof TU_HOA_DATA !== 'undefined') ? TU_HOA_DATA[ten] : null;
      var hoaLG = '';
      if (hoaData && hoaData.hieuUng && hoaData.hieuUng[tenCung]) hoaLG = hoaData.hieuUng[tenCung];
      else if (hoaData && hoaData.hieuUng && hoaData.hieuUng['chung']) hoaLG = hoaData.hieuUng['chung'];
      result.hoaTinh.push({ ten: ten, luanGiai: hoaLG });
      if (ten === 'Hóa Lộc') diemCung += 15;
      else if (ten === 'Hóa Quyền') diemCung += 10;
      else if (ten === 'Hóa Khoa') diemCung += 8;
      else if (ten === 'Hóa Kỵ') diemCung -= 12;
    }
  }

  // Xét tổ hợp sao đặc biệt
  result.toHopDacBiet = luanToHopSao(saoArr);
  for (var t = 0; t < result.toHopDacBiet.length; t++) {
    if (result.toHopDacBiet[t].tot === true) diemCung += 8;
    else if (result.toHopDacBiet[t].tot === false) diemCung -= 6;
  }

  // Tuần Triệt giảm điểm
  if (result.tuanTriet) diemCung = Math.round(diemCung * 0.75);

  diemCung = Math.min(100, Math.max(10, diemCung));
  result.diemCung = diemCung;

  // Nhận định tổng hợp
  if (result.chinhTinh.length === 0) {
    result.nhanDinh.push('Cung không có chính tinh tọa thủ. Xem cung đối chiếu và tam hợp để bổ sung.');
  }
  if (result.satTinh.length >= 2) {
    result.nhanDinh.push('Nhiều sát tinh trong cung (' + result.satTinh.map(function(s){return s.ten;}).join(', ') + '), cần hết sức thận trọng.');
  }
  if (result.hoaTinh.length > 0) {
    for (var hi = 0; hi < result.hoaTinh.length; hi++) {
      if (result.hoaTinh[hi].ten === 'Hóa Lộc') result.nhanDinh.push('Có Hóa Lộc — tài lộc, may mắn đặc biệt cho lĩnh vực này.');
      if (result.hoaTinh[hi].ten === 'Hóa Quyền') result.nhanDinh.push('Có Hóa Quyền — quyền lực, uy tín trong lĩnh vực này.');
      if (result.hoaTinh[hi].ten === 'Hóa Khoa') result.nhanDinh.push('Có Hóa Khoa — danh tiếng, được công nhận trong lĩnh vực này.');
      if (result.hoaTinh[hi].ten === 'Hóa Kỵ') result.nhanDinh.push('Có Hóa Kỵ — trở ngại, cần kiên nhẫn vượt qua trong lĩnh vực này.');
    }
  }

  // Phân tích cung đối chiếu và tam hợp
  result.doiChieu = luanCungDoiChieu(laSo, tenCung);
  result.tamHop = luanTamHop(laSo, tenCung);

  return result;
}

// ─── LUẬN LƯU Ý ĐẶC BIỆT ────────────────────────────

function luanLuuYDacBiet(laSo) {
  var luuY = [];

  // 1. Cách cục nổi bật
  var cachList = luanMenhCach(laSo);
  for (var i = 0; i < cachList.length; i++) {
    if (cachList[i].hang === 'Thượng Cách') {
      luuY.push({ loai: 'cat', icon: '🌟', noi: 'CÁCH CỤC: ' + cachList[i].ten, mo: cachList[i].moTa });
    } else if (cachList[i].hang === 'Hạ Cách') {
      luuY.push({ loai: 'hung', icon: '⚠️', noi: 'CẢNH BÁO: ' + cachList[i].ten, mo: cachList[i].moTa });
    }
  }

  // 2. Song lộc tam phương Mệnh
  if (typeof tamPhuongCo !== 'undefined') {
    if (tamPhuongCo(laSo, 'Mệnh', ['Lộc Tồn']) && tamPhuongCo(laSo, 'Mệnh', ['Hóa Lộc'])) {
      luuY.push({ loai: 'cat', icon: '💰', noi: 'SONG LỘC TRIỀU VIÊN', mo: 'Lộc Tồn và Hóa Lộc cùng chiếu Mệnh — đại phú hiếm có.' });
    }
  }

  // 3. Tử Vi hoặc Thiên Phủ Miếu tọa Mệnh
  var menhSao = laySaoCung(laSo, 'Mệnh');
  var chinhTinh = timChinhTinh(menhSao);
  for (var j = 0; j < chinhTinh.length; j++) {
    var mv = _saoMieuVuongLS(laSo, chinhTinh[j]);
    if (mv === 5) {
      luuY.push({ loai: 'cat', icon: '✨', noi: chinhTinh[j].toUpperCase() + ' MIẾU TỌA MỆNH', mo: chinhTinh[j] + ' ở mức Miếu Địa là mức sáng nhất — phát huy đầy đủ đặc tính quý.' });
    } else if (mv <= 1) {
      luuY.push({ loai: 'hung', icon: '🔴', noi: chinhTinh[j].toUpperCase() + ' HÃM TỌA MỆNH', mo: chinhTinh[j] + ' ở Hãm Địa — tính xấu phát lộ, cần kiểm soát.' });
    }
  }

  // 4. Sát tinh cung Mệnh
  var satMenh = timSatTinh(menhSao);
  if (satMenh.length >= 2) {
    luuY.push({ loai: 'hung', icon: '⚡', noi: 'NHIỀU SÁT TINH TỌA MỆNH: ' + satMenh.join(', '), mo: 'Nhiều sát tinh ở Mệnh — cuộc đời nhiều sóng gió, cần cẩn thận từng bước.' });
  }

  // 5. Tổ hợp đặc biệt ở Mệnh
  var toHopMenh = luanToHopSao(menhSao);
  for (var t = 0; t < toHopMenh.length; t++) {
    if (toHopMenh[t].tot === false) {
      luuY.push({ loai: 'hung', icon: '⚠️', noi: 'TỔ HỢP: ' + toHopMenh[t].ten, mo: toHopMenh[t].moTa });
    } else {
      luuY.push({ loai: 'cat', icon: '🎯', noi: 'TỔ HỢP: ' + toHopMenh[t].ten, mo: toHopMenh[t].moTa });
    }
  }

  // 6. Không Kiếp cung Mệnh
  var coKhong = false, coKiep = false;
  for (var k = 0; k < menhSao.length; k++) {
    if (menhSao[k] === 'Địa Không') coKhong = true;
    if (menhSao[k] === 'Địa Kiếp') coKiep = true;
  }
  if (coKhong && coKiep) {
    luuY.push({ loai: 'hung', icon: '💸', noi: 'KHÔNG KIẾP ĐỒNG CUNG MỆNH', mo: 'Địa Không và Địa Kiếp cùng tọa Mệnh — hao tán cực nặng, kiếp nạn liên tiếp.' });
  }

  return luuY;
}

// ─── LUẬN LỜI KHUYÊN ─────────────────────────────────

function luanLoiKhuyen(laSo) {
  var loiKhuyen = [];
  var menhSao = laySaoCung(laSo, 'Mệnh');
  var chinhTinh = timChinhTinh(menhSao);
  var cachList = luanMenhCach(laSo);

  // Hướng nghề nghiệp
  var quanSao = laySaoCung(laSo, 'Quan Lộc');
  var quanCT = timChinhTinh(quanSao);
  if (quanCT.length > 0) {
    var nghe = [];
    for (var i = 0; i < quanCT.length; i++) {
      var qData = (typeof CHINH_TINH_DATA !== 'undefined') ? CHINH_TINH_DATA[quanCT[i]] : null;
      if (qData) {
        if (quanCT[i] === 'Tử Vi' || quanCT[i] === 'Thiên Phủ') nghe.push('lãnh đạo, quản lý, chính trị');
        else if (quanCT[i] === 'Vũ Khúc') nghe.push('tài chính, ngân hàng, kinh doanh');
        else if (quanCT[i] === 'Thái Dương') nghe.push('công chức, truyền thông, công tác xã hội');
        else if (quanCT[i] === 'Thiên Cơ') nghe.push('kỹ thuật, IT, tư vấn, tham mưu');
        else if (quanCT[i] === 'Tham Lang') nghe.push('kinh doanh giải trí, ngoại giao, nghệ thuật');
        else if (quanCT[i] === 'Thiên Lương') nghe.push('y tế, giáo dục, từ thiện');
        else if (quanCT[i] === 'Cự Môn') nghe.push('luật sư, MC, truyền thông');
        else if (quanCT[i] === 'Thất Sát' || quanCT[i] === 'Phá Quân') nghe.push('quân sự, kinh doanh mạo hiểm, startup');
      }
    }
    if (nghe.length > 0) loiKhuyen.push({ chu: '💼 Hướng Nghề Nghiệp', mo: 'Dựa vào sao cung Quan Lộc, hướng phù hợp: ' + nghe.join(', ') + '.' });
  }

  // Tình duyên hôn nhân
  var phuSao = laySaoCung(laSo, 'Phu Thê');
  var phuSat = timSatTinh(phuSao);
  var phuCT = timChinhTinh(phuSao);
  if (phuSat.length >= 2) {
    loiKhuyen.push({ chu: '❤️ Hôn Nhân', mo: 'Cung Phu Thê nhiều sát tinh (' + phuSat.join(', ') + '). Cần cẩn thận chọn lựa kỹ càng, tránh vội vàng. Nên kết hôn sau 30 tuổi.' });
  } else if (phuCT.length > 0) {
    loiKhuyen.push({ chu: '❤️ Hôn Nhân', mo: 'Cung Phu Thê có ' + phuCT.join(', ') + ' — điều kiện hôn nhân tương đối thuận lợi.' });
  }

  // Sức khỏe
  var tatSao = laySaoCung(laSo, 'Tật Ách');
  var tatSat = timSatTinh(tatSao);
  var tatCT = timChinhTinh(tatSao);
  if (tatSat.length > 0) {
    loiKhuyen.push({ chu: '🏥 Sức Khỏe', mo: 'Cung Tật Ách có sát tinh (' + tatSat.join(', ') + '). Cần chú ý sức khỏe, tránh các môn thể thao mạo hiểm, khám định kỳ.' });
  }
  for (var tc = 0; tc < tatCT.length; tc++) {
    var tatData = (typeof CHINH_TINH_DATA !== 'undefined') ? CHINH_TINH_DATA[tatCT[tc]] : null;
    if (tatData && tatData.cung && tatData.cung['Tật Ách']) {
      loiKhuyen.push({ chu: '🏥 ' + tatCT[tc] + ' tại Tật Ách', mo: tatData.cung['Tật Ách'] });
    }
  }

  // Tài chính
  var taiSao = laySaoCung(laSo, 'Tài Bạch');
  var taiHoa = timHoaTinh(taiSao);
  var taiCT = timChinhTinh(taiSao);
  for (var th = 0; th < taiHoa.length; th++) {
    if (taiHoa[th] === 'Hóa Lộc') loiKhuyen.push({ chu: '💰 Tài Chính', mo: 'Cung Tài Bạch có Hóa Lộc — đây là năm tài lộc, nên đầu tư và mở rộng kinh doanh.' });
    if (taiHoa[th] === 'Hóa Kỵ') loiKhuyen.push({ chu: '💰 Tài Chính', mo: 'Cung Tài Bạch có Hóa Kỵ — cẩn thận trong đầu tư, tránh vay nợ lớn, không bảo lãnh cho người khác.' });
  }

  // Phong thủy
  var menhHanh = laSo.menhHanh || '';
  if (menhHanh) {
    var mauPhuHop = '';
    var huongTot = '';
    if (menhHanh.indexOf('Thủy') >= 0) { mauPhuHop = 'đen, xanh đậm'; huongTot = 'Bắc'; }
    else if (menhHanh.indexOf('Mộc') >= 0) { mauPhuHop = 'xanh lá, nâu'; huongTot = 'Đông'; }
    else if (menhHanh.indexOf('Hỏa') >= 0) { mauPhuHop = 'đỏ, cam'; huongTot = 'Nam'; }
    else if (menhHanh.indexOf('Thổ') >= 0) { mauPhuHop = 'vàng, nâu đất'; huongTot = 'Trung tâm'; }
    else if (menhHanh.indexOf('Kim') >= 0) { mauPhuHop = 'trắng, bạc'; huongTot = 'Tây'; }
    if (mauPhuHop) {
      loiKhuyen.push({ chu: '🏠 Phong Thủy', mo: 'Mạng ' + menhHanh + ': màu phù hợp là ' + mauPhuHop + ', hướng nhà tốt là hướng ' + huongTot + '.' });
    }
  }

  return loiKhuyen;
}

// ─── TÍNH ĐIỂM RADAR 6 LĨNH VỰC ─────────────────────

function tinhDiemRadar(laSo) {
  function diemCung(tenCung) {
    var d = luanCungChiTiet(laSo, tenCung);
    return d ? d.diemCung : 50;
  }
  return {
    suNghiep: diemCung('Quan Lộc'),
    taiLoc:   diemCung('Tài Bạch'),
    tinhDuyen: diemCung('Phu Thê'),
    sucKhoe:  diemCung('Tật Ách'),
    phucDuc:  diemCung('Phúc Đức'),
    conCai:   diemCung('Tử Tức')
  };
}

// ─── TÍNH ĐIỂM LÁ SỐ (NÂNG CẤP) ──────────────────────

function tinhDiemLaSo(laSo) {
  // Điểm mệnh cách (30%)
  var diemMenhCach = 50;
  var cachList = luanMenhCach(laSo);
  if (cachList.length > 0) {
    var maxDiem = 0;
    for (var i = 0; i < cachList.length; i++) {
      if (cachList[i].diem > maxDiem) maxDiem = cachList[i].diem;
    }
    diemMenhCach = maxDiem;
  }

  // Điểm chính tinh Mệnh (20%)
  var diemChinhTinh = 50;
  var menhSao = laySaoCung(laSo, 'Mệnh');
  var CT = ['Tử Vi','Thiên Cơ','Thái Dương','Vũ Khúc','Thiên Đồng','Liêm Trinh','Thiên Phủ','Thái Âm','Tham Lang','Cự Môn','Thiên Tướng','Thiên Lương','Thất Sát','Phá Quân'];
  var ctCount = 0;
  for (var j = 0; j < menhSao.length; j++) {
    for (var k = 0; k < CT.length; k++) {
      if (menhSao[j] === CT[k]) {
        var mv = _saoMieuVuongLS(laSo, CT[k]);
        diemChinhTinh += (mv - 3) * 10;
        ctCount++;
        break;
      }
    }
  }

  // Điểm tam phương Mệnh (15%)
  var diemTamPhuong = 50;
  var diemDoi = luanCungChiTiet(laSo, 'Mệnh').diemCung;
  if (typeof tamPhuongCo !== 'undefined') {
    var catTinh = ['Tả Phụ','Hữu Bật','Văn Xương','Văn Khúc','Hóa Lộc','Hóa Quyền','Hóa Khoa'];
    var satTinh2 = ['Kình Dương','Đà La','Hỏa Tinh','Linh Tinh','Địa Không','Địa Kiếp','Hóa Kỵ'];
    for (var ca = 0; ca < catTinh.length; ca++) {
      if (tamPhuongCo(laSo, 'Mệnh', [catTinh[ca]])) diemTamPhuong += 5;
    }
    for (var sa = 0; sa < satTinh2.length; sa++) {
      if (tamPhuongCo(laSo, 'Mệnh', [satTinh2[sa]])) diemTamPhuong -= 5;
    }
  }

  // Điểm cát tinh (15%)
  var diemCatTinh = 50;
  var catTinhMenh = timPhuTinh(menhSao);
  diemCatTinh += catTinhMenh.length * 5;
  var hoaMenh = timHoaTinh(menhSao);
  for (var hm = 0; hm < hoaMenh.length; hm++) {
    if (hoaMenh[hm] === 'Hóa Lộc') diemCatTinh += 15;
    else if (hoaMenh[hm] === 'Hóa Quyền') diemCatTinh += 10;
    else if (hoaMenh[hm] === 'Hóa Khoa') diemCatTinh += 8;
    else if (hoaMenh[hm] === 'Hóa Kỵ') diemCatTinh -= 12;
  }

  // Điểm sát tinh (10%) — trừ
  var diemSatTinh = 50;
  var satMenh = timSatTinh(menhSao);
  diemSatTinh -= satMenh.length * 10;

  // Điểm Tài Quan (10%)
  var diemTaiQuan = 50;
  var quanData = luanCungChiTiet(laSo, 'Quan Lộc');
  var taiData = luanCungChiTiet(laSo, 'Tài Bạch');
  if (quanData) diemTaiQuan += (quanData.diemCung - 50) * 0.3;
  if (taiData) diemTaiQuan += (taiData.diemCung - 50) * 0.3;

  // Tổng hợp có trọng số
  var tong = diemMenhCach * 0.30
           + diemChinhTinh * 0.20
           + diemTamPhuong * 0.15
           + diemCatTinh * 0.15
           + diemSatTinh * 0.10
           + diemTaiQuan * 0.10;

  return Math.min(100, Math.max(5, Math.round(tong)));
}

function ketLuanTongQuat(diem) {
  if (diem >= 85) return 'Lá số xuất sắc — tiềm năng phú quý, thành đạt lớn trong cuộc đời.';
  if (diem >= 70) return 'Lá số khá tốt — nhiều cơ hội thành công, cuộc sống sung túc.';
  if (diem >= 55) return 'Lá số trung bình khá — có thuận lợi nhưng cần nỗ lực.';
  if (diem >= 40) return 'Lá số trung bình — cần vượt qua nhiều thử thách để thành công.';
  return 'Lá số nhiều thử thách — kiên trì và học hỏi là chìa khóa vượt qua.';
}

// ─── RENDER RADAR CHART (CSS/HTML) ───────────────────

function renderRadarChart(radar) {
  var labels = [
    { key: 'suNghiep', label: 'Sự Nghiệp' },
    { key: 'taiLoc', label: 'Tài Lộc' },
    { key: 'tinhDuyen', label: 'Tình Duyên' },
    { key: 'sucKhoe', label: 'Sức Khỏe' },
    { key: 'phucDuc', label: 'Phúc Đức' },
    { key: 'conCai', label: 'Con Cái' }
  ];

  var html = '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0">';
  for (var i = 0; i < labels.length; i++) {
    var val = radar[labels[i].key] || 50;
    var mau = _diemMau(val);
    var pct = val + '%';
    html += '<div style="text-align:center">';
    html += '<div style="font-size:10px;color:#888;margin-bottom:4px">' + labels[i].label + '</div>';
    html += '<div style="height:6px;background:#f0e8d0;border-radius:3px;overflow:hidden">';
    html += '<div style="height:100%;width:' + pct + ';background:' + mau + ';border-radius:3px;transition:width 0.5s"></div>';
    html += '</div>';
    html += '<div style="font-size:11px;font-weight:700;color:' + mau + ';margin-top:2px">' + val + '</div>';
    html += '</div>';
  }
  html += '</div>';
  return html;
}

// ─── RENDER LUẬN GIẢI TOÀN BỘ (NÂNG CẤP) ────────────

function renderLuanGiaiTuVi(laSo) {
  console.log('[LuanGiai] renderLuanGiaiTuVi called');

  var ls = _normalizeLaSo(laSo);
  var lg = luanGiaiTuVi(ls);
  if (!lg) return '<p style="color:red">Không thể phân tích lá số.</p>';

  var diemMau = _diemMau(lg.tongDiem);

  var html = '';

  // ── Card tổng quan ──
  html += '<div class="card" style="margin-bottom:16px">';
  html += '<div class="card-title">📊 Tổng Quan Lá Số</div>';
  html += '<div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;margin-bottom:16px">';
  // Vòng tròn điểm
  html += '<div style="width:80px;height:80px;border-radius:50%;border:4px solid ' + diemMau + ';';
  html += 'display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0">';
  html += '<div style="font-size:22px;font-weight:700;color:' + diemMau + '">' + lg.tongDiem + '</div>';
  html += '<div style="font-size:10px;color:#888">/100</div>';
  html += '</div>';
  // Kết luận + cách cục
  html += '<div style="flex:1">';
  if (lg.menhCach && lg.menhCach.length > 0) {
    html += '<div style="margin-bottom:6px">';
    for (var ci = 0; ci < lg.menhCach.length; ci++) {
      var cach = lg.menhCach[ci];
      var cachMau = cach.hang === 'Thượng Cách' ? '#c9a000' : (cach.hang === 'Trung Cách' || cach.hang === 'Trung Khá') ? '#2c7a3f' : '#c0392b';
      html += '<span style="display:inline-block;background:' + cachMau + ';color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:3px;margin-right:4px;margin-bottom:4px">';
      html += cach.hang + ': ' + cach.ten + '</span>';
    }
    html += '</div>';
    html += '<div style="font-size:12px;color:#555;line-height:1.6">' + lg.menhCach[0].moTa + '</div>';
  }
  html += '<div style="font-size:13px;color:#333;margin-top:8px;font-style:italic">' + lg.ketLuan + '</div>';
  html += '</div></div>';

  // Mệnh cơ bản
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin-bottom:12px">';
  html += _infoBox('Mệnh', ls.menhHanh || '?');
  html += _infoBox('Cục', ls.cucTen || '?');
  html += _infoBox('Chủ Mệnh', ls.chuMenh || '?');
  html += _infoBox('Thân Chủ', ls.thanChu || '?');
  html += '</div>';

  // Biểu đồ radar 6 lĩnh vực
  html += '<div style="margin-top:8px">';
  html += '<div style="font-size:11px;font-weight:700;color:#888;margin-bottom:4px">📈 CHỈ SỐ 6 LĨNH VỰC</div>';
  html += renderRadarChart(lg.diemRadar);
  html += '</div>';

  html += '</div>';

  // ── Card lưu ý đặc biệt ──
  if (lg.luuYDacBiet && lg.luuYDacBiet.length > 0) {
    html += '<div class="card" style="margin-bottom:16px">';
    html += '<div class="card-title">🔔 Lưu Ý Đặc Biệt</div>';
    for (var ly = 0; ly < lg.luuYDacBiet.length; ly++) {
      var item = lg.luuYDacBiet[ly];
      var lyMau = item.loai === 'cat' ? '#2c7a3f' : '#c0392b';
      var lyBg = item.loai === 'cat' ? '#f0fff4' : '#fff5f5';
      html += '<div style="background:' + lyBg + ';border-left:3px solid ' + lyMau + ';padding:8px 12px;margin-bottom:8px;border-radius:0 4px 4px 0">';
      html += '<div style="font-weight:700;color:' + lyMau + ';font-size:12px;margin-bottom:2px">' + item.icon + ' ' + item.noi + '</div>';
      html += '<div style="font-size:12px;color:#555;line-height:1.6">' + item.mo + '</div>';
      html += '</div>';
    }
    html += '</div>';
  }

  // ── Card tính cách ──
  html += '<div class="card" style="margin-bottom:16px">';
  html += '<div class="card-title">🧠 Tính Cách & Bản Năng</div>';
  if (lg.tinhCach && lg.tinhCach.length > 0) {
    for (var ti = 0; ti < lg.tinhCach.length; ti++) {
      html += '<div style="padding:8px 0;border-bottom:1px solid #f0e8d0;font-size:13px;color:#444;line-height:1.7">' + lg.tinhCach[ti] + '</div>';
    }
  }
  html += '</div>';

  // ── Tabs 11 lĩnh vực ──
  var linh_vuc = [
    { key: 'suNghiep',  label: '💼 Sự Nghiệp',  data: lg.suNghiep  },
    { key: 'taiLoc',    label: '💰 Tài Lộc',     data: lg.taiLoc    },
    { key: 'tinhDuyen', label: '❤️ Tình Duyên',   data: lg.tinhDuyen },
    { key: 'sucKhoe',   label: '🏥 Sức Khỏe',    data: lg.sucKhoe   },
    { key: 'conCai',    label: '👶 Con Cái',      data: lg.conCai    },
    { key: 'phucDuc',   label: '🙏 Phúc Đức',    data: lg.phucDuc   },
    { key: 'thienDi',   label: '✈️ Thiên Di',     data: lg.thienDi   },
    { key: 'dienTrach', label: '🏠 Điền Trạch',  data: lg.dienTrach  },
    { key: 'phuMau',    label: '👨‍👩‍👧 Phụ Mẫu',    data: lg.phuMau    },
    { key: 'huyDe',     label: '👫 Huynh Đệ',    data: lg.huyDe     },
    { key: 'noBoc',     label: '🤝 Nô Bộc',      data: lg.noBoc     }
  ];

  html += '<div class="card" style="margin-bottom:16px">';
  html += '<div class="card-title">📋 Luận Giải 11 Lĩnh Vực</div>';

  // Tab buttons
  html += '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px" id="lg-tab-btns">';
  for (var li = 0; li < linh_vuc.length; li++) {
    html += '<button onclick="lgChuyenTab(' + li + ')" id="lg-btn-' + li + '" style="';
    html += 'font-size:11px;padding:4px 10px;border-radius:4px;border:1px solid ';
    html += (li === 0 ? '#c9a000;background:#FFF8E7;color:#8B6000;font-weight:700' : '#ddd;background:#fff;color:#555');
    html += '">' + linh_vuc[li].label + '</button>';
  }
  html += '</div>';

  // Tab panels
  for (var lj = 0; lj < linh_vuc.length; lj++) {
    html += '<div id="lg-panel-' + lj + '" style="display:' + (lj === 0 ? 'block' : 'none') + '">';
    html += renderCungPanel(linh_vuc[lj].data, ls);
    html += '</div>';
  }

  html += '</div>';

  // ── Card lời khuyên ──
  if (lg.loiKhuyen && lg.loiKhuyen.length > 0) {
    html += '<div class="card" style="margin-bottom:16px">';
    html += '<div class="card-title">💡 Lời Khuyên Tổng Thể</div>';
    for (var lk = 0; lk < lg.loiKhuyen.length; lk++) {
      var khuyen = lg.loiKhuyen[lk];
      html += '<div style="background:#fffbf0;border-left:3px solid #c9a000;padding:8px 12px;margin-bottom:8px;border-radius:0 4px 4px 0">';
      html += '<div style="font-weight:700;color:#8B6000;font-size:12px;margin-bottom:2px">' + khuyen.chu + '</div>';
      html += '<div style="font-size:12px;color:#555;line-height:1.6">' + khuyen.mo + '</div>';
      html += '</div>';
    }
    html += '</div>';
  }

  return html;
}

// ─── RENDER 1 PANEL LĨNH VỰC (NÂNG CẤP) ─────────────

function renderCungPanel(cungData, laSo) {
  if (!cungData) return '<p style="color:#999">Không có dữ liệu.</p>';

  var diemMau = _diemMau(cungData.diemCung);
  var html = '';

  // Thanh điểm
  html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">';
  html += '<div style="width:48px;height:48px;border-radius:50%;border:3px solid ' + diemMau + ';';
  html += 'display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;color:' + diemMau + ';flex-shrink:0">';
  html += cungData.diemCung;
  html += '</div>';
  html += '<div style="flex:1">';
  html += '<div style="font-size:13px;color:#666">Điểm cung <strong style="color:' + diemMau + '">' + cungData.diemCung + '/100</strong></div>';
  html += '<div style="height:5px;background:#f0e8d0;border-radius:3px;margin-top:4px;overflow:hidden">';
  html += '<div style="height:100%;width:' + cungData.diemCung + '%;background:' + diemMau + ';border-radius:3px"></div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';

  // Cảnh báo Tuần Triệt
  if (cungData.tuanTriet) {
    html += '<div style="background:#fff9e0;border:1px solid #f0c040;border-radius:4px;padding:8px 12px;margin-bottom:10px;font-size:12px;color:#7a5c00">';
    html += '🔒 ' + cungData.tuanTriet;
    html += '</div>';
  }

  // Chính tinh
  if (cungData.chinhTinh && cungData.chinhTinh.length > 0) {
    html += '<div style="margin-bottom:12px">';
    html += '<div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:6px">★ Chính Tinh</div>';
    for (var ci = 0; ci < cungData.chinhTinh.length; ci++) {
      var ct = cungData.chinhTinh[ci];
      var mvColor = ct.mv >= 4 ? '#2c7a3f' : ct.mv >= 3 ? '#555' : '#c0392b';
      html += '<div style="background:#fff9f0;border-left:3px solid #c9a000;padding:8px 12px;margin-bottom:8px;border-radius:0 4px 4px 0">';
      html += '<div style="font-weight:700;color:#8B1A1A;margin-bottom:2px">' + ct.ten + ' <span style="font-size:11px;color:' + mvColor + ';font-weight:600">(' + ct.mvTen + ')</span></div>';
      if (ct.luanGiai) html += '<div style="font-size:12px;color:#555;line-height:1.6">' + ct.luanGiai + '</div>';
      html += '</div>';
    }
    html += '</div>';
  }

  // Phụ tinh
  if (cungData.phuTinh && cungData.phuTinh.length > 0) {
    html += '<div style="margin-bottom:12px">';
    html += '<div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:6px">☆ Phụ Tinh</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
    for (var pi = 0; pi < cungData.phuTinh.length; pi++) {
      var pt = cungData.phuTinh[pi];
      html += '<span title="' + (pt.luanGiai || '') + '" style="font-size:12px;padding:3px 8px;border-radius:3px;background:rgba(26,92,0,0.08);color:#1A5C00;cursor:help">' + pt.ten + '</span>';
    }
    html += '</div></div>';
  }

  // Sát tinh
  if (cungData.satTinh && cungData.satTinh.length > 0) {
    html += '<div style="margin-bottom:12px">';
    html += '<div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:6px">⚠ Sát Tinh</div>';
    for (var si = 0; si < cungData.satTinh.length; si++) {
      var st = cungData.satTinh[si];
      html += '<div style="background:#fff5f5;border-left:3px solid #c0392b;padding:8px 12px;margin-bottom:6px;border-radius:0 4px 4px 0">';
      html += '<div style="font-weight:700;color:#c0392b;margin-bottom:2px">' + st.ten + '</div>';
      if (st.luanGiai) html += '<div style="font-size:12px;color:#666;line-height:1.6">' + st.luanGiai + '</div>';
      html += '</div>';
    }
    html += '</div>';
  }

  // Tứ Hóa
  if (cungData.hoaTinh && cungData.hoaTinh.length > 0) {
    html += '<div style="margin-bottom:12px">';
    html += '<div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:6px">◈ Tứ Hóa</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
    for (var hi = 0; hi < cungData.hoaTinh.length; hi++) {
      var ht = cungData.hoaTinh[hi];
      var htMau = ht.ten === 'Hóa Kỵ' ? '#c0392b' : '#8B6000';
      html += '<span title="' + (ht.luanGiai || '') + '" style="font-size:12px;padding:3px 8px;border-radius:3px;background:rgba(139,96,0,0.1);color:' + htMau + ';cursor:help">' + ht.ten + '</span>';
    }
    html += '</div></div>';
  }

  // Tổ hợp đặc biệt
  if (cungData.toHopDacBiet && cungData.toHopDacBiet.length > 0) {
    html += '<div style="margin-bottom:12px">';
    html += '<div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:6px">⭐ Tổ Hợp Đặc Biệt</div>';
    for (var th = 0; th < cungData.toHopDacBiet.length; th++) {
      var tohop = cungData.toHopDacBiet[th];
      var thMau = tohop.tot === true ? '#2c7a3f' : tohop.tot === false ? '#c0392b' : '#555';
      var thBg = tohop.tot === true ? 'rgba(44,122,63,0.06)' : tohop.tot === false ? 'rgba(192,57,43,0.06)' : 'rgba(0,0,0,0.04)';
      html += '<div style="background:' + thBg + ';border-left:3px solid ' + thMau + ';padding:8px 12px;margin-bottom:6px;border-radius:0 4px 4px 0">';
      html += '<div style="font-weight:700;color:' + thMau + ';font-size:12px;margin-bottom:2px">★ ' + tohop.ten + '</div>';
      html += '<div style="font-size:12px;color:#555;line-height:1.6">' + tohop.moTa + '</div>';
      html += '</div>';
    }
    html += '</div>';
  }

  // Luận theo giới tính
  if (cungData.luanGioiTinh && cungData.luanGioiTinh.length > 0) {
    html += '<div style="margin-bottom:12px">';
    html += '<div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:6px">👤 Luận Theo Giới Tính</div>';
    for (var gt = 0; gt < cungData.luanGioiTinh.length; gt++) {
      var gtItem = cungData.luanGioiTinh[gt];
      html += '<div style="background:#f0f4ff;border-left:3px solid #3a6bb5;padding:8px 12px;margin-bottom:6px;border-radius:0 4px 4px 0">';
      html += '<div style="font-weight:700;color:#3a6bb5;font-size:12px;margin-bottom:2px">' + gtItem.sao + '</div>';
      html += '<div style="font-size:12px;color:#555;line-height:1.6">' + gtItem.luan + '</div>';
      html += '</div>';
    }
    html += '</div>';
  }

  // Nhận định tổng hợp
  if (cungData.nhanDinh && cungData.nhanDinh.length > 0) {
    html += '<div style="background:#f8f5e8;border-radius:6px;padding:10px 14px;margin-bottom:10px">';
    html += '<div style="font-size:11px;font-weight:700;color:#8B6000;margin-bottom:6px">📌 Nhận Định</div>';
    for (var ni = 0; ni < cungData.nhanDinh.length; ni++) {
      html += '<div style="font-size:12px;color:#555;line-height:1.7">• ' + cungData.nhanDinh[ni] + '</div>';
    }
    html += '</div>';
  }

  // Cung đối chiếu
  if (cungData.doiChieu && cungData.doiChieu.nhanDinh.length > 0) {
    html += '<div style="margin-bottom:10px">';
    html += '<div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:6px">↔ Cung Đối Chiếu (' + cungData.doiChieu.tenCung + ')</div>';
    html += '<div style="background:#f4f0ff;border-left:3px solid #7b5ea7;padding:8px 12px;border-radius:0 4px 4px 0">';
    for (var dc = 0; dc < cungData.doiChieu.nhanDinh.length; dc++) {
      html += '<div style="font-size:12px;color:#555;line-height:1.7;margin-bottom:3px">• ' + cungData.doiChieu.nhanDinh[dc] + '</div>';
    }
    html += '</div>';
    html += '</div>';
  }

  // Tam hợp
  if (cungData.tamHop && cungData.tamHop.length > 0) {
    html += '<div style="margin-bottom:10px">';
    html += '<div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;margin-bottom:6px">△ Tam Hợp Hội Chiếu</div>';
    for (var ta = 0; ta < cungData.tamHop.length; ta++) {
      var taCung = cungData.tamHop[ta];
      if (taCung.nhanDinh.length > 0) {
        html += '<div style="background:#f0fff9;border-left:3px solid #0a7a4b;padding:8px 12px;margin-bottom:6px;border-radius:0 4px 4px 0">';
        html += '<div style="font-size:11px;font-weight:700;color:#0a7a4b;margin-bottom:3px">' + taCung.tenCung + '</div>';
        for (var tan = 0; tan < taCung.nhanDinh.length; tan++) {
          html += '<div style="font-size:12px;color:#555;line-height:1.7;margin-bottom:2px">• ' + taCung.nhanDinh[tan] + '</div>';
        }
        html += '</div>';
      }
    }
    html += '</div>';
  }

  return html;
}

// ─── CHUYỂN TAB LUẬN GIẢI ────────────────────────────

function lgChuyenTab(idx) {
  _lgTabActive = idx;
  var count = 11;
  for (var i = 0; i < count; i++) {
    var panel = document.getElementById('lg-panel-' + i);
    var btn   = document.getElementById('lg-btn-' + i);
    if (panel) panel.style.display = (i === idx) ? 'block' : 'none';
    if (btn) {
      if (i === idx) {
        btn.style.borderColor = '#c9a000';
        btn.style.background = '#FFF8E7';
        btn.style.color = '#8B6000';
        btn.style.fontWeight = '700';
      } else {
        btn.style.borderColor = '#ddd';
        btn.style.background = '#fff';
        btn.style.color = '#555';
        btn.style.fontWeight = '400';
      }
    }
  }
}

// ─── HELPERS ─────────────────────────────────────────

function laySaoCung(laSo, tenCung) {
  var cungArr = laSo.cung || laSo.cacCung || [];
  for (var i = 0; i < cungArr.length; i++) {
    if (cungArr[i].ten === tenCung) {
      var sao = cungArr[i].sao || [];
      var result = [];
      for (var j = 0; j < sao.length; j++) {
        result.push(typeof sao[j] === 'string' ? sao[j] : (sao[j].ten || ''));
      }
      return result;
    }
  }
  return [];
}

function timChinhTinh(saoArr) {
  var CT = ['Tử Vi','Thiên Cơ','Thái Dương','Vũ Khúc','Thiên Đồng','Liêm Trinh','Thiên Phủ','Thái Âm','Tham Lang','Cự Môn','Thiên Tướng','Thiên Lương','Thất Sát','Phá Quân'];
  var result = [];
  for (var i = 0; i < saoArr.length; i++) {
    for (var j = 0; j < CT.length; j++) {
      if (saoArr[i] === CT[j]) { result.push(CT[j]); break; }
    }
  }
  return result;
}

function timPhuTinh(saoArr) {
  var PHU = ['Tả Phụ','Hữu Bật','Văn Xương','Văn Khúc','Lộc Tồn','Thiên Mã','Thiên Khôi','Thiên Việt'];
  var result = [];
  for (var i = 0; i < saoArr.length; i++) {
    for (var j = 0; j < PHU.length; j++) {
      if (saoArr[i] === PHU[j]) { result.push(PHU[j]); break; }
    }
  }
  return result;
}

function timSatTinh(saoArr) {
  var SAT = ['Kình Dương','Đà La','Hỏa Tinh','Linh Tinh','Địa Không','Địa Kiếp'];
  var result = [];
  for (var i = 0; i < saoArr.length; i++) {
    for (var j = 0; j < SAT.length; j++) {
      if (saoArr[i] === SAT[j]) { result.push(SAT[j]); break; }
    }
  }
  return result;
}

function timHoaTinh(saoArr) {
  var HOA = ['Hóa Lộc','Hóa Quyền','Hóa Khoa','Hóa Kỵ'];
  var result = [];
  for (var i = 0; i < saoArr.length; i++) {
    for (var j = 0; j < HOA.length; j++) {
      if (saoArr[i] === HOA[j]) { result.push(HOA[j]); break; }
    }
  }
  return result;
}

function _saoMieuVuongLS(laSo, tenSao) {
  if (typeof MIEU_VUONG === 'undefined' || !MIEU_VUONG[tenSao]) return 3;
  var CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
  var cungArr = laSo.cung || laSo.cacCung || [];
  for (var i = 0; i < cungArr.length; i++) {
    var sao = cungArr[i].sao || [];
    for (var j = 0; j < sao.length; j++) {
      var ten = typeof sao[j] === 'string' ? sao[j] : (sao[j].ten || '');
      if (ten === tenSao) {
        var dc = cungArr[i].diaChi;
        if (typeof dc === 'string') dc = CHI.indexOf(dc);
        if (dc < 0) dc = 0;
        return MIEU_VUONG[tenSao][dc] || 3;
      }
    }
  }
  return 3;
}

function _diemMau(diem) {
  if (diem >= 80) return '#2c7a3f';
  if (diem >= 60) return '#c9a000';
  if (diem >= 40) return '#e67e22';
  return '#c0392b';
}

function _infoBox(label, value) {
  return '<div style="background:#fff9f0;border:1px solid #e8d5a0;border-radius:6px;padding:10px;text-align:center">' +
    '<div style="font-size:10px;color:#888;font-weight:600;margin-bottom:4px">' + label + '</div>' +
    '<div style="font-size:14px;font-weight:700;color:#333">' + value + '</div>' +
    '</div>';
}

function saoMieuVuong(laSo, tenSao) {
  return _saoMieuVuongLS(laSo, tenSao);
}
