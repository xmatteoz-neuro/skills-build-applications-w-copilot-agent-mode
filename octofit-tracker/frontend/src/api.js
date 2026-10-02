const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function toRecords(payload) {
  if (Array.isArray(payload)) return payload;

  const candidates = [
    payload?.results,
    payload?.items,
    payload?.data,
    payload?.data?.results,
    payload?.data?.items,
    payload?.records,
  ];

  return candidates.find(Array.isArray) ?? [];
}