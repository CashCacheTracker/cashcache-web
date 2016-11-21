import patchCustomAssertions from './helpers/custom-assertions';
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);
patchCustomAssertions();
