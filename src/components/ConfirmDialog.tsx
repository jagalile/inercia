import Modal from './Modal'
import { useLanguage } from '../i18n/LanguageContext'

interface ConfirmDialogProps {
  title: string
  description: string
  confirmLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  title,
  description,
  confirmLabel,
  danger,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { t } = useLanguage()
  return (
    <Modal title={title} onClose={onCancel} maxWidth="max-w-sm">
      <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">{description}</p>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-full px-4 py-2 text-sm font-medium text-stone-500 transition hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-neutral-800"
        >
          {t.common.cancel}
        </button>
        <button
          onClick={onConfirm}
          className={`rounded-full px-4 py-2 text-sm font-medium text-white transition ${
            danger ? 'bg-stone-900 hover:bg-red-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-red-500 dark:hover:text-white' : 'bg-stone-900 hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white'
          }`}
        >
          {confirmLabel ?? t.common.confirm}
        </button>
      </div>
    </Modal>
  )
}
