# Frontend Environment

In Codespaces, set `VITE_CODESPACE_NAME` to the Codespace name without a port or domain in `octofit-tracker/frontend/.env.local`. For example:

```dotenv
VITE_CODESPACE_NAME=my-codespace
```

Vite reads this value at startup. When it is missing or empty, the frontend uses `http://localhost:8000` for API requests. Restart the Vite server after changing `.env.local`.