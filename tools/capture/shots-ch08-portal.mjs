export const THEME='light';
const PORTAL='/settings/public-portal';
const CONTENT='/settings/public-portal/content';
const MESSAGES='[data-testid="applicant-messages-page"]';
const TAB={sel:'nav a[aria-current="page"]'};
const SEARCH={sel:'[data-testid="portal-content-page"] input[type=search]'};
const EDIT={sel:'[role=row] button[aria-label^="تعديل"],[role=row] button[aria-label^="Edit"]'};
export const SHOTS=[
 {name:'ch08-public-portal-home',url:`${PORTAL}?tab=home`,wait:7000,marks:[
  TAB,
  {t:'^(أقسام الصفحة الرئيسية|Home page sections)$'},
  {t:'^(معاينة البوابة|Preview portal)$'},
  {t:'^(نشر التغييرات|Publish changes)$'}
 ]},
 {name:'ch08-public-portal-identity',url:`${PORTAL}?tab=identity`,wait:7000,marks:[
  TAB,
  {t:'^(استبدال|Replace)$',dom:0},
  {t:'^(رفع|Upload)$'},
  {t:'^(مثل ألوان التطبيق|Same as the app theme)$'}
 ]},
 {name:'ch08-public-portal-contact',url:`${PORTAL}?tab=contact`,wait:7000,marks:[
  TAB,
  {sel:'[data-testid="portal-settings-panel"] input[type=tel]'},
  {t:'^(إضافة مجموعة|Add a group)$'},
  {t:'^(إضافة رابط|Add a link)$'}
 ]},
 {name:'ch08-public-portal-languages',url:`${PORTAL}?tab=languages`,wait:7000,marks:[
  TAB,
  {t:'^(اللغة الافتراضية|Default language)$'},
  {t:'^(إدارة كيان اللغات|Manage languages)$'},
  {t:'^(رمز الدولة الافتراضي للهاتف|Default phone country code)$'}
 ]},
 {name:'ch08-public-portal-spaces',url:`${PORTAL}?tab=spaces`,wait:6000,fitBottom:'nav [aria-current="page"]',marks:[
  TAB,
  {t:'^(مساحة جديدة|New space)$'},
  {sel:'table tbody tr td',nth:0},
  {sel:'table tbody tr td',nth:6}
 ]},
 {name:'ch08-portal-content-audience',url:`${CONTENT}?tab=audience`,wait:5000,fitBottom:'[data-testid="portal-content-page"] main',marks:[
  {t:'^(الفئات المستهدفة|Audiences) ?[0-9]*$'},
  {t:'^(إضافة فئة|Add audience)$'},
  {sel:'[role=row] [role=switch]'},
  EDIT
 ]},
 {name:'ch08-portal-content-page',url:`${CONTENT}?tab=page`,wait:5000,fitBottom:'[data-testid="portal-content-page"] main',marks:[
  {t:'^(الصفحات|Pages) ?[0-9]*$'},
  {t:'^(إضافة صفحة|Add page)$'},
  {sel:'[role=row] [role=switch]'},
  EDIT
 ]},
 {name:'ch08-portal-content-faq',url:`${CONTENT}?tab=faq`,wait:5000,fitBottom:'[data-testid="portal-content-page"] main',marks:[
  {t:'^(الأسئلة الشائعة|FAQ) ?[0-9]*$'},
  {t:'^(إضافة سؤال|Add question)$'},
  SEARCH,
  EDIT
 ]},
 {name:'ch08-portal-content-announcement',url:`${CONTENT}?tab=announcement`,wait:5000,keepDialog:true,prep:[{t:'^(إضافة إعلان|Add announcement)$'}],fitBottom:'[data-testid="portal-content-drawer"]',marks:[
  {t:'^(الإعلانات|Announcements) ?[0-9]*$'},
  {t:'^(شريط في كل الصفحات|Strip on every page)$',dom:{ar:1,en:1}},
  {sel:'[data-testid="portal-content-drawer"] input[type=datetime-local]'},
  {sel:'[data-testid="portal-content-drawer"] [role=switch]'}
 ]},
 {name:'ch08-applicant-profile',url:'/settings/applicant-profile',wait:5000,fitBottom:'[data-testid="applicant-levels"]',marks:[
  {t:'^(ملف الفرد|Person)$'},
  {t:'^(إضافة حقل|Add a field|Add field)$'},
  {t:'^(طريقة التحقق|Verification)$'},
  {t:'^(كما يراها المتعامل|As applicants see it)$'},
  {t:'^(إضافة مستوى|Add level)$'}
 ]},
 {name:'ch08-applicant-profile-field',url:'/settings/applicant-profile',wait:5000,keepDialog:true,prep:[{t:'^(إضافة حقل|Add a field|Add field)$'}],fitBottom:'[data-testid="applicant-field-editor"] [role=dialog]',marks:[
  {sel:'[data-testid="applicant-field-editor"] h2'},
  {sel:'[data-testid="applicant-field-editor"] legend',nth:0},
  {t:'^(مراجعة الموظف|Staff review)$',dom:0},
  {t:'^(يُقفل الحقل بعد التحقق|Lock the field after verification|Lock after verification)$'}
 ]},
 {name:'ch08-applicant-company',url:'/settings/company-profile',wait:5000,marks:[
  {t:'^(ملف الشركة|Company)$'},
  {sel:'[data-testid="company-profile-settings"] [role=switch]'},
  {t:'^(إضافة حقل|Add a field|Add field)$'},
  {t:'^(كيف يرتبط الشخص بشركة|Who links a person to a company|How a person links to a company)$'},
  {sel:'[data-testid="company-review-queue"] h2'}
 ]},
 {name:'ch08-messages-templates',url:'/settings/messages?tab=templates&group=applicant',wait:6000,fitBottom:'[data-testid="applicant-message-templates"]',marks:[
  {t:'^(أحداث مقدّمي الطلبات|Applicant events) ?[0-9]*$'},
  {sel:'[role=option][aria-selected=true]'},
  {sel:'[data-testid="applicant-message-templates"] [role=tab][aria-selected=true]'},
  {t:'^(إدراج متغير|Insert a variable)$'},
  {t:'^(حفظ التغييرات|Save changes)$'}
 ]},
 // The page keeps its tab across in-app navigation, so each shot presses the tab itself.
 {name:'ch08-messages-followup',url:'/settings/messages?tab=templates&group=followUp',wait:6000,prep:[{t:'^(القوالب|Templates)$'},{t:'^(قوالب المتابعة|Follow-up templates)'}],fitBottom:MESSAGES,marks:[
  {t:'^(قوالب المتابعة|Follow-up templates) ?[0-9]*$'},
  {sel:`${MESSAGES} input[type=search]`},
  {t:'^(قالب جديد|New template)$'}
 ]},
 {name:'ch08-messages-channels',url:'/settings/messages?tab=channels',wait:6000,prep:[{t:'^(القنوات والقواعد|Channels & rules)$'}],fitBottom:MESSAGES,marks:[
  {t:'^(القنوات والقواعد|Channels & rules)$'},
  {t:'^(واتساب · الرقم الرسمي|WhatsApp · official number)$'},
  {t:'^(الرد إلى|Reply-to)$'},
  {t:'^(ساعات الهدوء|Quiet hours)$'},
  {t:'^(الاحتفاظ بمحتوى الرسائل لمدة|Keep message content for)$'}
 ]},
 {name:'ch08-messages-log',url:'/settings/messages?tab=log',wait:7000,prep:[{t:'^(سجل الإرسال|Log)$',wait:5000}],fitBottom:`${MESSAGES} table tbody tr >> nth=8`,marks:[
  {t:'^(سجل الإرسال|Log)$'},
  {sel:`${MESSAGES} input`},
  {t:'^(تصدير CSV|Export CSV)$'},
  {t:'^(متخطّى|Skipped)$',dom:0}
 ]}
];
