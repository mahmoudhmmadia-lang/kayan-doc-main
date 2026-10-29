const tabKey = (arTab, enTab, arWhat, enWhat) => ({
  ar: `① تبويب «${arTab}» داخل المهمة. ② زر الإجراء الرئيسي للمهمة، مثل «ابدأ» أو «إكمال»، ويتغير بحسب حالتها. ${arWhat}`.trim(),
  en: `① The “${enTab}” tab inside the task. ② The task’s main action, such as “Start” or “Complete”, which changes with its status. ${enWhat}`.trim(),
});
const twoKey = (arTab, enTab, arBtn, enBtn, arWhy, enWhy) => ({
  ar: `① تبويب «${arTab}». ② «${arBtn}» ${arWhy}`,
  en: `① The “${enTab}” tab. ② “${enBtn}” ${enWhy}`,
});
export const KEYS = {
  'ch04-collections': {
    ar: '① «إضافة مجموعة» ينشئ مجموعة جديدة. ② «جميع المهام» يجمع كل ما يمكنك الوصول إليه. ③ «مخصص لي» يعرض ما يجب أن تنفذه أنت. ④ «التكليفات» تعرض النماذج المطلوب منك تعبئتها.',
    en: '① “Add Collection” creates a new collection. ② “All Tasks” gathers everything you can reach. ③ “Assigned to Me” shows what you must carry out. ④ “Assignments” shows the forms you are asked to fill in.' },
  'ch04-collection-form': {
    ar: '① «العنوان» الإلزامي. ② «نوع المجموعة»: مشتركة أو شخصية. ③ «أنواع المهام المسموح بها»: قيد اختياري. ④ «إنشاء» يحفظ المجموعة.',
    en: '① The required “Title”. ② “Collection type”: shared or personal. ③ “Allowed task types”: an optional restriction. ④ “Create” saves the collection.' },
  'ch04-board': {
    ar: '① «لوحة» تختار هذا العرض. ② عمود «للعمل» وفيه المهام التي لم تبدأ. ③ «إضافة فلتر» يضيّق المهام المعروضة. ④ «إضافة مهمة» ينشئ مهمة في المجموعة.',
    en: '① “Board” selects this view. ② The “To Do” column holding tasks not yet started. ③ “Add filter” narrows the tasks shown. ④ “Add Task” creates a task in the collection.' },
  'ch04-list': {
    ar: '① «قائمة» تختار هذا العرض. ② مربع «بحث» للعثور على المهمة بعنوانها. ③ «إضافة فلتر» يضيّق النتائج.',
    en: '① “List” selects this view. ② The “Search” box to find a task by title. ③ “Add filter” narrows the results.' },
  'ch04-checkins': {
    ar: '① «المتابعة اليومية» تختار هذا العرض. ② «يحتاج إلى انتباه»: المهام المعرضة للخطر أو المحظورة. ③ «لا تحديث اليوم»: المهام التي لم يُنشر عنها تحديث اليوم.',
    en: '① “Check-ins” selects this view. ② “Needs attention”: tasks at risk or blocked. ③ “No update today”: tasks with no update posted today.' },
  'ch04-epics': {
    ar: '① التبديل إلى عرض «المشاريع»، أي المهام الكبرى في المجموعة. ② «إضافة مشروع» ينشئ مهمة كبرى جديدة. ③ «إنشاء ملحمة» يفعل الشيء نفسه عندما لا توجد مهام كبرى بعد.',
    en: '① Switches to the “Epics” view of the collection. ② “Add Epic” creates a new epic. ③ “Create Epic” does the same when no epics exist yet.' },
  'ch04-details': {
    ar: '① زر الإجراء الرئيسي، مثل «ابدأ» أو «إكمال». ② «تسجيل التقدم» ينشر تحديثاً عن العمل. ③ «المالك» المسؤول عن النتيجة. ④ «الأولوية» التي تحدد أهمية المهمة.',
    en: '① The main action, such as “Start” or “Complete”. ② “Log progress” posts an update on the work. ③ “Owner”, accountable for the result. ④ “Priority”, how important the task is.' },
  'ch04-output': tabKey('المخرجات', 'Output', 'واكتب في التبويب النتيجة الفعلية للعمل.', 'Write the actual result of the work in the tab.'),
  'ch04-challenges': tabKey('التحديات', 'Challenges', 'واكتب في التبويب ما يعيق العمل.', 'Write what is holding the work back in the tab.'),
  'ch04-progress': {
    ar: '① تبويب «التقدم». ② «نشر» يرسل التحديث بعد كتابة ما أنجزته والنسبة وسير العمل. ③ «تسجيل التقدم» يفتح التحديث من أعلى المهمة.',
    en: '① The “Progress” tab. ② “Post” sends the update after you write what you did, the percentage and the health. ③ “Log progress” opens an update from the top of the task.' },
  'ch04-requests': twoKey('الطلبات', 'Requests', 'طلب جديد', 'New request', 'يطلب من زميل عملاً أو معلومة مرتبطة بالمهمة.', 'asks a colleague for work or information tied to the task.'),
  'ch04-comments': twoKey('التعليقات', 'Comments', 'إضافة', 'Add', 'ينشر التعليق الذي كتبته.', 'posts the comment you wrote.'),
  'ch04-activity': {
    ar: 'الرقم في الصورة: ① تبويب «الأنشطة» الذي يسجّل كل تغيير على المهمة ومن أجراه ومتى.',
    en: 'Number on the image: ① The “Activities” tab recording every change to the task, who made it and when.' },
  'ch04-records': twoKey('العلاقات', 'Relationships', 'ربط سجل', 'Link a record', 'يربط المهمة بسجل آخر في كيان.', 'links the task to another KayanOS record.'),
  'ch04-relations': twoKey('المهام المرتبطة', 'Related tasks', 'إضافة علاقة', 'Add relation', 'يربط المهمة بمهمة أخرى، مثل مهمة تحظرها.', 'links the task to another task, such as one blocking it.'),
  'ch04-emails': twoKey('رسائل البريد', 'Emails', 'إضافة بريد', 'Add email', 'يربط رسالة بريد بالمهمة.', 'links an email to the task.'),
  'ch04-suggestions': {
    ar: '① «قيد المراجعة»: الاقتراحات التي تنتظر قرارك. ② «مرفوضة»: ما رفضته سابقاً. ③ «تحديث» يعيد تحميل الاقتراحات.',
    en: '① “Pending”: suggestions waiting for your decision. ② “Rejected”: those you rejected before. ③ “Refresh” reloads the suggestions.' },
  'ch04-assignments': {
    ar: '① عنوان صفحة «التكليفات». ② «المطلوب مني»: النماذج المسندة إليك وعددها.',
    en: '① The “Assignments” page title. ② “Assigned to me”: the forms assigned to you and their count.' },
  'ch04-settings': {
    ar: '① تبويب «المهام». ② «الفئات» التي تصنّف المهام. ③ «إضافة» ينشئ فئة جديدة. ④ «الأنواع» التي تحدد شكل كل مهمة.',
    en: '① The “Tasks” tab. ② “Categories” that classify tasks. ③ “Add” creates a new category. ④ “Types” that define each kind of task.' },
  'ch04-settings-epics': twoKey('المشاريع', 'Epics', 'إضافة', 'Add', 'ينشئ إعداداً جديداً للمهام الكبرى.', 'creates a new setting for epics.'),
  'ch04-settings-records': twoKey('علاقات السجلات', 'Record relations', 'إضافة علاقة', 'Add relation', 'ينشئ نوعاً جديداً لربط المهام بالسجلات.', 'creates a new kind of task-to-record link.'),
  'ch04-settings-relations': twoKey('علاقات المهام', 'Task relations', 'نوع علاقة جديد', 'New relation type', 'ينشئ نوعاً جديداً لربط المهام بعضها ببعض.', 'creates a new kind of task-to-task link.'),
  'ch04-statuses': {
    ar: '① عنوان صفحة «قوالب الحالات». ② «إضافة» ينشئ قالب حالات جديداً.',
    en: '① The “Status templates” page title. ② “Add” creates a new status template.' },
};
