This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Goal

1. Create a TODO RESTful api, each TODO is associated with a user, a basic TODO must contain an optional title and a required description this will allow a consumer to:

- [x] View the list of all TODOs
- [x] View TODOs from a single user
- [x] Add, Edit and Delete a TODO
- [x] TODO validation by the api should be used were necessary and return relevant error messages on failure.

- [x] The api should be written in Javascript using NodeJS or PHP using Laravel/Lumen
If you decide to use NodeJs you are allowed to use third party libraries like Express.js

2. Create a simple front end to consume the api that uses React or Vue.js. This does not need to interact with every endpoint but must be able to at least pull the list of all TODOs and perform some filtering/sorting on the frontend. CSS is not required.

## Bonus Points
If you feel like a challenge…
1. Use Typescript if using Javascript
2. Dockerize the application to run in a container.
3. Add protection to the endpoints such that a user can only interact with TODOs that have
their user associated with them. A super user should be available to interact with all
TODOs (this can be used in the above front end).🐟