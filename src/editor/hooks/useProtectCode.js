import * as Babel from '@babel/standalone/babel';
import autoConsoleLog from 'babel-plugin-auto-console-log';
import protect from 'loop-protect';

const TIMEOUT = 100;

Babel.registerPlugin('loopProtection', protect(TIMEOUT));
Babel.registerPlugin('autoConsoleLog', autoConsoleLog());
export const useProtectCode = () => {
  const transform = (source) =>
    Babel.transform(source, {
      plugins: ['autoConsoleLog', 'loopProtection']
    }).code;

  const protectCode = (code) => {
    try {
      code = transform(code);
    } catch (error) {}
    return code;
  };

  return {
    protectCode
  };
};
