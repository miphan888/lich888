/* ====================================================================
 * data.js — Toàn bộ bảng tra cứu dùng để an sao Tử Vi Đẩu Số.
 * Nguồn quy trình: https://tracuutuvi.com/an-sao-tu-vi.html
 * Mọi bảng dưới đây được sắp xếp theo thứ tự CAN (10 can) / CHI (12 chi)
 * để tiện lập trình bằng index số (0-9 cho Can, 0-11 cho Chi).
 * ==================================================================== */

// ---------- 1. Thiên Can - Địa Chi cơ bản ----------
const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// Vị trí (hàng, cột) của 12 cung trong lưới 4x4 (Thiên Bàn ở giữa 2x2)
// Thứ tự: clockwise = tăng index Chi (Tý..Hợi)
const CHI_GRID_POS = {
  0: [3, 2],  // Tý
  1: [3, 1],  // Sửu
  2: [3, 0],  // Dần
  3: [2, 0],  // Mão
  4: [1, 0],  // Thìn
  5: [0, 0],  // Tỵ
  6: [0, 1],  // Ngọ
  7: [0, 2],  // Mùi
  8: [0, 3],  // Thân
  9: [1, 3],  // Dậu
  10: [2, 3], // Tuất
  11: [3, 3], // Hợi
};

// Hàm hỗ trợ: chuẩn hoá index Chi về 0..11 (xử lý số âm)
function mod12(n) { return ((n % 12) + 12) % 12; }
function mod10(n) { return ((n % 10) + 10) % 10; }
function chiIdx(name) { return CHI.indexOf(name); }
function canIdx(name) { return CAN.indexOf(name); }

// ---------- 2. Bảng AN CỤC ----------
// Hàng: nhóm Can (canIndex % 5) -> Giáp/Kỷ=0, Ất/Canh=1, Bính/Tân=2, Đinh/Nhâm=3, Mậu/Quý=4
// Cột : nhóm Chi của cung Mệnh (floor(chiIndex/2)) -> Tý-Sửu=0, Dần-Mão=1, Thìn-Tỵ=2,
//        Ngọ-Mùi=3, Thân-Dậu=4, Tuất-Hợi=5
// Giá trị: số Cục (2=Thuỷ, 3=Mộc, 4=Kim, 5=Thổ, 6=Hoả)
const CUC_TABLE = [
  [2, 6, 3, 5, 4, 6], // Giáp - Kỷ
  [6, 5, 4, 3, 2, 5], // Ất - Canh
  [5, 3, 2, 4, 6, 3], // Bính - Tân
  [3, 4, 6, 2, 5, 4], // Đinh - Nhâm
  [4, 2, 5, 6, 3, 2], // Mậu - Quý
];
const CUC_NAME = { 2: 'Thuỷ Nhị Cục', 3: 'Mộc Tam Cục', 4: 'Kim Tứ Cục', 5: 'Thổ Ngũ Cục', 6: 'Hoả Lục Cục' };
const CUC_HANH = { 2: 'Thuỷ', 3: 'Mộc', 4: 'Kim', 5: 'Thổ', 6: 'Hoả' };

// ---------- 3. AN 14 CHÍNH TINH ----------
// Nhóm Tử Vi: từ cung Tử Vi, các sao cách Tử Vi theo offset cố định (đếm thuận)
const TUVI_GROUP_OFFSET = {
  'Tử Vi': 0,
  'Thiên Cơ': 1,
  'Thái Dương': 3,
  'Vũ Khúc': 4,
  'Thiên Đồng': 5,
  'Liêm Trinh': 8,
};
// Nhóm Thiên Phủ: từ cung Thiên Phủ (đối xứng Tử Vi), các sao cách theo offset cố định (đếm thuận)
const THIENPHU_GROUP_OFFSET = {
  'Thiên Phủ': 0,
  'Thái Âm': 1,
  'Tham Lang': 2,
  'Cự Môn': 3,
  'Thiên Tướng': 4,
  'Thiên Lương': 5,
  'Thất Sát': 6,
  'Phá Quân': 10,
};
// Thứ tự hiển thị chuẩn của 14 chính tinh (dùng để liệt kê / tra ý nghĩa)
const CHINH_TINH_LIST = [
  'Tử Vi', 'Thiên Cơ', 'Thái Dương', 'Vũ Khúc', 'Thiên Đồng', 'Liêm Trinh',
  'Thiên Phủ', 'Thái Âm', 'Tham Lang', 'Cự Môn', 'Thiên Tướng', 'Thiên Lương',
  'Thất Sát', 'Phá Quân',
];

