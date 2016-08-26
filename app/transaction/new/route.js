import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').createRecord('transaction');
  },

  actions: {
    cancel: function() {
      this.transitionTo('transaction');
    },
    save: function() {
      this.currentModel.save().then(() => {
        this.transitionTo('transaction');
      });
    },
  },
});
