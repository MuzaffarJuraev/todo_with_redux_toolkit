import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import todoSlice from "./todoSlice";
import { todoApi } from "./apiSlice";

export default configureStore({
  reducer: { todo: todoSlice, [todoApi.reducerPath]: todoApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});
