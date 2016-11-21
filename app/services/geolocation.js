import Ember from 'ember';

export let stubSettings = { position: null };

export default Ember.Service.extend({
  getCurrentPosition() {
    if (stubSettings.position) {
      return Ember.RSVP.resolve(stubSettings.position);
    }
    return new Ember.RSVP.Promise(resolve => {
      navigator.geolocation.getCurrentPosition(position => resolve(position));
    });
  },
});
