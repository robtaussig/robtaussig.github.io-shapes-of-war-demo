const DEFAULTS = {
  color: "green",
  width: 720,
  height: 720,
  startingX: 0,
  startingY: 0,
};

class Country {
  constructor (options = {}) {
    let settings = Object.assign(DEFAULTS, options);
    this.size = settings.size / 2000;
    this.width = settings.width * 0.27 * this.size;
    this.height = settings.height * 0.21 * this.size;
    this.game = settings.game;
    this.id = settings.countryNo;
    this.climate = settings.climate;
    switch (true) {
      case this.climate > 90:
      this.color = "orange";
        break;
      case this.climate > 75:
      this.color = "green";
        break;
      case this.climate > 60:
      this.color = "lightblue";
        break;
      case this.climate > 50:
      this.color = "white";
        break;
    }

    this.placement = this._setPlacement(settings.countryNo);
    this.building = "";
  }

  upgradeBuilding () {
    switch (this.building) {
      case "":
        this.building = "cave";
        break;
      case "cave":
        this.building = "hut";
        break;
      case "hut":
        this.building = "castle";
        break;
      case "castle":
        this.building = "tower";
        break;
      default:

    }
  }

  _setPlacement (countryNo) {
    let placement = {};
    if (countryNo === 0) {
      placement.height = (window.innerHeight) * 0.22;
      placement.width = (window.innerWidth) * 0.03;
    } else if (countryNo === 1) {
      placement.height = (window.innerHeight) * 0.65;
      placement.width = (window.innerWidth) * 0.03;
    } else if (countryNo === 2) {
      placement.height = (window.innerHeight) * 0.22;
      placement.width = (window.innerWidth) * 0.4;
    } else if (countryNo === 3) {
      placement.height = (window.innerHeight) * 0.65;
      placement.width = (window.innerWidth) * 0.4;
    }
    return placement;
  }

  setColor(color) {
    this.color = color;
  }

  takeFire () {
    this.color = 'red';
  }

  randomToggle(rate, color = "yellow") {
    let time = new Date().getMilliseconds();
    if (time < rate*10) {
      return color === "yellow" ? "black" : "yellow";
    } else {
      return color === "yellow" ? "yellow" : "black";
    }
  }

  eyeColors () {
    let time = new Date().getSeconds();
    if (time < 5 || (time > 10 && time < 15) || (time > 20 && time < 25) || (time > 30 && time < 35) || (time > 40 && time < 45) || (time > 50 && time < 55)) {
      return "yellow";
    } else {
      return "black";
    }
  }

