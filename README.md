# Inercia

Una app minimalista para construir hábitos, un hábito cada vez. Sin
gamificación, sin puntos, sin castigos: solo un seguimiento honesto de
cómo va tu constancia, con números grandes y un color que refleja tu
adherencia real.

## Cómo funciona

- **Un hábito activo a la vez.** Lo creas, lo trabajas y, al llegar al
  final de su duración, lo completas — entonces pasa a tu historial y
  puedes empezar el siguiente.
- **Duración según dificultad:**
  - Simple — 21 días
  - Moderado — 66 días
  - Complejo — 90 días
- **Fases dentro del hábito** — Inicio, Consolidación y Maestría —
  proporcionales a la duración total (basadas en el reparto clásico
  21/66/90 para el hábito complejo, y escaladas para los demás).
- **Permisividad ante fallos**, puramente informativa (nunca hay
  penalización): al crear un hábito eliges cuánto margen de días
  fallados quieres llevar.

  | Dificultad | Estricto | Moderado | Laxo |
  | --- | --- | --- | --- |
  | Simple (21d) | 0 | 2 | 4 |
  | Moderado (66d) | 0 | 5 | 10 |
  | Complejo (90d) | 0 | 7 | 14 |

- **Racha flexible.** Un día sin marcar no rompe la racha mientras
  quede margen disponible; solo se reinicia si superas tu margen. Es
  un indicador, no una cuenta atrás punitiva.
- **Color por adherencia.** El fondo y los números grandes se tiñen
  según tu % de cumplimiento, en un degradado tranquilo de azul
  grisáceo (arrancando) a verde (sólido) — deliberadamente sin rojo.

## PWA

Es una Progressive Web App: se puede **instalar** (desde el menú del
navegador o el aviso de "Añadir a inicio" en móvil) y funciona
**offline** — el service worker (generado con `vite-plugin-pwa` sobre
Workbox) precachea toda la app, así que una vez cargada una primera
vez ya no necesita red. Al publicar una nueva versión, la app se
actualiza sola en segundo plano (`registerType: 'autoUpdate'`).

## Datos

Todo se guarda en `localStorage`, en tu navegador — no hay backend ni
cuentas. Desde el icono de ajustes puedes:

- **Exportar** todos tus hábitos a un `.json`.
- **Importar** un `.json` exportado antes, combinándolo con lo que
  tengas o reemplazándolo por completo.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # sirve el build de producción localmente
```

Stack: React + TypeScript + Tailwind CSS, con Vite como bundler.

## Despliegue en GitHub Pages

El repo incluye `.github/workflows/deploy.yml`: cada push a `main`
construye la app y la publica en GitHub Pages automáticamente.

Para activarlo en un repo nuevo:

1. Sube este proyecto a un repositorio de GitHub.
2. En **Settings → Pages**, en "Build and deployment" elige
   **GitHub Actions** como origen.
3. Haz push a `main` — el workflow se encarga del resto.

`vite.config.ts` usa `base: './'` (rutas relativas), así que el build
funciona en cualquier subruta (`https://<usuario>.github.io/<repo>/`)
sin tener que fijar el nombre del repositorio en la configuración.
