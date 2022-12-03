import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useCodePreviewer } from '../hooks/useCodePreviewer';
import { useCodeStore } from '../hooks/useCodeStore';

export const CodePreviewer = () => {
  const preview = useRef(null);
  const { code } = useCodeStore();
  const { update } = useCodePreviewer(code, preview.current);
  useEffect(() => {
    update();
  }, []);

  return <iframe className="output" ref={preview}></iframe>;
};
