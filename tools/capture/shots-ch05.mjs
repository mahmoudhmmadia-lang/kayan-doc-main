export const THEME = 'dark';
const C = { t: '^(Create|إنشاء)$' };
export const SHOTS = [
  { name: 'ch05-directory', url: '/apps/projects', marks: [
    { t: '^(Plans|الخطط)$' }, { t: '^(New record|سجل جديد)$', dom: 0 }, { t: '^(Budgets|الميزانيات)$' }, { t: '^(Portfolios|المحافظ)$' }] },
  { name: 'ch05-plans', url: '/apps/projects/planning/plans/add?tab=overview', marks: [
    { t: '^(Overview|نظرة عامة)', max: 20 }, { t: '^(Plan Category|Plan category|فئة الخطة)', max: 20 }, C] },
  { name: 'ch05-project-create', url: '/apps/projects/pm_core/pm_projects/add?tab=overview', marks: [
    { t: '^(Overview|نظرة عامة)', max: 20 }, { t: '(Charter|ميثاق المشروع)', max: 25 }, { t: '^(Framework|الإطار)', max: 20 }, { t: '^(Code|الرمز)', max: 10 }, C] },
  { name: 'ch05-project-framework', url: '/apps/projects/pm_core/pm_projects/add?tab=framework', marks: [
    { t: '^(Framework|الإطار)', max: 20 }, { t: { en: '^Framework', ar: '^الإطار المنهجي' }, dom: { en: 1 }, max: 14 }, { t: '(Delivery approach|Delivery Approach|نهج التسليم)', max: 25 }, C] },
  { name: 'ch05-project-charter', url: '/apps/projects/pm_core/pm_projects/add?tab=charter', marks: [
    { t: '^(Charter|ميثاق المشروع)( \\*)?$', max: 25 }, { t: '(Project Manager|Project manager|مدير المشروع)', max: 25 }, { t: '^(Priority|الأولوية)', max: 15 }, C] },
  { name: 'ch05-portfolios', url: '/apps/projects/portfolio/pm_portfolios/add?tab=overview', marks: [
    { t: '^(Code|الرمز)', max: 10 }, { t: '(Portfolio Owner|Portfolio owner|مالك المحفظة)', max: 25 }, { t: '^(Programs|البرامج)$' }, C] },
  { name: 'ch05-programs', url: '/apps/projects/portfolio/pm_programs/add?tab=overview', marks: [
    { t: '^(Code|الرمز)', max: 10 }, { t: '^(Name|الاسم)', max: 10 }, C] },
  { name: 'ch05-budgets', url: '/apps/projects/pm_financial/pm_budgets/add?tab=overview', marks: [
    { t: '^(Budget Lines|Budget lines|بنود الميزانية)$' }, { t: '(Budget period start|Budget Period Start|بداية فترة الميزانية)', max: 30 }, { t: '^(Currency|العملة)', max: 12 }, C] },
  { name: 'ch05-cost-category', url: '/apps/projects/pm_financial/pm_cost_categories/guideqa20261018_guide_qa_visit_transport?returnView=table&tab=overview', marks: [
    { t: '^(Edit|تعديل)$' }, { t: '(Category Type|Category type|نوع الفئة)', max: 20 }, { t: '^(Active|نشط)', max: 10 }, { t: '^(Roles|الأدوار)$' }] },
];
