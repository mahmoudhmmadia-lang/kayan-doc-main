# سجل تقدم دليل KayanOS

الحالات: لم يبدأ · مسودة · قيد المراجعة · معتمد

## Chapter shorthand fixes (chapters 1–3) — 2026-10-28 — under review

- The `+` glyph is replaced by an On/Off switch in the panel header. Turning it on now hides every chapter section and the step bar, leaving the title, the diagram and the pager; a note under the diagram offers "Show the full chapter".
- Redesigned the flow: one rail of numbered nodes ending in a result node; each card shows the idea and the Horizon example side by side (stacked on phones), with a pill "Read the explanation" button.
- "Read the explanation" opens the section in a modal (bottom sheet on phones) instead of scrolling: previous/next idea, "Open it in the chapter", screenshot enlargement above it, Escape closes the picture first. HR sections are fetched from their feature pages; offline `file://` copies fall back to opening the page. While shorthand is on, contents links also open in the dialog; deep links and language switching behave correctly. The global short mode no longer trims the dialog's copy.
- Verification: HTML build, 18 unit tests (2 archived skipped) and `tools/verify-chapter-overviews.mjs` (24 combinations: both languages × chapters 1–3 × 1440/390 × dark/light, plus no-JavaScript). Screenshots: `review/html/chapter-overviews/`. Guide-only change; no test2 product workflow test needed.

## Screenshot key wording — 2026-10-28

- Removed the repeated screenshot-number lead-in from Arabic/English source notes and capture helpers, and removed the order subtitle from the shared HTML renderer. Kept numbered explanations and the key heading; removed unused subtitle CSS.
- Rebuilt both languages. All 17 active checks passed (2 archived print checks skipped); all 469 generated HTML pages are free of the removed phrases. Local browser checks passed for Arabic/English, desktop/mobile and dark/light, preserving the numbered keys without horizontal overflow. Evidence: `review/html/clean-screenshot-keys/`. This guide-only change requires no test2 product workflow test.

## Chapter 1: introduce the shared example first — 2026-10-28 — under review

- Moved the Horizon introduction from 1.4 to 1.2, before the Builder and permissions sections, in Arabic and English. Added an opening sentence explaining that one fictional company is followed throughout the guide and introduced Sarah and Omar by their full names before their worked examples.
- Rebuilt HTML; all 17 active source/web checks passed (2 archived print checks skipped). Local Edge verification passed 8 combinations covering both languages, desktop/mobile and dark/light: section order, numbering, deep links, language switching, saved completion and horizontal overflow. Inspected desktop/mobile screenshots in `review/html/intro-order/`.
- This is a guide-only editorial change, so verification used the local guide preview; no product workflow test on test2 was needed.

## الفصل 1: مقدمة أقوى لقدرات كيان — 2026-10-28 — قيد المراجعة

- بطلب المستخدم صار الفصل الأول يعرّف القارئ الجديد بحجم كيان وفائدته: جدول «ما الذي يقدّمه كيان لمؤسستك؟» (القدرة، معناها، ما تكسبه)، وصفحتان جديدتان: «ابنِ نظام عملك دون برمجة» (جدول أدوات البناء الثماني بأمثلة، وشكل «من فكرة إلى تطبيق يعمل به الفريق»، ومثال الأفق) و«تحكّم في كل صلاحية» (مستويات الصلاحيات، وأداة «التحقق من صلاحيات شخص»، ومثال الأفق).
- أُضيف صف «من يبني تطبيقات المؤسسة» إلى «من أين تبدأ؟»، وصف «المراسلات الرسمية» إلى «اختر التطبيق». لم تتغير الصور ولا الأقسام الأخرى، وبقيت التسميات (labels) كما هي.
- كل قدرة مذكورة مأخوذة من صفحات دليل أدوات البناء الموثّقة، دون وعود بأرقام أو نتائج آلية. نجح بناء HTML و17 اختباراً، وفُحصت الصفحة في المتصفح باللغتين (1440 و390) دون تمرير أفقي أو أخطاء، مع رابط الفصل 6. الصور في `review/html/intro/`.

## مفتاح الأرقام: شرح ما يحتاج فقط — 2026-10-22

- طلب المستخدم ألا يُشرح كل رقم. صار المفتاح يعرض الأرقام بترتيبها على خط واحد مع عبارة «بترتيب الأرقام في الصورة»؛ التسمية وحدها سطر مختصر، و«التسمية: الشرح» بطاقة. التعديل في `tools/html-render.mjs` و`web/guide.css`، ونُسخ إلى دليل المرصد الصناعي.
- رُوجعت مفاتيح كل الفصول بالعربية والإنجليزية: حُذف الشرح الذي يكرر التسمية (نحو 150 بنداً، منها 15 تكراراً لنجمة الحقول الإلزامية في الموارد البشرية)، وحُوّل الشرح المفيد المكتوب دون نقطتين إلى صيغة «التسمية: الشرح».
- نجح بناء HTML و17 اختباراً، وفُحص المفتاح بصرياً بالعربية (1440 داكن) والإنجليزية (390 فاتح) في `review/html/key-*.png`.

## نافذة تأكيد إعادة ضبط التقدم — 2026-10-21

- استُبدل تأكيد المتصفح بنافذة متوافقة مع تصميم الدليل، بالعربية والإنجليزية وبالمظهرين. يستفيد دليل المرصد من المكوّن المشترك نفسه.
- يبدأ التركيز بزر «إلغاء»، ويبقى التنقل بلوحة المفاتيح داخل النافذة. يحافظ الإلغاء وEscape والضغط خارج النافذة على التقدم؛ ويمسح التأكيد تقدم الدليل الجاري فقط، ويعيد رابط المتابعة إلى أول خطوة.
- نجح بناء الدليلين و19 اختباراً نشطاً إجمالاً، ثم 20 سيناريو متصفح تغطي دليل النظام وأدوات البناء والمرصد، على الهاتف وسطح المكتب وبالمظهرين. النتائج والصور في `review/reset-dialog/`، وأداة التحقق `tools/verify-reset-dialog.mjs`.
- جرى الاختبار محلياً لأن التغيير في قارئ الدليل المولّد، وليس في تطبيق test2. لم تتغير حالات اعتماد الفصول.

## المراسلات الرسمية: مرحلة البداية — 2026-10-21 — قيد المراجعة

- وافق المستخدم على بدء التطبيق المقترح. أُضيف الفصل السابع باللغتين: نظرة عامة وثلاث صفحات مستقلة للرئيسية والمسؤوليات، والصفة والصلاحيات، وصندوق المراسلات ودورة العمل، وفق المرحلة الأولى من المخطط المعتمد.
- يميّز الشرح المُعِدّ ومراجع الصياغة والمعتمد والمستلم وموظف الديوان ومسؤول التهيئة، دون تقديم هذه المسؤوليات بوصفها أسماء أدوار إلزامية. يتابع مثال الأفق طلب تنسيق زيارة فرع حلب.
- التُقطت ست صور من test2 باللغتين، مع أرقام على عناصر التحكم وشروح مطابقة تحت الصور. أُضيفت الصفحات إلى الفهرس والبحث والتنقل وتبديل اللغة وحفظ الإنجاز.
- اختُبر على test2 تبديل المنصب وإعادته، والانتقال من الواردة إلى المسودات والعودة، والبحث بنتيجة فارغة ومسحه لاستعادة القائمة، وتفعيل فلتر العاجل وإلغاؤه والتحديث. لم تُنشأ مراسلات ولم تُعتمد أو تُرسل؛ ولم يُختبر إنشاء تفويض أو عمل جميع الأدوار.
- نجح بناء HTML و17 اختباراً نشطاً؛ وتأجل اختبارا المطبوعات وفق اتجاه المشروع. نجحت 32 حالة متصفح للصفحات الجديدة باللغتين، على سطح المكتب والهاتف وبالمظهرين، مع البطاقات والبحث وتبديل اللغة وحفظ الإنجاز وتكبير الصور ودون تمرير أفقي.
- أدلة التحقق وحدوده في `review/correspondence-source-coverage.md` وملفي التحقق المجاورين له. المرحلة الأولى جاهزة للمراجعة؛ وتبقى المراحل 2–6 في المخطط. لم تُحدَّث مخرجات PDF أو Word أو Overleaf.

