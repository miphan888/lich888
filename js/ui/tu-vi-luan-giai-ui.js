// ══════════════════════════════════════════════════════
// TU-VI-LUAN-GIAI-UI.JS — Logic + Render Luận Giải Tử Vi
// Hoàn toàn cục bộ, KHÔNG cần AI
// ══════════════════════════════════════════════════════

// ─── HÀM CHÍNH: LUẬN GIẢI TỔNG QUÁT ─────────────────

function luanGiaiTuVi(laSo) {
  if (!laSo || !laSo.cung) return null;

  var result = {
    menhCach: luanMenhCach(laSo),
    tinhCach: luanTinhCach(laSo),
    suNghiep: luanCungChiTiet(laSo, 'Quan Lộc'),
    taiLoc: luanCungChiTiet(laSo, 'Tài Bạch'),
    tinhDuyen: luanCungChiTiet(laSo, 'Phu Thê'),
    sucKhoe: luanCungChiTiet(laSo, 'Tật Ách'),
    conCai: luanCungChiTiet(laSo, 'Tử Tức'),
    phucDuc: luanCungChiTiet(laSo, 'Phúc Đức'),
    thienDi: luanCungChiTiet(laSo, 'Thiên Di'),
    dienTrach: luanCungChiTiet(laSo, 'Điền Trạch'),
    phuMau: luanCungChiTiet(laSo, 'Phụ Mẫu'),
    huyDe: luanCungChiTiet(laSo, 'Huynh Đệ'),
    noBoc: luanCungChiTiet(laSo, 'Nô Bộc'),
    menhCung: luanCungChiTiet(laSo, 'Mệnh'),
    tongDiem: 0,
    ketLuan: ''
  };

  // Tính điểm tổng
  result.tongDiem = tinhDiemLaSo(laSo);
  result.ketLuan = ketLuanTongQuat(result.tongDiem);

  return result;
}


// ─── LUẬN MỆNH CÁCH ─────────────────────────────────

function luanMenhCach(laSo) {
  var cachFound = [];

  // Kiểm tra thượng cách
  if (typeof CACH_CUC !== 'undefined') {
    var i, j;
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
    // Trung cách
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
    // Hạ cách
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

  // Nếu không tìm thấy cách nào → đánh giá dựa trên chính tinh cung Mệnh
  if (cachFound.length === 0) {
    var menhSao = laySaoCung(laSo, 'Mệnh');
    var chinhTinh = timChinhTinh(menhSao);

    if (chinhTinh.length > 0) {
      var tenCT = chinhTinh.join(' + ');
      var mv = 0;
      for (var ci = 0; ci < chinhTinh.length; ci++) {
        mv += saoMieuVuong(laSo, chinhTinh[ci]);
      }
      mv = Math.round(mv / chinhTinh.length);
      var mvTen = MIEU_VUONG_TEN[mv] || 'Bình';

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
        moTa: 'Cung Mệnh không có chính tinh tọa thủ. Cần xem cung đối chiếu và sao phụ để bổ sung.',
        danhGia: 'Cần nỗ lực nhiều hơn người thường',
        diem: 30
      });
    }
  }

  return cachFound;
}


// ─── LUẬN TÍNH CÁCH ─────────────────────────────────

