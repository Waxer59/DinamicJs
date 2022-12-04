import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useRouteUrl } from '../hooks/useRouteUrl';
import { useCodeStore } from '../hooks/useCodeStore';

export const Editor = () => {
  const [editor, setEditor] = useState(null);
  const { decodeText } = useRouteUrl();
  const { onSetActiveCode, activeCode } = useCodeStore();
  const [code, setCode] = useState(decodeText());
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl.current && !editor) {
      setEditor(
        monaco.editor.create(monacoEl.current, {
          value: code,
          language: 'javascript',
          theme: 'vs-dark',
          mouseWheelZoom: true,
          fontSize: 18,
          fontFamily: "'JetBrains Mono', Arial, Helvetica, sans-serif",
          fontLigatures: 'on',
          padding: {
            top: 16
            // left: 2
          },
          automaticLayout: true, // resize the code area
          minimap: {
            enabled: false
          },
          lineNumbers: false
        })
      );
    }
    if (editor) {
      editor.onDidChangeModelContent(() => {
        setCode(editor.getValue());
      });
    }
    return () => editor?.dispose();
  }, [monacoEl.current]);

  useEffect(() => {
    onSetActiveCode(code);
  }, [code]);

  return <div className="code" ref={monacoEl}></div>;
};
