"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PersonSchema extends Schema {
  up() {
    this.create("people", (table) => {
      table.increments();
      table.string("name", 100);
      table.string("cpf", 11);
      table.date("birth");
      table.timestamps();
    });
  }

  down() {
    this.drop("people");
  }
}

module.exports = PersonSchema;