## دليل أدوات البناء مكتمل الفصول — 2026-10-20 — قيد المراجعة

- بطلب المستخدم وُسّعت فصول دليل أدوات البناء الثمانية كلها: 101 صفحة باللغتين (الكيانات 21، التطبيقات والتنقل 9، النماذج 15، الخدمات 11، الإجراءات الداخلية 13، إجراءات التشغيل القياسية والبوتات 7، المستندات والطباعة 13، لوحات المعلومات والتقارير 12).
- المصدر: شيفرة فرع \en{origin/production} (ما يعمل على test2)، لأن النسخة المحلية متأخرة 452 إيداعاً. أُضيفت صفحة «الإثبات» الجديدة في الكيانات.
- صور مرقّمة من test2 باللغتين لـ95 صفحة تقريباً، مسجّلة في `review/fullpage-manifest.json`. صفحات بلا صورة وسببها: «حقل الحالة وقواعد دورة الحياة» (النوع الاختباري بلا حقل حالة)، «إعدادات تحتاج إلى مراجعة» (لا إعدادات معطوبة في test2)، «إتاحة نموذج على البوابة» (زر قد ينشر نموذجاً فلم يُضغط)، وصفحتا وسوم DOCX وXLSX (تُكتب في Word وExcel).
- لم يُنشأ أو يُنشر أو يُحذف شيء في test2، عدا أربع جلسات اختبار معزولة أنشأها زر «بدء الاختبار» في أحد النماذج.
- صُحّحت نصوص خالفتها الشاشات (مثل «بانتظارك» في الموافقات، و«عرض جميع الخيارات» في صلاحية عنصر اللوحة، وزر «إعادة الفحص» في معاينة الطباعة، واتصال الأتمتة). وقائمة ملاحظات النصوص العربية في الواجهة محفوظة في تقارير الفصول (في `review/builder-source-coverage.md`).
- التحقق: `node tools/check-builder-chapter.mjs <NN-name>` لكل فصل ✔، و16 اختباراً ناجحاً، و444 تحميل صفحة في المتصفح (العربية والإنجليزية، 1440 داكن و390 فاتح) دون مشكلات، مع اختبار زر الفتح والبطاقات والإنجاز والبحث وتبديل اللغة والتنقل بين الخطوات.

## دليل أدوات البناء المستقل — 2026-10-20 — مسودة للمراجعة

- بطلب المستخدم صار الفصل 6 نظرة عامة تنتهي ببطاقات فصول «دليل أدوات البناء» وزر لفتحه، وصار الدليل المستقل `builder.html` بفصول مرقمة من 1: الكيانات، والتطبيقات والتنقل، والنماذج، والخدمات، والإجراءات الداخلية، وإجراءات التشغيل القياسية والبوتات، والمستندات والطباعة، ولوحات المعلومات والتقارير.
- نُقلت الصفحات الست والعشرون كما هي بأسمائها، فلا تنكسر الروابط القديمة. ولكل فصل نظرة عامة بمثال وبطاقات صفحاته.
- وُسّع فصل «الكيانات» من 11 إلى 20 صفحة باللغتين: منشئ الكيانات بالذكاء الاصطناعي ومخطط العلاقات، والمنشئ والنظرة العامة، وأنواع الحقول، ومصدر القيمة، وحقل الحالة ودورة الحياة، وكتل النظرة العامة والتخطيطات، والمؤشرات والعروض المحفوظة، والحدود وحراس المراجع والتوليد والنطاقات الزمنية، وصلاحيات الحقول. المصدر: الشيفرة وملفات الترجمة؛ تُحقق التسميات العربية في `entityBuilder.ar.ts` و`src/locales`.
- حدود التحقق: الصفحات التسع الجديدة بلا صور من test2 بعد، ولم تُجرَّب خطواتها على test2 (مصدرها الشيفرة فقط).
- نجح بناء HTML و16 اختباراً نشطاً. وفي المتصفح: صفحات الدليلين باللغتين وبعرضي 1440 و390 دون تمرير أفقي أو أخطاء، مع زر الفتح والبطاقات وحفظ الإنجاز المنفصل والبحث المشترك وتبديل اللغة. الأدلة: `review/builder-guide-browser-verification.json` و`review/html/builder-guide-*.png`.
- التالي (بانتظار المستخدم): صور مرقّمة للصفحات الجديدة، ثم توسيع فصل النماذج ثم بقية الفصول بالطريقة نفسها.

## آخر تحديث — الصور المرقّمة في كل الفصول — 2026-10-20

- اكتمل ترقيم صور الفصول 1–6 باللغتين: أرقام خضراء على الأزرار في كل صورة، ومفتاح مرقّم تحت كل صورة. أُعيد التقاط صور الفصول 1–5 من test2 بالمظهر الداكن كما كانت.
- صُحّح خللان في الالتقاط قبل الإدراج: نافذة «مشغّل التطبيقات» ونافذة «تغييرات غير محفوظة» كانتا تبقيان مفتوحتين فوق الصور التالية؛ صار السكربت يغلق النوافذ ويحذّر إن بقيت.
- صار اختبار «numbered screenshots» يشمل كل الصور في الدليل. نجحت 16 اختباراً نشطاً، و916 حالة متصفح (كل صفحات الدليل باللغتين وبعرضي 1440 و390) دون تمرير أفقي أو صور معطلة أو صورة بلا مفتاح أرقام.
- أدوات الالتقاط في `tools/capture/`: `capture2.mjs <shots-file> <ar|en> [names…]` و`addkeys.mjs <keys-file>`. تحتاج `playwright-core` ومتصفح Edge، ولا يُحفظ `state.json` في المستودع.

## آخر تحديث — أدوات البناء: الاختبار والصور المرقّمة — 2026-10-19

- اختبار عملي ناجح على test2: أُنشئ نوع السجلات الاختباري «Guide QA Visit requests» في تطبيق «متفرقات»، وأُضيف إليه حقل «تاريخ الزيارة» ونُشر «كإصدار 2»، وجُرّب «تجاهل المسودة». ثم أُنشئ سجل وأُعيد فتحه في جلسة مستقلة فظهرت قيمه محفوظة. وظهرت طريقة العرض «التقويم» بعد إضافة حقل التاريخ كما يشرح الدليل.
- ملاحظة محتملة على المنتج: ظهرت رسالة «شخص آخر غيّر هذه المسودة» في جلسة واحدة دون محرر آخر، وتوقف الحفظ حتى استُخدم «الاستبدال بنسختي».
- اكتُشف قسم «الاستيراد» الجديد في «المنشئ» فأُضيفت له صفحة باللغتين، فصار الفصل 26 صفحة.
- قاعدة جديدة بطلب المستخدم: كل صورة تحمل أرقاماً (①، ②، ③…) على الأزرار التي يستخدمها القارئ، وتحتها شرح للصورة ومفتاح لكل رقم، ويتبع مثال الأفق الأرقام نفسها. أُضيفت إلى AGENTS.md وREADME.md، والتُقطت 52 صورة مرقّمة (26 صفحة × لغتين) وأُدرجت مع شروحها، مع اختبار يتحقق من تطابق الأرقام.
- نجح البناء و14 اختباراً نشطاً، و216 حالة متصفح. التفاصيل في `review/builder-source-coverage.md`.

