import { useEffect, useState } from "react"
import Generator from "./components/Generator"
import VocabBrowser from "./components/VocabBrowser"
import Quiz from "./components/Quiz"
import { readJSON, writeJSON } from "./lib/storage"
import "./App.css"

type Tab = "genera" | "vocabolario" | "quiz"

const MAX_HISTORY = 12

export default function App() {
  const [tab, setTab] = useState<Tab>("genera")
  const [word, setWord] = useState("")
  const [history, setHistory] = useState<string[]>(() => readJSON("word-history", []))

  useEffect(() => {
    writeJSON("word-history", history)
  }, [history])

  function pushHistory(w: string) {
    setHistory((prev) => {
      const withoutDup = prev.filter((x) => x !== w)
      return [w, ...withoutDup].slice(0, MAX_HISTORY)
    })
  }

  function selectWord(w: string) {
    setWord(w)
    setTab("genera")
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Türkçe Öğreniyorum</h1>
        <p className="app__subtitle">
          Un laboratorio per imparare il turco: armonia vocalica, casi e coniugazioni generati dal
          vivo, con quiz per allenarsi.
        </p>
      </header>

      <nav className="app__tabs">
        <button
          type="button"
          className={tab === "genera" ? "tab tab--active" : "tab"}
          onClick={() => setTab("genera")}
        >
          Generatore
        </button>
        <button
          type="button"
          className={tab === "vocabolario" ? "tab tab--active" : "tab"}
          onClick={() => setTab("vocabolario")}
        >
          Vocabolario
        </button>
        <button
          type="button"
          className={tab === "quiz" ? "tab tab--active" : "tab"}
          onClick={() => setTab("quiz")}
        >
          Quiz
        </button>
      </nav>

      <main className="app__main">
        {tab === "genera" && (
          <>
            <Generator word={word} onChange={setWord} onWordUsed={pushHistory} />
            {history.length > 0 && (
              <div className="history">
                <h3>Cercate di recente</h3>
                <div className="history__chips">
                  {history.map((w) => (
                    <button key={w} type="button" className="chip" onClick={() => setWord(w)}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab === "vocabolario" && <VocabBrowser onSelect={selectWord} />}

        {tab === "quiz" && <Quiz />}
      </main>

      <footer className="app__footer">
        <p>Türkçe Öğreniyorum — la versione di Pierfilippo Ariano.</p>
      </footer>
    </div>
  )
}
