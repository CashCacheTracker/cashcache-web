import wait from 'ember-test-helpers/wait';
import { moduleForComponent, test } from 'cashcache/tests/helpers/module-for-component';

moduleForComponent('x-mdl-confirmed-button');

test('it requires two clicks to trigger action', function(assert) {
  assert.expect(3);
  this.set('action', () => assert.ok(true));

  this.xRender('action=action text="click" confirmText="confirm"');

  assert.selectorSubstring([this, 'button'], 'click', 'initial text matches');
  this.$('button').click();

  return wait().then(() => {
    assert.selectorSubstring([this, 'button'], 'confirm', 'confirm text matches');
    this.$('button').click();
  });
});

test('it keeps the same button', function(assert) {
  this.xRender();

  this.$('button').attr('data-our-button', true).click();
  return wait().then(() => {
    assert.ok(this.$('button').attr('data-our-button'));
  });
});
