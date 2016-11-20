import { Factory, faker } from 'ember-cli-mirage';
import moment from 'moment';

export default Factory.extend({
  coordinate() {
    return {
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
    };
  },
  date() { return moment(faker.date.past()).format('YYYY-MM-DD'); },
  description() { return faker.commerce.productName(); },
  is_split() { return faker.random.boolean(); },
  location() { return faker.company.companyName(); },
  note() { return faker.lorem.words(); },
  value() { return faker.random.number() % 500; },
});
