import { useEffect, useState } from 'react';
import { API_BASE_URL, toRecords } from '../api.js';
import CollectionState from './CollectionState.jsx';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Richiesta non riuscita (${response.status})`);
        setUsers(toRecords(await response.json()));
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadUsers();
    return () => controller.abort();
  }, []);

  return (
    <section aria-labelledby="users-title">
      <div className="mb-4">
        <p className="text-uppercase small fw-semibold text-success mb-1">Community</p>
        <h1 className="h2 mb-1" id="users-title">Atleti</h1>
        <p className="text-body-secondary mb-0">Profili registrati in OctoFit Tracker.</p>
      </div>
      <CollectionState loading={loading} error={error} records={users} emptyMessage="Nessun utente registrato." />
      {!loading && !error && users.length > 0 && (
        <div className="list-group">
          {users.map((user) => (
            <article className="list-group-item d-flex flex-wrap justify-content-between gap-2 py-3" key={user._id ?? user.email}>
              <h2 className="h6 mb-0">{user.name ?? 'Atleta'}</h2>
              <span className="small text-body-secondary">{user.email ?? 'Email non disponibile'}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}