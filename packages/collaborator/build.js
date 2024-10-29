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
    keepNames: true,
    tsconfig: 'tsconfig.json',
    external: sharedDeps,
  });
};

buildPackage('src/**/*.ts', 'dist');
