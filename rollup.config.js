import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import commonjs from '@rollup/plugin-commonjs';

const nodeRequire = createRequire(fileURLToPath(import.meta.url));
const { module, main, dependencies, peerDependencies } = nodeRequire('./package.json');

export default {
  input: module,
  plugins: [
    commonjs({
      sourceMap: false,
    }),
  ],
  output: [
    {
      file: main,
      format: 'cjs',
      exports: 'named',
      footer: 'module.exports = Object.assign(exports.default, exports);',
    },
  ],
  external: ['node:module', 'node:url', 'node:vm', 'node:events', ...Object.keys({ ...dependencies, ...peerDependencies })],
};
