# Aurelia / NestJS / MongoDB / GraphQL and OAuth
Full stack boilerplate with Aurelia, NestJS, GraphQL, MongoDB and OAuth login.

### Open for Contributions
Totally open for any Pull Request, please feel free to contribute in any ways, even npm package update PRs are welcome.👷👷‍♀️

## Client TypeScript Webpack

### Client installation
Start by cloning the repo and then install it (with `npm` or [yarn](https://yarnpkg.com/))
```bash
cd aurelia-nest-auth-mongodb/client
npm install # or: yarn install
```

### VScode Workspaces
If you use VSCode (Visual Studio Code) as your main editor, you can load the VSCode workspace. Once the workspace is loaded, you will then have access to multiple tasks (defined in `client/tasks.json`) which makes it easy to execute the code without even typing any command in the shell (you still have to make sure to `npm install` in both `client` and `server` folders).


### Running the App
The simplest way of running the App is to use the VSCode tasks there were created **Aurelia (client)** and **NestJS Dev (server)** (or _NestJS Debug (server)_ if you wish to debug your code with NestJS)

The second way would be to type the shell command `yarn start` in both `client` and `server` folders.
```bash
npm start # or: yarn start
```

### Backend Server installation (NestJS)
The first thing you will need is to install NestJS CLI
```bash
npm install -g @nestjs/cli
```

Then install and start the backend server code (NestJS), go into the server folder and run `npm start` (make sure you ran the `npm install` first).
```bash
cd aurelia-nest-auth-mongodb/server
npm install # or: yarn install
npm start # or: yarn start
```

### MongoDB Database
We use MongoDB for the backend database, the default database that will be used is named `nest`, you will need to manually add it (there's currently no seeding/migration in the project). Also it is configured to be used without credentials but, you might want to change that in the future to be more secure. You can find the MongoDB connection string with the credentials in the [src/app.module.ts](https://github.com/ghiscoding/aurelia-nest-auth-mongodb/blob/master/server/src/app.module.ts) file.

Also note that we use [Mongoose](https://mongoosejs.com/) as Schema modeling and validation.

### OAuth
For the OAuth to work, we use Passport and you will need to rename a file and configure your keys to get going. Here are the steps
1. rename [server/src/auth/auth-config.development.template.ts](https://github.com/ghiscoding/aurelia-nest-auth-mongodb/blob/master/server/src/auth/auth-config.development.template.ts) to `server/src/auth/auth-config.development.ts`
2. open the file and change all necessary `clientID` and `clientSecret` properties then save the file.
3. run the project

### Web UI
If everything goes well, your application should now run locally on port `9000`. So, in your browser just go to the URL [http://localhost:9000](http://localhost:9000).

## License
MIT

## Getting started

Before you start, make sure you have a recent version of [NodeJS](http://nodejs.org/) environment *>=14.0* with NPM 6 or Yarn.

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

### User Roles
Each user can have 1 or more Role, each of them will automatically get the USER Role after being created/saved in the DB. On any user, you could also add the ADMIN Role. The very first user created in the DB will automically get the ADMIN & USER roles, for any other you could use MongoDB Compass to change their role(s) in the DB. The ADMIN Role is the only role that is allowed to see the Users List, a regular USER won't get any result in GraphQL (a 403 error will actually be thrown in GraphQL by the Guard).

### GraphQL
###### packages: graphql, apollo-server-express and @nestjs/graphql
We use GraphQL in a Code First approach (our code will create the GraphQL Schemas).

After installing and starting the server you should be able to see your GraphQL playground on http://localhost:3000/graphql.
You can see if it works by typing the following in the query window and click on the "Play" button in the middle of the screen.
```ts
{
  hello
}
```
Also note that most of the GraphQL queries are protected and cannot be run directly in the GraphQL playground unless you use the JWT token.

#### Protected GraphQL Queries/Mutations
Some of the GraphQL queries are protected by a NestJS Guard (`GraphqlPassportAuthGuard`) and requires you to be authenticated (and some also requires to have the Admin role) and you might be wondering how to query them? Simple, in GraphQL Playground we can pass an `Http Header` (bottom of the page) with the `Autorization` header that will contain our JWT token (which you can get from Chrome network)... and boom! We can start querying as if we were (are) authenticated, sweet!
```json
# Http Header
{
  "Authorization": "Bearer PASTE YOUR TOKEN HERE"
}
```

##### Example of some protected GraphQL
- Cats List (must be authenticated)
- Create a Cat (must be authenticated)
- Users List (must be authenticated & have ADMIN role)

### Swagger
###### packages: @nestjs/swagger
For any REST APIs, using a tool like Swagger is very helpful, it's already implemented in this project, all you have to do is head over to http://localhost:3000/api/ and see the Swagger API docs. You will also notice that only the Auth APIs are in the list (any GraphQL related APIs are outside of Swagger). Also the APIs are protected with the JWT token, same as with GraphQL, you can add your token by clicking on the "Authorize" button on the top right of the Swagger page and paste your token (without the word "Bearer").

### TODO
- [x] Exclude authConfig(s) from Git
- [x] Refine Auth Configuration for both Backend/Frontend
- [x] Update to latest Aurelia/CLI
- [x] Save user to MongoDB
- [x] User Login
	- [x] Use JWT with Passport and bcrypt for the password encryption while saving in DB
	- [x] Validate username/password in UI
	- [x] Add form validation
- [x] User Signup Frontend
	- [x] Encrypt password instead of plain text when sending it over the line
	- [x] Redirect to Profile after doing a sign up
	- [x] Add form validation
	- [x] Display warning when trying to signup duplicate email
- [ ] User Profile  
  - [x] Add user profile detail page
  - [ ] Add possibility to update Password in User Profile when using username/password
  - [ ] CRUD on User Profile ("Me" controller)
- [ ] Link/Unlink multiple accounts to a single account
  - [x] Ability to add multiple accounts to an OAuth account
  - [ ] Cleanup NestJS code to do it in 1 action instead of currently 2.
	- [ ] Link a user to a local user (username/password) with its email
  - [ ] Use original and/or linked account should connect the same user without recreating a new user in DB
- [x] GraphQL add the "whoAmI" (me) resolver
- [ ] Aurelia Auth separated into its own plugin
  - [x] JWT Storage
  - [ ] Create new plugin repo
- [ ] Windows Live picture must be pulled from Microsoft Graph API
- [x] Add Cats list in frontend under an authorized endpoint
- [x] Add User Roles (Admin/User)
- [x] Show User list only to Admin users
  - [x] Add GraphQL Nest Guard to show list only to ADMINs
  - [x] UI to only show menu when user has Admin role
- [x] Show Cats list to everyone who's authenticated in the UI and GraphQL (with JWT)
  - [x] Create new Cat from UI (cat's owner should be current authenticated user)
  - [x] Show Cat's owner in the cats list.
- [x] Protect MongoDB with username/password
- [x] Add Node/Chrome Debugger
- [x] Add Swagger with Bearer
- [x] Use [Aurelia-Slickgrid](https://github.com/ghiscoding/aurelia-slickgrid) on client side to show GraphQL lists (cats, users)
  - [x] add Grid with GraphQL but without Pagination
  - [x] add possible Grid Filtering
  - [x] add possible Grid Sorting
- [x] Use TypeScript 3.7 and configure Optional Chaining & Nullish Coalescing

### Print Screens

![Auth-Linkedin|678x500](https://i.imgur.com/xbw5RrJ.png)
![GraphQL|690x476](https://i.imgur.com/fXEDdfe.png)