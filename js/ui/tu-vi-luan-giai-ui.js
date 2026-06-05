// ══════════════════════════════════════════════════════
// TU-VI-LUAN-GIAI-UI.JS — Logic + Render Luận Giải Tử Vi
// Hoàn toàn cục bộ, KHÔNG cần AI
// Lịch Việt Nam 888
// ══════════════════════════════════════════════════════

var _lgTabActive = 0;

// ─── HÀM CHÍNH: LUẬN GIẢI TỔNG QUÁT ─────────────────

function luanGiaiTuVi(laSo) {
  if (!laSo || !laSo.cacCung) return null;

  // Đổi tên trường cacCung → cung để helper functions hoạt động
  var ls = _normalizeLaSo(laSo);

  var result = {
    menhCach:  luanMenhCach(ls),
    tinhCach:  luanTinhCach(ls),
    suNghiep:  luanCungChiTiet(ls, 'Quan Lộc'),
    taiLoc:    luanCungChiTiet(ls, 'Tài Bạch'),
    tinhDuyen: luanCungChiTiet(ls, 'Phu Thê'),
    sucKhoe:   luanCungChiTiet(ls, 'Tật Ách'),
    conCai:    luanCungChiTiet(ls, 'Tử Tức'),
    phucDuc:   luanCungChiTiet(ls, 'Phúc Đức'),
    thienDi:   luanCungChiTiet(ls, 'Thiên Di'),
    dienTrach: luanCungChiTiet(ls, 'Điền Trạch'),
    phuMau:    luanCungChiTiet(ls, 'Phụ Mẫu'),
    huyDe:     luanCungChiTiet(ls, 'Huynh Đệ'),
    noBoc:     luanCungChiTiet(ls, 'Nô Bộc'),
    menhCung:  luanCungChiTiet(ls, 'Mệnh'),
    tongDiem:  0,
    ketLuan:   ''
  };

  result.tongDiem = tinhDiemLaSo(ls);
  result.ketLuan  = ketLuanTongQuat(result.tongDiem);

  return result;
}

// ─── NORMALIZE: đưa cacCung → cung để helpers dùng được ──

function _normalizeLaSo(laSo) {
  if (!laSo) return laSo;
  // Nếu đã có .cung thì dùng, nếu không thì map cacCung → cung
  // Helpers trong tu-vi-luan-giai.js dùng ls.cung[i].sao là array of string
  // Nhưng engine trả ls.cacCung[i].sao = array of {ten, loai, hanh}
  // → cần chuẩn hóa
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

// ─── LUẬN MỆNH CÁCH ──────────────────────────────────

function luanMenhCach(laSo) {
  var cachFound = [];
  if (typeof CACH_CUC !== 'undefined') {
    var i;
    for (i = 0; i < CACH_CUC.thuongCach.length; i++) {
      try {
        if (CACH_CUC.thuongCach[i].dieuKien(laSo)) {
          cachFound.push({ ten: CACH_CUC.thuongCach[i].ten, hang: 'Thượng Cách', moTa: CACH_CUC.thuongCach[i].moTa, danhGia: CACH_CUC.thuongCach[i].danhGia, diem: 90 });
        }
      } catch(e) {}
    }
    for (i = 0; i < CACH_CUC.trungCach.length; i++) {
      try {
        if (CACH_CUC.trungCach[i].dieuKien(laSo)) {
          cachFound.push({ ten: CACH_CUC.trungCach[i].ten, hang: 'Trung Cách', moTa: CACH_CUC.trungCach[i].moTa, danhGia: CACH_CUC.trungCach[i].danhGia, diem: 60 });
        }
      } catch(e) {}
    }
    for (i = 0; i < CACH_CUC.haCach.length; i++) {
      try {
        if (CACH_CUC.haCach[i].dieuKien(laSo)) {
          cachFound.push({ ten: CACH_CUC.haCach[i].ten, hang: 'Hạ Cách', moTa: CACH_CUC.haCach[i].moTa, danhGia: CACH_CUC.haCach[i].danhGia, diem: 30 });
        }
      } catch(e) {}
    }
  }

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
      cachFound.push({ ten: 'Mệnh Vô Chính Diệu', hang: 'Hạ Cách', moTa: 'Cung Mệnh không có chính tinh tọa thủ.', danhGia: 'Cần nỗ lực nhiều hơn người thường', diem: 30 });
    }
  }
  return cachFound;
}

