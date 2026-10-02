import { useEffect, useState } from 'react';
import { API_BASE_URL, toRecords } from '../api.js';
import CollectionState from './CollectionState.jsx';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkouts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/workouts/`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Richiesta non riuscita (${response.status})`);
        setWorkouts(toRecords(await response.json()));
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadWorkouts();
    return () => controller.abort();
  }, []);

  return (
    <section aria-labelledby="workouts-title">
      <div className="mb-4">
        <p className="text-uppercase small fw-semibold text-success mb-1">Allenamento</p>
        <h1 className="h2 mb-1" id="workouts-title">Workout</h1>
        <p className="text-body-secondary mb-0">Sessioni consigliate per il prossimo allenamento.</p>
      </div>
      <CollectionState loading={loading} error={error} records={workouts} emptyMessage="Nessun workout disponibile." />
      {!loading && !error && workouts.length > 0 && (
        <div className="list-group">
          {workouts.map((workout) => (
            <article className="list-group-item d-flex flex-wrap align-items-center justify-content-between gap-3 py-3" key={workout._id ?? workout.name}>
              <div>
                <h2 className="h6 mb-1">{workout.name ?? 'Workout'}</h2>
                <p className="small text-body-secondary mb-0">{workout.description ?? ''}</p>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <span className="badge text-bg-light border">{workout.durationMinutes ?? 0} min</span>
                <span className="badge text-bg-success">{workout.difficulty ?? 'Livello non indicato'}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}