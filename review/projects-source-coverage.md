# Projects & planning — chapter 5 review record

Outline approved by the user on 2026-10-18. Scope: Arabic and English HTML in the
existing guide, preserving its design, responsibilities, and Horizon example.
Status: draft for review. No later app or print output was started.

## Source coverage

The overview links 82 dedicated explanations, grouped by business work. Six are
main navigation pages: Plans, Projects, Portfolios, Programs, Budgets, and Cost
Categories. Other explanations describe related records inside their parent
workflows, not additional menu entries. Source tab definitions include conditional
sections; their presence is not a promise that every profile shows every tab.

`projects-source-inventory.json` records each source file, parent, relation tab,
required/conditional fields, and covered children. Core references:

- `scripts/seed-entities/apps-config.ts`: app sections.
- `scripts/seed-entities/entities/plans.ts`, `plansConfig.ts`: plan fields and tabs.
- `common/planningProfiles.ts`, `planningPolicy.ts`, `planningJourneyProfiles.ts`:
  plan taxonomy, visibility, and lifecycle restrictions.
- `scripts/seed-entities/entities/pm_projects.ts`, `pmProjectConditions.ts`:
  charter/setup gating, delivery approach, and specialized section visibility.
- Related `planning_*.ts`, `pm_*.ts`, and `performance_indicators.ts` definitions:
  required fields, optional relationships, parent context, and embedded records.

Hidden legacy projects/budgets and the separate legacy charter model are excluded.
Current charter fields are explained on Projects. Generic logframe entries have
no exposed inverse-tab route; typed goal/outcome/output/activity records are
explained instead. Sprint ceremonies were excluded after review because the source
did not establish an exposed entry point. Scope does not extend into separate HR,
asset, or funding apps merely because a plan can reference their data.

## Test2 observations

- Used only test2 and the repository test account. No messages, notifications,
  requests to colleagues, shared role changes, or approval actions were sent.
- Confirmed all six primary cards on the Projects landing page. My projects,
  Overdue projects, and All projects are saved views of the same Projects entity.
- Captured the app directory, the initial Plans/Portfolios/Programs/Budgets forms,
  and all three initially visible project setup tabs in both interface languages
  at 2× resolution. Forms are unsaved, except for the explicitly identified QA
  cost category. Sources were inspected; provenance is in `fullpage-manifest.json`.
- A new plan initially exposes Plan Category. Other inputs appear progressively;
  absence of a text input at this stage is expected, not a failed page load.
- The new-project form exposes Overview, Charter, and Framework. Source checks
  establish approval/setup conditions for later tabs. These conditions were not
  bypassed to obtain screenshots.
- Created cost category `GUIDE-QA-20261018`, name `Guide QA — Visit transport`, type
  Travel, active. The UI confirmed creation. Opened the resulting URL in a separate
  authenticated Arabic browser session and confirmed the same code, name, and
  Travel type. That QA record remains in test2. It is not a Horizon record.
- Live cost-category fields appear under Overview; a source-defined Defaults tab
  is not exposed in that state. The guide does not instruct readers to open it.
- Several test2 navigations took a long time to load. Waited for actual controls
  and content rather than capturing loading screens. A capture wait was corrected
  to allow the plan's legitimate category-only initial state.

## Explicit verification limits and remaining work

The draft's supporting-record explanations are based on the current source.
Specialist parent/child creation, project/plan lifecycle transitions, charter
approval, budget approval, expenditure/payment, indicator measurements, gate
decisions, and role isolation were not exercised. Do not claim end-to-end coverage
of those operations. Source profile/tab inventories still need comparison with
configured live records of the appropriate types.

Main forms and initial project tabs have screenshots; the other record pages use
source-backed relationship diagrams. Captures of their populated records and all
conditional tabs remain outstanding. This is a reviewable chapter draft, not a
claim that the guide's full specialist screenshot requirement has been met.

## Guide verification

Build: `node tools/build.mjs --html-only` from the guide directory.
Automated checks: `node --test tools/guide.test.mjs` (web/source checks; archived
print checks skipped). The new check covers the six main entries, every new route,
parent links, directory cards, search data, examples, progress, and language links.

Real local-browser checks are recorded in `projects-browser-verification.json`:
both languages, 1440×900 and 390×844, dark/light, loaded media, figure notes, no
horizontal overflow, directory navigation, search results, reading-progress
persistence, language switching, and the Tasks-to-Projects handoff. Final visual
evidence lives under `review/html/projects-*.png`.