// ---------- 4. VÒNG TRƯỜNG SINH ----------
// Vị trí khởi (sao Trường Sinh) theo Cục
const TRUONGSINH_START_BY_CUC = { 2: 'Thân', 5: 'Thân', 6: 'Dần', 3: 'Hợi', 4: 'Tỵ' };
// Thứ tự 12 sao trong vòng Trường Sinh
const TRUONGSINH_STARS = [
  'Trường Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy',
  'Bệnh', 'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng',
];

// ---------- 5. VÒNG LỘC TỒN (+ Bác Sĩ 12 sao) ----------
// Vị trí Lộc Tồn theo Thiên Can năm sinh (index theo CAN)
const LOCTON_BY_CAN = ['Dần', 'Mão', 'Tỵ', 'Ngọ', 'Tỵ', 'Ngọ', 'Thân', 'Dậu', 'Hợi', 'Tý'];
// Vòng Bác Sĩ 12 sao - bắt đầu cùng cung với Lộc Tồn, theo chiều thuận/nghịch tuỳ Âm Dương
const BACSI_STARS = [
  'Bác Sĩ', 'Lực Sĩ', 'Thanh Long', 'Tiểu Hao', 'Tướng Quân', 'Tấu Thư',
  'Phi Liêm', 'Hỷ Thần', 'Bệnh Phù', 'Đại Hao', 'Phục Binh', 'Quan Phủ',
];

// ---------- 6. VÒNG THÁI TUẾ (12 sao, theo Chi năm sinh) ----------
// offset 1: Thiếu Dương VÀ Thiên Không cùng đóng 1 cung
const THAITUE_STARS = [
  ['Thái Tuế'], ['Thiếu Dương', 'Thiên Không'], ['Tang Môn'], ['Thiếu Âm'],
  ['Quan Phù'], ['Tử Phù'], ['Tuế Phá'], ['Long Đức'], ['Bạch Hổ'],
  ['Phúc Đức'], ['Điếu Khách'], ['Trực Phù'],
];

// ---------- 7. TỨ HOÁ (theo Thiên Can năm sinh) ----------
const TUHOA_TABLE = {
  'Giáp': { loc: 'Liêm Trinh', quyen: 'Phá Quân', khoa: 'Vũ Khúc', ky: 'Thái Dương' },
  'Ất': { loc: 'Thiên Cơ', quyen: 'Thiên Lương', khoa: 'Tử Vi', ky: 'Thái Âm' },
  'Bính': { loc: 'Thiên Đồng', quyen: 'Thiên Cơ', khoa: 'Văn Xương', ky: 'Liêm Trinh' },
  'Đinh': { loc: 'Thái Âm', quyen: 'Thiên Đồng', khoa: 'Thiên Cơ', ky: 'Cự Môn' },
  'Mậu': { loc: 'Tham Lang', quyen: 'Thái Âm', khoa: 'Thái Dương', ky: 'Thiên Cơ' },
  'Kỷ': { loc: 'Vũ Khúc', quyen: 'Tham Lang', khoa: 'Thiên Lương', ky: 'Văn Khúc' },
  'Canh': { loc: 'Thái Dương', quyen: 'Vũ Khúc', khoa: 'Thiên Đồng', ky: 'Thiên Tướng' },
  'Tân': { loc: 'Cự Môn', quyen: 'Thái Dương', khoa: 'Văn Khúc', ky: 'Văn Xương' },
  'Nhâm': { loc: 'Thiên Lương', quyen: 'Tử Vi', khoa: 'Tả Phù', ky: 'Vũ Khúc' },
  'Quý': { loc: 'Phá Quân', quyen: 'Cự Môn', khoa: 'Thái Âm', ky: 'Tham Lang' },
};
const TUHOA_LABEL = { loc: 'Hoá Lộc', quyen: 'Hoá Quyền', khoa: 'Hoá Khoa', ky: 'Hoá Kỵ' };

