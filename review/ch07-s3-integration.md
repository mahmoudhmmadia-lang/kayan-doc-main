# Chapter 7, stage 3: integration notes

Sources are the production copy at commit `e8db3c79b0` (the local checkout is 1672 commits behind). Paths below are relative to that copy.

## Blocker to decide first: no review or approval flow was executed

Nothing was created, submitted, decided, referred, answered or completed on test2. This stage's pages are **source-backed** for every action effect. The screens are real, but they show existing test letters and dialogs that were opened and cancelled.

Why the permitted GUIDE-QA flow was not run: the brief allows internal workflow actions between this account's positions, but forbids any send that leaves test2, including email. These two conditions conflict.

- `common/notifications/definitions/correspondence.ts` emails by default on `review_requested`, `approval_requested` and `received`. Those three events are the steps of the flow (push for review, send for approval, issue to a recipient).
- Read-only checks on test2: `notification-preferences/organization` has no correspondence override; the member's snapshot has `overrides: []`, `hasEmail: true`, and quiet hours off.
- Preferences are served by `notifications.kayanos.app`, a service outside the test2 host.
- I found no code excluding the actor from recipients in `servers/notifications` (search, not a full trace of `dispatch/`).
- Other members may also hold a target position; holders were not established for every position.

So the flow would very likely send real email. I did not disable the account's email preferences to get round this: it is a saved setting nobody authorized changing.

To unblock, the user can either accept email to the test account for this flow, or authorize turning those email preferences off. Then run on a new GUIDE-QA draft, using `mvbqa_pos_r2` as requester and `mvbqa_pos_adra_r1` as reviewer after confirming who holds them. `referred`, `returned`, `rejected`, `review_decided`, `inquiry_requested` and `inquiry_answered` do not email by default.

## Directory rows

Arabic, `Page — Section` & `What this page offers`:

- مهام الصياغة — المراسلات & دفع المسودة إلى مراجع، ومتابعة الطلبات المسندة إليك والتي أسندتها، والفرق بين القبول والإعادة والسحب والإلغاء.
- بانتظار اعتمادي — المراسلات & قراءة مسار الاعتماد، والتمييز بين الاعتماد والتوقيع والإعادة للتعديل والرفض، ومعرفة صاحب الخطوة التالية.
- قراءة المراسلة & شريط الإجراءات والأقسام والمهلة والمسار والتواقيع والمرفقات، وكيف تعرف ما يحق لك فعله.
- الإحالة والحواشي والمتابعة & تكليف الجهات بالعمل، وإضافة الحواشي، وإعادة التوجيه والتعليق والمتابعة كمهمة.
- الاستفسارات والتشاور — التنسيق & طرح الأسئلة والإجابة عنها، وفتح جلسات التشاور في المحادثات.
- الرد والإنجاز & إغلاق العمل برد أو إنجاز أو إقرار بالاطلاع أو إفادة، ومتى تكتمل المراسلة كلها.

English:

- Drafting reviews — Correspondence & Push a draft to a reviewer, follow requests assigned to you and by you, and tell accept, return, withdraw and cancel apart.
- Awaiting my approval — Correspondence & Read the approval route, tell approve, sign, return for changes and reject apart, and know who owns the next step.
- Reading a letter & The action bar, sections, deadline, route, signatures and attachments, and how to tell what you may do.
- Referrals, margin notes and follow-up & Assign work, add notes, redirect, suspend and follow a letter as a task.
- Inquiries and consultations — Coordination & Ask and answer questions, and open consultation sessions in Chat.
- Replying and completing & Close your work by reply, completion, acknowledgement or answer, and know when the whole letter completes.

Reader, referral and reply pages have no section: they are opened inside a letter.

## Chapter at a glance idea

```
en: ['Review, decide, hand on', 'A draft moves through review and approval, then each holder refers, answers or completes the work. Each decision names who owns the next step.', 'Sarah returns Omar’s visit request with a comment; once it is sound, the General Manager signs it and Aleppo Branch handles it.', 'sec:correspondence-feature-approvals', 'المراسلات الرسمية › بانتظار اعتمادي']
ar: ['راجع وقرّر وسلّم العمل', 'تمر المسودة بالمراجعة والاعتماد، ثم يحيل كل صاحب عمل مراسلته أو يجيب عنها أو ينجزها. ويحدد كل قرار صاحب الخطوة التالية.', 'تعيد سارة طلب الزيارة إلى عمر مع ملاحظتها، وبعد اكتماله يوقّعه المدير العام ويعالجه فرع حلب.', 'sec:correspondence-feature-approvals', 'المراسلات الرسمية › بانتظار اعتمادي']
```

The path's English equivalent, if the tool needs one: `Official Correspondence › Awaiting my approval`.

## Source files per page

