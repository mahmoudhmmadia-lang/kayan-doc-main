# Builder — chapter 6 review record

The user asked on 2026-10-18 to add Builder in phases, with a structure of my
choosing that follows the existing rules and design. On 2026-10-19 they asked to
start and write Phase 1, then on the same day to finish all phases and explain the app as simply and fully as possible. Status: all phases drafted for review (overview plus 25 pages).

## Phase plan

| Phase | Pages | Status |
| --- | --- | --- |
| 1 | Overview (`c6.html`), Entities, Fields, Record page, Lists & views, Review & publish | Draft for review |
| 2 | Rules, Access, Actions & automations, Movement, Advanced, Apps & Navigation, Work navigation | Draft for review |
| 3 | Forms, Services, Internal SOPs, SOPs, Bots | Draft for review |
| 4 | DOCX templates, XLSX templates, Print templates, Identities & letterheads | Draft for review |
| 5 | Dashboards, Pages, AI Dashboards, AI Reports | Draft for review |

Status templates and Task settings sit in Builder › Core but are already
explained in chapter 4 (`tasks-statuses.html`, `tasks-settings.html`); the
overview links to them. Builder Agent is excluded: it is shown only when an env
flag is on and the member's email domain is allow-listed (production:
`rightcode.io` only), so it is not a customer feature.

## Source coverage (Phase 1)

- Navigation and permissions: `src/utils/sidebarItems.tsx` (Builder › Core,
  per-item permission keys); `common/seatPolicy.ts` (employee seats blocked from
  Builder, `/entities`, `/forms`, `/bots`, `/sop`).
- Entities list: `src/components/EntityBuilder/EntityPage/` (search, App / App
  Section filters, AI Entity Builder, View ERD Diagram, Add Entity).
- Classic create page: `CreateUpdateEntityComponent.tsx`, `EntityBuilderHeader.tsx`
  (title required to enable “Create Entity”, settings dialog holds app/section),
  `EntityBuilderConnect.ts` (`main.createEntity` creates the definition and
  navigates back to `/entities`).
- Builder workspace: `workspace/BuilderWorkspaceContext.tsx` (sections: overview,
  fields, recordPage, lists, rules, access, movement, actions, advanced),
  `workspace/sections/BuilderListsViews.tsx`, review dialog
  `workspace/review/ReviewPublishDialog.tsx`; copy in
  `src/components/EntityBuilder/locales/entityBuilder.{en,ar}.ts`.
- Field types: `getEntityFieldType.tsx`; labels `entities.types.*` in
  `src/locales/{en,ar}.ts`; `form_session` and `json` hidden from the menu.
- View modes: `src/components/Entities/entityTableViewMode.ts`
  (`getAvailableEntityTableViewModes`): table, cards, list always; kanban,
  calendar, timeline, gallery, map, tree only with a suitable binding.

UI note: the Arabic interface labels the app «ادوات البناء» and the create
button «انشاء كيان» (no hamza). The guide quotes them exactly as shown; the
chapter title uses the correct spelling «أدوات البناء».

## Source coverage (Phases 2–5)

- Workspace sections: `workspace/sections/rules`, `access`, `movement`, `BuilderActions.tsx`,
  `automations`, `BuilderAdvanced.tsx`; copy in `entityBuilder.{en,ar}.ts`, `movements.*.ts`,
  `capacityRulesV2*.ts`. Status locks live on the status field (Fields), unique values in
  Advanced; only the "Forms that write here" card in Access applies immediately.
- Navigation: `src/components/Builder/NavigationBuilder/`; work navigation `workNavigationG*`.
- Forms: `src/components/Forms/` (list, builder rail, records, journey, publishing, test
  workspace); Services: `src/components/Services/`; Internal SOPs: `src/components/InternalSop/`;
  SOPs: `src/routes/sop/` (embedded Activepieces) and `docs/build/automations-*.mdx`;
  Bots: `src/components/Bots/` (linked-SOP keys exist but are not rendered).
- Templates: DOCX/XLSX pages and `servers/docx`, `servers/xlsx/adminAccess.ts` (Builder
  administration needed to manage templates); tag syntax from `docs/build/*template*.mdx`.
  Print templates and identities: `src/components/PrintTemplates/`.
- Dashboards: `DashboardsListPage`, builder and viewer; Pages: `AppPages/`;
  AI Dashboards/Reports: DB Genie embed, access in `common/dbgenieAccess.ts`.

