import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Lang } from '../types'
import { dictionaries } from './translations'
import type { Dict } from './translations'

const STORAGE_KEY = 'inercia:lang'
const SUPPORTED: Lang[] = ['es', 'en']

function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'es'
  const candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]
  for (const candidate of candidates) {
    if (candidate?.toLowerCase().startsWith('es')) return 'es'
    if (candidate?.toLowerCase().startsWith('en')) return 'en'
  }
  return 'es'
}

function loadStoredLang(): Lang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored && (SUPPORTED as string[]).includes(stored) ? (stored as Lang) : null
  } catch {
    return null
  }
}

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dict
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => loadStoredLang() ?? detectLang())

  const setLang = (next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private mode / storage unavailable — the choice just won't
      // persist across reloads, which is an acceptable fallback.
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<LanguageContextValue>(() => ({ lang, setLang, t: dictionaries[lang] }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
