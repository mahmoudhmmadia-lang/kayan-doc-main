export const THEME='light';
const B='zr4m2u23m_w1ib0obs04y'; // GUIDE-QA batch, cancelled after capture on 2026-11-02: create a new active batch and update this id to recapture.
const R='/official-correspondence/registry';
const D='.oc-dialog';
const WAITING='^(Awaiting registration|بانتظار القيد) [(][0-9]+[)]$';
const QUEUE='^(Awaiting dispatch|بانتظار الإرسال) [(][0-9]+[)]$';
const PICK='^(البحث عن منصب|Search for a position|Search positions|Search a position|Search position)';
export const SHOTS=[
 {name:'ch07-registry',url:`${R}?tab=arrivals`,fitBottom:'.oc-reg-page',marks:[
  {t:WAITING},{t:QUEUE},
  {t:'^(Incoming register|سجل الوارد)$'},
  {sel:'.oc-kpi-sequence'},
  {t:'^(Daily closing report|محضر الإقفال اليومي)$'}
 ]},
 {name:'ch07-registry-filters',url:`${R}?tab=incoming`,keepDialog:true,fitBottom:'.oc-reg-page',prep:[{t:'^(Filter the register|تصفية السجل)',sel:'main button'}],marks:[
  {sel:'.oc-reg-search input'},
  {t:'^(Filter the register|تصفية السجل)'},
  {sel:'.oc-reg-print'},
  {sel:'.oc-reg-boxes'}
 ]},
 {name:'ch07-registry-report',url:`${R}?report=2026-10-01`,fitBottom:'.oc-daily-report',marks:[
  {sel:'.oc-daily-report-day input,.oc-daily-report-day button'},
  {sel:'.oc-daily-report-closed'},
  {t:'^(PDF file|ملف PDF)$'},
  {t:'^(Print|طباعة)$'}
 ]},
 {name:'ch07-incoming',url:`${R}?tab=pending`,keepDialog:true,fitBottom:D,prep:[{t:'^(Register incoming|قيد وارد)$',sel:'main button'}],marks:[
  {t:'^(Entry type|تصنيف القيد)$'},
  {t:'^(Expected number|الرقم المتوقع)',max:120},
  {sel:`${D} input[placeholder^="وزارة"],${D} input[placeholder^="Ministry"]`},
  {t:PICK},
  {t:'^(Register and distribute|قيد وتوزيع)$'}
 ]},
 {name:'ch07-paper-intake',url:`${R}?tab=pending&intake=paper`,keepDialog:true,fitBottom:D,marks:[
  {t:PICK},
  {t:'^(Scan and files|الصورة والمرفقات)$'},
  {t:'^(Paper original|النسخة الورقية الأصلية)$'},
  {t:'^(Save to awaiting registration|حفظ بانتظار القيد)$'},
  {t:'^(Register now|قيد الآن)$'}
 ]},
 {name:'ch07-paper-intake-scan',url:`${R}?tab=pending&intake=scan`,keepDialog:true,fitBottom:D,marks:[
  {t:'^(Choose|اختيار ملف)$'},
  {sel:`${D} [role=combobox]`},
  {sel:'.oc-scan-manual'},
  {t:'^(Read the letter|قراءة الكتاب)$'}
 ]},
 {name:'ch07-paper-intake-queue',url:`${R}?tab=arrivals&arrivalQ=QA-B2`,fitBottom:'.oc-reg-page',wait:4500,marks:[
  {sel:'.oc-arrival-card .oc-chip'},
  {sel:'.oc-arrival-menu'},
  {t:'^(Register and distribute|قيد وتوزيع)$'},
  {t:'^(Refuse at the registry|رفض في الديوان)$'}
 ]},
 {name:'ch07-outgoing-dispatch',url:`${R}?tab=pending`,fitBottom:'.oc-reg-page',marks:[
  {t:QUEUE},
  {sel:'.oc-reg-batches-link a,.oc-reg-batches-link button'},
  {t:'^(Refuse dispatch|رفض الإرسال)$'},
  {t:'^(Record dispatch|تسجيل الإرسال)$'}
 ]},
 {name:'ch07-outgoing-dispatch-dialog',url:`${R}?tab=pending`,keepDialog:true,fitBottom:D,prep:[{t:'^(Record dispatch|تسجيل الإرسال)$',sel:'main button',nth:7}],marks:[
  {sel:'.oc-reg-recipients .oc-chip'},
  {sel:`${D} [role=combobox]`},
  {sel:`${D} textarea`},
  {t:'^(Confirm dispatch|تأكيد الإرسال)$'}
 ]},
 {name:'ch07-outgoing-entry-menu',url:`${R}?tab=outgoing&q=QA-B2%20S4`,keepDialog:true,fitBottom:'.oc-reg-page',prep:[{t:'.*',sel:'main table tbody button',wait:3000}],marks:[
  {t:'^(Correct the entry|تصحيح القيد)$'},
  {t:'^(Void the entry|إلغاء القيد)$'}
 ]},
 {name:'ch07-outgoing-void',url:`${R}?tab=outgoing&q=QA-B2%20S4`,keepDialog:true,fitBottom:D,prep:[{t:'.*',sel:'main table tbody button',wait:3000},{t:'^(Void the entry|إلغاء القيد)$',sel:'[role=menuitem]'}],marks:[
  {sel:`${D} textarea`},
  {t:'^(Void the entry|إلغاء القيد)$',dom:1},
  {t:'^(Cancel|إلغاء)$'}
 ]},
 {name:'ch07-batches',url:`/official-correspondence/batches?state=active`,fitBottom:'.oc-batches-page',marks:[
  {t:'^(New batch|حقيبة جديدة)$'},
  {t:'^(Active|نشطة)$'},
  {t:'^(Finished|منتهية)$'},
  {t:'^(Contents|المحتوى)$'}
 ]},
 {name:'ch07-batches-new',url:`/official-correspondence/batches?state=active`,keepDialog:true,fitBottom:D,prep:[{t:'^(New batch|حقيبة جديدة)$',sel:'main button'}],marks:[
  {sel:`${D} input:not([type=file])`},
  {sel:`${D} [role=combobox]`},
  {t:'^(Create the batch|إنشاء الحقيبة)$'}
 ]},
 {name:'ch07-batches-contents',url:`/official-correspondence/batches?state=active&batch=${B}`,fitBottom:'.oc-batch-contents',marks:[
  {t:'^(Add letters|إضافة كتب)$'},
  {t:'^(Check eligibility|تحقق من الأهلية)$'},
  {t:'^(Send the batch|إرسال الحقيبة)$'},
  {t:'^(Cancel the rest|إلغاء المتبقي)$'}
 ]},
 {name:'ch07-batches-add',url:`/official-correspondence/batches?state=active&batch=${B}`,keepDialog:true,fitBottom:D,prep:[{t:'^(Add letters|إضافة كتب)$',sel:'main button',wait:4000}],marks:[
  {sel:`${D} input[type=checkbox],${D} [role=checkbox]`},
  {t:'^(Add|إضافة)$'}
 ]},
 {name:'ch07-circulars',url:`/official-correspondence/circulars`,fitBottom:'.oc-circ-page',marks:[
  {t:'^(New circular|تعميم جديد)$'},
  {sel:'.oc-progress'},
  {t:'^(Acknowledge|إقرار)$'},
  {t:'^(View circular|عرض التعميم)$'}
 ]}
];
