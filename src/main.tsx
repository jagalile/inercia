import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// On some mobile browsers, refreshing restores the previous scroll
// position (or the address bar's show/hide cycle nudges it) before
// our single-screen layout has settled — which can leave the page
// scrolled a little, hiding the header even though nothing here is
// meant to scroll. Force it back to the top on every fresh load.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)
// Covers back/forward-cache restores, which can reapply an old
// scroll position even later than the checks above.
window.addEventListener('pageshow', () => window.scrollTo(0, 0))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
