import test from 'ava'
import sinon from 'sinon'
import { from } from '../commonjs'

import {
  isObject,
  isIterable,
  hasBeenInvoked,
} from '../lib/helpers'

test('toArray', t => {
  t.equal(1 + 1, 2)
})
