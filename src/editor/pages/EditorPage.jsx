import { useEffect } from 'react';
import { CodeEditor, SideBar } from '../components';
import {
  useCodeStore,
  useLocalStorage,
  useRouteUrl,
  useSettingsStore
} from '../hooks';
import { setSnippets } from '../helpers/editorSnippets';
import '../helpers/userWorker';
import { LOCALSTORAGE_ITEMS } from '../../constants/localStorageItemsConstants';

export const EditorPage = () => {
  const { onSetUploadedCode } = useCodeStore();
  const { decodeByCode, getBase64Param } = useRouteUrl();
  const { snippets } = useSettingsStore();
  const { setLocalStorageItem } = useLocalStorage();

  useEffect(() => {
    window.onpopstate = (event) => {
      onSetUploadedCode(decodeByCode(getBase64Param()));
    };
  }, []);

  useEffect(() => {
    setSnippets(snippets);
    setLocalStorageItem(LOCALSTORAGE_ITEMS.SNIPPETS_SAVED, snippets);
  }, [snippets]);

  return (
    <>
      <SideBar />
      <CodeEditor />
    </>
  );
};
