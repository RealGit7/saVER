# Workflow specifications

## BS-01 — Identity and PIPA consent

Visit → sign in/register → show versioned privacy notice → choose required and optional purposes → record consent → create profile → assign shopper or verified-retailer role → expose privacy controls.

## BS-02 — Shelf-price submission

Authenticated request → capture tag photo → store/category selection → optional GPS/what3words → private upload → extraction → duplicate/anomaly checks → human verification → canonical observation → points pending → points confirmed.

## BS-03 — Receipt scanning and extraction

Authenticated request → redaction reminder → private upload → SHA-256 duplicate check → OCR → store/date/total extraction → line-item extraction → product/category matching → fraud score → human review when required → de-identified price observations → retention rule → points.

## BS-04 — Verification and rewards

Pending observation → source/image checks → confidence rules → reviewer decision → publish/reject → immutable audit reason → points ledger entry → contributor notification.

## BS-05 — Retailer online-price collection

Schedule → retailer adapter → public catalogue fetch → parse → unit/category normalisation → prior-snapshot comparison → anomaly checks → QA → source-linked observation → collector-run report.

## BS-06 — Price Watch publication

Verified observation → freshness check → product/store grouping → lowest/range calculations → provenance attachment → consumer API/cache → dashboard refresh.

## BS-07 — Bermuda Price Index

Verified observations → remove identifiers → canonical units → representative basket/version → weighting → index calculation → coverage/confidence tests → approval → publish time series.

## BS-08 — Saver Agent

Question or scheduled alert → permission check → retrieve verified prices → optionally retrieve consented basket history → grounded reasoning → cited answer → savings suggestion → alert/habit update → notification.

## BS-09 — Retailer registration and offers

Retailer application → identity/business verification → role approval → campaign form → dates/value/points/audience → privacy and fairness review → publish → expiry/withdrawal.

## BS-10 — Offer redemption

Signed-in shopper → eligibility check → present offer → issue single-use token → retailer validation → redemption → points ledger → aggregate campaign reporting.

## BS-11 — Analytics products

Verified observations → de-identification → cohort threshold → aggregation → disclosure-risk test → licensed dataset/API → customer access control → query/export audit.

## BS-12 — PIPA lifecycle

Privacy request → identity verification → access/correction/export/withdraw/delete branch → legal/retention check → fulfilment → downstream propagation → signed audit record → response.

## BS-99 — Shared errors

Any failed step → classify transient/permanent/privacy/security → retry safely → dead-letter queue → operator alert → resolution → replay with original correlation ID.

