class GameView {
  constructor (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start () {
    let ctx = this.ctx;
    setInterval(() => {
      this.game.step();
      this.game.draw(ctx);
    }, 10);
  }
}




module.exports = GameView;