## تحديث سابق — أدوات البناء كاملة للمراجعة — 2026-10-19

- بطلب المستخدم أُكملت المراحل كلها: صار الفصل السادس نظرة عامة من ثلاث خطوات (ماذا ستنجز، وكيف تترابط الأدوات مع مخطط شامل وجدول كلمات مبسّط، ودليل صفحات في خمس مجموعات) و25 صفحة باللغتين. تبيّن كل بطاقة إن كانت الصفحة مستقلة أو قسماً داخل «المنشئ».
- الصفحات الجديدة: «القواعد»، «الصلاحيات»، «الإجراءات والأتمتة»، «الحركة»، «إعدادات متقدمة»، «التطبيقات والتنقل»، «التنقل حسب العمل»، «النماذج»، «الخدمات»، «الإجراءات الداخلية»، «إجراءات التشغيل القياسية»، «البوتات»، «قوالب DOCX»، «قوالب XLSX»، «قوالب الطباعة»، «الهويات والترويسات»، «لوحات المعلومات»، «الصفحات»، «لوحات معلومات الذكاء الاصطناعي»، «تقارير الذكاء الاصطناعي». لكل منها شرح ومثال الأفق وجدول ومخطط مشروح وخطوات وتحقق.
- نجح بناء HTML و13 اختباراً نشطاً. نجحت 208 حالات متصفح للصفحات الست والعشرين باللغتين وبعرضي 1440 و390 وبالمظهرين، مع البحث وفتح البطاقات وحفظ الإنجاز وتبديل اللغة. ولا تزال صور test2 والتجربة العملية للإنشاء والنشر غير منفذة؛ التفاصيل في `review/builder-source-coverage.md`.

## تحديث سابق — أدوات البناء، المرحلة الأولى للمراجعة — 2026-10-19

- طلب المستخدم إضافة أدوات البناء على مراحل بالتصميم والقواعد نفسها، ثم طلب كتابة المرحلة الأولى. أُضيف الفصل السادس بالعربية والإنجليزية: نظرة عامة وخمس صفحات هي «الكيانات» و«الحقول» و«صفحة السجل» و«القوائم وطرق العرض» و«المراجعة والنشر». لكل صفحة شرح عام ثم مثال شركة الأفق، وجدول محتوى، ومخطط مع شرحه، وخطوات وتحقق. وتربط النظرة العامة «قوالب الحالات» و«إعدادات المهام» بصفحاتهما في فصل المهام.
- المثال الجديد: نوع السجلات «طلبات الزيارة» في تطبيق «خدمات الفروع» برقم مثل `HZN-VR-0001`، يبنيه مسؤول النظام، ويرفع عمر الطلب، وتراجعه سارة.
- وُسّعت مسارات صفحات الدليل والاختبارات لتشمل `builder-*.html`، وأُضيف اختبار لصفحات الفصل. وأُصلح خلل في فهرس البحث كان يحفظ «&» بصيغة `&amp;`، فلا تطابقه عبارات مثل “Review & publish” وتظهر النتائج بنص مشوّه.
- نجح بناء HTML و13 اختباراً نشطاً مع تأجيل اختباري المطبوعات. نجحت 48 حالة متصفح لصفحات الفصل الست باللغتين وبعرضي 1440 و390 وبالمظهرين، دون تمرير أفقي أو أخطاء، مع فتح بطاقة صفحة وحفظ الإنجاز بعد التحديث ورابط تبديل اللغة والبحث بالعربية والإنجليزية. الأدلة: `review/builder-browser-verification.json` و`review/html/builder-*.png`.
- حدود التحقق: لا توجد بعد صور من test2 لهذا الفصل، ولم يُنشأ نوع سجلات أو يُنشر على test2؛ فخطوات الإنشاء والنشر مستندة إلى المصدر. التفاصيل والمراحل التالية في `review/builder-source-coverage.md`. لم تبدأ المرحلة الثانية، ولم تُعدّل مخرجات PDF أو Word أو Overleaf.

## تحديث سابق — مسودة المشاريع والتخطيط للمراجعة — 2026-10-18

- اعتمد المستخدم مخطط الفصل الخامس. أُضيفت نظرة عامة و82 صفحة شرح بالعربية والإنجليزية، مع الحفاظ على التصميم والأدوار ومثال شركة الأفق. تغطي ست صفحات المداخل الرئيسية، وتشرح البقية السجلات المرتبطة داخل سياقات العمل؛ ولا تُعرض بوصفها صفحات مستقلة في قائمة التطبيق.
- أُضيفت أمثلة منفصلة وخطوات وتحقق ومخططات تربط السجلات بسياقاتها، مع تمييز الروابط المطلوبة من الاختيارية. لا يعني طلب سياق تخطيط وجوب إنشاء خطة ومشروع وبرنامج ومحفظة معاً. وُثقت مصادر الحقول والتبويبات وشروط ظهورها في `review/projects-source-inventory.json`.
- التُقطت 18 صورة مستخدمة في الفصل: تسعة مشاهد متطابقة بالعربية والإنجليزية، تشمل مدخل التطبيق ونماذج الصفحات الرئيسية وتبويبات إعداد المشروع وفئة تكلفة محفوظة. روجعت الصور وشروحها، وحُفظت بيانات الالتقاط في `review/fullpage-manifest.json`.
- أُنشئت فئة التكلفة الاختبارية `GUIDE-QA-20261018` بالنوع «سفر»، ثم فُتحت في جلسة عربية مستقلة للتأكد من بقاء الرمز والاسم والنوع. بقي السجل في test2. لم تُرسَل رسائل أو طلبات إلى أشخاص، ولم تُنفّذ إجراءات اعتماد أو دفع.
- نجح بناء HTML و13 اختباراً نشطاً، مع تأجيل اختباري المطبوعات. نجحت 664 حالة متصفح: 83 صفحة لكل لغة، بعرضي 1440 و390 وبالمظهرين. شمل التحقق الروابط والبحث وحفظ التقدم وتبديل اللغة والتنقل من فصل المهام وفتح الصور. الأدلة في `review/projects-browser-verification.json` و`review/html/projects-final-*.png`.
- ما يزال مطلوباً استكمال صور السجلات المتخصصة والتبويبات المشروطة على سجلات مناسبة، واختبار مسارات الاعتماد والتنفيذ والقياس عملياً. شرح هذه المسارات مستند إلى المصدر، ولا يُعد متحققاً من البداية إلى النهاية. توضح التفاصيل `review/projects-source-coverage.md`. لم يبدأ التطبيق التالي، ولم تُعدّل مخرجات PDF أو Word أو Overleaf.

## تحديث سابق — فصل المهام قيد المراجعة — 2026-10-17

