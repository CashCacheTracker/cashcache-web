import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

function getCurrentDate() {
  return moment().format('YYYY-MM-DD');
}

export default DS.Model.extend({
  coordinate: DS.attr(),
  date: DS.attr('string', { defaultValue: getCurrentDate }),
  description: DS.attr('string'),
  is_split: DS.attr('boolean'),
  location: DS.attr('string'),
  note: DS.attr('string'),
  value: DS.attr('number'),

  // Non-serialized (local only)
  coordinateEnabled: DS.attr('boolean', { defaultValue: true }),

  // Computed
  hasCoordinate: Ember.computed('coordinate', function() {
    let coordinate = this.get('coordinate');
    return coordinate && coordinate.latitude && coordinate.longitude;
  }),
});
