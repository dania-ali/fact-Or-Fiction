# Fact or Fiction: Project Spec

**Problem:** Fact or Fiction is an interactive health literacy app that helps teens and immigrant families evaluate common health claims, understand the evidence behind them, and find trustworthy health information. Users guess whether a claim is fact or fiction, then see the verdict, the evidence, and a trusted source.

**Users:** Teens and immigrant families who encounter health information through social media and family networks

**Inputs and outputs:**
- In: a Fact or Fiction guess on a claim card, and optionally a claim the user has heard, typed into a form.
- Out: claims loaded from the database; a reveal showing whether the guess was right, a plain-language explanation, and a link to a real source (CDC, NIH, WHO or similar); a running score; and a saved row in the database for each submitted claim.

**Acceptance criteria:**
1. When I answer a claim card, I see whether I was right, plus the explanation and a source link.
2. When I finish a round of 5 claims, I see my score.
3. When I submit a claim I've heard and reload the page, it's still saved as "pending review" with no verdict. When I submit an empty claim, I see "Claim is required" and nothing is saved.

**Out of scope:** Personal medical advice, a chatbot or free-text AI answers, a language switch or translations, accounts or login, an admin screen to review submitted claims, a Chrome extension, more than 20 claims