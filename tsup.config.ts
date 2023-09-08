import type { Options } from 'tsup';

import { defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  ...options,
  cjsInterop: true,
  clean: true,
  dts: true,
  entry: ['src/index.ts', 'src/targets/targets.ts'],
  format: ['esm', 'cjs'],
  minify: false,
  shims: true,
  silent: !options.watch,
  splitting: true,
  sourcemap: true,
  treeshake: true,
  tsconfig: './tsconfig.build.json',
}));