function luanTinhCach(laSo) {
  var menhSao = laySaoCung(laSo, 'Mệnh');
  var chinhTinh = timChinhTinh(menhSao);
  var lines = [];

  for (var i = 0; i < chinhTinh.length; i++) {
    var ct = chinhTinh[i];
    var data = CHINH_TINH_DATA[ct];
    if (data) {
      var mv = saoMieuVuong(laSo, ct);
      var mvTen = MIEU_VUONG_TEN[mv] || 'Bình';
      lines.push(ct + ' (' + mvTen + '): ' + data.dacTinh);
    }
  }

  // Ảnh hưởng sát tinh
  var satTinh = timSatTinh(menhSao);
  for (var j = 0; j < satTinh.length; j++) {
    var st = satTinh[j];
    var stData = SAT_TINH_DATA[st];
    if (stData && stData.hieuUng && stData.hieuUng['Mệnh']) {
      lines.push(st + ': ' + stData.hieuUng['Mệnh']);
    }
  }

  // Ảnh hưởng phụ tinh
  var phuTinh = timPhuTinh(menhSao);
  for (var k = 0; k < phuTinh.length; k++) {
    var pt = phuTinh[k];
    var ptData = PHU_TINH_DATA[pt];
    if (ptData && ptData.hieuUng && ptData.hieuUng['Mệnh']) {
      lines.push(pt + ': ' + ptData.hieuUng['Mệnh']);
    }
  }

  // Tứ Hóa
  var hoaTinh = timHoaTinh(menhSao);
  for (var h = 0; h < hoaTinh.length; h++) {
    var ht = hoaTinh[h];
    var htData = TU_HOA_DATA[ht];
    if (htData && htData.hieuUng && htData.hieuUng['Mệnh']) {
      lines.push(ht + ': ' + htData.hieuUng['Mệnh']);
    }
  }

  if (lines.length === 0) {
    lines.push('Cung Mệnh vô chính diệu — tính cách phụ thuộc vào sao phụ và cung đối chiếu.');
  }

  return lines;
}


// ─── LUẬN CHI TIẾT TỪNG CUNG ─────────────────────────

function luanCungChiTiet(laSo, tenCung) {
  var saoArr = laySaoCung(laSo, tenCung);
  var result = {
    tenCung: tenCung,
    chinhTinh: [],
    phuTinh: [],
    satTinh: [],
    hoaTinh: [],
    nhanDinh: [],
    diemCung: 50
  };

  if (!saoArr || saoArr.length === 0) {
    result.nhanDinh.push('Cung ' + tenCung + ' không có sao — xem cung đối chiếu để bổ sung.');
    result.diemCung = 40;
    return result;
  }

  var diemCung = 50;

  // Phân tích chính tinh
  var ct = timChinhTinh(saoArr);
  for (var i = 0; i < ct.length; i++) {
    var tenSao = ct[i];
    var data = CHINH_TINH_DATA[tenSao];
    var mv = saoMieuVuong(laSo, tenSao);
    var mvTen = MIEU_VUONG_TEN[mv] || 'Bình';

    var luanGiai = '';
    if (data && data.cung && data.cung[tenCung]) {
      luanGiai = data.cung[tenCung];
    } else if (data) {
      luanGiai = data.dacTinh;
    }

    result.chinhTinh.push({
      ten: tenSao,
      mieuVuong: mvTen,
      mieuVuongDiem: mv,
      nguHanh: data ? data.nguHanh : '',
      luanGiai: luanGiai
    });

    diemCung += (mv - 3) * 8;
  }

  // Phân tích phụ tinh
  var pt = timPhuTinh(saoArr);
  for (var j = 0; j < pt.length; j++) {
    var ptTen = pt[j];
    var ptData = PHU_TINH_DATA[ptTen];
    var ptLuan = '';
    if (ptData && ptData.hieuUng) {
      ptLuan = ptData.hieuUng[tenCung] || ptData.hieuUng['chung'] || ptData.dacTinh;
    }
    result.phuTinh.push({ ten: ptTen, luanGiai: ptLuan });
    diemCung += 5;
  }

  // Phân tích sát tinh
  var st = timSatTinh(saoArr);
  for (var k = 0; k < st.length; k++) {
    var stTen = st[k];
    var stData = SAT_TINH_DATA[stTen];
    var stLuan = '';
    if (stData && stData.hieuUng) {
      stLuan = stData.hieuUng[tenCung] || stData.hieuUng['chung'] || stData.dacTinh;
    }
    result.satTinh.push({ ten: stTen, luanGiai: stLuan });
    diemCung -= 8;
  }

  // Phân tích tứ hóa
  var ht = timHoaTinh(saoArr);
  for (var h = 0; h < ht.length; h++) {
    var htTen = ht[h];
    var htData = TU_HOA_DATA[htTen];
    var htLuan = '';
    if (htData && htData.hieuUng) {
      htLuan = htData.hieuUng[tenCung] || htData.hieuUng['chung'] || htData.dacTinh;
    }
    result.hoaTinh.push({ ten: htTen, luanGiai: htLuan });
    if (htTen === 'Hóa Kỵ') diemCung -= 10;
    else diemCung += 8;
  }

  // Nhận định tổng hợp
  if (ct.length === 0) {
    result.nhanDinh.push('Cung ' + tenCung + ' vô chính diệu — phụ thuộc sao phụ và cung đối chiếu.');
  } else {
    for (var ni = 0; ni < ct.length; ni++) {
      var nMV = saoMieuVuong(laSo, ct[ni]);
      if (nMV >= 4) {
        result.nhanDinh.push(ct[ni] + ' ' + MIEU_VUONG_TEN[nMV] + ' tại ' + tenCung + ' — rất tốt cho lĩnh vực này.');
      } else if (nMV <= 1) {
        result.nhanDinh.push(ct[ni] + ' Hãm Địa tại ' + tenCung + ' — lĩnh vực này gặp nhiều trở ngại.');
      } else {
        result.nhanDinh.push(ct[ni] + ' ' + MIEU_VUONG_TEN[nMV] + ' tại ' + tenCung + ' — mức trung bình.');
      }
    }
  }

  if (st.length > 0) {
    result.nhanDinh.push('Có ' + st.length + ' sát tinh (' + st.join(', ') + ') — cần cẩn thận.');
  }
  if (ht.length > 0) {
    for (var hi = 0; hi < ht.length; hi++) {
      if (ht[hi] === 'Hóa Lộc') result.nhanDinh.push('Có Hóa Lộc — tài lộc may mắn.');
      if (ht[hi] === 'Hóa Quyền') result.nhanDinh.push('Có Hóa Quyền — nắm quyền lực.');
      if (ht[hi] === 'Hóa Khoa') result.nhanDinh.push('Có Hóa Khoa — nổi tiếng, uy tín.');
      if (ht[hi] === 'Hóa Kỵ') result.nhanDinh.push('Có Hóa Kỵ — trở ngại, thị phi.');
    }
  }

  result.diemCung = Math.max(10, Math.min(100, diemCung));
  return result;
}


