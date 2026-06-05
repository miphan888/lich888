// ══════════════════════════════════════════════════════
// TU-VI-LUAN-GIAI.JS — Dữ liệu luận giải Tử Vi Đẩu Số
// Dựa trên lý thuyết truyền thống, không cần AI
// ══════════════════════════════════════════════════════

// ─── MIẾU VƯỢNG 14 CHÍNH TINH ───────────────────────
// 5 mức: M=Miếu(5), V=Vượng(4), D=Đắc(3), B=Bình(2), H=Hãm(1)
// Index: 0=Tý, 1=Sửu, 2=Dần, 3=Mão, 4=Thìn, 5=Tỵ,
//        6=Ngọ, 7=Mùi, 8=Thân, 9=Dậu, 10=Tuất, 11=Hợi

var MIEU_VUONG = {
  'Tử Vi':    [5,3,4,2,3,5,5,3,4,2,3,5],
  'Thiên Cơ': [2,5,3,4,2,3,2,5,3,4,2,3],
  'Thái Dương':[2,3,4,5,5,5,4,3,2,1,1,1],
  'Vũ Khúc':  [4,5,2,1,5,3,4,5,2,1,5,3],
  'Thiên Đồng':[3,1,4,5,2,5,3,1,4,5,2,5],
  'Liêm Trinh':[3,2,5,4,2,3,3,2,5,4,2,3],
  'Thiên Phủ': [5,4,3,2,5,4,5,4,3,2,5,4],
  'Thái Âm':  [5,5,4,3,2,1,1,1,2,3,4,5],
  'Tham Lang': [3,2,5,4,1,3,3,2,5,4,1,3],
  'Cự Môn':   [4,3,5,2,1,4,4,3,5,2,1,4],
  'Thiên Tướng':[3,4,5,2,3,4,3,4,5,2,3,4],
  'Thiên Lương':[4,3,2,5,4,3,4,3,2,5,4,3],
  'Thất Sát':  [5,2,4,1,3,5,5,2,4,1,3,5],
  'Phá Quân':  [3,4,1,2,5,3,3,4,1,2,5,3]
};

var MIEU_VUONG_TEN = {
  5: 'Miếu', 4: 'Vượng', 3: 'Đắc Địa', 2: 'Bình', 1: 'Hãm Địa'
};

// ─── 14 CHÍNH TINH CHI TIẾT ─────────────────────────

