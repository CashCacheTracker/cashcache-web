import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  value: DS.attr('number'),
  note: DS.attr('string'),
  month: DS.attr('date'),

  account: belongsTo('account'),
});
