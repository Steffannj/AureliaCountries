import { App } from '../../src/app';

class RouterStub {
  routes;

  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}

class I18NStub {
  tr(str) {
    return '';
  }
}

describe('the App module', () => {
  let sut;
  let mockedRouter;
  let mockedI18n;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    mockedI18n = new I18NStub();
    sut = new App(mockedI18n);
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Aurelia');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContainEqual({
      route: ['', 'countries'], name: 'countries', moduleId: './countries', nav: true, title: 'Countries'
    });
  });
});
