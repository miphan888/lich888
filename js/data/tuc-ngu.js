/* ============================================================
   tuc-ngu.js — Tục ngữ, ca dao về ngày tốt xấu, thời tiết, mùa vụ
   Lịch Việt Nam 888
   ============================================================ */

var TUC_NGU_DATA = [
  /* --- Ngày tốt xấu, thời vận --- */
  'Tháng Giêng là tháng ăn chơi,\nTháng Hai cờ bạc, tháng Ba hội hè.',
  'Tháng Chạp là tháng trồng khoai,\nTháng Giêng trồng đậu, tháng Hai trồng cà.',
  'Ngày lành tháng tốt làm nên sự nghiệp,\nNgày xấu tháng dữ khó tránh tai ương.',
  'Cưới vợ chọn ngày, làm nhà chọn hướng.',
  'Nhà hướng Nam, đàn bà ba họ ấm no.',
  'Lấy vợ xem tông, lấy chồng xem giống.',
  'Đói cho sạch, rách cho thơm.',
  'Mồng Một tháng Giêng, mồng Bảy tháng Chạp.',
  'Ngày Rằm tháng Bảy, ma về như hội.',
  'Tháng Tư đong đậu nấu chè,\nĂn Tết Đoan Ngọ kể về tháng Năm.',

  /* --- Thời tiết --- */
  'Chuồn chuồn bay thấp thì mưa,\nBay cao thì nắng, bay vừa thì râm.',
  'Tháng Ba bà già chết rét.',
  'Mưa tháng Mười như người chết đuối tìm phao.',
  'Nắng tốt dưa, mưa tốt lúa.',
  'Mây kéo về đồng rét, mây kéo về núi mưa.',
  'Kiến tha lên đồi là dấu hiệu trời mưa.',
  'Trời có bốn phương, đất có tứ tung.',
  'Sấm tháng Ba, gà mái gáy sáng.',
  'Ếch kêu uôm uôm, ao chuôm đầy nước.',
  'Gió Đông là chồng gió Bắc,\nGió Nam là cô chú của gió Đông.',

  /* --- Mùa vụ, trồng trọt --- */
  'Nhất nước, nhì phân, tam cần, tứ giống.',
  'Người sống vì gạo, cá bạo vì nước.',
  'Cày sâu bừa kỹ, đất tốt mùa màng.',
  'Tháng Năm chặt lấy mà ăn,\nTháng Mười chặt lấy mà cân cho người.',
  'Con trâu là đầu cơ nghiệp.',
  'Trồng khoai đất cát, trồng lạc đất sâu.',
  'Lúa chiêm tháng Ba, lúa mùa tháng Mười.',
  'Được mùa mất giá, được giá mất mùa.',
  'Ruộng không phân như người không ăn.',

  /* --- Phong thủy, hướng nhà --- */
  'Lấy vợ hiền hòa, làm nhà hướng Nam.',
  'Đất lành chim đậu.',
  'Nhà cao cửa rộng, phúc lộc đầy vơi.',
  'Thần tài gõ cửa, vàng bạc đầy nhà.',
  'Phước bất trùng lai, họa vô đơn chí.',
  'Gieo nhân nào gặt quả nấy.',

  /* --- Sức khỏe, sinh hoạt --- */
  'Ăn chậm nhai kỹ no lâu, làm chậm tốt lâu.',
  'Cơm ăn mấy bát cũng no,\nTuổi thọ trời cho, chẳng sống được hơn.',
  'Ăn tươi nuốt sống bệnh lây,\nNấu chín ăn đúng an lành thân ta.',
  'Mồ hôi thánh thót như mưa ruộng cày,\nAi ơi bưng bát cơm đầy, dẻo thơm một hạt đắng cay muôn phần.',
  'Bầu ơi thương lấy bí cùng,\nTuy rằng khác giống nhưng chung một giàn.',
  'Chị ngã em nâng.',
  'Uống nước nhớ nguồn.'
];
