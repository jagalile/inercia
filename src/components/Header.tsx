import { Layers, SlidersHorizontal } from 'lucide-react'

interface HeaderProps {
  completedCount: number
  onOpenCompleted: () => void
  onOpenSettings: () => void
}

export default function Header({ completedCount, onOpenCompleted, onOpenSettings }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-5">
      <span className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400">Inercia</span>
      <div className="flex items-center gap-1">
        <button
          onClick={onOpenCompleted}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-stone-500 transition hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-neutral-800"
        >
          <Layers size={16} />
          {completedCount > 0 && <span className="tabular-nums">{completedCount}</span>}
        </button>
        <button
          onClick={onOpenSettings}
          aria-label="Datos y ajustes"
          className="rounded-full p-2 text-stone-500 transition hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-neutral-800"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </header>
  )
}