  draw (ctx) {
    let centerX = this.placement.width + this.width*0.5;
    let centerY = this.placement.height + this.height * 0.5;

    this.mod = this.mod || 5;
    this.modSlowDown = this.modSlowDown || 0;
    this.modDirection = this.modDirection || 1;

    this.modSlowDown += 1;
    if (this.modSlowDown % 10 === 0) {
      if (this.mod === 5) {
        this.modDirection = -1;
      } else if (this.mod === - 5) {
        this.modDirection = 1;
      }
      this.mod += this.modDirection;
    }

    // Spherical Land
    ctx.beginPath();
    ctx.arc(centerX, centerY, this.size * 100, 0,  3 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#003300';
    ctx.stroke();

    if (this.building === 'cave') {
      let xPos = centerX - this.width * 0.01;
      let yPos = centerY - this.height * 0.05;
      //cave ground
      ctx.beginPath();
      ctx.ellipse(xPos, yPos, 40, 20, Math.PI/180, 0, 3 * Math.PI);
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.fillStyle = 'tan';
      ctx.fill();
      //cave arch
      ctx.beginPath();
      ctx.arc(xPos, yPos, 30, 0, Math.PI, 1);
      ctx.bezierCurveTo(xPos - 15,yPos + 10,xPos + 15,yPos + 10,xPos + 30,yPos);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = "grey";
      ctx.fill();
      //cave mouth
      ctx.beginPath();
      ctx.moveTo(xPos - 10,yPos + 5);
      ctx.bezierCurveTo(xPos - 5,yPos - 20,xPos + 5,yPos - 20,xPos + 10,yPos + 5);
      ctx.bezierCurveTo(xPos,yPos + 6,xPos - 5,yPos + 6,xPos - 10,yPos + 5);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.fill();

      //eyes
      ctx.beginPath();
      ctx.moveTo(xPos - 6,yPos);
      ctx.bezierCurveTo(xPos - 4,yPos - 1,xPos - 3,yPos - 1,xPos - 2,yPos);
      ctx.bezierCurveTo(xPos - 3,yPos + 1,xPos - 4,yPos + 1,xPos - 6,yPos);
      ctx.closePath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = this.eyeColors();
      ctx.stroke();
      ctx.fillStyle = this.eyeColors();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(xPos,yPos);
      ctx.bezierCurveTo(xPos + 2,yPos - 1,xPos + 3,yPos - 1,xPos + 4,yPos);
      ctx.bezierCurveTo(xPos + 3,yPos + 1,xPos + 2,yPos + 1,xPos,yPos);
      ctx.closePath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = this.eyeColors();
      ctx.stroke();
      ctx.fillStyle = this.eyeColors();
      ctx.fill();
    }

    //Hut
    if (this.building === 'hut') {
      let xPos = centerX - this.width * 0.05;
      let yPos = centerY - this.height * 0.05;

      //Base
      ctx.beginPath();
      ctx.moveTo(xPos, yPos);  //x = 108 y == 105
      ctx.lineTo(xPos,yPos + 23);
      ctx.bezierCurveTo(xPos + 17, yPos + 28, xPos + 19, yPos + 28, xPos + 42, yPos + 23);
      ctx.lineTo(xPos + 42,yPos);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'tan';
      ctx.fill();

      //top
      ctx.beginPath();
      ctx.moveTo(xPos - 8, yPos - 5);
      ctx.bezierCurveTo(xPos + 2, yPos - 15, xPos + 12, yPos - 25, xPos + 22, yPos - 30);
      ctx.bezierCurveTo(xPos + 32, yPos - 20, xPos + 42, yPos - 10, xPos + 52, yPos - 5);
      ctx.bezierCurveTo(xPos + 27, yPos, xPos + 8, yPos, xPos - 8, yPos - 5);
      ctx.closePath();
      ctx.lineJoin = "miter";
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'tan';
      ctx.fill();

      //door
      ctx.beginPath();
      ctx.moveTo(xPos + 16,yPos + 25);
      ctx.bezierCurveTo(xPos + 16,yPos + 27,xPos + 24,yPos + 25,xPos + 22,yPos + 25);
      ctx.bezierCurveTo(xPos + 24,yPos + 5,xPos + 16,yPos + 5,xPos + 16,yPos + 25);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'black';
      ctx.fill();

      //fire log
      ctx.beginPath();
      ctx.moveTo(xPos + 27,yPos + 39);
      ctx.lineTo(xPos + 38,yPos + 32);
      ctx.lineTo(xPos + 36,yPos + 30);
      ctx.lineTo(xPos + 25,yPos + 37);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'brown';
      ctx.fill();

      //fire log
      ctx.beginPath();
      ctx.moveTo(xPos + 27,yPos + 30);
      ctx.lineTo(xPos + 38,yPos + 37);
      ctx.lineTo(xPos + 36,yPos + 39);
      ctx.lineTo(xPos + 25,yPos + 32);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'brown';
      ctx.fill();

      //fire

      let fireTop = this.mod / 2;
      let concavenessLeft = 1/this.mod;
      let concavenessRight = this.mod / 4;

      ctx.beginPath();
      ctx.moveTo(xPos + 27,yPos + 32);
      ctx.lineTo(xPos + 34,yPos + 32);
      ctx.bezierCurveTo(xPos + 32 + concavenessRight,yPos + 30,xPos + 31 + concavenessRight,yPos + 25,xPos + 30 + fireTop,yPos + 22);
      ctx.bezierCurveTo(xPos + 30 + concavenessLeft, yPos +25,xPos +28 + concavenessLeft, yPos +31,xPos + 28,yPos + 32);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'orange';
      ctx.fillStyle = 'yellow';
      ctx.stroke();
      ctx.fill();

    } else if (this.building === 'castle') {

      let xPos = centerX - this.width * 0.012;
      let yPos = centerY - this.height * 0.6;

      //moat
      ctx.beginPath();
      ctx.ellipse(xPos, yPos + 55, 30, 20, Math.PI/180, 0, 3 * Math.PI);
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.fillStyle = 'blue';
      ctx.fill();

      //flag pole
      ctx.beginPath();
      ctx.moveTo(xPos,yPos + 25);
      ctx.lineTo(xPos,yPos); //x = 130 y = 70
      ctx.lineWidth = 3;
      ctx.stroke();

      //flag
      ctx.beginPath();
      ctx.moveTo(xPos + 1, yPos + 1);
      ctx.lineTo(xPos - 17, yPos + this.mod);
      ctx.lineTo(xPos, yPos + 4);
      ctx.closePath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'red';
      ctx.fill();

      //grass
      ctx.beginPath();
      ctx.ellipse(xPos - 2, yPos + 57, 23, 13, Math.PI/180, 0, 3 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'green';
      ctx.fill();

      //base
      ctx.beginPath();
      ctx.moveTo(xPos - 18, yPos + 35);
      ctx.lineTo(xPos - 18,yPos + 60);
      ctx.bezierCurveTo(xPos - 5, yPos + 63, xPos + 7, yPos + 63, xPos + 16, yPos + 58);
      ctx.lineTo(xPos + 18,yPos + 35);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'grey';
      ctx.fill();

      //castle top
      ctx.beginPath();
      ctx.moveTo(xPos - 30, yPos + 35);
      ctx.lineTo(xPos - 32, yPos + 20);
      ctx.lineTo(xPos - 25,yPos + 20);
      ctx.lineTo(xPos - 25,yPos + 25);
      ctx.lineTo(xPos - 18,yPos + 25);
      ctx.lineTo(xPos - 18,yPos + 20);
      ctx.lineTo(xPos - 11,yPos + 20);
      ctx.lineTo(xPos - 11,yPos + 25);
      ctx.lineTo(xPos - 4,yPos + 25);
      ctx.lineTo(xPos - 4,yPos + 20);
      ctx.lineTo(xPos + 3,yPos + 20);
      ctx.lineTo(xPos + 3,yPos + 25);
      ctx.lineTo(xPos + 10,yPos + 25);
      ctx.lineTo(xPos + 10,yPos + 20);
      ctx.lineTo(xPos + 17,yPos + 20);
      ctx.lineTo(xPos + 17,yPos + 25);
      ctx.lineTo(xPos + 24,yPos + 25);
      ctx.lineTo(xPos + 24,yPos + 20);
      ctx.lineTo(xPos + 31,yPos + 20);
      ctx.lineTo(xPos + 29,yPos + 35);
      ctx.bezierCurveTo(xPos + 10,yPos + 38,xPos - 10,yPos + 37,xPos - 30,yPos + 35);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'grey';
      ctx.fill();

      //door
      ctx.beginPath();
      ctx.moveTo(xPos - 6,yPos + 60);
      ctx.bezierCurveTo(xPos - 6,yPos + 62,xPos + 2,yPos + 60,xPos + 4,yPos + 60);
      ctx.bezierCurveTo(xPos + 2,yPos + 40,xPos - 6,yPos + 40,xPos - 6,yPos + 60);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'black';
      ctx.fill();

      //bridge
      ctx.beginPath();
      ctx.moveTo(xPos - 6,yPos + 60);
      ctx.bezierCurveTo(xPos - 6,yPos + 58,xPos + 2,yPos + 58,xPos + 4,yPos + 60);
      ctx.lineTo(xPos - 1,yPos + 75);
      ctx.bezierCurveTo(xPos - 3,yPos + 77,xPos - 8,yPos + 77,xPos - 10,yPos + 75);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'brown';
      ctx.fill();
    } else if (this.building === 'tower') {

      let xPos = centerX - this.width * 0.095;
      let yPos = centerY - this.height * 0.65;
      this.towerMod = -1;

      //tower top
      ctx.beginPath();
      ctx.moveTo(xPos, yPos);
      ctx.lineTo(xPos + 30, yPos + 15);
      ctx.lineTo(xPos + 55, yPos);
      ctx.lineTo(xPos + 25,yPos - 10);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.lineJoin = "miter";
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'grey';
      ctx.fill();

      //tower left side
      ctx.beginPath();
      ctx.moveTo(xPos + 30, yPos + 15);
      ctx.lineTo(xPos + 30, yPos + 65);
      ctx.lineTo(xPos + 15, yPos + 50);
      ctx.lineTo(xPos - 1,yPos + 3);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'grey';
      ctx.fill();

      //tower right side
      ctx.beginPath();
      ctx.moveTo(xPos + 33, yPos + 65);
      ctx.lineTo(xPos + 45, yPos + 50);
      ctx.lineTo(xPos + 56,yPos + 3);
      ctx.lineTo(xPos + 30,yPos + 15);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'grey';
      ctx.fill();

      //tower road (right)
      ctx.beginPath();
      ctx.moveTo(xPos + 28, yPos + 76);
      ctx.lineTo(xPos + 53, yPos + 50);
      ctx.lineWidth = 15;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'grey';
      ctx.fill();

      //tower road (left)
      ctx.beginPath();
      ctx.moveTo(xPos + 36, yPos + 77);
      ctx.lineTo(xPos + 7, yPos + 50);
      ctx.lineWidth = 15;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      ctx.fillStyle = 'grey';
      ctx.fill();

      //tower road dividers
      ctx.beginPath();
      ctx.moveTo(xPos + 39, yPos + 71);
      ctx.lineTo(xPos + 45,yPos + 66);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 47, yPos + 63);
      ctx.lineTo(xPos + 53,yPos + 58);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 32, yPos + 77);
      ctx.lineTo(xPos + 38,yPos + 72);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      //tower cars
      ctx.beginPath();
      ctx.moveTo(xPos + 43, yPos + 58);
      ctx.lineTo(xPos + 49,yPos + 53);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'yellow';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 34, yPos + 66);
      ctx.lineTo(xPos + 40,yPos + 61);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'yellow';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 24, yPos + 64);
      ctx.lineTo(xPos + 17,yPos + 59);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'yellow';
      ctx.stroke();

