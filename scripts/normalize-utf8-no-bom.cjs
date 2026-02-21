/**
 * Jeju Gourmet AI Research Lab - UTF-8 Without BOM normalization
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd());
const EXTS = ['.css', '.js', '.mdx', '.mjs'];
const IGNORE = ['node_modules', '.next', '.git'];

function walk(dir, list = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (IGNORE.some((x) => full.includes(x))) continue;
    if (e.isDirectory()) walk(full, list);
    else if (EXTS.includes(path.extname(e.name))) list.push(full);
  }
  return list;
}

function run() {
  const files = walk(ROOT);
  const utf8NoBom = new (require('stream').Transform)();
  for (const file of files) {
    let buf = fs.readFileSync(file);
    const hasBOM = buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
    if (hasBOM) buf = buf.subarray(3);
    const content = buf.toString('utf8');
    fs.writeFileSync(file, content, { encoding: 'utf8' });
    console.log((hasBOM ? 'BOM removed: ' : 'OK: ') + path.relative(ROOT, file));
  }
  console.log('Done. Total:', files.length);
}

run();
