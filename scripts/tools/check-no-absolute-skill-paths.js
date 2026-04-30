#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..', '..');
const SHARE_ROOT = path.join(PROJECT_ROOT, 'ai-context', 'share-skills');
const DEFAULT_EXTENSIONS = new Set([
  '.md',
  '.txt',
  '.json',
  '.js',
  '.sh',
  '.yaml',
  '.yml',
]);

const ABSOLUTE_PATH_PATTERNS = [
  {
    name: 'macOS or Linux absolute path',
    regex: /(^|[\s("'`>:=])\/(?:Users|home|opt|var|tmp|etc|private|Volumes)\/[^\s"'`)<]+/gm,
  },
  {
    name: 'Windows absolute path',
    regex: /(^|[\s("'`>:=])[A-Za-z]:\\[^\s"'`)<]+/gm,
  },
  {
    name: 'file URI',
    regex: /file:\/\/[^\s"'`)<]+/gm,
  },
];

function walk(dirPath, files = []) {
  if (!fs.existsSync(dirPath)) {
    return files;
  }

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
      continue;
    }

    if (DEFAULT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function findMatches(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = [];

  for (const pattern of ABSOLUTE_PATH_PATTERNS) {
    for (const match of content.matchAll(pattern.regex)) {
      const rawMatch = match[0].trim();
      const matchIndex = match.index || 0;
      const line = content.slice(0, matchIndex).split('\n').length;
      findings.push({
        filePath,
        line,
        pattern: pattern.name,
        value: rawMatch,
      });
    }
  }

  return findings;
}

function main() {
  const files = walk(SHARE_ROOT);
  const findings = files.flatMap(findMatches);

  if (findings.length === 0) {
    console.log('No absolute paths found in shared skills.');
    return;
  }

  console.error('Absolute paths found in shared skills:');
  for (const finding of findings) {
    const relativePath = path.relative(PROJECT_ROOT, finding.filePath);
    console.error(`- ${relativePath}:${finding.line} [${finding.pattern}] ${finding.value}`);
  }

  process.exitCode = 1;
}

main();
