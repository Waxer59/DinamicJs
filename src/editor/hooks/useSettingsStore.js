import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSettings,
  setSnippets
} from '../../store/slices/settings/settingsSlice';

export const useSettingsStore = () => {
  const dispatch = useDispatch();
  const { settings, snippets } = useSelector((state) => state.settings);

  useEffect(() => {
    document.querySelector('html').className =
      settings.theme === 'vs-dark' ? 'dark' : 'light';
  }, [settings.theme]);

  const onSetSettings = (settings) => {
    dispatch(setSettings(settings));
  };

  const onSetSnippets = (snippets) => {
    dispatch(setSnippets(snippets));
  };

  return {
    onSetSettings,
    onSetSnippets,
    settings,
    snippets
  };
};
