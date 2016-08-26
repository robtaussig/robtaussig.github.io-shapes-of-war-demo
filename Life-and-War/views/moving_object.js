const Util = require('./utils.js');

class MovingObject {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.color = options.color;
    this.position = options.position;
    this.vel = options.vel;
    this.game = options.game;
  }
}

module.exports = MovingObject;
