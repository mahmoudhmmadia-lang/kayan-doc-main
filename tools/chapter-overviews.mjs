// Editorial summaries of the first three main-guide chapters only.
// Keep each idea grounded in its linked source section, in both languages.
export const chapterOverviews = {
  'ch:intro': {
    en: {
      title: 'From scattered work to a clear result',
      intro: 'Meet Horizon Services Co., our fictional company throughout the guide. Sarah Al-Khatib handles HR; Omar Haddad coordinates operations.',
      result: 'Everyone knows where to work, what they can do and who owns the next step.',
      steps: [
        ['Bring work together', 'Choose the app that matches the work you need to organize.', 'Sarah opens HR for employee records; Omar uses Tasks to follow an office-setup request.', 'tab:intro-app-map'],
        ['Build what is specific to you', 'An authorized administrator can build records, forms and approval paths without code.', 'Horizon’s administrator builds a visit request that Omar submits and Sarah reviews.', 'sec:intro-no-code'],
        ['Give each person the right access', 'Roles define what people can see and do. Check access before relying on it.', 'Omar can submit a visit request; Sarah’s role can approve it.', 'sec:intro-control'],
        ['Follow the work to completion', 'Assign an owner and a due date, then update the status and review the result.', 'Omar completes the office-setup request and attaches the result for his manager to review.', 'sec:intro-entity'],
      ],
    },
    ar: {
      title: 'من أعمال متفرقة إلى نتيجة واضحة',
      intro: 'نرافق شركة الأفق للخدمات، وهي مثالنا الافتراضي طوال الدليل. تتولى سارة الخطيب الموارد البشرية، ويعمل عمر حداد منسقاً للعمليات.',
      result: 'يعرف كل شخص أين يعمل، وما يستطيع فعله، ومن يتولى الخطوة التالية.',
      steps: [
        ['اجمع العمل في مكان واحد', 'اختر التطبيق المناسب للعمل الذي تريد تنظيمه.', 'تفتح سارة الموارد البشرية لملفات الموظفين، ويتابع عمر طلب تجهيز مكتب في المهام.', 'tab:intro-app-map'],
        ['ابنِ ما يخص عملك', 'يستطيع مسؤول مخوّل بناء السجلات والنماذج ومسارات الاعتماد دون برمجة.', 'يبني مسؤول الأفق طلب زيارة يقدّمه عمر وتراجعه سارة.', 'sec:intro-no-code'],
        ['حدّد صلاحيات كل شخص', 'تحدد الأدوار ما يراه الأشخاص وما يفعلونه. تحقّق من صلاحياتهم قبل الاعتماد عليها.', 'يستطيع عمر تقديم طلب زيارة، ويتيح دور سارة اعتماد الطلب.', 'sec:intro-control'],
        ['تابع العمل حتى إنجازه', 'حدّد المسؤول والموعد، ثم حدّث الحالة وراجع النتيجة.', 'ينجز عمر طلب تجهيز المكتب، ويرفق النتيجة ليراجعها مديره.', 'sec:intro-entity'],
      ],
    },
  },
  'ch:org-setup': {
    en: {
      title: 'Prepare a home for your team’s work',
      intro: 'Example: Horizon. Its setup administrator prepares the organization once. If it already exists, review its settings instead of creating another one.',
      result: 'The administrator can sign in, the settings are saved, and the organization is ready for team setup in HR.',
      steps: [
        ['Prepare the details', 'Have the contact method, organization details and administrator details ready.', 'Horizon chooses hzn as its example subdomain: hzn.kayanos.app.', 'sec:setup-before'],
        ['Create the organization', 'Verify the contact method, enter the administrator and organization details, then finish creation.', 'Horizon’s administrator signs in at the new address and checks the organization name.', 'sec:setup-create'],
        ['Set language and time', 'Review the time zone, default language and first day of the week, then save.', 'Horizon chooses Asia/Damascus and Arabic, and sets the week to match its working schedule.', 'sec:setup-settings'],
        ['Check, then prepare the team', 'Reopen the settings to confirm they were saved; keep the sign-in address for the team.', 'After verification, Sarah moves to HR to prepare Horizon’s people and positions.', 'sec:setup-check'],
      ],
    },
    ar: {
      title: 'جهّز مكاناً يجمع عمل الفريق',
      intro: 'مثال: شركة الأفق. يجهّز مسؤول الإعداد المؤسسة مرة واحدة. إن كانت موجودة بالفعل، يراجع إعداداتها بدلاً من إنشاء نسخة أخرى.',
      result: 'يدخل المدير بحسابه، وتُحفظ الإعدادات، وتصبح المؤسسة جاهزة لإعداد الفريق في الموارد البشرية.',
      steps: [
        ['جهّز البيانات', 'جهّز وسيلة التواصل وبيانات المؤسسة وحساب المدير.', 'تختار الأفق في مثالنا النطاق الفرعي hzn، فيصبح عنوانها hzn.kayanos.app.', 'sec:setup-before'],
        ['أنشئ المؤسسة', 'تحقّق من وسيلة التواصل، وأدخل بيانات المدير والمؤسسة، ثم أكمل الإنشاء.', 'يدخل مسؤول الأفق إلى العنوان الجديد ويتأكد من اسم المؤسسة.', 'sec:setup-create'],
        ['اضبط اللغة والوقت', 'راجع المنطقة الزمنية واللغة الافتراضية ويوم بداية الأسبوع، ثم احفظ.', 'تختار الأفق Asia/Damascus والعربية، وتضبط بداية الأسبوع بحسب أيام عملها.', 'sec:setup-settings'],
        ['تحقّق ثم جهّز الفريق', 'أعد فتح الإعدادات للتأكد من حفظها، واحتفظ بعنوان الدخول للفريق.', 'بعد التحقق، تنتقل سارة إلى الموارد البشرية لإعداد الموظفين والمناصب.', 'sec:setup-check'],
      ],
    },
  },
  'ch:hr': {
    en: {
      title: 'Connect people, working time and pay',
      intro: 'Example: Horizon. Sarah prepares the team’s records; Omar follows his working day. Payroll is handled by the payroll team when needed.',
      result: 'People are linked to their positions, working time is reviewable, and payroll can use the prepared records when needed.',
      steps: [
        ['Connect a person to a position', 'Create the member and position first. An assignment connects them; a department and location add context.', 'Sarah links Omar Haddad to the Operations Coordinator position at the Aleppo branch.', 'sec:hr-feature-assignments'],
        ['Set working time', 'Prepare shifts and check which shift applies to each employee.', 'Horizon uses Office Hours, Sunday–Thursday, 09:00–17:00.', 'sec:hr-feature-shifts'],
        ['Review the working day', 'Employees check attendance; HR reviews the team’s working time, corrections and leave.', 'Omar checks his recorded attendance; Sarah reviews the team’s attendance and leave.', 'sec:hr-feature-timesheets'],
        ['Calculate pay when needed', 'Prepare pay data and monthly inputs, review salary slips, then build payroll from approved slips.', 'Horizon’s payroll team reviews Omar’s monthly inputs and salary slip before including it in payroll.', 'sec:hr-feature-payrolls'],
      ],
    },
    ar: {
      title: 'اربط الموظفين بالدوام والرواتب',
      intro: 'مثال: شركة الأفق. تُعدّ سارة سجلات الفريق، ويتابع عمر يوم عمله، ويتولى فريق الرواتب احتساب المستحقات عند الحاجة.',
      result: 'يرتبط الموظفون بمناصبهم، ويمكن مراجعة دوامهم، ثم استخدام البيانات المجهّزة للرواتب عند الحاجة.',
      steps: [
        ['اربط الموظف بالمنصب', 'أنشئ العضو والمنصب أولاً، ثم اربطهما بتعيين. ويمكن إضافة القسم والموقع لتوضيح مكان العمل.', 'تربط سارة عمر حداد بمنصب منسق عمليات في فرع حلب.', 'sec:hr-feature-assignments'],
        ['حدّد وقت العمل', 'جهّز الورديات وتحقّق من الوردية المطبّقة على كل موظف.', 'تستخدم الأفق الدوام الإداري من الأحد إلى الخميس، 09:00–17:00.', 'sec:hr-feature-shifts'],
        ['راجع يوم العمل', 'يراجع الموظف حضوره، وتتابع الموارد البشرية دوام الفريق وتصحيحاته وإجازاته.', 'يراجع عمر حضوره المسجّل، وتتابع سارة حضور الفريق وإجازاته.', 'sec:hr-feature-timesheets'],
        ['احتسب الرواتب عند الحاجة', 'جهّز بيانات الأجر ومدخلات الشهر، وراجع القسائم، ثم أعدّ كشف الرواتب من القسائم المعتمدة.', 'يراجع فريق الرواتب مدخلات عمر وقسيمته الشهرية قبل إدراجها في الكشف.', 'sec:hr-feature-payrolls'],
      ],
    },
  },
}