// ─── TÍNH ĐIỂM LÁ SỐ ────────────────────────────────

function tinhDiemLaSo(laSo) {
  var diem = 50;

  // Điểm từ mệnh cách
  var mc = luanMenhCach(laSo);
  if (mc.length > 0) {
    var maxDiem = 0;
    for (var i = 0; i < mc.length; i++) {
      if (mc[i].diem > maxDiem) maxDiem = mc[i].diem;
    }
    diem = maxDiem;
  }

  // Điểm từ miếu vượng chính tinh cung Mệnh
  var menhSao = laySaoCung(laSo, 'Mệnh');
  var ctMenh = timChinhTinh(menhSao);
  for (var j = 0; j < ctMenh.length; j++) {
    var mv = saoMieuVuong(laSo, ctMenh[j]);
    diem += (mv - 3) * 5;
  }

  // Bonus từ cát tinh
  var catMenh = timPhuTinh(menhSao);
  diem += catMenh.length * 3;

  // Trừ từ sát tinh
  var satMenh = timSatTinh(menhSao);
  diem -= satMenh.length * 5;

  // Bonus Hóa Lộc/Quyền/Khoa
  var hoaMenh = timHoaTinh(menhSao);
  for (var h = 0; h < hoaMenh.length; h++) {
    if (hoaMenh[h] === 'Hóa Kỵ') diem -= 5;
    else diem += 5;
  }

  return Math.max(10, Math.min(100, diem));
}


// ─── KẾT LUẬN TỔNG QUÁT ─────────────────────────────

