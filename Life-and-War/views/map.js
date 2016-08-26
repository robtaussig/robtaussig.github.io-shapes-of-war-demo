const DEFAULTS = {
  color: "blue",
  width: 720,
  height: 720
};

class GameMap  {
  constructor (options = {}) {
    let settings = Object.assign(DEFAULTS,options);
    this.width = settings.width;
    this.height = settings.height;
    this.color = settings.color;
    this.game = settings.game;
  }

  draw (ctx) {
    // Water
    ctx.beginPath();
    ctx.rect(0, this.height / 10, this.width * 0.70, this.height * 0.9);
    ctx.fillStyle = this.color;
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fill();

  }

}



module.exports = GameMap;
