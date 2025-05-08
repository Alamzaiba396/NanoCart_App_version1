// ✅ store.js (FIXED)
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, REHYDRATE, PERSIST, FLUSH } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "../redux/reducers/authReducer";
import itemReducer from "../redux/reducers/itemSlice";
import wishlistReducer from "../redux/reducers/wishlistSlice";
import cartReducer from "./reducers/cartSlice";

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["token", "role", "user"],
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
  item: itemReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE, FLUSH],
      },
    }),
});

export const persistor = persistStore(store);