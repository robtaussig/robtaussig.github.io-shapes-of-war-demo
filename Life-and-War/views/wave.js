const MovingObject = require('./moving_object.js');

const DEFAULTS = {
  vel: [-1,0],
  width: 720,
  height: 720,
  color: "#fff"
};

class Wave extends MovingObject  {
  constructor (options = {}) {
    let settings = Object.assign(DEFAULTS,options);
    super(settings);
    this.setPosition(settings.position, settings.width, settings.height);
  }

  setPosition (pos, width, height) {
    this.mod = this.mod || 5;
    this.modSlowDown = this.modSlowDown || 0;
    this.modDirection = this.modDirection || 1;
    this.pos = [width * pos/20 * 0.7, Math.random()*0.9*height + 0.1*height];
  }

  move () {
    this.modSlowDown += 1;
    if (this.modSlowDown % 5 === 0) {
      if (this.mod === 5) {
        this.modDirection = -1;
      } else if (this.mod === - 5) {
        this.modDirection = 1;
      }
      this.mod += this.modDirection;
    }
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    if (this.game.isOutOfBounds(this.pos)) {
      this.pos = this.game.wrap(this.pos);
    }
  }

  draw (ctx) {
    let x = this.pos[0];
    let y = this.pos[1];
    // Wave
    ctx.beginPath();
    ctx.moveTo(x, y - this.mod);
    ctx.lineTo(x + 10, y + this.mod);
    ctx.lineTo(x + 20, y - this.mod);
    ctx.lineTo(x + 30, y + this.mod);
    ctx.lineTo(x + 40, y - this.mod);
    ctx.lineTo(x + 50, y + this.mod);
    ctx.lineTo(x + 60, y - this.mod);
    ctx.lineWidth="3";
    ctx.strokeStyle="#fff";
    ctx.stroke();

  }

}



module.exports = Wave;
