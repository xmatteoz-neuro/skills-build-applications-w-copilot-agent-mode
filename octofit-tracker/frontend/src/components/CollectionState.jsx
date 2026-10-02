export default function CollectionState({ loading, error, records, emptyMessage }) {
  if (loading) {
    return <p className="text-body-secondary py-4" role="status">Caricamento...</p>;
  }

  if (error) {
    return <p className="alert alert-danger" role="alert">{error}</p>;
  }

  if (records.length === 0) {
    return <p className="text-body-secondary py-4">{emptyMessage}</p>;
  }

  return null;
}