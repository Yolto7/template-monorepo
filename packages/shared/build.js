const esbuild = require('esbuild');
const { dtsPlugin } = require('esbuild-plugin-d.ts');

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
    plugins: [dtsPlugin({})],
    external: sharedDeps,
  });
};

buildPackage('src/**/*.ts', 'dist');
