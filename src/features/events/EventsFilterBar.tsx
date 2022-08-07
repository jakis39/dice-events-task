import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../app/hooks';
import { Button } from '../../common/Button';
import { DeviceWidth } from '../../styles/mediaQueries';
import { fetchEventsAsync, updateFilters } from './eventsSlice';

export const EventsFilterBar = () => {
  const dispatch = useAppDispatch();
  const [venueName, setVenueName] = useState('');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      <Form onSubmit={onSubmit}>
        <VenueInput
          type="text"
          value={venueName}
          onChange={onVenueInputChange}
          placeholder="Search for a venue"
        ></VenueInput>
        <Button type="submit">Find Tickets</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
`;

const VenueInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin-right: 1rem;

  @media (${DeviceWidth.mediaMinMedium}) {
    min-width: 250px;
  }

  @media (${DeviceWidth.mediaMaxMedium}) {
    flex-grow: 1;
  }
`;
