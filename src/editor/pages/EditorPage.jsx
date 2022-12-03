import { CodeEditor } from '../components/CodeEditor';
import { SideBar } from '../components/SideBar';
import '../helpers/userWorker';

export const EditorPage = () => {
  return (
    <>
      <SideBar />
      <CodeEditor />
    </>
  );
};