// ---------- 8. AN SAO THEO THIÊN CAN TUỔI (index theo CAN, 10 giá trị) ----------
const DALA_BY_CAN      = ['Sửu', 'Dần', 'Thìn', 'Tỵ', 'Thìn', 'Tỵ', 'Mùi', 'Thân', 'Tuất', 'Hợi'];
const KINHDUONG_BY_CAN = ['Mão', 'Thìn', 'Ngọ', 'Mùi', 'Ngọ', 'Mùi', 'Dậu', 'Tuất', 'Tý', 'Sửu'];
const LUUHA_BY_CAN     = ['Dậu', 'Tuất', 'Mùi', 'Thìn', 'Tỵ', 'Ngọ', 'Thân', 'Mão', 'Hợi', 'Dần'];
const QUOCAN_BY_CAN    = ['Tuất', 'Hợi', 'Sửu', 'Dần', 'Sửu', 'Dần', 'Thìn', 'Tỵ', 'Mùi', 'Thân'];
const DUONGPHU_BY_CAN  = ['Mùi', 'Thân', 'Tuất', 'Hợi', 'Tuất', 'Hợi', 'Sửu', 'Dần', 'Thìn', 'Tỵ'];
const VANTINH_BY_CAN   = ['Tỵ', 'Ngọ', 'Thân', 'Dậu', 'Thân', 'Dậu', 'Hợi', 'Tý', 'Dậu', 'Mão'];
const THIENKHOI_BY_CAN = ['Sửu', 'Tý', 'Hợi', 'Hợi', 'Sửu', 'Tý', 'Ngọ', 'Ngọ', 'Mão', 'Mão'];
const THIENVIET_BY_CAN = ['Mùi', 'Thân', 'Dậu', 'Dậu', 'Mùi', 'Thân', 'Dần', 'Dần', 'Tỵ', 'Tỵ'];
const THIENQUAN_BY_CAN = ['Mùi', 'Thìn', 'Tỵ', 'Dần', 'Mão', 'Dậu', 'Hợi', 'Dậu', 'Tuất', 'Ngọ'];
const THIENPHUC_BY_CAN = ['Dậu', 'Thân', 'Tý', 'Hợi', 'Mão', 'Dần', 'Ngọ', 'Tỵ', 'Ngọ', 'Tỵ'];
const THIENTRU_BY_CAN  = ['Tỵ', 'Ngọ', 'Tý', 'Tỵ', 'Ngọ', 'Thân', 'Dần', 'Ngọ', 'Dậu', 'Tuất'];
// Triệt Không an theo 2 cung liên tiếp, tuỳ Can năm sinh
const TRIET_BY_CAN = [
  ['Thân', 'Dậu'], ['Ngọ', 'Mùi'], ['Thìn', 'Tỵ'], ['Dần', 'Mão'], ['Tý', 'Sửu'],
  ['Thân', 'Dậu'], ['Ngọ', 'Mùi'], ['Thìn', 'Tỵ'], ['Dần', 'Mão'], ['Tý', 'Sửu'],
];

// ---------- 9. AN SAO TUẦN KHÔNG (theo "năm Giáp" gần nhất) ----------
// Tuần Không chiếm 2 cung liền trước cung có Chi của "năm Giáp" gần nhất
// (vd: Giáp Tý -> Tuần tại Tuất, Hợi ; Giáp Dần -> Tuần tại Tý, Sửu ...)
function getTuanCungs(canYearIdx, chiYearIdx) {
  // Lùi về năm Giáp gần nhất: lùi đúng (canYearIdx) năm để Can = Giáp(0)
  const giapChi = mod12(chiYearIdx - canYearIdx);
  return [mod12(giapChi + 10), mod12(giapChi + 11)];
}

