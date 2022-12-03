import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useCodePreviewer } from '../hooks/useCodePreviewer';
import { useCodeStore } from '../hooks/useCodeStore';
import { useProtectCode } from '../hooks/useProtectCode';

export const CodePreviewer = () => {
  const preview = useRef(null);
  const { activeCode } = useCodeStore();
  const [codes, setCodes] = useState(activeCode);

  const { protectCode } = useProtectCode();
  const { update } = useCodePreviewer();

  useEffect(() => {
    update(preview.current, codes);
  }, []);

  useEffect(() => {
    setCodes(() => protectCode(activeCode));
  }, [activeCode]);

  useEffect(() => {
    update(preview.current, codes);
  }, [codes]);

  return <iframe className="output" ref={preview}></iframe>;
};
