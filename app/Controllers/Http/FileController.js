'use strict'

class FileController {

  index({ view }) {
    return view.render('socket-test');
  }

}

module.exports = FileController
