# Chapter 8, group `management`: coverage

Environment: test2 only, 2026-11-01.

## Approval routes

Verified on test2:
- Library, filters, "Org setting" state, route editor of `ministry_of_finance_budget_approval` (all sections read, nothing edited), settings page. Nothing saved; no draft created.

Code only:
- Autosave to draft, publish, versions, archive and delete rules: `ApprovalRoutes/library/*`, `locales/approvalRoutesBuilder.*`.
- Simulation saves nothing: `simulator.nothingSaved`. Simulator not opened.
- No route was created, because this page was not in the allowed create and delete list.

## Evaluation templates

Verified on test2:
- Library, filters, and the Criteria, Scoring and Bands tabs of two published templates (nothing edited), "Versions" and "Used by" tab counts.

Not tested:
- Create and delete. The page offers no delete: `discardDraft` empties a draft and the row stays (`servers/entities/evaluations/templates.ts`), so nothing was created.

Code only:
- Publishing, pinned versions, retire, permissions: `EvaluationTemplates/*`, `servers/entities/evaluations/access.ts`, `routes.ts`.

## Follow-up

Live flow on test2 (English interface), passed:
1. "New reason", label "Guide QA waiting for papers". The key filled from the label. "Reason added"; the table showed "1 of 60", "Other" and zero used.
2. Reloaded: the reason stayed. Reopened: "not used yet", key locked, "Archive" and "Delete" offered.
3. Deleted with confirmation: "Reason deleted".
4. Reloaded: the empty state returned and no "Guide QA" text remains.

Verified on test2 without saving: "Blocker types" (empty), "Interventions", category list.

Not tested:
- Blocker types offer no delete in the drawer, so none was created.
- "SLA calendars" tab: shown only with the Cases module on; absent on test2. Code only: `SlaCalendarsTab.tsx`, `visibleFollowupTabs`.
- "Stops the clock" options: code only: `StuckReasonDrawer.tsx`.

## Record keeping

Verified on test2, read only: overview, retention rules with the rule card, holds list, disposition list, ledger integrity, storage and fixity, records roles. No disposition, hold or retention action run; "Withdraw", "Propose now", "Verify again", "Re-apply", "Edit" and "Retire" were not pressed.

Code only:
- Monthly proposal and nightly hold refresh: `servers/entities/recordKeeping/lifecycle/jobs.ts`, `disposition/propose.ts`.
- Release rules, approvals, certificate, ledger: `locales/recordKeepingSettings.en.ts`, `RecordKeeping/settings/*`.
- Hold and disposition detail pages not opened.

## UI text notes

- Arabic plural errors: «6 سجل» (overview hold card), «58 حدث في 6 سلسلة» (ledger).
- Arabic UI uses «الجهة» on these pages; the guide uses «المؤسسة» outside quoted labels.
- Arabic tab «الإصدارات» in the route editor and column «مستخدم في» against section «يستخدمه»: two labels for one idea.
- Bands tab, “Outcome it recommends” shows raw keys (`excellent`, `review`) and the mandatory-fail select shows `excluded` in the Arabic interface.
- Page breadcrumb repeats the page name on Follow-up, Evaluation templates and Approval routes.
- Rule QRK-01 card on test2 shows "Re-apply to v2" while the current version is v3: test data, but a stale proposal stays open.
