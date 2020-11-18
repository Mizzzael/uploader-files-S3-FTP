'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FolderSchema extends Schema {
  up () {
    this.create('folders', (table) => {
      table.increments()
      table.string('foldername').notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('cdn_id').unsigned().references('id').inTable('cdns');
      table.integer('folder').nullable();
      table.boolean('root').defaultTo(true);
      table.timestamps()
    })
  }

  down () {
    this.drop('folders')
  }
}

module.exports = FolderSchema
