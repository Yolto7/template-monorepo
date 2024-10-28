const esbuild = require('esbuild');
const { dependencies } = require('./package.json');

const sharedDeps = Object.keys(dependencies);

const buildPackage = async (entry, outdir) => {
  await esbuild.build({
    entryPoints: [entry],
    outdir,
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: 'node',
    external: sharedDeps,
  });
};

buildPackage('src/**/*.ts', 'dist');
