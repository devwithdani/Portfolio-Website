import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

// Report locations only: never print a matched credential in logs.
const patterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/,
  /\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{32,}\b/,
  /\bAKIA[A-Z0-9]{16}\b/,
  /https:\/\/(?:canary\.|ptb\.)?discord(?:app)?\.com\/api\/webhooks\/\d+\/[A-Za-z0-9_-]+/,
  /(?:api[_-]?key|secret|password|access[_-]?token)\s*[:=]\s*['"][A-Za-z0-9_+\/-]{24,}['"]/i,
];
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
let failures = 0;
function check(path, content, revision = 'working tree') {
  if (content.includes('\0')) return;
  if (patterns.some(pattern => pattern.test(content))) {
    console.error(`Possible secret: ${revision}:${path} (value hidden)`);
    failures++;
  }
}
for (const path of git('ls-files', '-z', '--cached', '--others', '--exclude-standard').split('\0').filter(Boolean)) {
  if (existsSync(path)) check(path, readFileSync(path, 'utf8'));
}
if (process.argv.includes('--history')) {
  for (const revision of git('rev-list', '--all').trim().split('\n').filter(Boolean)) {
    for (const path of git('ls-tree', '-r', '--name-only', '-z', revision).split('\0').filter(Boolean)) {
      if (/\.(png|jpg|jpeg|ttf|woff2?|ico|tsbuildinfo)$/i.test(path)) continue;
      check(path, git('show', `${revision}:${path}`), revision.slice(0, 8));
    }
  }
}
console.log(failures ? `${failures} possible secret finding(s).` : 'No known secret patterns found. This is not a guarantee that no secrets exist.');
process.exitCode = failures ? 1 : 0;
