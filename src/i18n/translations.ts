import type { Difficulty, MoodKey, PhaseLabelKey } from '../types'
import type { ImportErrorReason } from '../lib/storage'

export interface Dict {
  common: {
    cancel: string
    close: string
    confirm: string
  }
  emptyState: {
    titleNew: string
    titleAgain: string
    subtitle: string
    cta: string
  }
  header: {
    infoAria: string
    settingsAria: string
  }
  difficulty: Record<Difficulty, string>
  permissiveness: {
    estricto: string
    moderado: string
    laxo: string
  }
  phase: Record<PhaseLabelKey, string>
  mood: Record<MoodKey, string>
  habitForm: {
    titleNew: string
    titleEdit: string
    nameLabel: string
    namePlaceholder: string
    descLabel: string
    descOptional: string
    descPlaceholder: string
    difficultyLabel: string
    days: (n: number) => string
    permissivenessLabel: string
    noMargin: string
    marginDays: (n: number) => string
    marginNote: string
    startsToday: string
    nameRequired: string
    submitNew: string
    submitEdit: string
  }
  activeHero: {
    editAria: string
    deleteAria: string
    dayOfHabit: string
    streakLabel: string
    adherenceLabel: string
    strictNote: string
    marginUsed: (used: number, total: number) => string
    informativeSuffix: string
    finishedTitle: (duration: number) => string
    finishedSubtitle: (dateStr: string, adherence: number) => string
    completeButton: string
    todayLabel: string
    doneButton: string
    missedButton: string
    todayDoneStatus: string
    todayMissedStatus: string
    undo: string
  }
  completedPanel: {
    title: (n: number) => string
    empty: string
    days: (n: number) => string
  }
  completedHabitDetail: {
    title: string
    adherenceFinal: string
    daysCaption: (difficultyLabel: string) => string
    daysCompletedLabel: string
    finalStreakLabel: string
    permissivenessLabel: string
    reopen: string
    delete: string
  }
  settingsPanel: {
    title: string
    exportTitle: string
    exportSubtitle: (n: number) => string
    importTitle: string
    importSubtitle: string
    installTitle: string
    installAndroidLabel: string
    installAndroidSteps: string
    installIphoneLabel: string
    installIphoneSteps: string
    installDesktopLabel: string
    installDesktopSteps: string
    languageLabel: string
    importFound: (n: number) => string
    mergeButton: string
    replaceButton: string
    errorGeneric: string
    importErrors: Record<ImportErrorReason, string>
  }
  infoPanel: {
    title: string
    intro: string
    durationsHeading: string
    durationsP1: string
    durationsP2: string
    phasesHeading: string
    phasesP: string
    streaksHeading: string
    streaksP: string
    colorsHeading: string
    colorsP: string
    sourcesHeading: string
    sources: { label: string; detail: string; href: string }[]
  }
  dialogs: {
    deleteTitle: string
    deleteDescription: (name: string) => string
    deleteConfirm: string
    reopenBlockedTitle: string
    reopenBlockedDescription: string
    gotIt: string
  }
}

const SOURCE_LINKS = [
  'https://doi.org/10.1002/ejsp.674',
  'https://jamesclear.com/new-habit',
  'https://doi.org/10.1037/0003-066X.55.1.68',
  'https://doi.org/10.1177/0146167212445599',
] as const

