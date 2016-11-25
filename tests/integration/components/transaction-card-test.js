import { moduleForComponent, test } from 'cashcache/tests/helpers/module-for-component';

moduleForComponent('transaction-card');

test('renders correctly', function(assert) {
  let value = faker.random.number(8) + 1; // single non-zero digit
  let transaction = server.create('transaction', { value });
  this.set('transaction', transaction);

  this.xRender('transaction=transaction');

  assert.selectorSubstring([this, '.format-money'], value, 'value matches');
  assert.selectorResultCount(
    [this, '.is-split'],
    +(transaction.is_split),
    transaction.is_split ? 'is split' : 'is not split'
  );
  let day = parseInt(transaction.date.split('-')[2], 10);
  assert.selectorSubstring([this, '.date-format'], day, 'correct day is shown');
  assert.selectorSubstring([this, '.description'], transaction.description, 'description is shown');
  assert.selectorSubstring([this, '.location'], transaction.location, 'location is shown');
});
