// ══════════════════════════════════════════════════════
// DETAIL.JS — Logic trang chi tiết (Form → Preview → In)
// ══════════════════════════════════════════════════════

let currentVanKhan = null;
let currentStep = 1; // 1 = form, 2 = preview

function getSlugFromURL() {
  const p = new URLSearchParams(window.location.search);
  return p.get('slug');
}

function setStep(n) {
  currentStep = n;
  document.querySelectorAll('.step').forEach((el, i) => {
    el.classList.remove('active', 'done');
    if (i + 1 === n) el.classList.add('active');
    else if (i + 1 < n) el.classList.add('done');
  });
  document.getElementById('step-form').style.display    = n === 1 ? 'block' : 'none';
  document.getElementById('step-preview').style.display = n === 2 ? 'block' : 'none';
}

function renderForm(vanKhan) {
  const wrap = document.getElementById('form-fields');
  wrap.innerHTML = '';

  const allFields = [
    ...vanKhan.requiredFields.map(f => ({ key: f, required: true })),
    ...vanKhan.optionalFields.map(f => ({ key: f, required: false }))
  ];

  // De-duplicate
  const seen = new Set();
  const uniqFields = allFields.filter(f => {
    if (seen.has(f.key)) return false;
    seen.add(f.key); return true;
  });

  uniqFields.forEach(({ key, required }) => {
    const cfg = FIELD_CONFIG[key];
    if (!cfg) return;

    const div = document.createElement('div');
    div.className = 'form-group' + (cfg.type === 'textarea' ? ' full' : '');

    const labelHTML = `<label for="f-${key}">${cfg.label}${required ? '<span class="req"> *</span>' : ''}</label>`;

    let inputHTML = '';
    if (cfg.type === 'select') {
      inputHTML = `<select id="f-${key}" data-field="${key}" ${required ? 'required' : ''}>
        ${cfg.opts.map(o => `<option value="${o}">${o}</option>`).join('')}
      </select>`;
    } else if (cfg.type === 'textarea') {
      inputHTML = `<textarea id="f-${key}" data-field="${key}" placeholder="${cfg.ph || ''}" ${required ? 'required' : ''} rows="3"></textarea>`;
    } else if (cfg.type === 'date') {
      inputHTML = `<input type="date" id="f-${key}" data-field="${key}" value="${getTodayString()}" ${required ? 'required' : ''}>`;
    } else {
      inputHTML = `<input type="text" id="f-${key}" data-field="${key}" placeholder="${cfg.ph || ''}" ${required ? 'required' : ''}>`;
    }

    div.innerHTML = labelHTML + inputHTML;
    wrap.appendChild(div);
  });

  // Validate on any change
  wrap.addEventListener('input', () => validateForm(vanKhan));
  wrap.addEventListener('change', () => validateForm(vanKhan));
  validateForm(vanKhan);
}

function validateForm(vanKhan) {
  let valid = true;
  vanKhan.requiredFields.forEach(key => {
    const el = document.getElementById(`f-${key}`);
    if (!el) return;
    if (!el.value || el.value.trim() === '') valid = false;
  });
  document.getElementById('btn-preview').disabled = !valid;
}

function getFormData() {
  const data = {};
  document.querySelectorAll('[data-field]').forEach(el => {
    data[el.dataset.field] = el.value;
  });
  return data;
}

function showPreview() {
  const formData = getFormData();
  const html = processTemplate(currentVanKhan, formData, false);

  document.getElementById('preview-content').innerHTML = html;

  // Note box
  if (currentVanKhan.note) {
    document.getElementById('note-box').innerHTML =
      `<strong>📋 Lễ vật chuẩn bị:</strong><br>${currentVanKhan.note}`;
    document.getElementById('note-box').style.display = 'block';
  } else {
    document.getElementById('note-box').style.display = 'none';
  }

  // Build print area (hidden)
  buildPrintArea(formData);

  setStep(2);
}

function buildPrintArea(formData) {
  const html = processTemplate(currentVanKhan, formData, true);
  const area = document.getElementById('print-area');
  area.innerHTML = `<div class="print-title">${currentVanKhan.title}</div>\n${html}`;
}

function doPrint() {
  window.print();
}

document.addEventListener('DOMContentLoaded', () => {
  const slug = getSlugFromURL();
  if (!slug) { window.location.href = 'index.html'; return; }

  const vk = VAN_KHAN_DATA.find(v => v.slug === slug);
  if (!vk) { window.location.href = 'index.html'; return; }

  currentVanKhan = vk;

  document.getElementById('bai-title').textContent = vk.title;
  document.getElementById('bai-desc').textContent  = vk.description;
  document.title = vk.title + ' — Văn Khấn Việt';

  renderForm(vk);
  setStep(1);

  document.getElementById('btn-preview').addEventListener('click', showPreview);
  document.getElementById('btn-back').addEventListener('click', () => setStep(1));
  document.getElementById('btn-print').addEventListener('click', doPrint);
});
