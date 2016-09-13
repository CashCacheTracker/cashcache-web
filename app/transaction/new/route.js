import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let transaction = this.get('store').createRecord('transaction');
    this._handleGeolocation(transaction);
    return transaction;
  },

  _handleGeolocation(transaction) {
    navigator.geolocation.getCurrentPosition(position => {
      let coordinate = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      if (transaction.get('coordinateEnabled')) {
        transaction.set('coordinate', coordinate);
      }
    });
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
    toggleCoordinateEnabled: function() {
      let transaction = this.currentModel;
      if (transaction.get('coordinateEnabled')) {
        transaction.set('coordinate', undefined);
        transaction.set('coordinateEnabled', false);
      } else {
        transaction.set('coordinateEnabled', true);
        this._handleGeolocation(transaction);
      }
    },
  },
});
