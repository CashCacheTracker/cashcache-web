import Ember from 'ember';
import { moduleForComponent as superModuleForComponent } from 'ember-qunit';
export { test } from 'ember-qunit';

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
}

// Sugar to declare a component integration test in a DRY way and add xRender method
export function moduleForComponent(subjectName, callbacks) {
  // Clone object
  let realCallbacks = Object.assign({}, callbacks || {});
  realCallbacks.integration = true;

  // Save any beforeEach
  let superBeforeEach = realCallbacks.beforeEach || nop;

  // Run our event and then the original
  realCallbacks.beforeEach = function() {
    localBeforeEach.call(this, subjectName);
    return superBeforeEach(...arguments);
  };

  const description = `Integration | Component | ${subjectName}`;
  return superModuleForComponent(subjectName, description, realCallbacks);
}
