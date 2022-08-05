import React from 'react';
import { EventsList } from './EventsList';
import { EventsFilterBar } from './EventsFilterBar';

export function Events() {
  return (
    <>
      <EventsFilterBar />
      <EventsList />
    </>
  );
}
