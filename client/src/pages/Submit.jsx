import { useState } from "react";

export default function Submit({ lang, t }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    if (!text.trim()) {
      setError(t.claimRequired);
      return;
    }
    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: lang }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.submitError);
        return;
      }
      setSaved(true);
      setText("");
    } catch {
      setError(t.submitError);
    }
  }

  return (
    <div>
      <h1>{t.submitTitle}</h1>
      <p>{t.submitIntro}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          maxLength={280}
        />
        <br />
        <button type="submit">{t.submitButton}</button>
      </form>
      {error && <p role="alert">{error}</p>}
      {saved && <p>{t.saved}</p>}
    </div>
  );
}