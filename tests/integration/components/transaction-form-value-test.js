import { moduleForComponent, test } from 'cashcache/tests/helpers/module-for-component';

moduleForComponent('transaction-form-value');

test('renders correctly', function(assert) {
  let value = faker.random.number(8) + 1; // single non-zero digit
  let transaction = this.newModel('transaction', { value });
  this.set('transaction', transaction);

  this.xRender('transaction=transaction');

  assert.formValue([this, '.value input'], value, 'value matches');
  if (transaction.get('is_split')) {
    assert.formChecked([this, '.is-split input'], 'is split');
  } else {
    assert.formNotChecked([this, '.is-split input'], 'is not split');
  }
});

test('updates attributes on change', function(assert) {
  let transaction = this.newModel('transaction');
  this.set('transaction', transaction);

  this.xRender('transaction=transaction');

  let newValue = faker.random.number(8) + 1; // single non-zero digit
  let newSplit = !transaction.get('is_split');
  this.$('.value input').val(newValue).trigger('input');
  this.$('.is-split input').click();

  assert.equal(transaction.get('value'), newValue, 'model value matches');
  assert.formValue([this, '.value input'], newValue, 'form value matches');

  assert.equal(transaction.get('is_split'), newSplit, 'is_split matches in model');
  if (newSplit) {
    assert.formChecked([this, '.is-split input'], 'is_split in form');
  } else {
    assert.formNotChecked([this, '.is-split input'], 'not is_split in form');
  }
});
