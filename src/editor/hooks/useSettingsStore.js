import { useDispatch, useSelector } from 'react-redux';
import {
  setSettings,
  setSnippets,
  addNewSnippet,
  removeSnippet
} from '../../store/slices/settings/settingsSlice';

export const useSettingsStore = () => {
  const dispatch = useDispatch();
  const { settings, snippets } = useSelector((state) => state.settings);

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
