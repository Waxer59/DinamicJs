import { createSlice } from '@reduxjs/toolkit';

export const codeSlice = createSlice({
  name: 'code',
  initialState: {
    code: [],
    activeCode: ""
  },
  reducers: {
    addCode: (state, action) => {
      state.code.push(action.payload);
    },
    setActiveCode: (state, action) => {
      state.activeCode = action.payload;
    }
  }
});

export const { addCode, setActiveCode } = codeSlice.actions;
