import { defineConfig } from 'vite';
export default defineConfig({
  server: { port: 5173, strictPort: true, cors: true },
  build: {
    lib: {
      entry: { site: 'site.js', main: 'main.js', company: 'company.js', clinops: 'clinops.js', response: 'response.js', trial: 'trial.js', portfolio: 'portfolio.js', conductor: 'conductor.js' },
      formats: ['es'],
      fileName: (format, name) => `${name}.js`,
    },
  },
});