      //tower road dividers left
      ctx.beginPath();
      ctx.moveTo(xPos + 13, yPos + 62);
      ctx.lineTo(xPos + 7,yPos + 57);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 23, yPos + 71);
      ctx.lineTo(xPos + 16,yPos + 66);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 32, yPos + 79);
      ctx.lineTo(xPos + 25,yPos + 74);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.stroke();

      //tower car
      ctx.beginPath();
      ctx.moveTo(xPos + 25, yPos + 75);
      ctx.lineTo(xPos + 31,yPos + 70);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'red';
      ctx.stroke();

      //tower lights
      ctx.beginPath();
      ctx.moveTo(xPos + 36, yPos + 53);
      ctx.lineTo(xPos + 36,yPos + 48);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(40, "yellow");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 24, yPos + 43);
      ctx.lineTo(xPos + 24,yPos + 38);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(50, "yellow");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 23, yPos + 26);
      ctx.lineTo(xPos + 23,yPos + 32);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(40, "yellow");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 22, yPos + 20);
      ctx.lineTo(xPos + 22,yPos + 14);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(70, "black");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 17, yPos + 43);
      ctx.lineTo(xPos + 17,yPos + 48);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(40, "black");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 15, yPos + 38);
      ctx.lineTo(xPos + 14,yPos + 32);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(30, "black");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 13, yPos + 28);
      ctx.lineTo(xPos + 12,yPos + 22);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(50, "yellow");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 11, yPos + 18);
      ctx.lineTo(xPos + 10,yPos + 12);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(40, "black");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 25, yPos + 49);
      ctx.lineTo(xPos + 25, yPos + 54);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(60, "black");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 37, yPos + 43);
      ctx.lineTo(xPos + 37,yPos + 38);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(10, "black");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 37, yPos + 26);
      ctx.lineTo(xPos + 37,yPos + 32);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(30, "black");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 37, yPos + 21);
      ctx.lineTo(xPos + 37,yPos + 15);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(40, "yellow");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 43, yPos + 44);
      ctx.lineTo(xPos + 43,yPos + 49);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(70, "black");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 44, yPos + 40);
      ctx.lineTo(xPos + 44,yPos + 35);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(30, "yellow");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 46, yPos + 25);
      ctx.lineTo(xPos + 45,yPos + 31);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(20, "black");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 47, yPos + 19);
      ctx.lineTo(xPos + 48,yPos + 12);
      ctx.lineWidth = 3;
      ctx.strokeStyle = this.randomToggle(60, "yellow");
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(xPos + 27, yPos + 2);
      ctx.lineTo(xPos + 26,yPos - 25);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
  }
}



module.exports = Country;
