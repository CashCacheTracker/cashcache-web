function select(contextualSelector) {
  // Select for both acceptance and component tests,
  // contextualSelector can be '#selector' or [context, '#selector']
  if (contextualSelector[0].$) {
    let [context, selector] = contextualSelector;
    return context.$(selector);
  }
  return find(contextualSelector);
}

export default function patchCustomAssertions() {
  QUnit.assert.defined = function(value, message) {
    return QUnit.assert.notStrictEqual(value, undefined, message);
  };

  QUnit.assert.selectorExists = function(selector, message) {
    return QUnit.assert.ok(select(selector).length > 0,  message);
  };

  QUnit.assert.selectorResultCount = function(selector, count, message) {
    return QUnit.assert.equal(select(selector).length, count, message);
  };
}
