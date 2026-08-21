// Vocabolario curato a mano. Ogni parola qui dentro è stata verificata contro
// il motore linguistico in src/linguistics: le forme generate (plurale, casi,
// coniugazioni) corrispondono al turco reale. Non tutte le parole turche si
// comportano "regolarmente" con questo motore (es. eccezioni monosillabiche
// come "at" o verbi irregolari come "gitmek"), quindi qui dentro trovi solo
// parole per cui il generatore produce risultati corretti al 100%.

export interface VocabWord {
  turkish: string
  italian: string
}

export const NOUNS: VocabWord[] = [
  { turkish: "ev", italian: "casa" },
  { turkish: "araba", italian: "macchina" },
  { turkish: "okul", italian: "scuola" },
  { turkish: "kapı", italian: "porta" },
  { turkish: "masa", italian: "tavolo" },
  { turkish: "sandalye", italian: "sedia" },
  { turkish: "pencere", italian: "finestra" },
  { turkish: "gün", italian: "giorno" },
  { turkish: "gece", italian: "notte" },
  { turkish: "yıl", italian: "anno" },
  { turkish: "ay", italian: "mese / luna" },
  { turkish: "hafta", italian: "settimana" },
  { turkish: "ülke", italian: "paese, nazione" },
  { turkish: "dil", italian: "lingua" },
  { turkish: "arkadaş", italian: "amico/a" },
  { turkish: "aile", italian: "famiglia" },
  { turkish: "anne", italian: "madre" },
  { turkish: "baba", italian: "padre" },
  { turkish: "kardeş", italian: "fratello / sorella" },
  { turkish: "çocuk", italian: "bambino" },
  { turkish: "kadın", italian: "donna" },
  { turkish: "adam", italian: "uomo" },
  { turkish: "köpek", italian: "cane" },
  { turkish: "kedi", italian: "gatto" },
  { turkish: "kuş", italian: "uccello" },
  { turkish: "balık", italian: "pesce" },
  { turkish: "ekmek", italian: "pane" },
  { turkish: "çay", italian: "tè" },
  { turkish: "kahve", italian: "caffè" },
  { turkish: "yemek", italian: "cibo, pasto" },
  { turkish: "para", italian: "soldi" },
  { turkish: "iş", italian: "lavoro" },
  { turkish: "üniversite", italian: "università" },
  { turkish: "hastane", italian: "ospedale" },
  { turkish: "otel", italian: "hotel" },
  { turkish: "tren", italian: "treno" },
  { turkish: "otobüs", italian: "autobus" },
  { turkish: "yol", italian: "strada" },
  { turkish: "deniz", italian: "mare" },
  { turkish: "orman", italian: "foresta" },
  { turkish: "güneş", italian: "sole" },
  { turkish: "yıldız", italian: "stella" },
  { turkish: "sokak", italian: "via, strada" },
  { turkish: "göl", italian: "lago" },
  { turkish: "ada", italian: "isola" },
  { turkish: "çiçek", italian: "fiore" },
  { turkish: "ağaç", italian: "albero" },
  { turkish: "kitap", italian: "libro" },
  { turkish: "dolap", italian: "armadio" },
  { turkish: "uçak", italian: "aereo" },
  { turkish: "gazete", italian: "giornale" },
  { turkish: "menü", italian: "menù" },
]

export const VERBS: VocabWord[] = [
  { turkish: "gelmek", italian: "venire" },
  { turkish: "sevmek", italian: "amare" },
  { turkish: "okumak", italian: "leggere" },
  { turkish: "yazmak", italian: "scrivere" },
  { turkish: "çalışmak", italian: "lavorare, studiare" },
  { turkish: "konuşmak", italian: "parlare" },
  { turkish: "anlamak", italian: "capire" },
  { turkish: "beklemek", italian: "aspettare" },
  { turkish: "yürümek", italian: "camminare" },
  { turkish: "uyumak", italian: "dormire" },
  { turkish: "yemek", italian: "mangiare" },
  { turkish: "içmek", italian: "bere" },
  { turkish: "satmak", italian: "vendere" },
  { turkish: "bakmak", italian: "guardare" },
  { turkish: "açmak", italian: "aprire" },
  { turkish: "koşmak", italian: "correre" },
  { turkish: "düşünmek", italian: "pensare" },
  { turkish: "istemek", italian: "volere" },
]

// Alcuni verbi turchi molto comuni sono irregolari (es. "gitmek" -> "gidiyor",
// non "gitiyor") e il motore linguistico di questo progetto non gestisce
// ancora le mutazioni consonantiche sui verbi. Per non insegnare forme
// sbagliate, questi verbi non compaiono nel generatore né nel quiz.
export const KNOWN_LIMITATIONS = [
  "Il presente progressivo di verbi come \"gitmek\" (andare) non è ancora corretto: il motore genera \"gitiyor\" invece di \"gidiyor\". Questi verbi sono esclusi dal vocabolario.",
  "Alcune eccezioni monosillabiche (es. \"at\" -> \"atı\", non \"adı\") non sono modellate: il vocabolario include solo parole verificate.",
  "Parole con una vocale che \"cade\" davanti a un suffisso vocalico (es. \"şehir\" -> \"şehri\", \"isim\" -> \"ismi\", \"su\" -> \"suyun\") non sono ancora gestite: escluse dal vocabolario per non insegnare forme sbagliate.",
]

export function verbStem(infinitive: string): string {
  // -mek / -mak
  return infinitive.replace(/mek$|mak$/, "")
}
