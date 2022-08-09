import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    dir: 'src',
    watch: false,
    globals: true,
    threads: true,
    isolate: false,
    passWithNoTests: true,
    reporters: ['verbose'],
    coverage: { reporter: ['lcov', 'html', 'text'] },
  },
});
