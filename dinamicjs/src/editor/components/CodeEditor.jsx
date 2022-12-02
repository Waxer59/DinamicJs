import { Editor } from './Editor';
import Split from 'react-split';

export const CodeEditor = () => {
  return (
    <main className="main">
      <Split style={{ display: 'flex', width: "100%" }} sizes={[50, 50]}>
        <div className="code-container">
          <Editor />
        </div>

        <div className="output-container">
          <iframe className="output"></iframe>
        </div>
      </Split>
    </main>
  );
};
