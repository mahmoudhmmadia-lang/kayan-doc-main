// Chapter 8, access group. Read-only captures: no shot saves anything. The role pages open an existing
// role without changing it, and the token wizard stays on its first step and is closed by the capture.
export const THEME='light';
const ROLE='/settings/roles/organizations/api_token_creators';
const API='/settings/api';
const expandOrg={sel:'main .CollapsibleTrigger',t:'^(Organizations|المنظمات) \\(\\d+\\)'};
const expandGroup={sel:'main .CollapsibleTrigger',t:'.',nth:1};
// The key pages show nothing until a member is chosen. Choosing one only reads; nothing else is pressed.
const chooseMember=[{sel:'main section [role=button][aria-haspopup=dialog]',t:'.'},{sel:'[role=option]',t:'^mmasri@rightcode.io',wait:5000}];
// A select on a settings row: the nth dropdown of the page, or its visible value.
const pick=(nth,t)=>({sel:'main button[aria-haspopup]',nth,t});
export const SHOTS=[
 {name:'ch08-roles',url:'/settings/roles',prep:[expandOrg],fitBottom:'main .CollapsibleTrigger',marks:[
  {t:'^(Add Role|إضافة الدور)$'},
  {t:'^(Grants|المنح)$'},
  {t:'^(Organizations|المنظمات) \\(\\d+\\)$'},
  {t:'^(Administrator|مدير النظام)$'},
  {t:'^(Forms|النماذج) \\(\\d+\\)$'}
 ]},
 {name:'ch08-roles-permissions',url:ROLE,prep:[expandGroup],fitBottom:'main .CollapsibleTrigger >> nth=7',marks:[
  {t:'^(Role Title|عنوان الدور)$'},
  {t:'^(Can be picked as an audience|يمكن اختياره كجمهور)$'},
  {sel:'[role=tab]',nth:0},
  {sel:'[role=tabpanel] input',nth:0},
  {sel:'main .CollapsibleTrigger',nth:1}
 ]},
 {name:'ch08-roles-assignees',url:ROLE,prep:[{sel:'[role=tab]',t:'^(Assignees|المسؤولين)$'}],fitBottom:'main [role=tabpanel]',marks:[
  {sel:'[role=tab]',nth:1},
  {sel:'[role=tabpanel] [role=combobox],[role=tabpanel] button',nth:0},
  {t:'^(Assigned Entities|الكيانات المعينة)$'}
 ]},
 {name:'ch08-roles-grants',url:'/settings/roles/grants',marks:[
  {t:'^(A role is only given by someone who holds its permissions|لا يُمنح دور إلا لمن يملك صلاحياته)$'},
  {t:'^(Grant lists|قوائم المنح)$'},
  {t:'^(Limit a role|تقييد دور)$'},
  {t:'^(Log refused attempts|تسجيل المحاولات المرفوضة)$'}
 ]},
 {name:'ch08-two-step',url:'/settings/two-step-verification',wait:5000,fitBottom:'main .rounded-lg',marks:[
  {sel:'[role=radiogroup]'},
  pick(0,'^(14 days|14 يومًا)$'),
  {t:'^(Authenticator app \\(TOTP\\)|تطبيق المصادقة \\(TOTP\\))$'},
  pick(1,'^(30 days|30 يومًا)$'),
  {t:'^(Enrollment|نسبة التفعيل)$'}
 ]},
 {name:'ch08-sessions',url:'/settings/sessions',wait:5000,fitBottom:'main .border-border-negative-subtle',marks:[
  pick(0,'^(30 days|30 يومًا)$'),
  pick(6,'^(7 days|7 أيام)$'),
  {sel:'main [role=switch]',nth:0,t:'^(New-device alerts|تنبيهات الأجهزة الجديدة)$'},
  {t:'^(What members will experience|ما سيختبره الأعضاء)$'},
  {t:'^(Sign out all app sessions|إنهاء جميع جلسات التطبيق)$',dom:1}
 ]},
 {name:'ch08-member-keys',url:'/settings/member-keys',prep:chooseMember,fitBottom:'main section',marks:[
  {sel:'main section [role=button][aria-haspopup=dialog]'},
  {t:'^(Refresh|تحديث)$'},
  {t:'^(Active|نشط)$'},
  {sel:'main section .rounded-md button:not([disabled])'}
 ]},
 {name:'ch08-key-enrollments',url:'/settings/member-keys/enrollments',fitBottom:'main section',marks:[
  {t:'^(Member|العضو)$'},
  {t:'^(Create|إنشاء)$'},
  {t:'^(Tokens expire after 15 minutes|تنتهي صلاحية الرموز بعد 15 دقيقة)',max:120}
 ]},
 {name:'ch08-key-member',url:'/signature-management',fitBottom:'main section .rounded-md >> nth=3',marks:[
  {t:'^(Signature Management|إدارة التوقيع)$'},
  {t:'^(Create Signature|إنشاء توقيع)$'}
 ]},
 {name:'ch08-key-audit',url:'/settings/member-keys/audit-log',prep:chooseMember,fitBottom:'main table tbody tr >> nth=3',marks:[
  {sel:'main section [role=button][aria-haspopup=dialog]'},
  {t:'^(Refresh|تحديث)$',dom:1},
  {t:'^(Event|الحدث)$'},
  {t:'^(Actor|المنفذ)$'}
 ]},
 {name:'ch08-api-tokens',url:API,fitBottom:'[data-testid=api-token-row] >> nth=7',wait:5000,marks:[
  {t:'^(Tokens|الرموز)$'},
  {t:'^(Create token|إنشاء رمز)$'},
  {t:'^(My tokens|رموزي)$'},
  {t:'^(Organization tokens|رموز المؤسسة)$'},
  {t:'^(Access|الوصول)$'}
 ]},
 {name:'ch08-api-create',url:API,keepDialog:true,wait:5000,fitBottom:'[data-testid=api-token-row] >> nth=3',prep:[{t:'^(Create token|إنشاء رمز)$'}],marks:[
  {sel:'[role=dialog] input',nth:0},
  {sel:'[role=dialog] textarea',nth:0},
  {sel:'[role=dialog] [role=radiogroup]',t:'^(You .personal token.|أنت .رمز شخصي.)$'}
 ]},
 {name:'ch08-api-service-accounts',url:API+'?tab=serviceAccounts',wait:5000,fitBottom:'[data-testid=service-accounts-panel]',marks:[
  {t:'^(Service accounts|حسابات الخدمة)$',dom:0},
  {t:'^(New service account|حساب خدمة جديد)$'},
  {t:'^(Role|الدور)$'},
  {t:'^(Managers|المسؤولون)$'}
 ]},
 {name:'ch08-api-activity',url:API+'?tab=activity',wait:5000,fitBottom:'[data-testid=api-request-row] >> nth=5',marks:[
  {t:'^(Activity|النشاط)$',dom:0},
  {t:'^(All requests|كل الطلبات)$'},
  {sel:'[data-testid=api-activity-panel] input',nth:0}
 ]},
 {name:'ch08-api-policy',url:API+'?tab=policy',wait:5000,fitBottom:'[data-testid=api-audit-trail] li >> nth=3',marks:[
  {t:'^(Enable the public API|تشغيل الواجهة البرمجية العامة)$'},
  {t:'^(Allow personal tokens|السماح بالرموز الشخصية)$'},
  {t:'^(Maximum lifetime|أقصى مدة صلاحية)$'},
  {t:'^(Revoke all tokens…|إلغاء كل الرموز…)$'},
  {t:'^(Audit trail|سجل التدقيق)$'}
 ]}
];
