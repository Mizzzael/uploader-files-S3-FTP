class Response {

  static formatDefault(_response, _message, _status, _statusLabel) {
    return _response.status(_status).send({
      status: _status,
      message: _message,
      method: _statusLabel
    });
  }

  static created(_response, _message) {
    return this.formatDefault(_response, _message, 201, 'Created');
  }

  static conflict(_response, _message) {
    return this.formatDefault(_response, _message, 409, 'Conflict');
  }

  static ok(_response, _message) {
    return this.formatDefault(_response, _message, 200, 'OK');
  }

  static expectation_failed(_response, _message) {
    return this.formatDefault(_response, _message, 417, 'Expectation Failed');
  }

  static gone(_response, _message) {
    return this.formatDefault(_response, _message, 410, 'Gone');
  }

  static unauthorized(_response, _message) {
    return this.formatDefault(_response, _message, 401, 'Unauthorized');
  }

}

module.exports = Response;