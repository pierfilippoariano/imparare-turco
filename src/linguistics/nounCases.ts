import { bufferWithConsonant } from "./vowels"
import { harmony2Way, harmony4Way } from "./harmony"
import { harmonizeD } from "./harmony"
import { mutateFinalConsonant } from "./consonantMutation"

export function makeAccusative(word: string): string {
  return bufferWithConsonant(mutateFinalConsonant(word), "y", harmony4Way(word))
}
export function makeGenitive(word: string): string {
  return bufferWithConsonant(mutateFinalConsonant(word), "n", harmony4Way(word) + "n")
}

// -(y)A ("a", "verso"): moto a luogo / destinatario, es. "eve" = verso casa.
// NB: nel repository originale questa funzione si chiamava (erroneamente)
// makeDative, ma calcolava in realtà il caso locativo (-DA, "in/a"). Il vero
// dativo turco (-(y)A) mancava del tutto: aggiunto qui, seguendo lo stesso
// pattern di makeAccusative (mutazione consonantica + buffer con "y").
export function makeDative(word: string): string {
  return bufferWithConsonant(mutateFinalConsonant(word), "y", harmony2Way(word))
}

// -DA ("in, a"): stato in luogo, es. "evde" = in casa.
// Questa è la funzione che nell'originale si chiamava (a torto) makeDative.
export function makeLocative(word: string): string {
  const locativeSuffix = harmonizeD(word) + harmony2Way(word)

  return word + locativeSuffix
}

export function makeAblative(word: string): string {
  const ablative = `${harmonizeD(word)}${harmony2Way(word)}n`

  return word + ablative
}
