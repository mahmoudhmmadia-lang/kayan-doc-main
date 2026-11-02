export const THEME='light';
const CUR='/settings/currencies';
const TAB={sel:'[role=tab][aria-selected="true"]'};
const SEC=(t)=>[{t}];
const FIT='main *:not(:has(*)):visible';
const LI='main li >> nth=10';
export const SHOTS=[
 {name:'ch08-languages',url:'/settings/languages',fitBottom:FIT,marks:[
  {t:'^(إضافة|Add)$'},
  {t:'^(نشط|Active)$'},
  {t:'^(غير نشط|Inactive)$'},
  {sel:'main button[aria-label]',nth:0}
 ]},
 {name:'ch08-languages-form',url:'/settings/languages',keepDialog:true,fitBottom:FIT,prep:[{t:'^(إضافة|Add)$'}],marks:[
  {sel:'[role=dialog] input',nth:0},
  {sel:'[role=dialog] input',nth:1},
  {sel:'[role=dialog] input',nth:2},
  {sel:'[role=dialog] form button',nth:0},
  {sel:'[role=dialog] form button',nth:2}
 ]},
 {name:'ch08-currencies',url:CUR,fitBottom:'tbody tr >> nth=7',marks:[
  TAB,
  {t:'^(إضافة عملة|Add currency)$'},
  {t:'^(الأساسية|Base) · SYP$'},
  {sel:'thead th',nth:7},
  {sel:'thead th',nth:8}
 ]},
 {name:'ch08-currencies-rates',url:CUR+'?tab=rates',fitBottom:FIT,marks:[
  TAB,
  {t:'^(إضافة سعر|Add rate)$'},
  {t:'^(استيراد أسعار|Import rates)$'},
  {t:'^(الأزواج · آخر سعر|Pairs · latest rate)$'},
  {t:'^(السجل|History)$'}
 ]},
 {name:'ch08-currencies-bulletins',url:CUR+'?tab=bulletins',fitBottom:FIT,marks:[
  TAB,
  {t:'^(نشرة جديدة|New bulletin)$'},
  {t:'^(استيراد نشرة|Import bulletin)$'},
  {t:'^QA-301/2026$'}
 ]},
 {name:'ch08-currencies-rate-types',url:CUR+'?tab=rateTypes',fitBottom:FIT,marks:[
  TAB,
  {t:'^(إضافة نوع سعر|Add rate type)$'},
  {t:'^(افتراضي|default)$'},
  {sel:'thead th',nth:2}
 ]},
 {name:'ch08-currencies-settings',url:CUR+'?tab=settings',fitBottom:FIT,marks:[
  {t:'^(العملة الأساسية والتقريب|Base & rounding)$'},
  {t:'^(مقفلة|Locked) · '},
  {t:'^(طريقة التقريب|Rounding mode)$'},
  {t:'^(مرحلة التقريب|Rounding stage)$'}
 ]},
 {name:'ch08-currencies-settings-display',url:CUR+'?tab=settings',fitBottom:FIT,prep:SEC('^(العرض|Display)$'),marks:[
  {t:'^(العرض|Display)$'},
  {t:'^(الأرقام في الطباعة|Digits in print)$'},
  {t:'^(عرض المبالغ السالبة|Negative amounts)$'},
  {t:'^(معاينة|Preview)$'}
 ]},
 {name:'ch08-currencies-settings-rates',url:CUR+'?tab=settings',fitBottom:FIT,prep:SEC('^(الأسعار|Rates)$'),marks:[
  {t:'^(الأسعار|Rates)$'},
  {t:'^(نوع السعر الافتراضي|Default rate type)$'},
  {t:'^(سعر اليوم المعتمد|Rate of the day)$'},
  {t:'^(يُعدّ السعر قديماً بعد|Stale after)$'}
 ]},
 {name:'ch08-currencies-settings-overrides',url:CUR+'?tab=settings',fitBottom:FIT,prep:SEC('^(التعديل والتعابير|Overrides & expressions)$'),marks:[
  {t:'^(التعديل والتعابير|Overrides & expressions)$'},
  {t:'^(السماح بتعديل السعر|Allow rate overrides)$'},
  {t:'^(سبب التعديل إلزامي|Reason required)$'}
 ]},
 {name:'ch08-units',url:'/settings/units',fitBottom:FIT,marks:[
  {t:'^(مجموعة|Group)$'},
  {t:'^(إضافة وحدة|Add unit)$'},
  {sel:'main button[aria-label]',nth:0},
  {t:'^(الأساس|Base): (كيلوغرام|kg)$'},
  {sel:'main button[aria-label]',nth:2}
 ]},
 {name:'ch08-units-form',url:'/settings/units',keepDialog:true,fitBottom:LI,prep:[{t:'^(إضافة وحدة|Add unit)$'}],marks:[
  {t:'^(الرمز|Symbol)$'},
  {t:'^(المفتاح|Key)$'},
  {t:'^(التحويل|Conversion)$'},
  {t:'^(الخانات العشرية|Decimal places)$'},
  {t:'^(حفظ|Save)$'}
 ]},
 {name:'ch08-units-group',url:'/settings/units',keepDialog:true,fitBottom:LI,prep:[{t:'^(مجموعة|Group)$'}],marks:[
  {t:'^(تتحول إلى وحدة أساس|Converts to a base unit)$'},
  {t:'^(بلا تحويل|No conversion)$'},
  {t:'^(وحدة الأساس|Base unit)$'},
  {t:'^(حفظ|Save)$'}
 ]}
];
