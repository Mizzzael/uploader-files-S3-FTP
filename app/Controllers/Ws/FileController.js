'use strict'

class FileController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(data) {
    console.log(this.socket.id);
  }
}

module.exports = FileController