var CHINH_TINH_DATA = {
  'Tử Vi': {
    nguHanh: 'Thổ',
    loai: 'Đế Tinh',
    dacTinh: 'Sao chủ về quyền lực, lãnh đạo, cao quý. Người có Tử Vi tọa Mệnh thường có phong thái uy nghiêm, tự trọng cao, có tài thống lĩnh.',
    cung: {
      'Mệnh': 'Có uy quyền, được kính trọng, tính tự tôn cao. Miếu Vượng → lãnh đạo giỏi, được quý nhân phù trợ. Hãm → tự cao tự đại, cô đơn quyền lực.',
      'Tài Bạch': 'Tiền bạc đến từ quyền lực, chức vụ. Miếu → giàu có nhờ sự nghiệp. Hãm → chi tiêu hoang phí, tiền bạc không bền.',
      'Quan Lộc': 'Sự nghiệp rực rỡ, có quyền cao chức trọng. Miếu → quan lớn, doanh nhân thành đạt. Hãm → sự nghiệp gian nan, hay bị đố kỵ.',
      'Phu Thê': 'Lấy người có địa vị, danh giá. Miếu → hôn nhân tốt đẹp, vợ/chồng giỏi giang. Hãm → kén chọn quá, muộn duyên.',
      'Tử Tức': 'Con cái có chí lớn, thông minh. Miếu → con thành đạt. Hãm → con ít hoặc con khó dạy.',
      'Phúc Đức': 'Phúc đức lớn, hưởng thụ cao. Miếu → đời sống tinh thần phong phú. Hãm → lo lắng nhiều.',
      'Tật Ách': 'Bệnh về tỳ vị, tiêu hóa. Miếu → sức khỏe tốt nhìn chung. Hãm → bệnh mãn tính khó chữa.',
      'Thiên Di': 'Đi đâu cũng được trọng vọng. Miếu → quý nhân nhiều, xuất ngoại tốt. Hãm → đi xa gặp trở ngại.',
      'Nô Bộc': 'Cấp dưới trung thành, có nhân viên giỏi. Miếu → được phục vụ tốt. Hãm → bị phản bội.',
      'Điền Trạch': 'Nhà cửa khang trang, có bất động sản lớn. Miếu → gia sản đồ sộ. Hãm → nhà cửa bấp bênh.',
      'Phụ Mẫu': 'Cha mẹ có uy tín, gia đình nề nếp. Miếu → thừa hưởng nhiều từ cha mẹ. Hãm → xa cách cha mẹ.',
      'Huynh Đệ': 'Anh em có quyền thế, giúp đỡ nhau. Miếu → anh em hòa thuận. Hãm → tranh giành quyền lợi.'
    }
  },

  'Thiên Cơ': {
    nguHanh: 'Mộc',
    loai: 'Thiện Tinh',
    dacTinh: 'Sao chủ về mưu trí, sáng tạo, linh hoạt. Người có Thiên Cơ thông minh, nhanh nhẹn, giỏi tính toán, thích nghiên cứu.',
    cung: {
      'Mệnh': 'Thông minh sáng tạo, đa tài đa nghệ. Miếu → mưu lược gia, quân sư giỏi. Hãm → hay lo lắng, tính toán quá nhiều, thiếu quyết đoán.',
      'Tài Bạch': 'Kiếm tiền bằng trí tuệ, kế hoạch. Miếu → giỏi đầu tư, kinh doanh sáng tạo. Hãm → tính toán sai, hay thất thoát.',
      'Quan Lộc': 'Làm tham mưu, cố vấn, kỹ sư, nhà khoa học. Miếu → sự nghiệp trí tuệ phát triển. Hãm → hay đổi nghề, bất ổn.',
      'Phu Thê': 'Lấy người thông minh, khéo léo. Miếu → vợ/chồng giỏi giang. Hãm → quá tính toán trong hôn nhân.',
      'Tử Tức': 'Con thông minh, học giỏi. Miếu → con có tài năng đặc biệt. Hãm → con hay suy nghĩ nhiều.',
      'Phúc Đức': 'Tâm linh phát triển, thích triết học. Miếu → đời sống tinh thần phong phú. Hãm → lo nghĩ quá nhiều.',
      'Tật Ách': 'Bệnh về gan, thần kinh, mất ngủ. Miếu → sức khỏe OK nếu giữ tinh thần thoải mái. Hãm → stress, thần kinh suy nhược.',
      'Thiên Di': 'Di chuyển nhiều, hay đi lại. Miếu → đi xa gặp may. Hãm → bôn ba vất vả.',
      'Nô Bộc': 'Bạn bè thông minh. Miếu → có bạn tốt giúp đỡ. Hãm → bị bạn lừa.',
      'Điền Trạch': 'Hay thay đổi nhà cửa, sáng tạo không gian. Miếu → nhà cửa đẹp. Hãm → hay dọn nhà.',
      'Phụ Mẫu': 'Cha mẹ thông minh, dạy con tốt. Miếu → được giáo dục tốt. Hãm → xa cha mẹ sớm.',
      'Huynh Đệ': 'Anh em thông minh, hay bàn bạc. Miếu → hỗ trợ nhau tốt. Hãm → ý kiến bất đồng.'
    }
  },

  'Thái Dương': {
    nguHanh: 'Hỏa',
    loai: 'Quý Tinh',
    dacTinh: 'Sao chủ về quý nhân, danh tiếng, bác ái, hào phóng. Đại diện cha, chồng, con trai. Ban ngày (Tỵ-Ngọ-Mùi) sáng nhất, ban đêm hãm.',
    cung: {
      'Mệnh': 'Hào phóng, rộng rãi, thích giúp người. Miếu → danh tiếng lớn, nhiều quý nhân. Hãm → phung phí, làm ơn mắc oán.',
      'Tài Bạch': 'Tiền bạc đến dễ đi dễ. Miếu → giàu có, rộng rãi. Hãm → tiền bạc thất thoát, cho vay mất.',
      'Quan Lộc': 'Sự nghiệp công, chính trị, ngoại giao. Miếu → công danh hiển hách. Hãm → sự nghiệp thăng trầm.',
      'Phu Thê': 'Nam: đại diện bản thân chồng. Nữ: đại diện chồng. Miếu → chồng giỏi giang, hào phóng. Hãm → chồng bất tài hoặc xa cách.',
      'Tử Tức': 'Con trai tốt, hiếu thảo. Miếu → con thành đạt. Hãm → con trai ít hoặc bất hiếu.',
      'Phúc Đức': 'Phúc đức lớn, hay làm từ thiện. Miếu → hưởng phúc trời cho. Hãm → phúc mỏng.',
      'Tật Ách': 'Bệnh về tim, mắt, huyết áp. Miếu → sức khỏe tốt. Hãm → bệnh tim, mắt kém.',
      'Thiên Di': 'Đi đâu cũng được giúp đỡ. Miếu → quý nhân phương xa. Hãm → đi xa gặp nạn.',
      'Nô Bộc': 'Cấp dưới trung thành, bạn bè rộng. Miếu → được mọi người yêu quý. Hãm → bạn bè lợi dụng.',
      'Điền Trạch': 'Nhà cửa sáng sủa, rộng rãi. Miếu → bất động sản tốt. Hãm → nhà cửa không ổn.',
      'Phụ Mẫu': 'Cha tốt, gia đình danh giá. Miếu → cha giỏi giang. Hãm → cha sớm mất hoặc xa cách.',
      'Huynh Đệ': 'Anh em hào phóng, rộng lượng. Miếu → anh em giúp đỡ. Hãm → anh em bất hòa.'
    }
  },

  'Vũ Khúc': {
    nguHanh: 'Kim',
    loai: 'Tài Tinh',
    dacTinh: 'Sao chủ về tiền bạc, quyết đoán, cứng cỏi, ý chí mạnh. Người có Vũ Khúc thường giỏi về tài chính, kinh doanh, quân sự.',
    cung: {
      'Mệnh': 'Cương nghị, quyết đoán, thẳng thắn. Miếu → doanh nhân thành đạt, tướng lĩnh. Hãm → cô độc, cứng nhắc, khó gần.',
      'Tài Bạch': 'Rất tốt — Vũ Khúc là Tài Tinh. Miếu → giàu có, tài chính vững. Hãm → tiền bạc đến đi bất thường.',
      'Quan Lộc': 'Sự nghiệp tài chính, ngân hàng, kinh doanh. Miếu → chức vụ cao trong ngành tài chính. Hãm → sự nghiệp vất vả.',
      'Phu Thê': 'Vợ/chồng giỏi kiếm tiền nhưng cứng đầu. Miếu → hôn nhân ổn nếu tôn trọng nhau. Hãm → xung đột vì cái tôi.',
      'Tử Tức': 'Con cái ý chí mạnh, tự lập sớm. Miếu → con thành đạt. Hãm → con ít, con bướng.',
      'Phúc Đức': 'Hưởng thụ vật chất. Miếu → đời sống sung túc. Hãm → lo lắng tiền bạc.',
      'Tật Ách': 'Bệnh về phổi, xương, răng. Miếu → khỏe mạnh. Hãm → bệnh phổi, tai nạn kim loại.',
      'Thiên Di': 'Đi xa kiếm tiền tốt. Miếu → buôn bán phương xa phát đạt. Hãm → vất vả.',
      'Nô Bộc': 'Nhân viên giỏi tài chính. Miếu → có người tốt giúp kiếm tiền. Hãm → bị lừa tiền.',
      'Điền Trạch': 'Nhà cửa vững chãi, có bất động sản giá trị. Miếu → nhiều nhà đất. Hãm → khó giữ nhà.',
      'Phụ Mẫu': 'Cha mẹ nghiêm khắc, kỷ luật. Miếu → cha mẹ giàu có. Hãm → xa cha mẹ.',
      'Huynh Đệ': 'Anh em cứng cỏi. Miếu → hợp tác kinh doanh tốt. Hãm → tranh chấp tài sản.'
    }
  },

  'Thiên Đồng': {
    nguHanh: 'Thủy',
    loai: 'Phúc Tinh',
    dacTinh: 'Sao chủ về phúc lộc, hưởng thụ, lạc quan, nghệ thuật. Người Thiên Đồng hiền lành, tốt bụng, thích cuộc sống an nhàn.',
    cung: {
      'Mệnh': 'Hiền lành, vui vẻ, thích hưởng thụ. Miếu → đời sống thoải mái, nhiều phúc. Hãm → lười biếng, ỷ lại, thiếu ý chí.',
      'Tài Bạch': 'Tiền bạc đến dễ dàng nhờ phúc. Miếu → không giàu lớn nhưng luôn đủ. Hãm → chi tiêu vô kế hoạch.',
      'Quan Lộc': 'Ngành nghệ thuật, giải trí, xã hội. Miếu → sự nghiệp nhẹ nhàng, thành công. Hãm → lười làm, ỷ lại.',
      'Phu Thê': 'Vợ/chồng hiền lành, gia đình êm ấm. Miếu → hôn nhân hạnh phúc. Hãm → chán nhau vì nhàm.',
            'Tử Tức': 'Con ngoan, hiền. Miếu → con hiếu thảo. Hãm → con lười học.',
      'Phúc Đức': 'Phúc đức rất tốt. Miếu → hưởng phúc trọn đời. Hãm → phúc giảm vì lười.',
      'Tật Ách': 'Bệnh thận, bàng quang. Miếu → sức khỏe ổn. Hãm → bệnh lặt vặt nhiều.',
      'Thiên Di': 'Đi đâu cũng vui, gặp người tốt. Miếu → du lịch nhiều. Hãm → lười di chuyển.',
      'Nô Bộc': 'Bạn bè vui vẻ. Miếu → bạn tốt nhiều. Hãm → bạn rủ ăn chơi.',
      'Điền Trạch': 'Nhà ấm cúng. Miếu → nhà đẹp. Hãm → nhà nhỏ nhưng thoải mái.',
      'Phụ Mẫu': 'Cha mẹ hiền từ. Miếu → gia đình hạnh phúc. Hãm → cha mẹ nuông chiều quá.',
      'Huynh Đệ': 'Anh em hòa thuận. Miếu → giúp đỡ nhau. Hãm → ai lo phận nấy.'
    }
  },

  'Liêm Trinh': {
    nguHanh: 'Hỏa',
    loai: 'Tù Tinh',
    dacTinh: 'Sao chủ về chính trực nhưng cũng liên quan hình tụng, thị phi. Miếu rất tốt, hãm rất xấu. Người Liêm Trinh quyết liệt, đam mê.',
    cung: {
      'Mệnh': 'Cá tính mạnh, quyết liệt, đam mê. Miếu → liêm chính, thanh bạch, quyền cao. Hãm → quan tụng, thị phi, tù tội.',
      'Tài Bạch': 'Miếu → kiếm tiền chính đáng. Hãm → tiền bạc dính líu pháp luật.',
      'Quan Lộc': 'Miếu → quan chức liêm chính. Hãm → sự nghiệp dính kiện tụng.',
      'Phu Thê': 'Miếu → vợ/chồng đẹp, đam mê. Hãm → tình duyên phức tạp, tam giác.',
      'Tử Tức': 'Miếu → con cá tính mạnh. Hãm → con bướng, dễ dính vào rắc rối.',
      'Phúc Đức': 'Miếu → phúc đức nhờ chính trực. Hãm → nghiệp nặng.',
      'Tật Ách': 'Bệnh tim, huyết áp, viêm nhiễm. Miếu → OK. Hãm → tai nạn, phẫu thuật.',
      'Thiên Di': 'Miếu → đi xa gặp may. Hãm → đi xa gặp nạn, kiện tụng.',
      'Nô Bộc': 'Miếu → cấp dưới trung thành. Hãm → bị phản bội, kiện cáo.',
      'Điền Trạch': 'Miếu → nhà cửa ổn. Hãm → tranh chấp nhà đất.',
      'Phụ Mẫu': 'Miếu → cha mẹ nghiêm khắc. Hãm → cha mẹ bất hòa.',
      'Huynh Đệ': 'Miếu → anh em chính trực. Hãm → anh em kiện tụng.'
    }
  },

  'Thiên Phủ': {
    nguHanh: 'Thổ',
    loai: 'Lộc Tinh',
    dacTinh: 'Sao chủ về tài lộc, kho tàng, ổn định. Thiên Phủ như kho bạc, luôn mang lại sự sung túc, an toàn. Tính bảo thủ, ổn định.',
    cung: {
      'Mệnh': 'Phúc hậu, giàu có, ổn định. Miếu → giàu sang phú quý. Hãm → giàu nhưng keo kiệt.',
      'Tài Bạch': 'Rất tốt — kho tiền đầy. Miếu → giàu có bền vững. Hãm → có tiền nhưng không dám tiêu.',
      'Quan Lộc': 'Sự nghiệp ổn định, quản lý kho, tài chính. Miếu → chức cao, quản lý giỏi. Hãm → sự nghiệp trì trệ.',
      'Phu Thê': 'Vợ/chồng giàu có, đảm đang. Miếu → hôn nhân sung túc. Hãm → vợ/chồng keo kiệt.',
      'Tử Tức': 'Con cái phú quý. Miếu → con giàu có. Hãm → con bảo thủ.',
      'Phúc Đức': 'Phúc đức dày, hưởng thụ cao. Miếu → đời sống vật chất dư dả. Hãm → phúc giảm.',
      'Tật Ách': 'Sức khỏe tốt nhìn chung. Miếu → ít bệnh. Hãm → bệnh tỳ vị, béo phì.',
      'Thiên Di': 'Đi đâu cũng có của. Miếu → kinh doanh phương xa tốt. Hãm → đi xa tốn kém.',
      'Nô Bộc': 'Nhân viên tốt, trung thành. Miếu → có người giỏi giúp. Hãm → nhân viên lười.',
      'Điền Trạch': 'Rất tốt — nhiều nhà đất. Miếu → bất động sản lớn. Hãm → nhà cửa cũ kỹ.',
      'Phụ Mẫu': 'Cha mẹ giàu có. Miếu → thừa kế nhiều. Hãm → cha mẹ keo kiệt.',
      'Huynh Đệ': 'Anh em giàu có. Miếu → hỗ trợ nhau tài chính. Hãm → tranh nhau tài sản.'
    }
  },

  'Thái Âm': {
    nguHanh: 'Thủy',
    loai: 'Phú Tinh',
    dacTinh: 'Sao chủ về sắc đẹp, tài sản, nhu mì, nghệ thuật. Đại diện mẹ, vợ, con gái. Ban đêm (Hợi-Tý-Sửu) sáng nhất.',
    cung: {
      'Mệnh': 'Dịu dàng, xinh đẹp, nghệ sĩ. Miếu → giàu có, sắc đẹp. Hãm → u buồn, yếu đuối, mộng mơ.',
      'Tài Bạch': 'Rất tốt — Thái Âm là sao tài lộc. Miếu → giàu nhờ bất động sản, nghệ thuật. Hãm → tài chính bấp bênh.',
      'Quan Lộc': 'Ngành nghệ thuật, thời trang, bất động sản. Miếu → sự nghiệp thuận lợi. Hãm → hay thay đổi.',
      'Phu Thê': 'Nam: vợ đẹp, dịu dàng. Nữ: bản thân đẹp. Miếu → hôn nhân tốt. Hãm → tình duyên lận đận.',
      'Tử Tức': 'Con gái đẹp, hiền. Miếu → con hiếu thảo. Hãm → con gái khó tính.',
      'Phúc Đức': 'Phúc đức lớn từ phía mẹ. Miếu → hưởng phúc đầy đủ. Hãm → phúc mỏng.',
      'Tật Ách': 'Bệnh thận, mắt, phụ khoa. Miếu → sức khỏe OK. Hãm → bệnh phụ khoa, thận.',
      'Thiên Di': 'Miếu → đi đâu cũng được giúp. Hãm → đi xa buồn, cô đơn.',
      'Nô Bộc': 'Bạn bè nữ tốt. Miếu → có bạn gái giúp. Hãm → bị bạn ghen.',
      'Điền Trạch': 'Rất tốt — nhà đẹp. Miếu → bất động sản giá trị. Hãm → nhà cửa tối tăm.',
      'Phụ Mẫu': 'Mẹ hiền, đẹp. Miếu → mẹ giàu, thương con. Hãm → mẹ yếu hoặc xa cách.',
      'Huynh Đệ': 'Chị em hòa thuận. Miếu → chị em giúp nhau. Hãm → chị em xa cách.'
    }
  },

  'Tham Lang': {
    nguHanh: 'Thủy/Mộc',
    loai: 'Đào Hoa Tinh',
    dacTinh: 'Sao chủ về dục vọng, đào hoa, tham vọng, đa tài. Người Tham Lang đa tài nhưng cũng đa dục, thích hưởng thụ, khéo giao tiếp.',
    cung: {
      'Mệnh': 'Đa tài, khéo léo, đào hoa. Miếu → thành công nhờ giao tiếp, nghệ thuật. Hãm → ham chơi, sa đọa, tình ái phức tạp.',
      'Tài Bạch': 'Kiếm tiền nhờ giao tiếp, giải trí. Miếu → giàu nhờ kinh doanh giải trí. Hãm → tiền vào tiền ra, nợ nần vì ăn chơi.',
      'Quan Lộc': 'Ngành giải trí, ngoại giao, kinh doanh. Miếu → sự nghiệp lớn nhờ quan hệ. Hãm → sự nghiệp sa sút vì tửu sắc.',
      'Phu Thê': 'Miếu → vợ/chồng đẹp, quyến rũ. Hãm → tình duyên phức tạp, ngoại tình.',
      'Tử Tức': 'Miếu → con đẹp, khéo. Hãm → con ham chơi.',
      'Phúc Đức': 'Miếu → hưởng thụ cuộc sống. Hãm → sa đọa.',
      'Tật Ách': 'Bệnh gan, sinh dục, nghiện. Miếu → OK. Hãm → nghiện rượu, bệnh tình dục.',
      'Thiên Di': 'Miếu → đi đâu cũng có người thương. Hãm → gặp rắc rối tình ái ở xa.',
      'Nô Bộc': 'Miếu → bạn bè vui vẻ. Hãm → bạn rủ ăn chơi.',
      'Điền Trạch': 'Miếu → nhà đẹp, sang. Hãm → nhà không ổn.',
      'Phụ Mẫu': 'Miếu → cha mẹ đa tài. Hãm → cha mẹ bất hòa.',
      'Huynh Đệ': 'Miếu → anh em đông. Hãm → anh em cạnh tranh.'
    }
  },

  'Cự Môn': {
    nguHanh: 'Thủy',
    loai: 'Ám Tinh',
    dacTinh: 'Sao chủ về khẩu tài, tranh cãi, thị phi, nhưng cũng giỏi thuyết phục. Miếu thì tài ăn nói, hãm thì thị phi kiện tụng.',
    cung: {
      'Mệnh': 'Giỏi ăn nói, phân tích, tranh luận. Miếu → luật sư, MC, giảng viên giỏi. Hãm → thị phi, kiện tụng, miệng lưỡi hại thân.',
      'Tài Bạch': 'Kiếm tiền nhờ miệng. Miếu → giàu nhờ thuyết trình, buôn bán. Hãm → mất tiền vì kiện tụng.',
      'Quan Lộc': 'Luật, truyền thông, giảng dạy. Miếu → sự nghiệp nhờ tài ăn nói. Hãm → sự nghiệp nhiều thị phi.',
      'Phu Thê': 'Miếu → vợ/chồng giỏi giao tiếp. Hãm → cãi vã, bất đồng, ly hôn.',
      'Tử Tức': 'Miếu → con giỏi ăn nói. Hãm → con hay cãi.',
      'Phúc Đức': 'Miếu → tâm tốt, nói thẳng. Hãm → nghiệp khẩu.',
      'Tật Ách': 'Bệnh miệng, họng, tiêu hóa. Miếu → OK. Hãm → bệnh dạ dày, miệng.',
      'Thiên Di': 'Miếu → đi xa thuyết phục giỏi. Hãm → gặp thị phi ở nơi xa.',
      'Nô Bộc': 'Miếu → bạn thẳng thắn. Hãm → bạn nói xấu.',
      'Điền Trạch': 'Miếu → nhà cửa ổn. Hãm → tranh chấp nhà.',
      'Phụ Mẫu': 'Miếu → cha mẹ nói hay. Hãm → bất hòa với cha mẹ.',
      'Huynh Đệ': 'Miếu → anh em thẳng thắn. Hãm → anh em cãi nhau.'
    }
  },

  'Thiên Tướng': {
    nguHanh: 'Thủy',
    loai: 'Ấn Tinh',
    dacTinh: 'Sao chủ về ấn tín, chức vụ, chính trực, được che chở. Như tấm khiên bảo vệ. Người Thiên Tướng đứng đắn, có trách nhiệm.',
    cung: {
      'Mệnh': 'Đứng đắn, trách nhiệm, được quý nhân giúp. Miếu → chức vụ lớn, được tín nhiệm. Hãm → gánh vác quá nhiều.',
      'Tài Bạch': 'Miếu → tài chính ổn định nhờ chức vụ. Hãm → tiền bạc phụ thuộc người khác.',
      'Quan Lộc': 'Miếu → sự nghiệp ổn, có ấn tín. Hãm → sự nghiệp phụ thuộc.',
      'Phu Thê': 'Miếu → vợ/chồng đứng đắn. Hãm → hôn nhân ràng buộc.',
      'Tử Tức': 'Miếu → con ngoan, có trách nhiệm. Hãm → con gánh nặng.',
      'Phúc Đức': 'Miếu → phúc đức nhờ ấn tín. Hãm → lo lắng nhiều.',
      'Tật Ách': 'Miếu → sức khỏe ổn. Hãm → bệnh thận.',
      'Thiên Di': 'Miếu → có người bảo vệ khi đi xa. Hãm → phụ thuộc.',
      'Nô Bộc': 'Miếu → cấp dưới tốt. Hãm → bị lợi dụng.',
      'Điền Trạch': 'Miếu → nhà cửa ổn. Hãm → nhà thuê.',
      'Phụ Mẫu': 'Miếu → cha mẹ bảo bọc. Hãm → cha mẹ áp đặt.',
      'Huynh Đệ': 'Miếu → anh em che chở. Hãm → bị kiểm soát.'
    }
  },

  'Thiên Lương': {
    nguHanh: 'Mộc',
    loai: 'Thọ Tinh',
    dacTinh: 'Sao chủ về tuổi thọ, đạo đức, từ bi, y học. Người Thiên Lương nhân hậu, thích giúp đỡ, có duyên tôn giáo.',
    cung: {
      'Mệnh': 'Nhân hậu, đạo đức, thọ. Miếu → thầy thuốc, thầy giáo giỏi, sống thọ. Hãm → lo lắng, hay bệnh vặt.',
      'Tài Bạch': 'Miếu → tiền bạc nhờ y dược, giáo dục. Hãm → tài chính bấp bênh.',
      'Quan Lộc': 'Miếu → ngành y, giáo dục, tôn giáo. Hãm → sự nghiệp chậm.',
      'Phu Thê': 'Miếu → vợ/chồng hiền lành. Hãm → hôn nhân nhạt.',
      'Tử Tức': 'Miếu → con hiếu thảo, khỏe mạnh. Hãm → con ít.',
      'Phúc Đức': 'Rất tốt — sao phúc thọ. Miếu → sống thọ, phúc dày. Hãm → phúc giảm.',
      'Tật Ách': 'Miếu → sức khỏe rất tốt, thọ. Hãm → bệnh gan, thần kinh.',
      'Thiên Di': 'Miếu → đi đâu cũng an toàn. Hãm → lo lắng khi đi xa.',
      'Nô Bộc': 'Miếu → bạn bè đạo đức. Hãm → bạn lợi dụng lòng tốt.',
      'Điền Trạch': 'Miếu → nhà cửa yên bình. Hãm → nhà gần chùa, bệnh viện.',
      'Phụ Mẫu': 'Miếu → cha mẹ thọ, nhân hậu. Hãm → cha mẹ hay bệnh.',
      'Huynh Đệ': 'Miếu → anh em thương nhau. Hãm → anh em xa cách.'
    }
  },

  'Thất Sát': {
    nguHanh: 'Kim',
    loai: 'Sát Tinh',
    dacTinh: 'Sao chủ về quyền uy, chiến đấu, quyết liệt, cô độc. Miếu cực tốt — tướng quân. Hãm cực xấu — hung hiểm. Thất Sát là sao hai mặt rõ nhất.',
    cung: {
      'Mệnh': 'Uy quyền, quả quyết, dũng cảm. Miếu → tướng lĩnh, doanh nhân quyết đoán, thành công lớn. Hãm → hung hãn, tai nạn, cô độc, thất bại.',
      'Tài Bạch': 'Miếu → kiếm tiền bạo, nhanh. Hãm → mất tiền nhanh, rủi ro cao.',
      'Quan Lộc': 'Miếu → sự nghiệp quân sự, công an, kinh doanh mạo hiểm thành công. Hãm → sự nghiệp nguy hiểm.',
      'Phu Thê': 'Miếu → vợ/chồng mạnh mẽ. Hãm → xung đột, ly hôn, bạo lực.',
      'Tử Tức': 'Miếu → con cứng cỏi. Hãm → con ít, con xa.',
      'Phúc Đức': 'Miếu → phúc nhờ dũng cảm. Hãm → nghiệp nặng.',
      'Tật Ách': 'Bệnh phổi, xương, tai nạn. Miếu → mổ xẻ nhưng qua. Hãm → tai nạn nghiêm trọng.',
      'Thiên Di': 'Miếu → đi xa thành công lớn. Hãm → đi xa gặp nạn.',
      'Nô Bộc': 'Miếu → cấp dưới sợ nể. Hãm → bị phản bội nguy hiểm.',
      'Điền Trạch': 'Miếu → nhà cửa thay đổi nhưng tốt. Hãm → mất nhà.',
      'Phụ Mẫu': 'Miếu → cha mẹ nghiêm. Hãm → xa cha mẹ sớm.',
      'Huynh Đệ': 'Miếu → anh em mạnh. Hãm → anh em bất hòa nghiêm trọng.'
    }
  },

  'Phá Quân': {
    nguHanh: 'Thủy',
    loai: 'Hao Tinh',
    dacTinh: 'Sao chủ về phá cách, đổi mới, khai phá, mạo hiểm. Người Phá Quân thích thay đổi, không chịu khuôn khổ, sáng tạo phá vỡ.',
    cung: {
      'Mệnh': 'Thích thay đổi, phá cách, cách mạng. Miếu → nhà cải cách, doanh nhân sáng tạo, tiên phong. Hãm → phá hoại, bất ổn, đời nhiều sóng gió.',
      'Tài Bạch': 'Miếu → kiếm tiền nhờ đổi mới, sáng tạo. Hãm → tiền bạc bấp bênh, phá sản.',
      'Quan Lộc': 'Miếu → sự nghiệp đổi mới, startup. Hãm → hay đổi nghề, thất bại.',
      'Phu Thê': 'Miếu → hôn nhân nhiều biến động nhưng thú vị. Hãm → ly hôn, tình duyên lận đận.',
      'Tử Tức': 'Miếu → con sáng tạo. Hãm → con bướng, khó dạy.',
      'Phúc Đức': 'Miếu → phúc nhờ khai phá. Hãm → đời nhiều sóng gió.',
      'Tật Ách': 'Bệnh thận, bàng quang, tai nạn nước. Miếu → OK. Hãm → tai nạn, phẫu thuật.',
      'Thiên Di': 'Miếu → đi xa khai phá thành công. Hãm → bôn ba.',
      'Nô Bộc': 'Miếu → bạn bè sáng tạo. Hãm → bạn phản bội.',
      'Điền Trạch': 'Miếu → thay đổi nhà nhiều. Hãm → mất nhà.',
      'Phụ Mẫu': 'Miếu → cha mẹ tiến bộ. Hãm → xa cha mẹ sớm.',
      'Huynh Đệ': 'Miếu → anh em phá cách. Hãm → anh em bất hòa.'
    }
  }
};
// ─── PHỤ TINH & CÁT TINH ───────────────────────────

