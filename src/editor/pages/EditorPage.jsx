import { useEffect } from 'react';
import { CodeEditor, SideBar } from '../components';
import { useCodeStore, useRouteUrl, useSettingsStore } from '../hooks';
import { setSnippets } from '../helpers/editorSnippets';
import '../helpers/userWorker';

export const EditorPage = () => {
  const { onSetUploadedCode } = useCodeStore();
  const { decodeByCode, getBase64Param } = useRouteUrl();
  const { snippets } = useSettingsStore();

  useEffect(() => {
    window.onpopstate = (event) => {
      onSetUploadedCode(decodeByCode(getBase64Param()));
    };
  }, []);

  useEffect(() => {
    setSnippets(snippets);
  }, [snippets]);

  return (
    <>
      <SideBar />
      <CodeEditor />
    </>
  );
};
