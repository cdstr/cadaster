import test from 'ava'

import Adapter from '..'

import * as T from '@cadaster/types'

// assets

const GEOJSON_DATA = require('@cadaster/mock-features-distinct-places')

// macros

const assertResult = (t, result) => {
  t.true(T.FeatureCollection.prototype.isPrototypeOf(result))
}

const assertResultSize = (t, result, size) => {
  const { features } = result

  t.is(features.length, size)
}

// tests

test('signature', async t => {
  t.is(typeof Adapter, 'function')

  const adapter = new Adapter({ data: GEOJSON_DATA })

  t.is(typeof adapter.search, 'function')

  const address = 'black forest'

  await adapter
    .search({ address })
    .then(result => {
      assertResult(t, result)
    })
})

test('config', async t => {
  const data = GEOJSON_DATA
  const address = 'black forest'

  await Adapter({ data })
    .search({ address })
    .then(result => {
      assertResultSize(t, result, 3)
    })

  await Adapter({ data, config: { threshold: 0.3 } })
    .search({ address })
    .then(result => {
      assertResultSize(t, result, 1)
    })
})