export const THEME='light';
const URL='/settings/publishing-approval';
export const SHOTS=[
 {name:'ch08-publishing-approval',url:URL,reload:true,
  prep:[{t:'^(لكل النماذج|For all forms)$',wait:1200},{t:'^(إضافة مرحلة|Add stage)$',wait:1500}],
  fitBottom:'[data-testid=forms-publishing-tab]',marks:[
  {t:'^(لكل النماذج|For all forms)$'},
  {sel:'[data-testid=publishing-stage] input'},
  {t:'^(إضافة مرحلة|Add stage)$'},
  {sel:'[data-testid=forms-publishing-tab] h2',nth:2},
  {t:'^(حفظ|Save)$'}
 ]},
 {name:'ch08-publishing-approval-record-types',url:URL+'?tab=recordTypes',reload:true,
  prep:[{t:'^(لأنواع محددة|For some types)$',wait:1500}],
  fitBottom:'[data-testid=record-types-approval-tab]',marks:[
  {t:'^(لأنواع محددة|For some types)$'},
  {sel:'fieldset legend'},
  {t:'^(المراجعون|Reviewers)$'},
  {t:'^(أنواع لها إعدادات أشد|Types with their own stricter settings)$'},
  {t:'^(حفظ|Save)$'}
 ]},
 {name:'ch08-publishing-approval-procedure-cards',url:URL+'?tab=procedureCards',reload:true,
  fitBottom:'[data-testid=procedure-publishing-tab]',marks:[
  {t:'^(إصدارات البطاقات تحتاج اعتماداً|Card versions need approval)$'},
  {t:'^(إضافة مرحلة|Add a stage)$'},
  {t:'^[+] owner$'},
  {t:'^(فصل المهام|Separation of duties)$'},
  {t:'^(النشر الطارئ|Emergency publishing)$'}
 ]},
 {name:'ch08-form-assignments',url:'/settings/form-assignments',reload:true,fitBottom:'[data-testid=assignment-cap-card]',marks:[
  {sel:'[data-testid=assignment-defaults-usage]'},
  {sel:'[data-testid=assignment-ladder-card] [role=switch]'},
  {sel:'[data-testid=assignment-days-card] fieldset'},
  {sel:'[data-testid=assignment-cap-card] input'},
  {t:'^(حفظ|Save)$'}
 ]},
 {name:'ch08-form-assignments-ladder',url:'/settings/form-assignments',reload:true,
  prep:[{sel:'[data-testid=assignment-ladder-card] [role=switch]',t:'.*',wait:1500}],
  fitBottom:'[data-testid=assignment-ladder-card]',marks:[
  {t:'^(قبل الموعد|Before the due date)$'},
  {sel:'[data-testid=org-reminder-ladder] li input'},
  {t:'^(المكلَّف|The holder)$'},
  {t:'^(إضافة خطوة|Add a step)$'}
 ]},
 {name:'ch08-check-categories',url:'/settings/check-categories',reload:true,fitBottom:'[data-testid=check-categories-page]',marks:[
  {sel:'[data-testid=check-category-row] input'},
  {sel:'[data-testid=check-category-row] fieldset'},
  {sel:'[data-testid=check-category-row] button[aria-label]:not([aria-pressed])'},
  {t:'^(إضافة تصنيف|Add category)$'},
  {t:'^(حفظ|Save)$'}
 ]}
];
