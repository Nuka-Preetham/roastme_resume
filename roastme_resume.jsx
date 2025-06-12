import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [fileText, setFileText] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    document.body.classList.add("theme-transition");
    const timeout = setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 500);
    return () => clearTimeout(timeout);
  }, [darkMode]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    setFileText(text);

    setLoading(true);
    const res = await fetch("/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: `Roast this resume sarcastically. Add jokes:\n${text}` })
    });
    const data = await res.json();
    setRoast(data.roast);
    setLoading(false);
  };

  if (showLanding) {
    return (
      <div className={`landing ${darkMode ? "dark" : "light"}`}>
        <h1>🔥 Roast Me Analyzer 🔥</h1>
        <p>Welcome to the only place where getting roasted is a career move!</p>
        <button onClick={() => setShowLanding(false)}>Get Roasted ➡️</button>
        <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    );
  }

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <h1>🔥 Roast Me: Resume Analyzer 🔥</h1>
      <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
        Toggle to {darkMode ? "Light" : "Dark"} Mode
      </button>
      <input type="file" accept=".txt,.md,.doc,.pdf" onChange={handleFileUpload} />
      {loading && <p>Loading roast...</p>}
      {roast && (
        <div className="roast-output">
          <h3>Your Roast:</h3>
          <pre>{roast}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
