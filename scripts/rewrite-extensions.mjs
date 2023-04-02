import cluster from 'node:cluster';
import { availableParallelism, cpus } from 'node:os';
import { parseArgs } from 'node:util';
import * as process from 'node:process';
import * as path from 'node:path';
import * as assert from 'node:assert';

import { glob } from 'glob';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    verbose: {
      type: 'boolean',
      default: false,
    },
    maxWorkers: {
      type: 'string',
      default: String(availableParallelism?.() ?? cpus().length),
    },
    clean: {
      type: 'boolean',
      default: false,
    },
    module: {
      type: 'string',
      default: 'esm',
    },
  },
});

assert.ok(positionals.length === 1, 'One root has to be specified');

const cwd = process.cwd();
const root = path.isAbsolute(positionals[0]) ? positionals[0] : path.join(cwd, positionals[0]);

cluster.setupPrimary({
  exec: path.join(process.cwd(), 'scripts/transformer.mjs'),
});

const files = await glob('**/*.js', {
  cwd: root,
});

const maxParallelism = Math.min(files.length, Number.parseInt(values.maxWorkers));
write(`Using ${maxParallelism} processes`);
const filesPerProcess = files.length / maxParallelism;

for (let i = 0, offset = 0; i < maxParallelism; i += 1) {
  const size = offset + filesPerProcess;
  const assignedFiles = files.slice(Math.floor(offset), Math.floor(size));
  offset = size;

  spawn(assignedFiles);
}

function write(str) {
  if (values.verbose) {
    process.stdout.write(`${str}\n`);
  }
}

function spawn(files) {
  const args = [
    `--root=${root}`,
    values.clean ? '--clean' : null,
    `--module=${values.module}`,
  ].filter(Boolean);

  cluster.setupPrimary({
    args: [...args, ...files],
  });
  const worker = cluster.fork();
  write(`Process ${worker.process.pid} spawned with the following arguments: ${args.join(' ')})}`);
  write(`Sending ${files.length} files to process ${worker.process.pid}`);
  write(files.map(file => `  ${file}`).join('\n'));
}
