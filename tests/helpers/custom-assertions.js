export default function patchCustomAssertions() {
  QUnit.assert.selectorExists = function(selector, message) {
    return QUnit.assert.ok(find(selector).length > 0,  message);
  };

  QUnit.assert.selectorResultCount = function(selector, count, message) {
    return QUnit.assert.equal(find(selector).length, count, message);
  };
}
