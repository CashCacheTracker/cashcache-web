import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('transaction', function() {
    this.route('new');
    this.route('edit', { path: ':transaction_id' });
  });
});

export default Router;
