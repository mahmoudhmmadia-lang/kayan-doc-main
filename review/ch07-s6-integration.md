# Chapter 7, stage 6: integration notes (App setup and mastery)

Source used: production copy `scratchpad/prod-src` (commit e8db3c79b0), per the coordinator's correction. Labels and behaviour first read from the stale local checkout were re-checked against it. Live evidence: test2.

Files: `chapters/07-correspondence-s6.tex`, `i18n/en/chapters/07-correspondence-s6.tex`, `tools/capture/shots-ch07-s6.mjs`, `figures/screens/ch07-settings-*-{ar,en}.png` (15 images per language), `review/manifest-ch07-s6.json`.

## Directory rows

Section label from `common.sections.admin`. `practice` is a guide page, not an app destination, so it has no section.

### Arabic
```tex
إعدادات المراسلات: الأنواع والمهل والترقيم — المتابعة والإدارة & تضبط أنواع الكتب ومهلها وسلاسل ترقيمها.\\
مكاتب الديوان وحقول السجل والتصنيفات — المتابعة والإدارة & تهيئ الديوان وما يُسجَّل في نافذة القيد، وتعرف أين تُضبط السرية.\\
الترويسات والأختام — المتابعة والإدارة & تحدد رأس الكتاب وتذييله والأختام المعتمدة واستخداماتها.\\
الجهات الخارجية والمخاطبة والتحويل الآلي — المتابعة والإدارة & تبني دليل الجهات، وتقيّد مخاطبتها، وتوجه ما يصل إلى الوحدة.\\
الأرشفة والتأشيرات والأداء والذكاء الاصطناعي والأدوار — المتابعة والإدارة & تضبط الحماية والأرشفة والقياس وحدود الذكاء الاصطناعي، وتفهم الصلاحيات الخاصة.\\
التمرين الختامي: من المسودة إلى الأرشيف & تراجع الإعدادات اللازمة، ثم تنفذ تمريناً مناسباً لدورك.\\
```

### English
```tex
Correspondence settings: types, deadlines and numbering — Oversight and administration & Set letter types, their deadlines and their number series.\\
Registry offices, register fields and classifications — Oversight and administration & Prepare the registry and the register dialog, and see where confidentiality is set.\\
Letterheads and stamps — Oversight and administration & Define the letter's header and footer, and the approved stamps and their uses.\\
External bodies, addressing and auto-forwarding — Oversight and administration & Build the directory, restrict who may write to whom, and route what reaches a unit.\\
Archiving, directives, performance, AI and roles — Oversight and administration & Set protection, archiving, measurement and AI limits, and understand the special permissions.\\
Final exercise: from draft to archive & Review the settings needed, then run an exercise suited to your role.\\
```

## Proposed "Chapter at a glance" idea

```js
// en
['Set the rules, then prove the path', 'An administrator reviews types, numbering, letterheads and permissions; each reader then runs a closing exercise for their role.', 'Horizon’s administrator checks the outgoing series, and Omar’s visit request then travels from draft to archive as HZN/2026/0012.', 'sec:correspondence-feature-settings-types', 'Official Correspondence › Oversight and administration › Correspondence settings'],
// ar
['اضبط القواعد ثم اختبر المسار', 'يراجع المسؤول الأنواع والترقيم والترويسات والصلاحيات، ثم ينفذ كل قارئ تمريناً ختامياً مناسباً لدوره.', 'يراجع مسؤول الأفق سلسلة الصادر، ثم ينتقل طلب الزيارة الذي أعده عمر من المسودة إلى الأرشيف برقم HZN/2026/0012.', 'sec:correspondence-feature-settings-types', 'المراسلات الرسمية › المتابعة والإدارة › إعدادات المراسلات'],
```

## Sources per page

All paths are under the production copy.

- Shared: `src/components/OfficialCorrespondence/settings/SettingsPage.tsx`; `src/locales/officialCorrespondence/settings{.ar,}.ts`, `common{.ar,}.ts`; `src/utils/sidebarItems.tsx` (entry `corrSettings`, no permission key, so the entry can show to non-administrators and the page guard returns them to the tray); `servers/entities/correspondence/service/settings.ts`.
- `settings-types`: `settings/TypesSection.tsx`, `TypeDialog.tsx`, `CalendarSection.tsx`, `PoliciesSection.tsx`, `NumberingSection.tsx`, `NumberFormatDialog.tsx`, `numberingFormat.ts`; server `service/letters.ts` (approval by someone other than the sender, fixed recipient), `service/deadlines.ts` (holiday recompute), `service/core.ts` (reopen window).
- `settings-registry`: `settings/OfficesSection.tsx`, `RegistryFieldsSection.tsx`, `ClassificationsSection.tsx`; server `authorization.ts` (`clerkOffices`: register permission plus a position in the office unit or its subtree), `service/classifications.ts`, `registryFields.ts`.
- `settings-templates`: `settings/TemplatesSection.tsx`, `TemplateEditor.tsx`, `UnitLetterheads.tsx`, `StampsSection.tsx`; `src/locales/officialCorrespondence/templates{.ar,}.ts`; server `service/stamps.ts`.
- `settings-bodies`: `settings/ExternalBodiesSection.tsx`, `AddressingSection.tsx`, `AutoForwardSection.tsx`; server `service/externalBodies.ts`, `service/autoForward.ts`.
- `settings-policies`: `settings/ArchiveSettingsSection.tsx`, `DirectivesSection.tsx`, `PerformanceSection.tsx`, `AiSection.tsx`, `RolesSection.tsx`; server `service/archive.ts`, `service/aiGate.ts`, `service/perfSettings.ts`, `performance/score.ts`.
- `practice`: this stage's pages plus the slugs of stages 2 to 5 (`compose`, `drafts`, `drafting-review`, `approvals`, `registry`, `outgoing-dispatch`, `reader`, `reply-complete`, `dossiers`, `archive`, `audit`).

