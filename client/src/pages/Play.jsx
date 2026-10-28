import { useEffect, useState } from "react";
import ClaimCard from "../components/ClaimCard.jsx";

export default function Play({ lang, t }) {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState(null);
  const [results, setResults] = useState([]);

  function loadRound() {
    setLoading(true);
    setError(false);
    fetch(`/api/claims/round?lang=${lang}`)
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        setClaims(data);
        setIndex(0);
        setGuess(null);
        setResults([]);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  // New round whenever the language changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadRound(); }, [lang]);

  const claim = claims[index];
  const score = results.filter((r) => r.correct).length;

  function handleAnswer(choice) {
    setGuess(choice);
    setResults([
      ...results,
      {
        id: claim.id,
        text: claim.text,
        verdict: claim.verdict,
        correct: choice === claim.verdict,
      },
    ]);
  }

  function next() {
    setGuess(null);
    setIndex(index + 1);
  }

  if (loading) return <p>{t.loading}</p>;

  if (error) {
    return (
      <div>
        <p>{t.loadError}</p>
        <button onClick={loadRound}>{t.tryAgain}</button>
      </div>
    );
  }

  if (claims.length === 0) return <p>{t.noClaims}</p>;

  if (index >= claims.length) {
    return (
      <div>
        <h2>{t.score}: {score} / {claims.length}</h2>
        <ul>
          {results.map((r) => (
            <li key={r.id}>
              {r.correct ? "✓" : "✗"} {r.text} ({t[r.verdict]})
            </li>
          ))}
        </ul>
        <button onClick={loadRound}>{t.playAgain}</button>
      </div>
    );
  }

  return (
    <div>
      <p>
        {t.answered} {results.length} {t.of} {claims.length} · {t.score} {score}
      </p>
      {lang === "es" && claim.language !== "es" && <p>{t.notTranslated}</p>}
      <ClaimCard
        claim={claim}
        onAnswer={handleAnswer}
        disabled={guess !== null}
        factLabel={t.fact}
        fictionLabel={t.fiction}
      />
      {guess && (
        <div>
          <p>
            {guess === claim.verdict ? t.right : t.notQuite} {t.answerIs} {t[claim.verdict]}.
          </p>
          <p>{claim.explanation}</p>
          <a href={claim.sourceUrl} target="_blank" rel="noreferrer">{claim.source}</a>
          <br />
          <button onClick={next}>{t.next}</button>
        </div>
      )}
    </div>
  );
}