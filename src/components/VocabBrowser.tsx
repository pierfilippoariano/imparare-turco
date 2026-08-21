import { useState } from "react"
import { NOUNS, VERBS, type VocabWord } from "../data/vocabulary"

export default function VocabBrowser({ onSelect }: { onSelect: (word: string) => void }) {
  const [filter, setFilter] = useState("")
  const [category, setCategory] = useState<"all" | "noun" | "verb">("all")

  const words: VocabWord[] = [
    ...(category !== "verb" ? NOUNS : []),
    ...(category !== "noun" ? VERBS : []),
  ].filter(
    (w) =>
      !filter ||
      w.turkish.toLocaleLowerCase("tr").includes(filter.toLocaleLowerCase("tr")) ||
      w.italian.toLocaleLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div className="vocab-browser">
      <div className="vocab-browser__controls">
        <input
          type="text"
          placeholder="Cerca (turco o italiano)..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="vocab-browser__search"
        />
        <div className="vocab-browser__tabs">
          <button
            type="button"
            className={category === "all" ? "chip chip--active" : "chip"}
            onClick={() => setCategory("all")}
          >
            Tutte ({NOUNS.length + VERBS.length})
          </button>
          <button
            type="button"
            className={category === "noun" ? "chip chip--active" : "chip"}
            onClick={() => setCategory("noun")}
          >
            Sostantivi ({NOUNS.length})
          </button>
          <button
            type="button"
            className={category === "verb" ? "chip chip--active" : "chip"}
            onClick={() => setCategory("verb")}
          >
            Verbi ({VERBS.length})
          </button>
        </div>
      </div>

      <ul className="vocab-browser__list">
        {words.map((w) => (
          <li key={w.turkish}>
            <button type="button" className="vocab-browser__item" onClick={() => onSelect(w.turkish)}>
              <span className="vocab-browser__turkish" lang="tr">
                {w.turkish}
              </span>
              <span className="vocab-browser__italian">{w.italian}</span>
            </button>
          </li>
        ))}
        {words.length === 0 && <p className="vocab-browser__empty">Nessun risultato.</p>}
      </ul>
    </div>
  )
}
