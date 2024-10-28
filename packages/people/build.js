const esbuild = require('esbuild');
const { dependencies } = require('./package.json');

const sharedDeps = Object.keys(dependencies);

const buildPackage = async (entry, outdir) => {
  await esbuild.build({
    entryPoints: [entry],
    outdir,
    bundle: true,
    minify: false,
    sourcemap: true,
    platform: 'node',
    target: 'node18',
    external: sharedDeps,
    keepNames: true, // Mantiene los nombres de las clases y funciones
    tsconfig: 'tsconfig.json',
  });
};

buildPackage('src/**/*.ts', 'dist');
