import { createSlice } from '@reduxjs/toolkit';

export const codeSlice = createSlice({
  name: 'code',
  initialState: {
    codeTabs: [],
    activeCode: null,
    uploadedCode: null
  },
  reducers: {
    addCodeTabs: (state, action) => {
      state.codeTabs.push(action.payload);
    },
    setActiveCode: (state, action) => {
      state.activeCode = action.payload;
    },
    setUploadedCode: (state, action) => {
      state.uploadedCode = action.payload;
    },
    resetUploadedCode: (state) => {
      state.uploadedCode = null;
    }
  }
});

export const {
  addCodeTabs,
  setActiveCode,
  setUploadedCode,
  resetUploadedCode
} = codeSlice.actions;
