import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['transaction-form'],
  transaction: null,

  actions: {
    cancel() { this.sendAction('cancel'); },
    delete() { this.sendAction('delete'); },
    save() { this.sendAction('save'); },
    toggleCoordinateEnabled() { this.sendAction('toggleCoordinateEnabled'); },
  },
});
