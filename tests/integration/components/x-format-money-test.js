import { moduleForComponent, test } from 'cashcache/tests/helpers/module-for-component';

moduleForComponent('x-format-money');

test('it adds .positive', function(assert) {
  let value = faker.random.number() + 1;
  this.xRender(value);
  assert.selectorExists([this, '.format-money.positive']);
});

test('it adds .negative', function(assert) {
  let value = -(faker.random.number() + 1);
  this.xRender(value);
  assert.selectorExists([this, '.format-money.negative']);
});

test('it adds .zero', function(assert) {
  this.xRender(0);
  assert.selectorExists([this, '.format-money.zero']);
});
