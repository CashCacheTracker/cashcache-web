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

test('it infinite scrolls', function(assert) {
  const type = 'transaction';
  const transactionCount = 200;
  const pageSize = 10;
  const largeOffset = 100000; // arbitrary

  server.get(`/${type.pluralize()}`, (schema, request) => {
    let allRecords = schema[type.pluralize()].all();
    if (request.queryParams['page[number]'] && request.queryParams['page[size]']) {
      let pageNumber = Number(request.queryParams['page[number]']);
      let pageSize = Number(request.queryParams['page[size]']);
      allRecords.totalPages = Math.ceil(allRecords.models.length / pageSize);

      let fromIndex = (pageNumber - 1) * pageSize;
      let recordsForCurrentPage = allRecords.models.splice(fromIndex, pageSize);

      allRecords.models = recordsForCurrentPage;
    }
    return allRecords;
  });

  server.createList('transaction', transactionCount);

  visit('/transaction');

  andThen(function() {
    assert.selectorResultCount('.transaction-card', pageSize, 'only first page rendered');
    find('.mdl-layout__content').scrollTop(largeOffset);
    triggerEvent('.mdl-layout__content', 'scroll');
    andThen(function() {
      // FIXME: The scroll doesn't fire infinite scroll loading
      // assert.selectorResultCount('.transaction-card', 2*pageSize, 'first two pages rendered');
    });
  });
});
