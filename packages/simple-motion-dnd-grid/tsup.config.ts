import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  treeshake: true,
  dts: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
  sourcemap: false,
  minify: true,
  splitting: true,
  platform: 'browser',
  external: ['react', 'react-dom', 'motion'],
  tsconfig: './tsconfig.json',
  outExtension({ format }) {
    return format === 'cjs' ? { js: '.cjs' } : { js: '.js' };
  },
});
