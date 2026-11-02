# Chapter 7, stage 2: integration notes

Stage 2, "Preparing a first letter". Sources: `chapters/07-correspondence-s2.tex`, `i18n/en/chapters/07-correspondence-s2.tex`, `tools/capture/shots-ch07-s2.mjs`, `review/manifest-ch07-s2.json`.

Code source: the production copy at commit `e8db3c79b0` (scratchpad `prod-src`), per the coordinator's correction. The local checkout is 1672 commits behind and was not used for any final claim. Everything read from it first was diffed against the production copy.

## Directory rows

Section label: `common.sections.work` = «المراسلات» / "Correspondence". Only compose and drafts are sidebar entries. The other three are parts of the compose page, so they have no section.

### Arabic

| Page — Section | ماذا تقدم هذه الصفحة؟ |
| --- | --- |
| بدء مراسلة جديدة — المراسلات | بدء كتاب باسم منصبك، واختيار نوعه وسريته وأولويته، وكتابة موضوعه ونصه. |
| المخاطَبون ومسار الاعتماد | تحديد وجهة الكتاب ومن يراجعه أو يعتمده أو يوقّعه، وقراءة مسار التوجيه المتوقع. |
| المرفقات والترويسة وملف نص الكتاب | إضافة الملفات واختيار الترويسة واستخدام ملف جاهز نصاً للكتاب. |
| الحفظ والمعاينة والفحص قبل الإرسال | قراءة حالة الحفظ ومراجعة الورقة وتشغيل الفحص قبل الإرسال. |
| المسودات ومهام الصياغة — المراسلات | العثور على المسودات المحفوظة ومتابعة تحريرها أو حذفها. |

### English

| Page — Section | What this page offers |
| --- | --- |
| Starting a new letter — Correspondence | Start a letter in your position's name, choose its type, confidentiality and priority, and write its subject and text. |
| Addressees and the approval chain | Set where the letter goes and who reviews, approves or signs it, and read the expected routing. |
| Attachments, letterhead and the body file | Add files, choose a letterhead and use a ready file as the letter's body. |
| Saving, preview and the pre-send check | Read the save status, review the sheet and run the check before sending. |
| Drafts and drafting tasks — Correspondence | Find saved drafts and continue editing or delete them. |

## Proposed "Chapter at a glance" idea

```js
// English
['Prepare and save your draft', 'Complete the subject and addressees so the letter can be saved, then reopen it from Drafts to confirm its values.', 'Omar prepares the Aleppo Branch visit coordination request, saves it, and reopens it to check his work.', 'sec:correspondence-feature-compose', 'Correspondence › New letter'],
// Arabic
['أعدّ مسودتك واحفظها', 'أكمل الموضوع والمخاطَبين ليُحفظ الكتاب، ثم أعد فتحه من «المسودات» لتتأكد من قيمه.', 'يُعدّ عمر طلب تنسيق زيارة فرع حلب ويحفظه، ثم يعيد فتحه لمراجعة عمله.', 'sec:correspondence-feature-compose', 'المراسلات › مراسلة جديدة'],
```

## Sources per page

All paths are under the production copy.

- **compose:** `src/components/OfficialCorrespondence/compose/ComposePage.tsx`, `ComposeWorkspace.tsx`, `ComposeProperties.tsx`, `composeState.ts`; `src/locales/officialCorrespondence/compose{.ar,}.ts`; `src/utils/sidebarItems.tsx`.
- **recipients:** `compose/RecipientTokens.tsx`, `RoutePreview.tsx`, `ApprovalChainEditor.tsx`, `composeState.ts`; `servers/entities/correspondence/service/letters.ts` (`defaultStages`, `validateDraft`, `submit`).
- **attachments:** `compose/AttachmentsField.tsx`, `BodyFileField.tsx`, `ComposeProperties.tsx`; `compose{.ar,}.ts`.
- **check-save:** `compose/PreSendCheckPanel.tsx`, `ComposePage.tsx`; `servers/entities/correspondence/service/aiCheck.ts`; `src/locales/officialCorrespondence/ai{.ar,}.ts`.
- **drafts:** `tray/FolderStrip.tsx`, `tray/useLetterActions.tsx`, `reader/ReaderToolbar.tsx`; `servers/entities/correspondence/service/letters.ts` (`deleteDraft`), `repository/folders.ts`; `reader{.ar,}.ts`, `dialogs{.ar,}.ts`, `tray{.ar,}.ts`, `common{.ar,}.ts`.

## Live test2 evidence (2026-10-31)

Acting position throughout: «موضع البيانات الوصفية لـ Codex» / "Codex Metadata Position", never changed. All actions were on `test2.kayanos.app`. Nothing was sent.