## Live test2 evidence

Account acting as «موضع البيانات الوصفية لـ Codex»; the position selector was not changed. No setting was saved.

- Opened `/official-correspondence/settings` in Arabic and English and pressed all 15 section buttons. Each panel loaded with the content described.
- Opened and cancelled, confirming zero dialogs left open: edit letter type, new letter type, deadline policy, number pattern, new register field, new classification, new stamp, new body, new forwarding rule, link a mailbox. Their field labels match the page text.
- Observed test values: 10 letter types; 3 registry offices; one active deadline policy; working days Sunday to Thursday; protection limit 3 (Secret); AI limit 2 (Restricted); archive approval not required; two inactive forwarding rules; built-in directives in use.
- Observed disabled states: «دمج المكررات» before a selection, «إضافة مكتب» before a unit is chosen, «حفظ أيام العمل والعطل» before a change.

## Verification limits

Source-backed only, because settings are read-only on test2:

- Every save effect: new letters only, new deadlines only, numbers after saving, holiday recompute, merge, stamp version and disable, office activation, mailbox intake.
- Addressing refusal (`requireAddressable`) and auto-forward delivery (`applyAutoForwarding`) were read in server code, not exercised.
- AI limit enforcement (`aiGate.ts`) and archive approval flow were read in code, not exercised.
- The non-administrator notice and return to the tray were read in code. The test account holds the administer permission.
- «الإدارة لا تمنح الاطلاع على محتوى الكتب» is quoted as the app's card text in the roles note. `service/fileReads.ts` has an `administer` branch that was not traced, so the guide attributes the sentence to the card and does not assert it independently.
- `practice` was not run end to end; the workflow rows rely on stages 2 to 5.
- The prefix claim («لا تعتمد على البادئة لتغيير رقم الكتاب»): in the server `numberPrefix` is stored and passed only in `recordIssue/service.ts`; letter numbers follow office series formats. This is a code reading, not a live test.

## Mismatches between production copy and test2

- **Case intake rules not covered.** Production adds `caseIntake` «قواعد فتح المعاملات» to the nav, shown only while the `cases` module is on. test2 shows 15 sections and not this one, so per the coordinator's condition the guide does not describe it. Add it to `settings-registry` or `settings-policies` if an organization with the module on is available.
- **«الإصدار من السجلات» / “Issuing from records”.** Live in the type dialog on test2 (with a «جديد» badge). `TypeIssuePolicySection` and its locale are not in the production copy provided, so the table row uses only the labels shown live.
- Registry office names render as «ديوان asd», which matches production's new `officeName` label.

## Scope adjustments to the brief

- The brief's «الدواوين» is shown in the UI as «مكاتب الديوان»; the guide uses the UI label. «الدواوين» survives only as a classification column and field.
- No section edits confidentiality levels. `settings-registry` carries a table of where the levels are used instead.
- There is no "policies" section. Deadline policies live in «المهل والعطل» and are covered on `settings-types`; `settings-policies` says so and links there.
- `practice` has a diagram and no screenshot; the diagram has a `\shotnote`, uses generic roles and stays free of Horizon names.

## Screens not captured

- `practice`: none needed, the diagram replaces it.
- No dialog screenshots: the type, stamp and forwarding dialogs embed a long live position list with real-looking names, so their fields are documented in tables and steps.
- `ch07-settings-bodies-addressing` is deliberately cut to the first units; the full list runs to about 5200 px. The caption and note say so.

## Arabic UI label observations

- `numbering.description`: «ولكل جهة سلسلتها», although series belong to each registry office, and it names «كيان» to end users.
- The UI uses «الجهة» for the organization, while the guide's term is «المؤسسة». Quoted labels are kept as shown.
- Roles cards print raw permission keys (`official_correspondence.register`). They appear in the screenshot; the page text does not repeat them.
- «السلالم» in the issue policy label is unclear to a beginner.
- `roles.administer.chips` lists only five sections of the fifteen.
