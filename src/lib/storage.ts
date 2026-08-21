// Piccolo wrapper su localStorage: non deve mai far crashare l'app (privacy
// browser, modalità incognito, storage pieno, ecc. possono far fallire le
// chiamate).

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeJSON<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignora: storage non disponibile o pieno
  }
}
