# aurelia-nest-auth-mongodb
Full stack boilerplate with Aurelia, NestJS, GraphQL, MongoDB and OAuth login.

### Client installation
Start by cloning the repo and then install it (with `npm` or [yarn](https://yarnpkg.com/))
```bash
cd aurelia-nest-auth-mongodb/client
npm install # or: yarn install
```

### VScode Workspaces
If you use VSCode (Visual Studio Code) as your main editor, you can load the vscode workspace (requires version `1.16+`, `File -> Open Workspaces`). Once the workspace is loaded, you will then have access to multiple tasks (defined in `client-ts-wp/tasks.json`) which makes it easy to execute the code without even typing any command in the shell (you still have to make sure to `npm install` in both `client-ts-wp` and `server` folder).


### Running the App
The simplest way of running the App is by typing the command (note: this will only start the WebUI)
```bash
npm start # or: yarn start
```
What if you want to run both WebUI (Aurelia), WebAPI (`nodeJS` server) and even start the browser with 1 command?
Easy, just use the following command (make sure to follow the [Server installation](#backend-server-installation-nodejs) prior to launching this command). :
```bash
npm start -- withBackend # or: yarn start -- withBackend
```
**Note:** a final note when using the `withBackend`, it will use `nodemon` with 2 flags `--watch` and `--inspect`. If you do not want to start with any flags, you may use `withBackend.noflag`

### Backend Server installation (NestJS)
To install and start the backend server (NestJS), go into the server folder and run `npm start` (make sure you ran the `npm install` first)
```bash
cd aurelia-nest-auth-mongodb/server
npm install # or: yarn install
npm start # or: yarn start
```

### Web UI
If everything goes well, your application should now run locally on port `9000`. So, in your browser just go to the URL [http://localhost:9000](http://localhost:9000).

## Configuration

### Default Ports
Default ports for this application are `9000` for the WebUI and `5000` for the WebAPI (server) calls. You can change the ports by editing the file [/client-ts-wp/config.js](https://github.com/ghiscoding/aurelia-nest-auth-mongodb/blob/master/client-ts-wp/config.js), the `webpack.config.js` and `package-scripts.js` were modifed to use the `config.js` configured ports.

## License
MIT

## NOTE
This TODO Realtime App was based on the official `aurelia-skeleton-webpack`, you can run any of the regular commands that were provided with the skeleton. See below for the official [aurelia-skeleton-webpack - README](https://github.com/aurelia/skeleton-navigation/tree/master/skeleton-typescript-webpack).

# aurelia-skeleton-webpack

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
