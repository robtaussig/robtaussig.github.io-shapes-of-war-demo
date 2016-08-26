let World = require('../game_logic/world');

class LogicBridge {
  constructor (game) {
    this.world = new World(10000);
    this.countries = {
      "top-left": {
        country: this.world.countries[0]
      },
      "bottom-left": {
        country: this.world.countries[1]
      },
      "top-right": {
        country: this.world.countries[2]
      },
      "bottom-right": {
        country: this.world.countries[3]
      },
    };
    this.game = game;
    this.player = game.player;
    this.setUpGame(this.countries);
  }

  advanceGeneration () {
    for (let i = 0; i < 5; i++) {
      this.world.cycleUp();
    }
    this.game.ageUp();
  }

  introduceChangeToCountry(country) {

  }

  setUpGame () {
    this.game.setUpGame(this.countries);
  }
}

module.exports = LogicBridge;