var PHU_TINH_DATA = {
  'Tả Phụ': {
    nguHanh: 'Thổ',
    loai: 'Cát Tinh',
    dacTinh: 'Sao phò tá bên trái, chủ về quý nhân, trợ giúp, nhân duyên tốt. Đi với chính tinh tốt thì tăng cát, đi với sao xấu thì giảm hung.',
    totNhat: 'Cung Mệnh, Quan Lộc, Tài Bạch',
    hieuUng: {
      'Mệnh': 'Được nhiều quý nhân giúp đỡ, nhân duyên rộng, có tài lãnh đạo phụ tá. Gặp Tử Vi → cách Quân Thần Khánh Hội.',
      'Tài Bạch': 'Tài lộc nhờ quý nhân, có người giúp kiếm tiền.',
      'Quan Lộc': 'Sự nghiệp được đề bạt, có người nâng đỡ.',
      'Phu Thê': 'Hôn nhân có quý nhân mai mối, vợ/chồng tốt.',
      'chung': 'Ở cung nào cũng mang lại sự trợ giúp cho cung đó.'
    }
  },
  'Hữu Bật': {
    nguHanh: 'Thủy',
    loai: 'Cát Tinh',
    dacTinh: 'Sao phò tá bên phải, chủ về quý nhân, trợ giúp. Tương tự Tả Phụ nhưng hỗ trợ âm thầm hơn, khéo léo hơn.',
    totNhat: 'Cung Mệnh, Quan Lộc, Tài Bạch',
    hieuUng: {
      'Mệnh': 'Được quý nhân âm thầm giúp đỡ, khéo léo trong giao tiếp.',
      'Tài Bạch': 'Tài lộc đến nhờ quan hệ, có người ngầm hỗ trợ.',
      'Quan Lộc': 'Sự nghiệp thăng tiến nhờ có người phò trợ.',
      'Phu Thê': 'Hôn nhân nhờ duyên phận tốt.',
      'chung': 'Ở cung nào cũng mang lại quý nhân cho cung đó.'
    }
  },
  'Văn Xương': {
    nguHanh: 'Kim',
    loai: 'Cát Tinh',
    dacTinh: 'Sao chủ về văn chương, học vấn, khoa bảng, trí tuệ. Rất tốt cho học hành, thi cử, công danh.',
    totNhat: 'Cung Mệnh, Quan Lộc, Phụ Mẫu',
    hieuUng: {
      'Mệnh': 'Thông minh, học giỏi, có tài văn chương. Thích hợp ngành học thuật, giáo dục.',
      'Tài Bạch': 'Kiếm tiền bằng trí tuệ, sáng tạo nội dung.',
      'Quan Lộc': 'Sự nghiệp học thuật, giáo dục, viết lách, truyền thông thành công.',
      'Phu Thê': 'Vợ/chồng trí thức, thanh nhã.',
      'chung': 'Ở cung nào cũng nâng tầm trí tuệ cho lĩnh vực đó.'
    }
  },
  'Văn Khúc': {
    nguHanh: 'Thủy',
    loai: 'Cát Tinh',
    dacTinh: 'Sao chủ về nghệ thuật, âm nhạc, tài hoa, giao tiếp. Khác Văn Xương ở chỗ thiên về nghệ thuật hơn học thuật.',
    totNhat: 'Cung Mệnh, Quan Lộc, Phu Thê',
    hieuUng: {
      'Mệnh': 'Đa tài, giỏi nghệ thuật, khéo ăn nói, duyên dáng.',
      'Tài Bạch': 'Kiếm tiền nhờ nghệ thuật, giải trí.',
      'Quan Lộc': 'Sự nghiệp nghệ thuật, âm nhạc, thiết kế phát triển.',
      'Phu Thê': 'Tình duyên lãng mạn, vợ/chồng tài hoa.',
      'chung': 'Mang lại tính nghệ thuật, duyên dáng cho cung.'
    }
  },
  'Lộc Tồn': {
    nguHanh: 'Thổ',
    loai: 'Tài Tinh',
    dacTinh: 'Sao chủ về tài lộc bền vững, tiết kiệm, cần cù. Tiền bạc đến chậm nhưng chắc. Có tính keo kiệt.',
    totNhat: 'Cung Tài Bạch, Mệnh, Điền Trạch',
    hieuUng: {
      'Mệnh': 'Cần cù, tiết kiệm, chắc chắn có của ăn của để. Nhưng dễ keo kiệt.',
      'Tài Bạch': 'Rất tốt — tài chính ổn định bền vững, biết tích lũy.',
      'Quan Lộc': 'Sự nghiệp ổn định, lương bổng đều đặn.',
      'Điền Trạch': 'Có nhà cửa, bất động sản tích lũy dần.',
      'chung': 'Mang lại sự ổn định tài chính cho cung đó.'
    }
  },
  'Thiên Mã': {
    nguHanh: 'Hỏa',
    loai: 'Cát Tinh',
    dacTinh: 'Sao chủ về di chuyển, thay đổi, nhanh nhẹn, xuất ngoại. Gặp Lộc Tồn → Lộc Mã giao chi (rất tốt về tài).',
    totNhat: 'Cung Thiên Di, Mệnh, Tài Bạch',
    hieuUng: {
      'Mệnh': 'Hay di chuyển, năng động, thích thay đổi. Hợp ngành vận tải, du lịch.',
      'Tài Bạch': 'Tiền bạc đến nhờ di chuyển, buôn bán. Gặp Lộc Tồn → rất giàu.',
      'Quan Lộc': 'Sự nghiệp liên quan di chuyển, xuất nhập khẩu.',
      'Thiên Di': 'Rất tốt — hay đi xa, xuất ngoại thành công.',
      'chung': 'Mang lại sự thay đổi, di chuyển cho lĩnh vực đó.'
    }
  }
};

