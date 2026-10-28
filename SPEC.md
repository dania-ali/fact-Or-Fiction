# Fact or Fiction: Project Spec

## Version 1: Course Project (English)

**Problem:** Fact or Fiction is an interactive health literacy app that helps teens and immigrant families evaluate common health claims, understand the evidence behind them, and find trustworthy health information. Users guess whether a claim is fact or fiction, then see the verdict, the evidence, and a trusted source.

**Users:** Teens and immigrant families who encounter health information through social media and family networks.

**Inputs and outputs:**
- In: a Fact or Fiction guess on a claim card, and optionally a claim the user has heard, typed into a form.
- Out: claims loaded from the database; a reveal showing whether the guess was right, a plain-language explanation, and a link to a real source (CDC, NIH, WHO or similar); a running score; and a saved row in the database for each submitted claim.

**Acceptance criteria:**
1. When I answer a claim card, I see whether I was right, plus the explanation and a source link.
2. When I finish a round of 5 claims, I see my score.
3. When I submit a claim I've heard and reload the page, it's still saved as "pending review" with no verdict. When I submit an empty claim, I see "Claim is required" and nothing is saved.

**Out of scope:** Personal medical advice, a chatbot or free-text AI answers, a language switch or translations (moved into Version 2), accounts or login, an admin screen to review submitted claims, a Chrome extension, more than 20 claims.

## Version 2: Capstone (adds Spanish)

**Problem:** Version 1 plus Spanish, so families can play, read the evidence, and submit claims in the language they actually get health information in.

**Users:** Spanish-speaking families and the teens who often translate health information for them, in addition to the Version 1 users.

**Inputs and outputs:**
- In: a language choice (English or Spanish), a Fact or Fiction guess on each card, and optionally a claim the user has heard.
- Out: claim cards, explanations, and buttons in the chosen language; a score; and a saved pending claim tagged with its language.

**Acceptance criteria:**
1. When I switch to Spanish, the claim, its explanation, and the buttons show in Spanish, and switching back shows English.
2. When I reload the page, my language choice is still selected.
3. When a claim has no reviewed Spanish version, it shows in English with a visible "not available in Spanish yet" note, not a blank card.
4. When I submit a claim with Spanish selected, it's saved with language `es` and status pending. When I submit an empty claim, I see an error and nothing is saved.

**Non-negotiables:**
- **Database:** SQLite, with `claims` and a new `claim_translations` table (see API_CONTRACT.md).
- **Custom endpoint:** `GET /api/claims/round?lang=` returns 5 random verified claims in the requested language, with a per-claim English fallback.
- **Front-to-back wiring:** the language switch fetches with `lang`, the Submit form POSTs the text and language, and saved rows persist across refreshes.
- **Architecture diagram:** ARCHITECTURE.md.
- **AI-usage log:** AI_LOG.md.
- **Live demo path:** switch to Spanish, play a round, submit a claim in Spanish, show the row with `npm run pending`, reload and show the language is still set.

**Out of scope:** Accounts or login, an admin or approval screen, a chatbot or free-text AI answers, personal medical advice, a third language, user-submitted translations, a Chrome extension. Deployment is an optional extension after everything is verified.