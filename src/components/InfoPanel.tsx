import { useLanguage } from '../i18n/LanguageContext'
import Modal from './Modal'

export default function InfoPanel({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()
  const info = t.infoPanel

  return (
    <Modal title={info.title} onClose={onClose} maxWidth="max-w-lg">
      <div className="space-y-6 text-[14px] leading-relaxed text-stone-600 dark:text-stone-300">
        <section>
          <p>{info.intro}</p>
        </section>

        <section>
          <h3 className="mb-1.5 text-sm font-semibold text-stone-800 dark:text-stone-100">
            {info.durationsHeading}
          </h3>
          <p>{info.durationsP1}</p>
          <p className="mt-2">{info.durationsP2}</p>
        </section>

        <section>
          <h3 className="mb-1.5 text-sm font-semibold text-stone-800 dark:text-stone-100">{info.phasesHeading}</h3>
          <p>{info.phasesP}</p>
        </section>

        <section>
          <h3 className="mb-1.5 text-sm font-semibold text-stone-800 dark:text-stone-100">{info.streaksHeading}</h3>
          <p>{info.streaksP}</p>
        </section>

        <section>
          <h3 className="mb-1.5 text-sm font-semibold text-stone-800 dark:text-stone-100">{info.colorsHeading}</h3>
          <p>{info.colorsP}</p>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-stone-800 dark:text-stone-100">{info.sourcesHeading}</h3>
          <ul className="space-y-3">
            {info.sources.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-stone-800 underline decoration-stone-300 underline-offset-2 hover:decoration-stone-500 dark:text-stone-200 dark:decoration-neutral-600 dark:hover:decoration-stone-400"
                >
                  {s.label}
                </a>
                <p className="mt-0.5 text-[12px] text-stone-400">{s.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Modal>
  )
}
