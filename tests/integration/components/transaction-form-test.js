import { moduleForComponent, test } from 'cashcache/tests/helpers/module-for-component';

moduleForComponent('transaction-form');

test('renders correctly', function(assert) {
  let transaction = this.newModel('transaction');
  this.set('transaction', transaction);

  this.xRender('transaction=transaction');

  assert.formValue([this, '.date input'], transaction.get('date'), 'date matches');
  assert.formValue([this, '.description input'], transaction.get('description'), 'description matches');
  assert.formValue([this, '.note textarea'], transaction.get('note'), 'note matches');
});

test('it sends cancel action', function(assert) {
  let transaction = this.newModel('transaction');
  this.set('transaction', transaction);
  this.set('cancel', () => assert.ok(true));

  this.xRender('transaction=transaction cancel=cancel');

  this.$('.cancel-transaction-button').click();
});

test('it sends save action', function(assert) {
  let transaction = this.newModel('transaction');
  this.set('transaction', transaction);
  this.set('save', () => assert.ok(true));

  this.xRender('transaction=transaction save=save');

  this.$('.save-transaction-button').click();
});
