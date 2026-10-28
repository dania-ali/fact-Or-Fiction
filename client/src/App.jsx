import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Play from "./pages/Play.jsx";
import Submit from "./pages/Submit.jsx";
import { strings } from "./strings.js";

export default function App() {
  const [lang, setLang] = useState(() =>
    localStorage.getItem("lang") === "es" ? "es" : "en"
  );
  const t = strings[lang];

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <nav>
        <Link to="/">{t.navPlay}</Link> | <Link to="/submit">{t.navSubmit}</Link>{" "}
        <label>
          {t.language}:{" "}
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>
      </nav>
      <Routes>
        <Route path="/" element={<Play lang={lang} t={t} />} />
        <Route path="/submit" element={<Submit lang={lang} t={t} />} />
      </Routes>
      <footer>{t.disclaimer}</footer>
    </>
  );
}