- بعد اعتماد المخطط، أُضيف الفصل الرابع بالعربية والإنجليزية: نظرة عامة وعشر صفحات مستقلة للدليل، مع التمييز بين صفحات التطبيق والتبويبات والنوافذ. لم يبدأ فصل المشاريع والتخطيط.
- لكل صفحة شرح عام ثم مثال منفصل لشركة الأفق، وخطوات وتحقق ومعالجة للمشكلات. أضيفت 46 لقطة واجهة موثقة من test2، و12 مخططاً لكل لغة، مع شرح تحت كل صورة ومخطط. الصور تعرض بيانات اختبار مستقلة عن الأفق.
- جرى توسيع مسارات صفحات الدليل والبحث والتنقل وحفظ التقدم وتبديل اللغة لدعم المهام. صُحح تعارض اسم «المجموعات» بين الموارد البشرية والمهام بربط بطاقات كل تطبيق بصفحاته وحدها. بقيت الروابط السابقة صالحة.
- نجح بناء HTML والاختبارات النشطة الاثنا عشر؛ اختبارا المطبوعات مؤجلان حسب توجيه العمل على الويب فقط. نجحت 88 حالة متصفح للصفحات الجديدة باللغتين وعلى الهاتف وسطح المكتب وبالمظهرين. شمل التحقق فتح الصور وإغلاقها والبحث والتنقل وحفظ التقدم وتبديل اللغة والانتقال من الموارد البشرية والروابط القديمة. وبعد ضبط التفاف عناوين المخططات، نجحت 44 مراجعة إضافية لتمرير المحتوى وحدود نصوص المخططات بالخطوط العادية.
- تحقق عملي على test2: إنشاء مهمة اختبار وفتحها بعد الحفظ، ثم تنفيذ «Start» وإعادة فتحها للتأكد من بقاء الحالة «In Progress». إنشاء مجموعة أظهر «Collection not available» عند فتحها مباشرة؛ ظهرت بطاقتها لاحقاً لكن الوصول إليها لم يُتحقق منه. لم تُرسل طلبات إلى أشخاص ولم تُعدّل إعدادات مشتركة. تفاصيل حدود الاختبار في `review/tasks-source-coverage.md`.
- أدلة المراجعة: `review/tasks-browser-verification.json`، `review/tasks-final-visual-verification.json`، `review/tasks-product-verification.json`. لقطات نهائية مفحوصة بصرياً: `review/html/tasks-overview-en-1440.png` و`review/html/tasks-flow-ar-390.png` و`review/html/tasks-model-en-1440.png`، مع بقية لقطات اللغتين والأحجام. لم تُعدّل مخرجات PDF أو Word أو Overleaf.

## التحديث الحالي: دليل مختصر ومرئي — 2026-10-14

- أُعيد تحرير الفصول الثلاثة بالعربية والإنجليزية: مقدمات أقصر، عناوين مباشرة، خطوات عملية، ووصف مختصر لكل صفحة. بقيت صفحات الموارد البشرية الـ21 وترتيب أهميتها وخطوات الحفظ والتحقق والاسترداد.
- زادت المخططات من 7 إلى 13 والصور من 3 إلى 5. أضيفت مخططات ليوم العمل والتنقل والاستيراد ومراجعة الحضور والإجازة وإعداد سلم الراتب. أُدرجت صورتا الصفحة الرئيسية ونموذج الوردية التجريبي من test2؛ وُضح أن النموذج غير محفوظ وأن صور الواجهة في النسخة الإنجليزية عربية.
- حُدثت قواعد الكتابة في AGENTS.md وREADME.md. صارت مخططات الخطوات ملائمة للهاتف دون تمرير أفقي، مع لفّ التسميات؛ تبقى أشجار العلاقات العريضة قابلة للتمرير لقراءة الفروع.
- نجح بناء HTML والاختبارات الخمسة الخاصة بالمصدر والمراجع والبنية والروابط والأصول. نجح اختبار Chrome للفصول الثلاثة في 24 تركيبة من اللغة والمظهر وحجم الشاشة، مع فتح الصور وتكبيرها وإغلاقها، وحفظ الإنجاز بعد التحديث، وتبديل اللغة إلى الخطوة نفسها، والبحث والتنقل وتغيير المظهر. الأدلة: `review/html/visual-verification.json` و`review/html/visual-*.png`؛ روجعت لقطات سطح المكتب والهاتف بصرياً.
- لم يُختبر أي إجراء جديد داخل test2؛ التغيير توثيقي والصور معاد استخدامها من التحقق السابق. تعذر بناء PDF وWord لعدم توفر محرك TeX قابل للتشغيل؛ الملفان المنشوران سابقاً لا يمثلان هذه المراجعة. الفصول قيد المراجعة، ولم تُضف فصول جديدة.

| # | الجزء | الملف | الحالة | ملاحظات |
| --- | --- | --- | --- | --- |
| 0 | عينة التصميم وإعدادات التنسيق | `design-sample.tex`, `preamble.tex` | معتمد | اعتُمدت 2026-10-13 مع الاختلافات الأربعة المقترحة |
| 1 | مقدمة سريعة | `chapters/01-introduction.tex` | قيد المراجعة | حُوّلت المخططات إلى أشجار رأسية وأُضيف شرح قراءتها 2026-10-13 |
| 2 | إنشاء المؤسسة والتهيئة الأولية | `chapters/02-organization-setup.tex` | قيد المراجعة | كُتب 2026-10-13؛ لم يُختبر إنشاء مؤسسة ولا شاشة الاستيراد عملياً |
| 3 | الموارد البشرية | `chapters/03-hr.tex` | قيد المراجعة | كُتب بإذن المستخدم بعد تحديث المخططات؛ يشمل الورديات والدوام والإجازات والرواتب |
| 4 | المهام | `chapters/04-tasks.tex` و`chapters/04-tasks-features.tex` | قيد المراجعة | نظرة عامة وعشر صفحات بكل لغة؛ تحقق الويب وقيود اختبار التطبيق موثقة في تحديث 2026-10-17 |
| 5 | المشاريع والتخطيط | — | لم يبدأ | |
| 6 | التطبيقات الأخرى (فصل لكل تطبيق) | — | لم يبدأ | |
| 7 | سيناريوهات مترابطة | — | لم يبدأ | |
| 8 | قوائم التحقق والمراجع | — | لم يبدأ | |
| أ | ملحق مراجع المصادر التقنية | `references/sources.tex` | مرجع داخلي فقط | أُزيل من مخرجات الدليل العربية والإنجليزية بطلب المستخدم 2026-10-14 |

## الدليل بصيغة HTML — 2026-10-14

طلب المستخدم التركيز على نسخة HTML حديثة بهوية موقع KayanOS (kayanos.com) وليس هوية RightCode،
بلغتين كالموقع (العربية والإنجليزية)، في صفحة واحدة على شكل خطوات مع انتقالات وتنقّل مباشر إلى الأقسام.
تبقى قواعد PDF وWord وLaTeX كما هي.

| الجزء | الملف | الحالة |
| --- | --- | --- |
| قالب الصفحة والهوية | `web/guide.css`, `web/guide.js`, `tools/html-render.mjs` | قيد المراجعة |
| المخططات بصيغة SVG | `tools/html-diagram.mjs` | قيد المراجعة |
| الترجمة الإنجليزية للفصول 1–3 والملحق | `i18n/en/` | مسودة — تتبع حالة الفصل العربي |

- البناء: `cd tools && npm run html` ينتج `site/ar/` و`site/en/`. المعاينة: `npm run dev`.
- 2026-10-14 (لاحقاً): بطلب المستخدم صار لكل فصل صفحة مستقلة (`c1.html` … `c4.html`) مع صفحة رئيسية، وتبويبات الفصول، وبطاقتي الفصل السابق والتالي. ينتقل متصفح الخطوات و`[` `]` بين الصفحات عند طرفي الفصل، ويبحث Ctrl+K في الدليل كله، وتُحوَّل الروابط القديمة `index.html#c2-s4` إلى صفحة الفصل. نجح 13 فحصاً تفاعلياً في Chrome والاختبارات السبعة.
- نجحت الاختبارات السبعة (5 سابقة + تطابق بنية الترجمة + الروابط والمخططات والأصول في الصفحتين).
  لم يُعَد بناء PDF وWord في هذه الجلسة (لا يوجد محرك TeX محلياً)؛ ناتج المحلل العربي بقي مطابقاً بايتاً بايتاً.
