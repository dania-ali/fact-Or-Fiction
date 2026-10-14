import { useEffect, useState } from "react";
import ClaimCard from "../components/ClaimCard.jsx";

export default function Play() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState(null);
  const [results, setResults] = useState([]);

  function loadRound() {
    setLoading(true);
    setError(null);
    fetch("/api/claims/round")
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
      .catch(() => setError("Couldn't load claims. Is the server running?"))
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadRound(); }, []);

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

  if (loading) return <p>Loading claims...</p>;

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={loadRound}>Try again</button>
      </div>
    );
  }

  if (claims.length === 0) return <p>No claims yet. Check back soon.</p>;

  if (index >= claims.length) {
    return (
      <div>
        <h2>Score: {score} / {claims.length}</h2>
        <ul>
          {results.map((r) => (
            <li key={r.id}>
              {r.correct ? "✓" : "✗"} {r.text} ({r.verdict})
            </li>
          ))}
        </ul>
        <button onClick={loadRound}>Play again</button>
      </div>
    );
  }

  return (
    <div>
      <p>Answered {results.length} of {claims.length} · Score {score}</p>
      <ClaimCard claim={claim} onAnswer={handleAnswer} disabled={guess !== null} />
      {guess && (
        <div>
          <p>{guess === claim.verdict ? "Right!" : "Not quite."} It's {claim.verdict}.</p>
          <p>{claim.explanation}</p>
          <a href={claim.sourceUrl} target="_blank" rel="noreferrer">{claim.source}</a>
          <br />
          <button onClick={next}>Next</button>
        </div>
      )}
    </div>
  );
}