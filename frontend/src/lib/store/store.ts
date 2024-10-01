import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './slices/user.slice'

export const store = configureStore({
  reducer: {
    user: usersReducer
  },
})

export type RootState = ReturnType<typeof store.getState>