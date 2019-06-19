const got = require('got')

const M = require('../src/types')

const { FeatureCollection } = M

// settings

const HOST = 'https://api-adresse.data.gouv.fr'

// methods

/**
 * Forward geocoding search
 *
 * @param {Object} ctx
 * @param {string} ctx.host
 * @param {Object} query
 * @param {string} query.address
 *
 * @return {Promise<GeoJSON.FeatureCollection>}
 */

function search (ctx, query) {
  const url = `${ctx.host}/search?q=${query.address}`

  return got(url, { json: true })
    .then(res => res.body)
    .then(FeatureCollection.from)
}

/**
 * Adapter class constructor for Etalab Addok
 *
 * @constructor
 *
 * @param {Object} conf
 * @param {string} conf.host
 *
 * @return {Adapter}
 */

class _Adapter {
  constructor (opts) {
    this.host = opts.host || HOST
  }

  search (query) {
    return search(this, query)
  }
}

function Adapter (opts) {
  return new _Adapter(opts)
}

// Expose constructor

module.exports = Adapter
