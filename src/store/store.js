import { configureStore} from "@reduxjs/toolkit";
import { codeSlice } from "./slices/code/codeSlice";

export const store = configureStore({
  reducer: {
    code: codeSlice.reducer,
  },
});
