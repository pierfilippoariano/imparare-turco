const SPECIAL_CHARS = ["ç", "ş", "ğ", "ı", "ö", "ü"]

export default function CharPad({ onInsert }: { onInsert: (char: string) => void }) {
  return (
    <div className="char-pad">
      {SPECIAL_CHARS.map((char) => (
        <button
          type="button"
          key={char}
          className="char-pad__button"
          onClick={() => onInsert(char)}
          aria-label={`Inserisci ${char}`}
        >
          {char}
        </button>
      ))}
    </div>
  )
}
