import { test } from 'qunit';
import moduleForAcceptance from 'cashcache/tests/helpers/module-for-acceptance';
import { stubSettings } from 'cashcache/services/geolocation';

moduleForAcceptance('Acceptance | transaction/new');

test('it loads', function(assert) {
  visit('/transaction/new');

  andThen(function() {
    assert.equal(currentURL(), '/transaction/new', 'URL is correct');
    assert.selectorResultCount('.delete-transaction-button', 0, 'delete button does not exist');
    assert.selectorExists('.cancel-transaction-button', 'cancel transaction button exists');
    assert.selectorExists('.save-transaction-button', 'save transaction button exists');
  });
});

test('it creates transaction on save', function(assert) {
  assert.expect(4);
  assert.notOk(server.db.transactions.length, 'no transactions exist initially');
  let value = faker.random.number(100);

  visit('/transaction/new');
  fillIn('.transaction-form-value input', value);
  click('.save-transaction-button');

  andThen(function() {
    assert.equal(server.db.transactions.length, 1, 'transaction exists after save');
    assert.equal(server.db.transactions[0].value, value, 'value is correct');
    assert.equal(currentURL(), '/transaction', 'URL is correct');
  });
});

test('it does not create transaction on cancel', function(assert) {
  assert.expect(3);
  assert.notOk(server.db.transactions.length, 'no transactions exist initially');

  visit('/transaction/new');
  fillIn('.transaction-form-value input', faker.random.number(100));
  click('.cancel-transaction-button');

  andThen(function() {
    assert.notOk(server.db.transactions.length, 'no transactions exist after cancel');
    assert.equal(currentURL(), '/transaction', 'URL is correct');
  });
});

test('it saves geolocation by default', function(assert) {
  let latitude = faker.address.latitude();
  let longitude = faker.address.longitude();
  stubSettings.position = { coords: { latitude, longitude }};

  visit('/transaction/new');
  click('.save-transaction-button');

  andThen(function() {
    let coordinate = server.db.transactions[0].coordinate;
    assert.deepEqual(coordinate, { latitude, longitude });
  });
});

test('it does not save geolocation after toggling off', function(assert) {
  visit('/transaction/new');
  click('.transaction-form-location button');
  click('.save-transaction-button');

  andThen(function() {
    assert.notOk(server.db.transactions[0].coordinate, 'coordinate not set');
  });
});

test('it saves geolocation after toggling off and back on', function(assert) {
  let latitude = faker.address.latitude();
  let longitude = faker.address.longitude();
  stubSettings.position = { coords: { latitude, longitude }};

  visit('/transaction/new');
  click('.transaction-form-location button');
  click('.transaction-form-location button');
  click('.save-transaction-button');

  andThen(function() {
    let coordinate = server.db.transactions[0].coordinate;
    assert.deepEqual(coordinate, { latitude, longitude });
  });
});
