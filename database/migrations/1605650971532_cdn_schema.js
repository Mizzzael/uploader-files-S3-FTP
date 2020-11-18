'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CdnSchema extends Schema {
  up () {
    this.create('cdns', (table) => {
      table.increments()
      table.string('cdnname', 80).notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('accessKeyId', 30).notNullable();
      table.string('secretAccessKey', 40).notNullable();
      table.string('bucket', 354).notNullable();
      table.string('url', 255).notNullable();
      table.string('path', 455).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('cdns')
  }
}

module.exports = CdnSchema