// ─── LUẬN TÍNH CÁCH ──────────────────────────────────

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

  if (lines.length === 0) lines.push('Cung Mệnh vô chính diệu — tính cách phụ thuộc vào sao phụ và cung đối chiếu.');
  return lines;
}

// ─── LUẬN CHI TIẾT TỪNG CUNG ──────────────────────────

function luanCungChiTiet(laSo, tenCung) {
  var saoArr = laySaoCung(laSo, tenCung);
  var result = { tenCung: tenCung, chinhTinh: [], phuTinh: [], satTinh: [], hoaTinh: [], nhanDinh: [], diemCung: 50 };

  if (!saoArr || saoArr.length === 0) {
    result.nhanDinh.push('Cung ' + tenCung + ' không có sao — xem cung đối chiếu.');
    result.diemCung = 40;
    return result;
  }

  var diemCung = 50;

  for (var i = 0; i < saoArr.length; i++) {
    var ten = saoArr[i];
    var CT = ['Tử Vi','Thiên Cơ','Thái Dương','Vũ Khúc','Thiên Đồng','Liêm Trinh','Thiên Phủ','Thái Âm','Tham Lang','Cự Môn','Thiên Tướng','Thiên Lương','Thất Sát','Phá Quân'];
    var SAT = ['Kình Dương','Đà La','Hỏa Tinh','Linh Tinh','Địa Không','Địa Kiếp'];
    var PHU = ['Tả Phụ','Hữu Bật','Văn Xương','Văn Khúc','Lộc Tồn','Thiên Mã','Thiên Khôi','Thiên Việt'];
    var HOA = ['Hóa Lộc','Hóa Quyền','Hóa Khoa','Hóa Kỵ'];

    var isChinhTinh = false;
    for (var c = 0; c < CT.length; c++) { if (ten === CT[c]) { isChinhTinh = true; break; } }
    var isSat = false;
    for (var s = 0; s < SAT.length; s++) { if (ten === SAT[s]) { isSat = true; break; } }
    var isPhu = false;
    for (var p = 0; p < PHU.length; p++) { if (ten === PHU[p]) { isPhu = true; break; } }
    var isHoa = false;
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

  diemCung = Math.min(100, Math.max(10, diemCung));
  result.diemCung = diemCung;

  // Nhận định tổng hợp
  if (result.chinhTinh.length === 0) {
    result.nhanDinh.push('Cung không có chính tinh tọa thủ. Xem cung đối chiếu để bổ sung.');
  }
  if (result.satTinh.length >= 2) {
    result.nhanDinh.push('Nhiều sát tinh trong cung, cần thận trọng.');
  }
  if (result.hoaTinh.length > 0) {
    for (var hi = 0; hi < result.hoaTinh.length; hi++) {
      if (result.hoaTinh[hi].ten === 'Hóa Lộc') result.nhanDinh.push('Có Hóa Lộc — tài lộc, may mắn cho cung này.');
      if (result.hoaTinh[hi].ten === 'Hóa Quyền') result.nhanDinh.push('Có Hóa Quyền — quyền lực, uy tín.');
      if (result.hoaTinh[hi].ten === 'Hóa Kỵ') result.nhanDinh.push('Có Hóa Kỵ — có trở ngại trong lĩnh vực này.');
    }
  }

  return result;
}

// ─── TÍNH ĐIỂM LÁ SỐ ─────────────────────────────────

function tinhDiemLaSo(laSo) {
  var tong = 50;
  var cachList = luanMenhCach(laSo);
  if (cachList.length > 0) {
    var maxDiem = 0;
    for (var i = 0; i < cachList.length; i++) {
      if (cachList[i].diem > maxDiem) maxDiem = cachList[i].diem;
    }
    tong = maxDiem;
  }
  // Cộng điểm chính tinh cung Mệnh
  var menhSao = laySaoCung(laSo, 'Mệnh');
  var CT = ['Tử Vi','Thiên Cơ','Thái Dương','Vũ Khúc','Thiên Đồng','Liêm Trinh','Thiên Phủ','Thái Âm','Tham Lang','Cự Môn','Thiên Tướng','Thiên Lương','Thất Sát','Phá Quân'];
  for (var j = 0; j < menhSao.length; j++) {
    for (var k = 0; k < CT.length; k++) {
      if (menhSao[j] === CT[k]) {
        var mv = _saoMieuVuongLS(laSo, CT[k]);
        tong += (mv - 3) * 3;
        break;
      }
    }
  }
  return Math.min(100, Math.max(5, Math.round(tong)));
}

function ketLuanTongQuat(diem) {
  if (diem >= 85) return 'Lá số xuất sắc — tiềm năng phú quý, thành đạt lớn trong cuộc đời.';
  if (diem >= 70) return 'Lá số khá tốt — nhiều cơ hội thành công, cuộc sống sung túc.';
  if (diem >= 55) return 'Lá số trung bình khá — có thuận lợi nhưng cần nỗ lực.';
  if (diem >= 40) return 'Lá số trung bình — cần vượt qua nhiều thử thách để thành công.';
  return 'Lá số nhiều thử thách — kiên trì và học hỏi là chìa khóa vượt qua.';
}

// ─── RENDER LUẬN GIẢI TOÀN BỘ ────────────────────────

function renderLuanGiaiTuVi(laSo) {
  console.log('[LuanGiai] renderLuanGiaiTuVi called');

  var ls = _normalizeLaSo(laSo);
  var lg = luanGiaiTuVi(laSo);
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
  // Kết luận
  html += '<div>';
  // Mệnh Cách
  if (lg.menhCach && lg.menhCach.length > 0) {
    html += '<div style="margin-bottom:6px">';
    for (var ci = 0; ci < lg.menhCach.length; ci++) {
      var cach = lg.menhCach[ci];
      var cachMau = cach.hang === 'Thượng Cách' ? '#c9a000' : cach.hang === 'Trung Cách' ? '#2c7a3f' : '#c0392b';
      html += '<span style="display:inline-block;background:' + cachMau + ';color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:3px;margin-right:4px;margin-bottom:4px">' + cach.hang + ': ' + cach.ten + '</span>';
    }
    html += '</div>';
    html += '<div style="font-size:12px;color:#555;line-height:1.6">' + lg.menhCach[0].moTa + '</div>';
  }
  html += '<div style="font-size:13px;color:#333;margin-top:8px;font-style:italic">' + lg.ketLuan + '</div>';
  html += '</div></div>';

  // Mệnh cơ bản
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin-top:8px">';
  html += _infoBox('Mệnh', ls.menhHanh || '?');
  html += _infoBox('Cục', ls.cucTen || '?');
  html += _infoBox('Chủ Mệnh', ls.chuMenh || '?');
  html += _infoBox('Thân Chủ', ls.thanChu || '?');
  html += '</div>';

  html += '</div>';

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

  html += '<div class="card">';
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
    html += renderCungPanel(linh_vuc[lj].data);
    html += '</div>';
  }

  html += '</div>';

  return html;
}

