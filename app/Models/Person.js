"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const moment = require("moment")

class Person extends Model {
  static get dates() {
    return super.dates.concat(["birth"]);
  }

  static castDates(field, value) {
    if (field == "birth") return value ? value.format("DD/MM/YYYY") : value;
    else return value ? value.format("DD/MM/YYYY hh:mm:ss ") : value;
    // else used for created_at / updated_at
  }

  static formatDates(field, value) {
    if (field === "birth") {
        return moment(value, "DD/MM/YYYY").format("YYYY-MM-DD");
    }
    return super.formatDates(field, value);
  }
}

module.exports = Person;
