import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

interface ModalProps {
  title: string
  onClose: () => void
  children: ReactNode
  maxWidth?: string
}

export default function Modal({ title, onClose, children, maxWidth = 'max-w-md' }: ModalProps) {
  const { t } = useLanguage()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 p-4 backdrop-blur-sm animate-fade-in dark:bg-black/60"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={`w-full ${maxWidth} max-h-[85vh] overflow-y-auto rounded-3xl border border-stone-200 bg-white p-6 shadow-2xl shadow-stone-900/10 animate-scale-in dark:border-neutral-800 dark:bg-neutral-900`}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            aria-label={t.common.close}
            className="rounded-full p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-neutral-800 dark:hover:text-stone-200"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
