# Chapter 8, group `ai`: coverage

Environment: test2 only, 2026-11-01. Nothing was saved on either page.

## AI availability

Verified on test2:
- Page, both sections, all 15 places, the "Off by default" state of the Assistant, the member table and its columns.
- The member rules dialog opened from "Edit rules", then closed without saving. "Save" is disabled with no change.

Code only:
- Layer order (member rule, everyone rule, member's choice) and the default of "on": `common/aiPlaces.ts`.
- The "Everyone" toggle saves on click: `AiAvailabilitySettingsPage.tsx`, `handleOrganizationChange`.
- With several members only changed places are written: `aiAvailabilityUtils.ts`, `buildRulePatch`.
- Owner or organization-level admin only: `servers/ai-server/routes/aiPlaces.ts`, `servers/shared/organizationSettingsAccess.ts`.
- A member's switch disappearing in account settings: `src/components/Settings/AiPlaces/`. Not observed, because no rule was saved.

Sources: `src/components/Settings/AiAvailability/*`, `src/locales/ar.ts` and `en.ts` (`settings.aiAvailability`, `settings.aiPlaces`).

## AI limits

Verified on test2:
- Organization allowance, combined usage, usage by feature, bulk editor, status filter, member table and feature columns.
- "Apply limit" disabled with no selection. Nothing typed or saved.

Code only:
- Member usage charges the member's allowance; work without a member charges the organization: `servers/shared/aiUsage.ts`.
- Limit changes move "Remaining" by the difference; no job renews credit: `servers/ai-server/routes/aiLimitsSettings.ts`; a search of `remaining_credit_usd` across `servers`, `supabase` and scripts found no renewal.
- Low below 20% of the limit: `aiLimitUtils.ts`, `getAiLimitStatus`. Only "Available" was seen live on the organization row.
- New requests refused at zero: `ensureAiUsageAllowed`.
- Owner or organization-level admin only: `aiLimitsSettings.ts`.

Sources: `src/components/Settings/AiLimits/*`, `src/locales/ar.ts` and `en.ts`.

## UI text notes

- English place description reads "multilingual field" (Automatic translation): typo.
- The "Usage by feature" labels show raw forms such as "Form Script Helper:explain" and "Chat Record Draft:classify".