- drafting-review: `src/components/OfficialCorrespondence/reviews/{DraftingPage,ReviewRow,ReviewDecisionDialog}.tsx`, `reader/ReviewBar.tsx`, `dialogs/RequestReviewDialog.tsx`, `src/locales/officialCorrespondence/reviews{.ar,}.ts`, `servers/entities/correspondence/service/reviews.ts`.
- approvals: `reader/ApprovalChainBox.tsx`, `reader/ReaderToolbar.tsx`, `dialogs/{ApproveDialog,ReasonDialog}.tsx`, `service/letters.ts` (`currentStageAccess`, `decide`, `sign`), `service/approval.ts`, `service/flow.ts` (`issueLetter`), `service/views.ts` (`permissionsFor`), `repository/folders.ts`.
- reader: `reader/{LetterReader,ReaderToolbar,DeadlineBar,RouteTimeline,SignaturesTab,AttachmentsTab,ActionLog}.tsx`, `verify/VerifyLetterPage.tsx`, locales `reader`, `verify`.
- referral: `dialogs/{ReferDialog,RedirectDialog,ReasonDialog}.tsx`, `reader/FollowTasksPanel.tsx`, `service/assignments.ts`, `service/actions.ts`, `service/flow.ts` (`afterAssignmentClosed`).
- inquiries: `dialogs/{ReasonDialog,ConsultationDialog}.tsx`, `reader/{ConsultationsPanel,LetterDiscussions}.tsx`, `tray/FolderStrip.tsx`, `service/assignments.ts`, `service/approval.ts`, `service/consultations.ts`, `repository/folders.ts`.
- reply-complete: `dialogs/ReasonDialog.tsx`, `tray/useLetterActions.tsx`, `service/assignments.ts` (`complete`, `acknowledge`), `service/flow.ts` (`closeAnsweredLetter`, `afterAssignmentClosed`), `service/views.ts` (`reopenable`).

## Live test2 evidence

Account positions: Codex Metadata Position, Secretary General, باحث ميداني عدرا (QA), باحث ميداني 2 (QA). The position switch lives in `localStorage` (`oc.mailbox`), so it is per browser context and was not persisted.

Observed read-only:

- `/official-correspondence/drafting`: empty in all checked sides and states (assigned to me pending, assigned by me, accepted, returned).
- As Secretary General: 4 letters in «بانتظار اعتمادي» with `approve`, `returnForChanges`, `reject`, `sign`, `stageEdit`, `stageInquiry` permissions, and 5 inbox letters with `refer`, `reply`, `inquiry`, `complete`, `suspend`, `redirect`. «الاستفسارات» is empty for the positions checked.
- Dialogs opened and cancelled without typing: push for review, return for changes, approve and sign, refer, inquiry, complete and file. The sign dialog showed the expected number `ص/2026/0016` (a preview; `nextNumber` reserves nothing).
- Reader tabs opened: letter, route, signatures, attachments, references. Only letters already marked read were opened in my inventory and captures, to avoid changing read state.
- A closed test consultation session and its minutes label on `م/2026/0020`.

Created on test2: nothing. Stage 2's GUIDE-QA drafts were left alone; the push dialog was opened on the existing training draft and cancelled.

## Verification limits

Source-backed only, not exercised:

- All review decisions and the draft lock; acceptance changing the draft's owner and approval chain; the reviewer's task.
- Approve, sign, return, reject, stage edit, stage question, compare edits, reading mode, the member-key path.
- Refer, note, redirect, suspend, resume, follow as task, prepared referrals, voice notes, signed notes.
- Asking, answering and withdrawing an inquiry; opening or closing a session.
- Reply, complete, acknowledge, reopen, the letter's move to completed and filing.
- `Verification page`: not opened. The voided-number state and the delegation decree line are new in production and not covered.

## Screens that could not be captured

- No filled drafting-review row or review bar, and no returned or rejected letter state: test2 has no such data in the checked folders, and creating it is the blocked flow.
- No inquiry row or answer dialog: the folder is empty.
- `ch07-drafting-review` and `ch07-inquiries` are honest empty states, and their notes say so.
- Open consultation session and the session dialog: not captured.

## Mismatches and label problems

- test2 shows «ملف التوقيع» / “Signing folder” with a count of 4 and «جديد». It is in production (`tray/FolderStrip.tsx`, `?view=signing`), but `OfficialIssue` is outside the production copy provided, so the guide does not explain it. It is visible in the screenshots. Someone with that source should decide where it belongs.
- `reader/LetterCaseChip.tsx` (cases module) is omitted: it shows only with the module on and was not seen on test2.
- Toast `tray … inquiry`: «ستصلك الإفادة في «الاستفسارات»» is misleading. That folder lists only open inquiries held by the mailbox (`repository/folders.ts`), so the asker's answer is not there. The guide says to open the letter.
- Refer dialog hint «يُبلَّغ المحال إليهم فوراً داخل كيان وبالبريد» overstates: `referred` does not email by default. The guide does not repeat the claim.
- Return comment: the review dialog enables its button from 1 character, while the server requires 5 (`returnReview`). The guide says five.
- `reader.approval.roles` has no `cosign` key although `StageRole` now includes it, so a co-sign stage may render a raw key. Not observed live.
- English and Arabic differ: `stageInquiry` submit is “Send” versus «إرسال الاستفسار»; stage question button is “Ask a question” versus «استفسار».
- `common.pages.inquiries.description`: the Arabic adds «قبل أن تتحرك المراسلة», the English does not.
- Arabic header: the subtitle under «المراسلات الرسمية» shows the English “Official Correspondence” in the Arabic interface.
- Screenshot detail: `ch07-referral-notes` shows Acting as Codex Metadata Position although the shot selects Secretary General; the letter is held there.
