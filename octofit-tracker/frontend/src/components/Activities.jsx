import { useEffect, useState } from 'react';
import { API_BASE_URL, toRecords } from '../api.js';
import CollectionState from './CollectionState.jsx';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivities() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/activities/`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Richiesta non riuscita (${response.status})`);
        setActivities(toRecords(await response.json()));
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadActivities();
    return () => controller.abort();
  }, []);

  return (
    <section aria-labelledby="activities-title">
      <div className="mb-4">
        <p className="text-uppercase small fw-semibold text-success mb-1">Movimento</p>
        <h1 className="h2 mb-1" id="activities-title">Attività</h1>
        <p className="text-body-secondary mb-0">Le sessioni registrate dalla community.</p>
      </div>
      <CollectionState loading={loading} error={error} records={activities} emptyMessage="Nessuna attività registrata." />
      {!loading && !error && activities.length > 0 && (
        <div className="list-group">
          {activities.map((activity) => (
            <article className="list-group-item py-3" key={activity._id ?? `${activity.user?._id}-${activity.performedAt}`}>
              <div className="d-flex flex-wrap justify-content-between gap-2">
                <div>
                  <h2 className="h6 mb-1 text-capitalize">{activity.type ?? 'Attività'}</h2>
                  <p className="small text-body-secondary mb-0">{activity.user?.name ?? 'Utente'}</p>
                </div>
                <div className="text-sm-end small">
                  <span className="me-3">{activity.durationMinutes ?? 0} min</span>
                  <span>{activity.calories ?? 0} kcal</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}