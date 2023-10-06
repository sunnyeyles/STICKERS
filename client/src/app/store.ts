import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import { authApi } from './api/authApi'
import { itmesApi } from './api/itemsApi'
import itemReducer from './features/itemSlice'
import {
  userAddressInfoSlice,
  setAddressInfoState,
} from './features/userAddressInfoSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [itmesApi.reducerPath]: itmesApi.reducer,
    auth: authReducer,
    itemState: itemReducer,
    addressInfo: userAddressInfoSlice.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, itmesApi.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