// ---------- 10. AN SAO THEO ĐỊA CHI TUỔI (index theo CHI, 12 giá trị) ----------
const PHUONGCAC_BY_CHI = ['Tuất', 'Dậu', 'Thân', 'Mùi', 'Ngọ', 'Tỵ', 'Thìn', 'Mão', 'Dần', 'Sửu', 'Tý', 'Hợi'];
const GIAITHAN_BY_CHI  = ['Tuất', 'Dậu', 'Thân', 'Mùi', 'Ngọ', 'Tỵ', 'Thìn', 'Mão', 'Dần', 'Sửu', 'Tý', 'Hợi'];
const LONGTRI_BY_CHI   = ['Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão'];
const NGUYETDUC_BY_CHI = ['Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn'];
const THIENDUC_BY_CHI  = ['Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân'];
const THIENHY_BY_CHI   = ['Dậu', 'Thân', 'Mùi', 'Ngọ', 'Tỵ', 'Thìn', 'Mão', 'Dần', 'Sửu', 'Tý', 'Hợi', 'Tuất'];
const THIENMA_BY_CHI   = ['Dần', 'Hợi', 'Thân', 'Tỵ', 'Dần', 'Hợi', 'Thân', 'Tỵ', 'Dần', 'Hợi', 'Thân', 'Tỵ'];
const THIENKHOC_BY_CHI = ['Ngọ', 'Tỵ', 'Thìn', 'Mão', 'Dần', 'Sửu', 'Tý', 'Hợi', 'Tuất', 'Dậu', 'Thân', 'Mùi'];
const THIENHU_BY_CHI   = ['Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ'];
const DAOHOA_BY_CHI    = ['Dậu', 'Ngọ', 'Mão', 'Tý', 'Dậu', 'Ngọ', 'Mão', 'Tý', 'Dậu', 'Ngọ', 'Mão', 'Tý'];
const HONGLOAN_BY_CHI  = ['Mão', 'Dần', 'Sửu', 'Tý', 'Hợi', 'Tuất', 'Dậu', 'Thân', 'Mùi', 'Ngọ', 'Tỵ', 'Thìn'];
const HOACAI_BY_CHI    = ['Thìn', 'Sửu', 'Tuất', 'Mùi', 'Thìn', 'Sửu', 'Tuất', 'Mùi', 'Thìn', 'Sửu', 'Tuất', 'Mùi'];
const KIEPSAT_BY_CHI   = ['Tỵ', 'Dần', 'Hợi', 'Thân', 'Tỵ', 'Dần', 'Hợi', 'Thân', 'Tỵ', 'Dần', 'Hợi', 'Thân'];
const PHATOAI_BY_CHI   = ['Tỵ', 'Sửu', 'Dậu', 'Tỵ', 'Sửu', 'Dậu', 'Tỵ', 'Sửu', 'Dậu', 'Tỵ', 'Sửu', 'Dậu'];
const COTHAN_BY_CHI    = ['Dần', 'Dần', 'Tỵ', 'Tỵ', 'Tỵ', 'Thân', 'Thân', 'Thân', 'Hợi', 'Hợi', 'Hợi', 'Dần'];
const QUATU_BY_CHI     = ['Tuất', 'Tuất', 'Sửu', 'Sửu', 'Sửu', 'Thìn', 'Thìn', 'Thìn', 'Mùi', 'Mùi', 'Mùi', 'Tuất'];

// ---------- 11. AN SAO THEO THÁNG SINH (index = tháng - 1, 12 giá trị) ----------
const TAPHU_BY_MONTH     = ['Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão'];
const HUUBAT_BY_MONTH    = ['Tuất', 'Dậu', 'Thân', 'Mùi', 'Ngọ', 'Tỵ', 'Thìn', 'Mão', 'Dần', 'Sửu', 'Tý', 'Hợi'];
const THIENHINH_BY_MONTH = ['Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân'];
const THIENRIEU_BY_MONTH = ['Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý'];
const THIENY_BY_MONTH    = ['Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý'];
const THIENGIAI_BY_MONTH = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi'];
const DIAGIAI_BY_MONTH   = ['Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ'];

