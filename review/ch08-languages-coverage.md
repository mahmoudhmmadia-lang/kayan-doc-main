# Chapter 8, group `languages`: coverage

Environment: test2 only, 2026-11-01.

## Languages

Verified on test2:
- Active and inactive lists, row columns, the add dialog (opened and closed without saving).
- Multi-language fields in other dialogs showed EN, AR and TR tabs, matching the active list.

Code only:
- Active codes feed multi-language fields: `src/providers/AppLanguagesProvider.tsx`.
- Active languages listed in organization settings: `src/routes/settings/organization/index.lazy.tsx`.
- Interface locales are fixed in the app (`SUPPORTED_LOCALES`), so adding a language does not translate the interface.
- Duplicate code check and required fields: `Languages/utils/languages.schema.ts`, `LanguagesForm.tsx`.
- Edit and delete are not run. The delete action has a confirmation and no in-use check in the client.

Sources: `src/components/Languages/*`, `common/languageCode.ts`, `common/locales/ar.ts`, `src/locales/ar.ts`.

## Currencies

Verified on test2:
- All five tabs and all four "Money settings" sections, base lock chip, rate history, bulletin list, rate type list. Nothing saved or changed.

Code only:
- Currency dialog tabs and rules, denominations: `Money/currencies/CurrencyDialog.tsx`, `Money/denominations/`, `locales/money.en.ts`.
- Rates: the add and correct dialogs, bulletin publish and revision: `Money/rates/`, `Money/bulletins/`, `locales/moneyRates.*`, `locales/moneyBulletins.*`. No rate, bulletin or rate type was created.
- Money settings written by owners and administrators only: header of `Money/settings/MoneySettingsTab.tsx`, `money.errors.forbidden`.
- Override permission on the record type: `money.settings.overrideAllowedHint`.

Sources: `src/components/Money/**`, `src/routes/settings/currencies/index.tsx`.

## Units of measurement

Live flow on test2 (English interface), passed:
1. Created group "Guide QA packs" with type "No conversion". The key filled from the name. Message "Created successfully!".
2. Added unit "Guide QA carton" from the group menu. The key filled from the name.
3. Reloaded the page: the unit stayed. Reopened it: "Key" disabled and "Words for printing" section present.
4. Deleted the unit (confirmation text as in locale), "Deleted successfully!".
5. Deleted the group (confirmation text as in locale).
6. Reloaded: no "Guide QA" text remains.

Code only:
- Group type and base unit fixed, built-in rules, used-unit locks, refusals: `src/locales/measurementUnits.*`, `MeasurementUnits/*`.
- Convert groups and "Factor and offset" not exercised; the live flow used a "No conversion" group.
- Import dialog not opened.

## UI text notes

- "Make inactive" in English is «إخفاء» (Hide) in Arabic.
- English chips are title-cased on screen: "Built In", "Added By The Organisation"; the locale value is sentence case.
- "Organisation" in the units page against "Organization" elsewhere.
- Arabic chip «مقفلة · 9 مبلغاً له مكافئ بـSYP» reads awkwardly.
- "Custom code" conversion is shown but disabled ("arrives in a later update").
