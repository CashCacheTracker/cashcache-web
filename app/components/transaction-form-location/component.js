import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['transaction-form-location'],
  transaction: null,

  actions: {
    toggleCoordinateEnabled() { this.sendAction('toggleCoordinateEnabled'); },
  },
});
