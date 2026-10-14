GET  /api/claims        → 200 [{ id, text, verdict, explanation, source, sourceUrl }]
GET  /api/claims/round  → 200 five random verified claims, same shape
POST /api/claims        body { text }
                        → 201 { id, text, status: "pending" }
                        → 400 { error: "Claim is required" } if empty
                        → 400 { error: "Claim is too long (280 characters max)" }