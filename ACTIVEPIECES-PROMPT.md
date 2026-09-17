# Prompt for Activepieces

You are helping implement **Bermuda Saver**, a privacy-first consumer price intelligence platform for Bermuda. Its product modules are Price Watch, the Bermuda Price Index, receipt scanning, community shelf-price submissions, Saver Points, dynamic retailer offers, a consumer Saver Agent, and a protected commercial analytics portal.

Inspect every file in this uploaded bundle before proposing or creating flows. Treat `workflow-specifications.md` and `workflow-editor.html` as design references. They are not native Activepieces exports. Treat `site-source/` as the current prototype and API/data-contract reference.

## Your task

Recreate the specified processes as native Activepieces flows and reusable subflows. Begin in draft/development mode. Do not publish, connect production credentials, delete data, or process real receipts without explicit approval.

For each flow:

1. Give it a stable `BS-XX — Name` title.
2. Define its trigger, actions, branches, inputs and outputs.
3. Use reusable subflows for authentication, consent checking, audit logging, notifications, human review and error handling.
4. Specify required secrets and connections without inventing their values.
5. Add retries, timeouts, idempotency keys, structured errors and a dead-letter/manual-review path.
6. Record a correlation ID, workflow version, timestamps and decision reasons for every run.
7. Provide synthetic test cases for success, duplicate, malformed input, low-confidence OCR, privacy denial and downstream outage.
8. Show which steps require a custom Activepieces Piece or an HTTP call to a Bermuda Saver API.

## Required flows

- `BS-01 — Identity and PIPA consent`
- `BS-02 — Shelf-price submission`
- `BS-03 — Receipt scanning and extraction`
- `BS-04 — Observation verification and rewards`
- `BS-05 — Retailer online-price collection`
- `BS-06 — Price Watch publication`
- `BS-07 — Bermuda Price Index calculation`
- `BS-08 — Saver Agent questions and alerts`
- `BS-09 — Retailer registration and offer publishing`
- `BS-10 — Offer eligibility and redemption`
- `BS-11 — De-identified analytics products`
- `BS-12 — PIPA rights, retention and deletion`
- `BS-99 — Shared error handling and operational alerts`

## Non-negotiable privacy rules

- Check purpose and permission before retrieving identifiable shopping history.
- Minimise collection and separate account identity from receipt/price datasets.
- Keep raw receipt images private and encrypted with restricted access.
- Prompt shoppers to cover payment-card details and unrelated personal information.
- Hash receipt images before OCR to detect exact duplicate submissions.
- Never expose identifiable shopper histories, receipt images, email addresses, precise locations or what3words addresses to retailers or commercial analytics customers.
- Commercial outputs must use aggregated or appropriately de-identified data and minimum cohort thresholds.
- Record consent version, purpose, time and withdrawal status.
- Apply configurable retention and deletion schedules; do not hard-code a legal retention period.
- Provide access, correction, export, consent-withdrawal and deletion workflows.
- Log overseas processors and data transfers for privacy assessment.
- Send privacy-impacting changes to a named human approver before publication.

## Agent rules

- Ground consumer answers only in verified, source-linked prices.
- Cite retailer/source and observation date in answers.
- State when coverage is insufficient; never invent a price or saving.
- Recommendations must not rank a retailer more favourably because it funds an offer.
- Personalisation is opt-in and must stop after withdrawal.
- Keep prompts free of unnecessary identity and precise-location data.

## Receipt-processing outputs

Return structured JSON containing: retailer candidate, store candidate, transaction date/time, receipt number if present, currency, subtotal, tax, discounts, total, line items, quantities, unit prices, category candidates, confidence per field, warnings, duplicate status and review reason. Preserve the raw OCR output separately from verified canonical data.

## Delivery format

First produce:

1. A dependency and credentials checklist.
2. A flow-by-flow implementation plan.
3. A proposed environment separation: development, staging and production.
4. A list of custom Pieces/APIs required.
5. The first three draft flows only: BS-01, BS-02 and BS-03.

Stop for review after those three flows. Do not silently simplify privacy controls. Flag ambiguities and recommend the safest reversible choice.

