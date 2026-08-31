import { useRef, useState } from 'react'
import { Download, Smartphone, Upload } from 'lucide-react'
import type { Habit, Lang } from '../types'
import { downloadExport, ImportError, parseImport } from '../lib/storage'
import { useLanguage } from '../i18n/LanguageContext'
import Modal from './Modal'

interface SettingsPanelProps {
  habits: Habit[]
  onClose: () => void
  onImport: (habits: Habit[], mode: 'merge' | 'replace') => void
}

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
]

export default function SettingsPanel({ habits, onClose, onImport }: SettingsPanelProps) {
  const { t, lang, setLang } = useLanguage()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState('')
  const [pendingImport, setPendingImport] = useState<Habit[] | null>(null)

  const handleFile = async (file: File) => {
    setError('')
    try {
      const text = await file.text()
      const parsed = parseImport(text)
      setPendingImport(parsed)
    } catch (err) {
      setError(err instanceof ImportError ? t.settingsPanel.importErrors[err.reason] : t.settingsPanel.errorGeneric)
    }
  }

  return (
    <Modal title={t.settingsPanel.title} onClose={onClose} maxWidth="max-w-sm">
      <div className="mb-5">
        <p className="mb-2 text-sm font-medium text-stone-700 dark:text-stone-300">{t.settingsPanel.languageLabel}</p>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                lang === code
                  ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                  : 'border-stone-200 text-stone-600 hover:border-stone-300 dark:border-neutral-700 dark:text-stone-300 dark:hover:border-neutral-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => downloadExport(habits, lang)}
          disabled={habits.length === 0}
          className="flex w-full items-center gap-3 rounded-2xl border border-stone-200 p-4 text-left transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-800 dark:hover:bg-neutral-800/60"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 dark:bg-neutral-800">
            <Download size={17} className="text-stone-600 dark:text-stone-300" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-stone-800 dark:text-stone-100">
              {t.settingsPanel.exportTitle}
            </span>
            <span className="block text-xs text-stone-400">{t.settingsPanel.exportSubtitle(habits.length)}</span>
          </span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center gap-3 rounded-2xl border border-stone-200 p-4 text-left transition hover:bg-stone-50 dark:border-neutral-800 dark:hover:bg-neutral-800/60"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 dark:bg-neutral-800">
            <Upload size={17} className="text-stone-600 dark:text-stone-300" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-stone-800 dark:text-stone-100">
              {t.settingsPanel.importTitle}
            </span>
            <span className="block text-xs text-stone-400">{t.settingsPanel.importSubtitle}</span>
          </span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="mt-5 flex gap-3 rounded-2xl border border-stone-200 p-4 dark:border-neutral-800">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 dark:bg-neutral-800">
          <Smartphone size={17} className="text-stone-600 dark:text-stone-300" />
        </span>
        <div className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
          <p className="mb-1 text-sm font-semibold text-stone-800 dark:text-stone-100">{t.settingsPanel.installTitle}</p>
          <p>
            <strong className="font-medium text-stone-600 dark:text-stone-300">
              {t.settingsPanel.installAndroidLabel}
            </strong>{' '}
            {t.settingsPanel.installAndroidSteps}
          </p>
          <p>
            <strong className="font-medium text-stone-600 dark:text-stone-300">
              {t.settingsPanel.installIphoneLabel}
            </strong>{' '}
            {t.settingsPanel.installIphoneSteps}
          </p>
          <p>
            <strong className="font-medium text-stone-600 dark:text-stone-300">
              {t.settingsPanel.installDesktopLabel}
            </strong>{' '}
            {t.settingsPanel.installDesktopSteps}
          </p>
        </div>
      </div>

      {pendingImport && (
        <div className="mt-5 rounded-2xl border border-stone-200 p-4 dark:border-neutral-800">
          <p className="text-sm text-stone-600 dark:text-stone-300">{t.settingsPanel.importFound(pendingImport.length)}</p>
          <div className="mt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                onImport(pendingImport, 'merge')
                setPendingImport(null)
                onClose()
              }}
              className="rounded-full bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
            >
              {t.settingsPanel.mergeButton}
            </button>
            <button
              onClick={() => {
                onImport(pendingImport, 'replace')
                setPendingImport(null)
                onClose()
              }}
              className="rounded-full border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50 dark:border-neutral-700 dark:text-stone-300 dark:hover:bg-neutral-800"
            >
              {t.settingsPanel.replaceButton}
            </button>
            <button
              onClick={() => setPendingImport(null)}
              className="rounded-full px-4 py-2 text-sm text-stone-400 transition hover:bg-stone-100 dark:hover:bg-neutral-800"
            >
              {t.common.cancel}
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
