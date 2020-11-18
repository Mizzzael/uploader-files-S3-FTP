'use strict'

const { validate } = use('Validator');

const Cdn = use('App/Models/Cdn');

// Helpers
const Response = use('App/helpers/Response');

class CdnController {

  async store({ request, response, auth }) {
    
    const rules = {
      cdnname: 'required',
      accessKeyId: 'required',
      secretAccessKey: 'required',
      bucket: 'required',
      url: 'required',
      path: 'required',
    };

    const messages = {
      'cdnname.required': 'O Cdnname é obrigatório.',
      'accessKeyId.required': 'O AccessKeyId é obrigatório.',
      'secretAccessKey.required': 'O SecretAccessKey é obrigatório.',
      'bucket.required': 'O Bucket é obrigatório.',
      'url.required': 'O Url é obrigatório.',
      'path.required': 'O Path é obrigatório.',
    };

    const checkRequest = await validate(request.all(), rules, messages);

    if (checkRequest.fails()) {
      return Response.conflict(response, {
        fails: checkRequest.messages().map(v => v.message)
      });
    }

    const user = await auth.getUser();
    const cdn = new Cdn();
    const {
      cdnname,
      accessKeyId,
      secretAccessKey,
      bucket,
      url,
      path
    } = request.all();
    
    cdn.cdnname = cdnname;
    cdn.accessKeyId = accessKeyId;
    cdn.secretAccessKey = secretAccessKey;
    cdn.bucket = bucket;
    cdn.url = url;
    cdn.path = path;
    cdn.user_id = user.id;
    const query = await cdn.save();
    if (query) {
      return Response.created(response, "Cdn salvo com sucesso.");
    } 

    return Response.expectation_failed(response, "Erro ao cadastrar CDN.");
    
  }

}

module.exports = CdnController
