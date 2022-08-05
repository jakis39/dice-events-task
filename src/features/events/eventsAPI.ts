import { client } from '../../api/client';
import { EventsFilters, EventsPageInfo } from './eventsSlice';

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export function fetchEvents(page: EventsPageInfo, filters: EventsFilters) {
  const pageQuery = createQueryParamsFromObject('page', page);
  const filterQuery = createQueryParamsFromObject('filter', filters);
  const url = encodeURI(`${ENDPOINT}/events?${pageQuery}&${filterQuery}`);
  return client
    .get(url, {
      headers: {
        'x-api-key': process.env.REACT_APP_NOT_SO_SECRET_API_KEY, //TODO : MOVE TO ENV FILE!!!
      },
    })
    .then((res) => {
      console.log(res);
      return res;
    });
}

function createQueryParamsFromObject(
  name: string,
  params: Record<string, any>
) {
  const queryString = Object.keys(params)
    .map((key) => `${name}[${key}]=${params[key]}`)
    .join('&');
  console.log(queryString);
  return queryString;
}

export interface EventsApiResponse {
  data: Event[];
  links: {
    self: string;
    next: string;
  };
}

export interface EventListing {
  age_limit?: string;
  sale_end_date?: string;
  raw_description?: string;
  status?: string;
  images?: any[];
  apple_music_tracks?: [
    {
      open_url?: string;
      preview_url?: string;
      title?: string;
    }
  ];
  event_images?: {
    brand?: null;
    landscape?: string;
    portrait?: string;
    square?: string;
  };
  name?: string;
  presented_by?: string;
  genre_tags?: any[];
  hash?: string;
  venue?: string;
  detailed_artists?: [
    {
      headliner?: boolean;
      id?: number;
      name?: string;
    }
  ];
  type?: string;
  price?: null;
  venues?: [
    {
      city?: {
        code?: string;
        country_alpha3?: string;
        country_id?: string;
        country_name?: string;
        id?: string;
        name?: string;
      };
      id?: number;
      name?: string;
    }
  ];
  url?: string;
  address?: string;
  announcement_date?: string;
  currency?: string;
  id?: string;
  spotify_tracks?: [
    {
      open_url?: string;
      preview_url?: string;
      title?: string;
    }
  ];
  show_price_breakdown?: boolean;
  ticket_types?: [
    {
      id?: number;
      name?: string;
      price?: {
        face_value?: number;
        fees?: number;
        total?: number;
      };
      sold_out?: boolean;
    }
  ];
  external_url?: null;
  promoters?: [
    {
      id?: number;
      name?: string;
    }
  ];
  int_id?: number;
  destination_event_perm_name?: null;
  type_tags?: any[];
  cities?: [
    {
      code?: string;
      country_alpha3?: string;
      country_id?: string;
      country_name?: string;
      id?: string;
      name?: string;
    }
  ];
  checksum?: string;
  featured?: boolean;
  sold_out?: boolean;
  date: string;
  date_end?: string;
  location?: {
    accuracy?: number;
    city?: string;
    country?: string;
    lat?: number;
    lng?: number;
    place?: string;
  };
  flags?: any[];
  perm_name?: string;
  links?: any[];
  artists?: any[];
  timezone?: string;
  tags?: any[];
  destination_event_id?: null;
  sale_start_date?: string;
  lineup?: [
    {
      details?: string;
      time?: string;
    }
  ];
  linkout_type?: null;
  description?: string;
}
