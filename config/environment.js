/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    apiUrl: 'http://localhost:8801',
    modulePrefix: 'cashcache',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',

    dates: {
      diffYearFormat: 'MMM D Y',
      sameYearFormat: 'MMM D',
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    i18n: {
      defaultLocale: 'en-US',
    },
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'index',
    routeAfterAuthentication: 'transaction.index',
    routeIfAlreadyAuthenticated: 'transaction.index'
  };

  ENV['auth0-ember-simple-auth'] = {
    clientID: 'Usg01Uw9R7bxOwxyQjWVpYuqyinuFGCu',
    domain: 'cashcache.auth0.com'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
