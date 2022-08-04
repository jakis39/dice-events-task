import React, { useState } from 'react';
import { EventListing } from '../features/events/eventsAPI';

export interface EventCardProps {
  event: EventListing;
}

export const EventCard = ({ event }: EventCardProps) => {
  //   const { event } = props;
  return <div>{event.name}</div>;
};
