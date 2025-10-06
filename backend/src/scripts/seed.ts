import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

// Data from constants.ts - Updated with all 50 products
const INITIAL_PRODUCTS = [
  {
    name: 'Cần Câu Cá shimano',
    description: 'Trải nghiệm độ nhạy và sức mạnh vô song với cây cần Graphite Pro. Thiết kế nhẹ cho phép ném mồi thoải mái trong nhiều giờ, lý tưởng để câu cá lớn.',
    price: 2000000,
    imageUrl: 'image/cancau1_v1.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Máy câu ngang Shimano 21 Scorpion DC',
    description: 'Máy câu Stealth 3000 cung cấp hệ thống hãm mượt mà và khung bền, chống ăn mòn. Với hệ thống 9+1 bạc đạn, nó mang lại những vòng quay hoàn hảo.',
    price: 5900000,
    imageUrl: '/public/image/maycau.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Cần Lure Shimano 22 Majestic XT',
    description: 'Bộ 5 mồi cá tuế sống động như thật này không thể cưỡng lại đối với các loài cá săn mồi. Với mắt 3D và hành động bơi lội linh hoạt, chúng đã được chứng minh là có thể kích hoạt các cú đớp mồi mạnh mẽ.',
    price: 1450000,
    imageUrl: 'public/cancau2.png',
    category: 'Cần câu',
    rating: 4,
  },
  {
    name: 'Máy câu Shimano EX',
    description: 'Dây câu bện DuraBraid cho khả năng chống mài mòn vượt trội và độ co giãn gần như bằng không. Dây thử 20lb này cắt xuyên qua nước và thảm thực vật.',
    price: 3200000,
    imageUrl: 'public/image/maycau2.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Ngang Daiwa PR',
    description: 'Một sản phẩm với dáng vẻ bên ngoài cực kỳ sắc xảo, được sản xuất bằng công nghệ tiên tiến gia công chính xác (CNC) nhưng có giá cực sinh viên.',
    price: 950000,
    imageUrl: 'public/image/maycau3.png',
    category: 'Máy câu',
    rating: 4,
  },
  {
    name: 'Dây PE YGK X-Braid Upgrade X8',
    description: 'Dây PE chất lượng cao từ Nhật Bản, siêu bền và siêu mịn, giúp ném mồi xa và chính xác hơn.',
    price: 650000,
    imageUrl: 'public/image/day1.png',
    category: 'Dây câu',
    rating: 5,
  },
  {
    name: 'Lưỡi câu titan',
    description: 'Gói 50 lưỡi câu siêu bén bằng titan. Điểm offset độc đáo đảm bảo tỷ lệ dính cá cao hơn, hoàn hảo cho cả câu nước mặn và nước ngọt.',
    price: 150000,
    imageUrl: 'public/image/luoi1.png',
    category: 'Lưỡi câu',
    rating: 5,
  },
  {
    name: 'Hộp đựng phụ kiện câu cá',
    description: 'Hộp đựng đa năng, chống nước, giúp bạn sắp xếp và bảo vệ các phụ kiện câu cá quan trọng một cách an toàn.',
    price: 350000,
    imageUrl: 'public/image/phukien1.png',
    category: 'Phụ kiện',
    rating: 4,
  },
  {
    name: 'Mồi Lure Câu Cá 3D',
    description: 'Cấu tạo cực kỳ độc đáo với mảnh "sừng" rẽ nước trên đầu có tác dụng tạo sóng nước hình chữ S giúp tăng hiệu quả thu hút con mồ',
    price: 35000,
    imageUrl: 'public/image/lure1.png',
    category: 'Mồi Lure',
    rating: 4,
  },
  {
    name: 'Mồi Lure Double Hook Minnow',
    description: 'Loại mồi này sẽ có một động tác bơi sống động trong nước, điều này sẽ thu hút sự chú ý và tấn công của cá',
    price: 35000,
    imageUrl: 'public/image/lure.png',
    category: 'Mồi Lure',
    rating: 4,
  },
  {
    name: 'Phao Câu Cá Cao Cấp',
    description: ' Phao câu cá, phao câu đơn được làm bằng vật liệu xốp cao cấp, chống thấm nước, bền bỉ với thời gian, phao nhẹ nên rất nhạy cá, thích hợp cho câu cần đơn như câu rô và các loại cá nhỏ. Trang trí dễ nhận biết cá ăn mồi, sang trọng, lịch sự.',
    price: 25000,
    imageUrl: 'public/image/phao.png',
    category: 'Phao',
    rating: 4,
  },
  {
    name: 'Cần Câu Cá shimano x8',
    description: 'Trải nghiệm độ nhạy và sức mạnh vô song với cây cần Graphite Pro. Thiết kế nhẹ cho phép ném mồi thoải mái trong nhiều giờ, lý tưởng để câu cá lớn.',
    price: 2000000,
    imageUrl: 'public/image/cancau3.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Cá Daiwa x80',
    description: 'Cần câu được chế tạo từ sợi carbon cao cấp, đảm bảo độ bền chắc nhưng vẫn nhẹ, giúp người chơi dễ dàng thao tác trong thời gian dài mà không mỏi tay.',
    price: 3000000,
    imageUrl: 'public/image/cancau4.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Cá Phantom',
    description: 'Thiết kế tay cầm phủ EVA chống trượt, tạo cảm giác thoải mái và chắc chắn khi cầm nắm, ngay cả khi tay ướt.',
    price: 4000000,
    imageUrl: 'public/image/cancau5.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Cá Daiwa fish pro',
    description: 'Khoen cần làm từ thép không gỉ kết hợp gốm cao cấp, hạn chế ma sát với dây câu và tăng tuổi thọ sử dụng.',
    price: 2000000,
    imageUrl: 'public/image/cancau6.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Cá Daiwa Wukong',
    description: 'Trọng lượng nhẹ, phân bố cân bằng, hỗ trợ thao tác nhanh, chính xác và giảm mệt mỏi cho cần thủ.Khả năng chịu tải cao, phù hợp để câu cá ở nhiều môi trường khác nhau như ao hồ, sông, suối hay biển.',
    price: 5500000,
    imageUrl: 'public/image/cancau7.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Stelas 5000',
    description: 'Máy câu được gia công bằng hợp kim nhôm cao cấp, chắc chắn và bền bỉ, chống va đập tốt.',
    price: 33000000,
    imageUrl: 'public/image/maycau4.png',
    category: 'Máy câu',
    rating: 4,
  },
  {
    name: 'Máy Câu Ngang Daiwa 6000',
    description: 'Thiết kế chống nước và chống bụi, bảo vệ các chi tiết bên trong, sử dụng tốt trong nhiều điều kiện.',
    price: 35900000,
    imageUrl: 'public/image/maycau5.png',
    category: 'Máy câu',
    rating: 4,
  },
  {
    name: 'Máy Câu Ngang Daiwa 7000',
    description: 'Tay quay chắc chắn, thiết kế gọn nhẹ, dễ dàng đảo chiều trái/phải theo nhu cầu.',
    price: 950000,
    imageUrl: 'public/image/maycau6.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Ngang Daiwa Stela',
    description: 'Lực kéo (drag) mạnh mẽ và ổn định, giúp cần thủ dễ dàng kiểm soát khi cá giãy mạnh.',
    price: 5000000,
    imageUrl: 'public/image/maycau7.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Ngang Daiwa PRX8',
    description: 'Thương hiệu uy tín, được cần thủ đánh giá cao, đảm bảo độ tin cậy lâu dài.',
    price: 5550000,
    imageUrl: 'public/image/maycau8.png',
    category: 'Máy câu',
    rating: 4,
  },
  {
    name: 'Day Câu PE YGK X-Braid Upgrade X8',
    description: 'Thương hiệu uy tín, được cần thủ đánh giá cao, đảm bảo độ tin cậy lâu dài.',
    price: 50000,
    imageUrl: 'public/image/day.png',
    category: 'Dây câu',
    rating: 5,
  },
  {
    name: 'Dây Câu PR',
    description: 'Chất liệu 100% fluorocarbon có độ bền cao, chống mài mòn tốt.',
    price: 550000,
    imageUrl: 'public/image/day2.png',
    category: 'Dây câu',
    rating: 4,
  },
  {
    name: 'Dây Câu PRX8',
    description: 'Chất liệu 100% fluorocarbon có độ bền cao, chống mài mòn tốt,thích hợp câu biển.',
    price: 550000,
    imageUrl: 'public/image/daycau3.png',
    category: 'Dây câu',
    rating: 4,
  },
  {
    name: 'Mồi Lure Double',
    description: 'Phù hợp để câu cá số lượng nhiều, không kén kích thước cá.',
    price: 355000,
    imageUrl: 'public/image/moicau2.png',
    category: 'Mồi Lure',
    rating: 4,
  },
  {
    name: 'Mồi Lure ',
    description: 'Phù hợp để câu cá số lượng nhiều, không kén kích thước cá.',
    price: 455000,
    imageUrl: 'public/image/moicau3.png',
    category: 'Mồi Lure',
    rating: 5,
  },
  {
    name: 'Thùng dụng cụ',
    description: 'Phù hợp để đựng các dụng cụ câu cá, không kén kích thước cá.',
    price: 455000,
    imageUrl: 'public/image/thung.png',
    category: 'Phụ kiện',
    rating: 5,
  },
  {
    name: 'Thùng dụng cụ Daiwa',
    description: 'Phù hợp để đựng các dụng cụ câu cá, không kén kích thước cá.',
    price: 500000,
    imageUrl: 'public/image/thung2.png',
    category: 'Phụ kiện',
    rating: 5,
  },
  {
    name: 'Cần Câu Cá Shimano Grappler',
    description: 'Thiết kế xoắn X tăng cường độ bền và lực kéo, lý tưởng cho câu cá biển sâu. Đỉnh cần nhạy cảm, dễ dàng phát hiện những cú táp nhẹ nhất. Tay cầm EVA chống trượt, thoải mái ngay cả khi chiến đấu với cá lớn.',
    price: 8250000,
    imageUrl: 'public/image/cancau8.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Lure Abu Garcia Fantasista',
    description: 'Cấu tạo carbon siêu nhẹ, mang lại cảm giác ném xa và chính xác. Khoen Fuji chất lượng cao giúp dây ra mượt mà, giảm ma sát. Phù hợp cho kỹ thuật câu lure với độ nhạy tối ưu.',
    price: 6150000,
    imageUrl: 'public/image/cancau9.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Đài Ryobi Zauber',
    description: 'Thiết kế thu gọn thông minh, tiện lợi cho việc di chuyển. Độ cứng vừa phải, phản ứng nhanh, thích hợp cho câu đài tại hồ dịch vụ hoặc sông nhỏ. Bề mặt sơn chống trầy xước, tăng tuổi thọ sản phẩm.',
    price: 3800000,
    imageUrl: 'public/image/cancau10.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Jig Major Craft Crostage',
    description: 'Chuyên dùng cho kỹ thuật jigging, độ nảy mạnh mẽ giúp mồi di chuyển linh hoạt, thu hút cá. Trọng lượng cần được cân bằng để giảm tải cho cổ tay khi thực hiện động tác giật. Chất liệu carbon mật độ cao, cực kỳ bền bỉ.',
    price: 7900000,
    imageUrl: 'public/image/cancau11.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Tay Tica Wasabi',
    description: 'Thiết kế thanh mảnh nhưng dẻo dai, phản lực tốt khi dòng cá. Thích hợp cho câu cá rô phi, cá chép nhỏ. Các đốt cần được gia cố, chống xoắn và tăng độ ổn định. Rất nhẹ, dễ dàng cầm lâu mà không mỏi.',
    price: 4550000,
    imageUrl: 'public/image/cancau12.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Pop/Shore Casting Penn Battle',
    description: 'Chịu được lực xoắn lớn, thiết kế để ném mồi nặng và xa trên bờ biển hoặc ghềnh đá. Hệ thống khoen chống gỉ sét, phù hợp môi trường nước mặn khắc nghiệt. Độ cứng **Heavy**, dành cho cá lớn.',
    price: 9800000,
    imageUrl: 'public/image/cancau13.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Đơn Daiwa Crossfire',
    description: 'Đa dụng, phù hợp cho người mới bắt đầu với giá thành hợp lý. Độ bền cao, có thể chịu được những va đập nhẹ. Phân bố lực đều, giúp kiểm soát cá dễ dàng hơn trong quá trình kéo.',
    price: 5000000,
    imageUrl: 'public/image/cancau14.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Bè Okuma Inspira',
    description: 'Độ nhạy cực cao ở đầu cần, tối ưu cho việc câu bè. Thiết kế ngắn, gọn, dễ dàng thao tác trong không gian hẹp. Chất liệu carbon đặc biệt tăng khả năng truyền động, không bỏ lỡ bất kỳ cú táp nào.',
    price: 4950000,
    imageUrl: 'public/image/cancau15.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Supa Fly G.Loomis NRX+',
    description: 'Cần câu **Fly** cao cấp, trọng lượng cực nhẹ, giúp đường ném mồi bay xa và chính xác hơn. Độ đàn hồi cao cấp, giảm thiểu công sức khi phải ném liên tục. Thiết kế sang trọng, hiệu suất vượt trội.',
    price: 12500000,
    imageUrl: 'public/image/cancau16.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Cá Mập Black Magic Equalizer',
    description: 'Cần câu chuyên dụng cho cá lớn và câu ngoài khơi, chịu được tải trọng **cực lớn**. Pad gắn máy câu bằng nhôm nguyên khối, đảm bảo an toàn. Tay cầm bọc da chống trượt, tăng độ bám và thoải mái.',
    price: 10500000,
    imageUrl: 'public/image/cancau17.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Cần Câu Carbon Đa Năng KastKing',
    description: 'Thiết kế hai khúc tiện lợi, dễ dàng lắp ráp và mang theo. Thích hợp cho cả câu lure và câu tự nhiên. Chất liệu carbon composite bền bỉ, mang lại sự cân bằng giữa sức mạnh và độ nhạy. Một lựa chọn tuyệt vời cho cần thủ thích sự linh hoạt.',
    price: 3200000,
    imageUrl: 'public/image/cancau18.png',
    category: 'Cần câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Đứng Shimano Stella SW',
    description: 'Thiết kế chống nước vượt trội, chuyên dụng cho câu biển nước mặn. Hệ thống phanh carbon mạnh mẽ, chịu tải lớn, lý tưởng cho việc chiến đấu với cá ngừ và cá mập. Hoạt động siêu mượt mà nhờ công nghệ Hagane Gear.',
    price: 15500000,
    imageUrl: 'public/image/maycau9.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Ngang Daiwa Tatula SV TW',
    description: 'Công nghệ T-Wing System (TW) giúp dây ra mượt mà, giảm ma sát tối đa, tăng khoảng cách ném. Hệ thống phanh Magforce Z điều chỉnh linh hoạt, chống rối dây hiệu quả. Thân máy nhẹ, làm từ hợp kim nhôm cao cấp.',
    price: 9200000,
    imageUrl: 'public/image/maycau10.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Đứng Penn Spinfisher VI',
    description: 'Khả năng chịu lực cao, phù hợp cho câu bờ và câu ghềnh. Thiết kế Sealed body chống cát và nước biển xâm nhập. Lực kéo (Drag) mạnh mẽ, đáng tin cậy khi câu các loại cá lớn.',
    price: 4500000,
    imageUrl: 'public/image/maycau11.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Fly Orvis Mirage LT',
    description: 'Máy câu **Fly** siêu nhẹ, gia công từ nhôm máy bay (aircraft aluminum). Hệ thống phanh hoàn toàn kín, hoạt động ổn định trong mọi điều kiện thời tiết. Tỷ lệ thu dây nhanh, rất thích hợp cho câu cá hồi.',
    price: 10800000,
    imageUrl: 'public/image/maycau12.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Ngang Abu Garcia Revo SX',
    description: 'Sử dụng 9 ổ bi thép không gỉ, đảm bảo độ bền và vận hành trơn tru. Thiết kế nhỏ gọn, công thái học, giúp cầm nắm thoải mái khi câu lure suốt cả ngày. Tỷ lệ truyền động cao, thu dây nhanh chóng.',
    price: 6750000,
    imageUrl: 'public/image/maycau13.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Đứng Okuma Ceymar',
    description: 'Giá thành phải chăng, hiệu suất ổn định. Rotor được thiết kế máy tính để giảm rung lắc. Phù hợp cho nhiều mục đích câu cá nước ngọt và nước lợ. Thiết kế lưỡi dao mỏng, trọng lượng nhẹ.',
    price: 2100000,
    imageUrl: 'public/image/maycau14.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Ngang Quantum Smoke S3',
    description: 'Khung nhôm chắc chắn, trọng lượng nhẹ. Thiết kế đặc biệt cho câu cá lóc và các loại cá săn mồi. Hệ thống đĩa phanh ceramic bền bỉ, cung cấp lực kéo nhất quán.',
    price: 7550000,
    imageUrl: 'public/image/maycau15.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Đứng Tica Scepter GX',
    description: 'Máy câu xa bờ với spool (ống chứa dây) lớn, tăng khả năng ném xa. Tỷ lệ truyền động chậm, tạo lực kéo khỏe, lý tưởng cho câu cá chép hoặc cá tra. Thiết kế bền bỉ, chống chịu va đập tốt.',
    price: 3850000,
    imageUrl: 'public/image/maycau16.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Jigging Maxel Rage',
    description: 'Máy câu ngang chuyên dụng cho kỹ thuật Jigging đứng. Thiết kế bánh răng cường lực, chịu được áp lực lớn khi câu ở độ sâu. Chức năng tay quay kép (dual crank handle) giúp thao tác dễ dàng, tạo lực kéo tối đa.',
    price: 11900000,
    imageUrl: 'public/image/maycau17.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Đứng Daiwa Saltiga',
    description: 'Là dòng máy câu cao cấp nhất của Daiwa, áp dụng công nghệ Monocoque Body (MQ) tăng cường sức mạnh và độ kín. Phù hợp cho mọi loại hình câu cá lớn trên biển. Hiệu suất vượt trội về độ bền và lực kéo.',
    price: 14200000,
    imageUrl: 'public/image/maycau18.png',
    category: 'Máy câu',
    rating: 5,
  },
  {
    name: 'Máy Câu Nước Ngọt Pflueger President',
    description: 'Máy câu đứng phổ thông, độ tin cậy cao, 10 ổ bi chống ăn mòn. Vận hành cực kỳ êm ái, lý tưởng cho câu hồ và sông. Thân máy nhẹ bằng graphite, thiết kế đẹp mắt và dễ sử dụng.',
    price: 3100000,
    imageUrl: 'public/image/maycau19.png',
    category: 'Máy câu',
    rating: 5,
  },
];

const INITIAL_USERS = [
  {
    name: 'Admin',
    email: 'admin@caucatv.com',
    password: 'adminpassword',
    role: 'admin'
  },
  {
    name: 'Khach Hang',
    email: 'customer@email.com',
    password: 'password120',
    role: 'customer'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log('📦 Seeding products...');
    const products = await Product.insertMany(INITIAL_PRODUCTS);
    console.log(`✅ ${products.length} products created`);

    console.log('👥 Seeding users...');
    const users = await User.insertMany(INITIAL_USERS);
    console.log(`✅ ${users.length} users created`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
