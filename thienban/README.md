# 🔮 Tra Cứu Lá Số Tử Vi Đẩu Số

Web app tra cứu lá số Tử Vi Đẩu Số — **100% HTML/CSS/JavaScript thuần**, không
framework, không cần cài đặt hay máy chủ. Mở file `index.html` là dùng được ngay.

---

## 🚀 Cách sử dụng

1. Mở file **`index.html`** bằng trình duyệt (Chrome, Edge, Firefox, Safari...).
   - Có thể double‑click file, hoặc kéo thả vào trình duyệt.
2. Điền **Họ tên, ngày/tháng/năm sinh (Dương lịch), giới tính**.
   Giờ sinh là tuỳ chọn — nếu không rõ, tích **"Không rõ giờ sinh"** (hệ thống
   sẽ dùng giờ Ngọ làm mặc định và hiển thị cảnh báo "kết quả tham khảo").
3. Bấm **"🔮 Tra cứu lá số"**.
4. **Bấm vào tên một sao** bất kỳ trong lá số để xem giải nghĩa ngắn.
5. Bấm **"🖨️ In lá số / Xuất PDF"** → dùng hộp thoại in của trình duyệt,
   chọn "Lưu thành PDF" (Save as PDF) để xuất file.
6. Muốn xem demo ngay: bấm **"📋 Dùng dữ liệu mẫu để xem demo"**.

Toàn bộ tính toán chạy **hoàn toàn trên máy của bạn** (client-side) — không gửi
dữ liệu đi đâu cả.

---

## ✅ Tính năng đã triển khai

- **Đổi Dương ↔ Âm lịch** chính xác bằng công thức thiên văn (New Moon, Sun
  Longitude) — đúng cho năm **1900–2100**, bao gồm cả tháng nhuận.
- Tính **Can–Chi** của Năm / Tháng / Ngày / Giờ sinh.
- Xác định **Cung Mệnh, Cung Thân, Cục** (Thuỷ Nhị / Mộc Tam / Kim Tứ / Thổ Ngũ
  / Hoả Lục).
- An đầy đủ **14 Chính tinh** (Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng,
  Liêm Trinh, Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương,
  Thất Sát, Phá Quân).
- An các **vòng sao**:
  - Vòng Trường Sinh (12 sao, theo Cục + Âm Dương Nam/Nữ)
  - Vòng Lộc Tồn + Bác Sĩ (12 sao) + Kình Dương, Đà La
  - Vòng Thái Tuế (12 sao/nhóm)
- An **Tứ Hoá** (Hoá Lộc/Quyền/Khoa/Kỵ) theo Thiên Can năm sinh, gắn nhãn màu
  trực tiếp lên sao tương ứng.
- An **Tuần Không, Triệt Không** (đánh dấu cung).
- An hơn **30 phụ tinh khác** theo Thiên Can / Địa Chi tuổi, theo tháng sinh,
  theo giờ sinh: Thiên Khôi, Thiên Việt, Văn Xương, Văn Khúc, Tả Phù, Hữu Bật,
  Thiên Mã, Đào Hoa, Hồng Loan, Long Trì, Phượng Các, Hoả Tinh, Linh Tinh, Địa
  Không, Địa Kiếp, Thiên Hình, Thiên Riêu, Cô Thần, Quả Tú, Hoa Cái, Kiếp Sát,
  Phá Toái, Thiên Đức, Nguyệt Đức, Thiên Quan, Thiên Phúc, Quốc Ấn, Đường Phù,
  Thiên Y, Thiên Giải, Địa Giải, Thai Phụ, Phong Cáo, Văn Tinh, Thiên Trù,
  Thiên Khốc, Thiên Hư...
- **Đại Hạn** (vận 10 năm) cho mỗi cung.
- Giao diện **Thiên Bàn** trung tâm: họ tên, ngày sinh Dương/Âm, giờ sinh,
  giới tính, Can–Chi Năm/Tháng/Ngày/Giờ, Cục, Âm Dương, Mệnh chủ, Sao chủ Cục.
