// ══════════════════════════════════════════════════════
// LUNAR.JS — Engine chuyển đổi Dương lịch → Âm lịch
// Thuật toán Ho Ngoc Duc (chính xác cho múi giờ GMT+7)
// ══════════════════════════════════════════════════════

const THIEN_CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
const DIA_CHI   = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const THANG_TEN = ['Giêng','Hai','Ba','Tư','Năm','Sáu','Bảy','Tám','Chín','Mười','Mười Một','Chạp'];

function jdFromDate(d, m, y) {
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  let jd = d + Math.floor((153*mm+2)/5) + 365*yy + Math.floor(yy/4) - Math.floor(yy/100) + Math.floor(yy/400) - 32045;
  if (jd < 2299161) jd = d + Math.floor((153*mm+2)/5) + 365*yy + Math.floor(yy/4) - 32083;
  return jd;
}

function getNewMoonDay(k, tz) {
  const DR = Math.PI/180;
  const T = k/1236.85, T2 = T*T, T3 = T2*T;
  let jd1 = 2415020.75933 + 29.53058868*k + 0.0001178*T2 - 0.000000155*T3
            + 0.00033*Math.sin((166.56+132.87*T-0.009173*T2)*DR);
  const M   = (357.5291+29.10535608*k-0.0000333*T2-0.00000347*T3)*DR;
  const Mpr = (306.0253+385.81691806*k+0.0107306*T2+0.00001236*T3)*DR;
  const F   = (21.2964+390.67050646*k-0.0016528*T2-0.00000239*T3)*DR;
  let C1 = (0.1734-0.000393*T)*Math.sin(M)+0.0021*Math.sin(2*M)
           -0.4068*Math.sin(Mpr)+0.0161*Math.sin(2*Mpr)-0.0004*Math.sin(3*Mpr)
           +0.0104*Math.sin(2*F)-0.0051*Math.sin(M+Mpr)-0.0074*Math.sin(M-Mpr)
           +0.0004*Math.sin(2*F+M)-0.0004*Math.sin(2*F-M)-0.0006*Math.sin(2*F+Mpr)
           +0.0010*Math.sin(2*F-Mpr)+0.0005*Math.sin(M+2*Mpr);
  const deltaT = 0.000325+0.000032*Math.sin((M+0.00038)*DR);
  return Math.floor(jd1+C1-deltaT+0.5+tz/24);
}

function getSunLongitude(jdn, tz) {
  const DR = Math.PI/180;
  const T  = (jdn-2451545.5-tz/24)/36525;
  const T2 = T*T;
  let M = 357.52910 + 35999.05030*T - 0.0001559*T2 - 0.00000048*T2*T;
  let L0= 280.46645 + 36000.76983*T + 0.0003032*T2;
  let DL = (1.9146-0.004817*T-0.000014*T2)*Math.sin(M*DR)
           + (0.019993-0.000101*T)*Math.sin(2*M*DR)
           + 0.00029*Math.sin(3*M*DR);
  let theta = L0 + DL;
  const omega = 125.04-1934.136*T;
  theta -= 0.00569 - 0.00478*Math.sin(omega*DR);
  theta = theta - 360*Math.floor(theta/360);
  if (theta < 0) theta += 360;
  return Math.floor(theta/30);
}

function getLunarMonth11(y, tz) {
  const off = jdFromDate(31, 12, y) - 2415021;
  const k = Math.floor(off/29.530588853);
  let nm = getNewMoonDay(k, tz);
  const sunLong = getSunLongitude(nm, tz);
  if (sunLong >= 9) nm = getNewMoonDay(k-1, tz);
  return nm;
}

function getLeapMonthOffset(a11, tz) {
  let k = Math.round((a11-2415021.076998695)/29.530588853);
  let last = 0, i = 1, arc;
  do {
    last = arc;
    i++;
    arc = getSunLongitude(getNewMoonDay(k+i, tz), tz);
  } while (arc !== last && i < 14);
  return i-1;
}

function solar2Lunar(day, month, year, tz=7) {
  const dayNumber = jdFromDate(day, month, year);
  const k = Math.floor((dayNumber-2415021.076998695)/29.530588853);
  let monthStart = getNewMoonDay(k+1, tz);
  if (monthStart > dayNumber) monthStart = getNewMoonDay(k, tz);
  let a11 = getLunarMonth11(year, tz);
  let b11 = a11;
  let lunarYear;
  if (a11 >= monthStart) {
    lunarYear = year;
    a11 = getLunarMonth11(year-1, tz);
  } else {
    lunarYear = year+1;
    b11 = getLunarMonth11(year+1, tz);
  }
  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart-a11)/29);
  let isLeap = false;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, tz);
    if (diff >= leapOff-2) {
      lunarMonth = diff + 10;
      if (diff === leapOff-2) isLeap = true;
    }
  }
  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
  return [lunarDay, lunarMonth, lunarYear, isLeap];
}

function getCanChiNam(lunarYear) {
  const can = ((lunarYear - 4) % 10 + 10) % 10;
  const chi = ((lunarYear - 4) % 12 + 12) % 12;
  return THIEN_CAN[can] + ' ' + DIA_CHI[chi];
}

// Format: "ngày D tháng M năm Y (nhằm ngày D tháng [Tên] năm Can Chi)"
function formatNgayAmLich(dd, mm, yy) {
  const d  = parseInt(dd), m = parseInt(mm), y = parseInt(yy);
  const [ld, lm, ly, isLeap] = solar2Lunar(d, m, y);
  const canChi = getCanChiNam(ly);
  const tenThang = THANG_TEN[lm - 1];
  return `ngày ${d} tháng ${m} năm ${y} (nhằm ngày ${ld} tháng ${tenThang}${isLeap?' nhuận':''} năm ${canChi})`;
}
