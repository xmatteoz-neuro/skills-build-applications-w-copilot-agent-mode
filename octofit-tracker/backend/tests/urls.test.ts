import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getApiBaseUrl } from '../src/server.js';

test('uses the forwarded API URL for a Codespace', () => {
  assert.equal(
    getApiBaseUrl('octofit-codespace'),
    'https://octofit-codespace-8000.app.github.dev',
  );
});

test('falls back to localhost when CODESPACE_NAME is unset', () => {
  assert.equal(getApiBaseUrl(undefined), 'http://localhost:8000');
});