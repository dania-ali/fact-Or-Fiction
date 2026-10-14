import { useState } from "react";

export default function Submit() {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      setSaved(true);
      setText("");
    } catch {
      setError("Couldn't reach the server. Try again.");
    }
  }

  return (
    <div>
      <h1>Submit a claim</h1>
      <p>
        Heard a health claim you want checked? Send it in. Submitted claims are
        held for review and don't appear in the game automatically.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          maxLength={280}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p role="alert">{error}</p>}
      {saved && <p>Thanks! Your claim was saved and is pending review.</p>}
    </div>
  );
}