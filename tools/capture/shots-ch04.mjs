export const THEME = 'dark';
const COL = '/tasks/codex_qa_collection_20260703_0945';
const TASK = `${COL}?taskId=tbt3uwpzmaibwcfy31i80`;
const tab = (en, ar) => ({ t: `^(${en}|${ar})$`, sel: '[role=tab],button', wait: 2500 });
// The QA task was started during earlier testing, so its main action may read Complete.
const START = { t: '^(Start|ابدأ|Complete|إكمال)$' };
export const SHOTS = [
  { name: 'ch04-collections', url: '/tasks', marks: [
    { t: '^(Add Collection|إضافة مجموعة)$' }, { t: '^(All Tasks|جميع المهام)$' }, { t: '^(Assigned to Me|مخصص لي)$' }, { t: '^(Assignments|التكليفات)$' }] },
  { name: 'ch04-collection-form', url: '/tasks', keepDialog: true, prep: [{ t: '^(Add Collection|إضافة مجموعة)$' }], marks: [
    { sel: '[role=dialog] input' }, { t: '^(Shared|مشتركة)$' }, { t: '^(Allowed task types|أنواع المهام المسموح بها)$', dom: 0 }, { t: '^(Create|إنشاء)$' }] },
  { name: 'ch04-board', url: COL, prep: [tab('Board', 'لوحة')], marks: [
    { t: '^(Board|لوحة)$' }, { t: '^(To Do|للعمل)$', dom: 0 }, { t: '^(Add filter|إضافة فلتر)$' }, { t: '^(Add Task|إضافة مهمة)$' }] },
  { name: 'ch04-list', url: COL, prep: [tab('List', 'قائمة')], marks: [
    { t: '^(List|قائمة)$' }, { sel: 'main input' }, { t: '^(Add filter|إضافة فلتر)$' }] },
  { name: 'ch04-checkins', url: COL, prep: [tab('Check-ins', 'المتابعة اليومية')], marks: [
    { t: '^(Check-ins|المتابعة اليومية)$' }, { t: '^(Needs attention|يحتاج إلى انتباه)$', max: 30 }, { t: '^(No update today|لا تحديث اليوم)$', max: 30 }] },
  { name: 'ch04-epics', url: COL, prep: [tab('Board', 'لوحة'), { t: '^(Epics|المشاريع)$', wait: 3000 }], marks: [
    { t: '^(Epics|المشاريع)$' }, { t: '^(Add Epic|إضافة مشروع)$' }, { t: '^(Create Epic|إنشاء ملحمة)$' }] },
  { name: 'ch04-details', url: TASK, reload: true, wait: 8000, marks: [
    START, { t: '^(Log progress|تسجيل التقدم)$' }, { t: '^(Owner|المالك)$' }, { t: '^(Priority|الأولوية)$' }] },
  { name: 'ch04-output', url: TASK, prep: [tab('Output', 'المخرجات')], marks: [{ t: '^(Output|المخرجات)$' }, START] },
  { name: 'ch04-challenges', url: TASK, prep: [tab('Challenges', 'التحديات')], marks: [{ t: '^(Challenges|التحديات)$' }, START] },
  { name: 'ch04-progress', url: TASK, prep: [{ ...tab('Progress', 'التقدم'), sel: '[role=tab]' }], marks: [
    { sel: '[role=tab][aria-selected=true], [role=tab][data-state=active]' }, { t: '^(Post|نشر)$' }, { t: '^(Log progress|تسجيل التقدم)$' }] },
  { name: 'ch04-requests', url: TASK, prep: [tab('Requests', 'الطلبات')], marks: [{ t: '^(Requests|الطلبات)$' }, { t: '^(New [Rr]equest|طلب جديد)$' }] },
  { name: 'ch04-comments', url: TASK, prep: [tab('Comments', 'التعليقات')], marks: [{ t: '^(Comments|التعليقات)$' }, { t: '^(Add|إضافة)$', dom: 0 }] },
  { name: 'ch04-activity', url: TASK, prep: [tab('Activities', 'الأنشطة')], marks: [{ t: '^(Activities|الأنشطة)$', dom: 1 }] },
  { name: 'ch04-records', url: TASK, prep: [tab('Relationships', 'العلاقات')], marks: [{ t: '^(Relationships|العلاقات)$', dom: 0 }, { t: '^(Link a record|ربط سجل)$' }] },
  { name: 'ch04-relations', url: TASK, prep: [tab('Related tasks', 'المهام المرتبطة')], marks: [{ t: '^(Related tasks|المهام المرتبطة)$' }, { t: '^(Add relation|إضافة علاقة)$' }] },
  { name: 'ch04-emails', url: TASK, prep: [tab('Emails', 'رسائل البريد')], marks: [{ t: '^(Emails|رسائل البريد)$', dom: 0 }, { t: '^(Add email|إضافة بريد)' }] },
  { name: 'ch04-suggestions', url: '/tasks/suggestions?status=pending', marks: [
    { t: '^(Pending|قيد المراجعة)', max: 20 }, { t: '^(Rejected|مرفوضة)$' }, { t: '^(Refresh|تحديث)$' }] },
  { name: 'ch04-assignments', url: '/tasks/assignments', wait: 6000, marks: [{ sel: 'main h1, main h2' }, { sel: 'main [role=tab], main button', nth: 0 }] },
  { name: 'ch04-settings', url: '/builder/task-settings', marks: [
    { t: '^(Tasks|المهام)$', sel: '[role=tab]' }, { t: '^(Categories|الفئات)$' }, { t: '^(Add|إضافة)$', dom: 0 }, { t: '^(Types|الأنواع)$' }] },
  { name: 'ch04-settings-epics', url: '/builder/task-settings', prep: [tab('Epics', 'المشاريع')], marks: [{ t: '^(Epics|المشاريع)$', dom: 0 }, { t: '^(Add|إضافة)$', dom: 0 }] },
  { name: 'ch04-settings-records', url: '/builder/task-settings', prep: [tab('Record relations', 'علاقات السجلات')], marks: [{ t: '^(Record relations|علاقات السجلات)$' }, { t: '^(Add|إضافة)', max: 20, dom: 0 }] },
  { name: 'ch04-settings-relations', url: '/builder/task-settings', prep: [tab('Task relations', 'علاقات المهام')], marks: [{ t: '^(Task relations|علاقات المهام)$' }, { t: '^(New relation type|نوع علاقة جديد)$' }] },
  { name: 'ch04-statuses', url: '/builder/status-templates', marks: [{ sel: 'main h1' }, { t: '^(Add|إضافة)$', dom: 0 }] },
];