- تحقق في Chrome على 1440×900 و390×844، بالمظهرين الداكن والفاتح وباللغتين: لقطات في `review/html/`.
  نجحت ثماني تفاعلات ثلاث مرات متتالية: الانتقال بـ `]`، حفظ المظهر، بقاء قائمة التحقق بعد إعادة التحميل،
  تبديل اللغة إلى الخطوة نفسها، مشاركة التقدّم بين اللغتين، البحث Ctrl+K، فتح اللغة المحفوظة من الصفحة الجذرية.
- تسميات إنجليزية لم تُثبت بالكامل من ملفات اللغة: «مقعد كامل» = Full seat (موجودة في لوحة المنصة فقط)،
  دور «المدير» = Administrator (من إعداد الأدوار)، قاعدة الأعمدة التي تبدأ بـ Active (الأمثلة مثبتة).
  في الواجهة الإنجليزية تُسمّى الوحدات التنظيمية Nodes، وتطبيق الموارد البشرية HR.

## تحديث الإصدار 0.3 — دليل عملي للمبتدئ في كيان

- أعيدت كتابة المقدمة حول مشكلات العمل وما يقدمه كيان والنتيجة المتوقعة، مع قصة شركة الأفق وبداية مناسبة لكل دور.
- حُدّث فصل التهيئة بخطوات إنشاء القسم والمنصب والعضو والتعيين، ومدخلات مثال واضحة وحفظ وتحقق.
- حُدّث فصل الموارد البشرية بمسارات عملية للوردية وربطها بالموظف، ومراجعة الدوام، والإجازات، ومسودة القسيمة واحتسابها واعتمادها ثم توليد الكشف.
- ثُبتت قواعد الجمهور غير التقني، والمشكلة والفائدة قبل المصطلحات، والخطوات القابلة للتنفيذ في `AGENTS.md` و`README.md`. الفصول الثلاثة قيد المراجعة.
- نجح بناء PDF وWord والاختبارات الخمسة. روجعت الصفحات المصورة في `review/business-final-pdf/` و`review/business-final-word/`، وعولجت صفحات التتمة القصيرة في Word بتبسيط النص.
- تحقق حي إضافي على test2: فتح نافذة «إنشاء قسائم رواتب» وظهور حقل نهاية الفترة ورسالة اختياره أولاً. لم تُنشأ بيانات جديدة. خطوات الحفظ والاحتساب والاعتماد والتوليد موثقة من المصدر ولم تُختبر كاملة؛ توضح هذه الحدود في ملحق المصادر. لا يتطلب تعديل التوثيق تغيير التطبيق أو اختبار جميع معاملاته.
- أُعيد تجهيز حزمة Overleaf بمصادر الإصدار 0.3. لا يشمل هذا العمل فصل المهام.

## سجل القرارات

- 2026-10-14: بطلب المستخدم، أضيف إلى فصل الموارد البشرية بالعربية والإنجليزية دليل كامل للصفحات حسب أهمية الاستخدام: 6 للأشخاص والهيكل، 9 للوقت، و6 لإعداد الرواتب والدفع. شمل الوحدات التنظيمية والنقاط الجغرافية والصفحات المقدمة في تهيئة المؤسسة، مع وصف الغرض والمستخدم والنتيجة ومسار القسم لكل صفحة. أضيف مخطط علاقات التعيين والعضو والمنصب والقسم والموقع، ومخطط مستقل لمسار مراجعة الرواتب. بقيت خطوات الفصل وروابطها الحالية، ولم يبدأ فصل المهام. حدثت قواعد AGENTS.md وREADME.md لتلزم كل فصل تطبيق لاحق بهذه التغطية والمخططات.
- تحقق هذا التحديث: نجح بناء HTML ونجحت الاختبارات الخمسة الخاصة بالمصدر والروابط والمخططات وتطابق البنية بين اللغتين. فشل البناء الكامل لعدم توفر محرك TeX قابل للتشغيل؛ نسختا PDF وWord لم تحدثا. عدل اختبار عدد صور Word ليتطلب المخططات الجديدة، ولذلك لا تعد النسخة القديمة ناجحة لهذا التحديث. تعذر الفحص البصري: أعاد Chrome وEdge الخطأ ERR_ABORTED عند التنقل إلى الدليل المحلي، ولم تؤخذ لقطات جديدة. لا يحتاج تعديل التوثيق إلى إنشاء بيانات على test2؛ وصف الصفحات الجديدة وعلاقاتها متحقق من المصدر فقط. الفصل ما زال قيد المراجعة.

- 2026-10-14: طلب المستخدم التركيز على دليل HTML حديث بهوية موقع KayanOS (ألوانه وخطوطه)، بالعربية والإنجليزية كالموقع، في صفحة واحدة بخطوات وانتقالات وتنقل مباشر. العربية هي المصدر الأساسي، والإنجليزية في `i18n/en/` ببنية مطابقة. تبقى قواعد PDF وWord وLaTeX دون تغيير.

- 2026-10-13: طلب المستخدم اعتماد المخططات الرأسية وتحسين دعم العربية، وأذن بكتابة فصل الموارد البشرية بعد تحديث الفصلين السابقين. الإذن لا يشمل الانتقال إلى فصل المهام.
- 2026-10-13: أُضيفت القواعد إلى `AGENTS.md` و`README.md`: قراءة من الأعلى للأسفل، فروع من اليمين لليسار، شرح عربي، وأسهم مختلفة للاعتماد الإلزامي والربط الاختياري وتسلسل الخطوات.
- 2026-10-13: أُضيفت لغة عربية للنص المركب في Word ودعم فواصل الصفحات الصريحة في المحوّل. روجع اختلاف قالب استيراد الورديات عن نموذج الإدخال اليدوي ووُضّح في الفصل الثالث.

- 2026-10-13: البناء بمحرك XeTeX عبر Tectonic (لا يوجد TeX Live مثبت، وDocker لم يعمل). المشروع متوافق مع `xelatex` العادي.
- 2026-10-13: اعتماد التصميم: أحجام العناوين 24/18/14، خط Noto Naskh Bold لعنوان الغلاف، جداول بأسلوب RightCode، ترويسة «دليل KayanOS / اسم الفصل».
- 2026-10-13: المؤسسة الوهمية الموحّدة: «شركة الأفق للخدمات»، الرمز `HZN`، النطاق `hzn`.
- 2026-10-13: الورديات: يذكر الفصل 2 موقعها في ترتيب التهيئة فقط، ويشرحها فصل الموارد البشرية.
- 2026-10-13: تصحيح تقني في التصميم دون تغيير الهوية: أرقام الأقسام والجداول بخط Lora واتجاه LTR (كانت تظهر معكوسة)، والعلامة المائية صورة مخففة مسبقاً بنسبة 40%.
- 2026-10-13: طلب المستخدم تبسيط الدليل واختصاره: فقرات قصيرة، جداول بسيطة، دون تفاصيل تقنية في المتن.
- 2026-10-13: كل بناء يُخرج نسختين: `kayanos-guide.pdf` و`kayanos-guide.docx` (طلب المستخدم). الأمر: `cd tools && node build.mjs`. نسخة Word تُولَّد من مصادر LaTeX نفسها، والمخططات تتحول إلى صور تلقائياً.