export const es: Dict = {
  common: {
    cancel: 'Cancelar',
    close: 'Cerrar',
    confirm: 'Confirmar',
  },
  emptyState: {
    titleNew: 'Empieza con un hábito',
    titleAgain: 'Elige tu próximo hábito',
    subtitle:
      'Uno a la vez. Sin listas interminables ni presión — solo el que estás construyendo ahora.',
    cta: 'Nuevo hábito',
  },
  header: {
    infoAria: 'Cómo funciona Inercia',
    settingsAria: 'Datos y ajustes',
  },
  difficulty: {
    simple: 'Simple',
    moderado: 'Moderado',
    complejo: 'Complejo',
  },
  permissiveness: {
    estricto: 'Estricto',
    moderado: 'Moderado',
    laxo: 'Laxo',
  },
  phase: {
    inicio: 'Inicio',
    consolidacion: 'Consolidación',
    maestria: 'Maestría',
    cierre: 'Cierre',
  },
  mood: {
    starting: 'Arrancando',
    gaining: 'Cogiendo forma',
    moving: 'En marcha',
    steady: 'Firme',
    solid: 'Sólido',
  },
  habitForm: {
    titleNew: 'Nuevo hábito',
    titleEdit: 'Editar hábito',
    nameLabel: 'Nombre',
    namePlaceholder: 'Ej. Leer 10 páginas',
    descLabel: 'Descripción',
    descOptional: '(opcional)',
    descPlaceholder: '¿Por qué te importa este hábito?',
    difficultyLabel: 'Dificultad',
    days: (n) => `${n} días`,
    permissivenessLabel: 'Permisividad ante fallos',
    noMargin: 'Sin días de margen.',
    marginDays: (n) => `${n} ${n === 1 ? 'día' : 'días'} de margen.`,
    marginNote: 'Solo informativo: superarlo no penaliza.',
    startsToday: 'Se inicia hoy.',
    nameRequired: 'Ponle un nombre al hábito.',
    submitNew: 'Empezar hábito',
    submitEdit: 'Guardar cambios',
  },
  activeHero: {
    editAria: 'Editar hábito',
    deleteAria: 'Eliminar hábito',
    dayOfHabit: 'día del hábito',
    streakLabel: 'Racha flexible',
    adherenceLabel: 'Adherencia',
    strictNote: 'Nivel estricto: cada día cuenta, sin margen.',
    marginUsed: (used, total) => `Margen usado: ${used} de ${total} días.`,
    informativeSuffix: 'Son datos informativos — no hay penalización.',
    finishedTitle: (duration) => `Has llegado al final de los ${duration} días.`,
    finishedSubtitle: (dateStr, adherence) => `Iniciado el ${dateStr} · adherencia final ${adherence}%`,
    completeButton: 'Completar y empezar otro',
    todayLabel: 'Hoy',
    doneButton: 'Lo he cumplido',
    missedButton: 'Hoy no',
    todayDoneStatus: 'Hoy: cumplido ✓',
    todayMissedStatus: 'Hoy: sin cumplir',
    undo: 'Deshacer',
  },
  completedPanel: {
    title: (n) => `Hábitos completados (${n})`,
    empty: 'Todavía no has completado ningún hábito. Aparecerá aquí en cuanto termines el actual.',
    days: () => 'días',
  },
  completedHabitDetail: {
    title: 'Hábito completado',
    adherenceFinal: 'adherencia final',
    daysCaption: (difficultyLabel) => `días · ${difficultyLabel}`,
    daysCompletedLabel: 'días cumplidos',
    finalStreakLabel: 'racha final',
    permissivenessLabel: 'permisividad',
    reopen: 'Reabrir',
    delete: 'Eliminar',
  },
  settingsPanel: {
    title: 'Datos',
    exportTitle: 'Exportar a JSON',
    exportSubtitle: (n) => `${n} ${n === 1 ? 'hábito' : 'hábitos'} · copia de seguridad local`,
    importTitle: 'Importar desde JSON',
    importSubtitle: 'Restaura o combina hábitos guardados',
    installTitle: 'Instalar la app',
    installAndroidLabel: 'Android:',
    installAndroidSteps: 'menú ⋮ → «Añadir a pantalla de inicio».',
    installIphoneLabel: 'iPhone:',
    installIphoneSteps: 'Compartir → «Añadir a pantalla de inicio».',
    installDesktopLabel: 'Escritorio:',
    installDesktopSteps: 'icono ⊕ en la barra de direcciones.',
    languageLabel: 'Idioma',
    importFound: (n) =>
      `Se ${n === 1 ? 'ha encontrado 1 hábito' : `han encontrado ${n} hábitos`} en el archivo. ¿Cómo quieres importarlos?`,
    mergeButton: 'Combinar con lo que ya tengo',
    replaceButton: 'Reemplazar todo',
    errorGeneric: 'No se ha podido leer el archivo.',
    importErrors: {
      invalid_json: 'El archivo no es JSON válido.',
      bad_format: 'El archivo no tiene el formato esperado de Inercia.',
      no_habits: 'No se ha encontrado ningún hábito válido en el archivo.',
    },
  },
  infoPanel: {
    title: 'Cómo funciona Inercia',
    intro:
      'Inercia no puntúa, no premia ni castiga. Solo te muestra, con la mayor honestidad posible, cómo va tu constancia — para que la decisión de seguir sea siempre tuya.',
    durationsHeading: '¿Por qué 21 / 66 / 90 días?',
    durationsP1:
      'El número con más respaldo es el 66: un estudio de Lally et al. (2010) hizo un seguimiento diario de 96 personas formando un hábito nuevo y encontró que, de media, tardaron 66 días en alcanzar la automaticidad — con un rango real muy amplio, de 18 a 254 días según la persona y el hábito.',
    durationsP2:
      'Los 21 días vienen de otra parte: una observación de 1960 del cirujano Maxwell Maltz, no de un estudio de hábitos. Se ha popularizado como regla general, y aquí lo usamos así — como un punto de entrada honesto para hábitos pequeños, no como un número mágico. Los 90 días son una extensión práctica para hábitos más exigentes o de identidad, pensada para dar margen de sobra por encima de la media observada por Lally.',
    phasesHeading: 'Fases: inicio, consolidación, maestría',
    phasesP:
      'El mismo estudio observó que la automaticidad no crece en línea recta: al principio sube deprisa y con esfuerzo consciente, luego el ritmo se suaviza hasta estabilizarse. Las tres fases son una forma de visualizar esa curva — no un modelo medido con la misma precisión que la duración, pero sí coherente con lo que se observó.',
    streaksHeading: 'Rachas flexibles y margen de fallo',
    streaksP:
      'El hallazgo que más ha influido en Inercia es este: en el estudio de Lally, fallar un día suelto no afectó de forma apreciable a la formación del hábito. De ahí la racha flexible — un día sin marcar no la reinicia mientras quede margen. Los días de margen concretos (0 / 2–4 / 5–10 / 7–14 según dificultad y nivel) son una proporción orientativa nuestra sobre esa idea, no una cifra sacada de ningún estudio.',
    colorsHeading: 'Colores en vez de castigos',
    colorsP:
      'La teoría de la autodeterminación (Ryan & Deci) muestra que la motivación que dura en el tiempo es la que sale de uno mismo, no la que depende de premios o castigos externos. Y la investigación sobre autocompasión (Breines & Chen) encuentra que tratarse con dureza tras un fallo reduce las ganas de mejorar, mientras que la autocompasión las aumenta. Por eso el color de fondo y los números solo informan de tu adherencia — en un degradado sin rojo, sin urgencia — y nunca penalizan.',
    sourcesHeading: 'Fuentes',
    sources: [
      {
        label: 'Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010)',
        detail:
          '"How are habits formed: Modelling habit formation in the real world." European Journal of Social Psychology, 40(6), 998–1009.',
        href: SOURCE_LINKS[0],
      },
      {
        label: 'Clear, J. — "How Long Does it Actually Take to Form a New Habit?"',
        detail:
          'Resumen divulgativo del estudio anterior y del origen del mito de los 21 días (Maxwell Maltz, 1960).',
        href: SOURCE_LINKS[1],
      },
      {
        label: 'Ryan, R. M., & Deci, E. L. (2000)',
        detail:
          '"Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being." American Psychologist, 55(1), 68–78.',
        href: SOURCE_LINKS[2],
      },
      {
        label: 'Breines, J. G., & Chen, S. (2012)',
        detail:
          '"Self-compassion increases self-improvement motivation." Personality and Social Psychology Bulletin, 38(9), 1133–1143.',
        href: SOURCE_LINKS[3],
      },
    ],
  },
  dialogs: {
    deleteTitle: 'Eliminar hábito',
    deleteDescription: (name) =>
      `Se eliminará "${name}" y todo su historial de forma permanente. Esta acción no se puede deshacer.`,
    deleteConfirm: 'Eliminar',
    reopenBlockedTitle: 'Ya tienes un hábito activo',
    reopenBlockedDescription:
      'Solo puedes trabajar un hábito a la vez. Completa o elimina el hábito activo antes de reabrir este.',
    gotIt: 'Entendido',
  },
}

