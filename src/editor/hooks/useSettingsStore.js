import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_SNIPPETS } from '../../constants/editorSettingsConstants';
import { LOCALSTORAGE_ITEMS } from '../../constants/localStorageItemsConstants';
import {
  setSettings,
  setSnippets,
  addNewSnippet,
  removeSnippet
} from '../../store/slices/settings/settingsSlice';
import { setEditorSnippets } from '../helpers/editorSnippets';
import { useLocalStorage } from './useLocalStorage';

export const useSettingsStore = () => {
  const dispatch = useDispatch();
  const { settings, snippets } = useSelector((state) => state.settings);
  const { setLocalStorageItem, getLocalStorageItem } = useLocalStorage();

  useEffect(() => {
    document.querySelector('html').className =
      settings.theme === 'vs-dark' ? 'dark' : 'light';
  }, [settings.theme]);

  useEffect(() => {
    const settings = getLocalStorageItem(LOCALSTORAGE_ITEMS.SETTINGS);
    const snippetsSaved = getLocalStorageItem(
      LOCALSTORAGE_ITEMS.SNIPPETS_SAVED
    );
    onSetSnippets(
      Array.isArray(snippetsSaved) ? snippetsSaved : DEFAULT_SNIPPETS
    );
    if (settings) {
      onSetSettings(settings);
    }
  }, []);

  useEffect(() => {
    setEditorSnippets(snippets);
    setLocalStorageItem(LOCALSTORAGE_ITEMS.SNIPPETS_SAVED, snippets);
  }, [snippets]);

  const onSetSettings = (settings) => {
    dispatch(setSettings(settings));
  };

  const onSetSnippets = (snippets) => {
    dispatch(setSnippets(snippets));
  };

  const onAddNewSnippet = (label, documentation, insertText) => {
    dispatch(addNewSnippet({ label, documentation, insertText }));
  };

  const onRemoveSnippet = (label) => {
    dispatch(removeSnippet({ label }));
  };

  return {
    onSetSettings,
    onSetSnippets,
    settings,
    snippets,
    onAddNewSnippet,
    onRemoveSnippet
  };
};
