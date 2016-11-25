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

  QUnit.assert.formChecked = function(selector, message) {
    return QUnit.assert.ok(select(selector).is(':checked'), message);
  };

  QUnit.assert.formNotChecked = function(selector, message) {
    return QUnit.assert.ok(select(selector).is(':not(:checked)'), message);
  };

  QUnit.assert.formValue = function(selector, value, message) {
    return QUnit.assert.equal(select(selector).val(), value, message);
  };

  QUnit.assert.selectorExists = function(selector, message) {
    return QUnit.assert.ok(select(selector).length > 0,  message);
  };

  QUnit.assert.selectorResultCount = function(selector, count, message) {
    return QUnit.assert.equal(select(selector).length, count, message);
  };

  QUnit.assert.selectorSubstring = function(selector, needle, message) {
    needle = needle.toString().trim();
    let text = (select(selector).text() || '').trim();
    return QUnit.assert.ok(text.includes(needle), message);
  };
}
