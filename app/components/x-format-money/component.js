import Ember from 'ember';

let klass = Ember.Component.extend({
  tagName: 'span',
  classNames: ['currency'],
  classNameBindings: ['zero', 'positive', 'negative'],

  zero:     Ember.computed('value', function() { return this.get('value') === 0; }),
  positive: Ember.computed('value', function() { return this.get('value') > 0; }),
  negative: Ember.computed('value', function() { return this.get('value') < 0; }),
});

klass.reopenClass({
  positionalParams: ['value'],
});

export default klass;