## تحقق الإصدار 0.2 — 2026-10-13

- بُنيت نسختا PDF وWord بنجاح؛ 23 صفحة لكل منهما، منها 6 صفحات للموارد البشرية. يختلف ترقيم PDF الداخلي لأنه يستثني الغلاف.
- نجحت الاختبارات الخمسة في `tools/guide.test.mjs`: فواصل الصفحات، اتجاه النص العربي والأوقات، المراجع والمخططات، محتوى Word ولغته، وسلامة سجل بناء PDF. لا تحذيرات تجاوز حدود أو محارف مفقودة أو مراجع غير محلولة.
- حُوّل Word إلى PDF عبر LibreOffice، ورُوجعت جميع الصفحات المصورة في `review/final-pdf/` و`review/final-word/`، مع تكبير صفحة مخطط وراثة الوردية في النسختين.
- تحقّق فعلي على test2: نموذج الوردية بالعربية، خمسة أيام عمل، دوام من `09:00` إلى `17:00` واستراحة من `13:00` إلى `13:30`؛ الإجمالي الظاهر `07:30`. اللقطة: `figures/screens/ch03-shift-example.png`، ببيانات وهمية ودون بيانات شخصية.
- لم يُحفظ سجل الوردية، ولم تُختبر الوراثة أو استيراد الورديات أو اعتماد الإجازات أو حساب الرواتب وصرفها عملياً. هذه التفاصيل مستندة إلى المصدر كما يوضح الملحق. لم يتغير كود التطبيق، لذا اقتصر الاختبار الحي على سلوك النموذج المشروح.
- أُعيد تجهيز `kayanos-guide-overleaf.zip` بمصادر الإصدار الحالي. الفصل الثالث قيد المراجعة؛ فصل المهام لم يبدأ.

## Clear screenshots update — 2026-10-14

- Updated all three existing chapters in Arabic and English: 14 screenshots (previously 5), plus 13 diagrams. Replaced all three referenced masked screenshots with fresh clear captures. No blur or masking in the current guide images.
- Captured test2 workspace/app menus, HR page cards, blank location/node/position/member/assignment forms, leave type/leave/payroll input forms, and the salary-slip dialog at 2× resolution. Forms were not saved; the slip dialog was cancelled.
- Shortened role/page descriptions and captions; retained the 21 native HR pages and required actions. Updated node requirements and leave dates to match visible forms. Noted customized navigation in the source appendix.
- Updated AGENTS.md and README.md: more clear images, fewer words, short captions, blank/sample forms and full-size viewing for current/future chapters. Mobile screenshots use the available width.
- Verification: HTML build passed; 5 focused tests passed. Real browser verification passed all 24 language/viewport/theme/chapter combinations, every screenshot lightbox, per-step overflow, search, progress persistence and language navigation. Visual evidence: review/html/clear-images-desktop.png and clear-images-mobile.png.
- Documentation-only change: no application behavior changed. Live checks covered forms and navigation, not saving records or running payroll. PDF/Word remain outdated because the local TeX engine is unavailable; their tests and visual validation were not claimed.

## Dedicated feature-page rule — 2026-10-15

- Added the user's new authoring rule to AGENTS.md and README.md: each user-facing feature/model gets a dedicated guide page, with screenshots, diagrams and concise explanations of its meaning, use and practical value. Nodes is the example.
- Applies to both languages; retains concise overview tables and all existing accuracy and visual rules. Supersedes the one-page-per-chapter HTML limit when the split is implemented.
- Rule recorded only; dedicated pages and navigation changes are not yet implemented. Documentation-only verification: reviewed the instructions for consistency; no application or UI test is needed.

## HR page overviews — 2026-10-15
- Replaced the second column in all three HR page tables with concise explanations of what each page offers, in Arabic and English (21 pages).
- Rebuilt HTML; focused output checks passed for both languages, all rows and new headings.
- Existing guide tests fail on chapter-one language structure differences and diagram counts (11 versus 13), outside this copy edit.
- Browser verification blocked: local headless Chrome exits with GPU process failure. PDF/Word rebuild blocked by unavailable TeX tools. No screenshots or PDF/Word validation claimed.
- Documentation-only edit; no test2 application interaction was needed.

## Dedicated HR feature pages implemented — 2026-10-15

- Chapter 3 remains under review. Added 21 standalone HTML feature pages per language, sourced from Arabic and English `chapters/03-hr-features.tex`. Each includes a definition, practical value, navigation, a screenshot, a three-step diagram, actions and a result check. The same LaTeX sources start each feature on a new PDF/Word page.
- HR overview table names now link to their feature pages. Added explicit routes for feature sections, figures and subheadings; updated search, progress, language switching, chapter navigation and resume. Original HR section/figure anchors are preserved.
- Added 11 clear 2× screenshots from authorized test2: groups, seniority, experience groups, salary scale, personal attendance summary, timesheet filters, holiday groups, correction filters, policies, terminals and payroll filters. Existing verified form screenshots cover the other 10 pages. New forms were not saved; no payroll, policy, membership or attendance records were changed. Captures exclude unrelated personal rows using framing, without masking or reconstructed UI.
- Sources reviewed: `src/utils/sidebarItems.tsx`, `src/components/Entities/nativeEntityPages/hrPages.tsx`, `docs/ar/government-operations/salary-scale.mdx`, `src/components/Time/AttendanceTerminals/AttendanceTerminalsList.tsx`, `src/components/Time/AttendancePolicy/AttendancePolicyPage.tsx`, `src/components/Time/AttendanceCorrections/CorrectionFooter.tsx`, and UI translations. Existing source-backed walkthroughs supply the shared examples. Confirmed the live Create payroll label, experience-group structure and attendance-network setup; examples remain illustrative.
- Verification: HTML build and five focused automated tests passed (references, direction, all generated links/assets, HR language parity, feature routing/media/overview coverage). Real-browser checks passed all 168 language/viewport/theme combinations: 21 features × 2 languages × 2 sizes × 2 themes, including screenshot enlargement and diagram clipping/overflow checks. English desktop used normal font loading; remaining combinations also checked fallback fonts. Final Nodes screenshots in both languages and sizes were captured with normal font loading and visually inspected.
- Interaction checks passed: overview → Nodes, search → Nodes, progress retained through language switching, next/previous feature navigation, existing HR walkthrough anchors, redirected legacy home anchors, and home resume. Fixed preview reload streams surviving navigation; eight consecutive preview-page image loads now completed in 225–239 ms rather than stalling after several page changes.
- Evidence: `review/html/hr-final-nodes-en-desktop.png`, `review/html/hr-final-nodes-ar-mobile-diagram.png`, plus corresponding language/viewport screenshots. New source screenshot contact sheet: `review/html/hr-new-screens-contact.png`.
- Remaining limits: the full-guide structural-parity test still fails on the existing chapter-one Arabic/English differences; dedicated HR parity passes. PDF build attempted but `tectonic` is unavailable (ENOENT); PDF/Word and the Overleaf archive have not been rebuilt or visually verified. No application save/calculation/payment behavior is claimed as tested by this documentation change.

## HR overview and complete page coverage — 2026-10-15

