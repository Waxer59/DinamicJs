import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useCodePreviewer } from '../hooks/useCodePreviewer';

export const CodePreviewer = () => {
  const preview = useRef(null);
  const { update } = useCodePreviewer(`console.log("hello World")`, preview.current);
  useEffect(() => {
    update();
  }, [])
  
  return <iframe className="output" ref={preview}></iframe>;
};
