import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { EventListing } from '../features/events/eventsAPI';
import { Button } from './Button';
import PlayIcon from '../assets/play-icon.png';

export interface EventCardProps {
  event: EventListing;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  })
    .format(price / 100)
    .replace('.00', '');
}

export const EventCard = ({ event }: EventCardProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { event_images, images } = event;

  const image = event_images?.square ?? images?.[0];
  const date = new Date(event.date);
  const hasAudioTrack =
    event.apple_music_tracks?.length || event.spotify_tracks?.length;

  const eventDateString = useMemo(
    () => (
      <>
        {date
          .toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          })
          .replace(',', '')}
        {' — '}
        {date
          .toLocaleTimeString('en-GB', {
            hour: 'numeric',
            hour12: true,
            minute: 'numeric',
          })
          .replace(',', '')}
      </>
    ),
    [date]
  );

  const lowestPrice = useMemo(() => {
    if (event.ticket_types && event.ticket_types.length) {
      const price = Math.min(
        ...event.ticket_types.map((type) => Number(type.price?.total))
      );
      return formatPrice(price);
    } else {
      return 0;
    }
  }, [event, event.ticket_types?.length]);

  return (
    <div>
      <ImageContainer expanded={expanded}>
        {image && <Image src={image} />}
        <CalloutsContainer>
          {hasAudioTrack && (
            <PlayButton aria-label="Play track">
              <img src={PlayIcon} />
            </PlayButton>
          )}
          {/* <div>Featured</div> */}
        </CalloutsContainer>
      </ImageContainer>

      <div>{eventDateString}</div>
      <Title>{event.name}</Title>

      <strong>{event.venue}</strong>
      <div>{event.location?.city}</div>

      <Accordion>
        <AccordionControl onClick={() => setExpanded(!expanded)}>
          <span>More Info</span>
          <div>{expanded ? '-' : '+'}</div>
        </AccordionControl>

        <AccordionContent expanded={expanded}>
          <div>
            <ClampedDescription>{event.description}</ClampedDescription>
            {event.artists?.length && (
              <>
                <Subheading>LINEUP</Subheading>
                <ul>
                  {event.artists?.map((artist) => (
                    <li>{artist}</li>
                  ))}
                  {event.date_end && (
                    <li>
                      Curfew
                      {' — '}
                      <strong>
                        {new Date(event.date_end).toLocaleTimeString('en-GB', {
                          hour: 'numeric',
                          hour12: true,
                          minute: 'numeric',
                        })}
                      </strong>
                    </li>
                  )}
                </ul>
              </>
            )}

            {event.ticket_types?.length && (
              <>
                <Subheading>TICKETS</Subheading>
                <ul>
                  {event.ticket_types?.map((ticketType) => {
                    return ticketType.price?.total ? (
                      <li>
                        {ticketType.name}
                        {' — '}
                        <strong>{formatPrice(ticketType.price?.total)}</strong>
                        {ticketType.sold_out && (
                          <SoldOutIndicator>SOLD OUT</SoldOutIndicator>
                        )}
                      </li>
                    ) : null;
                  })}
                </ul>
              </>
            )}
          </div>
        </AccordionContent>
      </Accordion>

      <CtaRow>
        <Button onClick={() => console.log('test')}>Book now</Button>
        <PriceContainer>
          {(event.ticket_types ?? []).length > 1 && <span>From</span>}
          <div>{lowestPrice}</div>
        </PriceContainer>
      </CtaRow>
    </div>
  );
};

const ImageContainer = styled.div<{ expanded: boolean }>`
  position: relative;
  margin-bottom: 1rem;
  overflow: hidden;
  max-height: ${({ expanded }) => (expanded ? '150px' : '350px')};
  transition: max-height 200ms ease-out;
`;

const Image = styled.img`
  width: 100%;
  vertical-align: bottom;
`;

const CalloutsContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PlayButton = styled.button`
  height: 50px;
  width: 50px;
  border: none;
  background: rgba(0, 0, 0, 0.5);

  & img {
    min-height: 15px;
    vertical-align: bottom;
  }
`;

const Title = styled.h3`
  font-size: 28px;
  margin: 0.5rem 0 1rem 0;
`;

const Accordion = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  margin-top: 1rem;
`;

const AccordionControl = styled.button`
  width: 100%;
  background: none;
  border: none;
  margin: 0;
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1.5rem 0.75rem 1rem;
  font-weight: bold;
`;

const AccordionContent = styled.div<{ expanded: boolean }>`
  max-height: ${({ expanded }) => (expanded ? '100vh' : 0)};
  transition: max-height 200ms ease-out;
  overflow: hidden;

  & > div {
    padding: 1rem;
  }

  & ul {
    padding: 0;
    list-style: none;
    margin-bottom: 0.5rem;

    & li {
      margin-bottom: 0.5rem;
    }
  }
`;

const ClampedDescription = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Subheading = styled.h4`
  color: #3c74ff;
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 1rem 0;
`;

const SoldOutIndicator = styled.span`
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
  margin-left: 0.5rem;
  white-space: nowrap;
`;

const CtaRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.5);
  align-items: flex-end;

  & *:last-child {
    font-size: 32px;
    color: #000;
  }
`;