function ketLuanTongQuat(diem) {
  if (diem >= 85) return 'Lá số THƯỢNG ĐẲNG — Đời quý hiển, phú túc, nhiều may mắn. Cần phát huy ưu điểm và tích đức.';
  if (diem >= 70) return 'Lá số KHÁ TỐT — Đời khá thuận lợi, có cơhội phát triển. Cần nắm bắt thời cơ và tránh tự mãn.';
  if (diem >= 55) return 'Lá số TRUNG BÌNH — Đời có lên có xuống, cần cố gắng nhiều. Nắm vững dụng thần để cải thiện.';
  if (diem >= 40) return 'Lá số DƯỚI TRUNG BÌNH — Đời nhiều thử thách. Cần tu tâm tích đức, chọn đúng hướng đi.';
  return 'Lá số KHÓ KHĂN — Đời nhiều sóng gió. Nhưng Đức năng thắng Số — tu tâm, tích đức, nỗ lực sẽ cải thiện.';
}


// ─── HÀM LẤY SAO CUNG ───────────────────────────────

function laySaoCung(laSo, tenCung) {
  if (!laSo || !laSo.cung) return [];
  for (var i = 0; i < laSo.cung.length; i++) {
    if (laSo.cung[i].ten === tenCung) {
      return laSo.cung[i].sao || [];
    }
  }
  return [];
}


// ─── PHÂN LOẠI SAO ───────────────────────────────────

function timChinhTinh(saoArr) {
  var CT = ['Tử Vi','Thiên Cơ','Thái Dương','Vũ Khúc','Thiên Đồng','Liêm Trinh',
            'Thiên Phủ','Thái Âm','Tham Lang','Cự Môn','Thiên Tướng','Thiên Lương','Thất Sát','Phá Quân'];
  var found = [];
  for (var i = 0; i < saoArr.length; i++) {
    for (var j = 0; j < CT.length; j++) {
      if (saoArr[i] === CT[j]) { found.push(CT[j]); break; }
    }
  }
  return found;
}

function timPhuTinh(saoArr) {
  var PT = ['Tả Phụ','Hữu Bật','Văn Xương','Văn Khúc','Lộc Tồn','Thiên Mã'];
  var found = [];
  for (var i = 0; i < saoArr.length; i++) {
    for (var j = 0; j < PT.length; j++) {
      if (saoArr[i] === PT[j]) { found.push(PT[j]); break; }
    }
  }
  return found;
}

function timSatTinh(saoArr) {
  var ST = ['Kình Dương','Đà La','Hỏa Tinh','Linh Tinh','Địa Không','Địa Kiếp'];
  var found = [];
  for (var i = 0; i < saoArr.length; i++) {
    for (var j = 0; j < ST.length; j++) {
      if (saoArr[i] === ST[j]) { found.push(ST[j]); break; }
    }
  }
  return found;
}

function timHoaTinh(saoArr) {
  var HT = ['Hóa Lộc','Hóa Quyền','Hóa Khoa','Hóa Kỵ'];
  var found = [];
  for (var i = 0; i < saoArr.length; i++) {
    for (var j = 0; j < HT.length; j++) {
      if (saoArr[i] === HT[j]) { found.push(HT[j]); break; }
    }
  }
  return found;
}

// ══════════════════════════════════════════════════════
// RENDER LUẬN GIẢI RA HTML
// ══════════════════════════════════════════════════════

