import { useEffect, useState } from 'react';
import { API_BASE_URL, toRecords } from '../api.js';
import CollectionState from './CollectionState.jsx';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeams() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/teams/`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Richiesta non riuscita (${response.status})`);
        setTeams(toRecords(await response.json()));
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadTeams();
    return () => controller.abort();
  }, []);

  return (
    <section aria-labelledby="teams-title">
      <div className="mb-4">
        <p className="text-uppercase small fw-semibold text-success mb-1">Community</p>
        <h1 className="h2 mb-1" id="teams-title">Team</h1>
        <p className="text-body-secondary mb-0">Gruppi e membri che si allenano insieme.</p>
      </div>
      <CollectionState loading={loading} error={error} records={teams} emptyMessage="Nessun team disponibile." />
      {!loading && !error && teams.length > 0 && (
        <div className="row g-3">
          {teams.map((team) => {
            const members = Array.isArray(team.members) ? team.members : [];
            const memberNames = members.map((member) => typeof member === 'string' ? member : member?.name ?? member?._id).filter(Boolean);

            return (
              <div className="col-12 col-lg-6" key={team._id ?? team.name}>
                <article className="h-100 border rounded bg-white p-4">
                  <h2 className="h5">{team.name ?? 'Team'}</h2>
                  <p className="text-body-secondary">{team.description ?? 'Nessuna descrizione.'}</p>
                  <p className="small mb-0"><span className="fw-semibold">Membri:</span> {memberNames.join(', ') || 'Nessun membro elencato'}</p>
                </article>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}