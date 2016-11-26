import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    cancel: function() {
      this.transitionTo('transaction');
    },
    delete: function() {
      this.currentModel.destroyRecord().then(() => {
        this.transitionTo('transaction');
      });
    },
    save: function() {
      this.currentModel.save().then(() => {
        this.transitionTo('transaction');
      });
    },
  },
});