function renderLuanGiaiTuVi(laSo) {
  var lg = luanGiaiTuVi(laSo);
  if (!lg) return '<p>Không thể luận giải. Kiểm tra lá số.</p>';

  var html = '';

  // ─── TỔNG QUAN MỆNH CÁCH ──────────────────────────
  html += '<div class="card" style="margin-bottom:16px">';
  html += '<div class="card-title">🌟 Tổng Quan Mệnh Cách</div>';

  // Điểm số
  html += '<div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">';
  html += '<div style="width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:Noto Serif,serif;font-size:28px;font-weight:700;color:#fff;background:' + diemMau(lg.tongDiem) + ';box-shadow:0 4px 12px rgba(0,0,0,0.15)">';
  html += lg.tongDiem;
  html += '</div>';
  html += '<div style="flex:1">';
  html += '<div style="font-family:Noto Serif,serif;font-size:16px;font-weight:700;color:var(--red);margin-bottom:4px">' + lg.ketLuan.split('—')[0] + '</div>';
  html += '<p style="font-size:13px;color:var(--ink2);line-height:1.6">' + lg.ketLuan + '</p>';
  html += '</div>';
  html += '</div>';

  // Cách cục
  if (lg.menhCach && lg.menhCach.length > 0) {
    for (var ci = 0; ci < lg.menhCach.length; ci++) {
      var mc = lg.menhCach[ci];
      var cachMau = mc.hang === 'Thượng Cách' ? '#1A5C00' : mc.hang === 'Hạ Cách' ? '#B80000' : 'var(--gold)';
      html += '<div style="background:' + (mc.hang === 'Thượng Cách' ? '#f0f8e8' : mc.hang === 'Hạ Cách' ? '#fce8e8' : '#fff8e7') + ';border:1px solid ' + (mc.hang === 'Thượng Cách' ? '#c0e0a0' : mc.hang === 'Hạ Cách' ? '#f0c0c0' : 'var(--cream3)') + ';border-radius:8px;padding:14px;margin-bottom:10px">';
      html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">';
      html += '<span style="background:' + cachMau + ';color:#fff;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700">' + mc.hang + '</span>';
      html += '<strong style="font-family:Noto Serif,serif;color:' + cachMau + '">' + mc.ten + '</strong>';
      html += '</div>';
      html += '<p style="font-size:13px;color:var(--ink2);line-height:1.7">' + mc.moTa + '</p>';
      html += '</div>';
    }
  }
  html += '</div>';

  // ─── TÍNH CÁCH ────────────────────────────────────
  html += '<div class="card" style="margin-bottom:16px">';
  html += '<div class="card-title">👤 Tính Cách & Con Người</div>';
  if (lg.tinhCach && lg.tinhCach.length > 0) {
    for (var ti = 0; ti < lg.tinhCach.length; ti++) {
      html += '<div style="padding:8px 0;border-bottom:1px solid var(--cream3);font-size:13px;color:var(--ink2);line-height:1.7">';
      html += '• ' + lg.tinhCach[ti];
      html += '</div>';
    }
  }
  html += '</div>';

  // ─── CÁC LĨNH VỰC CHI TIẾT ──────────────────────
  var linhVuc = [
    { key: 'suNghiep',  icon: '💼', ten: 'Sự Nghiệp · Công Danh' },
    { key: 'taiLoc',    icon: '💰', ten: 'Tài Lộc · Tiền Bạc' },
    { key: 'tinhDuyen', icon: '💕', ten: 'Tình Duyên · Hôn Nhân' },
    { key: 'sucKhoe',   icon: '🏥', ten: 'Sức Khỏe · Tật Ách' },
    { key: 'conCai',    icon: '👶', ten: 'Con Cái · Tử Tức' },
    { key: 'phucDuc',   icon: '🙏', ten: 'Phúc Đức · Tâm Linh' },
    { key: 'thienDi',   icon: '✈️', ten: 'Thiên Di · Xuất Ngoại' },
    { key: 'dienTrach', icon: '🏠', ten: 'Điền Trạch · Nhà Cửa' },
    { key: 'phuMau',    icon: '👨‍👩‍👧', ten: 'Phụ Mẫu · Cha Mẹ' },
    { key: 'huyDe',     icon: '👥', ten: 'Huynh Đệ · Anh Em' },
    { key: 'noBoc',     icon: '🤝', ten: 'Nô Bộc · Bạn Bè' }
  ];

  html += '<div class="card" style="margin-bottom:16px">';
  html += '<div class="card-title">📋 Luận Giải Chi Tiết 12 Cung</div>';

  // Tabs
  html += '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:16px;border-bottom:2px solid var(--cream3);padding-bottom:0">';
  for (var li = 0; li < linhVuc.length; li++) {
    var isFirst = (li === 0);
    html += '<div class="lg-tab' + (isFirst ? ' active' : '') + '" onclick="lgChuyenTab(' + li + ')" style="padding:8px 14px;font-size:12px;font-weight:600;color:' + (isFirst ? 'var(--red)' : 'var(--ink3)') + ';cursor:pointer;border-bottom:2px solid ' + (isFirst ? 'var(--red)' : 'transparent') + ';margin-bottom:-2px;transition:all 0.2s;white-space:nowrap">';
    html += linhVuc[li].icon + ' ' + linhVuc[li].ten;
    html += '</div>';
  }
  html += '</div>';

  // Nội dung tabs
  for (var lj = 0; lj < linhVuc.length; lj++) {
    var lv = linhVuc[lj];
    var cungData = lg[lv.key];
    var isShow = (lj === 0);

    html += '<div id="lg-panel-' + lj + '" style="display:' + (isShow ? 'block' : 'none') + '">';
    html += renderCungPanel(cungData);
    html += '</div>';
  }

  html += '</div>';

  return html;
}


