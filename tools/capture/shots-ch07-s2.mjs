// Stage 2 captures. The GUIDE-QA drafts used here were deleted after capture. To recapture, create two drafts in the
// interface language and pass their ids: KOS_CH07_S2_A (addressee, two approval stages, one attachment) and
// KOS_CH07_S2_B (addressee, text mentioning an attachment, no file), so the pre-send check has something to report.
const A = process.env.KOS_CH07_S2_A || '', B = process.env.KOS_CH07_S2_B || '';
const save = '^(Save as draft|حفظ كمسودة)$';

export const THEME = 'light';
export const SHOTS = [
 { name: 'ch07-compose', url: '/official-correspondence/compose', wait: 6000, fitBottom: '.oc-compose-actions', marks: [
  { t: '^(New letter|مراسلة جديدة)$', sel: 'main h2' },
  { sel: '.oc-props-panel [aria-haspopup=listbox]', nth: 0 },
  { sel: '.oc-props-panel [aria-haspopup=listbox]', nth: 1 },
  { sel: '.oc-props-seg' },
  { sel: '.oc-props-subject input' },
  { sel: '.oc-compose-body [contenteditable=true]' }
 ] },
 { name: 'ch07-recipients', url: `/official-correspondence/compose?drafts=${A}`, wait: 7000, fitBottom: '.oc-compose-actions', marks: [
  { sel: '.oc-tokens-field', nth: 0 },
  { sel: '.oc-tokens-field', nth: 1 },
  { sel: '.oc-props-direct' },
  { sel: '.oc-route-preview' },
  { sel: '.oc-chain-edit' }
 ] },
 { name: 'ch07-attachments', url: `/official-correspondence/compose?drafts=${A}`, wait: 7000, fitBottom: '.oc-compose-actions', marks: [
  { sel: '.oc-drop' },
  { sel: '.oc-compose-att' },
  { sel: '.oc-props-panel [aria-haspopup=listbox]', nth: 2 },
  { sel: '.oc-body-mode' }
 ] },
 { name: 'ch07-attachments-file', url: `/official-correspondence/compose?drafts=${A}`, wait: 7000, fitBottom: '.oc-compose-actions',
  prep: [{ sel: '.oc-body-mode button', t: '^(Body as a file|نص الكتاب ملف)$', wait: 1500 }], marks: [
  { sel: '.oc-body-mode' },
  { sel: '.oc-body-file-empty button' },
  { sel: '.oc-body-file-note', nth: 1 }
 ] },
 { name: 'ch07-check-save', url: `/official-correspondence/compose?drafts=${B}`, wait: 7000, fitBottom: '.oc-compose-actions',
  prep: [{ sel: '.oc-check-run', t: '^(Check now|فحص الآن)$', wait: 16000 }], marks: [
  { sel: '.oc-compose-paper' },
  { sel: '.oc-compose-state' },
  { sel: '.oc-check-run' },
  { sel: '.oc-check-findings' },
  { t: save }
 ] },
 { name: 'ch07-drafts', url: `/official-correspondence/tray?folder=drafts&id=${A}`, wait: 6000, fitBottom: '.oc-tray-reader', marks: [
  { t: '^(Drafts|المسودات)\\s*\\d*$' },
  { sel: '.oc-row[aria-selected=true]' },
  { t: '^(Continue editing|متابعة التحرير)$' },
  { sel: '.oc-toolbar-more' }
 ] }
];
