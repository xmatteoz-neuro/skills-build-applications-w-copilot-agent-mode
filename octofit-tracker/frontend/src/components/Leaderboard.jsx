import { useEffect, useState } from 'react';
import { API_BASE_URL, toRecords } from '../api.js';
import CollectionState from './CollectionState.jsx';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leaderboard/`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Richiesta non riuscita (${response.status})`);
        setEntries(toRecords(await response.json()));
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadLeaderboard();
    return () => controller.abort();
  }, []);

  return (
    <section aria-labelledby="leaderboard-title">
      <div className="mb-4">
        <p className="text-uppercase small fw-semibold text-success mb-1">Classifica</p>
        <h1 className="h2 mb-1" id="leaderboard-title">Leaderboard</h1>
        <p className="text-body-secondary mb-0">Punti e posizioni del periodo corrente.</p>
      </div>
      <CollectionState loading={loading} error={error} records={entries} emptyMessage="La classifica è ancora vuota." />
      {!loading && !error && entries.length > 0 && (
        <ol className="list-group list-group-numbered">
          {entries.map((entry) => (
            <li className="list-group-item d-flex align-items-center justify-content-between gap-3 py-3" key={entry._id ?? entry.user?._id}>
              <div>
                <h2 className="h6 mb-1">{entry.user?.name ?? 'Atleta'}</h2>
                <span className="small text-body-secondary text-capitalize">{entry.period ?? 'settimanale'}</span>
              </div>
              <span className="badge text-bg-success rounded-pill">{entry.points ?? 0} pt</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}