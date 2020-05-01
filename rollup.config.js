import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default () => {
  const config = {
    input: 'src/index.ts',
    external: ['react']
  };

  const es = {
    ...config,
    output: {
      file: pkg.module,
      format: 'es'
    },
    plugins: [typescript()]
  };

  const cjs = {
    ...config,
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named'
    },
    plugins: [typescript()]
  };

  return [es, cjs];
};
