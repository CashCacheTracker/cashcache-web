import { moduleForComponent, test } from 'cashcache/tests/helpers/module-for-component';

moduleForComponent('transaction-form-location');

test('renders and updates textual location', function(assert) {
  let transaction = this.newModel('transaction');
  this.set('transaction', transaction);

  this.xRender('transaction=transaction');

  assert.formValue([this, '.location input'], transaction.get('location'), 'form location renders');

  let newLocation = faker.company.companyName();
  this.$('.location input').val(newLocation).trigger('input');

  assert.equal(transaction.get('location'), newLocation, 'model location matches');
  assert.formValue([this, '.location input'], newLocation, 'form location matches');
});

test('new transaction indicates geolocation present', function(assert) {
  let transaction =  this.newModel('transaction');
  this.set('transaction', transaction);

  this.xRender('transaction=transaction');

  assert.selectorExists([this, '.coordinate-set']);
});

test('new transaction indicates geolocation pending', function(assert) {
  let transaction =  this.newModel('transaction', { coordinate: null });
  this.set('transaction', transaction);

  this.xRender('transaction=transaction');

  assert.selectorExists([this, '.coordinate-pending']);
});

test('new transaction indicates geolocation disabled', function(assert) {
  let transaction =  this.newModel('transaction', { coordinate: null, coordinateEnabled: false });
  this.set('transaction', transaction);

  this.xRender('transaction=transaction');

  assert.selectorExists([this, '.coordinate-disabled']);
});

test('existing transaction indicates geolocation present', function(assert) {
  return this.savedModel('transaction').then(transaction => {
    this.set('transaction', transaction);

    this.xRender('transaction=transaction');

    assert.selectorExists([this, '.coordinate-set']);
  });
});

test('existing transaction indicates geolocation missing', function(assert) {
  return this.savedModel('transaction', { coordinate: null }).then(transaction => {
    this.set('transaction', transaction);

    this.xRender('transaction=transaction');

    assert.selectorExists([this, '.coordinate-disabled']);
  });
});

test('clicking on new+present sends toggle', function(assert) {
  let transaction =  this.newModel('transaction');
  this.set('transaction', transaction);
  this.set('toggle', () => assert.ok(true));

  this.xRender('transaction=transaction toggleCoordinateEnabled=toggle');

  this.$('.coordinate-set').click();
});

test('clicking on new+pending sends toggle', function(assert) {
  let transaction =  this.newModel('transaction', { coordinate: null });
  this.set('transaction', transaction);
  this.set('toggle', () => assert.ok(true));

  this.xRender('transaction=transaction toggleCoordinateEnabled=toggle');

  this.$('.coordinate-pending').click();
});

test('clicking on new+disabled sends toggle', function(assert) {
  let transaction =  this.newModel('transaction', { coordinate: null, coordinateEnabled: false });
  this.set('transaction', transaction);
  this.set('toggle', () => assert.ok(true));

  this.xRender('transaction=transaction toggleCoordinateEnabled=toggle');

  this.$('.coordinate-disabled').click();
});

test('clicking on existing+present does nothing', function(assert) {
  assert.expect(1);
  return this.savedModel('transaction').then(transaction => {
    this.set('transaction', transaction);
    this.set('toggle', () => assert.notOk(true));

    this.xRender('transaction=transaction toggleCoordinateEnabled=toggle');

    this.$('.coordinate-set').click();
    assert.ok(true);
  });
});

test('clicking on existing+missing does nothing', function(assert) {
  assert.expect(1);
  return this.savedModel('transaction', { coordinate: null }).then(transaction => {
    this.set('transaction', transaction);
    this.set('toggle', () => assert.notOk(true));

    this.xRender('transaction=transaction toggleCoordinateEnabled=toggle');

    this.$('.coordinate-disabled').click();
    assert.ok(true);
  });
});