// ─── TỨ HÓA ─────────────────────────────────────────

var TU_HOA_DATA = {
  'Hóa Lộc': {
    nguHanh: 'Mộc',
    loai: 'Cát Tinh',
    dacTinh: 'Sao chủ về tài lộc, may mắn, phát triển. Sao nào được Hóa Lộc thì lĩnh vực đó phát tài.',
    hieuUng: {
      'Mệnh': 'Đời nhiều may mắn, tài lộc tự đến.',
      'Tài Bạch': 'Cực tốt — tài chính dồi dào.',
      'Quan Lộc': 'Sự nghiệp phát đạt, thăng tiến nhanh.',
      'Phu Thê': 'Hôn nhân may mắn, vợ/chồng giàu.',
      'chung': 'Mang lại tài lộc, may mắn cho cung và sao được hóa.'
    }
  },
  'Hóa Quyền': {
    nguHanh: 'Hỏa',
    loai: 'Cát Tinh',
    dacTinh: 'Sao chủ về quyền lực, kiểm soát, thống trị. Sao nào được Hóa Quyền thì nắm quyền trong lĩnh vực đó.',
    hieuUng: {
      'Mệnh': 'Có uy quyền, lãnh đạo giỏi, kiểm soát tốt.',
      'Tài Bạch': 'Nắm quyền chi tiêu, quản lý tài chính.',
      'Quan Lộc': 'Quyền lực trong sự nghiệp, chức cao.',
      'Phu Thê': 'Nắm quyền trong gia đình.',
      'chung': 'Mang quyền lực cho cung và sao được hóa.'
    }
  },
  'Hóa Khoa': {
    nguHanh: 'Thủy',
    loai: 'Cát Tinh',
    dacTinh: 'Sao chủ về danh tiếng, học vấn, uy tín. Sao nào được Hóa Khoa thì nổi tiếng trong lĩnh vực đó.',
    hieuUng: {
      'Mệnh': 'Nổi tiếng, có uy tín, học vấn cao.',
      'Tài Bạch': 'Giàu có danh tiếng, tiền bạc chính đáng.',
      'Quan Lộc': 'Sự nghiệp nổi tiếng, được công nhận.',
      'Phu Thê': 'Hôn nhân danh giá.',
      'chung': 'Mang lại danh tiếng, uy tín cho cung.'
    }
  },
  'Hóa Kỵ': {
    nguHanh: 'Thủy',
    loai: 'Hung Tinh',
    dacTinh: 'Sao chủ về trở ngại, thị phi, khó khăn. Sao nào bị Hóa Kỵ thì lĩnh vực đó gặp trắc trở. Tuy nhiên Hóa Kỵ cũng có nghĩa chuyên tâm, tập trung.',
    hieuUng: {
      'Mệnh': 'Đời nhiều trở ngại, hay lo lắng, nhưng cũng chuyên tâm, kiên trì.',
      'Tài Bạch': 'Tài chính trắc trở, nợ nần, nhưng biết tiết kiệm.',
      'Quan Lộc': 'Sự nghiệp gian nan, nhiều thị phi, nhưng chuyên nghiệp.',
      'Phu Thê': 'Hôn nhân trắc trở, hay ghen tuông, cãi vã.',
      'Tật Ách': 'Rất xấu — bệnh tật nhiều, khó chữa.',
      'chung': 'Mang trở ngại cho cung, nhưng cũng cho sự tập trung chuyên sâu.'
    }
  }
};

