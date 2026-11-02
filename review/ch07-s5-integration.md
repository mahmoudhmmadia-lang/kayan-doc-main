# Chapter 7, stage 5: integration notes

Pages: `dossiers`, `delegation`, `archive`, `search-views`, `performance`, `oversight`, `audit`.
Files: `chapters/07-correspondence-s5.tex`, `i18n/en/chapters/07-correspondence-s5.tex`, `tools/capture/shots-ch07-s5.mjs`, 26 PNGs (13 per language), `review/manifest-ch07-s5.json` (merge it into the shared manifest).

Sources: production copy at commit `e8db3c79b0`, per the coordinator's correction, not the stale local checkout. Labels and behaviour read from the local copy were re-diffed against it. The only stage 5 differences are the new «ملف التوقيع» tray entry, extra audit event kinds, a small office-label change and lazy schemas. Exception: the production copy has no `common/`, so the notification catalog fact below comes from the local copy.

## Directory rows

| Page — Section (AR) | What this page offers (AR) |
| --- | --- |
| الأضابير — التنسيق | جمع مراسلات موضوع واحد في ملف مرقّم، ومشاركته وإغلاقه. |
| التفويض — التنسيق | تفويض منصب آخر مدة محددة بعد إقراره، وتعديل التفويض وإلغاؤه. |
| الأرشيف — المتابعة والإدارة | مراجعة سجلات الأرشفة واعتمادها وإعادتها أو رفضها. |
| البحث والتصفية والعروض المحفوظة — المراسلات | الوصول إلى كتاب معيّن بالبحث والفلاتر، وحفظ الشروط المتكررة عرضاً. |
| الأداء والالتزام بالمهل — المتابعة والإدارة | متابعة أدائك ونتائج الوحدات والمتأخرات والتنبيهات. |
| مراسلات الجهة — المتابعة والإدارة | قائمة وصفية بمراسلات نطاقك الرقابي، مع التصفية والتصدير. |
| سجل التدقيق — المتابعة والإدارة | معرفة من فعل ماذا ومتى، وقراءة نشاطك وسجل كل كتاب. |

| Page — Section (EN) | What this page offers (EN) |
| --- | --- |
| Dossiers — Coordination | Keep one subject's letters in a numbered file, then share and close it. |
| Delegation — Coordination | Delegate to another position for a set period after it acknowledges, then edit or revoke. |
| Archive — Oversight and administration | Review archive records and approve, return or reject them. |
| Search, filters and saved views — Correspondence | Reach a specific letter with search and filters, and save repeated conditions as a view. |
| Performance and deadlines — Oversight and administration | Follow your performance, unit results, overdue work and alerts. |
| Organisation correspondence — Oversight and administration | A metadata list of letters in your oversight scope, with filters and export. |
| Audit log — Oversight and administration | See who did what and when, including your own activity and each letter's log. |

`search-views` has no sidebar entry of its own. It explains tools inside the tray, so I gave it the tray's section; move it if you prefer.

## Chapter at a glance: proposed idea

```js
// AR
['نظّم ثم تابع', 'تجمع الأضابير مراسلات الموضوع الواحد، ثم تكشف المهل والمسار والسجل ما تأخر ومن نفّذ كل إجراء.', 'يجمع عمر كتب الزيارة في إضبارة «زيارات الفروع»، ثم يفحص تأخرها ومسارها.', 'sec:correspondence-feature-dossiers', 'التنسيق › الأضابير']
// EN
['Organize, then follow up', 'Dossiers keep one subject’s letters together, while deadlines, the route and the log show what is late and who did each action.', 'Omar gathers the visit letters in the “Branch visits” dossier, then checks their delay and route.', 'sec:correspondence-feature-dossiers', 'Coordination › Dossiers']
```

## Source files per page

Paths are relative to the production copy. `S` = `servers/entities/correspondence/service`.

- **dossiers**: `src/components/OfficialCorrespondence/dossiers/*`, `reader/DossiersPanel.tsx`, `reader/ReaderToolbar.tsx`, `tray/useLetterActions.tsx`, `dialogs/GrantAccessDialog.tsx`; `S/dossiers.ts`, `S/dossierItems.ts`; locale `dossiers`.
- **delegation**: `delegation/*`; `S/delegations.ts`, `S/views.ts` (`me` lists only current delegations); locale `delegation`.
- **archive**: `archive/*`; `S/archive.ts`, `S/archiveList.ts`; locale `archive`.
- **search-views**: `tray/TrayFilters.tsx`, `SavedViews.tsx`, `savedViewsModel.ts`, `SearchOperatorsHelp.tsx`, `FolderStrip.tsx`, `traySearch.ts`; `S/search.ts`; locale `tray`.
- **performance**: `performance/*`; `S/performance.ts`, `performance/score.ts`; locale `performance`.
- **oversight**: `oversight/*`; `S/oversight.ts`; locale `oversight`.
- **audit**: `audit/*`, `reader` tabs; `S/audit.ts`; locales `audit`, `reader`.
- **Navigation**: `src/utils/sidebarItems.tsx`, `common` locale `sections`.

## Live test2 evidence

Account position: «موضع البيانات الوصفية لـ Codex», unchanged at the end. This account can see every view, including audit, oversight, archive and performance.

