# Integration contracts

## Existing prototype endpoints

- `POST /api/observations`: authenticated multipart shelf-price submission.
- `POST /api/receipts`: authenticated multipart receipt upload with exact-image duplicate detection.

## Recommended orchestration endpoints

- `POST /api/internal/observations/{id}/extract`
- `POST /api/internal/observations/{id}/verify`
- `POST /api/internal/receipts/{id}/ocr`
- `POST /api/internal/receipts/{id}/verify`
- `POST /api/internal/rewards/ledger`
- `POST /api/internal/collectors/{retailer}/run`
- `POST /api/internal/index/calculate`
- `POST /api/internal/offers/{id}/publish`
- `POST /api/internal/offers/{id}/redeem`
- `POST /api/internal/privacy/requests`

All internal calls should use service authentication, idempotency keys, correlation IDs, JSON Schema validation and least-privilege scopes.

## Core event envelope

```json
{
  "eventId": "uuid",
  "eventType": "receipt.uploaded",
  "occurredAt": "ISO-8601",
  "correlationId": "uuid",
  "actorType": "shopper|retailer|service|administrator",
  "actorId": "pseudonymous-id",
  "purpose": "price-verification",
  "consentVersion": "version-or-null",
  "payload": {}
}
```

## Environments

- Development: synthetic data only.
- Staging: controlled test accounts and non-production credentials.
- Production: approved flows, restricted credentials, audit monitoring and no direct editing.

