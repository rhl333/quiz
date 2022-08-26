import { configureStore } from "@reduxjs/toolkit";
import GlobalSlice from "../features/GlobalSlice";

let store = configureStore({
  reducer: {
    allData: GlobalSlice,
  },
});

export default store;
