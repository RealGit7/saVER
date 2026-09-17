# Data and privacy guardrails

## Data zones

1. **Identity zone:** account identifiers, contact details, roles and consent records.
2. **Evidence zone:** private shelf-tag and receipt images, OCR text and review records.
3. **Canonical price zone:** verified product, quantity, store, date and price observations.
4. **Rewards zone:** append-only points earned, redeemed, adjusted and expired.
5. **Commercial analytics zone:** aggregated/de-identified price and promotion measures only.

Use separate credentials and permissions for each zone. A retailer must never be able to query the identity or evidence zones.

## Required governance gates

- Named Privacy Officer.
- Final public privacy notice and consent language.
- Privacy impact assessment.
- Overseas processor/transfer assessment.
- Approved retention and deletion schedule.
- Incident and breach-response procedure.
- Reviewer access policy and audit-log review.
- Minimum cohort and disclosure-risk rules for analytics.
- Written separation between paid offers and unbiased price rankings.

## Fraud controls

- Exact-image hash and likely-near-duplicate detection.
- Receipt number/store/date/total reuse signals.
- Impossible travel/location anomalies.
- Submission velocity limits.
- OCR confidence thresholds.
- Points remain pending until verification.
- Manual review and appeal path.