- User feedback: the HR chapter page repeated itself (intro → page table → walkthrough steps → the same topics on the pages), and pages showed only basic info (Members showed a basic form though the record holds much more).
- c3.html is now a directory: "What you will achieve" (result, roles, model diagram) and "HR pages" (screenshot, order, one line on shared list features, 21 numbered page buttons in three priority groups), then "Start with the pages → Members" and the next chapter (none yet). The nine walkthrough steps moved to their pages: shift creation and inheritance → Shifts; day review → My attendance; leave flow → Leaves; scale setup → Salary Scale; slip steps and the review-path diagram → Salary Slips; payroll steps and warning → Payrolls. The checklist and error table were folded into each page's check line. Duplicate screenshots removed.
- Each of the 21 pages (Arabic and English) now has a "What do you record?" table covering every tab/section/sub-record and, where relevant, "What can you do?". Corrections from the source: payroll inputs have no separate approval (removed 2026-10-01); leave balances come from balance rules; payroll approval only changes status; no manual terminal sync.
- Navigation: page cards, prev/next page pager on feature pages, home cards link straight to pages, and old anchors c3-s3…s11 redirect (LEGACY map). Tests updated for the new overview.
- Verification: HTML build passed; 6 of 8 tests pass. The two failures were already known: chapter-one Arabic/English structure (the HR chapter matches, 186 blocks each), and the Word test against the stale .docx (no TeX engine; PDF/Word not rebuilt). Browser (headless Chrome via the local dev server): overview checked in both languages × desktop/mobile × dark/light (21 cards, 2 steps, start button, no page overflow); card click, four legacy redirects, Members/Payrolls pagers, and Members/Shifts pages without overflow passed. Screenshots: review/html/hr-overview-*.png, hr-members-*.png. The overview model diagram scrolls horizontally inside its card on phones (unchanged diagram).
- Not done: new test2 screenshots of full record tabs. The browser could not resolve test2 from this session and relaunching it with a DNS mapping was refused by the permission check. Page contents are source-backed only (see the appendix). Note: a running dev server (serve-html.mjs) loads tools/*.mjs once; restart it after renderer changes, or it overwrites site/ with the old renderer.

## Full-page screenshots and Arabic editing — 2026-10-15

- Revised the existing Arabic chapters for clearer sentences, consistent terminology, quoted UI paths, spelling and punctuation; aligned the English introduction with the Arabic master. No new app chapter was started.
- Replaced all referenced screenshots with 96 new full-page test2 captures: 48 per interface language, at 2×, including internal scrolling content. Added 15 distinct demo-member tabs and the available orientation, location-details/rooms, group-members and leave-rule form tabs. Each screenshot has provenance in review/fullpage-manifest.json. Removed the rejected Findings capture from the guide because it redirected to Overview.
- Screenshots show the actual test2 state, including empty specialist pages and unsaved forms. No forms were saved and no salary calculation, approval, payment or device integration was exercised. Demo employee data is separate from the fictional Horizon example. Existing workflow claims remain source-backed unless prior live verification is explicitly documented.
- Enlarged images now scroll vertically; every screenshot has an original-image link. Preserved the retired English introduction links through redirects. Updated README instructions and the capture-evidence appendix.
- Validation: seven focused source/HTML tests passed, including language parity, links, assets, screenshot language/provenance/pixel dimensions and distinct member tabs. Real browser checks passed 200 combinations (25 pages × 2 languages × 2 viewports × 2 themes). Full-page image scrolling, progress persistence, overview links, language switching, search and legacy-link navigation passed. Layout sweep used fallback fonts; final evidence used normal font loading.
- Visual evidence: review/html/fullpage-hr-nodes-{ar,en}-{desktop,mobile}.png and fullpage-hr-members-ar-{desktop,mobile}.png. Inspected Arabic desktop/mobile and English desktop; corrected the long English Nodes diagram label with a line break.
- PDF/Word rebuild attempted but blocked: tectonic is absent (ENOENT). Existing PDF/Word remain stale; the full test suite still fails its Word image-count check. Old PDF logs do not verify the current revision. The Overleaf source archive is refreshed separately, without claiming a compiled PDF. Chapters remain under review.

## An explanation under every image — 2026-10-15/16

- User rule (all chapters, both languages): image → its explanation → next image → its explanation; never text first and then a run of images. Recorded in AGENTS.md, README authoring rules and enforced by the test "every figure has an explanation under it".
- New macro `\shotnote{...}` inside each figure (after `\caption`/`\label`), rendered under the image in PDF (small text), Word (paragraph after the caption) and HTML (`.fig-note` box). Taught to latex-parse, html-render, docx-render; the parity test also compares notes.
- Wrote 80 notes × 2 languages (53 screenshots, 27 diagrams) in chapters 1–3, each from the actual ar/en screenshots or the TikZ source. Six paragraphs that only restated a figure were folded into its note (intro workday, HR model, shift order — both languages). One untested claim (group member names) softened to what the screen shows.
- PDF fix: the tall full-page screenshots overflowed the page (5 Overfull \vbox, present with or without notes). Screenshots are now capped at 0.72\textheight (keepaspectratio); Word uses the same cap. "²" replaced by words (missing in Noto Naskh).
- Verification: full build (Tectonic) with no errors; 10/10 tests pass; PDF pages and the Word→PDF (LibreOffice) render checked; HTML checked in a browser (ar desktop dark, ar c2 light, en mobile light, ar locations mobile dark): every figure has its note. Screenshots: review/html/notes-*.png.
- Open label questions found while writing notes (guide text vs. screen): «النقاط الجغرافية» vs screen «المواقع»; «المستويات الوظيفية» vs «مستويات الأقدمية»; «الوحدة الأم» vs field «يتبع ل»; slip statuses «محسوبة/معتمدة» vs «محسوب/موافق عليه»; «الوحدات النشطة» vs «العقد النشطة»; duplicate images: leave-types tab1 = main screen, groups tab1 = main screen.
# 2026-10-16 — Shared conventions and web-only updates

- Added one bilingual, collapsible home-page help panel for required-field stars,
  diagram direction/arrow meanings, work status and saved reading progress. Every
  guide page links to it; following the link reopens a collapsed panel.
- Removed repeated reading instructions and arrow legends from individual figures
  and shortened generic form wording, preserving specific actions and figure notes.
- Updated AGENTS.md and README.md: web-only work supersedes legacy print rules;
  every screenshot needs a short, specific explanation directly underneath.
  Default build now generates HTML only. Existing print outputs are archival.
- Verification: HTML build passed; 9 source/web tests passed, 2 archived print
  checks skipped. Real Chrome checks passed in Arabic/English, 1440×900 and
  390×844, dark/light: help navigation, collapse/reopen, no horizontal overflow,
  and notes below screenshots/diagrams. Inspected captured screenshots in
  `review/html/`; final viewport evidence: `conventions-ar-390.png` and
  `conventions-en-1440.png`. Browser checks used the local guide at port 4336;
  no application behavior changed, so no test2 interaction was needed.

# 2026-10-16 — Explanation first, Horizon example second

- Added the bilingual editorial rule to AGENTS.md and README.md: concise general
  explanation first, then a separate labelled Horizon example. Prioritize clear,
  natural Arabic; keep fictional data out of definitions and screenshot notes.
- Applied it to the introduction, setup and HR: separate setup callouts, general
  feature descriptions and diagrams, and explicitly labelled worked examples for
  members, positions, assignments, units, locations, groups, shifts, leaves and pay.
  Existing page routes and section IDs are preserved.
- HTML/source checks: 9 passed; 2 archived print checks skipped. Local Chrome
  verification covered Arabic/English desktop/mobile, visible example callouts,
  example deep links and language switching (which keeps the current step).
  Screenshots: `review/html/explanation-example-{ar,en}-{390,1440}.png`.
  No product behavior changed; verification used the local web guide, not test2.
- Mobile review exposed cramped chapter-header branding; hide the wordmark on
  narrow chapter pages while retaining the logo and navigation controls.

# 2026-10-16 — Horizon example on every HR page

- Added a concise, separate Horizon example immediately after the explanation
  on all 21 HR feature pages and the overview, in Arabic and English. Examples
  connect each feature to the same fictional company, people and workflow.
- Updated AGENTS.md and README.md to require this coverage on every page,
  including future authorized app pages; a heading or link alone is insufficient.
- Added a regression check for all 44 rendered language/page combinations.
  HTML build passed; 10 web/source checks passed, 2 archived print checks skipped.
- Local Chrome verification passed on all 22 Arabic pages at mobile width and
  all 22 English pages at desktop width: visible examples, no horizontal overflow,
  and translated example preserved on language switch. Inspected screenshots:
  `review/html/all-examples-ar-hr-my-attendance.png` and
  `review/html/all-examples-en-hr-attendance-policy.png`.
  This was guide-only verification; no test2 application behavior changed.


## 2026-10-17 — Remove empty height from introductory figures

- Added the standing rule to fit screenshot/diagram bounds to meaningful content,
  superseding older instructions to retain empty full-page margins.
- Figures 1.2 and 1.4: trimmed only the blank bottom area in both languages,
  from 2880×8876 to 2880×3228; retained pixels verified identical to originals.
  Capture manifest preserves original dimensions and records the trim separately.
- Figure 1.3: reduced flow connector gaps from 46 to 24 pixels; the shared flow
  layout now uses compact spacing without shrinking labels or changing tree layouts.
- HTML build and all 10 active source/web checks passed (2 archived print checks
  skipped). Real local Chrome checks passed in Arabic/English at 1440×900 and
  390×844, dark/light: all three figures, screenshot zoom/close and no overflow.
  Visual evidence: review/html/figure-1-{2,3,4}-{ar,en}-{1440,390}.png.
- Documentation-only changes: local guide verification was appropriate; no
  application behavior or test2 data changed. PDF/Word outputs were not rebuilt.

## 2026-10-17 — Focus Chapter 2 on organization setup

- Removed former sections 2.5–2.7 (HR data order, first employee walkthrough and
  example dataset) from both languages. HR feature pages remain unchanged and
  are the destination for these detailed explanations.
- Aligned the opening result, three-step diagram, preparation, completion checks
  and troubleshooting with organization creation and settings. New 2.5–2.7 are
  setup verification, setup problems and a concise linked handoff to HR.
- Kept existing setup/check/settings anchors stable while displaying sequential
  section numbers. Old HR-topic and figure anchors redirect to the appropriate
  existing HR pages; redirects also work on same-page hash changes.
- HTML build and 11 active automated checks passed; 2 archived print tests skipped.
  Real local Chrome verification passed for Arabic/English, desktop/mobile,
  dark/light: HR links, checklist persistence, language switch, numbering,
  overflow and old topic/figure redirects. Screenshots inspected:
  review/html/chapter2-handoff-detail-en.png and chapter2-handoff-detail-ar.png.
- Documentation-only task: verified the local guide; no test2 product changes or
  application-flow test was needed. PDF/Word outputs were not rebuilt.

## 2026-10-17 — Arabic editorial rewrite and figure explanations

- Rewrote the Arabic prose of chapters 1–4, all 21 HR and 10 Tasks feature pages
  and the appendix in professional Modern Standard Arabic: telegraphic fragments
  became complete connected sentences; grammar, punctuation and terminology were
  unified (المؤسسة، العضو/الموظف، المنصب، اضغط، سلم الراتب، المهام الكبرى).
- Rewrote all 109 figure notes (Arabic and English) to explain what each figure
  represents, why it matters and what to take from it, instead of positional
  descriptions. Every screenshot was opened before its note was written.
- UI-label corrections verified in locales/seeds: «البصمة اليدوية»، «موافق عليه»
  (approved slip), «يُعفي من التأخير»، «الكود» (shift), «جميع المهام»، «الفئة/الفئات»،
  «الحد الأدنى للراتب»; payroll-input dates all required; appendix corruption
  (`\textbf`, `\en{`) repaired. No structure, anchors or figure order changed.
- Added "Arabic writing and documentation quality" to AGENTS.md (and a pointer in
  README.md and the repository root AGENTS.md).
- HTML build and 12 active checks passed (2 archived print checks skipped). Local
  Edge check of all 70 pages × 2 widths: every image/diagram has its note, no
  overflow, lightbox works. Evidence: review/html/arabic-quality-*.png.
- Open: ch02-create-org capture shows no fields; ch04-statuses capture repeats its
  header; ch04-assignments is very tall; two leave-type images are identical; the
  Arabic UI mixes «المشاريع»/«ملحمة» for epics and spells «ادوات البناء».
# 2026-10-22 — Chapter navigation UI

Replaced the cramped chapter tabs with a keyboard-accessible chapter picker in the shared HTML renderer. The collapsed control shows the current chapter and the expanded grid shows full titles, numbered cards and the current chapter state. Mobile uses a single column. Applies to Arabic, English, Builder and the industrial observatory guide; chapter content and approval states are unchanged.

Verification: HTML builds passed. KayanOS tests: 17 passed, 2 archived checks skipped. Observatory tests: 3 passed. `node kayanos-guide/tools/verify-chapter-picker.mjs` passed 16 local Edge combinations covering both themes, desktop/mobile, Arabic/English and Builder: keyboard opening, visible full labels, navigation, progress persistence, search and overflow. Desktop and mobile screenshots were visually inspected in `review/html/chapter-picker/`. The first concurrent test run encountered generated files being rebuilt; sequential reruns passed. No product workflows or deployment were tested in this guide-only change.

# 2026-10-22 — Help dialog

Moved shared help from the home-page panel into a native modal on every page, including Builder and the observatory guide. The navbar now uses an icon button with a desktop label and an accessible mobile name. Three explanation cards retain the required-field guidance, diagram legend and reading-progress guidance. Escape, backdrop and close buttons dismiss the dialog; focus and reading position return. Old `#guide-help` links open the dialog. Horizontal clipping now preserves sticky navbar behavior.

Verification: both HTML builds succeeded; KayanOS tests passed 17 checks (2 archived checks skipped), observatory tests passed 3. `node kayanos-guide/tools/verify-help-dialog.mjs` passed 16 local Edge combinations covering no navigation, scroll restoration, scrolling back to the top, focus containment and return, all dismissal paths, old links and mobile overflow. Desktop/mobile screenshots inspected in `review/html/help-dialog/`. No application workflow or deployment was involved.


# 2026-10-29 — Chapter sections and reader navigation

Added a three-level chapter → section → page tree to the shared web renderer. Sections come from the existing bilingual page-directory captions, with overview steps grouped separately. Every page appears once, existing routes and progress IDs are preserved, and the active page opens its containing section. All chapters can be expanded without navigating away; long chapter lists no longer have a fixed height that could hide their final pages. Feature pages show their section beside the chapter label.

Refreshed the toolbar and contents panel with quieter controls, a clearer search field, section counts, nested disclosure controls and highlighted current pages. Kept the KayanOS palette, both themes, RTL/LTR and responsive mobile drawer.

Verification: HTML build succeeded; 18 automated checks passed, with 2 archived print checks skipped. The local Edge verification script `tools/verify-section-navigation.mjs` exercises 8 language/viewport/theme combinations, including section navigation, active ancestors, Projects and Builder's last pages, saved completion, search, language switching and overflow. Screenshots are in `review/html/section-navigation/`. This is guide-only work, verified on the local guide preview under this directory's instructions; no product environment or deployment changed.
