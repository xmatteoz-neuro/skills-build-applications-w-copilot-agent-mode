import express from 'express';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import apiRouter from './routes/api.js';
import { connectDatabase } from './config/database.js';

export function getApiBaseUrl(codespaceName: string | undefined) {
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export const apiBaseUrl = getApiBaseUrl(process.env.CODESPACE_NAME);

const app = express();
const port = 8000;
const allowedOrigins = new Set([
  'http://localhost:5173',
  ...(process.env.CODESPACE_NAME
    ? [`https://${process.env.CODESPACE_NAME}-5173.app.github.dev`]
    : []),
]);

app.use(express.json());
app.use((request, response, next) => {
  const origin = request.headers.origin;

  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl });
});

app.use(apiRouter);

async function startServer() {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening at ${apiBaseUrl} (port ${port})`);
  });
}

const isDirectExecution = process.argv[1] !== undefined
  && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectExecution) {
  void startServer().catch((error: unknown) => {
    console.error('Unable to start OctoFit Tracker API:', error);
    process.exitCode = 1;
  });
}