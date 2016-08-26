
const Game = require('./handlers/game.js');
const GameView = require('./views/game_view.js');

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvas");
  canvasEl.height = window.innerHeight - 50;
  canvasEl.width = window.innerWidth - 50;

  let ctx = canvasEl.getContext('2d');

  const game = new Game();
  canvasEl.addEventListener('click', (event) => {game.handleClick(game, event);});
  const gameView = new GameView(game,ctx);
  gameView.start();
});
