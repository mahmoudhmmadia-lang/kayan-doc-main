export const THEME='light';
const URL='/official-correspondence/settings';
const NAV='.oc-set-nav button';
const CUR={sel:'.oc-set-nav button[aria-current="true"]'};
const open=(t)=>[{sel:NAV,t}];
export const SHOTS=[
 {name:'ch07-settings-types',url:URL,prep:open('^(أنواع المراسلات|Letter types)$'),fitBottom:'.oc-set-panel',marks:[
  CUR,
  {t:'^(إضافة نوع|Add type)$'},
  {sel:'.oc-set-panel th',nth:5},
  {sel:'.oc-set-panel th',nth:7},
  {sel:'.oc-set-panel tbody tr .oc-set-actions button'}
 ]},
 {name:'ch07-settings-types-calendar',url:URL,prep:open('^(المهل والعطل|Deadlines and holidays)$'),fitBottom:'.oc-set-panel',marks:[
  CUR,
  {t:'^(إضافة سياسة|Add a policy)$'},
  {t:'^(الأحد|Sunday)$'},
  {t:'^(إدارة العطل|Manage holidays)$'},
  {t:'^(حفظ أيام العمل والعطل|Save working days and holidays)$'}
 ]},
 {name:'ch07-settings-types-numbering',url:URL,prep:open('^(الترقيم|Numbering)$'),fitBottom:'.oc-set-panel',marks:[
  CUR,
  {sel:'.oc-set-panel .oc-set-pattern'},
  {sel:'.oc-set-panel .oc-set-next'},
  {sel:'.oc-set-panel .oc-set-actions button'}
 ]},
 {name:'ch07-settings-registry',url:URL,prep:open('^(مكاتب الديوان|Registry offices)$'),fitBottom:'.oc-set-panel',marks:[
  CUR,
  {t:'^(ربط حساب بريد|Link a mailbox)$',dom:0},
  {t:'^(الدفتر اليدوي|Manual book)$',dom:0},
  {t:'^(توقيع إجراءات الديوان إلكترونياً|Sign registry acts electronically)$',dom:1},
  {t:'^(إضافة مكتب|Add office)$'}
 ]},
 {name:'ch07-settings-registry-fields',url:URL,prep:open('^(حقول السجل|Register fields)$'),fitBottom:'.oc-set',marks:[
  CUR,
  {t:'^(الوارد|Incoming)$'},
  {t:'^(حقل جديد|New field)$'},
  {sel:'.oc-set-panel tbody tr .oc-set-actions button'}
 ]},
 {name:'ch07-settings-registry-classifications',url:URL,prep:open('^(تصنيفات القيد|Entry classifications)$'),fitBottom:'.oc-set',marks:[
  CUR,
  {t:'^(الوارد|Incoming)$'},
  {t:'^(تصنيف جديد|New classification)$'},
  {sel:'.oc-set-panel tbody tr .oc-set-actions button'}
 ]},
 {name:'ch07-settings-templates',url:URL,prep:open('^(الترويسات والأختام|Letterheads and stamps)$'),fitBottom:'.oc-set-panel',marks:[
  {t:'^(ترويسة جديدة|New letterhead)$'},
  {t:'^(رمز QR للتحقق على الكتب الصادرة|Verification QR code on outgoing letters)$'},
  {t:'^(إضافة وحدة|Add unit)$'},
  {t:'^(ختم جديد|New stamp)$'},
  {t:'^(استبدال الصورة|Replace the image)$',dom:0}
 ]},
 {name:'ch07-settings-bodies',url:URL,prep:open('^(الجهات الخارجية|External bodies)$'),fitBottom:'.oc-set-panel',marks:[
  CUR,
  {t:'^(جهة جديدة|New body)$'},
  {sel:'.oc-set-panel input:not([type=checkbox])'},
  {t:'^(دمج المكررات|Merge duplicates)$',dom:0}
 ]},
 {name:'ch07-settings-bodies-addressing',url:URL,prep:open('^(قواعد المخاطبة|Addressing rules)$'),fitBottom:'.oc-addr-unit >> nth=7',marks:[
  CUR,
  {sel:'.oc-set-panel .oc-addr-unit'},
  {sel:'.oc-set-panel .oc-addr-mode'}
 ]},
 {name:'ch07-settings-bodies-forward',url:URL,prep:open('^(التحويل الآلي|Auto-forwarding)$'),fitBottom:'.oc-set',marks:[
  CUR,
  {t:'^(قاعدة جديدة|New rule)$'},
  {t:'^(أعلى درجة سرية|Highest level)$'},
  {t:'^(الفترة|Period)$'},
  {sel:'.oc-set-panel tbody tr .oc-set-actions button'}
 ]},
 {name:'ch07-settings-policies',url:URL,prep:open('^(الأرشيف والطباعة|Archive and printing)$'),fitBottom:'.oc-set-panel',marks:[
  CUR,
  {t:'^[0-9] — ',max:30},
  {sel:'.oc-set-panel .oc-seg'},
  {t:'^(تغيير الصيغة|Change the format)$'},
  {t:'^(رمز التحقق من الموظف|Employee verification QR)$'}
 ]},
 {name:'ch07-settings-policies-directives',url:URL,prep:open('^(التأشيرات الجاهزة|Ready directives)$'),fitBottom:'.oc-set',marks:[
  CUR,
  {sel:'.oc-set-panel textarea'},
  {t:'^(استعادة التأشيرات الافتراضية|Restore the default directives)$'}
 ]},
 {name:'ch07-settings-policies-performance',url:URL,prep:open('^(الأداء|Performance)$'),fitBottom:'.oc-set',marks:[
  CUR,
  {sel:'.oc-set-panel input',nth:0},
  {sel:'.oc-set-panel input',nth:4},
  {t:'^(اختيار وحدة|Choose a unit)$'}
 ]},
 {name:'ch07-settings-policies-ai',url:URL,prep:open('^(الذكاء الاصطناعي|Artificial intelligence)$'),fitBottom:'.oc-set',marks:[
  CUR,
  {t:'^[0-9] — ',max:30}
 ]},
 {name:'ch07-settings-policies-roles',url:URL,prep:open('^(الأدوار والصلاحيات|Roles and permissions)$'),fitBottom:'.oc-set',marks:[
  CUR,
  {t:'^(إدارة الأدوار|Manage roles)$'},
  {t:'^(كاتب الديوان|Registry clerk)$'},
  {t:'^(مدير المراسلات|Correspondence administrator)$'}
 ]}
];
