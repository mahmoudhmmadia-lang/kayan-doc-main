export const THEME='light';
const AV='/settings/ai-availability';
const LIM='/settings/ai-limits';
export const SHOTS=[
 {name:'ch08-ai-availability',url:AV,fitBottom:'tbody tr >> nth=5',marks:[
  {t:"^(اختيار العضو|Member's choice)$"},
  {t:'^(متوقف افتراضيًا|Off by default)$'},
  {t:'^(تعيين قواعد للمحددين|Set rules for selected)$'},
  {t:'^(تعديل القواعد|Edit rules)$'}
 ]},
 {name:'ch08-ai-availability-member',url:AV,keepDialog:true,fitBottom:'[role=dialog] button >> nth=-1',prep:[{t:'^(تعديل القواعد|Edit rules)$'}],marks:[
  {t:'^(افتراضي|Default)$'},
  {t:'^(إلغاء|Cancel)$'},
  {t:'^(حفظ|Save)$'}
 ]},
 {name:'ch08-ai-limits',url:LIM,fitBottom:'tbody tr >> nth=5',marks:[
  {sel:'main input[inputmode=decimal]',nth:0},
  {t:'^(الاستخدام حسب الميزة|Usage by feature)$'},
  {sel:'main input[inputmode=decimal]',nth:1},
  {t:'^(تطبيق الحد|Apply limit)$'},
  {t:'^(كل الحالات|All statuses)$'}
 ]}
];
