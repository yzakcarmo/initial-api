"use strict";
const Person = use("App/Models/Person");
const { validateAll } = use("Validator");

class PersonController {
  async index({}) {
    const people = await Person.all();

    return people;
  }
  async store({ request }) {
    const rules = {
  
      cpf: "required|cpfCnpj",
    };
    const messages = {
      "cpf.cpfCnpj": "CPF invalido",
    };
    const validate = await validateAll(request.all(), rules, messages);
    if (validate.fails()) {
      return response.status(401).send({ message: validate.messages() });
    }

    const data = request.only(["name", "cpf", "birth"]);
    const person = await Person.create(data);

    return person;
  }
  async show({ params }) {
    const person = await Person.findOrFail(params.id);

    return person;
  }
}

module.exports = PersonController;
