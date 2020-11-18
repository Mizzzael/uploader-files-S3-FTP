'use strict'
const Ws = use('Ws');
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
    const topic = Ws.getChannel('chat').topic('chat');
    if(topic){
      topic.broadcast('message', "BUNDA")
    }

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

  async show({ auth, response }) {
    const me = await auth.getUser();;
    return Response.ok(response, me);
  }

  async update({ request, response, auth }) {
    const rules = {
      name: "required",
      email: 'required|email',
      password: 'required'
    };

    const messages = {
      'name.required': 'O nome do usuário é obrigatório.',
      'email.email': 'Este e-mail não é válido.',
      'email.required': 'O email é obrigatório.',
      'password.required': 'A senha é obrigatória.'
    };

    const checkRequest = await validate(request.all(), rules, messages);

    if (checkRequest.fails()) {
      return Response.conflict(response, {
        fails: checkRequest.messages().map(v => v.message)
      });
    }

    const user = await auth.getUser();
    const { name, email, password } = request.all();
    user.username = name;
    user.email = email;
    user.password = password;
    const query = await user.save();

    if(query) {
      return Response.ok(response, "Alteração feita com sucesso!");
    }

    return Response.expectation_failed(response, "Erro ao atualizar o Usuário.");

  }


  async delete({ request, response, auth }) {
    const rules = {
      id: "required"
    };

    const messages = {
      'id.required': 'O Id do usuário é necessário.'
    };

    const checkRequest = await validate(request.all(), rules, messages);

    if (checkRequest.fails()) {
      return Response.conflict(response, {
        fails: checkRequest.messages().map(v => v.message)
      });
    }

    const { id } = request.all();
    const user = await auth.getUser();

    if (!user.admin) return Response.unauthorized(response, "Acesso não autorizado a esse usuário.");
    const target = await User.find(id);
    const query = await target.delete();
    if (query) {
      return Response.gone(response, "Usuário deletado.");
    }

    return Response.expectation_failed(response, "Não foi possível apagar o suário.");
  }


}

module.exports = UserController
