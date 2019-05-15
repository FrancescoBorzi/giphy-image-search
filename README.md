# GiphyImageSearch

A demo web app that consumes the [Giphy API](https://developers.giphy.com/docs/#operation--gifs-search-get).

Built using:

- [TypeScript](https://www.typescriptlang.org/)
- [Angular](https://angular.io/) and the [Virtual Scrolling](https://material.angular.io/cdk/scrolling/overview#virtual-scrolling)
- [Bootstrap](https://getbootstrap.com/)
- [Sass](https://sass-lang.com/)
- [ngx-loading-bar](https://github.com/aitboudad/ngx-loading-bar)

## How to use

### Requirements

- Node.js and npm installed in your machine (download [here](https://nodejs.org/en/))
- Angular CLI installed in your machine: `npm install -g @angular/cli@latest`

Type the `npm -v` and `ng version` commands to make sure the requirements are correctly installed in your system before proceeding.

### Installing the dependencies

Open the terminal and `cd` to the project folder, then run `npm install`.

### Executing commands: build, run, test

A detailed documentation about all available Angular CLI commands is available [here](https://angular.io/cli).

Such commands include:

##### serve

Use `ng serve` for a development server. The default port is `4200` and can be changed passing the `--port` parameter.

Example: `ng serve --port 8000`.

##### test

Use `ng test` to run unit and component tests.

To include the coverage report use `ng test --code-coverage --source-map`. This will generate a `coverage/` directory containing containing the results.

The tests will run by default in the Chrome browser. It is also possible to run them in Firefox using:

`ng test --browsers Firefox`

Make sure the selected browser is installed in your system in order to correctly run the tests.

##### build

To build the app use `ng build`. The param `--prod` can be passed to target the production environment.

If you are going to run this app in a subdirectory of your domain, for example `www.domain.com/giphy-app` use the parameter `--base-href`.

Example: `ng build --prod --base-href /giphy-app/`

##### e2e

Use `ng e2e` to run the Protractor e2e tests. The default port is `4200` and can be changed passing the `--port` parameter.

Example: `ng e2e --port 8001`
