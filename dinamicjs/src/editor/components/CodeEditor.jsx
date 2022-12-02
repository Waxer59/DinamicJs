import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export const CodeEditor = () => {
  const [editor, setEditor] = useState(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl && !editor) {
      setEditor(
        monaco.editor.create(monacoEl.current, {
          value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
            '\n'
          ),
          language: 'javascript',
          theme: 'vs-dark',
          automaticLayout: true
        })
      );
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  return (
    <main className="main">
      <div className="code-container" id="code-container">
        <div className="code" ref={monacoEl}></div>
      </div>

      <div className="output-container" id="output-container">
        <iframe id="output" className="output"></iframe>
      </div>
    </main>
  );
};
