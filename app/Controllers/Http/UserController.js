'use strict'

const { validate } = use('Validator');

//Model
const User = use('App/Models/User');

//Helpers
const Response = use('App/helpers/Response');


class UserController {
  async store ({ request, response }) {

    const rules = {
      name: "required",
      email: 'required|email|unique:users',
      password: 'required'
    };

    const messages = {
      'name.required': 'O nome do usuário é obrigatório.',
      'email.email': 'Este e-mail não é válido.',
      'email.required': 'O email é obrigatório.',
      'email.unique': 'E-mail já cadastrado.',
      'password.required': 'A senha é obrigatória.'
    };

    const checkRequest = await validate(request.all(), rules, messages);

    if (checkRequest.fails()) {
      return Response.conflict(response, {
        fails: checkRequest.messages().map(v => v.message)
      });
    }

    const user = new User();
    const { name, email, password } = request.all();
    user.username = name;
    user.email = email;
    user.password = password;
    const query = await user.save();

    return Response.created(response, "Usuário salvo com sucesso.");
  }

  async login({ request, response, auth }) {
    const rules = {
      email: 'required|email|unique:users',
      password: 'required'
    };

    const messages = {
      'email.email': 'Este e-mail não é válido.',
      'email.required': 'O email é obrigatório.',
      'email.unique': 'E-mail já cadastrado.',
      'password.required': 'A senha é obrigatória.'
    };

    const { email, password } = request.all();
    const login = await auth.attempt(email, password)

    return Response.ok(response, login);

  }

  async show({ auth }) {
    return await auth.getUser();
  }

  update() {
    
  }


  delete() {

  }


}

module.exports = UserController
