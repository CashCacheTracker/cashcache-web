import DS from 'ember-data';

export default DS.Model.extend({
  total: DS.attr('number'),
  month: DS.attr('string'),

  // TODO: hasMany account_snapshot
});
