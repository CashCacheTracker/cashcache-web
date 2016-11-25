import Ember from 'ember';
import { moduleForComponent as superModuleForComponent } from 'ember-qunit';
export { test } from 'ember-qunit';
import { startMirage } from 'cashcache/initializers/ember-cli-mirage';

const nop = function() {};

function localBeforeEach(subjectName) {
  // Sugar to render a component without so much repetition/importing/etc:
  // xRender('foo=bar comp=arg action=etc', {
  //   inside: 'optional content inside component block',
  //   inverted: 'optional content inside {{else}} of component block'
  // });
  this.xRender = function(args='', options={}) {
    let { inside, inverted } = options;
    let content;

    if (typeof inverted !== 'undefined') {
      content = `
        {{#${subjectName} ${args}}}
          ${inside}
        {{else}}
          ${inverted}
        {{/${subjectName}}}
      `;
    } else if (typeof inside !== 'undefined') {
      content = `
        {{#${subjectName} ${args}}}
          ${inside}
        {{/${subjectName}}}
      `;
    } else {
      content = `{{${subjectName} ${args}}}`;
    }

    this.render(Ember.HTMLBars.compile(content));
  };

  this.server = startMirage();
}

function localAfterEach() {
  this.server.shutdown();
}

// Sugar to declare a component integration test in a DRY way and add xRender method
export function moduleForComponent(subjectName, callbacks) {
  // Clone object
  let realCallbacks = Object.assign({}, callbacks || {});
  realCallbacks.integration = true;

  // Save any callbacks
  let superBeforeEach = realCallbacks.beforeEach || nop;
  let superAfterEach = realCallbacks.afterEach || nop;

  // Run our events and then the originals
  realCallbacks.beforeEach = function() {
    localBeforeEach.call(this, subjectName);
    return superBeforeEach(...arguments);
  };
  realCallbacks.afterEach = function() {
    localAfterEach.call(this);
    return superAfterEach(...arguments);
  };

  const description = `Integration | Component | ${subjectName}`;
  return superModuleForComponent(subjectName, description, realCallbacks);
}
