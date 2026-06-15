/* ====================================================================
 * engine.js — Bộ máy an sao Tử Vi Đẩu Số.
 * Input : Họ tên, ngày/tháng/năm sinh (Dương lịch), giờ sinh (có thể bỏ
 *         trống), giới tính.
 * Output: Đối tượng mô tả đầy đủ lá số (Thiên Bàn + 12 cung Địa Bàn,
 *         mỗi cung gồm chính tinh + phụ tinh + Tứ Hoá + Tuần/Triệt...)
 * Toàn bộ quy tắc an sao dựa theo:
 *   https://tracuutuvi.com/an-sao-tu-vi.html
 * ==================================================================== */

/**
 * Chuyển giờ (0-23) sang index Chi của giờ (0=Tý ... 11=Hợi)
 * Giờ Tý: 23h-1h, Sửu: 1h-3h, ... Hợi: 21h-23h
 */
function hourToChiIdx(hour) {
  return Math.floor((hour + 1) / 2) % 12;
}

/**
 * Kiểm tra & validate input ngày sinh dương lịch.
 * @returns {string|null} thông báo lỗi (null nếu hợp lệ)
 */
function validateDate(day, month, year) {
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return 'Ngày/tháng/năm sinh phải là số.';
  }
  if (year < 1900 || year > 2100) {
    return 'Năm sinh phải trong khoảng 1900 - 2100 để đảm bảo độ chính xác chuyển đổi Âm lịch.';
  }
  if (month < 1 || month > 12) return 'Tháng sinh không hợp lệ (1-12).';
  const daysInMonth = [31, (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28,
    31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day < 1 || day > daysInMonth[month - 1]) {
    return `Ngày sinh không hợp lệ cho tháng ${month}/${year}.`;
  }
  return null;
}

/**
 * Tính vị trí sao Tử Vi (index Chi 0-11) theo ngày sinh Âm lịch và số Cục.
 */
function calcTuViPos(lunarDay, cucSo) {
  const r = lunarDay % cucSo;
  let q, borrow;
  if (r === 0) {
    q = lunarDay / cucSo;
    borrow = 0;
  } else {
    borrow = cucSo - r;
    q = (lunarDay + borrow) / cucSo;
  }
  let pos = 2 + (q - 1); // cung Dần (index 2) là điểm đếm = 1
  pos += (borrow % 2 === 0) ? borrow : -borrow;
  return mod12(pos);
}

/**
 * Hàm chính: tính toán đầy đủ lá số Tử Vi.
 * @param {Object} input
 *   hoTen: string
 *   gioiTinh: 'Nam' | 'Nữ'
 *   day, month, year: ngày sinh dương lịch
 *   hour: số giờ 0-23 (có thể null nếu không rõ giờ sinh)
 *   minute: số phút 0-59 (chỉ để hiển thị)
 */
