import { createSlice } from '@reduxjs/toolkit';
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
    }
  }
});

export const { setSettings, setSnippets } = settingsSlice.actions;