- **Created:** four `GUIDE-QA` drafts in the UI, two per interface language (A and B).
- **Status line:** moved from "Not saved yet" to "Saved automatically once the subject and addressees are complete" to "Unsaved changes", then "Draft saved moments ago".
- **Autosave:** fired without pressing save, about 20 s after the addressee was added, which was roughly 30 s after the first edit. The URL gained `?drafts=<id>`. Seen on all four drafts.
- **Manual save:** "Save as draft" gave the toast "Saved in “Drafts”" and opened the draft in the tray.
- **Fresh-session reopen, A drafts:** a new browser and context loaded subject, body, addressee and chain, in both languages. The attachment was confirmed this way in Arabic. See limits below for English.
- **Reopen through the UI:** on the first English draft, Drafts, then the row, then "Continue editing" reloaded subject, body, addressee, type, confidentiality and priority.
- **Validation:** saving a blank letter showed both "subject" and "addressee" errors. A 5-character subject left only the addressee error.
- **Option lists:** 10 types. Six confidentiality levels, with «سري للغاية» and «سري جداً للغاية» disabled for «كتاب رسمي». Two letterheads. Three letter languages.
- **Reply deadline:** the switch showed the period choices, the calculated due date and the reminder.
- **Chain:** after saving, the chain stayed empty for this position. Adding stages produced Signature first, then Approval before it, as documented. The fresh reopen kept them.
- **Attachment:** a test PDF uploaded; the count on the sheet went from 0 to 1; it persisted (Arabic fresh session).
- **Body file:** a test PDF was prepared and showed its name and "Pages: 1". "Preview" opened the viewer with a rendered canvas. Going back to text showed the confirm dialog, and it was left unconfirmed. Margins shown: 60 mm and 70 mm.
- **Pre-send check:**
  - A draft with text mentioning an attachment and no file: finding "The text mentions attachments but none is attached" (Medium).
  - After attaching on the Arabic A draft, that finding was gone.
  - The AI part ran on test2: "Possible duplicate" appeared, linking my other same-subject test draft, plus suggestions. Its level varied between Medium and High across runs.
- **Delete:** "More actions", "Delete draft", the confirmation dialog (text read in both languages), then the toast "Draft deleted". All four drafts were removed, and the folder went from 10 to 6.
- **Left behind on test2:** none of mine. `GUIDE-QA S5 dossier test letter` is another stage's draft and was not touched. The server keeps deleted drafts with status `void` (see limits).

## Verification limits

Source-backed only, not exercised:

- **Sending or submitting anything.** This includes "Send anyway" / "Back to editing", "Send all" and "Push for review".
- **"A letter with no stages is issued when sent".** From `submit` and `defaultStages`. Not tested, deliberately, because it would issue a letter.
- **Default chain text.** The derived chain "unit head approves, then superior signs" could not be seen, because the test position derives none. The UI label and server code agree.
- **"Check automatically on send".** Not toggled, because it is a saved personal preference.
- **"Another letter with the same properties"**, the 20-tab limit, and the "Close" behaviour (complete letter kept, new incomplete letter dropped).
- **Direct sending.** Rules are from source; the switch was not turned on.
- **External bodies.** The typed external option was seen in the search list but not added to a draft. Circular audience and fixed-recipient types are not covered on these pages.
- **Returned letters in Drafts.** From `repository/folders.ts`; no returned letter was opened.
- **"Saving failed", and the "Rules checked only" lines.** Never occurred. Described from locale and source.
- **Images in the letter body**, and "References" rows.
- **Limits of 10 files and 20 MB** were not pushed.

Partly verified:

- **Wrong file type.** A `.txt` given to the attachment input produced no visible message within the short window read, so the guide makes no claim about that message. It only lists accepted types.
- **English A draft attachment.** It was added in a later session and saved. The fresh-session attachment read was done in Arabic only. The saved attachment count of 1 then appeared in the English captures, each of which reloads the draft.

## Screens

12 images, 6 per language, all opened and checked:

`ch07-compose`, `ch07-recipients`, `ch07-attachments`, `ch07-attachments-file`, `ch07-check-save`, `ch07-drafts` (`-ar`, `-en`).

No screen failed to capture. Not captured: the delete confirmation and the "More actions" menu, because capture2 cannot hold them open; the page describes them in text. All show test data.

Recapture note: the drafts behind these shots are deleted. `shots-ch07-s2.mjs` needs `KOS_CH07_S2_A` and `KOS_CH07_S2_B` pointing at newly made drafts; its header explains what each must contain. `ch07-compose` needs neither.

## Mismatches and label problems

- **Code vs test2:** none found for this stage's pages. Production's «ديوان asd» / "Diwan of asd" routing and the «ملف التوقيع» folder are both live on test2, and neither was in the local checkout.
- **Number timing conflict in the UI:** the panel says «رقم الصادر يُخصَّص عند التوقيع» / "assigned at signature", while the sheet and tray say «يُخصَّص عند الاعتماد» / "Assigned on approval". The guide avoids stating when. Stage 3 or 4 should settle it from the server.
- **Page title on reopen:** a reopened draft shows «مراسلة جديدة», not «تعديل مسودة» (`titleDraft`), because the workspace head always uses the compose title. The guide describes what is shown.
- **Button on an empty chain:** "Send for approval" still shows when an approval-required type has an empty chain, though such a letter would issue directly. The guide warns about this on the recipients page.
- **Client vs server subject minimum:** the UI requires 5 characters, the server 3. The guide uses the UI's 5.
- **`cosign` role:** production's server accepts it, but the compose chain editor offers only review, approve and sign. The guide lists those three.
- **Word body file:** the label says «PDF أو Word», but the input accepts only `.docx`. The guide says docx.
- **Delete wording:** the UI says the draft is removed. The server sets status `void` and removes its files; the deleted drafts disappeared from the Drafts folder. The guide follows the UI, and the difference is recorded here only.
- **Arabic UI:** «نص الكتاب ملف» reads awkwardly as a mode name, and «م.ب» and «ميغابايت» are both used for the same unit. Quoted as shown.
- **Automated English/Arabic mixing:** with Arabic as letter language, AI notes come back in Arabic in an English interface, so the English draft was set to letter language English for the capture.

## Integrator actions

- Add `\input` for both stage files and the directory rows above.
- Add the overview idea to `tools/chapter-overviews.mjs`.
- Merge `review/manifest-ch07-s2.json` into the main manifest if the build expects it there.
- The pages refer to "the review and approval stage" in plain text, with no `\ref`. Link it to stage 3's page if you want a cross-reference.
- No HTML build or test suite was run for this stage, per the brief, so nothing here has been rendered through the guide yet.
