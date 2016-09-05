import DS from 'ember-data';
import moment from 'moment';

function getCurrentDate() {
  return moment().format('YYYY-MM-DD');
}

export default DS.Model.extend({
  value: DS.attr('number'),
  note: DS.attr('string'),
  date: DS.attr('string', { defaultValue: getCurrentDate }),
  description: DS.attr('string'),
  location: DS.attr('string'),
  is_split: DS.attr('boolean'),
});
