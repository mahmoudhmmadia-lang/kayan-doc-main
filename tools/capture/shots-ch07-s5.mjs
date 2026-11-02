// Stage 5 of chapter 7. DOSSIER is the existing open dossier DOS-2026-0001 (not a guide record). DRAFT is the deleted GUIDE-QA S5 draft, still readable by id for ch07-audit-letterlog. ch07-search-views and ch07-search-filters need a draft matching "GUIDE-QA S5" and a saved view; both were removed after capture.
export const THEME='light';
const R='/official-correspondence';
const DOSSIER='41b77d06a01740ae9d87673ae543ecc2';
const DRAFT='pztvmx0vhazsisbp11ezu';
export const SHOTS=[
 {name:'ch07-dossiers',url:`${R}/dossiers?state=all`,fitBottom:'.oc-dossier-list',marks:[
  {t:'^(New dossier|إضبارة جديدة)$'},
  {t:'^(All|الكل)$',sel:'.oc-facets button[aria-pressed=true]'},
  {sel:'.oc-dossier-search input'},
  {sel:'.oc-dossier-open'}
 ]},
 {name:'ch07-dossiers-detail',url:`${R}/dossiers?state=open&dossier=${DOSSIER}`,fitBottom:'.oc-dossier-detail',marks:[
  {t:'^(Share|مشاركة)$'},
  {t:'^(Grant access|منح اطلاع)$'},
  {t:'^(Close the dossier|إغلاق الإضبارة)$'},
  {sel:'.oc-dossier-card-main'},
  {t:'^(Remove|إزالة)$'}
 ]},
 {name:'ch07-delegation',url:`${R}/delegation`,fitBottom:'.oc-deleg-panels',marks:[
  {t:'^(New delegation|تفويض جديد)$'},
  {sel:'#oc-deleg-received'},
  {sel:'#oc-deleg-given'},
  {sel:'.oc-deleg-rules'}
 ]},
 {name:'ch07-delegation-form',url:`${R}/delegation`,keepDialog:true,fitBottom:'.oc-deleg-dialog',prep:[{t:'^(New delegation|تفويض جديد)$'}],marks:[
  {sel:'[role=dialog] input[placeholder]'},
  {sel:'[role=dialog] .oc-seg',nth:0},
  {sel:'[role=dialog] .oc-seg',nth:1},
  {sel:'.oc-deleg-inbox'},
  {sel:'[role=dialog] .oc-dialog-grid',nth:0}
 ]},
 {name:'ch07-archive',url:`${R}/archive`,fitBottom:'.oc-archive-table',marks:[
  {sel:'.oc-archive-kpis'},
  {sel:'[role=tab][data-state=active]'},
  {sel:'.oc-archive-filters'},
  {sel:'.oc-archive-open'}
 ]},
 {name:'ch07-archive-record',wait:14000,url:`${R}/archive?tab=in_approval`,keepDialog:true,prep:[{t:'.',sel:'.oc-archive-open'}],marks:[
  {t:'^(History|السجل التاريخي)$'},
  {t:'^(Approve as final|اعتماد نهائي)$'},
  {t:'^(Return for completion|إعادة للاستكمال)$'},
  {t:'^(Reject|رفض)$'}
 ]},
 {name:'ch07-search-views',url:`${R}/tray?folder=drafts&q=GUIDE-QA%20S5`,fitBottom:'.oc-tray-reader',marks:[
  {sel:'input[placeholder^="Search…"],input[placeholder^="بحث…"]'},
  {sel:'.oc-search-help'},
  {sel:'.oc-list-filter'},
  {sel:'.oc-view-chip'},
  {t:'^(Overdue|متأخرة)$',dom:0}
 ]},
 {name:'ch07-search-filters',url:`${R}/tray?folder=drafts&q=GUIDE-QA%20S5`,keepDialog:true,fitBottom:'.oc-tray-reader',prep:[{t:'.',sel:'.oc-list-filter'}],marks:[
  {sel:'.oc-list-filter'},
  {sel:'.oc-filters-field',nth:0},
  {t:'^(Save as view|حفظ كعرض)$'},
  {t:'^(Apply|تطبيق)$'}
 ]},
 {name:'ch07-performance',url:`${R}/performance?tab=me`,fitBottom:'.oc-perf-overview',marks:[
  {t:'^(My performance|أدائي)$'},
  {sel:'.oc-perf-periods'},
  {sel:'.oc-perf-score-card'},
  {sel:'.oc-perf-me > section',nth:0}
 ]},
 {name:'ch07-performance-overview',url:`${R}/performance?tab=overview`,fitBottom:'.oc-perf-overview',marks:[
  {t:'^(Overview|نظرة عامة)$'},
  {sel:'.oc-perf-unit'},
  {sel:'.oc-perf-kpis .oc-kpi',nth:2},
  {t:'^(Export|تصدير)$'}
 ]},
 {name:'ch07-oversight',url:`${R}/oversight?tab=void`,fitBottom:'.oc-ov-list',marks:[
  {sel:'.oc-ov-tabs'},
  {sel:'.oc-audit-filters'},
  {t:'^(Export|تصدير)$'},
  {sel:'.oc-ov-number-inert,.oc-ov-number'}
 ]},
 {name:'ch07-audit',url:`${R}/audit?category=dossiers`,fitBottom:'.oc-audit-table-wrap',marks:[
  {t:'^(All activity|كل النشاط)$'},
  {t:'^(My activity|نشاطي)$'},
  {t:'^(Export to Excel|تصدير Excel)$'},
  {sel:'.oc-audit-filters'},
  {sel:'.oc-audit-letter'}
 ]},
 {name:'ch07-audit-letterlog',url:`${R}/tray?folder=all&id=${DRAFT}&tab=log`,fitBottom:'.oc-tray-reader',marks:[
  {t:'^(Route|المسار)$'},
  {t:'^(Action log|سجل الإجراءات)$',sel:'[role=tab][data-state=active]'}
 ]}
];
