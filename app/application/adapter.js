import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from '../config/environment';

export default JSONAPIAdapter.extend({
  host: config.apiUrl,
  pathForType: function(type) {
    return Ember.String.pluralize(Ember.String.underscore(type));
  }
});