| Action | Result |
| --- | --- |
| Saved draft `GUIDE-QA S5 dossier test letter`; addressee was the account's own QA position | Draft appeared in Drafts. It was never sent. |
| Created dossier through the form | «فُتحت الإضبارة»; number `DOS-2026-0002`. |
| «إضافة إلى إضبارة» from the reader's menu | Toast shown; letter count became 1. `dossier_added` appeared in the letter's log and in the audit log under the Dossiers category. |
| «إزالة» on the dossier item | Toast shown; list empty; a removal row appeared in the letter's log. |
| «إغلاق الإضبارة» + confirm | State became Closed; «مشاركة» and «إغلاق الإضبارة» gone, «منح اطلاع» still shown. The success toast was not caught by my check; the closed state was read from the page. |
| Deleted the draft | «حُذفت المسودة». |
| Delegation form: opened, pressed «إنشاء التفويض» with no delegate, then cancelled | Client validation showed «يُرجى اختيار المفوَّض إليه»; dialog closed; «تفويضات منحتُها» stayed empty. |
| Saved view: saved, renamed, applied, deleted | All worked; applying restored `folder=inbox&quick=overdue`; zero views left. |
| Search operators popover | Lists all six operators. |
| Archive: opened one in-approval record for reading only | No action taken. Counters identical before and after: 2 / 1 / 2 / 21 / 0. |

Left behind on test2: closed dossier `DOS-2026-0002`, because neither the UI nor the server routes can delete a dossier, so "created and removed" was not fully achievable. Its description says it is a test record. Its log events also stay.

**Delegation deliberately not created.** `correspondence.delegation_received` is on the email-by-default list in the notification catalog test, so creating one could send a real email outside test2, which the brief forbids. This fact comes from the stale local `common/`, because the production copy lacks that folder.

## Verification limits

Source-backed only, not exercised live:

- Delegation: create, acknowledge, edit, revoke, overlap refusal, cross-unit warning, 90-day limit, disappearance from lists after revoke or end, the «نيابةً عن» mailbox, and the delegation card states.
- Dossier: «مشاركة» and «منح اطلاع» were not opened. Grant was avoided because it adds copies and notifications. Non-manager and unit-head views and the restricted card were not seen.
- Archive: save, submit, approve, return, reject, the five-character comment rule, the self-approval rule, and the no-approval path. The record's Save and Submit buttons were not captured (the shot uses an in-approval record).
- Performance: export, Units report, Problem lists, Statistics and Alerts tabs were not opened; alert acknowledge not used. The default minimum sample is 3, but the page text avoids the number because it is configurable.
- Oversight and audit: exports not run. The forbidden state, «الموضوع محجوب», «لا تتوفر صلاحية الاطلاع» and «مراسلة مقيّدة» were not seen, because this account holds broad access. So marker ④ on `ch07-oversight` and marker ⑤ on `ch07-audit` show the access-granted case, and their "no access" wording is source-backed.
- Filters: the type, confidentiality, sender and period fields were shown but not applied individually.
- Navigation: pages were reached by URL. Breadcrumbs confirm the sections, but the top bar shows only six entries, so the click path through the section menus was not walked. Worth a quick check, because the steps say "open X in section Y".
- Only the `ar` and `en` interfaces were covered, at desktop width on the light theme. The guide site was not built, per the brief.
- Screenshots show records that no longer exist (the draft and saved view). Recapturing four shots (`ch07-dossiers-detail`, `ch07-audit-letterlog`, `ch07-search-views`, `ch07-search-filters`) needs them recreated and the two IDs in `shots-ch07-s5.mjs` updated. `ch07-dossiers` and `ch07-audit` will also differ slightly.

## Screens not captured, and test2 mismatches

- No populated delegation card or acknowledge state: test2 has no delegation, and creating one was unsafe. The empty page is captured and its note says so.
- No screenshot of «إضافة إلى إضبارة», «مشاركة» or «منح اطلاع» dialogs.
- `ch07-performance-overview` is tall (about 2100–2470 px) because the watch list is long. Nothing is cropped.
- test2 versus production copy: no mismatch found. «ملف التوقيع» is live on test2, as in production.

## For the integrator: other stages

- Stage 1 (`tray` page): production and test2 add the «ملف التوقيع» folder after «بانتظار اعتمادي», which the page does not mention. Check whether its screenshot and folder wording need updating.
- Stage 3 should cover «ملف التوقيع» if it does not already.

## Arabic and English UI label problems

- Delegation rule says it can be revoked «مع ذكر السبب», but the dialog says «السبب (اختياري)». The same mismatch exists in English. The guide follows the dialog.
- Deadlines wording differs: performance says «بساعات العمل», the route footnote says «بأيام العمل». The guide quotes only the performance statement, on that page.
- Sidebar says «الأرشيف», the page title says «أرشيف المراسلات»; the guide uses the sidebar name for navigation.
- English mixes “Organisation correspondence” with the guide's “organization”. The UI spelling is kept in labels only.
- Archive record history: a row with no actor shows a doubled separator («الحفظ · ·»).
- English archive panel title runs together with an Arabic subject (“Archive recordعقد…”), a bidi spacing issue.
- Closed dossiers keep «منح اطلاع» available when they hold letters, which may surprise readers given that closing is described as final. The guide does not claim otherwise.
- The dossier edit service exists (`updateDossier`), but `DossierDetail` has no edit control, so the guide does not mention editing.