// ---------- 12. AN SAO THEO GIỜ SINH (index theo CHI giờ, 12 giá trị) ----------
const VANXUONG_BY_HOUR = ['Tuất', 'Dậu', 'Thân', 'Mùi', 'Ngọ', 'Tỵ', 'Thìn', 'Mão', 'Dần', 'Sửu', 'Tý', 'Hợi'];
const VANKHUC_BY_HOUR  = ['Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão'];
const DIAKHONG_BY_HOUR = ['Hợi', 'Tuất', 'Dậu', 'Thân', 'Mùi', 'Ngọ', 'Tỵ', 'Thìn', 'Mão', 'Dần', 'Sửu', 'Tý'];
const DIAKIEP_BY_HOUR  = ['Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất'];
const THAIPHU_BY_HOUR  = ['Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ'];
const PHONGCAO_BY_HOUR = ['Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu'];

// ---------- 13. HOẢ TINH - LINH TINH (theo Chi tuổi, rồi đếm theo giờ) ----------
// Nhóm Chi tuổi -> cung khởi (coi là giờ Tý) của Hoả Tinh / Linh Tinh
const HOATINH_LINHTINH_GROUPS = [
  { chis: ['Dần', 'Ngọ', 'Tuất'], hoa: 'Sửu', linh: 'Mão' },
  { chis: ['Thân', 'Tý', 'Thìn'], hoa: 'Dần', linh: 'Tuất' },
  { chis: ['Tỵ', 'Dậu', 'Sửu'], hoa: 'Mão', linh: 'Tuất' },
  { chis: ['Hợi', 'Mão', 'Mùi'], hoa: 'Dậu', linh: 'Tuất' },
];

// ---------- 14. TÊN 12 CUNG (theo thứ tự từ cung Mệnh, đếm NGHỊCH) ----------
const PALACE_NAMES_FROM_MENH = [
  'Mệnh', 'Huynh Đệ', 'Phu Thê', 'Tử Tức', 'Tài Bạch', 'Tật Ách',
  'Thiên Di', 'Nô Bộc', 'Quan Lộc', 'Điền Trạch', 'Phúc Đức', 'Phụ Mẫu',
];

// ---------- 15. MỆNH CHỦ (theo Chi cung Mệnh) - bảng tham khảo ----------
const MENHCHU_BY_CHI = {
  'Tý': 'Tham Lang', 'Sửu': 'Cự Môn', 'Dần': 'Lộc Tồn', 'Mão': 'Văn Khúc',
  'Thìn': 'Liêm Trinh', 'Tỵ': 'Vũ Khúc', 'Ngọ': 'Phá Quân', 'Mùi': 'Vũ Khúc',
  'Thân': 'Liêm Trinh', 'Dậu': 'Văn Khúc', 'Tuất': 'Cự Môn', 'Hợi': 'Tham Lang',
};

// ---------- 16. PHÂN LOẠI MÀU SAO (để hiển thị) ----------
// nhom: 'chinh' (chính tinh), 'tot' (cát tinh / sao tốt), 'xau' (sát tinh / sao xấu),
//       'vong' (sao thuộc các vòng phụ - trung tính), 'dac-biet' (Tuần/Triệt)
const STAR_GROUP = {};
CHINH_TINH_LIST.forEach(s => STAR_GROUP[s] = 'chinh');
['Lộc Tồn', 'Thiên Khôi', 'Thiên Việt', 'Tả Phù', 'Hữu Bật', 'Văn Xương', 'Văn Khúc',
  'Thiên Mã', 'Long Trì', 'Phượng Các', 'Giải Thần', 'Thiên Đức', 'Nguyệt Đức',
  'Thiên Quan', 'Thiên Phúc', 'Quốc Ấn', 'Đường Phù', 'Tam Thai', 'Bát Toạ',
  'Thiên Hỷ', 'Hồng Loan', 'Đào Hoa', 'Thiên Giải', 'Địa Giải', 'Thiên Y', 'Văn Tinh',
  'Thai Phụ', 'Phong Cáo',
].forEach(s => STAR_GROUP[s] = 'tot');
['Kình Dương', 'Đà La', 'Hoả Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp',
  'Thiên Hình', 'Thiên Riêu', 'Thiên Khốc', 'Thiên Hư', 'Kiếp Sát', 'Phá Toái',
  'Cô Thần', 'Quả Tú', 'Hoa Cái', 'Đại Hao', 'Tiểu Hao', 'Bạch Hổ', 'Tang Môn',
  'Quan Phù', 'Tử Phù', 'Tuế Phá', 'Bệnh Phù', 'Phục Binh', 'Lưu Hà',
  'Thiên Không', 'Cô Quả',
].forEach(s => STAR_GROUP[s] = 'xau');
['Trường Sinh', 'Mộc Dục', 'Quan Đới', 'Lâm Quan', 'Đế Vượng', 'Suy', 'Bệnh',
  'Tử', 'Mộ', 'Tuyệt', 'Thai', 'Dưỡng', 'Bác Sĩ', 'Lực Sĩ', 'Thanh Long',
  'Tướng Quân', 'Tấu Thư', 'Phi Liêm', 'Hỷ Thần', 'Thái Tuế', 'Thiếu Dương',
  'Thiếu Âm', 'Long Đức', 'Phúc Đức', 'Điếu Khách', 'Trực Phù',
].forEach(s => { if (!STAR_GROUP[s]) STAR_GROUP[s] = 'vong'; });

