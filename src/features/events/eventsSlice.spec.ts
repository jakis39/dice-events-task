import eventsReducer, { EventsState, updateFilters } from './eventsSlice';

describe('events reducer', () => {
  const initialState: EventsState = {
    events: [
      {
        name: 'test',
      },
    ],
    status: 'idle',
    page: {
      number: 4,
      size: 12,
    },
    filter: {
      venues: 'Public Records',
    },
    allResultsLoaded: false,
  };

  it('should handle initial state', () => {
    expect(eventsReducer(undefined, { type: 'unknown' })).toEqual({
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
    });
  });

  it('should handle update filters', () => {
    const actual = eventsReducer(
      initialState,
      updateFilters({ venues: 'test' })
    );
    expect(actual.filter.venues).toEqual('test');
    expect(actual.page.number).toEqual(1);
    expect(actual.events.length).toEqual(0);
    expect(actual.allResultsLoaded).toEqual(false);
  });
});