import { test } from 'qunit';
import moduleForAcceptance from 'cashcache/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | transaction/edit');

test('it loads', function(assert) {
  let transaction = server.create('transaction');

  visit(`/transaction/${transaction.id}`);

  andThen(function() {
    assert.equal(currentURL(), `/transaction/${transaction.id}`, 'URL is correct');
    assert.selectorExists('.delete-transaction-button', 'delete button exists');
    assert.selectorExists('.cancel-transaction-button', 'cancel transaction button exists');
    assert.selectorExists('.save-transaction-button', 'save transaction button exists');
  });
});

test('it updates transaction on save', function(assert) {
  let transaction = server.create('transaction');
  let beginValue = transaction.value;
  let endValue = beginValue + faker.random.number(100);

  visit(`/transaction/${transaction.id}`);
  fillIn('.transaction-form-value input', endValue);
  click('.save-transaction-button');

  andThen(function() {
    transaction.reload();
    assert.equal(transaction.value, endValue, 'value was updated');
    assert.equal(currentURL(), '/transaction', 'URL is correct');
  });
});

test('it does not update transaction on cancel', function(assert) {
  let transaction = server.create('transaction');
  let beginValue = transaction.value;

  visit(`/transaction/${transaction.id}`);
  fillIn('.transaction-form-value input', beginValue + 10);
  click('.cancel-transaction-button');

  andThen(function() {
    transaction.reload();
    assert.equal(transaction.value, beginValue, 'value was not updated');
    assert.equal(currentURL(), '/transaction', 'URL is correct');
  });
});

test('it deletes transaction with two clicks', function(assert) {
  let transaction = server.create('transaction');

  visit(`/transaction/${transaction.id}`);
  click('.delete-transaction-button button');

  andThen(function() {
    assert.equal(server.db.transactions.length, 1, 'record exists after one click');
    assert.equal(currentURL(), `/transaction/${transaction.id}`, 'still on edit route after one click');
    click('.delete-transaction-button button');
    andThen(function() {
      assert.equal(server.db.transactions.length, 0, 'record deleted after two clicks');
      assert.equal(currentURL(), '/transaction', 'on index route after two clicks');
    });
  });
});
