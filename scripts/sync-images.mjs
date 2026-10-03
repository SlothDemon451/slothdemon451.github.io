/**
 * Rebuilds the `images` array of every project in src/data/projects.json from
 * the files found in public/assets/media/projects/<project-id>/.
 *
 *   npm run sync-images
 *
 * Files are sorted by name, so prefix them (01-, 02-, ...) to control the
 * carousel order. Supported: png, jpg, jpeg, webp, gif, avif.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = path.join(ROOT, 'src/data/projects.json');
const MEDIA_DIR = path.join(ROOT, 'public/assets/media/projects');
const PUBLIC_PREFIX = 'assets/media/projects';
const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;

const projects = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
fs.mkdirSync(MEDIA_DIR, { recursive: true });

const folders = new Set(
  fs.readdirSync(MEDIA_DIR).filter((f) => fs.statSync(path.join(MEDIA_DIR, f)).isDirectory())
);

let changed = 0;
for (const project of projects) {
  const dir = path.join(MEDIA_DIR, project.id);
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => IMAGE_RE.test(f)).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
    : [];
  const images = files.map((f) => `${PUBLIC_PREFIX}/${project.id}/${f}`);
  if (JSON.stringify(images) !== JSON.stringify(project.images)) {
    project.images = images;
    changed += 1;
  }
  folders.delete(project.id);
  const label = images.length ? `${images.length} image${images.length === 1 ? '' : 's'}` : 'no images';
  console.log(`${label.padEnd(10)} ${project.id}`);
}

fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2) + '\n');
console.log(`\nUpdated ${changed} project${changed === 1 ? '' : 's'} in ${path.relative(ROOT, DATA_FILE)}.`);

if (folders.size) {
  console.warn('\nFolders with no matching project id in projects.json (ignored):');
  for (const f of folders) console.warn(`  ${PUBLIC_PREFIX}/${f}/`);
}
