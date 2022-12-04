import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useCodePreviewer } from '../hooks/useCodePreviewer';
import { useCodeStore } from '../hooks/useCodeStore';
import { useProtectCode } from '../hooks/useProtectCode';

export const CodePreviewer = () => {
  const preview = useRef(null);
  const { activeCode } = useCodeStore();
  const [code, setCode] = useState(activeCode);

  const { protectCode } = useProtectCode();
  const { update } = useCodePreviewer();

  useEffect(() => {
    update(preview.current, code);
  }, []);

  useEffect(() => {
    setCode(activeCode);
  }, [activeCode]);

  useEffect(() => {
    update(preview.current, code);
  }, [code]);

  return <iframe className="output" ref={preview}></iframe>;
};
