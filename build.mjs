import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/server', { recursive: true });
cpSync('index.html', 'dist/index.html');
cpSync('assets', 'dist/assets', { recursive: true });
cpSync('.openai', 'dist/.openai', { recursive: true });
writeFileSync('dist/server/index.js', `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') url.pathname = '/index.html';
    return env.ASSETS.fetch(new Request(url, request));
  }
};
`);
