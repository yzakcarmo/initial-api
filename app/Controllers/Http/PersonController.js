"use strict";
const Person = use("App/Models/Person");
const { validateAll } = use("Validator");

class PersonController {
  async index({}) {
    const people = await Person.all();

    return people;
  }
  async store({ request, response }) {
    const data = request.only(["name", "cpf", "birth"]);

    const rules = {
      cpf: "required|cpfCnpj",
    };
    const messages = {
      "cpf.required":"CPF é obrigatorio",
      "cpf.cpfCnpj": "CPF invalido"
    };
    const validate = await validateAll(data, rules, messages);
    if (validate.fails()) {
      return response.status(401).send({ message: validate.messages() });
    }

    const person = await Person.create(data);

    return person;
  }
  async show({ params }) {
    const person = await Person.findOrFail(params.id);

    return person;
  }
  async destroy({ params }) {
    const person = await Person.findOrFail(params.id);

    person.delete();
  }
}

module.exports = PersonController;
