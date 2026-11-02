export const THEME='light';
const R='/settings/approval-routes';
const E='/settings/evaluation-templates';
const F='/settings/followup';
const K='/settings/record-keeping';
const TPL=E+'/tender_technical_goods';
const TAB={sel:'[role=tab][aria-selected="true"]'};
const CUR={sel:'a[aria-current="page"]'};
const NAVF='nav[aria-label] a >> nth=-1';
const SUB={sel:'a[aria-current="page"]',nth:1};
const FIT='main *:not(:has(*)):visible';
const DLG='[role=dialog] button >> nth=-1';
const tab=(t)=>[{sel:'[role=tab]',t}];
export const SHOTS=[
 {name:'ch08-approval-routes',url:R,fitBottom:'tbody tr >> nth=8',marks:[
  {t:'^(مسار جديد|New route)$'},
  {t:'^(استيراد|Import)$'},
  {sel:`a[href="${R}/settings"]`},
  {t:'^(قيد الاستخدام|In use) \\d+$'},
  {sel:'thead th',nth:4}
 ]},
 {name:'ch08-approval-routes-editor',url:R+'/ministry_of_finance_budget_approval',fitBottom:'#approval-route-section-stages',marks:[
  {t:'^(المراحل|Stages)$',dom:0},
  {t:'^(محاكاة|Simulate)$'},
  {t:'^(الإصدارات|Versions)$',dom:0},
  {t:'^(نشر الإصدار|Publish v)'},
  {t:'^(النمط|Mode)$'}
 ]},
 {name:'ch08-approval-routes-settings',url:R+'/settings',marks:[
  {t:'^(مفعّلة لهذه الجهة|On for this organization)$'},
  {t:'^(أيام العمل|Working days)$'},
  {t:'^(مجموعة العطل|Holiday group)$'},
  {t:'^(أطول مدة للتفويض|Longest delegation)$'},
  {t:'^(تحقّق من تاريخ|Check a date)$'}
 ]},
 {name:'ch08-evaluation-templates',fitBottom:FIT,url:E,marks:[
  {t:'^(قالب جديد|New template)$'},
  {t:'^(حزمة المشتريات|Procurement pack) \\d+$'},
  {t:'^(اعرض الموقوفة|Show retired)$'},
  {sel:'thead th',nth:6},
  {sel:'tbody tr button'}
 ]},
 {name:'ch08-evaluation-templates-criteria',url:TPL,marks:[
  TAB,
  {t:'^(إضافة معيار|Add criterion)$'},
  {t:'^(إضافة مجموعة|Add group)$'},
  {t:'^(نشر الإصدار|Publish v)'}
 ]},
 {name:'ch08-evaluation-templates-scoring',url:TPL,fitBottom:FIT,prep:tab('^(الدرجات|Scoring)$'),marks:[
  TAB,
  {t:'^(نموذج الدرجات|Scoring model)$'},
  {t:'^(حد القبول|Pass threshold)$'},
  {t:'^(أحكام الشروط الإلزامية|Mandatory verdicts)$'}
 ]},
 {name:'ch08-evaluation-templates-bands',url:E+'/supplier_performance',fitBottom:FIT,prep:tab('^(الفئات|Bands)$'),marks:[
  TAB,
  {t:'^(إضافة فئة|Add band)$'},
  {t:'^(عند عدم استيفاء معيار إلزامي|When a mandatory criterion is not met)$'}
 ]},
 {name:'ch08-followup',url:F,marks:[
  TAB,
  {t:'^(سبب جديد|New reason)$',dom:0},
  {t:'^(تعديل الفئات|Edit categories)$'}
 ]},
 {name:'ch08-followup-reason',url:F,keepDialog:true,prep:[{t:'^(سبب جديد|New reason)$'}],marks:[
  {t:'^(المفتاح|Key)$'},
  {t:'^(الفئة|Category)$'},
  {t:'^(يوقف الساعة|Stops the clock)$'},
  {t:'^(إضافة السبب|Add reason)$'}
 ]},
 {name:'ch08-followup-blockers',fitBottom:FIT,url:F,prep:tab('^(أنواع العوائق|Blocker types)$'),marks:[
  TAB,
  {t:'^(نوع عائق جديد|New blocker type)$',dom:0}
 ]},
 {name:'ch08-followup-interventions',fitBottom:FIT,url:F,prep:tab('^(التدخلات|Interventions)$'),marks:[
  TAB,
  {t:'^(موعد القرار|Decision due)'},
  {t:'^(إضافة نتيجة|Add outcome)$'},
  {t:'^(إضافة مستوى|Add level)$'}
 ]},
 {name:'ch08-record-keeping',fitBottom:FIT,url:K,marks:[
  CUR,
  {t:'^(بانتظار قرار|Waiting for a decision)$'},
  {t:'^(أنواع السجلات التي تستخدم حفظ السجلات|Record types using record keeping)'},
  {t:'^(يحتاج إلى انتباه|Needs attention)$'}
 ]},
 {name:'ch08-record-keeping-rules',fitBottom:FIT,url:K+'/retention-rules',marks:[
  SUB,
  {t:'^(قاعدة جديدة|New rule)$'},
  {t:'^(تعديل كإصدار|Edit as v)'},
  {t:'^(إعادة التطبيق|Re-apply)'},
  {t:'^(إيقاف|Retire)$'}
 ]},
 {name:'ch08-record-keeping-holds',fitBottom:NAVF,url:K+'/holds',marks:[
  SUB,
  {t:'^(تجميد جديد|New hold)$'},
  {sel:'thead th',nth:4},
  {t:'^LH-2026-001$'}
 ]},
 {name:'ch08-record-keeping-disposition',fitBottom:NAVF,url:K+'/disposition',marks:[
  SUB,
  {t:'^(اقترح الآن|Propose now)$'},
  {t:'^DR-2026-001$'},
  {sel:'thead th',nth:6}
 ]},
 {name:'ch08-record-keeping-ledger',fitBottom:FIT,url:K+'/ledger',marks:[
  SUB,
  {t:'^(فحص السلسلة|Chain check)$'},
  {t:'^(تحقق مجددًا|Verify again)$'}
 ]},
 {name:'ch08-record-keeping-storage',fitBottom:NAVF,url:K+'/storage',marks:[
  SUB,
  {t:'^(قفل الكائنات|Object lock)$'},
  {t:'^(فحص الثبات|Fixity check)$'}
 ]},
 {name:'ch08-record-keeping-roles',fitBottom:NAVF,url:K+'/roles',marks:[
  SUB,
  {t:'^(التغيير في الأدوار|Change in Roles)$'},
  {t:'^(مسؤول السجلات|Records officer)$'},
  {t:'^(معتمدو الإتلاف|Disposition approvers)$'}
 ]}
];