// ─── RENDER 1 CUNG PANEL ─────────────────────────────

function renderCungPanel(cungData) {
  if (!cungData) return '<p style="color:var(--ink3)">Không có dữ liệu.</p>';

  var html = '';

  // Điểm cung
  html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">';
  html += '<div style="width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:Noto Serif,serif;font-size:18px;font-weight:700;color:#fff;background:' + diemMau(cungData.diemCung) + '">';
  html += cungData.diemCung;
  html += '</div>';
  html += '<div>';
  html += '<div style="font-weight:600;color:var(--ink)">' + cungData.tenCung + '</div>';
  html += '<div style="font-size:12px;color:var(--ink3)">' + diemNhanXet(cungData.diemCung) + '</div>';
  html += '</div>';
  html += '</div>';

  // Chính tinh
  if (cungData.chinhTinh && cungData.chinhTinh.length > 0) {
    html += '<div style="margin-bottom:12px">';
    html += '<div style="font-size:12px;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">★ Chính Tinh</div>';
    for (var i = 0; i < cungData.chinhTinh.length; i++) {
      var ct = cungData.chinhTinh[i];
      var mvColor = ct.mieuVuongDiem >= 4 ? '#1A5C00' : ct.mieuVuongDiem <= 1 ? '#B80000' : 'var(--ink)';
      html += '<div style="background:#fff;border:1px solid var(--cream3);border-radius:6px;padding:12px;margin-bottom:8px">';
      html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">';
      html += '<strong style="font-family:Noto Serif,serif;color:var(--red);font-size:15px">' + ct.ten + '</strong>';
      html += '<span style="background:' + mvColor + ';color:#fff;padding:1px 8px;border-radius:10px;font-size:10px;font-weight:700">' + ct.mieuVuong + '</span>';
      if (ct.nguHanh) html += '<span style="font-size:11px;color:var(--ink3)">(' + ct.nguHanh + ')</span>';
      html += '</div>';
      html += '<p style="font-size:13px;color:var(--ink2);line-height:1.7">' + ct.luanGiai + '</p>';
      html += '</div>';
    }
    html += '</div>';
  }

  // Phụ tinh
  if (cungData.phuTinh && cungData.phuTinh.length > 0) {
    html += '<div style="margin-bottom:12px">';
    html += '<div style="font-size:12px;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">✦ Phụ Tinh · Cát Tinh</div>';
    for (var j = 0; j < cungData.phuTinh.length; j++) {
      var pt = cungData.phuTinh[j];
      html += '<div style="background:#f0f8e8;border:1px solid #c0e0a0;border-radius:6px;padding:10px;margin-bottom:6px">';
      html += '<strong style="color:#1A5C00">' + pt.ten + '</strong>';
      html += '<p style="font-size:12px;color:var(--ink2);margin-top:4px;line-height:1.6">' + pt.luanGiai + '</p>';
      html += '</div>';
    }
    html += '</div>';
  }

  // Sát tinh
  if (cungData.satTinh && cungData.satTinh.length > 0) {
    html += '<div style="margin-bottom:12px">';
    html += '<div style="font-size:12px;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">⚠ Sát Tinh · Hung Tinh</div>';
    for (var k = 0; k < cungData.satTinh.length; k++) {
      var st = cungData.satTinh[k];
      html += '<div style="background:#fce8e8;border:1px solid #f0c0c0;border-radius:6px;padding:10px;margin-bottom:6px">';
      html += '<strong style="color:#B80000">' + st.ten + '</strong>';
      html += '<p style="font-size:12px;color:var(--ink2);margin-top:4px;line-height:1.6">' + st.luanGiai + '</p>';
      html += '</div>';
    }
    html += '</div>';
  }

  // Tứ hóa
  if (cungData.hoaTinh && cungData.hoaTinh.length > 0) {
    html += '<div style="margin-bottom:12px">';
    html += '<div style="font-size:12px;font-weight:700;color:var(--ink3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">🔮 Tứ Hóa</div>';
    for (var h = 0; h < cungData.hoaTinh.length; h++) {
      var ht = cungData.hoaTinh[h];
      var htColor = ht.ten === 'Hóa Kỵ' ? '#B80000' : '#1A5C00';
      var htBg = ht.ten === 'Hóa Kỵ' ? '#fce8e8' : '#f0f8e8';
      var htBorder = ht.ten === 'Hóa Kỵ' ? '#f0c0c0' : '#c0e0a0';
      html += '<div style="background:' + htBg + ';border:1px solid ' + htBorder + ';border-radius:6px;padding:10px;margin-bottom:6px">';
      html += '<strong style="color:' + htColor + '">' + ht.ten + '</strong>';
      html += '<p style="font-size:12px;color:var(--ink2);margin-top:4px;line-height:1.6">' + ht.luanGiai + '</p>';
      html += '</div>';
    }
    html += '</div>';
  }

  // Nhận định tổng hợp
  if (cungData.nhanDinh && cungData.nhanDinh.length > 0) {
    html += '<div class="luan-giai-box" style="margin-top:12px">';
    html += '<h3>📝 Nhận Định</h3>';
    html += '<ul style="margin:0;padding-left:18px">';
    for (var n = 0; n < cungData.nhanDinh.length; n++) {
      html += '<li style="font-size:13px;color:var(--ink2);line-height:1.8;margin-bottom:4px">' + cungData.nhanDinh[n] + '</li>';
    }
    html += '</ul>';
    html += '</div>';
  }

  return html;
}


