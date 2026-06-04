/* ============================================================
   van-khan-data.js — 24 bài văn khấn mẫu truyền thống Việt Nam
   Lịch Việt Nam 888
   ============================================================ */

var VAN_KHAN_DATA = [

  /* 1 ---- Cúng Gia Tiên Ngày Rằm / Mùng 1 */
  {
    id: 1, slug: 'gia-tien-ram-mung-1',
    title: 'Cúng Gia Tiên Ngày Rằm / Mùng 1',
    category: 'Gia Tiên',
    description: 'Văn khấn cúng gia tiên vào ngày Rằm hoặc Mùng Một hàng tháng, thể hiện lòng thành kính với tổ tiên.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy các ngài Thần Linh, Thổ Địa cai quản trong xứ này.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, Thúc Bá Đệ Huynh, Cô Di Tỷ Muội họ nội họ ngoại.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là ngày {{ngayAmLich}}, nhân tiết {{ngayDuong}}, tín chủ con thành tâm sắm sửa hương hoa, lễ vật, trà quả bày lên trước án, kính mời:

Chư vị Gia Tiên nội ngoại họ {{hoTen}} cùng về hưởng lễ.

Cúi xin các ngài phù hộ độ trì cho toàn gia quyến chúng con mạnh khoẻ bình an, gia đạo hưng thịnh, phúc thọ song toàn, công việc hanh thông, vạn sự như ý.

Tín chủ con lễ bạc tâm thành, trước án kính lễ, cúi xin được phù hộ độ trì.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Hương, hoa tươi, trà, rượu, nước, trái cây, bánh kẹo, tiền vàng mã.'
  },

  /* 2 ---- Cúng Giỗ */
  {
    id: 2, slug: 'cung-gio',
    title: 'Cúng Giỗ (Kỵ Nhật)',
    category: 'Gia Tiên',
    description: 'Văn khấn cúng giỗ người đã khuất vào ngày kỵ nhật hàng năm.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong', 'tenOngBa', 'moiQuanHe'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là ngày {{ngayAmLich}}, nhằm ngày {{ngayDuong}} — chính kỵ nhật của {{moiQuanHe}} là cụ {{tenOngBa}}.

Tín chủ con cùng toàn thể gia quyến thành tâm sắm sửa lễ vật, hương hoa, cơm canh, trà quả, trình bày trước án, kính cẩn cung thỉnh:

{{moiQuanHe}} {{tenOngBa}} cùng chư vị Hương Linh nội ngoại về hưởng lễ.

Cúi xin {{moiQuanHe}} chứng giám tấm lòng thành kính của con cháu, phù hộ độ trì cho toàn gia quyến mạnh khoẻ, bình an, làm ăn phát đạt, con cháu thành đạt học hành tấn tới.

Thụ hưởng lễ vật xong, cúi xin {{moiQuanHe}} về nơi an nghỉ.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Mâm cơm mặn hoặc chay tùy gia đình, hương, hoa, rượu, nước, trái cây, tiền vàng mã.'
  },

  /* 3 ---- Cúng Giao Thừa Ngoài Trời */
  {
    id: 3, slug: 'giao-thua-ngoai-troi',
    title: 'Cúng Giao Thừa Ngoài Trời',
    category: 'Lễ Tết',
    description: 'Văn khấn lễ trừ tịch (giao thừa) cúng ngoài trời, tiễn quan Hành Khiển cũ đón quan mới.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy ngài Đương Niên Hành Khiển, ngài Đương Niên Hành Binh Chi Thần.
Kính lạy các ngài Ngũ Phương, Ngũ Thổ Long Mạch Tôn Thần.
Kính lạy các ngài Tiền Hậu Địa Chủ Tài Thần.

Hôm nay là đêm {{ngayDuong}} — Đêm Trừ Tịch, giờ Tý phút giao thừa.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Năm cũ sắp qua, năm mới sắp đến. Chúng con thành tâm sắm lễ, hương hoa trà quả, thắp nén tâm hương dâng lên trước án.

Cung kính tiễn quan Đương Niên Hành Khiển năm cũ, đón rước quan Đương Niên Hành Khiển năm mới cùng chư vị Tôn Thần giáng lâm trước án, chứng giám lòng thành.

Cúi xin chư vị Tôn Thần phù hộ độ trì cho gia đình chúng con trong năm mới: sức khoẻ dồi dào, phúc lộc thọ đầy đủ, vạn sự hanh thông, gia đạo bình an.

Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật ngoài trời: Gà trống luộc (hoặc con vật khác), xôi, bánh chưng, hoa quả, hương, đèn nến, tiền vàng mã, rượu. Bày mâm lễ ở sân trước hướng ra cổng.'
  },

  /* 4 ---- Cúng Giao Thừa Trong Nhà */
  {
    id: 4, slug: 'giao-thua-trong-nha',
    title: 'Cúng Giao Thừa Trong Nhà',
    category: 'Lễ Tết',
    description: 'Văn khấn lễ trừ tịch cúng trong nhà trước bàn thờ gia tiên.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Bản Gia Tiên Sư, Bản Gia Thổ Công.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là đêm {{ngayDuong}} — Đêm Giao Thừa thiêng liêng.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Tín chủ con thành tâm sắm lễ: hương hoa, trà quả, cơm canh, bánh chưng bày lên trước án, kính cẩn cung thỉnh chư vị Thần Linh, Gia Tiên về hưởng lễ giao thừa.

Năm cũ vừa qua, năm mới vừa đến, chúng con thành tâm tạ ơn chư vị đã phù hộ trong suốt năm qua, đồng thời cầu xin chư vị tiếp tục gia hộ trong năm mới:

Gia đình bình an mạnh khoẻ, công việc hanh thông thuận lợi, tài lộc dồi dào, vạn sự như ý.

Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật trong nhà: Mâm cỗ mặn hoặc chay, hoa đào/mai, mứt tết, bánh chưng/bánh tét, hương, đèn nến, tiền vàng mã, rượu/nước.'
  },

  /* 5 ---- Mùng 1 Tết Nguyên Đán */
  {
    id: 5, slug: 'mung-1-tet',
    title: 'Cúng Mùng 1 Tết Nguyên Đán',
    category: 'Lễ Tết',
    description: 'Văn khấn ngày mùng 1 Tết, cầu chúc năm mới an lành thịnh vượng.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Bản Cảnh Thành Hoàng, ngài Bản Xứ Thổ Địa Tôn Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Tổ Tiên nội ngoại họ {{hoTen}}.

Hôm nay là ngày {{ngayAmLich}} — Mùng Một Tết Nguyên Đán {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Nhân ngày đầu xuân năm mới, tín chủ con thành tâm sắm sửa hương hoa, lễ vật dâng lên trước án, kính mời chư vị Tôn Thần, Gia Tiên về hưởng xuân cùng gia đình.

Cúi xin chư vị chứng giám lòng thành, phù hộ độ trì cho gia đình chúng con trong năm mới:

Sức khoẻ dồi dào, bình an hạnh phúc, công danh sự nghiệp thăng tiến, tài lộc phong phú, gia đạo hưng vượng, vạn sự như ý, năm mới tốt lành hơn năm cũ.

Chúng con lễ bạc tâm thành, cúi xin phù hộ độ trì.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Mâm ngũ quả, bánh chưng/bánh tét, xôi gấc, gà luộc, hoa tươi, hương, đèn nến, tiền vàng mã, rượu, trà.'
  },

  /* 6 ---- Mùng 2 Tết - Tiễn Ông Bà */
  {
    id: 6, slug: 'mung-2-tien-ong-ba',
    title: 'Cúng Mùng 2 Tết — Tiễn Ông Bà',
    category: 'Lễ Tết',
    description: 'Văn khấn ngày mùng 2 Tết tiễn đưa ông bà tổ tiên về nơi an nghỉ sau khi về ăn Tết.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh nội ngoại.

Hôm nay là ngày {{ngayAmLich}} — Mùng Hai Tết Nguyên Đán {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Tín chủ con thành tâm sắm lễ, hương hoa trà quả dâng lên trước án. Nhân ngày mùng Hai Tết, tín chủ con kính cẩn tiễn đưa chư vị Gia Tiên đã về vui Tết cùng con cháu, nay trở về nơi an nghỉ.

Cúi xin chư vị Gia Tiên nhận lời tiễn biệt của con cháu, tiếp tục phù hộ độ trì cho gia đình năm mới: thuận buồm xuôi gió, mọi sự hanh thông, con cháu hiếu thảo thành đạt.

Cúi xin chư vị Thần Linh chứng giám, gia hộ cho gia đình chúng con.

Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Hương, hoa, trà quả, bánh kẹo, tiền vàng mã. Sau lễ thì hóa vàng tiễn ông bà.'
  },

  /* 7 ---- Mùng 3 Hóa Vàng */
  {
    id: 7, slug: 'mung-3-hoa-vang',
    title: 'Cúng Mùng 3 Tết — Hóa Vàng',
    category: 'Lễ Tết',
    description: 'Văn khấn ngày mùng 3 Tết khi hóa vàng kết thúc dịp Tết Nguyên Đán.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là ngày {{ngayAmLich}} — Mùng Ba Tết, nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Tín chủ con thành tâm sắm lễ, hương hoa vàng mã, dâng lên trước án. Ba ngày Tết sum vầy đã qua, tín chủ con kính cẩn kính lễ chư vị Gia Tiên, xin phép hóa vàng mã — lễ vật kính dâng trong ba ngày Tết.

Cúi xin chư vị Gia Tiên, chư vị Tôn Thần chứng giám tấm lòng thành kính của con cháu, nhận những phẩm vật dâng lên.

Phù hộ độ trì cho gia đình năm mới: vạn sự như ý, gia đạo hưng thịnh, con cháu thành tài, làm ăn phát đạt, bình an hạnh phúc.

Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Hương, hoa, trà, mâm cúng ngày Tết, vàng mã (đốt sau khi lễ xong).'
  },

  /* 8 ---- Rằm Tháng Giêng */
  {
    id: 8, slug: 'ram-thang-gieng',
    title: 'Cúng Rằm Tháng Giêng (Nguyên Tiêu)',
    category: 'Lễ Tết',
    description: 'Văn khấn lễ Rằm tháng Giêng — Tết Nguyên Tiêu, lễ quan trọng nhất trong năm.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Đức Phật A Di Đà cùng chư vị Phật, Bồ Tát.
Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Bản Cảnh Thành Hoàng, Bản Xứ Thổ Địa Tôn Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ chư vị Hương Linh.

Hôm nay là ngày Rằm tháng Giêng ({{ngayAmLich}}) — Tết Nguyên Tiêu, nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Tín chủ con thành tâm sắm sửa hương hoa, trà quả, bánh trôi, đèn nến dâng lên trước án.

Nhân ngày Rằm đầu năm, tín chủ con kính cẩn cung thỉnh Đức Phật, chư vị Tôn Thần, Gia Tiên về hưởng lễ, chứng giám lòng thành.

Cúi xin chư vị phù hộ độ trì: năm mới bình an, khoẻ mạnh, công danh sự nghiệp thăng tiến, gia đạo hưng thịnh, phúc lộc thọ đủ đầy.

Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Bánh trôi nước, chè, xôi, gà luộc (hoặc đồ chay), hoa tươi, hương, đèn nến, tiền vàng mã, trái cây, rượu.'
  },

  /* 9 ---- Thanh Minh */
  {
    id: 9, slug: 'thanh-minh',
    title: 'Cúng Thanh Minh (Tảo Mộ)',
    category: 'Lễ Tết',
    description: 'Văn khấn ngày Thanh Minh khi đi tảo mộ, thắp hương cho tổ tiên.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong', 'tenOngBa'],
    optionalFields: ['tenVo', 'moiQuanHe'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Sơn Thần, Thổ Địa, Thổ Công, Long Mạch cai quản nơi đây.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ và {{moiQuanHe}} {{tenOngBa}}.

Hôm nay là ngày Thanh Minh ({{ngayAmLich}}), nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Nhân tiết Thanh Minh, tín chủ con cùng con cháu về đây thăm viếng, quét tước phần mộ của chư vị Gia Tiên, dâng lên hương hoa trà quả, lễ vật để tỏ lòng thành kính và nhớ ơn tổ tiên.

Cúi xin chư vị Sơn Thần Thổ Địa phù hộ cho phần mộ yên lành, xanh tươi, không bị xâm phạm.

Cúi xin Gia Tiên chứng giám tấm lòng hiếu thảo của con cháu, phù hộ cho gia đình mạnh khoẻ, bình an, làm ăn thuận lợi, con cháu học hành thành đạt.

Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật tảo mộ: Hương, hoa tươi (cúc vàng, huệ trắng), tiền vàng mã, rượu, nước, trái cây, bánh kẹo. Chuẩn bị thêm dụng cụ dọn dẹp mộ phần.'
  },

  /* 10 ---- Đoan Ngọ */
  {
    id: 10, slug: 'doan-ngo',
    title: 'Cúng Đoan Ngọ (Mùng 5 Tháng 5)',
    category: 'Lễ Tết',
    description: 'Văn khấn Tết Đoan Ngọ mùng 5 tháng 5 âm lịch, cúng diệt sâu bọ cầu bình an.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Bản Cảnh Thành Hoàng, Bản Xứ Thổ Địa Tôn Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là ngày Tết Đoan Ngọ, mùng 5 tháng 5 ({{ngayAmLich}}), nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Nhân tiết Đoan Ngọ, tín chủ con thành tâm sắm lễ: hương hoa, rượu nếp, bánh tro, hoa quả, dâng lên trước án kính mời chư vị Tôn Thần và Gia Tiên về hưởng lễ.

Cúi xin chư vị Tôn Thần phù hộ cho gia đình chúng con: sức khoẻ dồi dào, vượt qua tháng hè nóng nực, trừ bỏ sâu bọ bệnh tật, gia đình bình an hạnh phúc.

Cúi xin chư vị Gia Tiên phù hộ con cháu học hành công việc thuận lợi, mọi sự như ý.

Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Rượu nếp, bánh tro (bánh ú), cơm rượu, quả mận, vải, đào, hương, nến, tiền vàng mã.'
  },

  /* 11 ---- Vu Lan */
  {
    id: 11, slug: 'vu-lan',
    title: 'Cúng Rằm Tháng 7 — Lễ Vu Lan',
    category: 'Lễ Tết',
    description: 'Văn khấn lễ Vu Lan Rằm tháng 7, báo hiếu cha mẹ và cầu siêu cho vong hồn.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Đức Phật A Di Đà, Đức Phật Thích Ca Mâu Ni, Đức Địa Tạng Vương Bồ Tát.
Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh nội ngoại.
Kính lạy các vong hồn cô hồn không nơi nương tựa.

Hôm nay là Rằm tháng Bảy — Lễ Vu Lan Báo Hiếu ({{ngayAmLich}}), nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Nhân mùa Vu Lan, tín chủ con thành tâm sắm sửa hương hoa, lễ vật dâng lên trước án để bày tỏ lòng biết ơn và kính nhớ công ơn sinh thành dưỡng dục của cha mẹ, ông bà tổ tiên.

Cúi xin Đức Phật từ bi gia hộ cho tất cả chúng sinh được siêu thoát. Cúi xin chư vị Gia Tiên phù hộ cho gia đình bình an, khoẻ mạnh, con cháu hiếu thảo.

Chúng con thành tâm cầu nguyện cho các cô hồn được no đủ, siêu thoát về cõi lành.

Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Mâm cỗ chay hoặc mặn, bánh kẹo, bỏng ngô, cháo trắng (cúng cô hồn), hoa sen, hương, đèn nến, tiền vàng mã, quần áo giấy.'
  },

  /* 12 ---- Trung Thu */
  {
    id: 12, slug: 'trung-thu',
    title: 'Cúng Rằm Tháng 8 — Tết Trung Thu',
    category: 'Lễ Tết',
    description: 'Văn khấn Tết Trung Thu Rằm tháng 8, lễ cầu bình an và sum vầy gia đình.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Bản Cảnh Thành Hoàng, Bản Xứ Thổ Địa Tôn Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là Rằm tháng Tám — Tết Trung Thu ({{ngayAmLich}}), nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Nhân tiết Trung Thu trăng tròn, gia đình sum vầy, tín chủ con thành tâm sắm lễ: bánh Trung Thu, hoa quả, hương đèn dâng lên trước án, kính mời chư vị Tôn Thần và Gia Tiên về chứng giám.

Cúi xin chư vị Tôn Thần, Gia Tiên phù hộ cho toàn gia quyến: sức khoẻ bình an, gia đình hạnh phúc sum vầy, công việc hanh thông, con cháu học hành giỏi giang thành đạt.

Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Bánh Trung Thu, mâm ngũ quả (bưởi, hồng, chuối, na, táo), đèn lồng, hương, nến.'
  },

  /* 13 ---- Ông Công Ông Táo */
  {
    id: 13, slug: 'ong-cong-ong-tao',
    title: 'Cúng Ông Công Ông Táo (23 tháng Chạp)',
    category: 'Lễ Tết',
    description: 'Văn khấn tiễn Táo Quân về trời ngày 23 tháng Chạp âm lịch.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân — Ông Táo cai quản bếp lửa.
Kính lạy Thổ Công — Ông Địa cai quản đất đai.
Kính lạy Thổ Kỳ Thần Nữ — Bà Táo.

Hôm nay là ngày 23 tháng Chạp ({{ngayAmLich}}), nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Tín chủ con thành tâm sắm sửa: hương hoa, mũ áo, cá chép, lễ vật dâng lên trước án, thành tâm kính lễ.

Nhân ngày ông Táo về trời, tín chủ con kính thỉnh ngài Táo Quân nhận lễ vật mang theo, đem những điều tốt đẹp trong năm của gia đình tâu lên Thiên Đình, xin Ngọc Hoàng Thượng Đế gia ân phù hộ:

Năm mới gia đình bình an khoẻ mạnh, công việc làm ăn thuận lợi, tài lộc dồi dào, con cháu ngoan ngoãn học giỏi.

Cúi xin ngài Táo Quân chứng giám và phù hộ.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Mũ Táo Quân (1 mũ đàn ông, 1 mũ đàn bà), cá chép sống (thả sông sau lễ), tiền vàng mã, hoa quả, hương, nến, kẹo, xôi. Cúng trước 12h trưa ngày 23 tháng Chạp.'
  },

  /* 14 ---- Tất Niên */
  {
    id: 14, slug: 'tat-nien',
    title: 'Cúng Tất Niên (Cuối Năm)',
    category: 'Lễ Tết',
    description: 'Văn khấn cúng Tất Niên, tổng kết năm cũ và chuẩn bị đón năm mới.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Bản Cảnh Thành Hoàng, ngài Bản Xứ Thổ Địa Tôn Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là ngày {{ngayAmLich}} — ngày Cúng Tất Niên, nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Nhân ngày cuối năm, tín chủ con thành tâm sắm sửa lễ vật dâng lên trước án, tạ ơn chư vị Tôn Thần và Gia Tiên đã phù hộ suốt cả năm qua.

Năm cũ sắp qua, năm mới sắp đến, tín chủ con kính cẩn mời chư vị Gia Tiên về ăn Tết cùng con cháu.

Cúi xin chư vị chứng giám lòng thành, tiếp tục phù hộ trong năm mới: gia đình bình an hạnh phúc, sức khoẻ dồi dào, công danh thăng tiến, tài lộc phong phú, vạn sự như ý.

Chúng con lễ bạc tâm thành, kính cẩn dâng lên.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Mâm cỗ mặn đủ các món truyền thống, bánh chưng, mứt Tết, hoa đào/mai, hương, đèn nến, tiền vàng mã, rượu, trà.'
  },

  /* 15 ---- Nhập Trạch */
  {
    id: 15, slug: 'nhap-trach',
    title: 'Cúng Nhập Trạch (Dọn Vào Nhà Mới)',
    category: 'Nhà Mới',
    description: 'Văn khấn khi dọn vào nhà mới, cầu xin thần linh phù hộ cho ngôi nhà bình an.',
    requiredFields: ['tenChuNha', 'diaChiMoi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Đương Niên Hành Khiển, chư vị Bản Cảnh Thành Hoàng.
Kính lạy ngài Bản Xứ Thổ Địa Tôn Thần, Long Mạch Tôn Thần.
Kính lạy ngài Ngũ Phương Ngũ Thổ Phúc Đức Chính Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là ngày {{ngayAmLich}}, nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Từ nay ngụ tại ngôi nhà mới: {{diaChiMoi}}

Tín chủ con thành tâm sắm lễ, hương hoa trà quả, dâng lên trước án kính mời chư vị Tôn Thần và Gia Tiên về chứng giám buổi lễ nhập trạch hôm nay.

Kính xin chư vị Thần Linh cai quản vùng đất này chấp thuận cho gia đình chúng con được an cư lập nghiệp tại ngôi nhà mới.

Cúi xin chư vị Tôn Thần, Gia Tiên phù hộ độ trì: ngôi nhà bình an, không tai ương bệnh tật, gia đình hoà thuận hạnh phúc, công việc phát đạt, tài lộc vào nhà, vạn sự hanh thông.

Chúng con lễ bạc tâm thành, cúi xin được chứng giám và phù hộ.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Gà luộc, xôi, hoa quả, bánh, muối gạo, bếp than hồng (mang vào nhà trước), hương, đèn nến, tiền vàng mã, rượu. Mang theo bếp đỏ lửa khi vào nhà để rước lửa vào.'
  },

  /* 16 ---- Động Thổ */
  {
    id: 16, slug: 'dong-tho',
    title: 'Cúng Động Thổ (Khởi Công Xây Dựng)',
    category: 'Nhà Mới',
    description: 'Văn khấn lễ động thổ khi khởi công xây dựng nhà hoặc công trình mới.',
    requiredFields: ['tenChuNha', 'diaChi', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Bản Cảnh Thành Hoàng, chư vị Tôn Thần cai quản vùng đất này.
Kính lạy ngài Thổ Địa Long Mạch Tôn Thần.
Kính lạy ngài Ngũ Phương Ngũ Thổ Phúc Đức Chính Thần.

Hôm nay là ngày {{ngayAmLich}}, nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Địa chỉ khởi công: {{diaChi}}

Tín chủ con thành tâm sắm lễ, hương hoa trà quả, dâng lên trước án, thành tâm kính cẩn xin phép chư vị Thần Linh cai quản mảnh đất này.

Hôm nay là ngày lành tháng tốt, tín chủ con kính xin được phép động thổ, khởi công xây dựng công trình trên mảnh đất này.

Kính xin chư vị Thần Linh cho phép và phù hộ: công trình xây dựng thuận lợi, an toàn không tai nạn, công thợ khoẻ mạnh, vật liệu đầy đủ, hoàn thành đúng kế hoạch.

Sau khi hoàn thành, ngôi nhà bình an, gia chủ an cư lạc nghiệp, phúc lộc dồi dào.

Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Xôi, gà luộc, hoa quả, hương, đèn nến, tiền vàng mã, rượu. Gia chủ tự tay cuốc 3 nhát đầu tiên sau khi cúng xong.'
  },

  /* 17 ---- Khai Trương */
  {
    id: 17, slug: 'khai-truong',
    title: 'Cúng Khai Trương Cửa Hàng / Doanh Nghiệp',
    category: 'Khai Trương',
    description: 'Văn khấn lễ khai trương, cầu tài cầu lộc, mong buôn may bán đắt.',
    requiredFields: ['tenChuNha', 'diaChi', 'tenCuaHang', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Bản Cảnh Thành Hoàng, ngài Bản Xứ Thổ Địa Tôn Thần.
Kính lạy Thần Tài, Thổ Địa, Phúc Đức Chính Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là ngày {{ngayAmLich}}, nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Địa chỉ kinh doanh: {{diaChi}}
Tên cơ sở: {{tenCuaHang}}

Nhân ngày lành tháng tốt, tín chủ con thành tâm sắm sửa lễ vật: hương hoa, gà luộc, xôi, ngũ quả, trà rượu dâng lên trước án.

Kính xin chư vị Tôn Thần và Gia Tiên về chứng giám buổi lễ khai trương {{tenCuaHang}} hôm nay.

Cúi xin chư vị phù hộ: cửa hàng/doanh nghiệp buôn may bán đắt, khách hàng đông đúc, hàng hoá xuất nhập suôn sẻ, tài lộc vào như nước chảy, công việc ngày càng phát triển thịnh vượng, không tai ương hạn ách, nhân viên đoàn kết hoà thuận.

Chúng con lễ bạc tâm thành, kính cẩn dâng lên.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Gà luộc đỏ (gà trống), xôi đậu xanh hoặc gấc, ngũ quả (chọn quả có tên tốt: táo, dừa, đu đủ, xoài, sung), hoa cúc vàng, hương, đèn nến đỏ, tiền vàng mã, rượu/bia, kẹo bánh.'
  },

  /* 18 ---- Thôi Nôi Bé Trai */
  {
    id: 18, slug: 'thoi-noi-be-trai',
    title: 'Cúng Thôi Nôi Bé Trai',
    category: 'Thôi Nôi',
    description: 'Văn khấn lễ thôi nôi tròn 1 tuổi cho bé trai, cầu bình an khoẻ mạnh hay ăn chóng lớn.',
    requiredFields: ['tenChuNha', 'diaChi', 'tenCon', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Đức Ông, ngài Thổ Địa, ngài Táo Quân.
Kính lạy Mười Hai Bà Mụ và Đức Ông.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là ngày {{ngayAmLich}}, nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay tròn một năm kể từ ngày sinh của con trai {{tenCon}}, tín chủ con thành tâm sắm lễ: xôi chè, bánh trái, hoa quả, vàng mã dâng lên trước án.

Kính cẩn cảm tạ Mười Hai Bà Mụ đã nặn ra hình hài, ban phúc cho cháu trong suốt năm đầu đời; cảm tạ Đức Ông đã ghi sổ và phù hộ cháu hay ăn chóng lớn.

Cúi xin chư vị Tôn Thần và Gia Tiên tiếp tục phù hộ cháu {{tenCon}}: lớn lên khoẻ mạnh, thông minh sáng dạ, học giỏi tài cao, nhân cách tốt đẹp, hiếu thảo với cha mẹ, sau này thành người tài đức.

Cúi xin phù hộ cho gia đình bình an hạnh phúc.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Xôi đậu xanh (12 đĩa nhỏ cho 12 Bà Mụ), chè trôi nước (12 bát), gà luộc (xé thành 12 phần), bánh kem, hoa quả, hương, nến, tiền vàng mã, quần áo giấy.'
  },

  /* 19 ---- Thôi Nôi Bé Gái */
  {
    id: 19, slug: 'thoi-noi-be-gai',
    title: 'Cúng Thôi Nôi Bé Gái',
    category: 'Thôi Nôi',
    description: 'Văn khấn lễ thôi nôi tròn 1 tuổi cho bé gái, cầu bình an khoẻ mạnh.',
    requiredFields: ['tenChuNha', 'diaChi', 'tenCon', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Đức Ông, ngài Thổ Địa, ngài Táo Quân.
Kính lạy Mười Hai Bà Mụ và Đức Ông.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là ngày {{ngayAmLich}}, nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay tròn một năm kể từ ngày sinh của con gái {{tenCon}}, tín chủ con thành tâm sắm lễ: xôi chè, bánh trái, hoa quả, vàng mã dâng lên trước án.

Kính cẩn cảm tạ Mười Hai Bà Mụ đã nặn ra hình hài xinh đẹp, ban phúc cho cháu trong suốt năm đầu đời; cảm tạ Đức Ông đã ghi sổ và phù hộ cháu hay ăn ngoan ngủ tốt.

Cúi xin chư vị Tôn Thần và Gia Tiên tiếp tục phù hộ cháu {{tenCon}}: lớn lên khoẻ mạnh, xinh đẹp, thông minh nết na, học hành tấn tới, hiếu thảo với cha mẹ, sau này thành người tài đức vẹn toàn.

Cúi xin phù hộ cho toàn gia đình bình an hạnh phúc.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Xôi đậu xanh (12 đĩa nhỏ), chè trôi nước (12 bát), gà luộc, bánh kem, hoa quả, gương lược, kim chỉ (đồ của con gái), hương, nến, tiền vàng mã.'
  },

  /* 20 ---- Đầy Tháng */
  {
    id: 20, slug: 'day-thang',
    title: 'Cúng Đầy Tháng Em Bé',
    category: 'Thôi Nôi',
    description: 'Văn khấn cúng đầy tháng cho em bé mới sinh, cầu khoẻ mạnh bình an.',
    requiredFields: ['tenChuNha', 'diaChi', 'tenCon', 'gioiTinhCon', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy Mười Hai Bà Mụ và Đức Ông chứng giám.
Kính lạy ngài Thổ Địa, Táo Quân cai quản trong nhà.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là ngày {{ngayAmLich}}, nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay tròn một tháng kể từ ngày chào đời của {{gioiTinhConTen}} {{tenCon}}, tín chủ con thành tâm sắm lễ: xôi chè, bánh trái, hoa quả dâng lên trước án.

Kính cảm tạ Mười Hai Bà Mụ đã gìn giữ, nâng đỡ cháu trong tháng đầu đời, cảm tạ chư vị Tôn Thần đã phù hộ cho mẹ tròn con vuông.

Kính xin chư vị tiếp tục phù hộ cho cháu {{tenCon}}: hay ăn chóng lớn, ngủ ngon khoẻ mạnh, không ốm đau, lớn lên thông minh ngoan ngoãn.

Phù hộ cho người mẹ mau phục hồi sức khoẻ, gia đình bình an hạnh phúc.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Xôi nếp (3 màu: trắng, vàng, đỏ), chè trôi nước, gà luộc, bánh kẹo, hoa quả, hương, nến, tiền vàng mã. Mặc quần áo mới cho bé khi cúng.'
  },

  /* 21 ---- Cúng Xe Mới */
  {
    id: 21, slug: 'cung-xe-moi',
    title: 'Cúng Xe Mới (Xe Máy / Ô Tô)',
    category: 'Khai Trương',
    description: 'Văn khấn cúng xe mới, cầu đi đường bình an, không tai nạn.',
    requiredFields: ['tenChuNha', 'diaChi', 'bienSoXe', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Bản Cảnh Thành Hoàng, Bản Xứ Thổ Địa Tôn Thần.
Kính lạy chư vị Thần Linh cai quản đường sá, cầu cống.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là ngày {{ngayAmLich}}, nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay tín chủ con mua được chiếc xe mang biển số: {{bienSoXe}}

Tín chủ con thành tâm sắm lễ: hương hoa, trà quả, muối gạo, tiền vàng dâng lên trước án, kính mời chư vị Tôn Thần và Gia Tiên về chứng giám.

Kính xin chư vị phù hộ độ trì: mỗi khi ra đường, xe chạy êm ái, không hỏng hóc bất ngờ, đường đi thông suốt, tránh được tai nạn, bình an mọi nơi đến, may mắn mọi nẻo đường.

Xe đi đến đâu phúc lộc đến đó, tín chủ và gia đình bình an hạnh phúc.

Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Muối gạo (rải lên xe), hoa quả, hương, nến đỏ, tiền vàng mã. Rải muối gạo lên xe và xung quanh xe. Đốt vàng mã xong mới khởi động xe lần đầu.'
  },

  /* 22 ---- Đi Chùa */
  {
    id: 22, slug: 'di-chua',
    title: 'Văn Khấn Khi Đi Chùa',
    category: 'Chùa Đền',
    description: 'Văn khấn khi đến lễ Phật tại chùa, cầu bình an phúc lộc.',
    requiredFields: ['tenChuNha', 'diaChi', 'tenChua', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Đức Phật A Di Đà, Đức Phật Thích Ca Mâu Ni.
Kính lạy Đức Bồ Tát Quan Thế Âm.
Kính lạy Đức Bồ Tát Địa Tạng Vương.
Kính lạy Tam Bảo thường trụ tại {{tenChua}}.

Hôm nay là ngày {{ngayAmLich}}, nhằm ngày {{ngayDuong}}.

Con là: {{tenChuNha}}{{tenVoSuffix}}
Pháp danh / Ngụ tại: {{diaChi}}

Con về {{tenChua}} thành tâm dâng hương, lễ Phật, bày tỏ lòng thành kính và biết ơn đối với Tam Bảo.

Con xin quy y Phật, quy y Pháp, quy y Tăng. Xin sám hối những tội lỗi đã tạo ra do vô minh trong quá khứ.

Cầu xin Đức Phật từ bi gia hộ cho gia đình con: sức khoẻ bình an, tâm hồn thanh thản, công việc hanh thông, gia đạo thuận hoà, tai qua nạn khỏi.

Nguyện học theo hạnh Phật, sống tốt lành, làm điều thiện, tránh điều ác, tinh tấn tu học để cuộc đời ngày càng an lạc.

Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật: Hoa tươi (sen, huệ, cúc), hoa quả sạch, hương thơm, đèn nến trắng. Không dùng đồ mặn khi cúng Phật. Ăn mặc trang nghiêm, kín đáo khi vào chùa.'
  },

  /* 23 ---- Lễ Dạm Ngõ */
  {
    id: 23, slug: 'le-dam-ngo',
    title: 'Lễ Dạm Ngõ (Chạm Mặt)',
    category: 'Hôn Nhân',
    description: 'Văn khấn lễ dạm ngõ — buổi gặp mặt chính thức đầu tiên của hai gia đình.',
    requiredFields: ['tenChuNha', 'diaChi', 'tenCon', 'ngayDuong'],
    optionalFields: ['tenVo', 'tenChong'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Bản Cảnh Thành Hoàng, ngài Thổ Địa Tôn Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh.

Hôm nay là ngày {{ngayAmLich}}, nhằm ngày {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là ngày lành tháng tốt, gia đình chúng con tổ chức lễ Dạm Ngõ cho {{conTenDayDu}}.

Tín chủ con thành tâm sắm lễ dâng lên trước án gia tiên, kính cẩn thông báo với chư vị Gia Tiên về sự việc trọng đại này.

Kính xin chư vị Tôn Thần và Gia Tiên phù hộ: hai bên gia đình gặp gỡ thuận hoà, việc dạm ngõ diễn ra tốt đẹp, hai con {{tenCon}}{{tenChongSuffix}} sớm nên duyên vợ chồng, gia đình hai bên hoà thuận, hôn nhân hạnh phúc bền lâu.

Cúi xin chư vị chứng giám và phù hộ.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật nhà gái: Hương, hoa, trà, trầu cau, rượu. Nhà trai mang: Trầu cau, rượu, trà, hoa quả, bánh kẹo (theo phong tục địa phương).'
  },

  /* 24 ---- Lễ Ăn Hỏi */
  {
    id: 24, slug: 'le-an-hoi',
    title: 'Lễ Ăn Hỏi (Đính Hôn)',
    category: 'Hôn Nhân',
    description: 'Văn khấn lễ ăn hỏi — nghi lễ đính hôn chính thức trước khi cưới.',
    requiredFields: ['tenChuNha', 'diaChi', 'tenCon', 'tenChong', 'ngayDuong'],
    optionalFields: ['tenVo'],
    content: `Nam mô A Di Đà Phật! (3 lần)

Kính lạy Hoàng Thiên Hậu Thổ chư vị Tôn Thần.
Kính lạy ngài Bản Cảnh Thành Hoàng, ngài Thổ Địa Tôn Thần.
Kính lạy ngài Đông Trù Tư Mệnh Táo Phủ Thần Quân.
Kính lạy Cao Tằng Tổ Khảo, Cao Tằng Tổ Tỷ, chư vị Hương Linh nội ngoại.

Hôm nay là ngày {{ngayAmLich}}, nhằm ngày tốt lành {{ngayDuong}}.

Tín chủ con là: {{tenChuNha}}{{tenVoSuffix}}
Ngụ tại: {{diaChi}}

Hôm nay là ngày trọng đại — Lễ Ăn Hỏi của con là {{tenCon}}, kết duyên cùng {{tenChong}}.

Tín chủ con thành tâm sắm lễ vật dâng lên trước án, kính cẩn thưa trình với chư vị Gia Tiên về hôn sự này.

Cúi xin chư vị Tôn Thần và Gia Tiên chứng giám duyên lành của hai con, phù hộ: lễ ăn hỏi diễn ra suôn sẻ, hai bên gia đình hoà thuận vui vẻ, hôn nhân của {{tenCon}} và {{tenChong}} được trăm năm hạnh phúc, sớm sinh con đẻ cái, gia đình đầm ấm.

Chúng con lễ bạc tâm thành, cúi xin được phù hộ độ trì.
Nam mô A Di Đà Phật! (3 lần)`,
    note: 'Lễ vật ăn hỏi: Trầu cau (quan trọng nhất), bánh cốm, bánh đậu xanh, bánh hình heo quay (Miền Nam), xôi gấc, rượu, chè, mứt, hoa quả. Số lượng mâm lễ theo phong tục địa phương (6, 8 hoặc 10 mâm).'
  }

]; // end VAN_KHAN_DATA
