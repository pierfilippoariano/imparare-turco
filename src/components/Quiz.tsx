import { useEffect, useMemo, useState } from "react"
import { NOUNS, VERBS, verbStem } from "../data/vocabulary"
import { NOUN_FORMS, PERSON_LABELS } from "../data/grammar"
import { pluralize } from "../linguistics/pluralize"
import { makeAccusative, makeGenitive, makeDative, makeLocative, makeAblative } from "../linguistics/nounCases"
import { makePresentProgressive, SUBJECTS } from "../linguistics/conjugate"
import { readJSON, writeJSON } from "../lib/storage"

interface Question {
  id: string
  turkish: string
  italian: string
  askLabel: string
  askSuffix: string
  explain: string
  answer: string
}

const NOUN_MAKERS: Record<string, (w: string) => string> = {
  plural: pluralize,
  accusative: makeAccusative,
  genitive: makeGenitive,
  dative: makeDative,
  locative: makeLocative,
  ablative: makeAblative,
}

const SUBJECT_ORDER = [
  SUBJECTS.FIRST_PERSON_SINGULAR,
  SUBJECTS.SECOND_PERSON_SINGULAR,
  SUBJECTS.THIRD_PERSON_SINGULAR,
  SUBJECTS.FIRST_PERSON_PLURAL,
  SUBJECTS.SECOND_PERSON_PLURAL,
  SUBJECTS.THIRD_PERSON_PLURAL,
]

function buildPool(): Question[] {
  const pool: Question[] = []

  for (const n of NOUNS) {
    for (const form of NOUN_FORMS) {
      pool.push({
        id: `${n.turkish}-${form.key}`,
        turkish: n.turkish,
        italian: n.italian,
        askLabel: form.label,
        askSuffix: form.suffix,
        explain: form.explain,
        answer: NOUN_MAKERS[form.key](n.turkish),
      })
    }
  }

  for (const v of VERBS) {
    const stem = verbStem(v.turkish)
    SUBJECT_ORDER.forEach((subject, i) => {
      pool.push({
        id: `${v.turkish}-pp-${i}`,
        turkish: v.turkish,
        italian: v.italian,
        askLabel: `Presente progressivo (${PERSON_LABELS[i]})`,
        askSuffix: "-(I)yor",
        explain: "",
        answer: makePresentProgressive(stem, subject),
      })
    })
  }

  return pool
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function normalize(s: string): string {
  return s.trim().toLocaleLowerCase("tr")
}

interface QuizStats {
  correct: number
  total: number
}

export default function Quiz() {
  const pool = useMemo(buildPool, [])
  const [order, setOrder] = useState<Question[]>(() => shuffle(pool))
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState("")
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)
  const [stats, setStats] = useState<QuizStats>(() => readJSON("quiz-stats", { correct: 0, total: 0 }))

  useEffect(() => {
    writeJSON("quiz-stats", stats)
  }, [stats])

  const current = order[index]

  function check() {
    if (!current || feedback) return
    const isCorrect = normalize(input) === normalize(current.answer)
    setFeedback(isCorrect ? "correct" : "wrong")
    setStats((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))
  }

  function next() {
    setInput("")
    setFeedback(null)
    if (index + 1 >= order.length) {
      setOrder(shuffle(pool))
      setIndex(0)
    } else {
      setIndex(index + 1)
    }
  }

  function resetStats() {
    setStats({ correct: 0, total: 0 })
  }

  if (!current) return null

  return (
    <div className="quiz">
      <div className="quiz__stats">
        <span>
          Punteggio: <strong>{stats.correct}</strong> / {stats.total}
        </span>
        <button type="button" className="link-button" onClick={resetStats}>
          azzera
        </button>
      </div>

      <div className="quiz__card">
        <p className="quiz__question">
          Qual è la forma <strong>{current.askLabel}</strong> <code>{current.askSuffix}</code> di{" "}
          <span lang="tr">"{current.turkish}"</span> ({current.italian})?
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              feedback ? next() : check()
            }
          }}
          disabled={feedback !== null}
          autoFocus
          autoComplete="off"
          spellCheck={false}
          lang="tr"
          className="quiz__input"
          placeholder="scrivi la risposta..."
        />

        {feedback && (
          <div className={`quiz__feedback quiz__feedback--${feedback}`}>
            {feedback === "correct" ? (
              <p>✓ Esatto!</p>
            ) : (
              <p>
                ✗ La risposta corretta è <strong lang="tr">{current.answer}</strong>
              </p>
            )}
            {current.explain && <p className="quiz__explain">{current.explain}</p>}
          </div>
        )}

        <div className="quiz__actions">
          {!feedback ? (
            <button type="button" onClick={check} className="btn btn--primary">
              Controlla
            </button>
          ) : (
            <button type="button" onClick={next} className="btn btn--primary">
              Prossima →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
