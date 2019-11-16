# Aurelia / NestJS / MongoDB / GraphQL and OAuth
Full stack boilerplate with Aurelia, NestJS, GraphQL, MongoDB and OAuth login.

### Backend Server installation (NestJS)
To install and start the backend server (NestJS), go into the server folder and run `npm start` (make sure you ran the `npm install` first)
```bash
cd aurelia-nest-auth-mongodb/server
npm install # or: yarn install
npm start # or: yarn start
```

### Running the App
The simplest way of running the App is to use the VSCode tasks there were created **Aurelia (client)** and **NestJS Dev (server)** (or _NestJS Debug (server)_ if you wish to debug your code with NestJS)

The second way would be to type the shell command `yarn start` in both `client` and `server` folders.
```bash
npm start # or: yarn start
```

### OAuth
For the OAuth to work, we use Passport and you will need to rename a file and configure your keys to get going. Here are the steps
1. rename [server/src/auth/auth-config.development.template.ts](https://github.com/ghiscoding/aurelia-nest-auth-mongodb/blob/master/server/src/auth/auth-config.development.template.ts) to `server/src/auth/auth-config.development.ts`
2. open the file and change all necessary `clientID` and `clientSecret` properties then save the file.
3. run the project

## License
MIT

## Getting started

Before you start, make sure you have a recent version of [NodeJS](http://nodejs.org/) environment *>=10.0* with NPM 6 or Yarn.

From the project folder, execute the following commands:

```shell
npm install # or: yarn install
```

This will install all required dependencies, including a local version of Webpack that is going to
build and bundle the app. There is no need to install Webpack globally.

To run the app execute the following command:

```shell
npm start # or: yarn start
```

### GraphQL
After installing and starting the server you should be able to see your GraphQL playground on http://localhost:3000/graphql.
You can see if it works by typing the following in the query window 
```ts
{
  hello 
}
```
Also note that most of the GraphQL query are protected and cannot be run directly in the GraphQL playground unless you use the JWT token.

