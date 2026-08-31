import Modal from './Modal'

interface Source {
  label: string
  detail: string
  href: string
}

const SOURCES: Source[] = [
  {
    label: 'Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010)',
    detail:
      '"How are habits formed: Modelling habit formation in the real world." European Journal of Social Psychology, 40(6), 998–1009.',
    href: 'https://doi.org/10.1002/ejsp.674',
  },
  {
    label: 'Clear, J. — "How Long Does it Actually Take to Form a New Habit?"',
    detail: 'Resumen divulgativo del estudio anterior y del origen del mito de los 21 días (Maxwell Maltz, 1960).',
    href: 'https://jamesclear.com/new-habit',
  },
  {
    label: 'Ryan, R. M., & Deci, E. L. (2000)',
    detail:
      '"Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being." American Psychologist, 55(1), 68–78.',
    href: 'https://doi.org/10.1037/0003-066X.55.1.68',
  },
  {
    label: 'Breines, J. G., & Chen, S. (2012)',
    detail:
      '"Self-compassion increases self-improvement motivation." Personality and Social Psychology Bulletin, 38(9), 1133–1143.',
    href: 'https://doi.org/10.1177/0146167212445599',
  },
]

export default function InfoPanel({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Cómo funciona Inercia" onClose={onClose} maxWidth="max-w-lg">
      <div className="space-y-6 text-[14px] leading-relaxed text-stone-600 dark:text-stone-300">
        <section>
          <p>
            Inercia no puntúa, no premia ni castiga. Solo te muestra, con la mayor honestidad
            posible, cómo va tu constancia — para que la decisión de seguir sea siempre tuya.
          </p>
        </section>

        <section>
          <h3 className="mb-1.5 text-sm font-semibold text-stone-800 dark:text-stone-100">
            ¿Por qué 21 / 66 / 90 días?
          </h3>
          <p>
            El número con más respaldo es el <strong>66</strong>: un estudio de Lally et al. (2010)
            hizo un seguimiento diario de 96 personas formando un hábito nuevo y encontró que, de
            media, tardaron <strong>66 días</strong> en alcanzar la automaticidad — con un rango
            real muy amplio, de 18 a 254 días según la persona y el hábito.
          </p>
          <p className="mt-2">
            Los <strong>21 días</strong> vienen de otra parte: una observación de 1960 del cirujano
            Maxwell Maltz, no de un estudio de hábitos. Se ha popularizado como regla general, y
            aquí lo usamos así — como un punto de entrada honesto para hábitos pequeños, no como un
            número mágico. Los <strong>90 días</strong> son una extensión práctica para hábitos más
            exigentes o de identidad, pensada para dar margen de sobra por encima de la media
            observada por Lally.
          </p>
        </section>

        <section>
          <h3 className="mb-1.5 text-sm font-semibold text-stone-800 dark:text-stone-100">
            Fases: inicio, consolidación, maestría
          </h3>
          <p>
            El mismo estudio observó que la automaticidad no crece en línea recta: al principio
            sube deprisa y con esfuerzo consciente, luego el ritmo se suaviza hasta estabilizarse.
            Las tres fases son una forma de visualizar esa curva — no un modelo medido con la misma
            precisión que la duración, pero sí coherente con lo que se observó.
          </p>
        </section>

        <section>
          <h3 className="mb-1.5 text-sm font-semibold text-stone-800 dark:text-stone-100">
            Rachas flexibles y margen de fallo
          </h3>
          <p>
            El hallazgo que más ha influido en Inercia es este: en el estudio de Lally,{' '}
            <em>fallar un día suelto no afectó de forma apreciable a la formación del hábito</em>.
            De ahí la racha flexible — un día sin marcar no la reinicia mientras quede margen. Los
            días de margen concretos (0 / 2–4 / 5–10 / 7–14 según dificultad y nivel) son una
            proporción orientativa nuestra sobre esa idea, no una cifra sacada de ningún estudio.
          </p>
        </section>

        <section>
          <h3 className="mb-1.5 text-sm font-semibold text-stone-800 dark:text-stone-100">
            Colores en vez de castigos
          </h3>
          <p>
            La teoría de la autodeterminación (Ryan &amp; Deci) muestra que la motivación que dura
            en el tiempo es la que sale de uno mismo, no la que depende de premios o castigos
            externos. Y la investigación sobre autocompasión (Breines &amp; Chen) encuentra que
            tratarse con dureza tras un fallo reduce las ganas de mejorar, mientras que la
            autocompasión las aumenta. Por eso el color de fondo y los números solo informan de tu
            adherencia — en un degradado sin rojo, sin urgencia — y nunca penalizan.
          </p>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-stone-800 dark:text-stone-100">Fuentes</h3>
          <ul className="space-y-3">
            {SOURCES.map((s) => (
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
