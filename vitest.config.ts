import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov', 'text-lcov', 'html'],
    },
  },
});
