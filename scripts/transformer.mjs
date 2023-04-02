import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import process from 'node:process';
import * as assert from 'node:assert';
import { parseArgs } from 'node:util';

import { parse, print, types } from 'recast';
import parser from 'recast/parsers/acorn.js';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    root: {
      type: 'string',
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

const files = positionals.map(file => path.join(values.root, file));

const INTERESTING_NODE_TYPES = new Set([
  'ImportDeclaration',
  'ExportNamedDeclaration',
  'ExportAllDeclaration',
  'ExportDefaultDeclaration',
]);

const JS_EXT = /\.js$/;
const TARGET_EXT = values.module === 'esm' ? '.mjs' : '.cjs';

await Promise.all(files.map(transform));
process.exit(0);

async function transform(file) {
  const source = await fs.readFile(file, 'utf8');

  const { code } = print(
    rewrite(
      source,
      path.join(values.root, file),
      parse(source, {
        parser: {
          parse(source) {
            return parser.parse(source, {
              ecmaVersion: 2022,
            });
          },
        },
      }),
    ),
  );

  if (values.clean) {
    await fs.writeFile(file, code);
    await fs.rename(file, file.replace(JS_EXT, TARGET_EXT));
  } else {
    await fs.writeFile(file.replace(JS_EXT, TARGET_EXT), code);
  }
}

function rewrite(source, moduleSrc, tree) {
  const mayHaveDynamicImport = values.module === 'esm' && /import\s*\(/.test(source);

  for (const node of tree.program.body) {
    if (!INTERESTING_NODE_TYPES.has(node.type)) continue;
    if (node.source === null) continue;

    remapSource(moduleSrc, node.source);
  }

  if (mayHaveDynamicImport || values.module === 'cjs') {
    types.visit(tree.program.body, {
      visitImportExpression(node) {
        remapSource(moduleSrc, node.value.source);
        return false;
      },
      visitCallExpression(node) {
        if (node.value.callee.type === 'Identifier' && node.value.callee.name === 'require') {
          remapSource(moduleSrc, node.value.arguments[0]);
        }

        return false;
      },
    });
  }

  return tree;
}

function remapSource(moduleSrc, source) {
  assert.ok(source.type === 'Literal');
  if (isInProjectScope(moduleSrc, source.value)) {
    source.value = source.value.replace(JS_EXT, TARGET_EXT);
  }
}

function isInProjectScope(moduleSrc, importSrc) {
  const absolutePath = path.isAbsolute(importSrc) ? importSrc : path.join(moduleSrc, importSrc);
  return absolutePath.startsWith(values.root);
}
