import { forwardRef, useEffect } from 'react';

export const CodePreviewer = forwardRef((props, ref) => {
  useEffect(() => {
    return () => {
      ref.current = null;
    };
  }, []);

  return <iframe id="output" className="output" ref={ref}></iframe>;
});
