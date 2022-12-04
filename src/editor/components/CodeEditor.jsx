import { Editor } from './Editor';
import Split from 'react-split';
import { CodePreviewer } from './CodePreviewer';
import { useEffect } from 'react';
import { useCodeStore } from '../hooks/useCodeStore';
import { useRouteUrl } from '../hooks/useRouteUrl';

export const CodeEditor = () => {
  const { onSetActiveCode } = useCodeStore();

  const { decodeText } = useRouteUrl();

  useEffect(() => {
    onSetActiveCode(decodeText());
  }, []);

  return (
    <main className="main">
      <Split style={{ display: 'flex', width: '100%' }} sizes={[50, 50]}>
        <div className="code-container">
          <Editor />
        </div>

        <div className="output-container">
          <CodePreviewer />
        </div>
      </Split>
    </main>
  );
};
