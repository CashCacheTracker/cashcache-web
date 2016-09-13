import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    coordinateEnabled: { serialize: false }
  }
});
