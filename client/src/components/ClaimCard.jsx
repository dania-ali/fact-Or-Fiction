export default function ClaimCard({ claim, onAnswer, disabled }) {
  return (
    <div>
      <h2>{claim.text}</h2>
      <button disabled={disabled} onClick={() => onAnswer("fact")}>Fact</button>
      <button disabled={disabled} onClick={() => onAnswer("fiction")}>Fiction</button>
    </div>
  );
}