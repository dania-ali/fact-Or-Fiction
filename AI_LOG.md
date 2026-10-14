## 2026-10-12
- Asked: To explain M3/M4 concepts using examples and quiz me
- Got: Explanation and 3 check questions
- What I did with it: Answered all 3 
- What I learned: State lives in the closest parent that needs it. React compared array by refence so I make a new array instead of changing the old one

## 2026-10-14
- Asked: How to build my back end: an Express server with SQLitestarting from an API contract
- Got: Guidance on API contract (GET /api/claims, GET /api/claims/round, POST /api/claims) and code 
- What I did with it:Created the files in server/, ran npm run seed, and seeded [15] claims from my own claims.seed.json with sources I checked myself. Verified code and ran with edge cases
- What I learned / verified: Ran curl on all three endpoints and got JSON from the GETs, a 201 from a valid POST, and a 400 "Claim is required" from an empty one. Ran npm run pending and my submitted claim was in the table

## 2026-10-14
- Asked: To check my project against my spec's acceptance criteria and the Feature Complete checklist
- Got: A comparison of my three criteria against the code and a list of gaps 
- What I did with it: Completed all features and wrote API_CONTRACT.md/README.md/ and SPEC.md 
- What I learned / verified: Criterion 1: clicked Fact, saw right/wrong, explanation, and a working source link. Criterion 2: finished a round of 5, score matched my answers. Criterion 3: submitted a claim, ran npm run pending, claim was listed as pending; empty submit showed 'Claim is required'