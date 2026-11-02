# Chapter 8 — channels group coverage

Pages: email domains, email signatures, short link domains, WhatsApp accounts. Written 2026-11-01 against commit `ea650ff825`, level with `origin/production`.

**Live testing was read-only.** On test2 we opened pages, tabs and blank forms. No domain was added, verified or deleted, no signature was saved, published or assigned, no WhatsApp account was linked or changed, and nothing was sent. A check after capture showed the same state: no signature template (0 / 68 covered), short link domain still Pending, WhatsApp cards still 1 and 3, email domain still Active.

## Email domains (`/settings/email-domains`)

- **Verified on test2:** one Active domain, its records, and mixed record statuses, including Missing on an active domain.
- **Code only:** add, verify and delete; status path Pending → Verified → Active, or Error; verify checks the ownership TXT record only; delete shown only for Pending or Error; refusal of a domain held by another organization; active domains offered when creating hosted mailboxes; owner only.
- **Sources:** `src/routes/settings/email-domains/index.tsx`, `servers/email/routes/email-domains.ts`, `src/components/Workforce/Members/HostedEmailAccountsTab.tsx`, locales.

## Email signatures (`/settings/email-signatures`)

- **Verified on test2:** Templates (empty state), Assignment (empty, button disabled), Disclaimer, the personal page, and the designer on an unsaved local draft.
- **Code only:** publish, version, rule modes and first-match behaviour, history restore, test send, owner-only management, “Manage signatures…” in compose.
- **Not seen:** History with versions, a rule row, and the publish review dialog, because test2 has no template.
- **Sources:** `src/components/EmailSignatures/*`, `common/emailSignatures.ts`, `servers/email/signatures/repository.ts`.

## Short link domains (`/settings/short-link-domains`)

- **Verified on test2:** form and one Pending test domain with both record types (seen in the page text; the image stops above them).
- **Code only:** verify checks TXT only and sets Active or Error; delete sets Disabled; platform address used when no custom domain is active; the first active custom domain is used; owner only.
- **Sources:** `src/components/Settings/ShortLinkDomains/*`, `servers/entities/shortLinkDomainsRoutes.ts`, `servers/short-links/{create,domainSelection,repository}.ts`.

## WhatsApp accounts (`/settings/whatsapp-accounts`)

- **Verified on test2:** filters, health cards, the table, row action labels, the link window before starting.
- **Code only:** linking by QR or phone code, reconnect, disconnect, rename, delete, media panel, permissions. The link window does not create an account until its button is pressed, which was never done.
- **Sources:** `src/components/Settings/WhatsAppAccounts/*`, `src/components/WhatsApp/LinkWhatsAppDialog.tsx`, `src/locales/whatsappPairing.ts`, `src/locales/completion/source/*`, `servers/whatsapp/routes/accounts.ts`, `servers/whatsapp/permissions/service.ts`.

## Secrets and personal data in screenshots

Nothing is masked; each image is fitted so the value is out of frame.

- **Email domains:** the last DNS row holds the verification value. The image stops at row 7.
- **Short links:** the first DNS row holds it. The image stops at the domain’s buttons, so the records table is not pictured.
- **WhatsApp:** the table shows personal phone numbers. Both images search for `shared`, which leaves one account with no number. The account’s internal id stays visible.
- **Signature designer:** shows the test account’s name and a phone number, `+962 79 555 1234`, and another test member. Confirm this number is test data before release.

## Screenshots

9 shots in each language, recorded in `review/ch08-manifest-channels.json`. Every Arabic image was opened and checked. Of the English set, short links, WhatsApp (both), email domains, designer and personal signatures were opened; the other three share the same script and matched marker counts, but were not looked at individually.

## UI text problems and possible bugs

- Short link Delete only sets Disabled and the list query keeps it, so a deleted domain would return as “Disabled” after reload (code reading, not tested). The success message says it was deleted.
- A failed email domain verification saves status Error, but the page only updates the status on success, so the old status stays until reload (code reading).
- The Arabic signature strings use «منظمة» in places where the guide term is «المؤسسة».
- The WhatsApp page subtitle and button mix «WhatsApp» and «واتساب» in Arabic.
- The “Identity” column on the WhatsApp table is the bare word «هوية».
