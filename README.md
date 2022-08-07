# Frontend Engineer Technical Exercise

Interview task submission

Author: Jake Nusca\
Date: 07/08/2022

## Assumptions

- Showing `total` price in UI, as I would want to see prices with all fees included already
- Shows 'Free' if there is no data about ticket types (this would be business logic I would ask for clarification on)

## Improvements

As this is just a throwaway task, I didn't go too deep into optimizing and fleshing things out. Here are some things that could be improved if I spent more time on this:

- Make global font styles to avoid redundant and hardcoded text styling throughout app
- Move hardcoded colours in global css vars (ie. using styled-components' `createGlobalStyle()`)
- Time zone localization (?)
- Pull things out into components for potential reuse, and to make EventCard file a little easier to read:
  - Accordion
  - Badges
- A “No results” screen for when a user types a venue that doesn't exist (or just has no events)
- I18n - no hardcoded strings
- Fix security vulnerabilities listed in `npm audit`
- Data caching (perhaps using RTK Query)
- A nicer looking search bar component
- A nicer looking landing page
- Typeahead searching for venue names (would need an API to get/search venue names)
- More unit tests eg. for helper functions, thunks

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Set up environment variables

Copy the `env.template` file and rename to `env.development` or just `.env`. Replace the values in there with the endpoint and API key that was provided with the assignment.

## How to run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
