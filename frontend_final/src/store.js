import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rizeZoneApp, { riceZoneApp } from "./reducers"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, riceZoneApp)

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
export const store = configureStore({reducer: persistedReducer, middleware: [thunk]}, composedEnhancer);

export const persistor = persistStore(store)