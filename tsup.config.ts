import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  ...options,

  cjsInterop: true,
  dts: true,
  entry: ['src/index.ts', 'src/helpers/code-builder.ts', 'src/helpers/reducer.ts', 'src/targets/index.ts'],
  format: ['esm', 'cjs'],
  shims: true,
  silent: !options.watch,
  sourcemap: true,
  treeshake: true,
  tsconfig: './tsconfig.build.json',
}));
