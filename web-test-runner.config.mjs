import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: 'src/**/*.test.ts',
  nodeResolve: true,
  browsers: [playwrightLauncher({ product: 'chromium' })],
  plugins: [
    esbuildPlugin({
      ts: true,
      tsconfig: './tsconfig.json',
      target: 'es2020',
    }),
  ],
  testFramework: {
    config: {
      timeout: 5000,
      retries: 1,
    },
  },
  coverageConfig: {
    include: ['src/components/**/*.ts'],
    exclude: ['src/**/*.stories.ts', 'src/**/*.test.ts'],
    reportDir: 'coverage',
    reporters: ['lcov', 'text'],
    threshold: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
};
