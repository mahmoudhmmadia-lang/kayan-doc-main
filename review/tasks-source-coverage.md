# Tasks chapter source and verification record

Authorized outline: approved in this conversation, 2026-10-17. Scope is chapter 4 in Arabic and English HTML; no Projects chapter or print regeneration.

## Coverage

| Guide page | Actual UI surface | Source |
| --- | --- | --- |
| Collections | `/tasks`, create collection dialog, collection settings | `src/components/Todo/TasksCollectionsPage.tsx`, `AddCollectionForm.tsx`, `AddCollectionModal.tsx` |
| Task views | `/tasks/$collectionId`; all, assigned, owned, contributing, informed, created, related filters; list, board, check-ins | `src/routes/tasks/`, `src/components/Todo/TodoPage.tsx`, `TodoConnect.ts`, `KanbanBoard.tsx` |
| Create and details | Task dialog, details and Show more | `src/components/Todo/TodoComponent.tsx`, `TodoComponentConnect.ts`, `taskSaveState.ts` |
| Follow-up | Body, output, challenges, progress; comments, activity, requests; follow/summary | `TaskContentTabs.tsx`, `TaskComments.tsx`, `TaskActivities.tsx`, `TaskRequests.tsx`, `TaskGeneralSummary.tsx`, `progress/TaskProgressSection.tsx` |
| Relationships | Record, related-task and email tabs; execution contexts | `TaskRecordsSection.tsx`, `relations/TaskRelationsSection.tsx`, `TaskEmailsSection.tsx`, `TodoComponent.tsx` |
| Epics | Embedded Epics tab, epic linked tasks; Arabic label «المشاريع» | `src/components/Todo/EpicTasks.tsx`, `src/locales/ar.ts` (`todos.epics`) |
| Suggestions | `/tasks/suggestions`, conditional AI card | `Suggestions/TaskSuggestionsPage.tsx`, `AcceptTaskSuggestionDialog.tsx`, locale acceptance description |
| Assignments | `/tasks/assignments`, user-assigned forms and plan entry points | `src/routes/tasks/assignments.index.lazy.tsx`, `src/components/FormAssignments/MyAssignmentsPage.tsx`, `src/locales/formAssignments.ar.ts`, `assignmentsHub.ar.ts` |
| Task settings | Builder task settings, task/epic categories/types, record/task relation tabs | `src/components/Settings/Todo/TodoSettingsTabs.tsx`, `TodoSectionTab.tsx`, `AddTodoDialog.tsx`, three `TaskType*Editor.tsx` files |
| Status templates | Builder status templates, shared configuration | `src/utils/sidebarItems.tsx`, status-template implementation and visible test2 list |

All paths under `src/components/Todo/` unless qualified. Additional reference: `docs/work/tasks-and-approvals.mdx`. Roles, links and transitions are permission-dependent. Task completion is distinct from formal approval. Suggestions permit type/collection selection at acceptance; other fields are edited on the accepted task.

## Test2 observations and limitations

- Signed in with the repository test account, used only test2.
- Created `Guide QA — Prepare visit checklist` in existing `Codex QA Collection 20260703-0945`; confirmed success and reopened the saved task from its board. Executed Start and reopened the task again to verify that In Progress persisted. Evidence: `tasks-product-verification.json`.
- Created collection title `Guide QA Tasks 20261017`; immediate navigation to `/tasks/guide_qa_tasks_20261017` reported “Collection not available”. Its card subsequently appeared on the landing page, but successful collection access was not verified. No duplicate attempts were made. These QA records remain in test2.
- Screenshots and language/dimensions/provenance are recorded in `fullpage-manifest.json`. Tabs must be activated and checked before capture; early loading/wrong-tab captures were rejected and replaced.
- Horizon names and work are fictional examples. The captured QA task and organization are separate.
- No requests or messages were sent to other people. No shared task types, relationship rules or status templates were changed. Form submission, suggestion acceptance, permission isolation, linked-record writes and administrative setup remain source-backed unless separately recorded as exercised.
- Capture/browser scripts are under `temp/tasks-*.mjs`. Raw visible-screen notes are in `tasks-tabs-*.json` and `tasks-other-notes.json`; no credentials or auth state are recorded there.
- Arabic UI terminology reconciled against live screens: Assigned to Me is «مخصص لي», Assignments is «التكليفات», Epics is «المشاريع» (a tab, distinct from the Projects app), Emails is «رسائل البريد», Check-ins is «المتابعة اليومية», and Status templates is «قوالب الحالات».
- The assignments hub includes Assigned to me/Plans, Open/Finished, availability, packages and eligible offline work. These are described without claiming form submission, plan changes or offline synchronization were exercised.

## Guide validation

- HTML builds successfully. All 12 active source/web tests pass; the two archived print tests remain skipped under the web-only direction.
- `tasks-browser-verification.json`: 88 cases, 11 new pages × two languages × two viewports × two themes. Checked image loading, image enlargement/close, examples, no page overflow, directory cards, search, page navigation, reading-progress persistence, language switching, HR handoff and a legacy setup redirect.
- `tasks-final-visual-verification.json`: 44 final normal-font checks after wrapping long diagram labels. Scrolled each page's tables, diagrams and procedures; checked diagram text bounds and page overflow. Final review captures are viewport screenshots so off-screen reveal animations do not appear as blank space.
- Inspected source contact sheets in both languages, Arabic mobile page/flow/enlarged image and English desktop directory/model captures. Evidence is under `review/html/tasks-*.png`.
- An old preview watcher initially overwrote generated files using its cached renderer. Stopped that watcher and rebuilt with the updated renderer; the subsequent checks above passed.
