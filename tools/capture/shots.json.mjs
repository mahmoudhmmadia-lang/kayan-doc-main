// Builder chapter captures and their numbered markers. `t` is a regex source matching the
// English or Arabic label; `sel` (+ optional `nth`) targets elements without stable text.
const WS = '/entities/guide_qa_visit_requests/edit';
export const SHOTS = [
  { name: 'entities', url: '/entities', search: { en: 'Guide QA', ar: 'زيارة ضمان' }, marks: [
    { sel: 'main input' },
    { t: '^(Guide QA Visit requests|طلبات زيارة ضمان الجودة للمرشد)$' },
    { t: '^(Add Entity|إضافة كيان)$' },
    { t: '^(AI Entity Builder|منشئ الكيانات بالذكاء الاصطناعي)$' },
  ] },
  { name: 'ws-overview', url: `${WS}?section=overview`, marks: [
    { t: '^(Published|منشور) · ' },
    { t: '^(Before you publish|قبل النشر)$' },
    { t: '^(Preview as user|معاينة كمستخدم)$' },
    { t: '^(Review & publish|المراجعة والنشر)' },
  ] },
  { name: 'ws-fields', url: `${WS}?section=fields`, click: /Visit date|تاريخ الزيارة/, marks: [
    { t: '^(Add field|إضافة حقل)$' },
    { sel: '[role=group] button', nth: 2 },
    { sel: 'main input[value="Visit date"], main input[value="تاريخ الزيارة"]' },
    { t: '^(Calculated|محسوبة)$' },
    { t: '^(Only when…|فقط عندما…)$' },
  ] },
  { name: 'ws-record-page', url: `${WS}?section=recordPage`, marks: [
    { sel: 'main input' },
    { t: '^(\\+ ?)?(Tab|تبويب)$', max: 12 },
    { t: '^(Sample|العينة): ', max: 60 },
    { t: '^(Phone|الهاتف)$' },
  ] },
  { name: 'ws-lists', url: `${WS}?section=lists`, marks: [
    { sel: '[role=switch]', nth: 0 },
    { sel: '[role=switch]', nth: 1 },
    { t: '^(Add figure|إضافة مؤشر)$' },
  ] },
  { name: 'ws-rules', url: `${WS}?section=rules`, marks: [
    { t: '^(Add rule|إضافة قاعدة)$' },
    { t: '^(Limits|الحدود)$' },
    { t: '^(Date windows|النطاقات الزمنية)$' },
  ] },
  { name: 'ws-access', url: `${WS}?section=access`, marks: [
    { t: '^(Open in Settings › Roles|فتح في الإعدادات › الأدوار)$' },
    { t: '^(Field access|صلاحيات الحقول)$' },
    { t: '^(Check someone.s access|التحقق من صلاحيات شخص)$' },
    { t: '^(Add verb|إضافة فعل)$' },
  ] },
  { name: 'ws-movement', url: `${WS}?section=movement`, marks: [
    { sel: '[role=switch]', nth: 0 },
    { t: '^(Before you start|قبل البدء)$' },
    { t: '^(Set up movement|إعداد الحركة)$' },
  ] },
  { name: 'ws-actions', url: `${WS}?section=actions`, marks: [
    { t: '^(Add action|إضافة إجراء)$' },
    { t: '^(Automations|الأتمتة)$' },
  ] },
  { name: 'ws-import', url: `${WS}?section=import`, marks: [
    { sel: '[role=switch]', nth: 0 },
    { t: '^\\+ ?(Add key|إضافة مفتاح)$' },
    { t: '^(Checks before publishing|فحوص قبل النشر)$' },
  ] },
  { name: 'ws-advanced', url: `${WS}?section=advanced`, marks: [
    { t: '^(Record name|اسم السجل)$' },
    { t: '^(Unique values|القيم الفريدة)$' },
    { t: '^(Parent records|السجلات الأم)$' },
    { t: '^(Where it shows|أين يظهر)$' },
    { t: '^(Definition file|ملف التعريف)$' },
  ] },
  { name: 'records', url: '/apps/misc/misc/guide_qa_visit_requests', marks: [
    { t: '^(Calendar|التقويم)$' },
    { t: '^(Add|إضافة)$' },
    { t: '^(Visit date|تاريخ الزيارة)$' },
  ] },
  { name: 'navigation', url: '/builder/navigation', marks: [
    { t: '^(Add app|إضافة تطبيق)$' },
    { sel: 'main input' },
    { t: '^(Save changes|حفظ التغييرات)$' },
  ] },
  { name: 'work-navigation', url: '/builder/work-navigation', marks: [
    { t: '^(Features|الميزات)$' },
    { t: '^(Sources|المصادر)$' },
    { t: '^(Save|حفظ)$' },
  ] },
  { name: 'forms', url: '/forms', marks: [
    { t: '^(Create Form|إنشاء نموذج)$' },
    { t: '^(Import|استيراد)$' },
    { sel: 'main input' },
  ] },
  { name: 'services', url: '/services', marks: [
    { t: '^(New service|خدمة جديدة)$' },
    { t: '^(Intake desk|مكتب الاستقبال)$' },
    { t: '^(Service performance|أداء الخدمات)$' },
    { t: '^(Internal forms|نماذج داخلية)$' },
  ] },
  { name: 'internal-sops', url: '/internal-sop', marks: [
    { t: '^(New SOP|إجراء جديد)$' },
    { t: '^(Runs|عمليات التشغيل)$' },
    { t: '^(Connections|الاتصالات)$' },
  ] },
  { name: 'bots', url: '/bots', wait: 8000, marks: [
    { t: '^(Add Bot|إضافة بوت)$' },
    { sel: 'main input' },
  ] },
  { name: 'docx', url: '/builder/docx-templates', marks: [
    { t: '^(Create template|إنشاء قالب)$' },
    { t: '^(Managed templates|القوالب المُدارة)$' },
    { t: '^(Open|فتح)$' },
  ] },
  { name: 'xlsx', url: '/builder/xlsx-templates', marks: [
    { t: '^(New XLSX template|قالب XLSX جديد)$' },
    { t: '^(Workbook templates|قوالب المصنفات)$' },
    { t: '^(Open|فتح)$' },
  ] },
  { name: 'print', url: '/builder/print-templates', marks: [
    { t: '^(Identities & letterheads|الهويات والترويسات)$' },
    { t: '^(Uploaded Word templates|قوالب Word المرفوعة)$' },
    { t: '^(Open in the builder|فتح في المنشئ)$' },
  ] },
  { name: 'identities', url: '/builder/identities', marks: [
    { t: '^(New identity|هوية جديدة)$' },
    { t: '^(Letterheads|الترويسات) \\(' },
    { t: '^(Logos|الشعارات)$' },
    { t: '^(Save|حفظ)$' },
  ] },
  { name: 'dashboards', url: '/dashboards', marks: [
    { t: '^(Create Dashboard|إنشاء لوحة معلومات)$' },
    { t: '^(Create Folder|إنشاء مجلد)$' },
  ] },
  { name: 'pages', url: '/builder/pages', marks: [
    { t: '^(Add page|إضافة صفحة)$' },
  ] },
  { name: 'ai-dashboards', url: '/ai-dashboards', wait: 20000, marks: [{ sel: 'iframe' }] },
  { name: 'ai-reports', url: '/ai-reports', wait: 20000, marks: [{ sel: 'iframe' }] },
];
