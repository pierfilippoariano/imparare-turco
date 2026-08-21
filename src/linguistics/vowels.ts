export const UNROUNDED_BACK_VOWELS = ["a", "ı"]
export const ROUNDED_BACK_VOWELS = ["o", "u"]

export const UNROUNDED_FRONT_VOWELS = ["e", "i"]
export const ROUNDED_FRONT_VOWELS = ["ö", "ü"]

export const BACK_VOWELS = UNROUNDED_BACK_VOWELS.concat(ROUNDED_BACK_VOWELS)
export const FRONT_VOWELS = UNROUNDED_FRONT_VOWELS.concat(ROUNDED_FRONT_VOWELS)

export const VOWELS = BACK_VOWELS.concat(FRONT_VOWELS)

export function isVowel(letter: string): boolean {
  return VOWELS.includes(letter)
}

export function getLastVowel(word: string): string {
  const lastVowel = word
    .split("")
    .filter(isVowel)
    .reverse()[0]

  if (!lastVowel) throw new Error(`encountered word with no vowels: '${word}'`)

  return lastVowel
}

export function endsInVowel(word: string): boolean {
  return isVowel(word[word.length - 1])
}

export function bufferWithConsonant(word: string, consonant: string, suffix: string): string {
  if (endsInVowel(word)) {
    return word + consonant + suffix
  } else {
    return word + suffix
  }
}