- **Tooltip giải nghĩa** khi bấm vào tên sao (~60 sao có giải nghĩa riêng,
  các sao còn lại có giải nghĩa chung theo nhóm).
- **Responsive** (cuộn ngang trên màn hình nhỏ) + **In/Xuất PDF**.
- Validate input (ngày tháng không hợp lệ, năm ngoài 1900–2100...).

---

## 🧪 Đã kiểm thử

Bộ quy tắc an sao dựa theo hướng dẫn chi tiết tại
`tracuutuvi.com/an-sao-tu-vi.html`, và đã được **đối chiếu khớp 100%** với
2 lá số mẫu (đính kèm) ở các tiêu chí: Âm lịch, Can–Chi Năm/Tháng/Ngày/Giờ,
Cung Mệnh, Cung Thân, Cục, toàn bộ 14 Chính tinh, Tứ Hoá, Tuần/Triệt.

Chạy lại kiểm thử:
```bash
node tests/test_engine.js   # in toàn bộ lá số 2 ví dụ ra console
node tests/test_render.js   # test HTML sinh ra + các trường hợp biên
```

---

## ⚠️ Phạm vi & lưu ý quan trọng

- **"Thân chủ"** và bảng **Miếu/Vượng/Đắc/Hãm/Bình** của 14 chính tinh
  **chưa được đưa vào** — đây là các bảng phụ không nằm trong hướng dẫn
  an-sao-tu-vi.html, và để tránh hiển thị sai dữ liệu khi không chắc chắn
  100%, hệ thống tạm bỏ qua. Có thể bổ sung dễ dàng trong `data.js`
  (xem mục "Mở rộng" dưới đây).
- **"Mệnh chủ"** dùng bảng tham khảo phổ biến theo Chi cung Mệnh — một vài lá
  số có thể khác biệt nhỏ tuỳ trường phái.
- Phạm vi năm sinh: **1900–2100** (giới hạn độ chính xác của thuật toán đổi
  lịch Âm-Dương).
- Đây là công cụ tham khảo văn hoá truyền thống, không phải lời khuyên
  chuyên môn.

---

## 📁 Cấu trúc file

```
tuvi-app/
├── index.html      # Cấu trúc trang + form nhập liệu
├── style.css       # Giao diện (tông tím - vàng - đỏ truyền thống)
├── lunar.js        # Chuyển đổi Dương lịch <-> Âm lịch
├── data.js         # TOÀN BỘ bảng tra cứu (Can/Chi, Cục, vị trí sao...)
├── engine.js       # Bộ máy an sao - tính toán lá số đầy đủ
├── app.js          # Giao diện: form, render lưới, tooltip, in ấn
├── README.md
└── tests/
    ├── test_engine.js   # Test engine với 2 lá số mẫu
    └── test_render.js   # Test HTML output + edge cases
```

**Thứ tự load script** (trong `index.html`): `lunar.js` → `data.js` →
`engine.js` → `app.js`.

---

## 🔧 Mở rộng / Tuỳ biến

- **Thêm sao mới**: thêm bảng tra trong `data.js`, gọi `addStar(...)` trong
  `engine.js`. Muốn sao mới có tooltip riêng → thêm vào `STAR_MEANING`; muốn
  đổi màu nhóm → thêm vào `STAR_GROUP` (`'chinh' | 'tot' | 'xau' | 'vong'`).
- **Đổi màu/giao diện**: toàn bộ màu sắc nằm ở các biến CSS `:root` đầu file
  `style.css` (ví dụ `--purple`, `--gold`, `--c-loc`, `--c-ky`...).
- **Đổi layout 12 cung**: chỉnh `CHI_GRID_POS` trong `data.js` (toạ độ hàng/cột
  trong lưới 4x4).
- **Thêm Tiểu Hạn / lưu niên**: có thể dùng lại `THAITUE_STARS` + Can/Chi của
  năm xem hạn, theo cùng cách `engine.js` đang xử lý vòng Thái Tuế.
