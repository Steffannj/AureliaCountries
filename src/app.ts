import { autoinject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { PLATFORM } from 'aurelia-pal';
import { Router, RouterConfiguration } from 'aurelia-router';

@autoinject
export class App {
  public router: Router;

  constructor(private i18n: I18N) {
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      {
        route: ['', 'countries'],
        name: 'countries',
        moduleId: PLATFORM.moduleName('./countries'),
        nav: true,
        title: this.i18n.tr('navBar.countries')
      }
    ]);

    this.router = router;
  }
}
