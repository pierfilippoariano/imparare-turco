import { useEffect, useMemo, useState } from "react"
import WordInput from "./WordInput"
import { pluralize } from "../linguistics/pluralize"
import { makeAccusative, makeGenitive, makeDative, makeLocative, makeAblative } from "../linguistics/nounCases"
import { makeInfinitive, makePresentProgressive, SUBJECTS } from "../linguistics/conjugate"
import { NOUN_FORMS, PERSON_LABELS } from "../data/grammar"
import { NOUNS, VERBS, verbStem } from "../data/vocabulary"

const SUBJECT_ORDER = [
  SUBJECTS.FIRST_PERSON_SINGULAR,
  SUBJECTS.SECOND_PERSON_SINGULAR,
  SUBJECTS.THIRD_PERSON_SINGULAR,
  SUBJECTS.FIRST_PERSON_PLURAL,
  SUBJECTS.SECOND_PERSON_PLURAL,
  SUBJECTS.THIRD_PERSON_PLURAL,
]

function isVerbInfinitive(word: string): boolean {
  return /mek$|mak$/.test(word) && word.length > 3
}

interface GeneratorResult {
  kind: "noun" | "verb"
  forms: { key: string; label: string; suffix: string; explain: string; value: string }[]
}

function computeResult(word: string): GeneratorResult | null {
  const trimmed = word.trim().toLocaleLowerCase("tr")
  if (!trimmed) return null

  if (isVerbInfinitive(trimmed)) {
    const stem = verbStem(trimmed)
    const forms = [
      {
        key: "infinitive",
        label: "Infinito",
        suffix: "-mAk",
        explain: "La forma 'di dizionario' del verbo, equivalente al nostro infinito.",
        value: makeInfinitive(stem),
      },
      ...SUBJECT_ORDER.map((subject, i) => ({
        key: `pp-${i}`,
        label: `Presente progressivo (${PERSON_LABELS[i]})`,
        suffix: "-(I)yor",
        explain:
          i === 0
            ? "Il presente progressivo turco copre sia 'sto facendo' sia il normale presente abituale 'faccio'."
            : "",
        value: makePresentProgressive(stem, subject),
      })),
    ]
    return { kind: "verb", forms }
  }

  const forms = [
    { ...NOUN_FORMS[0], value: pluralize(trimmed) },
    { ...NOUN_FORMS[1], value: makeAccusative(trimmed) },
    { ...NOUN_FORMS[2], value: makeGenitive(trimmed) },
    { ...NOUN_FORMS[3], value: makeDative(trimmed) },
    { ...NOUN_FORMS[4], value: makeLocative(trimmed) },
    { ...NOUN_FORMS[5], value: makeAblative(trimmed) },
  ]
  return { kind: "noun", forms }
}

const VOCAB_INDEX = new Map<string, { italian: string; category: "noun" | "verb" }>()
for (const n of NOUNS) VOCAB_INDEX.set(n.turkish, { italian: n.italian, category: "noun" })
for (const v of VERBS) VOCAB_INDEX.set(v.turkish, { italian: v.italian, category: "verb" })

export default function Generator({
  word,
  onChange,
  onWordUsed,
}: {
  word: string
  onChange: (w: string) => void
  onWordUsed: (w: string) => void
}) {
  const [debounced, setDebounced] = useState(word)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(word), 350)
    return () => clearTimeout(t)
  }, [word])

  useEffect(() => {
    const trimmed = debounced.trim().toLocaleLowerCase("tr")
    if (trimmed.length > 1) onWordUsed(trimmed)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  const { result, error } = useMemo(() => {
    try {
      return { result: computeResult(debounced), error: null as string | null }
    } catch {
      return {
        result: null,
        error: "Non riesco a trovare una vocale in questa parola: prova con un'altra.",
      }
    }
  }, [debounced])

  const vocabEntry = VOCAB_INDEX.get(debounced.trim().toLocaleLowerCase("tr"))

  return (
    <div className="generator">
      <WordInput value={word} onChange={onChange} />

      {!word.trim() && (
        <p className="generator__hint">
          Scrivi un sostantivo (es. <em>kitap</em>) per vedere i casi, oppure un verbo all'infinito
          (es. <em>gelmek</em>) per vedere le coniugazioni al presente.
        </p>
      )}

      {error && <p className="generator__error">{error}</p>}

      {result && (
        <div className="generator__results">
          <div className="generator__badge-row">
            <span className={`badge badge--${result.kind}`}>
              {result.kind === "noun" ? "Sostantivo" : "Verbo"}
            </span>
            {vocabEntry ? (
              <span className="badge badge--verified">✓ verificata: {vocabEntry.italian}</span>
            ) : (
              <span className="badge badge--experimental">
                ⚠ sperimentale — questa parola non è nel vocabolario verificato, potrebbe avere
                eccezioni non gestite dal motore
              </span>
            )}
          </div>

          <div className="form-grid">
            {result.forms.map((f) => (
              <div className="form-card" key={f.key}>
                <div className="form-card__head">
                  <span className="form-card__label">{f.label}</span>
                  <code className="form-card__suffix">{f.suffix}</code>
                </div>
                <div className="form-card__value" lang="tr">
                  {f.value}
                </div>
                {f.explain && <p className="form-card__explain">{f.explain}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
