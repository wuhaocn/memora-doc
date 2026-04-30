#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..', '..');
const SHARE_ROOT = path.join(PROJECT_ROOT, 'ai-context', 'share-skills');
const CONFIG_PATH = path.join(SHARE_ROOT, 'projections.json');
const PROJECT_ONLY_FLAG = '--project-only';
const USER_ONLY_FLAG = '--user-only';
const HELP_FLAGS = new Set(['-h', '--help']);

function expandHome(targetPath) {
  if (targetPath === '~') {
    return process.env.HOME || targetPath;
  }

  if (targetPath.startsWith('~/')) {
    return path.join(process.env.HOME || '', targetPath.slice(2));
  }

  return targetPath;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function removeIfExists(targetPath) {
  try {
    fs.lstatSync(targetPath);
  } catch (error) {
    return;
  }
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function symlinkTypeFor(sourcePath, kind) {
  if (kind) {
    return kind;
  }

  return fs.statSync(sourcePath).isDirectory() ? 'dir' : 'file';
}

function hasExpectedSymlink(targetPath, expectedRelativeSourcePath) {
  try {
    const stat = fs.lstatSync(targetPath);
    if (!stat.isSymbolicLink()) {
      return false;
    }

    return fs.readlinkSync(targetPath) === expectedRelativeSourcePath;
  } catch (error) {
    return false;
  }
}

function linkProjection(sourcePath, targetPath, kind) {
  ensureDir(path.dirname(targetPath));
  const resolvedKind = symlinkTypeFor(sourcePath, kind);
  const relativeSourcePath = path.relative(path.dirname(targetPath), sourcePath);
  if (hasExpectedSymlink(targetPath, relativeSourcePath)) {
    return;
  }

  removeIfExists(targetPath);
  fs.symlinkSync(relativeSourcePath, targetPath, resolvedKind);
}

function resolveSourcePath(sourcePath) {
  return path.join(SHARE_ROOT, sourcePath);
}

function resolveTargetPath(targetPath) {
  const expanded = expandHome(targetPath);
  if (path.isAbsolute(expanded)) {
    return expanded;
  }

  return path.join(PROJECT_ROOT, expanded);
}

function isUserProjection(targetPath) {
  return targetPath === '~' || targetPath.startsWith('~/');
}

function filterProjections(projections, mode) {
  if (mode === 'project-only') {
    return projections.filter((projection) => !isUserProjection(projection.target));
  }

  if (mode === 'user-only') {
    return projections.filter((projection) => isUserProjection(projection.target));
  }

  return projections;
}

function projectAll(projections) {
  for (const projection of projections) {
    const sourcePath = resolveSourcePath(projection.source);
    const targetPath = resolveTargetPath(projection.target);
    linkProjection(sourcePath, targetPath, projection.kind);
  }
}

function resolveMode(argv) {
  const args = new Set(argv);
  if (args.has(PROJECT_ONLY_FLAG) && args.has(USER_ONLY_FLAG)) {
    throw new Error(`${PROJECT_ONLY_FLAG} and ${USER_ONLY_FLAG} cannot be used together`);
  }

  if (args.has(PROJECT_ONLY_FLAG)) {
    return 'project-only';
  }

  if (args.has(USER_ONLY_FLAG)) {
    return 'user-only';
  }

  return 'all';
}

function printHelp() {
  console.log(`Usage: node scripts/tools/sync-share-skills.js [${PROJECT_ONLY_FLAG}|${USER_ONLY_FLAG}]

Options:
  ${PROJECT_ONLY_FLAG}  Sync only project-level connection layers
  ${USER_ONLY_FLAG}     Sync only user-level projection layers
  --help, -h            Show this help message
`);
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.some((arg) => HELP_FLAGS.has(arg))) {
    printHelp();
    return;
  }

  const mode = resolveMode(argv);
  const config = readJson(CONFIG_PATH);
  const projections = filterProjections(config.projections || [], mode);
  projectAll(projections);

  console.log(`share-skills projections synced (${mode})`);
}

main();
