import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import octofitLogo from '../../../docs/octofitapp-small.png';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navigation = [
  { label: 'Atleti', path: '/users' },
  { label: 'Team', path: '/teams' },
  { label: 'Attività', path: '/activities' },
  { label: 'Classifica', path: '/leaderboard' },
  { label: 'Workout', path: '/workouts' },
];

export default function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <header className="bg-white border-bottom">
        <div className="container-xl d-flex flex-wrap align-items-center justify-content-between gap-3 py-3">
          <NavLink className="d-flex align-items-center gap-3 text-decoration-none text-dark" to="/users">
            <img src={octofitLogo} alt="" width="48" height="48" />
            <span className="h5 mb-0">OctoFit Tracker</span>
          </NavLink>
          <nav aria-label="Navigazione principale" className="d-flex flex-wrap gap-1">
            {navigation.map(({ label, path }) => (
              <NavLink
                className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-success' : 'btn-outline-secondary'}`}
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container-xl py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  );
}