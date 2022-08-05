import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { fetchEventsAsync, updateFilters } from './eventsSlice';

export const EventsFilterBar = () => {
  const dispatch = useAppDispatch();
  const [venueName, setVenueName] = useState('');

  function getEvents() {
    dispatch(
      updateFilters({
        venues: venueName,
      })
    );
    dispatch(fetchEventsAsync());
  }

  function onVenueInputChange(e: React.FormEvent<HTMLInputElement>) {
    setVenueName(e.currentTarget.value);
  }

  return (
    <Container>
      <input
        type="text"
        value={venueName}
        onChange={onVenueInputChange}
      ></input>
      <button onClick={getEvents}>Get events</button>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid yellowgreen;
  padding: 1rem;
  margin-bottom: 1rem;
`;
