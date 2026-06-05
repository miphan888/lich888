/* ============================================================
   thap-nhi-truc.js — Dữ liệu 12 Trực (Thập Nhị Trực)
   Lịch Việt Nam 888
   ============================================================ */

var THAP_NHI_TRUC_DATA = [
  {
    ten: 'Kiến',
    icon: '🏗',
    moTa: 'Ngày Kiến — ngày dựng xây, khởi công. Là ngày khởi đầu trong chu kỳ 12 trực.',
    viecTot: ['Khởi công xây dựng', 'Khai trương', 'Xuất hành', 'Cưới hỏi', 'Ký kết hợp đồng', 'Trồng cây', 'Mua bất động sản'],
    viecXau: ['An táng', 'Sửa chữa mồ mả']
  },
  {
    ten: 'Trừ',
    icon: '🧹',
    moTa: 'Ngày Trừ — ngày trừ bỏ cái cũ, dọn dẹp. Tốt cho việc giải tỏa, kết thúc.',
    viecTot: ['Dọn dẹp nhà cửa', 'Giải hạn', 'Chữa bệnh', 'Cắt tóc', 'Tắm gội', 'Phá vỡ điều cũ'],
    viecXau: ['Khởi công', 'Khai trương', 'Cưới hỏi', 'Xuất hành xa']
  },
  {
    ten: 'Mãn',
    icon: '🌕',
    moTa: 'Ngày Mãn — ngày đầy đủ, sung mãn. Tốt cho tích lũy và thu hoạch.',
    viecTot: ['Khai kho', 'Nhập hàng', 'Thu tiền', 'Tích lũy tài sản', 'Mở cửa hàng'],
    viecXau: ['Xuất hành', 'Tống táng', 'Khởi tạo mới']
  },
  {
    ten: 'Bình',
    icon: '⚖️',
    moTa: 'Ngày Bình — ngày bình hòa, cân bằng. Thích hợp cho các việc thường ngày.',
    viecTot: ['Giao dịch thông thường', 'Hòa giải', 'Thăm bệnh', 'Đi đường xa', 'Dạy học'],
    viecXau: ['Kiện tụng', 'Tranh chấp']
  },
  {
    ten: 'Định',
    icon: '⚓',
    moTa: 'Ngày Định — ngày định hình, vững chắc. Tốt cho các việc cần sự ổn định.',
    viecTot: ['Cưới hỏi', 'Mua nhà đất', 'Ký hợp đồng dài hạn', 'Nhập học', 'Lập công ty'],
    viecXau: ['Xuất hành có tranh chấp', 'Kiện tụng']
  },
  {
    ten: 'Chấp',
    icon: '🤝',
    moTa: 'Ngày Chấp — ngày chấp hành, thu hoạch. Tốt cho việc thực thi và thu nạp.',
    viecTot: ['Thu nợ', 'Nhận hàng', 'Hội họp', 'Xây tường rào', 'Bắt đầu công việc mới'],
    viecXau: ['Xuất hành', 'Cưới hỏi', 'Tống táng']
  },
  {
    ten: 'Phá',
    icon: '⚡',
    moTa: 'Ngày Phá — ngày phá vỡ, bất lợi. Nên tránh các việc trọng đại.',
    viecTot: ['Phá dỡ công trình cũ', 'Kiện tụng (tranh chấp quyết liệt)'],
    viecXau: ['Khai trương', 'Cưới hỏi', 'Xuất hành', 'Xây dựng', 'Ký hợp đồng', 'Mọi việc trọng đại']
  },
  {
    ten: 'Nguy',
    icon: '⚠️',
    moTa: 'Ngày Nguy — ngày nguy hiểm, cần thận trọng. Tránh các việc mạo hiểm.',
    viecTot: ['Leo cao, sửa mái nhà (thận trọng)', 'Phơi phóng đồ đạc'],
    viecXau: ['Xuất hành xa', 'Phẫu thuật', 'Đầu tư mạo hiểm', 'Cưới hỏi']
  },
  {
    ten: 'Thành',
    icon: '🏆',
    moTa: 'Ngày Thành — ngày thành tựu, hoàn thành. Một trong những ngày tốt nhất.',
    viecTot: ['Khai trương', 'Cưới hỏi', 'Xuất hành', 'Khởi công', 'Ký hợp đồng', 'Nhập học', 'Mọi việc trọng đại'],
    viecXau: ['An táng']
  },
  {
    ten: 'Thu',
    icon: '🌾',
    moTa: 'Ngày Thu — ngày thu hoạch, tập hợp. Tốt cho việc thu nạp và tổng kết.',
    viecTot: ['Thu hoạch', 'Nhận tiền', 'Hội họp', 'Hòa giải tranh chấp', 'Kết thúc dự án'],
    viecXau: ['Khởi công', 'Xuất hành', 'Chôn cất']
  },
  {
    ten: 'Khai',
    icon: '🔓',
    moTa: 'Ngày Khai — ngày khai mở, khởi đầu thuận lợi. Tốt cho mọi việc mới.',
    viecTot: ['Khai trương', 'Khởi công', 'Cưới hỏi', 'Xuất hành', 'Ký hợp đồng', 'Trồng trọt', 'Đào giếng'],
    viecXau: ['An táng', 'Tống táng']
  },
  {
    ten: 'Bế',
    icon: '🔒',
    moTa: 'Ngày Bế — ngày đóng lại, kết thúc. Hợp với việc lưu trữ và cất giữ.',
    viecTot: ['Cất giữ tài sản', 'Đóng kho', 'Lưu trữ hồ sơ', 'An táng', 'Tống táng'],
    viecXau: ['Khai trương', 'Cưới hỏi', 'Xuất hành', 'Khởi công', 'Mọi việc khai mở mới']
  }
];
