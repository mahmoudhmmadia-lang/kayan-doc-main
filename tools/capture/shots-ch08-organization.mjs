export const THEME='light';
export const SHOTS=[
 {name:'ch08-organization',url:'/settings/organization',reload:true,fitBottom:'form h2',marks:[
  {sel:'section h2',nth:0},
  {t:'^(اللون الأساسي|Primary color)$'},
  {t:'^(اللون الرمادي|Gray color)$'},
  {t:'^(صور واجهة الصفحة الرئيسية|Homepage hero images)$'},
  {t:'^(حفظ صور الواجهة|Save hero images)$'}
 ]},
 {name:'ch08-organization-info',url:'/settings/organization',reload:true,fitBottom:'[data-sticky-footer]',marks:[
  {sel:'form input'},
  {t:'^(معلومات المؤسسة|Organization info)$'},
  {t:'^(ضوابط الملفات|File limits)$'},
  {t:'^(حفظ ضوابط الملفات|Save file limits)$'},
  {t:'^(حفظ التغييرات|Save Changes)$'}
 ]},
 {name:'ch08-notifications',url:'/settings/notifications',reload:true,
  prep:[{sel:'[role=switch]',t:'.*',nth:2,wait:1500}],
  fitBottom:'[role=switch] >> nth=31',marks:[
  {sel:'input[aria-label]'},
  {sel:'.sticky.top-0.grid > div',nth:3},
  {sel:'.min-h-12:has(> * > [role=checkbox])',nth:2},
  {sel:'[role=switch]',nth:2},
  {t:'^(حفظ|Save)$'}
 ]},
 {name:'ch08-export-jobs',url:'/settings/export-jobs',reload:true,fitBottom:'tbody tr',marks:[
  {t:'^(تصدير جديد|New export)$'},
  {t:'^(تحديث|Refresh)$'},
  {sel:'tbody tr td span',nth:0},
  {sel:'th',nth:4},
  {sel:'tbody tr td button',nth:0}
 ]},
 {name:'ch08-export-jobs-create',url:'/settings/export-jobs',reload:true,keepDialog:true,fitBottom:'.pb-40',
  prep:[{t:'^(تصدير جديد|New export)$',wait:2500}],marks:[
  {sel:'[role=dialog] input'},
  {sel:'[role=dialog] .max-h-64 button',nth:0},
  {t:'^(تاريخ الإنشاء|Created)$'},
  {t:'^(مقروء|Readable)$'},
  {t:'^(إنشاء المهمة|Create job)$'}
 ]},
 {name:'ch08-reports',url:'/settings/reports',reload:true,fitBottom:'[data-testid=reports-settings]',marks:[
  {t:'^(لا شيء · سنوات ميلادية|None · calendar years)$'},
  {t:'^(الأساسية|Base) · '},
  {t:'^(رابط آمن|Secure link)$'},
  {t:'^(10 سنوات|10 years)$'},
  {t:'^(حفظ|Save)$'}
 ]}
];
