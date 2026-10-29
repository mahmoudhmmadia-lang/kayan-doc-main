const member = (ar, en, arWhat, enWhat) => ({
  ar: `① تبويب «${ar}» في ملف العضو، ${arWhat} ② «تعديل» يفتح الملف لتغيير بياناته.`,
  en: `① The “${en}” tab of the member profile, ${enWhat} ② “Edit” opens the profile to change its data.`,
});
const form = (arWhat, enWhat) => ({
  ar: `① التبويب المفتوح في النموذج، ${arWhat} ② «إنشاء» يحفظ السجل بعد إكمال الحقول الإلزامية المعلّمة بنجمة.`,
  en: `① The open tab of the form, ${enWhat} ② “Create” saves the record once the required fields marked with a star are complete.`,
});
export const KEYS = {
  'ch01-workspaces-clear': {
    ar: '① قسم «مساحات عملي» الذي يرتّب التطبيقات بحسب استخدامك. ② بطاقة «الموارد البشرية» تفتح التطبيق مباشرة. ③ «جميع مساحات العمل» يعرض كل التطبيقات المتاحة لك.',
    en: '① The “My workspaces” section, which orders apps by your use. ② The “HR” card opens the app directly. ③ “All workspaces” shows every app available to you.' },
  'ch01-apps-clear': {
    ar: '① مربع البحث لكتابة اسم التطبيق. ② «الموارد البشرية». ③ «ادوات البناء»، ويظهر لمن يملك صلاحية البناء.',
    en: '① The search box for typing an app’s name. ② “HR”. ③ “Builder”, shown to those with building rights.' },
  'ch02-create-org': {
    ar: '① الخطوة الأولى «جهة الاتصال» التي تبدأ بها. ② الخطوة الأخيرة «تفاصيل المؤسسة» التي تنتهي عندها.',
    en: '① The first step, contact details, where you start. ② The last step, organization details, where you finish.' },
  'ch03-hr-pages-clear': {
    ar: '① «السجلات» يعرض صفحات السجلات وحدها. ② بطاقة «الأعضاء». ③ «سجل جديد» يضيف سجلاً مباشرة من البطاقة.',
    en: '① “Records” shows record pages only. ② The “Members” card. ③ “New record” adds a record straight from the card.' },
  'ch02-member-fields': member('نظرة عامة', 'Overview', 'وفيه أهم بيانات العضو.', 'holding the member’s key data.'),
  'ch03-member-tab1': member('نظرة عامة', 'Overview', 'وفيه أهم بيانات العضو.', 'holding the member’s key data.'),
  'ch03-member-tab2': member('التأهيل والتوجيه', 'Orientation', 'وفيه خطوات استقبال الموظف الجديد.', 'holding the new employee’s onboarding steps.'),
  'ch03-member-tab3': member('الشخصي', 'Personal', 'وفيه الهوية والجواز والعائلة.', 'holding identity, passport and family.'),
  'ch03-member-tab4': member('الاتصال', 'Contact', 'وفيه وسائل التواصل والعنوان.', 'holding contact methods and address.'),
  'ch03-member-tab5': member('المؤهلات', 'Qualifications', 'وفيه الشهادات والخبرات.', 'holding certificates and experience.'),
  'ch03-member-tab6': member('تضارب المصالح', 'Conflict of Interest', 'وفيه الإفصاحات المطلوبة.', 'holding the required disclosures.'),
  'ch03-member-tab7': member('المالية', 'Financial', 'وفيه البيانات المصرفية.', 'holding banking details.'),
  'ch03-member-tab8': member('التوظيف', 'Employment', 'وفيه بيانات العمل والعقد.', 'holding employment and contract data.'),
  'ch03-member-tab9': member('الحضور', 'Attendance', 'وفيه إعدادات الحضور والوردية.', 'holding attendance and shift settings.'),
  'ch03-member-tab11': member('حسابات البريد', 'Email Accounts', 'وفيه حسابات البريد المرتبطة.', 'holding linked email accounts.'),
  'ch03-member-tab12': member('ساعات العمل', 'Worked hours', 'وفيه الساعات المسجلة.', 'holding recorded hours.'),
  'ch03-member-tab13': member('الإشعارات', 'Notifications', 'وفيه تفضيلات الإشعارات.', 'holding notification preferences.'),
  'ch03-member-tab14': member('الجلسات', 'Sessions', 'وفيه أجهزة الدخول النشطة.', 'holding active sign-in devices.'),
  'ch03-member-tab15': member('التحقق بخطوتين', 'Two-step verification', 'وفيه إعداد حماية الدخول.', 'holding sign-in protection.'),
  'ch03-member-tab16': member('الأدوار', 'Roles', 'وفيه الأدوار الممنوحة للعضو.', 'holding the roles granted to the member.'),
  'ch02-position-fields': form('وفيه بيانات المنصب الأساسية.', 'holding the position’s basic data.'),
  'ch02-position-fields-tab2': form('وفيه بقية بيانات المنصب.', 'holding the rest of the position’s data.'),
  'ch02-assignment-fields': form('وفيه العضو والمنصب وتاريخ البدء.', 'holding the member, position and start date.'),
  'ch02-assignment-fields-tab2': form('وفيه بقية بيانات التعيين.', 'holding the rest of the assignment’s data.'),
  'ch02-node-fields': form('وفيه رمز الوحدة واسمها ونوعها.', 'holding the unit’s code, name and type.'),
  'ch02-node-fields-tab2': form('وفيه بقية بيانات الوحدة.', 'holding the rest of the unit’s data.'),
  'ch02-location-fields': form('وفيه بيانات الموقع الأساسية.', 'holding the location’s basic data.'),
  'ch02-location-fields-tab2': form('وفيه بيانات إضافية للموقع.', 'holding more of the location’s data.'),
  'ch02-location-fields-tab3': form('وفيه المعلومات العامة للموقع.', 'holding the location’s general information.'),
  'ch02-location-fields-tab4': form('وفيه غرف الموقع.', 'holding the location’s rooms.'),
  'ch03-feature-groups': form('وفيه أعضاء المجموعة.', 'holding the group’s members.'),
  'ch03-feature-groups-tab1': form('وفيه أعضاء المجموعة.', 'holding the group’s members.'),
  'ch03-leave-type-fields': form('وفيه قواعد نوع الإجازة.', 'holding the leave type’s rules.'),
  'ch03-leave-type-fields-tab1': form('وفيه قواعد نوع الإجازة.', 'holding the leave type’s rules.'),
  'ch03-feature-seniority-levels': form('وفيه بيانات المستوى الوظيفي.', 'holding the seniority level’s data.'),
  'ch03-shift-example': {
    ar: '① «الاسم» الإلزامي للوردية. ② «أيام العمل» التي تختارها بالضغط. ③ «الاستراحات» التي تُخصم من مدة الدوام.',
    en: '① The shift’s required “Name”. ② “Working Days”, chosen by pressing them. ③ “Breaks”, deducted from the working time.' },
  'ch03-feature-my-attendance': {
    ar: '① عنوان صفحة «حضوري». ② «العمل»: الوقت المحتسب في الشهر. ③ «يحتاج تصحيحًا»: يوم يحتاج إلى طلب تصحيح.',
    en: '① The “My attendance” page title. ② “Work”: time counted in the month. ③ “Needs correction”: a day that needs a correction request.' },
  'ch03-feature-timesheets': {
    ar: '① عنوان صفحة «جداول الدوام». ② «اليوم» يعرض يوماً واحداً. ③ «الأسبوع» يعرض الأسبوع كاملاً.',
    en: '① The “Timesheets” page title. ② “Today” shows a single day. ③ “Week” shows the whole week.' },
  'ch03-leave-fields': {
    ar: 'الرقم في الصورة: ① «إنشاء» يحفظ الإجازة بعد إكمال الحقول الإلزامية.',
    en: 'Number on the image: ① “Create” saves the leave once the required fields are complete.' },
  'ch03-payroll-input-fields': {
    ar: 'الرقم في الصورة: ① «إنشاء» يحفظ مدخل الراتب بعد إكمال الحقول الإلزامية.',
    en: 'Number on the image: ① “Create” saves the payroll input once the required fields are complete.' },
  'ch03-feature-holiday-groups': {
    ar: '① عنوان صفحة «مجموعات العطل الرسمية». ② «مجموعة جديدة» تنشئ تقويم عطل جديداً.',
    en: '① The “Holiday groups” page title. ② “New group” creates a new holiday calendar.' },
  'ch03-feature-attendance-corrections': {
    ar: 'الرقم في الصورة: ① عنوان صفحة تصحيحات الحضور، وتحته الطلبات وحالاتها.',
    en: 'Number on the image: ① The attendance corrections page title, with the requests and their status below it.' },
  'ch03-feature-attendance-policy': {
    ar: '① «سياسة جديدة» تنشئ سياسة حضور. ② «فتح» يعرض قواعد السياسة. ③ «حفظ» يحفظ مهلة تصحيح الحضور.',
    en: '① “New policy” creates an attendance policy. ② “Open” shows the policy’s rules. ③ “Save” saves the correction window.' },
  'ch03-feature-attendance-terminals': {
    ar: '① «شبكة جديدة» تضيف شبكة موقع فيها أجهزة بصمة. ② «الإعدادات» لإعدادات وكيل الحضور.',
    en: '① “New network” adds a site network with fingerprint devices. ② “Settings” for the attendance agent settings.' },
  'ch03-feature-experience-levels': {
    ar: 'الرقم في الصورة: ① عنوان صفحة «مستويات الخبرة»، وتحته المجموعات وعملتها وزيادتها.',
    en: 'Number on the image: ① The “Experience levels” page title, with the groups, their currency and increment below it.' },
  'ch03-feature-salary-scale': {
    ar: '① عنوان صفحة «سلم الراتب». ② عمود «مستوى الأقدمية» الذي تُقرأ منه رواتب كل درجة.',
    en: '① The “Salary scale” page title. ② The “Seniority Level” column, from which each grade’s salaries are read.' },
  'ch03-create-slips-clear': {
    ar: '① «إنشاء قسائم رواتب» يبدأ قسائم الفترة. ② مربع البحث للعثور على قسيمة موظف.',
    en: '① “Create salary slips” starts the period’s slips. ② The search box to find an employee’s slip.' },
  'ch03-feature-payrolls': {
    ar: '① «إنشاء كشف رواتب» يجمع القسائم المعتمدة في كشف. ② «جميع الحالات» يصفّي الكشوف بحسب حالتها.',
    en: '① “Create payroll” gathers approved slips into a payroll. ② “All statuses” filters payrolls by status.' },
};
