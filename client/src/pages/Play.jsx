import { useState } from "react";
import claims from "../data/claims.json";
import ClaimCard from "../components/ClaimCard.jsx";

export default function Play() {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState(null);
  const [score, setScore] = useState(0);

  const claim = claims[index];

  function handleAnswer(choice) {
    setGuess(choice);
    if (choice === claim.verdict) setScore(score + 1);
  }

  function next() {
    setGuess(null);
    setIndex(index + 1);
  }

  if (index >= claims.length) {
    return (
      <div>
        <h2>Score: {score} / {claims.length}</h2>
        <ul>
          {claims.map((c) => (
            <li key={c.id}>{c.text} ({c.verdict})</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ClaimCard claim={claim} onAnswer={handleAnswer} disabled={guess !== null} />
      {guess && (
        <div>
          <p>{guess === claim.verdict ? "Right!" : "Not quite."} It's {claim.verdict}.</p>
          <p>{claim.explanation}</p>
          <button onClick={next}>Next</button>
        </div>
      )}
    </div>
  );
}