/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>

// we want font-awesome to load as soon as possible to show the fa-spinner
import 'font-awesome/css/font-awesome.css';
import 'nprogress/nprogress.css';
import './styles/bootstrap.scss';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'multiple-select-modified/src/multiple-select.css';
import 'multiple-select-modified/src/multiple-select.js';
import '@slickgrid-universal/common/dist/styles/css/slickgrid-theme-bootstrap.css';
import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { GridOption } from 'aurelia-slickgrid';
import * as Bluebird from 'bluebird';
import 'bootstrap';

import './styles/styles.scss';
import './styles/bootstrap-social.scss';
import * as environment from '../config/environment.json';

/** Disable long stack traces for IE11 */
Bluebird.config({
  warnings: {
    wForgottenReturn: false
  },
  longStackTraces: false
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation'));
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-slickgrid'), (config: { options: GridOption }) => {
    // define a few global grid options
    // config.options.gridMenu.iconCssClass = 'fa fa-ellipsis-v'
  });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