// ─── SÁT TINH ───────────────────────────────────────

var SAT_TINH_DATA = {
  'Kình Dương': {
    nguHanh: 'Kim',
    loai: 'Sát Tinh',
    dacTinh: 'Sao chủ về cương quyết, bạo liệt, xung đột. Miếu thì dũng cảm, quả quyết. Hãm thì hung bạo, tai nạn.',
    hieuUng: {
      'Mệnh': 'Miếu → dũng cảm, quả quyết, thành công nhờ ý chí sắt đá. Hãm → hung hãn, tai nạn, đổ máu, kiện tụng.',
      'Tài Bạch': 'Miếu → kiếm tiền mạnh bạo. Hãm → mất tiền vì bạo lực, cờ bạc.',
      'Quan Lộc': 'Miếu → quân đội, công an, thể thao. Hãm → sự nghiệp bất ổn.',
      'Phu Thê': 'Xung đột, cãi vã. Miếu → vợ/chồng mạnh mẽ. Hãm → bạo lực gia đình.',
      'Tật Ách': 'Tai nạn, phẫu thuật, đổ máu. Miếu → qua khỏi. Hãm → nguy hiểm.',
      'chung': 'Mang tính cương quyết nhưng cũng bạo liệt cho cung.'
    }
  },
  'Đà La': {
    nguHanh: 'Kim',
    loai: 'Sát Tinh',
    dacTinh: 'Sao chủ về trì trệ, kéo dài, dây dưa, vấn vương. Nhẹ hơn Kình Dương nhưng dai dẳng hơn.',
    hieuUng: {
      'Mệnh': 'Hay do dự, trì trệ, vấn vương quá khứ. Tính kiên nhẫn nhưng chậm chạp.',
      'Tài Bạch': 'Tiền bạc đến chậm, hay bị nợ dây dưa.',
      'Quan Lộc': 'Sự nghiệp chậm tiến, hay bị kéo lại.',
      'Phu Thê': 'Tình duyên dây dưa, khó dứt. Tình cũ quay lại.',
      'Tật Ách': 'Bệnh mãn tính, kéo dài, khó dứt.',
      'chung': 'Mang tính trì trệ, dây dưa cho cung.'
    }
  },
  'Hỏa Tinh': {
    nguHanh: 'Hỏa',
    loai: 'Sát Tinh',
    dacTinh: 'Sao chủ về nóng nảy, bộc phát, bất ngờ. Đến nhanh đi nhanh. Gặp Tham Lang → Hỏa Tham cách (đột phát).',
    hieuUng: {
      'Mệnh': 'Nóng nảy, bộc phát, hành động nhanh. Miếu → quyết đoán nhanh. Hãm → nóng giận, gây họa.',
      'Tài Bạch': 'Tiền đến bất ngờ nhưng cũng mất bất ngờ.',
      'Quan Lộc': 'Sự nghiệp có đột phá bất ngờ. Gặp Tham Lang → phát tài nhanh.',
      'Phu Thê': 'Tình yêu sét đánh nhưng cũng tàn nhanh.',
      'Tật Ách': 'Bỏng, viêm, sốt cao, tai nạn lửa.',
      'chung': 'Mang tính bất ngờ, bộc phát cho cung.'
    }
  },
  'Linh Tinh': {
    nguHanh: 'Hỏa',
    loai: 'Sát Tinh',
    dacTinh: 'Tương tự Hỏa Tinh nhưng âm thầm hơn, dai dẳng hơn. Nóng giận ngấm ngầm.',
    hieuUng: {
      'Mệnh': 'Nóng nảy âm thầm, hay giận nhưng không bộc lộ. Kiên nhẫn nhưng khi bùng thì dữ dội.',
      'Tài Bạch': 'Tài chính có đột biến nhưng chậm hơn Hỏa Tinh.',
      'Quan Lộc': 'Sự nghiệp có biến động. Gặp Tham Lang → Linh Tham cách (cũng đột phát).',
      'Phu Thê': 'Tình yêu có biến động ngầm.',
      'Tật Ách': 'Bệnh viêm mãn tính, sốt kéo dài.',
      'chung': 'Mang tính bất ngờ âm thầm cho cung.'
    }
  },
  'Địa Không': {
    nguHanh: 'Hỏa',
    loai: 'Sát Tinh',
        dacTinh: 'Sao chủ về hao tán, trống rỗng, mất mát. Nhưng cũng cho tư duy triết học, tôn giáo, sáng tạo đột phá.',
    hieuUng: {
      'Mệnh': 'Hay mất mát, trống rỗng tinh thần. Nhưng nếu theo tôn giáo, triết học, nghệ thuật thì rất tốt — tư duy vượt khuôn khổ.',
      'Tài Bạch': 'Tài chính hao tán, mất tiền bất ngờ, đầu tư thua lỗ.',
      'Quan Lộc': 'Sự nghiệp bấp bênh. Nhưng tốt cho ngành sáng tạo, nghệ thuật, triết học.',
      'Phu Thê': 'Hôn nhân trống vắng, cô đơn trong hôn nhân.',
      'Tật Ách': 'Bệnh tâm thần, trầm cảm, mất ngủ.',
      'chung': 'Mang tính hao tán nhưng cũng cho chiều sâu tư duy.'
    }
  },
  'Địa Kiếp': {
    nguHanh: 'Hỏa',
    loai: 'Sát Tinh',
    dacTinh: 'Sao chủ về kiếp nạn, mất mát lớn, tai họa bất ngờ. Nặng hơn Địa Không. Nhưng cũng cho ý chí phục hồi mạnh.',
    hieuUng: {
      'Mệnh': 'Đời nhiều kiếp nạn, mất mát lớn. Nhưng có khả năng phục hồi, đứng dậy sau thất bại.',
      'Tài Bạch': 'Mất tiền lớn bất ngờ, phá sản, bị cướp.',
      'Quan Lộc': 'Sự nghiệp sụp đổ rồi xây lại.',
      'Phu Thê': 'Hôn nhân gặp biến cố lớn.',
      'Tật Ách': 'Tai nạn nghiêm trọng, phẫu thuật lớn.',
      'chung': 'Mang kiếp nạn nhưng cũng cho sức mạnh tái sinh.'
    }
  }
};

