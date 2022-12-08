import { CodeEditor } from '../components/CodeEditor';
import { SideBar } from '../components/SideBar';
import '../helpers/userWorker';
import '../helpers/editorSnippets';

export const EditorPage = () => {
  return (
    <>
      <SideBar />
      <CodeEditor />
    </>
  );
};
