export const THEME='light';
// Secrets stay out of frame by fitting the image above them; nothing is masked:
// - Email domains: the last DNS row holds the verification value, so the image stops at row 7.
// - Short links: the first DNS row holds it, so the image stops at the domain's own buttons.
// - WhatsApp: the search leaves the one shared account, so no member's phone number appears,
//   including behind the link dialog; the dialog needs this height or it shrinks and scrolls.
const SIG='[data-testid="organization-email-signatures"]';
export const SHOTS=[
 {name:'ch08-email-domains',url:'/settings/email-domains',wait:8000,fitBottom:'table tbody tr:nth-child(7)',marks:[
  {sel:'main input'},
  {t:'^(إضافة نطاق|Add domain)$'},
  {t:'^(نشط|Active)$'},
  {t:'^(تحقق من النطاق|Verify domain)$'},
  {t:'^(غير موجود|Missing)$',dom:0}
 ]},
 {name:'ch08-email-signatures',url:'/settings/email-signatures',wait:6000,fitBottom:`${SIG} section`,marks:[
  {t:'^(القوالب|Templates)$',dom:0},
  {t:'^(قالب جديد|New template)$',dom:0},
  {sel:`${SIG} .sig-stat`,nth:0},
  {sel:`${SIG} .sig-stat`,nth:1}
 ]},
 {name:'ch08-email-signatures-assignment',url:'/settings/email-signatures',wait:6000,prep:[{t:'^(التعيين|Assignment)$'}],fitBottom:SIG,marks:[
  {t:'^(التعيين|Assignment)$'},
  {t:'^(إضافة قاعدة|Add rule)$'}
 ]},
 {name:'ch08-email-signatures-disclaimer',url:'/settings/email-signatures',wait:6000,prep:[{t:'^(إخلاء المسؤولية|Disclaimer)$'}],fitBottom:SIG,marks:[
  {t:'^(إخلاء المسؤولية|Disclaimer)$'},
  {t:'^(تضمين البريد الداخلي|Include internal email|Include internal mail)$'},
  {t:'^(اتركه فارغاً|Leave (it )?empty|Leave blank)'}
 ]},
 {name:'ch08-email-signatures-personal',url:'/settings/email-signatures?personal=true',wait:6000,fitBottom:'tbody tr:nth-child(2)',marks:[
  {t:'^(توقيع جديد|New signature)$',dom:0},
  {sel:'tbody tr td',nth:1},
  {sel:'tbody tr td',nth:2}
 ]},
 {name:'ch08-short-links',url:'/settings/short-link-domains',wait:6000,fitBottom:'button:has-text("تحقق من النطاق"), button:has-text("Verify domain")',marks:[
  {sel:'main input'},
  {t:'^(إضافة نطاق|Add domain)$'},
  {t:'^(قيد الانتظار|Pending)$'},
  {t:'^(تحقق من النطاق|Verify domain)$'},
  {t:'^(حذف النطاق|Delete domain)$'}
 ]},
 {name:'ch08-whatsapp',url:'/settings/whatsapp-accounts',wait:6000,search:'shared',fitBottom:'text=/آخر انقطاع|Last disconnected/',marks:[
  {t:'^(ربط WhatsApp|Link WhatsApp)$'},
  {t:'^(الكل|All)$'},
  {sel:'main input'},
  {t:'^(منتهي الصلاحية|Expired) ?[0-9]+$'},
  {sel:'main button[aria-label="حالة الوسائط"],main button[aria-label="Media status"]'}
 ]},
 {name:'ch08-whatsapp-link',url:'/settings/whatsapp-accounts',wait:5000,search:'shared',keepDialog:true,prep:[{t:'^(ربط WhatsApp|Link WhatsApp)$'}],fitBottom:'text=/آخر انقطاع|Last disconnected/',marks:[
  {t:'^(رمز QR|QR code)$'},
  {t:'^(رقم الهاتف|Phone number)$'},
  {sel:'[role=dialog] input'},
  {t:'^(شخصي|Personal)$'}
 ]},
 // Last on purpose: «قالب جديد» opens the designer on an unsaved local draft that is never saved.
 {name:'ch08-email-signatures-designer',url:'/settings/email-signatures',wait:6000,prep:[{t:'^(قالب جديد|New template)$'}],fitBottom:`${SIG} p[role=status]`,marks:[
  {sel:'.sig-layouts'},
  {sel:'.sig-block-list'},
  {t:'^(معاينة باسم|Preview as)$'},
  {t:'^(نشر v1…|Publish v1…)$'}
 ]}
];
