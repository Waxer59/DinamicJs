import { createSlice } from '@reduxjs/toolkit';

export const codeSlice = createSlice({
  name: 'code',
  initialState: {
    code: []
  },
  reducers: {
    addCode: (state, action) => {
      state.code.push(action.payload);
    }
  }
});

export const { addCode } = codeSlice.actions;
