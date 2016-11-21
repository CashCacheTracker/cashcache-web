import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import { authenticateSession } from 'cashcache/tests/helpers/ember-simple-auth';
import { stubSettings } from 'cashcache/services/geolocation';

export default function startApp(attrs) {
  let application;

  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  authenticateSession(application, {});
  stubSettings.position = { coords: { latitude: 0, longitude: 0 } };
  return application;
}
