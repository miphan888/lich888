/* ====================================================================
 * app.js — Giao diện: xử lý form, gọi engine tính lá số, render lưới
 * 4x4 (12 cung Địa Bàn + Thiên Bàn trung tâm), tooltip giải nghĩa sao,
 * và chức năng in / xuất PDF (window.print).
 * ==================================================================== */

const TUHOA_SHORT = { loc: 'L', quyen: 'Q', khoa: 'Kh', ky: 'Kỵ' };

// Mô tả chung (dùng khi 1 sao chưa có trong STAR_MEANING)
const GENERIC_MEANING = {
  chinh: 'Một trong 14 chính tinh — đóng vai trò trung tâm, định hình tính cách và sắc thái chính của cung này.',
  tot: 'Cát tinh — mang ý nghĩa hỗ trợ, tăng thêm yếu tố tích cực cho cung an sao.',
  xau: 'Sát tinh / sao cần lưu ý — có thể mang ý nghĩa cản trở, hao tổn hoặc cần đề phòng cho cung này.',
  vong: 'Sao thuộc các vòng phụ (Trường Sinh, Thái Tuế, Bác Sĩ, Lộc Tồn...) — bổ sung sắc thái cho cung này.',
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chartForm');
  const khongRoGio = document.getElementById('khongRoGio');
  const gioSinhInput = document.getElementById('gioSinh');
  const printBtn = document.getElementById('printBtn');

  khongRoGio.addEventListener('change', () => {
    gioSinhInput.disabled = khongRoGio.checked;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit();
  });

  printBtn.addEventListener('click', () => window.print());

  document.getElementById('sampleBtn').addEventListener('click', () => {
    document.getElementById('hoTen').value = 'Phan Gia Bảo';
    document.getElementById('ngaySinh').value = 16;
    document.getElementById('thangSinh').value = 12;
    document.getElementById('namSinh').value = 2008;
    document.getElementById('gioiTinh').value = 'Nam';
    khongRoGio.checked = false;
    gioSinhInput.disabled = false;
    gioSinhInput.value = '09:30';
    handleSubmit();
  });

  // Đóng tooltip khi bấm ra ngoài, mở tooltip khi bấm vào 1 sao
  document.addEventListener('click', (e) => {
    const tooltip = document.getElementById('tooltip');
    const star = e.target.closest('.star');
    if (star) {
      showTooltip(star);
      e.stopPropagation();
    } else if (!e.target.closest('#tooltip')) {
      tooltip.classList.add('hidden');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement && document.activeElement.classList.contains('star')) {
      showTooltip(document.activeElement);
    }
    if (e.key === 'Escape') document.getElementById('tooltip').classList.add('hidden');
  });
});

function handleSubmit() {
  const errorBox = document.getElementById('errorBox');
  errorBox.classList.add('hidden');

  const hoTen = document.getElementById('hoTen').value.trim();
  const day = parseInt(document.getElementById('ngaySinh').value, 10);
  const month = parseInt(document.getElementById('thangSinh').value, 10);
  const year = parseInt(document.getElementById('namSinh').value, 10);
  const gioiTinh = document.getElementById('gioiTinh').value;
  const khongRoGio = document.getElementById('khongRoGio').checked;

  let hour = null, minute = 0;
  if (!khongRoGio) {
    const timeVal = document.getElementById('gioSinh').value; // "HH:MM"
    if (timeVal) {
      const parts = timeVal.split(':');
      hour = parseInt(parts[0], 10);
      minute = parseInt(parts[1], 10);
    }
  }

  const result = calculateChart({ hoTen, gioiTinh, day, month, year, hour, minute });

  if (result.error) {
    errorBox.textContent = '⚠️ ' + result.error;
    errorBox.classList.remove('hidden');
    document.getElementById('chartResult').classList.add('hidden');
    document.getElementById('placeholder').classList.remove('hidden');
    return;
  }

  renderChart(result);
}

/* ============================ RENDER ============================ */

