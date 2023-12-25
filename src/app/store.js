import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../reduxServices/ProductsApi";
import cartReducer from "../slices/cartSlice";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;