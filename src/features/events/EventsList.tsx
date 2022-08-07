import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button } from '../../common/Button';
import { EventCard } from '../../common/EventCard';
import { DeviceWidth } from '../../styles/mediaQueries';
import { EventListing } from './eventsAPI';
import {
  fetchEventsAsync,
  selectAllEventsLoaded,
  selectCurrentFilters,
  selectEvents,
  selectIsLoadingMore,
  selectIsLoadingNewSearch,
} from './eventsSlice';

export const EventsList = () => {
  const dispatch = useAppDispatch();
  const events: EventListing[] = useAppSelector(selectEvents);
  const canLoadMore = !useAppSelector(selectAllEventsLoaded);
  const { venues } = useAppSelector(selectCurrentFilters);
  const isLoadingNewSearch = useAppSelector(selectIsLoadingNewSearch);
  const isLoadingMore = useAppSelector(selectIsLoadingMore);

  // A little janky but fine for a demo
  const capitalizedVenue = useMemo(() => {
    if (venues && venues.length) {
      return (Array.isArray(venues) ? venues[0] : venues)
        .split('')
        .map((char, index) => (index === 0 ? char.toUpperCase() : char))
        .join('');
    } else {
      return 'anywhere';
    }
  }, [venues]);

  function loadMore() {
    dispatch(fetchEventsAsync());
  }

  return (
    <Container>
      {isLoadingNewSearch ? (
        <Loader>Fancy loading spinner...</Loader>
      ) : (
        <>
          {events.length > 0 ? (
            <>
              <h1>Upcoming events at {capitalizedVenue}</h1>
              <List>
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </List>
            </>
          ) : (
            <Loader>Search for events above</Loader>
          )}

          {events.length > 0 && canLoadMore && (
            <LoadMoreContainer>
              <Button onClick={loadMore} loading={isLoadingMore}>
                Load More
              </Button>
            </LoadMoreContainer>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 0;

  & h1 {
    font-size: 24px;
    font-weight: normal;
    margin: 0 0 2rem 0;
    text-align: left;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 32px;
  gap: 2rem;
  padding-bottom: 3rem;

  @media (${DeviceWidth.mediaMinMedium}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (${DeviceWidth.mediaMinLarge}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Loader = styled.div`
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadMoreContainer = styled.div`
  width: 100%;
  padding-bottom: 2rem;
  padding-top: 2rem;
  text-align: center;
`;
