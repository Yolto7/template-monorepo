const esbuild = require('esbuild');
const { dtsPlugin } = require('esbuild-plugin-d.ts');

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
    plugins: [dtsPlugin({})],
  });
};

buildPackage('src/**/*.ts', 'dist');