// ---------- 17. Ý NGHĨA NGẮN (hiện khi hover/click vào sao) ----------
const STAR_MEANING = {
  'Tử Vi': 'Đế tinh, chủ về quyền uy, lãnh đạo, phẩm cách cao quý; an tại Mệnh thường có khí chất chỉ huy.',
  'Thiên Cơ': 'Sao trí tuệ, chủ về cơ trí, mưu lược, biến động; người có sao này thường năng động, nhanh nhạy.',
  'Thái Dương': 'Biểu tượng mặt trời, chủ về danh vọng, sự nghiệp, quan hệ với nam giới/người cha.',
  'Vũ Khúc': 'Sao tài chính - võ nghiệp, chủ về tiền bạc, ý chí mạnh mẽ, quyết đoán.',
  'Thiên Đồng': 'Phúc tinh, chủ về sự an nhàn, hiền hoà, được hưởng phúc nhưng dễ an phận.',
  'Liêm Trinh': 'Sao có hai mặt, chủ về nguyên tắc - kỷ luật hoặc thị phi - tranh đấu tuỳ vị trí.',
  'Thiên Phủ': 'Sao của sự ổn định, kho lộc, chủ về tích lũy, bảo thủ và khả năng quản lý.',
  'Thái Âm': 'Biểu tượng mặt trăng, chủ về tài lộc âm thầm, tình cảm, quan hệ với nữ giới/người mẹ.',
  'Tham Lang': 'Sao đa năng, chủ về dục vọng, giao tiếp, ham muốn vật chất và tinh thần.',
  'Cự Môn': 'Sao thị phi - ăn nói, chủ về tranh luận, miệng lưỡi, dễ gặp thị phi nhưng cũng có tài hùng biện.',
  'Thiên Tướng': 'Sao của sự trợ giúp, chủ về trung thành, khéo giao tiếp, thích giúp đỡ người khác.',
  'Thiên Lương': 'Sao của sự che chở, chủ về nhân hậu, trường thọ, hay đứng ra giải quyết khó khăn cho người khác.',
  'Thất Sát': 'Sao võ tướng, chủ về quyết đoán, mạnh mẽ, dám đương đầu thử thách.',
  'Phá Quân': 'Sao biến động, chủ về phá - lập, thích thay đổi, đột phá nhưng cũng dễ hao tốn.',
  'Hoá Lộc': 'Một trong Tứ Hoá - mang ý nghĩa tài lộc, may mắn, hanh thông cho sao được hoá.',
  'Hoá Quyền': 'Một trong Tứ Hoá - mang ý nghĩa quyền lực, khả năng chỉ huy, quyết đoán.',
  'Hoá Khoa': 'Một trong Tứ Hoá - mang ý nghĩa danh tiếng, học vấn, thi cử thuận lợi.',
  'Hoá Kỵ': 'Một trong Tứ Hoá - mang ý nghĩa trở ngại, thị phi, cần lưu ý đề phòng.',
  'Lộc Tồn': 'Sao tài lộc bền vững, chủ về của cải tích lũy ổn định lâu dài.',
  'Kình Dương': 'Sát tinh, chủ về hình thương, tranh đấu, tính nóng nảy, quyết liệt.',
  'Đà La': 'Sát tinh, chủ về trì trệ, vòng vo, dễ gặp cản trở phải đi đường dài mới đến đích.',
  'Thiên Khôi': 'Sao quý nhân (ban ngày), chủ về được người khác giúp đỡ, nâng đỡ trong công việc.',
  'Thiên Việt': 'Sao quý nhân (ban đêm), chủ về được người khác giúp đỡ một cách âm thầm, kín đáo.',
  'Văn Xương': 'Sao văn chương - khoa bảng, chủ về học vấn, thi cử, văn bút.',
  'Văn Khúc': 'Sao văn chương - tài năng, chủ về ăn nói, nghệ thuật, đa tài.',
  'Tả Phù': 'Sao phụ tá, chủ về được người khác hỗ trợ, hợp tác tốt, có quý nhân phù trợ.',
  'Hữu Bật': 'Sao phụ tá, chủ về được giúp đỡ kín đáo, quan hệ rộng, nhiều bạn hữu.',
  'Địa Không': 'Sát tinh, chủ về hao tán, ảo tưởng, dễ mất mát về tinh thần / vật chất bất ngờ.',
  'Địa Kiếp': 'Sát tinh, chủ về hao tổn, biến cố bất ngờ, hành động bốc đồng.',
  'Thiên Mã': 'Sao di chuyển, chủ về đi xa, thay đổi nơi ở/công việc, năng động.',
  'Đào Hoa': 'Sao duyên dáng, chủ về ngoại hình thu hút, dễ có duyên tình cảm.',
  'Hồng Loan': 'Sao hôn nhân - duyên tình, chủ về tình cảm, hỷ sự, cưới hỏi.',
  'Hoa Cái': 'Sao nghệ thuật - tôn giáo, chủ về năng khiếu nghệ thuật, tâm linh, dễ cô độc về tinh thần.',
  'Long Trì': 'Sao quý cách, chủ về thông minh, có uy tín, đường công danh thuận lợi.',
  'Phượng Các': 'Sao quý cách, chủ về tài năng nghệ thuật, ngoại hình thanh tú.',
  'Thiên Khốc': 'Sao buồn bã, chủ về tâm sự u buồn, dễ gặp chuyện thương tâm.',
  'Thiên Hư': 'Sao hư hao, chủ về tổn thất tinh thần, dễ thất vọng, hư danh.',
  'Tuần': 'Vùng "không vong" - các sao đóng tại đây thường giảm tác dụng hoặc biến đổi tính chất.',
  'Triệt': 'Vùng "không vong" - tương tự Tuần, làm chậm hoặc cắt giảm tác dụng của các sao đồng cung.',
  'Thái Tuế': 'Sao của năm sinh, chủ về các vấn đề liên quan đến pháp lý, giấy tờ, quan hệ với "bề trên".',
  'Tang Môn': 'Sao chủ về tang chế, buồn phiền, hao tổn tình cảm.',
  'Bạch Hổ': 'Sao chủ về thương tích, tai nạn, kiện tụng.',
  'Thiên Hình': 'Sao chủ về kỷ luật, pháp luật, hình phạt; cũng có thể là sao của người làm luật/quân đội.',
  'Thiên Riêu': 'Sao chủ về tình cảm lãng mạn, đôi khi liên quan đến các mối quan hệ không chính thức.',
  'Cô Thần': 'Sao chủ về sự cô độc, ít anh em/người thân bên cạnh.',
  'Quả Tú': 'Sao chủ về sự cô độc (thường xét cho nữ), tương tự Cô Thần.',
  'Kiếp Sát': 'Sát tinh, chủ về hao tổn do người khác hoặc tai nạn bất ngờ.',
  'Phá Toái': 'Sao chủ về sự đổ vỡ, hao tổn nhỏ lặt vặt.',
  'Thiên Đức': 'Sao phúc đức, chủ về được che chở, hoá giải tai ương.',
  'Nguyệt Đức': 'Sao phúc đức (âm), chủ về phúc lành từ nữ giới/gia đình.',
  'Thiên Quan': 'Sao quý cách, chủ về quan chức, địa vị.',
  'Thiên Phúc': 'Sao phúc lành, chủ về được hưởng lộc, ít gặp hoạ.',
  'Quốc Ấn': 'Sao quan chức, chủ về ấn tín, quyền hành chính danh.',
  'Đường Phù': 'Sao hỗ trợ quan chức, đi kèm Quốc Ấn, chủ về thăng tiến.',
  'Thiên Y': 'Sao y dược, chủ về duyên với nghề y hoặc sức khoẻ cần lưu ý.',
  'Thiên Giải': 'Sao hoá giải, chủ về gặp khó nhưng có người giúp gỡ rối.',
  'Địa Giải': 'Sao hoá giải (mặt đất), tương tự Thiên Giải, giúp giảm nhẹ hung hoạ.',
  'Đại Hao': 'Sao hao tổn lớn về tiền bạc/sức lực.',
  'Tiểu Hao': 'Sao hao tổn nhỏ, lặt vặt nhưng thường xuyên.',
  'Hoả Tinh': 'Sát tinh, chủ về nóng nảy, bộc phát, dễ gặp việc bất ngờ mang tính "lửa".',
  'Linh Tinh': 'Sát tinh, chủ về âm ỉ, dai dẳng, ám muội khó lường.',
  'Thai Phụ': 'Sao hỗ trợ, chủ về văn thư, trang sức, làm đẹp.',
  'Phong Cáo': 'Sao hỗ trợ, đi kèm Thai Phụ, chủ về sắc đẹp, danh giá.',
  'Văn Tinh': 'Sao văn chương phụ, hỗ trợ thêm cho khoa cử, học hành.',
  'Thiên Trù': 'Sao ăn uống - hưởng thụ, chủ về cuộc sống sung túc về vật chất.',
};