// ─── CHUYỂN TAB LUẬN GIẢI ────────────────────────────

function lgChuyenTab(idx) {
  // Ẩn tất cả panels
  for (var i = 0; i < 11; i++) {
    var panel = document.getElementById('lg-panel-' + i);
    if (panel) panel.style.display = 'none';
  }
  // Hiện panel được chọn
  var active = document.getElementById('lg-panel-' + idx);
  if (active) active.style.display = 'block';

  // Cập nhật tab style
  var tabs = document.querySelectorAll('.lg-tab');
  for (var j = 0; j < tabs.length; j++) {
    tabs[j].style.color = (j === idx) ? 'var(--red)' : 'var(--ink3)';
    tabs[j].style.borderBottomColor = (j === idx) ? 'var(--red)' : 'transparent';
  }
}


// ─── HELPERS MÀU ĐIỂM ───────────────────────────────

function diemMau(diem) {
  if (diem >= 80) return '#1A5C00';
  if (diem >= 60) return 'var(--gold)';
  if (diem >= 40) return '#C87000';
  return '#B80000';
}

function diemNhanXet(diem) {
  if (diem >= 85) return 'Rất tốt — Thuận lợi';
  if (diem >= 70) return 'Khá tốt — Có triển vọng';
  if (diem >= 55) return 'Trung bình — Cần cố gắng';
  if (diem >= 40) return 'Dưới trung bình — Nhiều thách thức';
  return 'Khó khăn — Cần tu tâm tích đức';
}