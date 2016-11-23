import moment from 'moment';
import { moduleForComponent, test } from 'cashcache/tests/helpers/module-for-component';

moduleForComponent('date-format');

test('it renders a short version for the current year', function(assert) {
  const MMDD = '-11-05';
  const thisYear = moment().year();

  this.xRender(`'${thisYear}${MMDD}'`);

  let text = this.$().text().trim();
  assert.equal(text, 'Nov 5', `Short version displayed for ${thisYear}`);
});

test('it renders a long version for a past year', function(assert) {
  const MMDD = '-11-05';
  const year = moment().year() - 1 - faker.random.number(100);

  this.xRender(`'${year}${MMDD}'`);

  let text = this.$().text().trim();
  assert.equal(text, `Nov 5 ${year}`, `Long version displayed for ${year}`);
});

test('it renders a long version for a future year', function(assert) {
  const MMDD = '-11-05';
  const year = moment().year() + 1 + faker.random.number(100);

  this.xRender(`'${year}${MMDD}'`);

  let text = this.$().text().trim();
  assert.equal(text, `Nov 5 ${year}`, `Long version displayed for ${year}`);
});