// ─── CÁCH CỤC ───────────────────────────────────────

var CACH_CUC = {
  thuongCach: [
    {
      ten: 'Tử Phủ Đồng Cung',
      dieuKien: function(laso) { return laso && cungCo(laso, 'Mệnh', ['Tử Vi', 'Thiên Phủ']); },
      moTa: 'Tử Vi và Thiên Phủ cùng tọa thủ cung Mệnh. Đế tinh gặp Lộc tinh, quyền quý song toàn. Người có cách này thường làm lãnh đạo, doanh nhân lớn, đời sống sung túc.',
      danhGia: 'Thượng Cách — Quyền quý phú túc'
    },
    {
      ten: 'Quân Thần Khánh Hội',
      dieuKien: function(laso) { return laso && cungCo(laso, 'Mệnh', ['Tử Vi']) && (tamPhuongCo(laso, 'Mệnh', ['Tả Phụ']) || tamPhuongCo(laso, 'Mệnh', ['Hữu Bật'])); },
      moTa: 'Tử Vi tọa Mệnh, có Tả Phụ Hữu Bật hội chiếu. Vua có quần thần phò tá. Đại cát, quyền cao chức trọng, được nhiều người phò trợ.',
      danhGia: 'Thượng Cách — Lãnh đạo xuất chúng'
    },
    {
      ten: 'Cơ Nguyệt Đồng Lương',
      dieuKien: function(laso) {
        var count = 0;
        var saoList = ['Thiên Cơ', 'Thái Âm', 'Thiên Đồng', 'Thiên Lương'];
        for (var i = 0; i < saoList.length; i++) {
          if (tamPhuongCo(laso, 'Mệnh', [saoList[i]])) count++;
        }
        return count >= 3;
      },
      moTa: 'Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương hội ở tam phương tứ chính cung Mệnh. Cách cục của người làm công ăn lương ổn định, đời sống thanh nhàn, phúc lộc đều đặn.',
      danhGia: 'Thượng Cách — Phúc lộc bền vững'
    },
    {
      ten: 'Nhật Nguyệt Tịnh Minh',
      dieuKien: function(laso) {
        return laso && saoMieuVuong(laso, 'Thái Dương') >= 4 && saoMieuVuong(laso, 'Thái Âm') >= 4;
      },
      moTa: 'Thái Dương và Thái Âm đều sáng (Miếu hoặc Vượng). Âm dương cân bằng, đời quý hiển. Nam có sự nghiệp tốt, nữ có gia đình hạnh phúc.',
      danhGia: 'Thượng Cách — Âm dương cân bằng, quý hiển'
    },
    {
      ten: 'Phủ Tướng Triều Viên',
      dieuKien: function(laso) { return laso && tamPhuongCo(laso, 'Mệnh', ['Thiên Phủ', 'Thiên Tướng']); },
      moTa: 'Thiên Phủ và Thiên Tướng hợp chiếu cung Mệnh. Kho tàng và ấn tín đều có. Người có cách này giàu có và có chức vụ.',
      danhGia: 'Thượng Cách — Phú quý song toàn'
    },
    {
      ten: 'Tử Phủ Giáp Mệnh',
      dieuKien: function(laso) {
        return laso && !cungCo(laso, 'Mệnh', ['Tử Vi']) && !cungCo(laso, 'Mệnh', ['Thiên Phủ']) &&
               cungLanCanCo(laso, 'Mệnh', 'Tử Vi') && cungLanCanCo(laso, 'Mệnh', 'Thiên Phủ');
      },
      moTa: 'Tử Vi và Thiên Phủ ở hai cung kề bên cung Mệnh (giáp). Được đế tinh và lộc tinh kẹp bảo vệ. Cách cục quý hiển.',
      danhGia: 'Thượng Cách — Được bảo vệ bởi 2 quý tinh'
    },
    {
      ten: 'Tài Ấn Giáp Lộc',
      dieuKien: function(laso) { return laso && tamPhuongCo(laso, 'Mệnh', ['Hóa Lộc', 'Thiên Mã']); },
      moTa: 'Hóa Lộc gặp Thiên Mã trong tam phương — Lộc Mã giao chi. Tài lộc dồi dào nhờ di chuyển, buôn bán.',
      danhGia: 'Thượng Cách — Tài lộc dồi dào'
    },
    {
      ten: 'Văn Tinh Ám Củng',
      dieuKien: function(laso) { return laso && tamPhuongCo(laso, 'Mệnh', ['Văn Xương', 'Văn Khúc']); },
      moTa: 'Văn Xương và Văn Khúc hội chiếu cung Mệnh. Tài hoa, học vấn cao, nổi tiếng trong giới học thuật, văn nghệ.',
      danhGia: 'Thượng Cách — Tài hoa học vấn'
    }
  ],

  trungCach: [
    {
      ten: 'Tham Vũ Đồng Hành',
      dieuKien: function(laso) { return laso && cungCo(laso, 'Mệnh', ['Tham Lang', 'Vũ Khúc']); },
      moTa: 'Tham Lang và Vũ Khúc đồng cung Mệnh. Có tham vọng và khả năng tài chính. Nhưng cần tránh tham lam quá.',
      danhGia: 'Trung Cách — Có tài nhưng cần kiểm soát tham vọng'
    },
    {
      ten: 'Hỏa Tham Cách',
      dieuKien: function(laso) { return laso && cungCo(laso, 'Mệnh', ['Tham Lang', 'Hỏa Tinh']); },
      moTa: 'Tham Lang gặp Hỏa Tinh — đột phát bất ngờ. Có thể phát tài nhanh nhưng cũng mất nhanh. Thường gặp cơ hội lớn bất ngờ.',
      danhGia: 'Trung Cách — Đột phát bất ngờ'
    },
    {
      ten: 'Linh Tham Cách',
      dieuKien: function(laso) { return laso && cungCo(laso, 'Mệnh', ['Tham Lang', 'Linh Tinh']); },
      moTa: 'Tham Lang gặp Linh Tinh — tương tự Hỏa Tham nhưng âm thầm hơn. Phát triển dần dần rồi bùng.',
      danhGia: 'Trung Cách — Phát triển rồi bùng nổ'
    },
    {
      ten: 'Cự Nhật Đồng Cung',
      dieuKien: function(laso) { return laso && cungCo(laso, 'Mệnh', ['Cự Môn', 'Thái Dương']); },
      moTa: 'Cự Môn và Thái Dương cùng cung. Thái Dương hóa giải ám tinh của Cự Môn. Tài ăn nói phát huy, nổi tiếng nhờ khẩu tài.',
      danhGia: 'Trung Cách — Khẩu tài xuất chúng'
    },
    {
      ten: 'Sát Phá Liêm Tham',
      dieuKien: function(laso) {
        var count = 0;
        var saoList = ['Thất Sát', 'Phá Quân', 'Liêm Trinh', 'Tham Lang'];
        for (var i = 0; i < saoList.length; i++) {
          if (tamPhuongCo(laso, 'Mệnh', [saoList[i]])) count++;
        }
        return count >= 3;
      },
      moTa: 'Thất Sát, Phá Quân, Liêm Trinh, Tham Lang hội tam phương. Cách cục biến động, đời sóng gió nhưng có cơ hội lớn. Phù hợp kinh doanh mạo hiểm.',
      danhGia: 'Trung Cách — Sóng gió nhưng cơ hội lớn'
    },
    {
      ten: 'Vũ Tướng Triều Đẩu',
      dieuKien: function(laso) { return laso && cungCo(laso, 'Mệnh', ['Vũ Khúc', 'Thiên Tướng']); },
      moTa: 'Vũ Khúc và Thiên Tướng cùng cung Mệnh. Tài tinh gặp ấn tinh. Có tài chính và có chức vụ, ổn định.',
      danhGia: 'Trung Cách — Tài chính có chức vị'
    }
  ],

  haCach: [
    {
      ten: 'Mệnh Vô Chính Diệu',
      dieuKien: function(laso) { return laso && khongCoChinhTinh(laso, 'Mệnh'); },
      moTa: 'Cung Mệnh không có chính tinh tọa thủ. Đời bấp bênh, phụ thuộc vào sao phụ và cung đối chiếu. Nếu cung đối có chính tinh tốt thì vẫn khá.',
      danhGia: 'Hạ Cách — Bấp bênh, phụ thuộc'
    },
    {
      ten: 'Nhật Nguyệt Phản Bối',
      dieuKien: function(laso) {
        return laso && saoMieuVuong(laso, 'Thái Dương') <= 2 && saoMieuVuong(laso, 'Thái Âm') <= 2;
      },
      moTa: 'Thái Dương và Thái Âm đều hãm (tối). Âm dương đều yếu. Nam bất lợi sự nghiệp, nữ bất lợi hôn nhân.',
      danhGia: 'Hạ Cách — Âm dương đều tối'
    },
    {
      ten: 'Lục Sát Triều Viên',
      dieuKien: function(laso) {
        var count = 0;
        var satList = ['Kình Dương', 'Đà La', 'Hỏa Tinh', 'Linh Tinh', 'Địa Không', 'Địa Kiếp'];
        for (var i = 0; i < satList.length; i++) {
          if (cungCo(laso, 'Mệnh', [satList[i]])) count++;
        }
        return count >= 3;
      },
      moTa: 'Ba sát tinh trở lên tụ tại cung Mệnh. Đời nhiều tai ương, khó khăn chồng chất. Cần tu tâm tích đức để hóa giải.',
      danhGia: 'Hạ Cách — Nhiều sát tinh, đời gian nan'
    },
    {
      ten: 'Mã Đầu Đới Kiếm',
      dieuKien: function(laso) { return laso && cungCo(laso, 'Mệnh', ['Kình Dương']) && cungMenhDiaChi(laso) === 6; },
      moTa: 'Kình Dương tọa cung Mệnh tại Ngọ. Ngọ là mã (ngựa), Kình Dương là kiếm. Ngựa mang kiếm — dũng mãnh nhưng nguy hiểm.',
      danhGia: 'Hạ Cách — Dũng mãnh nhưng hiểm nguy'
    },
    {
      ten: 'Lưỡng Phùng Hóa Kỵ',
      dieuKien: function(laso) {
        var count = 0;
        if (laso && laso.cung) {
          for (var i = 0; i < laso.cung.length; i++) {
            var saoArr = laso.cung[i].sao || [];
            for (var j = 0; j < saoArr.length; j++) {
              if (saoArr[j] === 'Hóa Kỵ') count++;
            }
          }
        }
        return count >= 2;
      },
      moTa: 'Hai Hóa Kỵ trong lá số. Trở ngại kép, đời nhiều thị phi, kiện tụng, trắc trở.',
      danhGia: 'Hạ Cách — Trở ngại chồng chất'
    },
    {
      ten: 'Không Kiếp Giáp Mệnh',
      dieuKien: function(laso) {
        return laso && cungLanCanCo(laso, 'Mệnh', 'Địa Không') && cungLanCanCo(laso, 'Mệnh', 'Địa Kiếp');
      },
      moTa: 'Địa Không và Địa Kiếp kẹp cung Mệnh. Hao tán bao vây. Đời nhiều mất mát, cần tu tâm.',
      danhGia: 'Hạ Cách — Hao tán bao vây'
    }
  ]
};

