import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./RegisterSlice";

export default configureStore({
  reducer: {
    card: registerSlice,
  },
});
