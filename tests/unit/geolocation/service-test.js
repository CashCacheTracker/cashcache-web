import { moduleFor, test } from 'ember-qunit';
import { stubSettings } from 'cashcache/services/geolocation';

moduleFor('service:geolocation', 'Unit | Service | geolocation');

test('it accepts stubbing a position', function(assert) {
  let service = this.subject();
  let expectedLatitude = faker.address.latitude();
  let expectedLongitude = faker.address.longitude();

  stubSettings.position = { coords: {
    latitude: expectedLatitude,
    longitude: expectedLongitude
  }};

  return service.getCurrentPosition().then(position => {
    let { latitude, longitude } = position.coords;
    assert.equal(latitude, expectedLatitude, 'latitude is correct');
    assert.equal(longitude, expectedLongitude, 'longitude is correct');
  });
});