export const en: Dict = {
  common: {
    cancel: 'Cancel',
    close: 'Close',
    confirm: 'Confirm',
  },
  emptyState: {
    titleNew: 'Start a habit',
    titleAgain: 'Choose your next habit',
    subtitle: 'One at a time. No endless lists, no pressure — just the one you’re building now.',
    cta: 'New habit',
  },
  header: {
    infoAria: 'How Inercia works',
    settingsAria: 'Data & settings',
  },
  difficulty: {
    simple: 'Simple',
    moderado: 'Moderate',
    complejo: 'Complex',
  },
  permissiveness: {
    estricto: 'Strict',
    moderado: 'Moderate',
    laxo: 'Lax',
  },
  phase: {
    inicio: 'Start',
    consolidacion: 'Consolidation',
    maestria: 'Mastery',
    cierre: 'Wrap-up',
  },
  mood: {
    starting: 'Starting out',
    gaining: 'Gaining shape',
    moving: 'In motion',
    steady: 'Steady',
    solid: 'Solid',
  },
  habitForm: {
    titleNew: 'New habit',
    titleEdit: 'Edit habit',
    nameLabel: 'Name',
    namePlaceholder: 'E.g. Read 10 pages',
    descLabel: 'Description',
    descOptional: '(optional)',
    descPlaceholder: 'Why does this habit matter to you?',
    difficultyLabel: 'Difficulty',
    days: (n) => `${n} days`,
    permissivenessLabel: 'Slip tolerance',
    noMargin: 'No margin days.',
    marginDays: (n) => `${n} margin ${n === 1 ? 'day' : 'days'}.`,
    marginNote: 'Just informative: going over it doesn’t penalize you.',
    startsToday: 'Starts today.',
    nameRequired: 'Give the habit a name.',
    submitNew: 'Start habit',
    submitEdit: 'Save changes',
  },
  activeHero: {
    editAria: 'Edit habit',
    deleteAria: 'Delete habit',
    dayOfHabit: 'day of the habit',
    streakLabel: 'Flexible streak',
    adherenceLabel: 'Adherence',
    strictNote: 'Strict level: every day counts, no margin.',
    marginUsed: (used, total) => `Margin used: ${used} of ${total} days.`,
    informativeSuffix: 'This is just information — there’s no penalty.',
    finishedTitle: (duration) => `You’ve reached the end of the ${duration} days.`,
    finishedSubtitle: (dateStr, adherence) => `Started on ${dateStr} · final adherence ${adherence}%`,
    completeButton: 'Complete and start another',
    todayLabel: 'Today',
    doneButton: 'Did it today',
    missedButton: 'Not today',
    todayDoneStatus: 'Today: done ✓',
    todayMissedStatus: 'Today: not done',
    undo: 'Undo',
  },
  completedPanel: {
    title: (n) => `Completed habits (${n})`,
    empty: 'You haven’t completed a habit yet. It’ll show up here once you finish your current one.',
    days: () => 'days',
  },
  completedHabitDetail: {
    title: 'Completed habit',
    adherenceFinal: 'final adherence',
    daysCaption: (difficultyLabel) => `days · ${difficultyLabel}`,
    daysCompletedLabel: 'days completed',
    finalStreakLabel: 'final streak',
    permissivenessLabel: 'slip tolerance',
    reopen: 'Reopen',
    delete: 'Delete',
  },
  settingsPanel: {
    title: 'Data',
    exportTitle: 'Export to JSON',
    exportSubtitle: (n) => `${n} ${n === 1 ? 'habit' : 'habits'} · local backup`,
    importTitle: 'Import from JSON',
    importSubtitle: 'Restore or merge saved habits',
    installTitle: 'Install the app',
    installAndroidLabel: 'Android:',
    installAndroidSteps: 'menu ⋮ → “Add to Home screen”.',
    installIphoneLabel: 'iPhone:',
    installIphoneSteps: 'Share → “Add to Home Screen”.',
    installDesktopLabel: 'Desktop:',
    installDesktopSteps: '⊕ icon in the address bar.',
    languageLabel: 'Language',
    importFound: (n) =>
      `Found ${n === 1 ? '1 habit' : `${n} habits`} in the file. How do you want to import ${n === 1 ? 'it' : 'them'}?`,
    mergeButton: 'Merge with what I have',
    replaceButton: 'Replace everything',
    errorGeneric: 'Couldn’t read the file.',
    importErrors: {
      invalid_json: 'The file isn’t valid JSON.',
      bad_format: 'The file isn’t in the format Inercia expects.',
      no_habits: 'No valid habit was found in the file.',
    },
  },
  infoPanel: {
    title: 'How Inercia works',
    intro:
      'Inercia doesn’t score, reward, or punish. It just shows you, as honestly as possible, how your consistency is going — so the decision to keep going is always yours.',
    durationsHeading: 'Why 21 / 66 / 90 days?',
    durationsP1:
      'The number with the strongest backing is 66: a study by Lally et al. (2010) tracked 96 people daily as they built a new habit and found it took, on average, 66 days to reach automaticity — with a very wide real range, from 18 to 254 days depending on the person and the habit.',
    durationsP2:
      'The 21 days come from somewhere else: a 1960 observation by surgeon Maxwell Maltz, not a habit study. It became a popular rule of thumb, and that’s how we use it here — as an honest entry point for small habits, not a magic number. The 90 days are our own practical extension for harder or identity-level habits, meant to give plenty of room beyond the average Lally observed.',
    phasesHeading: 'Phases: start, consolidation, mastery',
    phasesP:
      'The same study found that automaticity doesn’t grow in a straight line: it climbs fast at first, with conscious effort, then the pace eases off until it levels out. The three phases are a way of visualizing that curve — not a model measured with the same precision as the duration itself, but consistent with what was observed.',
    streaksHeading: 'Flexible streaks and slip margin',
    streaksP:
      'The finding that shaped Inercia the most is this: in Lally’s study, missing a single day didn’t noticeably affect habit formation. Hence the flexible streak — an unmarked day doesn’t reset it as long as there’s margin left. The specific margin days (0 / 2–4 / 5–10 / 7–14 depending on difficulty and level) are our own rough proportion built on that idea, not a figure taken from any study.',
    colorsHeading: 'Color instead of punishment',
    colorsP:
      'Self-determination theory (Ryan & Deci) shows that motivation which lasts comes from within, not from external rewards or punishments. And self-compassion research (Breines & Chen) finds that being hard on yourself after a setback lowers your drive to improve, while self-compassion raises it. That’s why the background color and the numbers only inform you of your adherence — in a gradient with no red, no urgency — and never penalize.',
    sourcesHeading: 'Sources',
    sources: [
      {
        label: 'Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010)',
        detail:
          '"How are habits formed: Modelling habit formation in the real world." European Journal of Social Psychology, 40(6), 998–1009.',
        href: SOURCE_LINKS[0],
      },
      {
        label: 'Clear, J. — "How Long Does it Actually Take to Form a New Habit?"',
        detail: 'A plain-language summary of the study above and the origin of the 21-day myth (Maxwell Maltz, 1960).',
        href: SOURCE_LINKS[1],
      },
      {
        label: 'Ryan, R. M., & Deci, E. L. (2000)',
        detail:
          '"Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being." American Psychologist, 55(1), 68–78.',
        href: SOURCE_LINKS[2],
      },
      {
        label: 'Breines, J. G., & Chen, S. (2012)',
        detail:
          '"Self-compassion increases self-improvement motivation." Personality and Social Psychology Bulletin, 38(9), 1133–1143.',
        href: SOURCE_LINKS[3],
      },
    ],
  },
  dialogs: {
    deleteTitle: 'Delete habit',
    deleteDescription: (name) =>
      `"${name}" and all of its history will be permanently deleted. This can’t be undone.`,
    deleteConfirm: 'Delete',
    reopenBlockedTitle: 'You already have an active habit',
    reopenBlockedDescription:
      'You can only work on one habit at a time. Complete or delete the active habit before reopening this one.',
    gotIt: 'Got it',
  },
}

export const dictionaries = { es, en }
