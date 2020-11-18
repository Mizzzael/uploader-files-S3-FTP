'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('filename', 254).notNullable();
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.integer('folder_id').unsigned().references('id').inTable('folders');
      table.string('url', 255).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
