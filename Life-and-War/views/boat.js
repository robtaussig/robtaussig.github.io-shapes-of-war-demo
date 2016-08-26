const MovingObject = require('./moving_object.js');

const DEFAULTS = {
  color: "brown",
  width: 720,
  height: 720
};

class Boat extends MovingObject  {
  constructor (options = {}) {
    let settings = Object.assign(DEFAULTS,options);
    super(settings);
    this.setPosition(settings.position, settings.width, settings.height, settings.destination);
    this.firing = false;
    this.purpose = settings.purpose;
    this.country = settings.countries[settings.destination];
    this.stopGap = this.country.view.size * 100;
  }

  setPosition (pos, width, height, destination) {
    if (pos === "top-left") {
      this.yPos = height * 0.32;
      this.xPos = width * 0.14;
    } else if (pos === "bottom-left") {
      this.yPos = height * 0.78;
      this.xPos = width * 0.14;
    } else if (pos === "top-right") {
      this.yPos = height * 0.32;
      this.xPos = width * 0.52;
    } else if (pos === "bottom-right") {
      this.yPos = height * 0.78;
      this.xPos = width * 0.52;
    }
    this.setDirection(pos, width, height, destination);
  }

  setDirection (pos, width, height, destination) {
    this.dir = (destination === "top-right" || destination === "bottom-right") ? -1 : 1;
    if (destination === "top-left") {
      this.yDir = height * 0.32;
      this.xDir = width * 0.12;
      if (pos === "offMap") {
        this.xPos = 0.01;
        this.yPos = 0.01;
      }
    } else if (destination === "bottom-left") {
      this.yDir = height * 0.78;
      this.xDir = width * 0.14;
      if (pos === "offMap") {
        this.yPos = height;
        this.xPos = 0.01;
      }
    } else if (destination === "top-right") {
      this.yDir = height * 0.32;
      this.xDir = width * 0.55;
      if (pos === "offMap") {
        this.yPos = height * 0;
        this.xPos = width * 0.7;
      }
    } else if (destination === "bottom-right") {
      this.yDir = height * 0.8;
      this.xDir = width * 0.53;
      if (pos === "offMap") {
        this.yPos = height;
        this.xPos = width * 0.7;
      }
    }
  }

  move () {
    let xLength = (this.xDir - this.xPos);
    let yLength = (this.yDir - this.yPos);
    let distance = Math.sqrt(Math.pow(xLength,2) + Math.pow(yLength,2));
    if (distance < this.stopGap && this.purpose === "war") {
      this.fireCannons();
      return;
    } else if (distance < 10 && this.purpose === "establish") {
      this.game.remove(this);
      this.game.establish(this.country);
    }
    let slope = xLength === 0 ? 1 : Math.abs(yLength) / Math.abs(xLength);

    this.xPos += this.xDir === this.xPos ? 0 : xLength/Math.abs(xLength);

    this.yPos += this.yDir === this.yPos ? 0 : slope * yLength/Math.abs(yLength);
  }

  fireCannons () {
    this.time = new Date();
    this.firing = true;
    this.country.view.takeFire();
  }

  draw (ctx) {

    //Mast
    ctx.beginPath();
    ctx.moveTo(this.xPos, this.yPos);
    ctx.lineTo(this.xPos, this.yPos - 25);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    //Frame
    ctx.beginPath();
    ctx.moveTo(this.xPos - 50, this.yPos - 30);
    ctx.bezierCurveTo(this.xPos, this.yPos, this.xPos, this.yPos, this.xPos + 50, this.yPos - 30);
    ctx.lineTo(this.xPos + 30, this.yPos);
    ctx.lineTo(this.xPos - 30, this.yPos);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.lineJoin = "miter";
    ctx.fillStyle = 'brown';
    ctx.fill();

    //Sail
    ctx.beginPath();
    ctx.moveTo(this.xPos + (20 * this.dir), this.yPos - 30);
    ctx.bezierCurveTo(this.xPos + (30 * this.dir), this.yPos - 35, this.xPos + (30 * this.dir), this.yPos - 45, this.xPos + (20 * this.dir), this.yPos - 50);
    ctx.lineTo(this.xPos - (20 * this.dir), this.yPos - 50);
    ctx.bezierCurveTo(this.xPos - (10 * this.dir), this.yPos - 45, this.xPos - (10 * this.dir), this.yPos - 25, this.xPos - (20 * this.dir), this.yPos - 20);
    ctx.closePath();
    ctx.lineJoin = "miter";
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fill();

    //Cannons
    ctx.beginPath();
    ctx.moveTo(this.xPos - 25, this.yPos - 1);
    ctx.lineTo(this.xPos - 25, this.yPos - 5);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    //Middle cannon
    ctx.beginPath();
    ctx.moveTo(this.xPos, this.yPos - 1);
    ctx.lineTo(this.xPos, this.yPos - 5);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.xPos + 25, this.yPos - 1);
    ctx.lineTo(this.xPos + 25, this.yPos - 5);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    //Cannon fire

    if (this.firing && this.purpose === "war") {
      if (this.time.getMilliseconds() < 200) {
        ctx.beginPath();
        ctx.moveTo(this.xPos - 30, this.yPos + 5);
        ctx.lineTo(this.xPos - 25, this.yPos - 1);
        ctx.lineTo(this.xPos - 20, this.yPos + 5);
        ctx.closePath();
        ctx.lineJoin = 'miter';
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'orange';
        ctx.stroke();
        ctx.fillStyle = 'orange';
        ctx.fill();
      }


      //Middle Cannon fire
      if (this.time.getMilliseconds() > 400 && this.time.getMilliseconds() < 600) {
        ctx.beginPath();
        ctx.moveTo(this.xPos - 5, this.yPos + 5);
        ctx.lineTo(this.xPos, this.yPos - 1);
        ctx.lineTo(this.xPos + 5, this.yPos + 5);
        ctx.closePath();
        ctx.lineJoin = 'miter';
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'orange';
        ctx.stroke();
        ctx.fillStyle = 'orange';
        ctx.fill();
      }

      if (this.time.getMilliseconds() > 800) {
        ctx.beginPath();
        ctx.moveTo(this.xPos + 20, this.yPos + 5);
        ctx.lineTo(this.xPos + 25, this.yPos - 1);
        ctx.lineTo(this.xPos + 30, this.yPos + 5);
        ctx.closePath();
        ctx.lineJoin = 'miter';
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'orange';
        ctx.stroke();
        ctx.fillStyle = 'orange';
        ctx.fill();
      }
    }
  }
}



module.exports = Boat;
