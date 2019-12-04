# Memory Game

This application is a game to test your memory.

# Application Structure

The application consists of two parts:

 - **backend** - Node.js Server to serve the API required for the game
 - **memory-game** - A ReactJS based frontend application

## Backend

- Backend is in Node.js 10
- Currently backend serves only one API - API to keep highest scores
- Rest of the APIs are from [https://deckofcardsapi.com/](https://deckofcardsapi.com/)

### Running Backend
```
yarn install
yarn start
yarn test - to run tests
```

## Frontend

- Frontend is a React.js Application
- State management is in Redux
- API requests using Axios

### Running Frontend
```
yarn install
yarn start
yarn test - to run tests
```

### How it works
- Initially it requests two deck of cards from [https://deckofcardsapi.com/](https://deckofcardsapi.com/)
- As you click on the cards, it draws a card from the same API for the selected deck
- If the cards do not match, they are fipped but are remembered in the state
- If cards match, they are not flipped and your match score is updated
- Once all cards are flipped, you win the game and are asked to enter you name in a prompt
- Curreny high scores are shown in a table at bottom

