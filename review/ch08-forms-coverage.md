# Chapter 8, group Forms: coverage

All facts checked 2026-11-01. Same checkout note as `ch08-organization-coverage.md`. Publishing and form-assignment settings were opened and drafted in the browser, never saved. Drafts were dropped by leaving the page.

| Page | Verified on test2 | From code only | Sources |
| --- | --- | --- | --- |
| Publishing & approval | Three tabs in AR/EN; all labels; validation warnings and disabled Save on a draft with an empty stage; "For some types" draft reveals fields; procedure card policy is on in test2 | Saved behaviour, publish request path, emergency flow, breaking-change definition, stage limit, who sees what, overrides | `src/components/Settings/PublishingApprovalPage.tsx`, `src/components/Settings/publishingApproval/*`, `src/components/Forms/publishing/PublishingStagesEditor.tsx`, `src/components/Forms/publishing/locales/formPublishing.{ar,en}.ts`, `src/locales/recordTypeChanges*.ts`, `src/components/Procedures/locales/*`, `common/formPublishChanges.ts` |
| Form assignments | All labels; all seven days on; cap 0; ladder draft starts from the built-in steps; bar shows 13 active plans | Saving, limits (8 steps, 60 days, cap 500), audience meanings, plans keeping their own steps | `src/components/FormAssignments/AssignmentDefaultsPage.tsx`, `src/components/FormAssignments/ReminderLadderEditor.tsx`, `src/locales/assignmentDefaults*.ts`, `src/locales/assignmentsHub*.ts`, `common/assignmentDefaults.ts` |
| Check categories | Real create, reopen, delete with `Guide QA category`: saved, still there after reload with the starting colour Amber, removed with no confirmation, list back to the original four after reload. Save disabled at rest and on an unnamed new row, enabled once named (draft, not saved) | 80 and 50 limits, rename keeping stored groups, a deleted category staying on a rule, who can edit, the "Saved." toast text | `src/components/Settings/CheckCategoriesPage.tsx`, `common/formQualityChecks.ts`, `servers/forms/qualityChecks/{categories,routes}.ts`, `src/components/Forms/logic/FormCheckHandling.tsx` |

## Open issues
- Procedure cards tab shows `card owner`, `+ owner`, `+ expert` in both languages. The translation key holds a colon (`tokens.card:owner`), which i18next reads as a namespace separator. The guide describes the buttons as shown.
- Procedure cards tab: "who may publish in an emergency" is a raw text box of selector tokens, unlike the Forms tab picker. Code only; not explained in the guide.
- Arabic plural errors on Form assignments: «13 خطط نشطة», and in Reports «10 دقيقة».
- No form was published under a policy, so the approval path is source-backed. See the correspondence and Builder chapters for form publishing.
