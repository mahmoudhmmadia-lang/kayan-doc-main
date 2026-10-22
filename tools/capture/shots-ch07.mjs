export const THEME='light';
export const SHOTS=[
 {name:'ch07-home',url:'/official-correspondence',fitBottom:'[data-workspace-group]',marks:[
  {sel:'.oc-mailbox-select'},
  {sel:'main a[href="/official-correspondence/tray"]'},
  {sel:'main a[href="/official-correspondence/tray?folder=approvals"]',nth:1}
 ]},
 {name:'ch07-capacity',url:'/official-correspondence/tray?folder=drafts',fitBottom:'.oc-tray-reader',marks:[
  {sel:'.oc-mailbox-select'},
  {t:'^(Drafts|المسودات)\\s*\\d*$'}
 ]},
 {name:'ch07-tray',url:'/official-correspondence/tray?folder=inbox&q=QA-B2%20S4',fitBottom:'.oc-tray-reader',marks:[
  {t:'^(Inbox|الواردة)\\s*\\d*$'},
  {sel:'.oc-tray input[type=search],input[placeholder^="Search…"],input[placeholder^="بحث…"]'},
  {t:'^(Filters|فلاتر)$'},
  {t:'^(Refresh|تحديث)$'}
 ]}
];
