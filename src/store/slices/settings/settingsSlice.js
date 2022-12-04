import { createSlice } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {},
  reducers: {
    setSettings: (state, action) => {
      state = action.payload;
    }
  }
});

export const { setSettings } = settingsSlice.actions;