// ─── HÀM HỖ TRỢ KIỂM TRA CÁCH CỤC ─────────────────

function cungCo(laso, tenCung, dsSao) {
  if (!laso || !laso.cung) return false;
  for (var i = 0; i < laso.cung.length; i++) {
    if (laso.cung[i].ten === tenCung) {
      var saoArr = laso.cung[i].sao || [];
      for (var j = 0; j < dsSao.length; j++) {
        var found = false;
        for (var k = 0; k < saoArr.length; k++) {
          if (saoArr[k] === dsSao[j] || (saoArr[k] && saoArr[k].indexOf && saoArr[k].indexOf(dsSao[j]) !== -1)) {
            found = true; break;
          }
        }
        if (!found) return false;
      }
      return true;
    }
  }
  return false;
}

function tamPhuongCo(laso, tenCung, dsSao) {
  if (!laso || !laso.cung) return false;
  var cungIdx = -1;
  for (var i = 0; i < laso.cung.length; i++) {
    if (laso.cung[i].ten === tenCung) { cungIdx = i; break; }
  }
  if (cungIdx < 0) return false;

  // Tam phương: cung đó + cung cách 4 + cung cách 8 + cung đối (cách 6)
  var tamPhuong = [cungIdx, (cungIdx + 4) % 12, (cungIdx + 8) % 12, (cungIdx + 6) % 12];
  for (var s = 0; s < dsSao.length; s++) {
    var found = false;
    for (var t = 0; t < tamPhuong.length; t++) {
      var saoArr = laso.cung[tamPhuong[t]].sao || [];
      for (var k = 0; k < saoArr.length; k++) {
        if (saoArr[k] === dsSao[s] || (saoArr[k] && saoArr[k].indexOf && saoArr[k].indexOf(dsSao[s]) !== -1)) {
          found = true; break;
        }
      }
      if (found) break;
    }
    if (!found) return false;
  }
  return true;
}

