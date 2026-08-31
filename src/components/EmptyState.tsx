import { Plus } from 'lucide-react'

interface EmptyStateProps {
  onCreate: () => void
  hasCompleted: boolean
}

export default function EmptyState({ onCreate, hasCompleted }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center animate-fade-in">
      <div className="mb-6 h-16 w-16 rounded-full border-2 border-dashed border-stone-300 dark:border-neutral-700" />
      <h1 className="text-2xl font-semibold tracking-tight text-stone-800 dark:text-stone-100">
        {hasCompleted ? 'Elige tu próximo hábito' : 'Empieza con un hábito'}
      </h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-500 dark:text-stone-400">
        Uno a la vez. Sin listas interminables ni presión — solo el que estás construyendo ahora.
      </p>
      <button
        onClick={onCreate}
        className="mt-8 flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-stone-900/10 transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
      >
        <Plus size={17} />
        Nuevo hábito
      </button>
    </div>
  )
}
