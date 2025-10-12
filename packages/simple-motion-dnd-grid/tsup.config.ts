import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: ['./dist'],
  treeshake: true,
  dts: true,
  format: ['esm', 'cjs'],
  outDir: './dist',
  sourcemap: false,
  minify: true,
  splitting: true,
  platform: 'browser',
  external: ['react', 'react-dom', 'framer-motion'],
  tsconfig: './tsconfig.json',
});
