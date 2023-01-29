import { rootReducer } from "../reducers";
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const userConfig = {
    key: 'user',
    storage,
    whitelist: ['user'],
};

const persistedReducer = persistReducer(userConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer, middleware: [thunk] });

export const persistedStore = persistStore(store);