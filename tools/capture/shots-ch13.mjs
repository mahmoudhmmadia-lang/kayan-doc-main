export const THEME = 'dark';
const ACTIVE = { sel: '[role=tab][aria-selected=true], [role=tab][data-state=active]' };
const CREATE = { t: '^(Create|إنشاء)$' };
const EDIT = { t: '^(Edit|تعديل)$' };
const M = '/apps/hr/core/members/demo_m_adm';
const memberTabs = [[1, 'overview'], [2, 'orientation'], [3, 'personal'], [4, 'contact'], [5, 'qualifications'], [6, 'conflict_of_interest'],
  [7, 'financial'], [8, 'employment'], [9, 'attendance'], [11, 'custom%3Ahosted-email-accounts'], [12, 'custom%3Aworked-hours-assignment'],
  [13, 'custom%3Anotifications'], [14, 'custom%3Asessions'], [15, 'custom%3Atwo-step-verification'], [16, 'roles']];
const form = (name, url, extra = []) => ({ name, url, marks: [ACTIVE, ...extra, CREATE] });
export const SHOTS = [
  { name: 'ch01-workspaces-clear', url: '/', marks: [
    { t: '^(My workspaces|مساحات عملي)$' }, { t: '^(HR|الموارد البشرية)$', dom: 0 }, { t: '^(All workspaces|جميع مساحات العمل)$' }] },
  { name: 'ch01-apps-clear', url: '/', keepDialog: true, prep: [{ t: '^(All workspaces|جميع مساحات العمل)', wait: 3000 }], marks: [
    { sel: '[role=dialog] input' }, { t: '^(HR|الموارد البشرية)$', dom: 0 }, { t: '^(Builder|ادوات البناء)$', dom: 0 }] },
  { name: 'ch02-create-org', url: '/create-organization', marks: [
    { t: '^(Contact|جهة الاتصال|جهة ?\\n?الاتصال)', max: 20 }, { t: '^(Organization Details|Organization details|تفاصيل المؤسسة)$' }] },
  { name: 'ch03-hr-pages-clear', url: '/apps/hr', marks: [
    { t: '^(Records|السجلات)$', dom: 0 }, { t: '^(Members|الأعضاء)$', dom: 0 }, { t: '^(New record|سجل جديد)$', dom: 0 }] },
  { name: 'ch02-member-fields', url: `${M}?returnView=table&tab=overview`, marks: [ACTIVE, EDIT] },
  ...memberTabs.map(([n, tab]) => ({ name: `ch03-member-tab${n}`, url: `${M}?tab=${tab}&returnView=table`, marks: [ACTIVE, EDIT] })),
  form('ch02-position-fields', '/apps/hr/workforce/positions/add?tab=overview'),
  form('ch02-position-fields-tab2', '/apps/hr/workforce/positions/add?tab=orientation'),
  form('ch02-assignment-fields', '/apps/hr/workforce/assignments/add?tab=overview'),
  form('ch02-assignment-fields-tab2', '/apps/hr/workforce/assignments/add?tab=orientation'),
  form('ch02-node-fields', '/apps/hr/core/nodes/add?tab=overview'),
  form('ch02-node-fields-tab2', '/apps/hr/core/nodes/add?tab=orientation'),
  form('ch02-location-fields', '/apps/hr/core/locations/add?tab=overview'),
  form('ch02-location-fields-tab2', '/apps/hr/core/locations/add?tab=orientation'),
  form('ch02-location-fields-tab3', '/apps/hr/core/locations/add?tab=general_information'),
  form('ch02-location-fields-tab4', '/apps/hr/core/locations/add?tab=location_rooms'),
  form('ch03-feature-groups', '/apps/hr/workforce/groups/add?tab=member_selector%3Amembers'),
  form('ch03-feature-groups-tab1', '/apps/hr/workforce/groups/add?tab=member_selector%3Amembers'),
  { name: 'ch03-shift-example', url: '/apps/hr/time/shifts/add', marks: [{ t: '^(Name|الاسم)', max: 8, dom: 0 }, { t: '^(Working Days|Work Days|أيام العمل)$' }, { t: '^(Breaks|الاستراحات)$' }] },
  { name: 'ch03-feature-my-attendance', url: '/time/attendance', marks: [
    { sel: 'main h1' }, { t: { en: '^Work', ar: '^العمل$' }, max: 12, dom: 0 }, { t: { en: '^Needs ', ar: '^يحتاج تصحيحًا$' }, max: 25, dom: 0 }] },
  { name: 'ch03-feature-timesheets', url: '/apps/hr/time/work_time_entries', marks: [
    { sel: 'main h1' }, { t: '^(Today|اليوم)$', dom: 0 }, { t: '^(Week|الأسبوع)$' }] },
  form('ch03-leave-type-fields', '/apps/hr/time/leave_types/add?tab=rules'),
  form('ch03-leave-type-fields-tab1', '/apps/hr/time/leave_types/add?tab=rules'),
  { name: 'ch03-leave-fields', url: '/apps/hr/time/leaves/add', marks: [CREATE] },
  { name: 'ch03-feature-holiday-groups', url: '/apps/hr/time/holidays_groups', marks: [{ sel: 'main h1' }, { t: '^(New [Gg]roup|مجموعة جديدة)$' }] },
  { name: 'ch03-feature-attendance-corrections', url: '/time/attendance-corrections', marks: [{ sel: 'main h1' }] },
  { name: 'ch03-feature-attendance-policy', url: '/time/attendance-policy', marks: [
    { t: '^(New policy|سياسة جديدة)$' }, { t: '^(Open|فتح)', max: 10, dom: 0 }, { t: '^(Save|حفظ)$' }] },
  { name: 'ch03-feature-attendance-terminals', url: '/time/attendance-terminals', marks: [
    { t: '^(New network|شبكة جديدة)$' }, { t: '^(Settings|الإعدادات)$' }] },
  form('ch03-feature-seniority-levels', '/apps/hr/salaryScale/seniority_levels/add?tab=overview'),
  { name: 'ch03-feature-experience-levels', url: '/apps/hr/salaryScale/experience_level_groups', marks: [{ sel: 'main h1' }] },
  { name: 'ch03-feature-salary-scale', url: '/workforce/salary-scale', marks: [{ sel: 'main h1' }, { t: '^(Seniority Level|مستوى الأقدمية)$' }] },
  { name: 'ch03-payroll-input-fields', url: '/apps/hr/payment/payroll_inputs/add', marks: [CREATE] },
  { name: 'ch03-create-slips-clear', url: '/apps/hr/payment/salary_slips', marks: [{ t: '^(Create salary slips|إنشاء قسائم رواتب)$' }, { sel: 'main input' }] },
  { name: 'ch03-feature-payrolls', url: '/payment/payrolls', marks: [{ t: '^(Create payroll|إنشاء كشف رواتب)$' }, { t: '^(All statuses|جميع الحالات)$' }] },
];
