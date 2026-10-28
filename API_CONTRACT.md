### GET /api/claims
All verified claims, English only.
- **200** `[{ id, text, verdict, explanation, source, sourceUrl }]`
- `verdict` is `"fact"` or `"fiction"`

### GET /api/claims/round?lang=en|es
A round of five random verified claims.
- **200** `[{ id, text, verdict, explanation, source, sourceUrl, language }]`
- `language` is `"es"` only if a reviewed Spanish version exists for that claim, otherwise `"en"` (fallback). When it is `"en"` on a Spanish request, the text and explanation are the English ones.
- When `lang=es`, claims with a reviewed Spanish version are returned first.
- Any other `lang` value is treated as `"en"`.
- Returns fewer than five claims only if fewer than five verified claims exist.

### POST /api/claims
Submit a claim someone has heard. It is saved as pending and never shown in the game until reviewed.
- **Body** `{ text, language? }`, where `language` is `"en"` or `"es"` and defaults to `"en"`
- **201** `{ id, text, language, status: "pending" }`
- **400** `{ "error": "Claim is required" }` if `text` is missing or only whitespace
- **400** `{ "error": "Claim is too long (280 characters max)" }` if `text` is over 280 characters