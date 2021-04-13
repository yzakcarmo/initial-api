"use strict";
const Person = use("App/Models/Person");
const { validate } = use('Validator');

class PersonController {
  async index({ request, response, view }) {
    const people = await Person.all();

    return people;
  }
  async store({ request, session, response }) {
    const test = request.only(["birth"]);
    test.format('YYYY-MM-DD');
    const data = request.only(["name", "cpf", "birth"]);
    const person = await Person.create(data);

    return test;
  }
  async search({ params, session, response }){
    const person = await Person.findOrFail(params.id);
    console.log()

    return person;
  }
}

module.exports = PersonController;
