import Ember from 'ember';
import config from 'cashcache/config/environment';
import moment from 'moment';

let component = Ember.Component.extend({
  classNames: ['date-format'],

  date: Ember.computed('params.[]', function() {
    return this.get('params')[0];
  }),

  dateFormat: Ember.computed('date', function() {
    let date = this.get('date');
    let isSameYear = moment().isSame(date, 'year');
    return isSameYear ? config.dates.sameYearFormat : config.dates.diffYearFormat;
  }),
});

component.reopenClass({
  positionalParams: 'params'
});

export default component;
