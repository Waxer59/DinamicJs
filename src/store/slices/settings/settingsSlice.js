import { createSlice } from '@reduxjs/toolkit';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {
  DEFAULT_SETTINGS,
  DEFAULT_SNIPPETS
} from '../../../constants/editorSettingsConstants';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: DEFAULT_SETTINGS,
    snippets: DEFAULT_SNIPPETS
  },
  reducers: {
    setSettings: (state, { payload }) => {
      state.settings = {
        ...state.settings,
        ...payload
      };
    },
    setSnippets: (state, { payload }) => {
      state.snippets = payload;
    },
    addNewSnippet: (state, { payload }) => {
      const { label, insertText, documentation } = payload;
      state.snippets.push({
        label,
        insertText,
        documentation,
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        kind: monaco.languages.CompletionItemKind.Snippet
      });
    },
    removeSnippet: (state, { payload }) => {
      const newSnippets = state.snippets.filter((el) => el.label !== payload);
      console.log(newSnippets);
      state.snippets = newSnippets;
    }
  }
});

export const { setSettings, setSnippets, addNewSnippet, removeSnippet } =
  settingsSlice.actions;