function cungLanCanCo(laso, tenCung, tenSao) {
  if (!laso || !laso.cung) return false;
  var cungIdx = -1;
  for (var i = 0; i < laso.cung.length; i++) {
    if (laso.cung[i].ten === tenCung) { cungIdx = i; break; }
  }
  if (cungIdx < 0) return false;
  var left = (cungIdx + 11) % 12;
  var right = (cungIdx + 1) % 12;
  var saoL = laso.cung[left].sao || [];
  var saoR = laso.cung[right].sao || [];
  for (var j = 0; j < saoL.length; j++) { if (saoL[j] === tenSao) return true; }
  for (var k = 0; k < saoR.length; k++) { if (saoR[k] === tenSao) return true; }
  return false;
}

function khongCoChinhTinh(laso, tenCung) {
  var CT = ['Tử Vi','Thiên Cơ','Thái Dương','Vũ Khúc','Thiên Đồng','Liêm Trinh',
            'Thiên Phủ','Thái Âm','Tham Lang','Cự Môn','Thiên Tướng','Thiên Lương','Thất Sát','Phá Quân'];
  if (!laso || !laso.cung) return true;
  for (var i = 0; i < laso.cung.length; i++) {
    if (laso.cung[i].ten === tenCung) {
      var saoArr = laso.cung[i].sao || [];
      for (var j = 0; j < saoArr.length; j++) {
        for (var k = 0; k < CT.length; k++) {
          if (saoArr[j] === CT[k]) return false;
        }
      }
      return true;
    }
  }
  return true;
}

function saoMieuVuong(laso, tenSao) {
  if (!laso || !laso.cung || !MIEU_VUONG[tenSao]) return 0;
  for (var i = 0; i < laso.cung.length; i++) {
    var saoArr = laso.cung[i].sao || [];
    for (var j = 0; j < saoArr.length; j++) {
      if (saoArr[j] === tenSao) {
        var diaChi = laso.cung[i].diaChi || 0;
        if (typeof diaChi === 'string') {
          var CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
          diaChi = CHI.indexOf(diaChi);
          if (diaChi < 0) diaChi = 0;
        }
        return MIEU_VUONG[tenSao][diaChi] || 0;
      }
    }
  }
  return 0;
}

function cungMenhDiaChi(laso) {
  if (!laso || !laso.cung) return -1;
  for (var i = 0; i < laso.cung.length; i++) {
    if (laso.cung[i].ten === 'Mệnh') {
      var dc = laso.cung[i].diaChi || 0;
      if (typeof dc === 'string') {
        var CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
        return CHI.indexOf(dc);
      }
      return dc;
    }
  }
  return -1;
}