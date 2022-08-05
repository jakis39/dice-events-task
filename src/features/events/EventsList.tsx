import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EventCard } from '../../common/EventCard';
import { DeviceWidth } from '../../styles/mediaQueries';
import { EventListing } from './eventsAPI';
import {
  fetchEventsAsync,
  selectAllEventsLoaded,
  selectEvents,
} from './eventsSlice';

export const EventsList = () => {
  const dispatch = useAppDispatch();
  const events: EventListing[] = useAppSelector(selectEvents);
  const canLoadMore = !useAppSelector(selectAllEventsLoaded);

  function loadMore() {
    dispatch(fetchEventsAsync());
  }

  return (
    <Container>
      <List>
        {events &&
          events.map((event) => <EventCard key={event.id} event={event} />)}
      </List>

      {canLoadMore && (
        <div>
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 32px;
  gap: 2rem;

  @media (${DeviceWidth.mediaMinMedium}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (${DeviceWidth.mediaMinLarge}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
