import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['x-mdl-confirmed-button'],

  text: null,
  confirmText: null,
  isInitiated: false,

  buttonData: Ember.computed('isInitiated', 'text', 'confirmText', function() {
    return !this.get('isInitiated') ? {
      action: 'initiate',
      class: 'initiate-button',
      isConfirm: false,
      text: this.get('text')
    } : {
      action: 'confirm',
      class: 'confirm-button',
      isConfirm: true,
      text: this.get('confirmText')
    };
  }),

  actions: {
    initiate() {
      this.set('isInitiated', true);
    },
    confirm() {
      this.sendAction();
    },
  },
});
