import { moduleForComponent, test } from 'cashcache/tests/helpers/module-for-component';

moduleForComponent('transaction-card');

test('renders correctly', function(assert) {
  let value = faker.random.number(8) + 1; // single non-zero digit
  let transaction = this.newModel('transaction', { value });
  this.set('transaction', transaction);

  this.xRender('transaction=transaction');

  assert.selectorSubstring([this, '.format-money'], value, 'value matches');
  assert.selectorResultCount(
    [this, '.is-split'],
    +(transaction.get('is_split')),
    transaction.get('is_split') ? 'is split' : 'is not split'
  );
  let day = parseInt(transaction.get('date').split('-')[2], 10);
  assert.selectorSubstring([this, '.date-format'], day, 'correct day is shown');
  assert.selectorSubstring([this, '.description'], transaction.get('description'), 'description is shown');
  assert.selectorSubstring([this, '.location'], transaction.get('location'), 'location is shown');
});
