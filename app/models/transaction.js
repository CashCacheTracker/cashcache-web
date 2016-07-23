import DS from 'ember-data';

export default DS.Model.extend({
  value: DS.attr('number'),
  note: DS.attr('string'),
  date: DS.attr('date'),
  description: DS.attr('string'),
  location: DS.attr('string'),
  is_split: DS.attr('boolean'),
});
