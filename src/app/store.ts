import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import eventsReducer from '../features/events/eventsSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
