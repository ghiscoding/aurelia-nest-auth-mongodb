import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/abp-modal'),
    PLATFORM.moduleName('./elements/bootstrap-tooltip'),
    PLATFORM.moduleName('./elements/loading-indicator'),
    PLATFORM.moduleName('./value-converters/admin-filter'),
    PLATFORM.moduleName('./value-converters/auth-filter'),
    PLATFORM.moduleName('./value-converters/date-format'),
    PLATFORM.moduleName('./value-converters/number'),
    PLATFORM.moduleName('./value-converters/stringify')
  ]);
}