UI copy issues noticed (not changed): several Arabic strings are untranslated or
garbled (DOCX test overrides, a Vietnamese fragment in a dashboard tooltip fallback),
Arabic uses both «لوحات المعلومات» and «لوحة التحكم», and the internal SOP approval page
labels "Any approver" as «موافق نهائي» and "Due" as «مدة». The guide avoids quoting these.

## Test2 observations (2026-10-18)

- Confirmed on test2 with the repository test account: Entities, Forms,
  Internal SOPs (page title “SOPs”), Dashboards, Pages, DOCX/XLSX/Print
  templates, Identities & letterheads, Services, Work navigation, AI
  Dashboards and Bots open and show their main controls.
- `/sop` shows an empty embedded automations frame; Apps & Navigation crashed
  the headless tab twice and needs a retry. `/builder` alone is not a page.
- The classic “Add Entity” page was opened (title, first field, Add New Field,
  Create Entity). No record type was created and nothing was saved.
- test2 is slow: the first page can take 1–3 minutes; in-app navigation after
  that is fast.

## Explicit verification limits and remaining work

- Superseded on 2026-10-19: numbered screenshots were captured and added (see below). Needed: Entities list (filtered), Add Entity page, and the
  workspace sections Overview, Fields, Record page, Lists & views and the
  review dialog, in Arabic and English at 2×, recorded in
  `fullpage-manifest.json`.
- Creating, publishing, restoring a version and creating a record were not
  exercised on test2; these steps are source-backed. Planned check: create a
  clearly named QA record type, add fields, publish, create and reopen a record.
- The Horizon “Visit requests” example is fictional and does not exist on test2.


## Verification completed (2026-10-19)

**End-to-end test on test2 (passed).**
1. Created record type `guide_qa_visit_requests` ("Guide QA Visit requests", app Misc › Misc)
   from Entities › Add Entity; the app/section settings dialog was required. Toast: "Created
   successfully!". In the Arabic interface its name appears auto-translated as
   «طلبات زيارة ضمان الجودة للمرشد».
2. Opened it in the Builder workspace; Overview, sections and "Published · no unpublished changes"
   matched the guide.
3. Added a Date field "Visit date" in Fields; the header switched to "Draft · 1 unpublished
   change" and "Review & publish · 1".
4. Review dialog matched the guide (Review changes, Version history, Discard draft, Publish N
   changes). "Discard draft" restored "Published · no unpublished changes". Then published:
   "Published as version 2." (a type created in the classic page reports "No versions yet. The
   first publish saves one.").
5. The list `/apps/misc/misc/guide_qa_visit_requests` offered Table, Cards, Calendar and List —
   Calendar appeared because of the date field, as the Lists page states.
6. Created a record (text + Visit date 15 Oct 2026): "Created successfully!". Reopened it in a
   separate browser session: text and "Visit date 15 Oct 2026" were saved.

**Finding (possible product issue).** In a fresh single session, the first edit to that type's
draft showed "Someone else changed this draft" although no one else was editing (earlier test
sessions had saved the draft). Saves stalled on "saving…" until "Overwrite with mine" was used;
publishing then succeeded. Worth checking draft revision handling.

**New section found during testing.** The workspace now has an Import section
(`sections/importKeys`, added to the code on 2026-10-19) between Actions & automations and
Advanced. A dedicated guide page (`builder-import.html`) was added in both languages.

**Numbered screenshots.** 52 captures (26 pages × AR/EN) at 1440px and 2×, sized to content,
with numbered markers drawn on the live page before capture; markers are recorded under
`marks` in `fullpage-manifest.json`. The SOPs page has no screenshot because the embedded
automation studio rendered empty on test2. Each note explains the image and keys every number.
A test checks that every Builder screenshot's key lists exactly its recorded markers.

**Guide checks.** HTML build passed; 14 active tests passed (2 archived print tests skipped).
Browser: 216 cases (27 pages × AR/EN × 1440/390 × dark/light) — no overflow, no script errors,
correct direction, example before first figure, every image loaded, every figure explained;
card navigation, mark-as-done, language switch, search and the image lightbox verified.

**Test data left on test2 (test organization, allowed).** Record type `guide_qa_visit_requests`
(version 2, fields "Field 1" and "Visit date") and one record "Guide QA visit — Aleppo branch".
