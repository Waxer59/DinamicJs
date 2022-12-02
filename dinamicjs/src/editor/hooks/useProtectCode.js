import * as Babel from '@babel/standalone/babel';
import protect from 'loop-protect';

export const useProtectCode = (code = '') => {
  Babel.registerPlugin('loopProtection', protect(100));

  const transform = (source) =>
    Babel.transform(source, {
      plugins: ['loopProtection']
    }).code;

  const protectCode = (code) => {
    return transform(code);
  };

  return {
    protectCode
  };
};