function calculateChart(input) {
  const { hoTen, gioiTinh, day, month, year, hour, minute } = input;

  const err = validateDate(day, month, year);
  if (err) return { error: err };

  const hasHour = (hour !== null && hour !== undefined && hour !== '');
  const hourValue = hasHour ? Number(hour) : 12; // mặc định giờ Ngọ nếu thiếu giờ sinh
  if (hasHour && (hourValue < 0 || hourValue > 23 || isNaN(hourValue))) {
    return { error: 'Giờ sinh không hợp lệ (0-23).' };
  }

  // ---------- 1. Đổi sang Âm lịch ----------
  const lunar = solarToLunar(day, month, year);

  // ---------- 2. Can - Chi của Năm / Tháng / Ngày / Giờ (âm lịch) ----------
  const canNamIdx = mod10(lunar.year - 4);
  const chiNamIdx = mod12(lunar.year - 4);
  const canPairIdx = mod10(canNamIdx) % 5; // nhóm Can: Giáp/Kỷ=0,...,Mậu/Quý=4

  const monthChiIdx = mod12(lunar.month + 1); // tháng 1 -> Dần(2)
  const monthCanIdx = mod10(2 * canPairIdx + lunar.month + 1);

  const jd = jdFromDate(day, month, year);
  const dayCanIdx = mod10(jd + 9);
  const dayChiIdx = mod12(jd + 1);
  const dayCanPairIdx = mod10(dayCanIdx) % 5;

  const hourChiIdx = hourToChiIdx(hourValue);
  const hourCanIdx = mod10(2 * dayCanPairIdx + hourChiIdx);

  // ---------- 3. Cung Mệnh - Cung Thân ----------
  const menhChiIdx = mod12(monthChiIdx - hourChiIdx);
  const thanChiIdx = mod12(monthChiIdx + hourChiIdx);

  // ---------- 4. Cục ----------
  const chiPairIdx = Math.floor(menhChiIdx / 2);
  const cucSo = CUC_TABLE[canPairIdx][chiPairIdx];

  // ---------- 5. Âm Dương Nam/Nữ & chiều an sao ----------
  const isDuongCan = (canNamIdx % 2 === 0); // Giáp,Bính,Mậu,Canh,Nhâm = Dương
  const amDuongLabel = (isDuongCan ? 'Dương' : 'Âm') + ' ' + gioiTinh;
  // Dương Nam & Âm Nữ => an theo chiều thuận (tăng index Chi); Âm Nam & Dương Nữ => nghịch
  const thuanChieu = (isDuongCan && gioiTinh === 'Nam') || (!isDuongCan && gioiTinh === 'Nữ');

  // ---------- 6. Khởi tạo 12 cung ----------
  const palaces = [];
  for (let i = 0; i < 12; i++) {
    palaces.push({
      chiIdx: i,
      chi: CHI[i],
      palaceName: '',
      isMenh: i === menhChiIdx,
      isThan: i === thanChiIdx,
      chinhTinh: [],
      stars: [],
      hasTuan: false,
      hasTriet: false,
      decadeIndex: 0,
      ageRange: [0, 0],
    });
  }
  // Gán tên 12 cung (đếm NGHỊCH từ Mệnh theo thứ tự cố định)
  for (let i = 0; i < 12; i++) {
    const idx = mod12(menhChiIdx - i);
    palaces[idx].palaceName = PALACE_NAMES_FROM_MENH[i];
  }

  // hàm hỗ trợ thêm sao vào 1 cung
  function addStar(idx, name, extra) {
    palaces[mod12(idx)].stars.push(Object.assign({ name, group: STAR_GROUP[name] || 'vong' }, extra || {}));
  }
  function addChinhTinh(idx, name) {
    palaces[mod12(idx)].chinhTinh.push({ name, tuHoa: null });
  }

  // ---------- 7. AN 14 CHÍNH TINH ----------
  const tuViPos = calcTuViPos(lunar.day, cucSo);
  const thienPhuPos = mod12(4 - tuViPos);
  const chinhTinhPos = {}; // tên sao -> vị trí (để tra khi an Tứ Hoá)
  for (const [star, off] of Object.entries(TUVI_GROUP_OFFSET)) {
    const pos = mod12(tuViPos - off); // nhóm Tử Vi: an theo chiều nghịch
    chinhTinhPos[star] = pos;
    addChinhTinh(pos, star);
  }
  for (const [star, off] of Object.entries(THIENPHU_GROUP_OFFSET)) {
    const pos = mod12(thienPhuPos + off); // nhóm Thiên Phủ: an theo chiều thuận
    chinhTinhPos[star] = pos;
    addChinhTinh(pos, star);
  }

  // ---------- 8. VÒNG TRƯỜNG SINH ----------
  {
    const startIdx = chiIdx(TRUONGSINH_START_BY_CUC[cucSo]);
    for (let i = 0; i < 12; i++) {
      const pos = thuanChieu ? mod12(startIdx + i) : mod12(startIdx - i);
      addStar(pos, TRUONGSINH_STARS[i]);
    }
  }

  // ---------- 9. VÒNG LỘC TỒN (+ Bác Sĩ, Kình Dương, Đà La) ----------
  let locTonPos;
  {
    locTonPos = chiIdx(LOCTON_BY_CAN[canNamIdx]);
    addStar(locTonPos, 'Lộc Tồn');
    for (let i = 0; i < 12; i++) {
      const pos = thuanChieu ? mod12(locTonPos + i) : mod12(locTonPos - i);
      addStar(pos, BACSI_STARS[i]);
    }
    // Kình Dương / Đà La nằm 2 bên Lộc Tồn (Kình = +1 thuận, Đà = -1 / cung trước)
    addStar(chiIdx(KINHDUONG_BY_CAN[canNamIdx]), 'Kình Dương');
    addStar(chiIdx(DALA_BY_CAN[canNamIdx]), 'Đà La');
  }

  // ---------- 10. VÒNG THÁI TUẾ ----------
  {
    const startIdx = chiNamIdx;
    for (let i = 0; i < 12; i++) {
      const pos = mod12(startIdx + i); // luôn đi theo chiều thuận (tăng index Chi)
      for (const name of THAITUE_STARS[i]) addStar(pos, name);
    }
  }

  // ---------- 11. AN SAO THEO THIÊN CAN TUỔI (trừ Đà La/Kình Dương đã an ở trên) ----------
  addStar(chiIdx(LUUHA_BY_CAN[canNamIdx]), 'Lưu Hà');
  addStar(chiIdx(QUOCAN_BY_CAN[canNamIdx]), 'Quốc Ấn');
  addStar(chiIdx(DUONGPHU_BY_CAN[canNamIdx]), 'Đường Phù');
  addStar(chiIdx(VANTINH_BY_CAN[canNamIdx]), 'Văn Tinh');
  addStar(chiIdx(THIENKHOI_BY_CAN[canNamIdx]), 'Thiên Khôi');
  addStar(chiIdx(THIENVIET_BY_CAN[canNamIdx]), 'Thiên Việt');
  addStar(chiIdx(THIENQUAN_BY_CAN[canNamIdx]), 'Thiên Quan');
  addStar(chiIdx(THIENPHUC_BY_CAN[canNamIdx]), 'Thiên Phúc');
  addStar(chiIdx(THIENTRU_BY_CAN[canNamIdx]), 'Thiên Trù');
  // Triệt Không - 2 cung
  for (const c of TRIET_BY_CAN[canNamIdx]) {
    palaces[chiIdx(c)].hasTriet = true;
  }

  // ---------- 12. AN SAO TUẦN KHÔNG ----------
  {
    const tuanCungs = getTuanCungs(canNamIdx, chiNamIdx);
    for (const idx of tuanCungs) palaces[idx].hasTuan = true;
  }

  // ---------- 13. AN SAO THEO ĐỊA CHI TUỔI ----------
  addStar(chiIdx(PHUONGCAC_BY_CHI[chiNamIdx]), 'Phượng Các');
  addStar(chiIdx(GIAITHAN_BY_CHI[chiNamIdx]), 'Giải Thần');
  addStar(chiIdx(LONGTRI_BY_CHI[chiNamIdx]), 'Long Trì');
  addStar(chiIdx(NGUYETDUC_BY_CHI[chiNamIdx]), 'Nguyệt Đức');
  addStar(chiIdx(THIENDUC_BY_CHI[chiNamIdx]), 'Thiên Đức');
  addStar(chiIdx(THIENHY_BY_CHI[chiNamIdx]), 'Thiên Hỷ');
  addStar(chiIdx(THIENMA_BY_CHI[chiNamIdx]), 'Thiên Mã');
  addStar(chiIdx(THIENKHOC_BY_CHI[chiNamIdx]), 'Thiên Khốc');
  addStar(chiIdx(THIENHU_BY_CHI[chiNamIdx]), 'Thiên Hư');
  addStar(chiIdx(DAOHOA_BY_CHI[chiNamIdx]), 'Đào Hoa');
  addStar(chiIdx(HONGLOAN_BY_CHI[chiNamIdx]), 'Hồng Loan');
  addStar(chiIdx(HOACAI_BY_CHI[chiNamIdx]), 'Hoa Cái');
  addStar(chiIdx(KIEPSAT_BY_CHI[chiNamIdx]), 'Kiếp Sát');
  addStar(chiIdx(PHATOAI_BY_CHI[chiNamIdx]), 'Phá Toái');
  addStar(chiIdx(COTHAN_BY_CHI[chiNamIdx]), 'Cô Thần');
  addStar(chiIdx(QUATU_BY_CHI[chiNamIdx]), 'Quả Tú');

  // ---------- 14. AN SAO THEO THÁNG SINH (âm lịch) ----------
  const mIdx = lunar.month - 1;
  addStar(chiIdx(TAPHU_BY_MONTH[mIdx]), 'Tả Phù');
  addStar(chiIdx(HUUBAT_BY_MONTH[mIdx]), 'Hữu Bật');
  addStar(chiIdx(THIENHINH_BY_MONTH[mIdx]), 'Thiên Hình');
  addStar(chiIdx(THIENRIEU_BY_MONTH[mIdx]), 'Thiên Riêu');
  addStar(chiIdx(THIENY_BY_MONTH[mIdx]), 'Thiên Y');
  addStar(chiIdx(THIENGIAI_BY_MONTH[mIdx]), 'Thiên Giải');
  addStar(chiIdx(DIAGIAI_BY_MONTH[mIdx]), 'Địa Giải');

  // ---------- 15. AN SAO THEO GIỜ SINH ----------
  addStar(chiIdx(VANXUONG_BY_HOUR[hourChiIdx]), 'Văn Xương');
  addStar(chiIdx(VANKHUC_BY_HOUR[hourChiIdx]), 'Văn Khúc');
  addStar(chiIdx(DIAKHONG_BY_HOUR[hourChiIdx]), 'Địa Không');
  addStar(chiIdx(DIAKIEP_BY_HOUR[hourChiIdx]), 'Địa Kiếp');
  addStar(chiIdx(THAIPHU_BY_HOUR[hourChiIdx]), 'Thai Phụ');
  addStar(chiIdx(PHONGCAO_BY_HOUR[hourChiIdx]), 'Phong Cáo');

  // ---------- 16. HOẢ TINH - LINH TINH ----------
  {
    const group = HOATINH_LINHTINH_GROUPS.find(g => g.chis.includes(CHI[chiNamIdx]));
    const hoaStart = chiIdx(group.hoa);
    const linhStart = chiIdx(group.linh);
    const hoaPos = thuanChieu ? mod12(hoaStart + hourChiIdx) : mod12(hoaStart - hourChiIdx);
    const linhPos = thuanChieu ? mod12(linhStart - hourChiIdx) : mod12(linhStart + hourChiIdx);
    addStar(hoaPos, 'Hoả Tinh');
    addStar(linhPos, 'Linh Tinh');
  }

  // ---------- 17. TỨ HOÁ (theo Can năm sinh) ----------
  {
    const canName = CAN[canNamIdx];
    const tuHoa = TUHOA_TABLE[canName];
    // tập hợp vị trí mọi sao đã an (chính tinh + 1 số phụ tinh có thể được Tứ Hoá)
    const allStarPos = Object.assign({}, chinhTinhPos);
    for (const p of palaces) {
      for (const s of p.stars) {
        if (!(s.name in allStarPos)) allStarPos[s.name] = p.chiIdx;
      }
    }
    for (const key of ['loc', 'quyen', 'khoa', 'ky']) {
      const starName = tuHoa[key];
      const pos = allStarPos[starName];
      if (pos === undefined) continue;
      // gắn nhãn Tứ Hoá vào đúng sao (chính tinh hoặc phụ tinh)
      const palace = palaces[pos];
      const ct = palace.chinhTinh.find(c => c.name === starName);
      if (ct) { ct.tuHoa = key; }
      else {
        const ph = palace.stars.find(s => s.name === starName);
        if (ph) ph.tuHoa = key;
      }
    }
  }

  // ---------- 18. ĐẠI HẠN (vận 10 năm theo mỗi cung) ----------
  for (let i = 0; i < 12; i++) {
    const decade = thuanChieu ? mod12(i - menhChiIdx) : mod12(menhChiIdx - i);
    palaces[i].decadeIndex = decade + 1; // 1..12 (T1..T12)
    const start = cucSo + decade * 10;
    palaces[i].ageRange = [start, start + 9];
  }

  // ---------- 19. Mệnh chủ (tham khảo) ----------
  const menhChu = MENHCHU_BY_CHI[CHI[menhChiIdx]];

  // ---------- 20. Sắp xếp lại danh sách cung theo thứ tự Mệnh trước ----------
  const palacesOrdered = [];
  for (let i = 0; i < 12; i++) palacesOrdered.push(palaces[mod12(menhChiIdx - i)]);

  return {
    error: null,
    input: { hoTen, gioiTinh, day, month, year, hour: hasHour ? hourValue : null, minute: minute || 0, hasHour },
    lunar,
    canChi: {
      nam: CAN[canNamIdx] + ' ' + CHI[chiNamIdx],
      thang: CAN[monthCanIdx] + ' ' + CHI[monthChiIdx],
      ngay: CAN[dayCanIdx] + ' ' + CHI[dayChiIdx],
      gio: CAN[hourCanIdx] + ' ' + CHI[hourChiIdx],
      canNamIdx, chiNamIdx, hourChiIdx,
    },
    amDuongLabel,
    thuanChieu,
    cuc: { so: cucSo, ten: CUC_NAME[cucSo], hanh: CUC_HANH[cucSo] },
    menhChiIdx, thanChiIdx,
    menhChu,
    saoChuCuc: chinhTinhAtCucChu(cucSo),
    palaces, // theo thứ tự Chi (0=Tý..11=Hợi) - dùng để vẽ lưới 4x4
    palacesOrdered, // theo thứ tự bắt đầu từ Mệnh - dùng để liệt kê/đọc
  };
}

// "Sao chủ Cục" - sao đại diện ngũ hành của Cục (thường dùng để tham chiếu)
function chinhTinhAtCucChu(cucSo) {
  const map = { 2: 'Phá Quân', 3: 'Tham Lang', 4: 'Vũ Khúc', 5: 'Thiên Tướng', 6: 'Liêm Trinh' };
  return map[cucSo];
}

if (typeof module !== 'undefined') {
  module.exports = { calculateChart, validateDate, calcTuViPos, hourToChiIdx };
}