// ─── RENDER 1 PANEL LĨNH VỰC ─────────────────────────

function renderCungPanel(cungData) {
  if (!cungData) return '<p style="color:#999">Không có dữ liệu.</p>';

  var diemMau = _diemMau(cungData.diemCung);
  var html = '';

  html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">';
  html += '<div style="width:48px;height:48px;border-radius:50%;border:3px solid ' + diemMau + ';';
  html += 'display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;color:' + diemMau + ';flex-shrink:0">';
  html += cungData.diemCung;
  html += '</div>';
  html += '<div style="font-size:13px;color:#666">Điểm cung <strong style="color:' + diemMau + '">' + cungData.diemCung + '/100</strong></div>';
  html += '</div>';

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

  // Nhận định
  if (cungData.nhanDinh && cungData.nhanDinh.length > 0) {
    html += '<div style="background:#f8f5e8;border-radius:6px;padding:10px 14px;margin-top:8px">';
    html += '<div style="font-size:11px;font-weight:700;color:#8B6000;margin-bottom:6px">📌 Nhận Định</div>';
    for (var ni = 0; ni < cungData.nhanDinh.length; ni++) {
      html += '<div style="font-size:12px;color:#555;line-height:1.7">• ' + cungData.nhanDinh[ni] + '</div>';
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

// Expose saoMieuVuong cho các module khác nếu cần
function saoMieuVuong(laSo, tenSao) {
  return _saoMieuVuongLS(laSo, tenSao);
}
