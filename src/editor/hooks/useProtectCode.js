import * as Babel from '@babel/standalone/babel';
import protect from 'loop-protect';

Babel.registerPlugin('loopProtection', protect(100));
export const useProtectCode = () => {
  const transform = (source) =>
    Babel.transform(source, {
      plugins: ['loopProtection']
    }).code;

  const protectCode = (code) => {
    let codeToProtect = code;
    try {
      codeToProtect = transform(code);
    } catch (error) {}
    return codeToProtect;
  };

  return {
    protectCode
  };
};
