# Chapter 8, group Organization: coverage

All facts checked 2026-11-01. Local checkout at `ea650ff825`; `git fetch origin production` failed (early EOF), so it could not be compared with the remote. Live text was compared with the code on test2 in both languages. Nothing on these four pages was saved on test2.

| Page | Verified on test2 | From code only | Sources |
| --- | --- | --- | --- |
| Organization settings | Every section, label and value in AR/EN; subdomain "available" badge; Save hero images disabled at rest | Effect of saving, redirect after a subdomain change, 5 MB and subdomain rules, which button saves what, use of week start, time zone and default language, owner-only card | `src/routes/settings/organization/index.lazy.tsx`, `src/components/Settings/Organization*Settings.tsx`, `src/utils/sidebarItems.tsx`, `src/locales/{ar,en,fileLimits*}.ts` |
| Notification defaults | Layout, channels, groups, levels, draft bar (one switch toggled, never saved); search returns nothing for Arabic words or visible names and works on English codes (`task`, `chat`, `signing`) | Precedence member > organization > catalog, conflict message, WhatsApp consent (UI note only), permission rule | `src/components/Settings/Notifications/*`, `servers/notifications/routes/organizationPreferences*.ts`, `servers/notifications/auth/permissions.ts`, `src/locales/ar.ts` |
| Export jobs | List, statuses, expired downloads disabled on all six rows, create window opened and closed | Creating, downloading, limits (25 types, 2 running, 100,000 rows, 15 days), Readable/Raw meaning, auto refresh. No export was triggered (forbidden) | `src/components/Settings/ExportJobs/*`, `servers/entities/exportJobsRoutes.ts`, `servers/shared/export-jobs/constants.ts`, `servers/shared/export-jobs/rows.ts` |
| Reports | All sections, labels and values; Save and Cancel disabled at rest | Saving, value ranges, channel blocking, help meanings, read-only message, week start source | `src/components/Builder/Reports/ReportsSettingsPage.tsx`, `src/components/Builder/Reports/sections/OutputsSend.tsx`, `src/components/Builder/Reports/locales/reportsBuilder.{ar,en}.ts`, `common/reportSettings.ts`, `servers/entities/reports/{routes,access,run/index}.ts` |

## Open issues
- Notification search: the placeholder promises tasks, chat, support, but the filter reads only group ids and event codes.
- Saving organization settings shows the `success.organizationCreated` text («تم إنشاء المنظمة بنجاح»), a wrong message that also uses «المنظمة». The guide says only "a success message". Code only.
- Saving a date-range export, the 100,000-row message and the failed-job retry were not exercised.
