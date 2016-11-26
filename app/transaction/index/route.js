import Ember from 'ember';
import InfinityRoute from 'ember-infinity/mixins/route';

export default Ember.Route.extend(InfinityRoute, {
  perPageParam: 'page[size]',
  pageParam: 'page[number]',
  totalPagesParam: 'meta.page-count',

  model() {
    return this.infinityModel('transaction', {
      perPage: 10,
      startingPage: 1,
      sort: '-date,-id', // Newest first, then newest id for collisions/invalid dates
    });
  }
});
