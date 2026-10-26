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

## 2026-10-26
- Asked: Whether my L13 plan met the lesson's requirements (data model, SQLite table, Express skeleton), and how to build it for Fact or Fiction v2
- Got: A gap check against the lesson, updated API contract, and a Mermaid architecture diagram
- What I did with it:  Added the table to db.js, added translations to 5 claims in claims.seed.json, replaced the round route, updated API_CONTRACT.md, and wrote ARCHITECTURE.md. 
- What I learned / verified: Ran npm run seed with no errors. Ran curl on /api/claims/round?lang=en and got all "en". Flipped one claim's reviewed flag to true, re-seeded, and curl on lang=es returned that claim with "language":"es" and the rest as "en" fallbacks.

## 2026-10-26
- Asked: Why I kept getting "Cannot GET /", what the reviewed flag test meant, and how to fix my git status before committing
- Got: Explanations of each, and a fix for the git problems
- What I did with it: Opened port 5173 for the app and used /api/ URLs for the server. Created the capstone branch (I had been on main), ran git rm --cached on claims.db, and created the missing .gitignore. [Say if you pasted the contract into the terminal by mistake.]
- What I learned / verified: Cannot GET / means the Express server is running, it just has no route at /. The .gitignore I was told to make earlier never existed, so git was tracking my database, and I caught it from git status. Verified by checking git status showed On branch capstone and no claims.db in the lists.