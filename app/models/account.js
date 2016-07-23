import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  name: DS.attr('string'),
  balance_type: DS.attr('string'), // TODO: Proper enum?
  tax_advantaged: DS.attr('boolean'),
  ticket: DS.attr('string'),

  account_snapshots: hasMany('account_snapshot'),
});
