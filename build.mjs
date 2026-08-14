import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/server', { recursive: true });
cpSync('index.html', 'dist/index.html');
cpSync('assets', 'dist/assets', { recursive: true });
writeFileSync('dist/server/index.js', 'export default {}\n');
