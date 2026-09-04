import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const webDirectory = join(projectRoot, 'www');
const excludedEntries = new Set([
  '.git',
  '.vscode',
  'android',
  'ios',
  'node_modules',
  'scripts',
  'www',
  'capacitor.config.json',
  'capacitor.config.ts',
  'package-lock.json',
  'package.json'
]);

await rm(webDirectory, { recursive: true, force: true });
await mkdir(webDirectory, { recursive: true });

for (const entry of await (await import('node:fs/promises')).readdir(projectRoot)) {
  if (!excludedEntries.has(entry)) {
    await cp(join(projectRoot, entry), join(webDirectory, entry), { recursive: true });
  }
}