import { useRef } from "react"
import CharPad from "./CharPad"

export default function WordInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (newValue: string) => void
  placeholder?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  function onInsert(char: string) {
    onChange(value + char)
    inputRef.current?.focus()
  }

  return (
    <div className="word-input">
      <label htmlFor="word" className="word-input__label">
        Scrivi una parola turca
      </label>
      <div className="word-input__row" lang="tr">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          name="word"
          id="word"
          ref={inputRef}
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder ?? "es. kitap, ev, gelmek..."}
        />
        {value && (
          <button
            type="button"
            className="word-input__clear"
            onClick={() => onChange("")}
            aria-label="Cancella"
          >
            &times;
          </button>
        )}
      </div>
      <CharPad onInsert={onInsert} />
    </div>
  )
}
