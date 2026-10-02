import express from 'express';
import apiRouter from './routes/api.js';
import { apiBaseUrl } from './config/urls.js';
import { connectDatabase } from './config/database.js';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl });
});

app.use('/api', apiRouter);

async function startServer() {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening at ${apiBaseUrl} (port ${port})`);
  });
}

void startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit Tracker API:', error);
  process.exitCode = 1;
});