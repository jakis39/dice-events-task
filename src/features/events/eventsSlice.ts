import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { EventListing, fetchEvents } from './eventsAPI';

export interface EventsPageInfo {
  number: number;
  size: number;
}

export interface EventsFilters {
  venues: string[] | string;
}

export interface EventsState {
  events: EventListing[];
  status: 'idle' | 'loading' | 'failed';
  page: EventsPageInfo;
  filter: EventsFilters;
  allResultsLoaded: boolean;
}

const initialState: EventsState = {
  events: [],
  status: 'idle',
  page: {
    number: 1,
    size: 12,
  },
  filter: {
    venues: '',
  },
  allResultsLoaded: false,
};

/**
 * Fetch events from the API using current page and filter info from the state
 * Doesn't take any inputs
 */
export const fetchEventsAsync = createAsyncThunk<
  any,
  void,
  {
    state: RootState;
  }
>('events/fetchEvents', async (_, thunkApi) => {
  const state: RootState = thunkApi.getState();
  const pageInfo = state.events.page;
  const filters = state.events.filter;
  const response = await fetchEvents(pageInfo, filters);
  return response.data;
});

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    /**
     * Reset page state and clear events when a new search is about to be performed
     */
    updateFilters: (state, action: PayloadAction<EventsFilters>) => {
      // Can "mutate" state inside reducers when using Redux Toolkit thanks to Immer
      state.filter = action.payload;
      state.page.number = 1;
      state.events = [];
      state.allResultsLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEventsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const newEvents = action.payload.data;
        state.events = [...state.events, ...newEvents];
        state.page.number += 1;
        if (!action.payload.links.next) {
          state.allResultsLoaded = true;
        }
      })
      .addCase(fetchEventsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { updateFilters } = eventsSlice.actions;

/**
 * Potential to use createSelector for performance improvements
 * (not overly necessary for this task)
 */
export const selectEvents = (state: RootState) => state.events.events;
export const selectAllEventsLoaded = (state: RootState) =>
  state.events.allResultsLoaded;
export const selectIsLoadingNewSearch = (state: RootState) =>
  state.events.status === 'loading' && state.events.page.number === 1;
export const selectIsLoadingMore = (state: RootState) =>
  state.events.status === 'loading' && state.events.page.number > 1;
export const selectCurrentFilters = (state: RootState) => state.events.filter;

export default eventsSlice.reducer;
