// Spiegazioni in italiano delle forme grammaticali generate dal motore
// linguistico. Servono sia nel Generatore che nel Quiz.

export interface CaseInfo {
  key: string
  label: string
  suffix: string
  explain: string
  example: string
}

export const NOUN_FORMS: CaseInfo[] = [
  {
    key: "plural",
    label: "Plurale",
    suffix: "-lAr",
    explain:
      "Il turco ha un plurale unico e sempre regolare: basta aggiungere -lar o -ler a seconda dell'armonia vocalica. Niente eccezioni tipo 'uomo/uomini'.",
    example: "kitap -> kitaplar (libri)",
  },
  {
    key: "accusative",
    label: "Accusativo",
    suffix: "-(y)I",
    explain:
      "Si usa per l'oggetto diretto quando è specifico/determinato. 'Kitabı okuyorum' = leggo IL libro (quello specifico). Senza suffisso, l'oggetto resta generico: 'kitap okuyorum' = leggo un libro / leggo (dei) libri.",
    example: "kitap -> kitabı (il libro, come oggetto)",
  },
  {
    key: "genitive",
    label: "Genitivo",
    suffix: "-(n)In",
    explain:
      "Indica possesso, di solito insieme al suffisso possessivo sulla cosa posseduta: 'kitabIN kapağı' = la copertina DEL libro.",
    example: "kitap -> kitabın (del libro)",
  },
  {
    key: "dative",
    label: "Dativo",
    suffix: "-(y)A",
    explain:
      "Indica moto a luogo o destinatario: 'a, verso'. 'Okula gidiyorum' = vado A scuola. Da non confondere con il locativo qui sotto!",
    example: "okul -> okula (verso la scuola)",
  },
  {
    key: "locative",
    label: "Locativo",
    suffix: "-DA",
    explain:
      "Indica stato in luogo: 'in, a, presso'. 'Okulda çalışıyorum' = lavoro A (dentro) scuola. Diverso dal dativo: qui non c'è movimento.",
    example: "okul -> okulda (a scuola, dentro)",
  },
  {
    key: "ablative",
    label: "Ablativo",
    suffix: "-DAn",
    explain:
      "Indica moto da luogo o provenienza: 'da, di'. 'Okuldan geliyorum' = vengo DA scuola.",
    example: "okul -> okuldan (da scuola)",
  },
]

export const PERSON_LABELS: Record<number, string> = {
  0: "io",
  1: "tu",
  2: "lui / lei",
  3: "noi",
  4: "voi",
  5: "loro",
}
