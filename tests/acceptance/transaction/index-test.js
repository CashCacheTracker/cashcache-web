import { test } from 'qunit';
import moduleForAcceptance from 'cashcache/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | transaction/index');

test('it loads', function(assert) {
  visit('/transaction');

  andThen(function() {
    assert.equal(currentURL(), '/transaction', 'URL is correct');
    assert.selectorExists('.new-transaction-button', 'new transaction button exists');
  });
});

test('it renders transactions', function(assert) {
  let transactionCount = faker.random.number(10);
  server.createList('transaction', transactionCount);

  visit('/transaction');

  andThen(function() {
    assert.selectorResultCount('.transaction-card', transactionCount, 'correct number of transactions rendered');
  });
});

test('clicking transaction transitions to edit', function(assert) {
  let transaction = server.create('transaction');

  visit('/transaction');
  click('.transaction-card');

  andThen(function() {
    assert.equal(currentURL(), `/transaction/${transaction.id}`, 'transitioned to edit transaction');
  });
});

test('clicking new button transitions to new', function(assert) {
  visit('/transaction');
  click('.new-transaction-button');

  andThen(function() {
    assert.equal(currentURL(), '/transaction/new', 'transitioned to new transaction');
  });
});
