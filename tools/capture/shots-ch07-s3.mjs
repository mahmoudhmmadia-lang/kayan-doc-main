export const THEME='light';
// Read only: these shots open letters and dialogs and never press a dialog's submit button.
const SG=[{sel:'.oc-mailbox-select',t:'.',wait:700},{sel:'[role=option]',t:'Secretary General|الأمين العام',wait:3500}];
const CX=[{sel:'.oc-mailbox-select',t:'.',wait:700},{sel:'[role=option]',t:'Codex',wait:3500}];
const T='/official-correspondence/tray';
const APPROVE=`${T}?folder=approvals&id=hvgputwlq1fxsn46tkfo1`;
const MEMO=`${T}?folder=inbox&id=t5tq2_u2tbo6xwnl54m8a`;
const tool=(t)=>({sel:'.oc-toolbar-button',t,wait:3000});
const SUBMIT={sel:'.oc-dialog-foot button',nth:1};
export const SHOTS=[
 {name:'ch07-drafting-review',url:'/official-correspondence/drafting',fitBottom:'.oc-drafting-page',marks:[
  {t:'^(Assigned to me|المُسندة إليّ)$'},{t:'^(Assigned by me|التي أسندتُها)$'},{t:'^(Pending|بانتظار المراجعة)$'}
 ]},
 {name:'ch07-drafting-review-push',url:`${T}?folder=drafts`,keepDialog:true,fitBottom:'.oc-dialog',prep:[...CX,{sel:'.oc-tray button,.oc-tray [role=button],.oc-tray a,.oc-tray li',t:'تدريب',wait:4000},tool('Push for review|دفع للمراجعة')],marks:[
  {sel:'.oc-dialog input'},{sel:'.oc-dialog textarea'},{t:'^(Files for the reviewer|مرفقات للمراجِع)$'},SUBMIT
 ]},
 {name:'ch07-approvals',url:APPROVE,prep:SG,fitBottom:'.oc-approval-box',marks:[
  {t:'^(Awaiting my approval|بانتظار اعتمادي)[ 0-9]*$'},{sel:'.oc-approval-box h4'},{t:'^(Approve and sign|اعتماد وتوقيع)$'},{t:'^(Return for changes|إعادة للتعديل)$'},{t:'^(Reject|رفض)$'}
 ]},
 {name:'ch07-approvals-return',url:APPROVE,keepDialog:true,fitBottom:'.oc-dialog',prep:[...SG,{sel:'.oc-approval-box button',t:'Return for changes|إعادة للتعديل',wait:2500}],marks:[
  {sel:'.oc-dialog textarea'},SUBMIT
 ]},
 {name:'ch07-approvals-sign',url:APPROVE,keepDialog:true,fitBottom:'.oc-dialog',prep:[...SG,{sel:'.oc-approval-box button',t:'Approve and sign|اعتماد وتوقيع',wait:3500}],marks:[
  {t:'^(Letter number|رقم الكتاب)'},{sel:'.oc-dialog [role=combobox]',t:'^(Stamp|الختم)$'},{sel:'.oc-dialog textarea'},SUBMIT
 ]},
 {name:'ch07-reader',url:MEMO,prep:SG,fitBottom:'.oc-tray-reader',marks:[
  {sel:'.oc-reader-crumbs'},{sel:'.oc-toolbar'},{sel:'.oc-toolbar-more'},{sel:'.oc-reader-tabs'},{sel:'.oc-deadline-bar'}
 ]},
 {name:'ch07-reader-route',url:`${MEMO}&tab=route`,prep:SG,fitBottom:'.oc-tray-reader',marks:[
  {t:'^(Route|المسار)$'}
 ]},
 {name:'ch07-reader-signatures',url:`${MEMO}&tab=signatures`,prep:SG,fitBottom:'.oc-tray-reader',marks:[
  {t:'^(Signatures|التواقيع)$'}
 ]},
 {name:'ch07-reader-attachments',url:`${T}?folder=inbox&id=mln2swcgo7mf3pdqf4z2l&tab=attachments`,prep:SG,fitBottom:'.oc-tray-reader',marks:[
  {t:'^(Attachments|المرفقات)[ 0-9]*$'}
 ]},
 {name:'ch07-referral',url:MEMO,keepDialog:true,fitBottom:'.oc-dialog',prep:[...SG,tool('^[ ]*(Refer|إحالة)[ ]*$')],marks:[
  {sel:'.oc-dialog input'},{sel:'.oc-dialog textarea'},{t:'^(5 days|5 أيام)$'},{t:'^(Hide earlier notes from the recipients|إخفاء الحواشي السابقة عن المحال إليهم)$'},SUBMIT
 ]},
 {name:'ch07-referral-notes',url:`${T}?folder=inbox&id=iicq9rd_jc7oaquqwibn7`,prep:SG,fitBottom:'.oc-tray-reader',marks:[
  {sel:'[class*=oc-margin],[class*=oc-note]'}
 ]},
 {name:'ch07-inquiries',url:`${T}?folder=inquiries`,prep:SG,fitBottom:'main',marks:[
  {t:'^(Inquiries|الاستفسارات)[ 0-9]*$'}
 ]},
 {name:'ch07-inquiries-ask',url:MEMO,keepDialog:true,fitBottom:'.oc-dialog',prep:[...SG,tool('^[ ]*(Inquiry|استفسار)[ ]*$')],marks:[
  {sel:'.oc-dialog input'},{sel:'.oc-dialog textarea'},SUBMIT
 ]},
 {name:'ch07-inquiries-consult',url:`${T}?folder=inbox&id=pjyb45qe76nt4kajef0sb&tab=links`,prep:CX,fitBottom:'.oc-tray-reader',marks:[
  {t:'^(References|المراجع)[ 0-9]*$'},{t:'^(Consultation sessions|جلسات التشاور)$'},{t:'^(Open in chat|فتح في المحادثات)$'},{t:'^(Session minutes|محضر الجلسة)$'}
 ]},
 {name:'ch07-reply-complete',url:MEMO,keepDialog:true,fitBottom:'.oc-dialog',prep:[...SG,tool('Complete and file|إنجاز وحفظ')],marks:[
  {sel:'.oc-dialog textarea'},{sel:'.oc-dialog [role=combobox]',t:'^(Digital library|المكتبة الرقمية)',max:140},SUBMIT
 ]},
];
