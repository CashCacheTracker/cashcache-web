import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from '../config/environment';

export default JSONAPIAdapter.extend({
  session: Ember.inject.service(),

  headers: Ember.computed('session.data.authenticated.jwt', function() {
    const jwt = this.get('session.data.authenticated.jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
    };
  }),
  host: config.apiUrl,
  pathForType(type) {
    return Ember.String.pluralize(Ember.String.underscore(type));
  },
});
