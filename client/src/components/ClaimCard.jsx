export default function ClaimCard({ claim, onAnswer, disabled, factLabel, fictionLabel }) {
  return (
    <div>
      <h2>{claim.text}</h2>
      <button disabled={disabled} onClick={() => onAnswer("fact")}>{factLabel}</button>
      <button disabled={disabled} onClick={() => onAnswer("fiction")}>{fictionLabel}</button>
    </div>
  );
}