const icon = path => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`

// A switch that turns the chapter into its key ideas, plus the dialog that shows
// one idea's full explanation without leaving the diagram. Without JavaScript
// the switch is a plain disclosure and the links open the explanation itself.
export function renderChapterOverview(label, lang, resolve, esc) {
  const content = chapterOverviews[label]?.[lang]
  if (!content) return ''
  const ar = lang === 'ar'
  const t = ar
    ? { title: 'الفصل في مخطط', sub: 'أهم الأفكار مع مثال الأفق، دون بقية الفصل', on: 'مفعّل', off: 'متوقف', eyebrow: 'مثال: شركة الأفق', ideas: `${content.steps.length} أفكار رئيسية`, at: 'في الأفق', read: 'اقرأ الشرح', result: 'النتيجة', note: 'المختصر مفعّل، ونخفي بقية الفصل. اقرأ شرح أي فكرة من زرها، أو اعرض الفصل كاملاً.', full: 'اعرض الفصل كاملاً', close: 'إغلاق', prev: 'الفكرة السابقة', next: 'الفكرة التالية', open: 'افتحه في الفصل', loading: 'جارٍ تحميل الشرح…' }
    : { title: 'Chapter at a glance', sub: 'Key ideas through the Horizon example, without the rest of the chapter', on: 'On', off: 'Off', eyebrow: 'Example: Horizon', ideas: `${content.steps.length} key ideas`, at: 'At Horizon', read: 'Read the explanation', result: 'The result', note: 'Shorthand is on, so the rest of the chapter is hidden. Read any idea from its button, or show the full chapter.', full: 'Show the full chapter', close: 'Close', prev: 'Previous idea', next: 'Next idea', open: 'Open it in the chapter', loading: 'Loading the explanation…' }
  const id = 'chapter-overview'
  const steps = content.steps.map(([title, idea, example, target], i) => `<li class="overview-step"><span class="overview-node" aria-hidden="true">${i + 1}</span><article class="overview-card"><h3>${esc(title)}</h3><div class="overview-card-grid"><p class="overview-idea">${esc(idea)}</p><p class="overview-example"><span>${icon('<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M16 9h2a2 2 0 0 1 2 2v10M2 21h20M8 7h4M8 11h4M8 15h4"/>')}${esc(t.at)}</span>${esc(example)}</p></div><a class="overview-more" href="${esc(resolve(target))}" data-overview-open="${i}" data-title="${esc(title)}">${esc(t.read)}${icon('<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>')}<span class="sr-only">: ${esc(title)}</span></a></article></li>`).join('')
  return `<details class="chapter-overview" id="${id}">
    <summary aria-controls="${id}-body"><span class="overview-symbol" aria-hidden="true">${icon('<rect x="3" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="16" width="7" height="5" rx="1.5"/><path d="M6.5 8v4.5a2 2 0 0 0 2 2h7a2 2 0 0 1 2 2"/>')}</span><span class="overview-label"><strong>${t.title}</strong><small>${t.sub}</small></span><span class="overview-switch" aria-hidden="true"><span class="overview-switch-text" data-on="${t.on}" data-off="${t.off}"></span><span class="overview-switch-track"><span class="overview-switch-thumb"></span></span></span></summary>
    <div class="overview-body" id="${id}-body">
      <header class="overview-head"><div class="overview-chips"><span>${t.eyebrow}</span><span>${t.ideas}</span></div><h2>${esc(content.title)}</h2><p>${esc(content.intro)}</p></header>
      <ol class="overview-flow">${steps}<li class="overview-step is-result"><span class="overview-node" aria-hidden="true">${icon('<path d="m5 12 5 5 9-10"/>')}</span><div class="overview-result"><strong>${t.result}</strong><p>${esc(content.result)}</p></div></li></ol>
      <div class="overview-note"><p>${t.note}</p><button class="btn" type="button" data-overview-full>${t.full}</button></div>
    </div>
  </details>
  <dialog class="overview-dialog" aria-labelledby="overview-dialog-title" data-loading="${t.loading}">
    <header class="overview-dialog-head"><div><span class="overview-dialog-eyebrow" data-ov-eyebrow></span><h2 id="overview-dialog-title" data-ov-title></h2></div><button class="icon-btn" type="button" data-ov-close aria-label="${t.close}">${icon('<path d="m6 6 12 12M18 6 6 18"/>')}</button></header>
    <div class="overview-dialog-body" data-ov-body></div>
    <footer class="overview-dialog-foot"><div class="overview-dialog-nav" data-ov-nav><button class="icon-btn" type="button" data-ov-step="-1" aria-label="${t.prev}" title="${t.prev}"><svg class="ic flip" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button><span dir="ltr" data-ov-count></span><button class="icon-btn" type="button" data-ov-step="1" aria-label="${t.next}" title="${t.next}"><svg class="ic flip" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button></div><a class="btn btn-primary" href="#" data-ov-full>${t.open}</a></footer>
  </dialog>`
}
