import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').query('transaction', {
      sort: '-date,-id', // Newest first, then newest id for collisions/invalid dates
    });
  }
});
