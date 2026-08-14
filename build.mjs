import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/server', { recursive: true });
mkdirSync('dist/client', { recursive: true });
cpSync('index.html', 'dist/client/index.html');
cpSync('assets', 'dist/client/assets', { recursive: true });
cpSync('.openai', 'dist/.openai', { recursive: true });
writeFileSync('dist/server/index.js', `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') url.pathname = '/index.html';
    return env.ASSETS.fetch(new Request(url, request));
  }
};
`);