function renderChart(result) {
  const grid = document.getElementById('tuviGrid');
  grid.innerHTML = '';

  // 12 cung Địa Bàn
  for (const palace of result.palaces) {
    const [row, col] = CHI_GRID_POS[palace.chiIdx];
    const cell = document.createElement('div');
    cell.className = 'palace-cell' + (palace.isMenh ? ' is-menh' : '');
    cell.style.gridRow = String(row + 1);
    cell.style.gridColumn = String(col + 1);
    cell.innerHTML = buildPalaceHTML(palace);
    grid.appendChild(cell);
  }

  // Thiên Bàn (trung tâm)
  const center = document.createElement('div');
  center.className = 'thienban-cell';
  center.innerHTML = buildThienBanHTML(result);
  grid.appendChild(center);

  document.getElementById('placeholder').classList.add('hidden');
  document.getElementById('chartResult').classList.remove('hidden');
  document.getElementById('approxWarning').classList.toggle('hidden', result.input.hasHour);

  // Cuộn lên đầu khu vực kết quả (hữu ích trên mobile)
  document.getElementById('chartResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildPalaceHTML(p) {
  const tags = [];
  if (p.isMenh) tags.push('<span class="tag menh-tag">MỆNH</span>');
  if (p.isThan) tags.push('<span class="tag than-tag">THÂN</span>');
  if (p.hasTuan) tags.push('<span class="tag tuan-tag">TUẦN</span>');
  if (p.hasTriet) tags.push('<span class="tag triet-tag">TRIỆT</span>');

  const chinhHtml = p.chinhTinh.map(c => starSpan(c.name, 'chinh', c.tuHoa)).join('');
  // Sắp xếp phụ tinh: cát tinh -> vòng -> sát tinh, để phần "tốt" nổi lên trước
  const order = { tot: 0, vong: 1, xau: 2 };
  const sortedStars = p.stars.slice().sort((a, b) => (order[a.group] ?? 1) - (order[b.group] ?? 1));
  const phuHtml = sortedStars.map(s => starSpan(s.name, s.group, s.tuHoa)).join('');

  return `
    <div class="palace-header">
      <span class="palace-name">${p.palaceName}</span>
      <span class="chi-name">${p.chi}</span>
    </div>
    <div class="palace-meta">
      <span class="age-range">Đại hạn ${p.ageRange[0]}–${p.ageRange[1]} (vận ${p.decadeIndex})</span>
      <div class="palace-tags">${tags.join('')}</div>
    </div>
    ${chinhHtml ? `<div class="chinh-tinh-row">${chinhHtml}</div>` : ''}
    <div class="phu-tinh-row">${phuHtml}</div>
  `;
}

function starSpan(name, group, tuHoa) {
  let html = `<span class="star ${group}" data-star="${escapeAttr(name)}" data-group="${group}" tabindex="0">${escapeHtml(name)}</span>`;
  if (tuHoa) {
    html += `<span class="tuhoa-mark tuhoa-${tuHoa}" title="${TUHOA_LABEL[tuHoa]}">${TUHOA_SHORT[tuHoa]}</span>`;
  }
  return html;
}

function buildThienBanHTML(r) {
  const inp = r.input;
  const row = (lbl, val) => `<div class="row"><span class="lbl">${lbl}</span><span class="val">${val}</span></div>`;

  const duong = `${pad2(inp.day)}/${pad2(inp.month)}/${inp.year}`;
  const am = `${pad2(r.lunar.day)}/${pad2(r.lunar.month)}${r.lunar.leap ? ' (nhuận)' : ''}/${r.lunar.year}`;
  const gioStr = inp.hasHour
    ? `${pad2(inp.hour)}:${pad2(inp.minute)} (${CHI[r.canChi.hourChiIdx]})`
    : 'chưa rõ (ước lượng)';

  return `
    <h2>THIÊN BÀN</h2>
    <div class="ten-chu">${escapeHtml(inp.hoTen || '(chưa rõ tên)')}</div>
    <div class="thienban-grid">
      ${row('Dương lịch', duong)}
      ${row('Âm lịch', am)}
      ${row('Giờ sinh', gioStr)}
      ${row('Giới tính', inp.gioiTinh)}
      ${row('Năm sinh', r.canChi.nam)}
      ${row('Tháng sinh', r.canChi.thang)}
      ${row('Ngày sinh', r.canChi.ngay)}
      ${row('Giờ (Can–Chi)', r.canChi.gio)}
      ${row('Cục', r.cuc.ten)}
      ${row('Âm Dương', r.amDuongLabel)}
      ${row('Mệnh chủ', r.menhChu)}
      ${row('Sao chủ Cục', r.saoChuCuc)}
    </div>
    <div class="thienban-extra">Mệnh tại <strong>${CHI[r.menhChiIdx]}</strong> · Thân tại <strong>${CHI[r.thanChiIdx]}</strong></div>
  `;
}

/* ============================ TOOLTIP ============================ */

function showTooltip(starEl) {
  const tooltip = document.getElementById('tooltip');
  const name = starEl.getAttribute('data-star');
  const group = starEl.getAttribute('data-group');
  const meaning = STAR_MEANING[name] || GENERIC_MEANING[group] || 'Sao phụ trong lá số Tử Vi.';

  tooltip.innerHTML = `<span class="tt-close" aria-label="Đóng">✕</span><span class="tt-title">${escapeHtml(name)}</span>${escapeHtml(meaning)}`;
  tooltip.classList.remove('hidden');

  const rect = starEl.getBoundingClientRect();
  const ttWidth = 280;
  let left = rect.left;
  let top = rect.bottom + 8;
  if (left + ttWidth > window.innerWidth - 10) left = window.innerWidth - ttWidth - 10;
  if (left < 10) left = 10;
  if (top + 120 > window.innerHeight) top = rect.top - 8 - 100;

  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';

  tooltip.querySelector('.tt-close').addEventListener('click', () => tooltip.classList.add('hidden'));
}

/* ============================ HELPERS ============================ */

function pad2(n) { return String(n).padStart(2, '0'); }

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, '&quot;');
}
