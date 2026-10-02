import { Navigate, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main className="container py-5">
            <header className="d-flex align-items-center gap-3 mb-4">
              <img src={octofitLogo} alt="OctoFit Tracker" width="80" height="80" />
              <h1 className="h2 mb-0">OctoFit Tracker</h1>
            </header>
            <p className="text-body-secondary">Applicazione pronta per lo sviluppo.</p>
          </main>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
