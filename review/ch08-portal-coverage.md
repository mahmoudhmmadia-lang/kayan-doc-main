# Chapter 8 — portal group coverage

Pages: public portal, portal content, applicant accounts, messages. Written 2026-11-01 against commit `ea650ff825`, level with `origin/production`.

**Live testing was read-only.** On test2 we opened pages, switched tabs and opened blank forms. Nothing was saved, published, sent or deleted. A check after capture showed the announcement count unchanged (2). Save, publish, delete and send outcomes below come from code only.

## Public portal (`/settings/public-portal`)

- **Verified on test2:** all five tabs and their labels in both languages; live preview beside the panel; publish disabled with no edits; the Spaces list and its one published test space.
- **Code only:** publish behaviour and the “Saved” status; the incomplete-link error moving to Contact; preview “Edit” jump; limits (5 MB image, 5 search examples, 4 popular services, 4 footer groups, 8 links, 8 social links); owner/administrator access; separate spaces permission.
- **Not opened:** the space editor, because it autosaves. Its ten section names come from locales only.
- **Sources:** `src/components/Settings/PublicPortalSettingsPage.tsx`, `src/components/Settings/publicPortal/*`, `common/publicPortalSettings.ts`, `servers/entities/publicPortalSettingsRoutes.ts`, `servers/entities/partySpaces/access.ts`, `src/locales/{ar,en}.ts`, `spaces/locales/partySpaces.{ar,en}.ts`.

## Portal content (`/settings/public-portal/content`)

- **Verified on test2:** four tabs, columns and counts; the blank “Add announcement” form, opened and left unsaved.
- **Code only:** other editors (audience, page, FAQ); save, delete and discard prompt; immediate effect of switches; scope and placement behaviour; owner/administrator access.
- **Sources:** `src/components/Settings/PortalContentPage.tsx`, `publicPortal/PortalContentDrawer.tsx`, `common/portalContent.ts`, `servers/entities/publicPortalContentRoutes.ts`, locales.

## Applicant accounts (`/settings/applicant-profile`, `/settings/company-profile`)

- **Verified on test2:** fields table, sign-up preview, empty levels, blank field form (opened, not saved); Company view with its review queue.
- **Code only:** allowed required-at and verification options per field; drag order saving at once; level delete with no confirmation; deleted field keeping values; company save; owner/administrator access.
- **Note:** Company is reached from the “Person / Company” switch; it has no Settings card of its own, so it is covered on this page.
- **Sources:** `src/components/Settings/applicantProfile/*`, `companyProfile/*`, `common/applicantProfile.ts`, `common/companyProfile.ts`, `servers/entities/applicantProfileSettingsRoutes.ts`, locales.

## Messages (`/settings/messages`)

- **Verified on test2:** applicant events (19), follow-up templates, channels and rules, log with Sent and Skipped rows and reasons.
- **Code only:** saving; test email (never pressed, it sends real mail); template draft and Meta approval path; quiet hours, fallback and retention behaviour (from in-app help text); retry; limited access through the template and log permissions.
- **Sources:** `src/components/Settings/ApplicantMessagesPage.tsx`, `applicantMessages/*`, `messages/*`, `messages/locales/followUpMessages.*`, `messagingHelp.*`, `servers/forms/applicantMessages/routes.ts`.

## Screenshots

16 shots in each language, recorded in `review/ch08-manifest-portal.json`. Every Arabic image was opened and checked. Of the English set, Spaces, Channels, Company, the field form, Applicant events and the announcement form were opened; the rest share the same script and matched marker counts, but were not looked at individually. The log image stops at row 9 to stay readable. Page text shows the account name “Mahmoud Masri” as last editor.

## UI text problems found

- Log status notes stay English in Arabic: “no e-mail”, “no number”.
- Log template column shows raw keys such as `party_space.confirmation_requested`.
- Follow-up “last updated” shows a raw member id (`t2_wpx_…`).
- Channels shows internal phases (“لاحقاً P5”, “Later P4”) and “الرد إلى دون عنوان للرد” / “reply-to no reply-to”.
- The chip “موجود” / “exists” beside Channels has no clear meaning.
- The applicant is named three ways: «المتعامل», «المراجع», «مقدّم الطلب».
- SMS has two Arabic names: «رسالة نصية», «رسائل SMS».
- A brand-new announcement shows “Unsaved changes” before any edit.
- Deleting a verification level has no confirmation, unlike deleting a field.
