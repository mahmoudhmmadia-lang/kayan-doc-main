# Chapter 7, stage 4: integration notes

Stage 4, "Registry and distribution". Files: `chapters/07-correspondence-s4.tex`, `i18n/en/chapters/07-correspondence-s4.tex`, `tools/capture/shots-ch07-s4.mjs`, `review/manifest-ch07-s4.json`, 32 images `figures/screens/ch07-{registry,incoming,paper-intake,outgoing,batches,circulars}*-{ar,en}.png`.

Source of truth: the production copy at commit `e8db3c79b0` (the coordinator's scratchpad `prod-src`), not the local checkout, which is 1672 commits behind. Everything first read locally was re-checked against it. Live test2 wins where the two differ; see "Mismatches".

## Directory rows

Pages opened inside «ديوان الهيئة» have no sidebar entry of their own, so they carry no section.

### Arabic

| Page — Section | ماذا تقدم هذه الصفحة؟ |
| --- | --- |
| ديوان الهيئة — المراسلات | قوائم الانتظار والسجلات المرقّمة والمؤشرات ومحضر الإقفال اليومي لموظفي الديوان. |
| قيد الوارد والترقيم | قيد كتاب خارجي، وأخذ رقمه من سلسلة الوارد، وتوزيعه على المناصب والوحدات. |
| قيد ورقي — المراسلات | إدخال كتاب ورقي من صورته يدوياً أو بالمسح الضوئي، ليبقى دون رقم حتى يراجعه الموظف. |
| الصادر: الترقيم والإرسال والتسليم | الفرق بين الإصدار والإرسال والتسليم، وتسجيل الإرسال أو رفضه، وتصحيح القيد وإلغاؤه. |
| حقائب الإرسال ومتابعة التسليم — المراسلات | تجميع الصادر بقناة واحدة، وفحص أهليته، وإرساله، ومتابعة تسليم كل بند. |
| التعاميم والإقرار بالاطلاع — التنسيق | قراءة التعاميم الموجّهة إليك والإقرار بالاطلاع عليها ومعرفة نسبة الإقرار. |

### English

| Page — Section | What this page offers |
| --- | --- |
| The registry office — Correspondence | The queues, numbered registers, indicators and daily closing report for registry clerks. |
| Registering incoming letters and numbering | Record an outside letter, number it from the incoming series and distribute it to positions and units. |
| Paper intake — Correspondence | Enter a paper letter from its scan, by hand or by scanning, so it waits unnumbered until a clerk reviews it. |
| Outgoing letters: numbering, dispatch and delivery | The difference between issuing, dispatch and delivery; recording or refusing dispatch; correcting and voiding entries. |
| Dispatch batches and delivery tracking — Correspondence | Group outgoing letters by channel, check them, send them and follow each item's delivery. |
| Circulars and read acknowledgement — Coordination | Read the circulars addressed to you, acknowledge them and see the acknowledgement rate. |

## Chapter at a glance idea

For `tools/chapter-overviews.mjs`, in the form `[title, idea, Horizon example, target label, optional Kayan path]`:

```js
// en
['Tell issuing, dispatch and delivery apart', 'Issuing numbers the letter, dispatch records that it left, and delivery documents the hand-over.', 'The Aleppo Branch visit request takes HZN/2026/0012 at signature, then Horizon’s registry clerk records its paper dispatch.', 'sec:correspondence-feature-outgoing-dispatch', 'Official Correspondence › Correspondence › Registry office']
// ar
['ميّز الإصدار من الإرسال والتسليم', 'الإصدار يعطي الكتاب رقمه، والإرسال يسجل خروجه، والتسليم يوثق وصوله باليد.', 'يأخذ طلب زيارة فرع حلب الرقم HZN/2026/0012 عند التوقيع، ثم يسجل موظف ديوان الأفق إرساله ورقياً.', 'sec:correspondence-feature-outgoing-dispatch', 'المراسلات الرسمية › المراسلات › ديوان الهيئة']
```

## Sources per page

All paths are relative to the production copy.

- `registry`: `src/components/OfficialCorrespondence/registry/{RegistryPage,RegistryKpis,RegistryTable,RegistryFilters,DailyReportPage,registrySearch}`, `shell/CorrespondenceAppBar.tsx`, `capabilityFlags.ts`, `src/utils/sidebarItems.tsx`, `src/locales/officialCorrespondence/{registry,common}`, `servers/entities/correspondence/service/registry.ts`.
- `incoming`: `registry/{RegisterIncomingDialog,useRegistrationUndo}`, `service/{registration,registryActions,registryActionsView}.ts`, `rules.ts` (`UNDO_WINDOW_MS`).
- `paper-intake`: `registry/{ManualIntakeDialog,ScanIntakeDialog,ArrivalsQueue}`, `locales/{registry,ai}`, `service/{intake,intakeMoves,scanIntake}.ts`.
- `outgoing-dispatch`: `registry/{DispatchQueue,DispatchDialog,CorrectVoidDialog,channels}`, `locales/{registry,dialogs,batches}`, `service/{flow,registry,registryActions,batches}.ts`, `rules.ts` (`isRecallable`).
- `batches`: `batches/{BatchesPage,BatchCard,BatchContents,NewBatchDialog,AddToBatchDialog}`, `locales/batches`, `service/{batches,bounces}.ts`.
- `circulars`: `circulars/CircularsPage.tsx`, `locales/circulars`, `service/{flow,views,letters}.ts`, `repository/folders.ts`.

## Live test2 evidence (2026-10-31)

Account acting as «موضع البيانات الوصفية لـ Codex», office «ديوان asd». Capabilities: register, publishCircular, administer.

Writes made:

1. Saved one paper intake, «GUIDE-QA قيد ورقي تجريبي لالتقاط صور الدليل» (their no. `GUIDE-QA-1`, sender «GUIDE-QA جهة اختبار وهمية», no addressee, one blank PNG). Toast «حُفظ — بانتظار القيد». «بانتظار القيد» went 1→2 and «آخر رقم وارد» stayed و/2026/0018, so it took no number and reached nobody.
2. Refused that intake at the registry to clean up. Toast «رُفض الوارد», count back to 1, no GUIDE-QA arrival left. This adds one refused arrival to the 2026-10-31 daily report totals, which is not closed.
3. Created one empty paper batch, «GUIDE-QA حقيبة فارغة لالتقاط صور الدليل» (id `gowkjd67jjtfg8hiro8ou`), no letters added. Then «إلغاء المتبقي». It now shows «ملغاة» under «منتهية». Batches cannot be deleted, so it stays listed. No letter gained a `batch_added` event.
4. Opened «عرض التعميم» on the test circular ت/2026/002 «تعميم تجريبي — التحقق من صياغة النشر», which landed on `tray?folder=circulars`, then pressed «إقرار». Toast «سُجّل إقرارك بالاطلاع على التعميم», button became «تمّ الإقرار», count went 0→1 of 18. This cannot be undone. It is this account's own acknowledgement on a circular already labelled as a test.

Opened and cancelled, nothing saved: «قيد وارد», «قيد وارد ورقي» (apart from item 1), «قيد بالمسح الضوئي», «تسجيل إرسال الصادر», «رفض إرسال المراسلة» («بانتظار الإرسال» stayed 8), the entry menu and «إلغاء القيد» on ص/2026/0007, «حقيبة جديدة» (apart from item 3), «إضافة كتب إلى الحقيبة».

Read-only checks: every registry tab; a closed day's report (2026-10-01) with frozen totals and the «تغيّرت قيود بعد الإقفال» notice; an open day's report (2026-10-31) shows «إقفال اليوم», which was not pressed; the sidebar target `?intake=new` opens the scan dialog here, because AI intake is on. The acting position was unchanged at the end.

## Verification limits

Source-backed only, not exercised:

- Registering a letter, including the number, undo, delivery to holders, late entries and the receipt notice. No entry was registered, so no number was consumed.
- Issuing, and any dispatch: recording, email, refusal. The eight letters in the queue were left as they were.
- Correcting or voiding an entry, hold and forward of an arrival, closing a day, export, print, PDF, old-register import.
- Automatic reading of scans (the dialog was only opened).
- A batch with items: eligibility, sending, «تسليم», the manifest, retry, bounce, uncertain sending, and all the item states in the delivery table. test2 had no batch with items, and adding test letters would have written events on letters this stage did not create.
- Publishing a circular.
- Non-clerk behaviour (the redirect and notice), since the account is a clerk.

## Mismatches: production copy against test2

- **Case intake is not covered in the guide.** The «المعاملة» section (`CaseIntakeSection`) was absent from the live «قيد وارد» dialog (`.oc-case-intake` count 0). It is gated by the `cases` module, so this may be the module being off on test2 rather than a build difference; this was not determined. No case text or screenshot exists. Add it if `cases` is enabled on test2.
- **Dispatch source filter is not covered.** «الكل / من السجلات / من المحرر» and the source chip appear only when the queue holds a letter issued from a record. None exists on test2.
- `flow.ts` in production can register a record-issued letter at an office other than the one serving the sender. The guide's "the office serving the sending unit" is the ordinary editor case.
- Labels used in the guide are the same locally and in production, and match the live pages except as listed below.

## Screens not captured

- A batch with items, delivery states, «تسليم باليد», «طباعة الكشف»: no safe state on test2.
- «تصحيح القيد» dialog, receipt notice, hold and forward dialogs, compose in circular mode: not captured, to keep pages short. The correct dialog opens safely if wanted.

## Arabic and other label problems noticed

- The same field reads «رقمهم» in the live «قيد وارد» dialog and «رقم الكتاب» in «قيد وارد ورقي». The production locale has only `رقم الكتاب`, so the first may come from a register field rename on test2. The guide avoids naming this field.
- The courier channel is «مراسل» in dispatch (`dialogs.channels`) and «مندوب» in batches. English says “Courier” in both.
- The page title and sidebar say «قيد ورقي», the head button says «قيد وارد ورقي». English uses “Paper intake” for both.
- An empty batch shows «لا يوجد ما ينتظر الإرسال» although eight letters wait in the queue: the text is reused from the add dialog and reads as false here.
- The batch card's «سُلّم X من Y» also counts emails that were only sent. The guide warns about this, but it undercuts the issuing, sending and delivering distinction.
- The undo hint says five seconds while the server keeps ten. This is intentional in the code; the guide says "about five seconds".
- «النسخ» is “Paper copies” in English, so the Arabic is less specific.

## For the integrator

- **Recapturing will not reproduce five shots.** `ch07-paper-intake-queue`, `ch07-batches`, `ch07-batches-new` (background card), `ch07-batches-contents` and `ch07-batches-add` depend on the GUIDE-QA intake and active batch, which were cleaned up. Recreate them first, and update the batch id in `shots-ch07-s4.mjs`. In `ch07-circulars`, marker ③ will move to the next card, since the first is now acknowledged.
- `ch07-paper-intake` and, less so, `ch07-incoming` keep a dimmed strip of page under the dialog. `fitBottom` measures before the dialog re-centres in the smaller viewport, and `capture2.mjs` was left unchanged.
- Figure labels are `fig:correspondence-<slug>-screen`, with suffixes such as `-filters-`, `-report-`, `-scan-`, `-queue-`, `-dialog-`, `-entry-menu-`, `-void-`, `-new-`, `-contents-`, `-add-`. Table labels: `tab:correspondence-registry-views`, `-incoming-fields`, `-issue-send-deliver`, `-batch-delivery`.
- The table `tab:correspondence-issue-send-deliver` has three columns and comes before the Horizon box on its page, because the example depends on it.
- The example records Aleppo Branch as an outside party, since only outside parties reach the dispatch queue. The sentence says so, for the storyline's consistency.
- Nothing was built or tested with `npm run html` or `guide.test.mjs`, as the brief required. Structure parity was counted by hand: 6 sections, 26 labels, 16 figures, 4 tables, 29 items, 6 example boxes, 24 table-row ends in each language.
