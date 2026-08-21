# Türkçe Öğreniyorum 🇹🇷

## La versione di Pierfilippo Ariano

Questo è il mio piccolo laboratorio per imparare il turco sul serio. Il turco è una lingua
incredibilmente regolare — quasi matematica, nelle sue regole — quindi ho pensato: perché non
costruire uno strumento che genera le parole in contesto, così le regole (e le eccezioni che
spuntano sempre fuori) mi restano davvero in testa invece di restare sulla carta?

Il motore genera dal vivo plurali, casi e coniugazioni turche seguendo le vere regole di armonia
vocalica e mutazione consonantica, e li spiega in italiano mentre scrivo.

**Demo live:** [pierfilippoariano.github.io/imparare-turco](https://pierfilippoariano.github.io/imparare-turco/)

## Cosa fa

- **Generatore** — scrivi un sostantivo turco (es. `kitap`) e vedi all'istante plurale,
  accusativo, genitivo, dativo, locativo e ablativo, ognuno con una spiegazione in italiano del
  perché si usa. Scrivi un verbo all'infinito (es. `gelmek`) e vedi la coniugazione al presente
  progressivo per tutte le persone.
- **Vocabolario** — una lista di parole comuni (sostantivi e verbi), verificate una per una
  contro il turco reale, con traduzione in italiano. Cliccale per caricarle nel generatore.
- **Quiz** — mette alla prova le forme sopra: ti chiede "qual è l'accusativo di X?" e controlla
  la risposta, con punteggio salvato nel browser.
- **Cronologia** — le ultime parole cercate restano a portata di clic.

## Le correzioni linguistiche che ho fatto

Costruendo il motore ho trovato (e sistemato) dei bug linguistici reali:

1. **Armonizzazione D/T incompleta.** La regola turca dell'assimilazione consonantica
   ("fıstıkçı şahap": f, s, t, k, ç, ş, h, p) considerava solo 4 delle 8 consonanti sorde.
   Risultato: `kitap` + locativo diventava `kitapda` invece del corretto `kitapta`.
   Corretto in `src/linguistics/harmony.ts`.
2. **Il "dativo" non era un dativo.** La funzione calcolava in realtà il caso **locativo**
   (`-DA`, "in/a": `evde` = in casa), che è cosa diversa dal vero **dativo** (`-(y)A`, "verso/a":
   `eve` = verso casa). Ho separato le due funzioni: `makeLocative` e un vero `makeDative`.
   Vedi `src/linguistics/nounCases.ts`.
3. **Il generatore non era collegato all'interfaccia.** Il motore linguistico esisteva ed era
   testato, ma l'app non lo usava ancora per produrre nulla a schermo. Ho collegato davvero la
   UI alle funzioni linguistiche.
4. **Niente più dizionario da un servizio esterno fragile.** Ho creato un vocabolario curato a
   mano (`src/data/vocabulary.ts`), verificato parola per parola, così l'app resta un sito
   statico senza dipendenze da backend.

## I limiti (dichiarati, non nascosti)

Il motore linguistico resta volutamente semplice: è un generatore di regole, non un dizionario
completo del turco. Ci sono famiglie di eccezioni che **non** gestisce ancora, quindi le parole
che le usano sono escluse dal vocabolario verificato:

- verbi irregolari come `gitmek` (andare) → `gidiyor`, non `gitiyor`;
- eccezioni monosillabiche come `at` (cavallo) → `atı`, non `adı`;
- parole con una vocale che "cade" davanti a un suffisso vocalico, come `şehir` → `şehri`,
  `isim` → `ismi`, `su` → `suyun`.

Se scrivi nel generatore una parola che non è nel vocabolario verificato, un badge ⚠ ti avvisa
che il risultato è sperimentale e potrebbe contenere una di queste eccezioni.

## Stack tecnico

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [Vitest](https://vitest.dev/) per i test del motore linguistico (12 test, tutti verdi)
- Nessuna dipendenza da backend: è un sito statico, deploy automatico su GitHub Pages via
  GitHub Actions a ogni push su `main` (vedi `.github/workflows/deploy.yml`)

## Sviluppo in locale

```bash
npm install
npm run dev       # avvia il server di sviluppo
npm test          # esegue i test del motore linguistico
npm run build     # build di produzione in dist/
```

## Licenza

MIT (vedi [LICENSE](./LICENSE)).