// Xuất ra để các file khác dùng (môi trường browser dùng biến toàn cục;
// nếu chạy bằng Node để test thì export thêm qua module.exports)
if (typeof module !== 'undefined') {
  module.exports = {
    CAN, CHI, CHI_GRID_POS, mod12, mod10, chiIdx, canIdx,
    CUC_TABLE, CUC_NAME, CUC_HANH,
    TUVI_GROUP_OFFSET, THIENPHU_GROUP_OFFSET, CHINH_TINH_LIST,
    TRUONGSINH_START_BY_CUC, TRUONGSINH_STARS,
    LOCTON_BY_CAN, BACSI_STARS,
    THAITUE_STARS,
    TUHOA_TABLE, TUHOA_LABEL,
    DALA_BY_CAN, KINHDUONG_BY_CAN, LUUHA_BY_CAN, QUOCAN_BY_CAN, DUONGPHU_BY_CAN,
    VANTINH_BY_CAN, THIENKHOI_BY_CAN, THIENVIET_BY_CAN, THIENQUAN_BY_CAN,
    THIENPHUC_BY_CAN, THIENTRU_BY_CAN, TRIET_BY_CAN,
    getTuanCungs,
    PHUONGCAC_BY_CHI, GIAITHAN_BY_CHI, LONGTRI_BY_CHI, NGUYETDUC_BY_CHI, THIENDUC_BY_CHI,
    THIENHY_BY_CHI, THIENMA_BY_CHI, THIENKHOC_BY_CHI, THIENHU_BY_CHI, DAOHOA_BY_CHI,
    HONGLOAN_BY_CHI, HOACAI_BY_CHI, KIEPSAT_BY_CHI, PHATOAI_BY_CHI, COTHAN_BY_CHI, QUATU_BY_CHI,
    TAPHU_BY_MONTH, HUUBAT_BY_MONTH, THIENHINH_BY_MONTH, THIENRIEU_BY_MONTH, THIENY_BY_MONTH,
    THIENGIAI_BY_MONTH, DIAGIAI_BY_MONTH,
    VANXUONG_BY_HOUR, VANKHUC_BY_HOUR, DIAKHONG_BY_HOUR, DIAKIEP_BY_HOUR, THAIPHU_BY_HOUR, PHONGCAO_BY_HOUR,
    HOATINH_LINHTINH_GROUPS,
    PALACE_NAMES_FROM_MENH, MENHCHU_BY_CHI,
    STAR_GROUP, STAR_MEANING,
  };
}
