GET  /api/claims
     → 200 [{ id, text, verdict, explanation, source, sourceUrl }]  (all verified claims, English only)

GET  /api/claims/round?lang=en|es
     → 200 five random verified claims: [{ id, text, verdict, explanation, source, sourceUrl, language }]
     language is "es" only if a reviewed Spanish version exists, otherwise "en" (fallback)
     any other lang value is treated as "en"

POST /api/claims   body { text, language? }   (language "en" or "es", default "en"; wired in L14)
     → 201 { id, text, language, status: "pending" }
     → 400 { error: "Claim is required" } if text is empty
     → 400 { error: "Claim is too long (280 characters max)" } if over 280 characters