# Chapter 8 — access group: coverage

Pages: Roles, Two-step verification, Sessions & devices, Member Keys, Issue Enrollment Token, Audit Log, API & integrations.

Sources were read from `origin/production` (the local checkout was 94 commits behind on 2026-11-01), exported to a scratch folder: `src/components/Settings`, `src/components/Roles`, `src/components/Profile/SignatureManagementPage.tsx`, `src/locales`, `common/twoFactorPolicy.ts`, `common/sessionPolicy.ts`, `common/roleVerbDependencies.ts`, `servers/auth/twoFactor`, `servers/shared/organizationSettingsAccess.ts`, `servers/member-keys/memberKeysRoutes.ts`, `servers/member-keys/memberKeysCrypto.ts`, `docs/admin/{roles-and-scopes,member-keys-and-signatures,api-tokens-and-public-api}.mdx`.

Safety: nothing was saved on two-step, sessions, member keys or the API policy. No enrollment token, API token or service account was created, and no key, session or token was revoked. On the key pages the test account was chosen in the member picker, which only reads; «إلغاء» was never pressed.

| Page | Verified live on test2 | From code or docs only | Sources |
| --- | --- | --- | --- |
| Roles | Page loads, groups collapsed except on press. Full flow on throwaway unassigned roles named `Guide QA <timestamp>`: create (code generated from title), switch «يمكن اختياره كجمهور» on by default, turning it off persists after reopen, grant «Open» on Announcements (also turns on «List», the group switch shows on), save toast “Updated successfully!”, reopen keeps both, «Assignees» empty, delete with confirmation, redirect to the list, Organizations back to 19. Grants page read only. | Assignee writes save immediately; duplicate; debug and explain-access menu; assign-to-creator and specifier fields (non-organization scopes); records filter; locked roles; grant guard behaviour; a position assignment reaching its holder. | `RolesForm`, `RoleHeader`, `CreateRoleDialog`, `RolesSettingsTabs`, `RoleAudienceSwitch`, `RoleGrantSettingsPage`, `roles-and-scopes.mdx` |
| Two-step | Page, current values (off, 14 days, both methods, 30 days) and enrollment 0 of 31, read only. | Everything that follows a save: requirement, grace counting, forced setup, reminders, member reset, the pending list. Who may open: owner or Administrator role. | `TwoStepVerificationSettingsPage`, `servers/auth/twoFactor/{service,store}.ts`, `common/twoFactorPolicy.ts` |
| Sessions | Page, current values and the member summary, read only. | Option ranges (`common/sessionPolicy.ts`), enforcement, alerts, sign out everyone and its confirmation. Who may open: owner or Administrator role. | `SessionPolicySettingsPage`, `common/sessionPolicy.ts`, `deviceManagement.*` locales |
| Member Keys | Empty state, then the test account's one active key after choosing it. Its 12 keys in all three statuses seen on «إدارة التوقيع». | Revoke and its effect. The active-only list comes from the server query (`activeOnly: true`) and matches what test2 shows. | `MemberKeysSettingsPage`, `MemberKeyPublicCredentialRow`, `memberKeysRoutes.ts`, `member-keys-and-signatures.mdx` |
| Issue Enrollment Token | Page, the disabled create button, and the member page «إدارة التوقيع» with «إنشاء توقيع». The audit log shows a past created, completed and superseded sequence for the test account. | Issuing, 15 minutes and one use, the four enrollment steps, the PIN rules. | `AdminEnrollmentPanel`, `MemberKeyCreateDialog`, `memberKeysRoutes.ts`, `memberPinPolicy` |
| Audit Log | Real events for the test account, newest first, with their columns. | 100-event limit, five attempts and 30-minute lock, the “Unlock Locked” label (derived from the code; no lockout event was seen). | `MemberKeyAuditSettingsPage`, `MemberKeyAuditLog`, `memberKeysCrypto.ts` |
| API & integrations | All four tabs, read only; the create wizard's first step opened and closed. | Wizard steps two and three, rotate, revoke, policy effects, token page details, who sees each tab. | `ApiIntegrationsPage`, `ApiPolicyPanel`, `ApiTokenCreateWizard`, `TokenExpiryPicker`, `apiIntegrationsTabs`, `apiIntegrations.*` locales, `api-tokens-and-public-api.mdx` |

Screens not captured on purpose: any issued token, any API token dialog after creation, the sign-out-everyone confirmation, wizard steps two and three. Audit rows are cut to the first four so no public IP address appears.

Fictional only: «منسق الزيارات» / “Visit coordinator” is a role name used in the Horizon example, not a test2 record.

Open oddity: on test2, key `abG3…` shows Active although the log records it superseded on 10/29, and no code path found reactivates a superseded key.

Role runs on test2: four throwaway roles were created and all were deleted (`guide_qa_1793528866105`, `guide_qa_1793529256857`, `guide_qa_1793529375402`, `guide_qa_1793529449139`). None was assigned to anyone. The first stayed about five minutes because the script's delete step failed; it was then deleted. The organization role group is back to 19, the same as before the runs. No existing role was changed.

Screenshots show public key identifiers, token endings (for example `…3fca6e`), an enrollment record id in the audit Details column, the test account's email and internal addresses. None of these is a secret. Lower audit rows were left out because they carry a public IP address.
