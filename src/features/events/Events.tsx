import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchEventsAsync,
  selectAllEventsLoaded,
  selectEvents,
} from './eventsSlice';
import styles from './Events.module.css';
import { EventCard } from '../../common/EventCard';
import { EventListing } from './eventsAPI';

export function Events() {
  const events: EventListing[] = useAppSelector(selectEvents);
  const canLoadMore = !useAppSelector(selectAllEventsLoaded);
  const dispatch = useAppDispatch();

  const [venueName, setVenueName] = useState('');

  function getEvents() {
    dispatch(fetchEventsAsync());
  }

  function onVenueInputChange(e: React.FormEvent<HTMLInputElement>) {
    console.log(e.currentTarget.value);
    setVenueName(e.currentTarget.value);
  }

  function loadMore() {
    dispatch(fetchEventsAsync());
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={venueName}
          onChange={onVenueInputChange}
        ></input>
        <button onClick={getEvents}>Get events</button>
      </div>

      <div>
        {events &&
          events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>

      {canLoadMore && (
        <div>
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}
