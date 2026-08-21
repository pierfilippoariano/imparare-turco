import { harmony2Way } from "./harmony"

export function pluralize(word: string): string {
  return word + pluralSuffix(word)
}

function pluralSuffix(word: string): string {
  return `l${harmony2Way(word)}r`
}
