var MIEU_VUONG = {
  'Tử Vi':[5,3,4,2,3,5,5,3,4,2,3,5],
  'Thiên Cơ':[2,5,3,4,2,3,2,5,3,4,2,3],
  'Thái Dương':[2,3,4,5,5,5,4,3,2,1,1,1],
  'Vũ Khúc':[4,5,2,1,5,3,4,5,2,1,5,3],
  'Thiên Đồng':[3,1,4,5,2,5,3,1,4,5,2,5],
  'Liêm Trinh':[3,2,5,4,2,3,3,2,5,4,2,3],
  'Thiên Phủ':[5,4,3,2,5,4,5,4,3,2,5,4],
  'Thái Âm':[5,5,4,3,2,1,1,1,2,3,4,5],
  'Tham Lang':[3,2,5,4,1,3,3,2,5,4,1,3],
  'Cự Môn':[4,3,5,2,1,4,4,3,5,2,1,4],
  'Thiên Tướng':[3,4,5,2,3,4,3,4,5,2,3,4],
  'Thiên Lương':[4,3,2,5,4,3,4,3,2,5,4,3],
  'Thất Sát':[5,2,4,1,3,5,5,2,4,1,3,5],
  'Phá Quân':[3,4,1,2,5,3,3,4,1,2,5,3]
};
var MIEU_VUONG_TEN = {5:'Miếu',4:'Vượng',3:'Đắc Địa',2:'Bình',1:'Hãm Địa'};
var CHINH_TINH_DATA = {
  'Tử Vi':{nguHanh:'Thổ',loai:'Đế Tinh',dacTinh:'Sao chủ về quyền lực, lãnh đạo, cao quý. Phong thái uy nghiêm, tự trọng cao.',cung:{'Mệnh':'Có uy quyền, được kính trọng. Miếu: lãnh đạo giỏi. Hãm: tự cao, cô đơn.','Tài Bạch':'Tiền từ quyền lực. Miếu: giàu nhờ sự nghiệp. Hãm: hoang phí.','Quan Lộc':'Quyền cao chức trọng. Miếu: quan lớn, doanh nhân. Hãm: gian nan.','Phu Thê':'Lấy người có địa vị. Miếu: hôn nhân tốt. Hãm: kén chọn, muộn duyên.','Tử Tức':'Con có chí lớn. Miếu: con thành đạt. Hãm: con ít hoặc khó dạy.','Phúc Đức':'Phúc đức lớn. Miếu: tinh thần phong phú. Hãm: lo lắng nhiều.','Tật Ách':'Bệnh tỳ vị. Miếu: sức khỏe tốt. Hãm: bệnh mãn tính.','Thiên Di':'Đi đâu cũng được trọng. Miếu: quý nhân nhiều. Hãm: trở ngại.','Nô Bộc':'Cấp dưới trung thành. Miếu: phục vụ tốt. Hãm: bị phản.','Điền Trạch':'Nhà cửa khang trang. Miếu: gia sản lớn. Hãm: bấp bênh.','Phụ Mẫu':'Cha mẹ uy tín. Miếu: thừa hưởng nhiều. Hãm: xa cách.','Huynh Đệ':'Anh em quyền thế. Miếu: hòa thuận. Hãm: tranh giành.'}},
  'Thiên Cơ':{nguHanh:'Mộc',loai:'Thiện Tinh',dacTinh:'Sao chủ về mưu trí, sáng tạo, linh hoạt. Thông minh, nhanh nhẹn, giỏi tính toán.',cung:{'Mệnh':'Thông minh sáng tạo. Miếu: mưu lược gia. Hãm: lo lắng, thiếu quyết đoán.','Tài Bạch':'Kiếm tiền bằng trí tuệ. Miếu: giỏi đầu tư. Hãm: tính sai.','Quan Lộc':'Tham mưu, kỹ sư, khoa học. Miếu: phát triển. Hãm: đổi nghề.','Phu Thê':'Lấy người thông minh. Miếu: vợ/chồng giỏi. Hãm: quá tính toán.','Tử Tức':'Con thông minh. Miếu: tài năng. Hãm: hay suy nghĩ.','Phúc Đức':'Tâm linh phát triển. Miếu: phong phú. Hãm: lo nghĩ quá.','Tật Ách':'Bệnh gan, thần kinh. Miếu: OK. Hãm: stress.','Thiên Di':'Di chuyển nhiều. Miếu: đi xa may. Hãm: bôn ba.','Nô Bộc':'Bạn thông minh. Miếu: bạn tốt. Hãm: bị lừa.','Điền Trạch':'Hay đổi nhà. Miếu: nhà đẹp. Hãm: hay dọn.','Phụ Mẫu':'Cha mẹ thông minh. Miếu: giáo dục tốt. Hãm: xa sớm.','Huynh Đệ':'Anh em thông minh. Miếu: hỗ trợ. Hãm: bất đồng.'}},
  'Thái Dương':{nguHanh:'Hỏa',loai:'Quý Tinh',dacTinh:'Sao chủ về quý nhân, danh tiếng, bác ái. Đại diện cha, chồng, con trai.',cung:{'Mệnh':'Hào phóng, rộng rãi. Miếu: danh tiếng lớn. Hãm: phung phí.','Tài Bạch':'Tiền đến dễ đi dễ. Miếu: giàu có. Hãm: thất thoát.','Quan Lộc':'Sự nghiệp công. Miếu: công danh hiển hách. Hãm: thăng trầm.','Phu Thê':'Miếu: chồng giỏi. Hãm: chồng bất tài hoặc xa cách.','Tử Tức':'Con trai tốt. Miếu: con thành đạt. Hãm: con ít.','Phúc Đức':'Phúc lớn. Miếu: hưởng phúc trời. Hãm: phúc mỏng.','Tật Ách':'Bệnh tim, mắt. Miếu: khỏe. Hãm: tim, mắt kém.','Thiên Di':'Miếu: quý nhân phương xa. Hãm: đi xa gặp nạn.','Nô Bộc':'Miếu: được yêu quý. Hãm: bạn lợi dụng.','Điền Trạch':'Miếu: bất động sản tốt. Hãm: nhà không ổn.','Phụ Mẫu':'Miếu: cha giỏi. Hãm: cha mất sớm hoặc xa.','Huynh Đệ':'Miếu: anh em giúp đỡ. Hãm: bất hòa.'}},
  'Vũ Khúc':{nguHanh:'Kim',loai:'Tài Tinh',dacTinh:'Sao chủ về tiền bạc, quyết đoán, cứng cỏi. Giỏi tài chính, kinh doanh.',cung:{'Mệnh':'Cương nghị, quyết đoán. Miếu: doanh nhân thành đạt. Hãm: cô độc, cứng nhắc.','Tài Bạch':'Rất tốt, Tài Tinh. Miếu: giàu có, tài chính vững. Hãm: bất thường.','Quan Lộc':'Ngành tài chính, ngân hàng. Miếu: chức cao. Hãm: vất vả.','Phu Thê':'Vợ/chồng giỏi kiếm tiền. Miếu: ổn nếu tôn trọng. Hãm: xung đột.','Tử Tức':'Con ý chí mạnh. Miếu: thành đạt. Hãm: con ít, bướng.','Phúc Đức':'Hưởng thụ vật chất. Miếu: sung túc. Hãm: lo tiền.','Tật Ách':'Bệnh phổi, xương. Miếu: khỏe. Hãm: tai nạn kim loại.','Thiên Di':'Đi xa kiếm tiền tốt. Miếu: buôn bán phương xa. Hãm: vất vả.','Nô Bộc':'Miếu: người giỏi giúp kiếm tiền. Hãm: bị lừa tiền.','Điền Trạch':'Miếu: nhiều nhà đất. Hãm: khó giữ nhà.','Phụ Mẫu':'Cha mẹ nghiêm. Miếu: giàu có. Hãm: xa cách.','Huynh Đệ':'Miếu: hợp tác kinh doanh. Hãm: tranh chấp tài sản.'}},
  'Thiên Đồng':{nguHanh:'Thủy',loai:'Phúc Tinh',dacTinh:'Sao chủ về phúc lộc, hưởng thụ, lạc quan. Hiền lành, tốt bụng.',cung:{'Mệnh':'Hiền lành, vui vẻ. Miếu: thoải mái, nhiều phúc. Hãm: lười biếng, ỷ lại.','Tài Bạch':'Tiền đến dễ dàng nhờ phúc. Miếu: luôn đủ. Hãm: chi tiêu vô kế hoạch.','Quan Lộc':'Nghệ thuật, giải trí. Miếu: thành công. Hãm: lười làm.','Phu Thê':'Vợ/chồng hiền. Miếu: hạnh phúc. Hãm: chán nhau.','Tử Tức':'Con ngoan. Miếu: hiếu thảo. Hãm: lười học.','Phúc Đức':'Rất tốt. Miếu: hưởng phúc trọn đời. Hãm: phúc giảm vì lười.','Tật Ách':'Bệnh thận. Miếu: ổn. Hãm: bệnh lặt vặt.','Thiên Di':'Đi đâu cũng vui. Miếu: du lịch nhiều. Hãm: lười di chuyển.','Nô Bộc':'Bạn vui vẻ. Miếu: bạn tốt. Hãm: bạn rủ ăn chơi.','Điền Trạch':'Nhà ấm cúng. Miếu: đẹp. Hãm: nhỏ nhưng thoải mái.','Phụ Mẫu':'Cha mẹ hiền. Miếu: hạnh phúc. Hãm: nuông chiều quá.','Huynh Đệ':'Anh em hòa thuận. Miếu: giúp đỡ. Hãm: ai lo phận nấy.'}},
  'Liêm Trinh':{nguHanh:'Hỏa',loai:'Tù Tinh',dacTinh:'Sao chủ về chính trực, hình tụng. Miếu rất tốt, hãm rất xấu. Quyết liệt, đam mê.',cung:{'Mệnh':'Cá tính mạnh. Miếu: liêm chính, quyền cao. Hãm: thị phi, tù tội.','Tài Bạch':'Miếu: kiếm tiền chính đáng. Hãm: dính pháp luật.','Quan Lộc':'Miếu: quan chức liêm chính. Hãm: kiện tụng.','Phu Thê':'Miếu: vợ/chồng đẹp. Hãm: tình duyên phức tạp.','Tử Tức':'Miếu: con cá tính. Hãm: con bướng, rắc rối.','Phúc Đức':'Miếu: phúc nhờ chính trực. Hãm: nghiệp nặng.','Tật Ách':'Miếu: OK. Hãm: tai nạn, phẫu thuật.','Thiên Di':'Miếu: đi xa may. Hãm: kiện tụng.','Nô Bộc':'Miếu: trung thành. Hãm: phản bội.','Điền Trạch':'Miếu: ổn. Hãm: tranh chấp.','Phụ Mẫu':'Miếu: nghiêm khắc. Hãm: bất hòa.','Huynh Đệ':'Miếu: chính trực. Hãm: kiện tụng.'}},
  'Thiên Phủ':{nguHanh:'Thổ',loai:'Lộc Tinh',dacTinh:'Sao chủ về tài lộc, kho tàng, ổn định. Như kho bạc, sung túc, an toàn.',cung:{'Mệnh':'Phúc hậu, giàu có. Miếu: phú quý. Hãm: keo kiệt.','Tài Bạch':'Rất tốt, kho tiền đầy. Miếu: giàu bền vững. Hãm: có tiền không dám tiêu.','Quan Lộc':'Ổn định. Miếu: chức cao. Hãm: trì trệ.','Phu Thê':'Vợ/chồng giàu. Miếu: sung túc. Hãm: keo kiệt.','Tử Tức':'Con phú quý. Miếu: giàu. Hãm: bảo thủ.','Phúc Đức':'Phúc dày. Miếu: dư dả. Hãm: giảm.','Tật Ách':'Miếu: ít bệnh. Hãm: béo phì.','Thiên Di':'Miếu: kinh doanh xa tốt. Hãm: tốn kém.','Nô Bộc':'Miếu: có người giỏi. Hãm: nhân viên lười.','Điền Trạch':'Rất tốt. Miếu: BDS lớn. Hãm: cũ kỹ.','Phụ Mẫu':'Miếu: thừa kế nhiều. Hãm: keo kiệt.','Huynh Đệ':'Miếu: hỗ trợ tài chính. Hãm: tranh tài sản.'}},
  'Thái Âm':{nguHanh:'Thủy',loai:'Phú Tinh',dacTinh:'Sao chủ về sắc đẹp, tài sản, nhu mì. Đại diện mẹ, vợ, con gái.',cung:{'Mệnh':'Dịu dàng, xinh đẹp. Miếu: giàu có, sắc đẹp. Hãm: u buồn, yếu đuối.','Tài Bạch':'Rất tốt. Miếu: giàu nhờ BDS, nghệ thuật. Hãm: bấp bênh.','Quan Lộc':'Nghệ thuật, thời trang, BDS. Miếu: thuận lợi. Hãm: hay đổi.','Phu Thê':'Nam: vợ đẹp. Nữ: bản thân đẹp. Miếu: tốt. Hãm: lận đận.','Tử Tức':'Con gái đẹp. Miếu: hiếu thảo. Hãm: khó tính.','Phúc Đức':'Phúc từ mẹ. Miếu: đầy đủ. Hãm: mỏng.','Tật Ách':'Bệnh thận, mắt. Miếu: OK. Hãm: phụ khoa, thận.','Thiên Di':'Miếu: được giúp. Hãm: buồn, cô đơn.','Nô Bộc':'Miếu: bạn nữ tốt. Hãm: bị ghen.','Điền Trạch':'Rất tốt. Miếu: BDS giá trị. Hãm: tối tăm.','Phụ Mẫu':'Miếu: mẹ giàu. Hãm: mẹ yếu hoặc xa.','Huynh Đệ':'Miếu: chị em giúp. Hãm: xa cách.'}},
  'Tham Lang':{nguHanh:'Thủy',loai:'Đào Hoa Tinh',dacTinh:'Sao chủ về đào hoa, tham vọng, đa tài. Khéo giao tiếp nhưng cũng đa dục.',cung:{'Mệnh':'Đa tài, đào hoa. Miếu: thành công nhờ giao tiếp. Hãm: ham chơi, sa đọa.','Tài Bạch':'Kiếm tiền nhờ giao tiếp. Miếu: giàu nhờ giải trí. Hãm: nợ nần.','Quan Lộc':'Giải trí, ngoại giao. Miếu: sự nghiệp lớn. Hãm: sa sút vì tửu sắc.','Phu Thê':'Miếu: vợ/chồng đẹp. Hãm: phức tạp, ngoại tình.','Tử Tức':'Miếu: con đẹp. Hãm: ham chơi.','Phúc Đức':'Miếu: hưởng thụ. Hãm: sa đọa.','Tật Ách':'Miếu: OK. Hãm: nghiện, bệnh sinh dục.','Thiên Di':'Miếu: có người thương. Hãm: rắc rối tình ái.','Nô Bộc':'Miếu: bạn vui. Hãm: rủ ăn chơi.','Điền Trạch':'Miếu: nhà sang. Hãm: không ổn.','Phụ Mẫu':'Miếu: đa tài. Hãm: bất hòa.','Huynh Đệ':'Miếu: đông. Hãm: cạnh tranh.'}},
  'Cự Môn':{nguHanh:'Thủy',loai:'Ám Tinh',dacTinh:'Sao chủ về khẩu tài, tranh cãi. Miếu: tài ăn nói. Hãm: thị phi kiện tụng.',cung:{'Mệnh':'Giỏi ăn nói. Miếu: luật sư, MC giỏi. Hãm: thị phi, hại thân.','Tài Bạch':'Kiếm tiền nhờ miệng. Miếu: giàu nhờ buôn bán. Hãm: mất tiền kiện tụng.','Quan Lộc':'Luật, truyền thông. Miếu: thành công nhờ ăn nói. Hãm: nhiều thị phi.','Phu Thê':'Miếu: giỏi giao tiếp. Hãm: cãi vã, ly hôn.','Tử Tức':'Miếu: con giỏi nói. Hãm: con hay cãi.','Phúc Đức':'Miếu: tâm tốt. Hãm: nghiệp khẩu.','Tật Ách':'Miếu: OK. Hãm: bệnh miệng, dạ dày.','Thiên Di':'Miếu: thuyết phục giỏi. Hãm: thị phi nơi xa.','Nô Bộc':'Miếu: bạn thẳng thắn. Hãm: bạn nói xấu.','Điền Trạch':'Miếu: ổn. Hãm: tranh chấp.','Phụ Mẫu':'Miếu: nói hay. Hãm: bất hòa.','Huynh Đệ':'Miếu: thẳng thắn. Hãm: cãi nhau.'}},
  'Thiên Tướng':{nguHanh:'Thủy',loai:'Ấn Tinh',dacTinh:'Sao chủ về ấn tín, chức vụ, chính trực. Như tấm khiên bảo vệ.',cung:{'Mệnh':'Đứng đắn, trách nhiệm. Miếu: chức vụ lớn. Hãm: gánh vác quá nhiều.','Tài Bạch':'Miếu: ổn định nhờ chức vụ. Hãm: phụ thuộc.','Quan Lộc':'Miếu: ổn, có ấn tín. Hãm: phụ thuộc.','Phu Thê':'Miếu: đứng đắn. Hãm: ràng buộc.','Tử Tức':'Miếu: con ngoan. Hãm: gánh nặng.','Phúc Đức':'Miếu: phúc nhờ ấn tín. Hãm: lo lắng.','Tật Ách':'Miếu: ổn. Hãm: bệnh thận.','Thiên Di':'Miếu: được bảo vệ. Hãm: phụ thuộc.','Nô Bộc':'Miếu: cấp dưới tốt. Hãm: bị lợi dụng.','Điền Trạch':'Miếu: ổn. Hãm: nhà thuê.','Phụ Mẫu':'Miếu: bảo bọc. Hãm: áp đặt.','Huynh Đệ':'Miếu: che chở. Hãm: bị kiểm soát.'}},
  'Thiên Lương':{nguHanh:'Mộc',loai:'Thọ Tinh',dacTinh:'Sao chủ về tuổi thọ, đạo đức, từ bi, y học. Nhân hậu, có duyên tôn giáo.',cung:{'Mệnh':'Nhân hậu, thọ. Miếu: thầy thuốc, thầy giáo giỏi. Hãm: lo lắng, bệnh vặt.','Tài Bạch':'Miếu: tiền nhờ y dược, giáo dục. Hãm: bấp bênh.','Quan Lộc':'Miếu: ngành y, giáo dục. Hãm: chậm.','Phu Thê':'Miếu: hiền lành. Hãm: nhạt.','Tử Tức':'Miếu: hiếu thảo. Hãm: con ít.','Phúc Đức':'Rất tốt. Miếu: thọ, phúc dày. Hãm: giảm.','Tật Ách':'Miếu: rất tốt, thọ. Hãm: gan, thần kinh.','Thiên Di':'Miếu: an toàn. Hãm: lo lắng.','Nô Bộc':'Miếu: bạn đạo đức. Hãm: lợi dụng lòng tốt.','Điền Trạch':'Miếu: yên bình. Hãm: gần chùa.','Phụ Mẫu':'Miếu: cha mẹ thọ. Hãm: hay bệnh.','Huynh Đệ':'Miếu: thương nhau. Hãm: xa cách.'}},
  'Thất Sát':{nguHanh:'Kim',loai:'Sát Tinh',dacTinh:'Sao chủ về quyền uy, chiến đấu, cô độc. Miếu cực tốt, hãm cực xấu.',cung:{'Mệnh':'Uy quyền, dũng cảm. Miếu: tướng lĩnh, doanh nhân lớn. Hãm: hung hãn, tai nạn.','Tài Bạch':'Miếu: kiếm tiền bạo. Hãm: mất nhanh, rủi ro.','Quan Lộc':'Miếu: quân sự, kinh doanh mạo hiểm. Hãm: nguy hiểm.','Phu Thê':'Miếu: mạnh mẽ. Hãm: xung đột, ly hôn.','Tử Tức':'Miếu: cứng cỏi. Hãm: con ít, xa.','Phúc Đức':'Miếu: phúc nhờ dũng cảm. Hãm: nghiệp nặng.','Tật Ách':'Miếu: mổ xẻ nhưng qua. Hãm: tai nạn nghiêm trọng.','Thiên Di':'Miếu: đi xa thành công. Hãm: gặp nạn.','Nô Bộc':'Miếu: cấp dưới sợ nể. Hãm: phản bội.','Điền Trạch':'Miếu: thay đổi nhưng tốt. Hãm: mất nhà.','Phụ Mẫu':'Miếu: cha mẹ nghiêm. Hãm: xa sớm.','Huynh Đệ':'Miếu: mạnh. Hãm: bất hòa nghiêm trọng.'}},
  'Phá Quân':{nguHanh:'Thủy',loai:'Hao Tinh',dacTinh:'Sao chủ về phá cách, đổi mới, khai phá. Thích thay đổi, không chịu khuôn khổ.',cung:{'Mệnh':'Phá cách, cách mạng. Miếu: nhà cải cách, sáng tạo. Hãm: phá hoại, bất ổn.','Tài Bạch':'Miếu: kiếm tiền nhờ đổi mới. Hãm: bấp bênh, phá sản.','Quan Lộc':'Miếu: đổi mới, startup. Hãm: đổi nghề, thất bại.','Phu Thê':'Miếu: biến động nhưng thú vị. Hãm: ly hôn.','Tử Tức':'Miếu: con sáng tạo. Hãm: bướng, khó dạy.','Phúc Đức':'Miếu: phúc nhờ khai phá. Hãm: sóng gió.','Tật Ách':'Miếu: OK. Hãm: tai nạn, phẫu thuật.','Thiên Di':'Miếu: khai phá thành công. Hãm: bôn ba.','Nô Bộc':'Miếu: bạn sáng tạo. Hãm: phản bội.','Điền Trạch':'Miếu: đổi nhà nhiều. Hãm: mất nhà.','Phụ Mẫu':'Miếu: tiến bộ. Hãm: xa sớm.','Huynh Đệ':'Miếu: phá cách. Hãm: bất hòa.'}}
};
var PHU_TINH_DATA = {
  'Tả Phụ':{nguHanh:'Thổ',loai:'Cát Tinh',dacTinh:'Sao phò tá bên trái, quý nhân trợ giúp. Đi với chính tinh tốt thì tăng cát.',hieuUng:{'Mệnh':'Được nhiều quý nhân giúp. Gặp Tử Vi: cách Quân Thần Khánh Hội.','Tài Bạch':'Tài lộc nhờ quý nhân.','Quan Lộc':'Sự nghiệp được đề bạt.','Phu Thê':'Hôn nhân có quý nhân mai mối.','chung':'Mang lại sự trợ giúp cho cung.'}},
  'Hữu Bật':{nguHanh:'Thủy',loai:'Cát Tinh',dacTinh:'Sao phò tá bên phải, hỗ trợ âm thầm, khéo léo.',hieuUng:{'Mệnh':'Được quý nhân âm thầm giúp, khéo léo giao tiếp.','Tài Bạch':'Tài lộc đến nhờ quan hệ.','Quan Lộc':'Thăng tiến nhờ có người phò trợ.','Phu Thê':'Hôn nhân nhờ duyên phận tốt.','chung':'Mang quý nhân cho cung.'}},
  'Văn Xương':{nguHanh:'Kim',loai:'Cát Tinh',dacTinh:'Sao chủ về văn chương, học vấn, khoa bảng, trí tuệ.',hieuUng:{'Mệnh':'Thông minh, học giỏi, tài văn chương.','Tài Bạch':'Kiếm tiền bằng trí tuệ.','Quan Lộc':'Sự nghiệp học thuật, giáo dục thành công.','Phu Thê':'Vợ/chồng trí thức.','chung':'Nâng tầm trí tuệ cho cung.'}},
  'Văn Khúc':{nguHanh:'Thủy',loai:'Cát Tinh',dacTinh:'Sao chủ về nghệ thuật, âm nhạc, tài hoa, giao tiếp.',hieuUng:{'Mệnh':'Đa tài, giỏi nghệ thuật, duyên dáng.','Tài Bạch':'Kiếm tiền nhờ nghệ thuật.','Quan Lộc':'Sự nghiệp nghệ thuật phát triển.','Phu Thê':'Tình duyên lãng mạn.','chung':'Mang tính nghệ thuật cho cung.'}},
  'Lộc Tồn':{nguHanh:'Thổ',loai:'Tài Tinh',dacTinh:'Sao chủ về tài lộc bền vững, tiết kiệm, cần cù.',hieuUng:{'Mệnh':'Cần cù, tiết kiệm, có của ăn để. Nhưng dễ keo kiệt.','Tài Bạch':'Rất tốt, tài chính ổn định bền vững.','Quan Lộc':'Sự nghiệp ổn định, lương đều.','Điền Trạch':'Có nhà cửa, BDS tích lũy dần.','chung':'Mang ổn định tài chính cho cung.'}},
  'Thiên Mã':{nguHanh:'Hỏa',loai:'Cát Tinh',dacTinh:'Sao chủ về di chuyển, thay đổi, xuất ngoại. Gặp Lộc Tồn: Lộc Mã giao chi.',hieuUng:{'Mệnh':'Hay di chuyển, năng động. Hợp vận tải, du lịch.','Tài Bạch':'Tiền nhờ di chuyển, buôn bán. Gặp Lộc Tồn: rất giàu.','Quan Lộc':'Sự nghiệp liên quan di chuyển.','Thiên Di':'Rất tốt, hay đi xa, xuất ngoại.','chung':'Mang thay đổi, di chuyển cho cung.'}}
};
var TU_HOA_DATA = {
  'Hóa Lộc':{nguHanh:'Mộc',loai:'Cát Tinh',dacTinh:'Sao chủ về tài lộc, may mắn, phát triển.',hieuUng:{'Mệnh':'Đời nhiều may mắn, tài lộc tự đến.','Tài Bạch':'Cực tốt, tài chính dồi dào.','Quan Lộc':'Sự nghiệp phát đạt, thăng tiến nhanh.','Phu Thê':'Hôn nhân may mắn.','chung':'Mang tài lộc cho cung và sao được hóa.'}},
  'Hóa Quyền':{nguHanh:'Hỏa',loai:'Cát Tinh',dacTinh:'Sao chủ về quyền lực, kiểm soát, thống trị.',hieuUng:{'Mệnh':'Có uy quyền, lãnh đạo giỏi.','Tài Bạch':'Nắm quyền chi tiêu.','Quan Lộc':'Quyền lực trong sự nghiệp.','Phu Thê':'Nắm quyền trong gia đình.','chung':'Mang quyền lực cho cung.'}},
  'Hóa Khoa':{nguHanh:'Thủy',loai:'Cát Tinh',dacTinh:'Sao chủ về danh tiếng, học vấn, uy tín.',hieuUng:{'Mệnh':'Nổi tiếng, uy tín, học vấn cao.','Tài Bạch':'Giàu có danh tiếng.','Quan Lộc':'Sự nghiệp nổi tiếng.','Phu Thê':'Hôn nhân danh giá.','chung':'Mang danh tiếng cho cung.'}},
  'Hóa Kỵ':{nguHanh:'Thủy',loai:'Hung Tinh',dacTinh:'Sao chủ về trở ngại, thị phi. Nhưng cũng cho sự chuyên tâm.',hieuUng:{'Mệnh':'Nhiều trở ngại, nhưng chuyên tâm, kiên trì.','Tài Bạch':'Tài chính trắc trở, nhưng biết tiết kiệm.','Quan Lộc':'Sự nghiệp gian nan, nhưng chuyên nghiệp.','Phu Thê':'Hôn nhân trắc trở, ghen tuông.','Tật Ách':'Rất xấu, bệnh tật nhiều.','chung':'Trở ngại nhưng cho sự tập trung chuyên sâu.'}}
};
var SAT_TINH_DATA = {
  'Kình Dương':{nguHanh:'Kim',loai:'Sát Tinh',dacTinh:'Sao chủ về cương quyết, bạo liệt, xung đột.',hieuUng:{'Mệnh':'Miếu: dũng cảm, quả quyết. Hãm: hung hãn, tai nạn.','Tài Bạch':'Miếu: kiếm tiền mạnh. Hãm: mất tiền vì bạo lực.','Quan Lộc':'Miếu: quân đội, công an. Hãm: bất ổn.','Phu Thê':'Xung đột. Miếu: mạnh mẽ. Hãm: bạo lực.','Tật Ách':'Tai nạn, phẫu thuật, đổ máu.','chung':'Cương quyết nhưng bạo liệt.'}},
  'Đà La':{nguHanh:'Kim',loai:'Sát Tinh',dacTinh:'Sao chủ về trì trệ, kéo dài, dây dưa, vấn vương.',hieuUng:{'Mệnh':'Do dự, trì trệ, vấn vương quá khứ.','Tài Bạch':'Tiền đến chậm, nợ dây dưa.','Quan Lộc':'Sự nghiệp chậm tiến.','Phu Thê':'Tình duyên dây dưa, khó dứt.','Tật Ách':'Bệnh mãn tính, kéo dài.','chung':'Trì trệ, dây dưa.'}},
  'Hỏa Tinh':{nguHanh:'Hỏa',loai:'Sát Tinh',dacTinh:'Sao chủ về nóng nảy, bộc phát. Gặp Tham Lang: Hỏa Tham cách.',hieuUng:{'Mệnh':'Nóng nảy, bộc phát. Miếu: quyết đoán. Hãm: nóng giận gây họa.','Tài Bạch':'Tiền đến bất ngờ, mất bất ngờ.','Quan Lộc':'Đột phá bất ngờ. Gặp Tham Lang: phát tài nhanh.','Phu Thê':'Tình yêu sét đánh, tàn nhanh.','Tật Ách':'Bỏng, viêm, sốt, tai nạn lửa.','chung':'Bất ngờ, bộc phát.'}},
  'Linh Tinh':{nguHanh:'Hỏa',loai:'Sát Tinh',dacTinh:'Tương tự Hỏa Tinh nhưng âm thầm, dai dẳng hơn.',hieuUng:{'Mệnh':'Nóng nảy âm thầm. Kiên nhẫn nhưng bùng dữ dội.','Tài Bạch':'Tài chính đột biến chậm.','Quan Lộc':'Biến động. Gặp Tham Lang: Linh Tham cách.','Phu Thê':'Biến động ngầm.','Tật Ách':'Viêm mãn tính, sốt kéo dài.','chung':'Bất ngờ âm thầm.'}},
  'Địa Không':{nguHanh:'Hỏa',loai:'Sát Tinh',dacTinh:'Sao chủ về hao tán, trống rỗng. Nhưng cho tư duy triết học, sáng tạo.',hieuUng:{'Mệnh':'Hay mất mát. Nhưng theo triết học, nghệ thuật thì tốt.','Tài Bạch':'Hao tán, mất tiền bất ngờ.','Quan Lộc':'Bấp bênh. Tốt cho sáng tạo, triết học.','Phu Thê':'Trống vắng, cô đơn trong hôn nhân.','Tật Ách':'Trầm cảm, mất ngủ.','chung':'Hao tán nhưng cho chiều sâu tư duy.'}},
  'Địa Kiếp':{nguHanh:'Hỏa',loai:'Sát Tinh',dacTinh:'Sao chủ về kiếp nạn, mất mát lớn. Nặng hơn Địa Không. Cho ý chí phục hồi.',hieuUng:{'Mệnh':'Nhiều kiếp nạn. Nhưng có khả năng phục hồi mạnh.','Tài Bạch':'Mất tiền lớn bất ngờ, phá sản.','Quan Lộc':'Sụp đổ rồi xây lại.','Phu Thê':'Biến cố lớn.','Tật Ách':'Tai nạn nghiêm trọng.','chung':'Kiếp nạn nhưng cho sức mạnh tái sinh.'}}
};
var CACH_CUC = {
  thuongCach:[
    {ten:'Tử Phủ Đồng Cung',dieuKien:function(ls){return ls&&cungCo(ls,'Mệnh',['Tử Vi','Thiên Phủ']);},moTa:'Tử Vi và Thiên Phủ cùng tọa Mệnh. Đế tinh gặp Lộc tinh, quyền quý song toàn.',danhGia:'Thượng Cách: Quyền quý phú túc'},
    {ten:'Quân Thần Khánh Hội',dieuKien:function(ls){return ls&&cungCo(ls,'Mệnh',['Tử Vi'])&&(tamPhuongCo(ls,'Mệnh',['Tả Phụ'])||tamPhuongCo(ls,'Mệnh',['Hữu Bật']));},moTa:'Tử Vi tọa Mệnh, có Tả Phụ Hữu Bật hội chiếu. Vua có quần thần phò tá.',danhGia:'Thượng Cách: Lãnh đạo xuất chúng'},
    {ten:'Cơ Nguyệt Đồng Lương',dieuKien:function(ls){var c=0;var s=['Thiên Cơ','Thái Âm','Thiên Đồng','Thiên Lương'];for(var i=0;i<s.length;i++){if(tamPhuongCo(ls,'Mệnh',[s[i]]))c++;}return c>=3;},moTa:'Thiên Cơ, Thái Âm, Thiên Đồng, Thiên Lương hội tam phương. Làm công ăn lương ổn định.',danhGia:'Thượng Cách: Phúc lộc bền vững'},
    {ten:'Nhật Nguyệt Tịnh Minh',dieuKien:function(ls){return ls&&saoMieuVuong(ls,'Thái Dương')>=4&&saoMieuVuong(ls,'Thái Âm')>=4;},moTa:'Thái Dương và Thái Âm đều sáng. Âm dương cân bằng, đời quý hiển.',danhGia:'Thượng Cách: Âm dương cân bằng'},
    {ten:'Phủ Tướng Triều Viên',dieuKien:function(ls){return ls&&tamPhuongCo(ls,'Mệnh',['Thiên Phủ','Thiên Tướng']);},moTa:'Thiên Phủ và Thiên Tướng hợp chiếu Mệnh. Kho tàng và ấn tín đều có.',danhGia:'Thượng Cách: Phú quý song toàn'},
    {ten:'Tử Phủ Giáp Mệnh',dieuKien:function(ls){return ls&&!cungCo(ls,'Mệnh',['Tử Vi'])&&!cungCo(ls,'Mệnh',['Thiên Phủ'])&&cungLanCanCo(ls,'Mệnh','Tử Vi')&&cungLanCanCo(ls,'Mệnh','Thiên Phủ');},moTa:'Tử Vi và Thiên Phủ ở hai cung kề bên Mệnh. Đế tinh và lộc tinh kẹp bảo vệ.',danhGia:'Thượng Cách: Được 2 quý tinh bảo vệ'},
    {ten:'Tài Ấn Giáp Lộc',dieuKien:function(ls){return ls&&tamPhuongCo(ls,'Mệnh',['Hóa Lộc','Thiên Mã']);},moTa:'Hóa Lộc gặp Thiên Mã trong tam phương. Lộc Mã giao chi, tài lộc dồi dào.',danhGia:'Thượng Cách: Tài lộc dồi dào'},
    {ten:'Văn Tinh Ám Củng',dieuKien:function(ls){return ls&&tamPhuongCo(ls,'Mệnh',['Văn Xương','Văn Khúc']);},moTa:'Văn Xương và Văn Khúc hội chiếu Mệnh. Tài hoa, học vấn cao.',danhGia:'Thượng Cách: Tài hoa học vấn'}
  ],
  trungCach:[
    {ten:'Tham Vũ Đồng Hành',dieuKien:function(ls){return ls&&cungCo(ls,'Mệnh',['Tham Lang','Vũ Khúc']);},moTa:'Tham Lang và Vũ Khúc đồng cung Mệnh. Có tham vọng và khả năng tài chính.',danhGia:'Trung Cách: Có tài nhưng cần kiểm soát'},
    {ten:'Hỏa Tham Cách',dieuKien:function(ls){return ls&&cungCo(ls,'Mệnh',['Tham Lang','Hỏa Tinh']);},moTa:'Tham Lang gặp Hỏa Tinh. Đột phát bất ngờ.',danhGia:'Trung Cách: Đột phát'},
    {ten:'Linh Tham Cách',dieuKien:function(ls){return ls&&cungCo(ls,'Mệnh',['Tham Lang','Linh Tinh']);},moTa:'Tham Lang gặp Linh Tinh. Phát triển dần rồi bùng.',danhGia:'Trung Cách: Bùng nổ'},
    {ten:'Cự Nhật Đồng Cung',dieuKien:function(ls){return ls&&cungCo(ls,'Mệnh',['Cự Môn','Thái Dương']);},moTa:'Cự Môn gặp Thái Dương. Khẩu tài phát huy.',danhGia:'Trung Cách: Khẩu tài xuất chúng'},
    {ten:'Sát Phá Liêm Tham',dieuKien:function(ls){var c=0;var s=['Thất Sát','Phá Quân','Liêm Trinh','Tham Lang'];for(var i=0;i<s.length;i++){if(tamPhuongCo(ls,'Mệnh',[s[i]]))c++;}return c>=3;},moTa:'Thất Sát, Phá Quân, Liêm Trinh, Tham Lang hội tam phương. Sóng gió nhưng cơ hội lớn.',danhGia:'Trung Cách: Sóng gió nhưng cơ hội'},
    {ten:'Vũ Tướng Triều Đẩu',dieuKien:function(ls){return ls&&cungCo(ls,'Mệnh',['Vũ Khúc','Thiên Tướng']);},moTa:'Vũ Khúc gặp Thiên Tướng. Tài tinh gặp ấn tinh, ổn định.',danhGia:'Trung Cách: Tài chính có chức vị'}
  ],
  haCach:[
    {ten:'Mệnh Vô Chính Diệu',dieuKien:function(ls){return ls&&khongCoChinhTinh(ls,'Mệnh');},moTa:'Cung Mệnh không có chính tinh. Đời bấp bênh, phụ thuộc cung đối.',danhGia:'Hạ Cách: Bấp bênh'},
    {ten:'Nhật Nguyệt Phản Bối',dieuKien:function(ls){return ls&&saoMieuVuong(ls,'Thái Dương')<=2&&saoMieuVuong(ls,'Thái Âm')<=2;},moTa:'Thái Dương và Thái Âm đều hãm. Âm dương đều yếu.',danhGia:'Hạ Cách: Âm dương đều tối'},
    {ten:'Lục Sát Triều Viên',dieuKien:function(ls){var c=0;var s=['Kình Dương','Đà La','Hỏa Tinh','Linh Tinh','Địa Không','Địa Kiếp'];for(var i=0;i<s.length;i++){if(cungCo(ls,'Mệnh',[s[i]]))c++;}return c>=3;},moTa:'Ba sát tinh trở lên tụ tại Mệnh. Đời nhiều tai ương.',danhGia:'Hạ Cách: Nhiều sát tinh'},
    {ten:'Mã Đầu Đới Kiếm',dieuKien:function(ls){return ls&&cungCo(ls,'Mệnh',['Kình Dương'])&&cungMenhDiaChi(ls)===6;},moTa:'Kình Dương tại Mệnh cung Ngọ. Dũng mãnh nhưng nguy hiểm.',danhGia:'Hạ Cách: Dũng mãnh hiểm nguy'},
    {ten:'Không Kiếp Giáp Mệnh',dieuKien:function(ls){return ls&&cungLanCanCo(ls,'Mệnh','Địa Không')&&cungLanCanCo(ls,'Mệnh','Địa Kiếp');},moTa:'Địa Không và Địa Kiếp kẹp Mệnh. Hao tán bao vây.',danhGia:'Hạ Cách: Hao tán bao vây'}
  ]
};
function cungCo(ls,tenCung,dsSao){
  if(!ls||!ls.cung)return false;
  for(var i=0;i<ls.cung.length;i++){
    if(ls.cung[i].ten===tenCung){
      var sa=ls.cung[i].sao||[];
      for(var j=0;j<dsSao.length;j++){
        var f=false;
        for(var k=0;k<sa.length;k++){
          if(sa[k]===dsSao[j]){f=true;break;}
        }
        if(!f)return false;
      }
      return true;
    }
  }
  return false;
}
function tamPhuongCo(ls,tenCung,dsSao){
  if(!ls||!ls.cung)return false;
  var ci=-1;
  for(var i=0;i<ls.cung.length;i++){
    if(ls.cung[i].ten===tenCung){ci=i;break;}
  }
  if(ci<0)return false;
  var tp=[ci,(ci+4)%12,(ci+8)%12,(ci+6)%12];
  for(var s=0;s<dsSao.length;s++){
    var f=false;
    for(var t=0;t<tp.length;t++){
      var sa=ls.cung[tp[t]].sao||[];
      for(var k=0;k<sa.length;k++){
        if(sa[k]===dsSao[s]){f=true;break;}
      }
      if(f)break;
    }
    if(!f)return false;
  }
  return true;
}
function cungLanCanCo(ls,tenCung,tenSao){
  if(!ls||!ls.cung)return false;
  var ci=-1;
  for(var i=0;i<ls.cung.length;i++){
    if(ls.cung[i].ten===tenCung){ci=i;break;}
  }
  if(ci<0)return false;
  var left=(ci+11)%12;
  var right=(ci+1)%12;
  var sL=ls.cung[left].sao||[];
  var sR=ls.cung[right].sao||[];
  for(var j=0;j<sL.length;j++){if(sL[j]===tenSao)return true;}
  for(var k=0;k<sR.length;k++){if(sR[k]===tenSao)return true;}
  return false;
}
function khongCoChinhTinh(ls,tenCung){
  var CT=['Tử Vi','Thiên Cơ','Thái Dương','Vũ Khúc','Thiên Đồng','Liêm Trinh','Thiên Phủ','Thái Âm','Tham Lang','Cự Môn','Thiên Tướng','Thiên Lương','Thất Sát','Phá Quân'];
  if(!ls||!ls.cung)return true;
  for(var i=0;i<ls.cung.length;i++){
    if(ls.cung[i].ten===tenCung){
      var sa=ls.cung[i].sao||[];
      for(var j=0;j<sa.length;j++){
        for(var k=0;k<CT.length;k++){
          if(sa[j]===CT[k])return false;
        }
      }
      return true;
    }
  }
  return true;
}
function saoMieuVuong(ls,tenSao){
  if(!ls||!ls.cung||!MIEU_VUONG[tenSao])return 0;
  var CHI=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
  for(var i=0;i<ls.cung.length;i++){
    var sa=ls.cung[i].sao||[];
    for(var j=0;j<sa.length;j++){
      if(sa[j]===tenSao){
        var dc=ls.cung[i].diaChi||0;
        if(typeof dc==='string')dc=CHI.indexOf(dc);
        if(dc<0)dc=0;
        return MIEU_VUONG[tenSao][dc]||0;
      }
    }
  }
  return 0;
}
function cungMenhDiaChi(ls){
  if(!ls||!ls.cung)return-1;
  var CHI=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
  for(var i=0;i<ls.cung.length;i++){
    if(ls.cung[i].ten==='Mệnh'){
      var dc=ls.cung[i].diaChi||0;
      if(typeof dc==='string')return CHI.indexOf(dc);
      return dc;
    }
  }
  return-1;
}