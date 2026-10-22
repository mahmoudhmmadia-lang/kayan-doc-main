# Official Correspondence — stage 1

Date: 2026-10-21. Status: draft for review.

The user approved the recommended next app. The existing outline calls for
stage 1 first, followed by review before continuing. Chapter 7 contains the
overview and three dedicated pages in Arabic and English. Stages 2–6 remain
outlined, not implemented in the main guide.

| Page | Coverage | Source |
| --- | --- | --- |
| Home | Preparer, drafting reviewer, approver, recipient, registry clerk and administrator starting points | `src/utils/sidebarItems.tsx`, `src/components/OfficialCorrespondence/home/CorrespondenceHome.tsx` |
| Capacity | Position selection, single-position display, delegation indicator, separate registry/admin capabilities | `src/components/OfficialCorrespondence/CorrespondenceContext.tsx`, `shell/CorrespondenceAppBar.tsx` |
| Tray | Folders, search, quick filters, refresh, status/type/priority/confidentiality distinctions | `src/components/OfficialCorrespondence/tray/TrayPage.tsx`, `servers/entities/correspondence/repository/folders.ts` |

Exact UI labels come from `src/locales/officialCorrespondence/common{,.ar}.ts`
and `tray{,.ar}.ts`. The context, app bar, tray and those locale files were
compared with the available `origin/production` reference: no differences.
No application code was changed.

## Live test2 evidence

- Selected a second available position, confirmed its selected label, and
  restored the original position.
- Switched Inbox → Drafts → Inbox and checked the folder query parameter.
- Searched a unique absent phrase, confirmed the empty result, cleared the
  search and confirmed rows returned.
- Toggled Urgent, checked its query parameter, toggled it off, and clicked Refresh.
- Captured all three pages in Arabic and English at 2× with DOM markers;
  the capture manifest records their URLs, dimensions, dates and marker labels.
- The existing test draft visible in the capacity screenshot was not created
  or edited during this task. The training scenario remains separate from QA data.

Script: `tools/capture/inspect-correspondence.mjs`.
Results: `correspondence-product-verification.json`.
Captures: `tools/capture/shots-ch07.mjs` and `fullpage-manifest.json`.

## Verification limits

Composition, submission, drafting review, approval, signing, dispatch, registry
actions and delegation creation were not performed. No letters or messages
were sent. Delegation conditions and capability gating are source-backed;
the account's ability to switch positions does not verify every permission role.
Opening a letter can update its read state, and opening Home updates last-visit
preferences. These permitted test2 navigation effects are distinct from workflow
completion.

The guide build and 17 active source/web tests pass (two archived print tests
are skipped). Local browser results are recorded separately in
`correspondence-browser-verification.json`; the guide test does not constitute
verification of later product workflows. PDF, Word and Overleaf were not rebuilt.

All 32 combinations of four pages, two languages, two viewport sizes
(1440×900 and 390×844) and two themes passed. Checks exercised directory links,
search, language switching, completion persistence and image lightboxes, as well
as image decoding and horizontal overflow. Visual evidence is in
`review/html/correspondence-{ar,en}-{1440,390}-{dark,light}.png`.
