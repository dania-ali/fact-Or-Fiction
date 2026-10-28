# Fact or Fiction

An interactive health literacy game for teens and immigrant families, in English and Spanish. You see a health claim, guess whether it's fact or fiction, and then get the verdict, a plain-language explanation, and a link to a trusted source.

> **Not medical advice.** This app is for education only. Ask a medical professional about your own health.

Built as a Code2College Full Stack Web project.

## Features

- Play a round of 5 random claims and see your score at the end
- Every claim has an explanation and a source link (CDC, NIH, WHO or similar)
- Switch between English and Spanish. Your choice is remembered after a reload
- A claim without a reviewed Spanish version shows in English with a note, never a blank card
- Submit a health claim you've heard. It's saved as pending review, with the language you submitted it in, and is not shown in the game
- Friendly loading, error, and empty states

## Tech stack

- **Front end:** React, React Router, Vite
- **Back end:** Node.js, Express
- **Database:** SQLite (via better-sqlite3)

## Run it

You need Node.js 18 or newer.

```
git clone https://github.com/dania-ali/fact-Or-Fiction.git
cd fact-Or-Fiction
```

**Terminal 1: the API (port 3001)**
```
cd server
npm install
npm run seed
npm run dev
```

**Terminal 2: the front end (port 5173)**
```
cd client
npm install
npm run dev
```

Open http://localhost:5173. In a Codespace, open port 5173 from the Ports tab.

## Claims and translations

Claims live in `server/claims.seed.json`. Each claim can have a `translations.es` block with Spanish text and explanation. Run `npm run seed` after editing the file.

A Spanish translation is only shown once it's marked `"reviewed": true`. Until then the app falls back to English for that claim. Only mark a translation reviewed after a fluent speaker has checked it.

## See submitted claims

Submitted claims are stored as pending and never shown in the app. To list them, with their language:

```
cd server
npm run pending
```

## API

Full details are in [API_CONTRACT.md](API_CONTRACT.md).

| Method | Route | What it does |
|---|---|---|
| GET | `/api/claims` | All verified claims (English) |
| GET | `/api/claims/round?lang=en\|es` | 5 random verified claims, reviewed Spanish first when `lang=es` |
| POST | `/api/claims` | Save a submitted claim as pending, with its language |

## Project structure 

```
client/   React app (pages, components, interface text in strings.js)
server/   Express API, SQLite database, seed data
SPEC.md             what the app does and how it's tested
API_CONTRACT.md     the agreement between front end and back end
ARCHITECTURE.md     page → API → database diagram
ACCEPTANCE.md       results of checking each acceptance criterion
AI_LOG.md           how AI was used while building this
```

## Known limitations

- Spanish is available for 5 of 15 claims. The rest fall back to English
- No admin screen: pending claims are reviewed by querying the database
- The submit endpoint has no rate limiting

## AI usage

I built this with an AI assistant as a pair. What I asked, what I changed, and how I verified it is in [AI_LOG.md](AI_LOG.md).