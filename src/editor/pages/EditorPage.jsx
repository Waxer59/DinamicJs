import { useEffect } from 'react';
import { CodeEditor, SideBar } from '../components';
import {
  useCodeStore,
  useLocalStorage,
  useRouteUrl,
  useSettingsStore
} from '../hooks';
import '../helpers/userWorker';
import { LOCALSTORAGE_ITEMS } from '../../constants/localStorageItemsConstants';
import { setEditorSnippets } from '../helpers/editorSnippets';

export const EditorPage = () => {
  const { onSetUploadedCode } = useCodeStore();
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const { decodeByCode, getBase64Param, saveBase64ToUrl, decodeBase64 } =
    useRouteUrl();
  const { activeCode, codeSaved, onSetActiveCode, onSetCodeSaved } =
    useCodeStore();
  const { onSetSnippets, onSetSettings, settings, snippets } =
    useSettingsStore();

  useEffect(() => {
    window.onpopstate = (event) => {
      onSetUploadedCode(decodeByCode(getBase64Param()));
    };
    const settings = getLocalStorageItem(LOCALSTORAGE_ITEMS.SETTINGS);
    const codeSaved = getLocalStorageItem(LOCALSTORAGE_ITEMS.CODE_SAVED);
    const snippetsSaved = getLocalStorageItem(
      LOCALSTORAGE_ITEMS.SNIPPETS_SAVED
    );
    if (Array.isArray(codeSaved)) {
      onSetCodeSaved(codeSaved);
    }
    if (Array.isArray(snippetsSaved)) {
      onSetSnippets(snippetsSaved);
    }
    if (settings) {
      onSetSettings(settings);
    }
    onSetActiveCode(decodeBase64(getBase64Param()));
  }, []);

  useEffect(() => {
    document.querySelector('html').className =
      settings.theme === 'vs-dark' ? 'dark' : 'light';
  }, [settings.theme]);

  useEffect(() => {
    setLocalStorageItem(LOCALSTORAGE_ITEMS.CODE_SAVED, codeSaved);
  }, [codeSaved]);

  useEffect(() => {
    saveBase64ToUrl(activeCode);
  }, [activeCode]);

  useEffect(() => {
    setEditorSnippets(snippets);
    setLocalStorageItem(LOCALSTORAGE_ITEMS.SNIPPETS_SAVED, snippets);
  }, [snippets]);

  return (
    <>
      <SideBar />
      <CodeEditor />
    </>
  );
};
