import { useEffect } from 'react';
import { CodeEditor, SideBar } from '../components';
import { useCodeStore, useRouteUrl } from '../hooks';
import '../helpers/userWorker';

export const EditorPage = () => {
  const { onSetUploadedCode } = useCodeStore();
  const { decodeBase64, getBase64Param } = useRouteUrl();

  useEffect(() => {
    window.onpopstate = (event) => {
      onSetUploadedCode(decodeBase64(getBase64Param()));
    };
  }, []);

  return (
    <>
      <SideBar />
      <CodeEditor />
    </>
  );
};
