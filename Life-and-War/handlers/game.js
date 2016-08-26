const GameMap = require('../views/map.js');
const Interface = require('../views/interface.js');
const Country = require('../views/country.js');
const Wave = require('../views/wave.js');
const Util = require('../views/utils.js');
const Boat = require('../views/boat.js');
const InfoScreen = require('../views/information_screen.js');
const LogicBridge = require('./logic_bridge.js');
const Player = require('./player.js');

const DIM_X = window.innerWidth - 50;
const DIM_Y = window.innerHeight - 50;

Number.prototype.between = function(a, b) {
  let min = Math.min(a, b),
    max = Math.max(a, b);
  return this > min && this < max;
};

class Game {
  constructor() {
    this.humanPlayer = new Player("human","humanPlayer");
    this.countries = {
      "top-left": {
        view: "",
        object: "",
        player: null
      },
      "bottom-left": {
        view: "",
        object: "",
        player: null
      },
      "top-right": {
        view: "",
        object: "",
        player: null
      },
      "bottom-right": {
        view: "",
        object: "",
        player: null
      }
    };
    this.allMoveableObjects = [];
    this.currentAge = 0;
    this.logicBridge = new LogicBridge(this);
  }

  setUpGame (countries) {
    let game = this;
    Object.keys(countries).forEach((country,i) => {
      this.countries[country].object = countries[country].country;
      this.countries[country].view = new Country({ climate: countries[country].country.climate, countryNo: i, width: DIM_X, height: DIM_Y, game: game, size: countries[country].country.size });
    });
    this.interface = new Interface({ width: DIM_X, height: DIM_Y, game: game });
    this.interface.setMessage("Shapes of War");
    this.map = new GameMap({ width: DIM_X, height: DIM_Y, game: game });

    for (let i = 0; i < 20; i++) {
      this.allMoveableObjects.push(new Wave({position: i, width: DIM_X, height: DIM_Y, game: game}));
    }
    this.infoScreen = new InfoScreen({ width: DIM_X, height: DIM_Y, game: game });
  }

  draw (ctx) {
    ctx.clearRect(0,0, DIM_X, DIM_Y);
    this.map.draw(ctx);
    this.allMoveableObjects.forEach(object => object.draw(ctx));
    Object.keys(this.countries).forEach(countryName => this.countries[countryName].view.draw(ctx));
    this.infoScreen.draw(ctx);
    this.interface.draw(ctx);
  }

  isOutOfBounds (pos) {
    return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > (Game.DIM_X * 0.7)) || (pos[1] > (Game.DIM_Y - 50));
  }

  handleClick (ctx, event) {
    console.log({x: event.offsetX, y: event.offsetY, ratioX: event.offsetX/DIM_X, ratioY: event.offsetY/DIM_Y});
    let ratioX = event.offsetX/DIM_X;
    let ratioY = event.offsetY/DIM_Y;
    let msg;
    switch (true) {
      case ratioY < 0.1:
        if (ratioX.between(0.446,0.556)) {
          this.hideInfoScreen();
          msg = "ignore";
        } else {
          this.handleHeaderInteraction(event);
          msg = "ignore";
        }
        break;
      case ratioY.between(0.891,0.991) && ratioX.between(0.810,0.891):
        this.applyModifier(event);
        break;
      case ratioX <0.7 && ratioY > 0.1:
        msg = "mainScreenInteraction";
        break;
      case ratioY > 0.88:
        msg =  "";
        break;
      case ratioY > 0.82:
        msg = ratioX > 0.85 ? 'shady-4' : (ratioX > 0.7 ? 'technology-4' : "");
        break;
      case ratioY > 0.75:
        msg = ratioX > 0.85 ? 'shady-3' : (ratioX > 0.7 ? 'technology-3' : "");
        break;
      case ratioY > 0.68:
        msg = ratioX > 0.85 ? 'shady-2' : (ratioX > 0.7 ? 'technology-2' : "");
        break;
      case ratioY > 0.60:
        msg = ratioX > 0.85 ? 'shady-1' : (ratioX > 0.7 ? 'technology-1' : "");
        break;
      case ratioY > 0.57:
        msg = "";
        break;
      case ratioY > 0.48:
        msg = "council";
        break;
      case ratioY > 0.44:
        msg = "";
        break;
      case ratioY > 0.36:
        msg = ratioX > 0.85 ? 'military-4' : (ratioX > 0.7 ? 'domestic-4' : "");
        break;
      case ratioY > 0.29:
        msg = ratioX > 0.85 ? 'military-3' : (ratioX > 0.7 ? 'domestic-3' : "");
        break;
      case ratioY > 0.22:
        msg = ratioX > 0.85 ? 'military-2' : (ratioX > 0.7 ? 'domestic-2' : "");
        break;
      case ratioY > 0.15:
        msg = ratioX > 0.85 ? 'military-1' : (ratioX > 0.7 ? 'domestic-1' : "");
        break;
      default:
      msg = "ignore";
    }
    ctx.logicSwitch(msg,event);
  }

  logicSwitch (command,event) {
    if (typeof command === 'string') {
      this.handleInterface(command, event);
    }
  }

  handleInterface(command, event) {
    let ratioX = event.offsetX/DIM_X;
    let ratioY = event.offsetY/DIM_Y;
    if (this.interface.instructions && command !== "ignore") {
      switch (true) {
        case ratioX.between(0.8,0.901) && ratioY.between(0.8,0.902):
          this.setStage("startGame");
          break;
        default:

      }
    } else if (command === "mainScreenInteraction") {
      this.handleInfoScreenInteraction(command,event);
    } else {
      switch (command) {
        case "council":
          this.setStage("bringUpCouncil");
          break;
        default:
          this.setSelectedInterface(command);
      }
    }
  }

  handleInfoScreenInteraction (command, event) {
    let ratioX = event.offsetX/DIM_X;
    let ratioY = event.offsetY/DIM_Y;
    if (command === "hideInfoScreen") {
      this.interface.hideIfAllowed();
    } else if (this.interface.stage === "pickCountry") {
      this.handleCountryPicking(event);
    }else if (this.infoScreen.text.beginning){
        if (this.infoScreen.text.colors) {
          this.handleColorPicking(event);
        } else if (this.infoScreen.text.showAges) {
          this.handleAgePicking(event);
        } else if (this.infoScreen.text.decision) {
          this.handleDecision(event);
        }
    } else if (this.infoScreen.text.decision) {
        this.handleDecision(event);
    } else if (this.infoScreen.text.betweenAges) {
      this.handleBetweenAgesDecision(event);
    }
  }

  handleDecision(event) {
    let ratioX = event.offsetX/DIM_X;
    let ratioY = event.offsetY/DIM_Y;
    switch (true) {
      case ratioY.between(0.301,0.519) && ratioX.between(0.58,0.68):
        if (ratioY.between(0.301,0.364)) {
          this.infoScreen.selectChoice("positive-beginning");
        } else if (ratioY.between(0.454,0.519)) {
          this.infoScreen.selectChoice("negative-beginning");
        }
        break;
      default:
    }
  }

  handleBetweenAgesDecision (event) {
    let ratioX = event.offsetX/DIM_X;
    let ratioY = event.offsetY/DIM_Y;
    if (this.currentAge === 0) {
      switch (true) {
        case ratioY.between(0.297,0.388) && ratioX.between(0.26,0.345):
          this.infoScreen.setSelectedTextDescription('selectPerk',0);
          break;
        case ratioY.between(0.297,0.388) && ratioX.between(0.46,0.537):
          this.infoScreen.setSelectedTextDescription('selectPerk',1);
          break;
        case ratioY.between(0.45,0.53) && ratioX.between(0.26,0.345):
          this.infoScreen.setSelectedTextDescription('selectPerk',2);
          break;
        case ratioY.between(0.45,0.53) && ratioX.between(0.462,0.545):
          this.infoScreen.setSelectedTextDescription('selectPerk',3);
          break;
        case ratioY.between(0.788,0.851) && ratioX.between(0.313,0.516):
          this.selectPerk(this.infoScreen.text.currentBetweenAgeMessageSelected);
          break;
        default:
      }
    }

  }

  handleCountryPicking (event) {
    let ratioX = event.offsetX/DIM_X;
    let ratioY = event.offsetY/DIM_Y;
    switch (true) {
      case ratioY.between(0.128,0.5) && ratioX.between(0,0.32):
        this.selectCountry("top-left");
        break;
      case ratioY.between(1,0.5) && ratioX.between(0,0.32):
        this.selectCountry("bottom-left");
        break;
      case ratioY.between(0.128,0.5) && ratioX.between(0.7,0.32):
        this.selectCountry("top-right");
        break;
      case ratioY.between(1,0.5) && ratioX.between(0.7,0.32):
        this.selectCountry("bottom-right");
        break;
      default:
    }
  }

  handleColorPicking (event) {
    let ratioX = event.offsetX/DIM_X;
    let ratioY = event.offsetY/DIM_Y;
    switch (true) {
      case ratioY.between(0.271,0.397) && ratioX.between(0.267,0.572):
        if (ratioX.between(0.267,0.332)) {
          this.infoScreen.selectKingColor("red");
        } else if (ratioX.between(0.347,0.412)) {
          this.infoScreen.selectKingColor("lightblue");
        } else if (ratioX.between(0.427,0.492)) {
          this.infoScreen.selectKingColor("green");
        } else if (ratioX.between(0.508,0.572)) {
          this.infoScreen.selectKingColor("purple");
        }
        break;
      case ratioY.between(0.454,0.516) && ratioX.between(0.370,0.472):
        this.pickColor(this.infoScreen.kingColor);
        break;
      default:
    }
  }

  // For testing purposes only
  handleHeaderInteraction (event) {
    let ratioX = event.offsetX/DIM_X;
    let ratioY = event.offsetY/DIM_Y;
    switch (true) {
      case ratioX.between(0.08, 0.118):
        //start game
        this.setStage("startGame");
        break;
      case ratioX.between(0.137, 0.164):
        //pick game
        this.setStage("instructions");
        break;
      case ratioX.between(0.18, 0.222):
        //make decision
        this.setStage("offerDecision");
        break;
      case ratioX.between(0.24, 0.282):
        //between ages
        this.setStage("betweenAges");
        break;
      case ratioX.between(0.31, 0.351):
        //resume game
        this.setStage("resumeGame");
        break;
      default:

    }
  }

  handleAgePicking (event) {
    let ratioX = event.offsetX/DIM_X;
    let ratioY = event.offsetY/DIM_Y;
    switch (true) {
      case ratioY.between(0.271,0.397) && ratioX.between(0.267,0.572):
        if (ratioX.between(0.267,0.332)) {
          this.infoScreen.selectAge("10");
        } else if (ratioX.between(0.347,0.412)) {
          this.infoScreen.selectAge("20");
        } else if (ratioX.between(0.427,0.492)) {
          this.infoScreen.selectAge("30");
        } else if (ratioX.between(0.508,0.572)) {
          this.infoScreen.selectAge("50");
        }
        break;
      case ratioY.between(0.454,0.516) && ratioX.between(0.370,0.472):
        this.pickAge(this.infoScreen.age);
        break;
      default:
    }
  }

  pickAge (age) {
    this.age = age;
    this.infoScreen.setAge();
  }

  pickColor (color) {
    this.humanPlayer.setColor(color);
    this.infoScreen.setColor();
  }

  hideInfoScreen () {
    this.infoScreen.hide();
  }

  selectCountry (pickedCountry) {
    this.humanPlayer.setCountry(this.countries[pickedCountry]);
    this.countries[pickedCountry].player = this.humanPlayer;
    let remainingCountries =
      ["top-left", "top-right", "bottom-left", "bottom-right"]
      .filter(spot => spot !== pickedCountry);
    let that = this;
    ["squares", "triangles", "pentagons"].forEach((compName,i) => {
      let country = this.countries[remainingCountries[i]];
      let compPlayer = new Player("ai", compName, country);
      country.player = compPlayer;
    });
    this.establishBases();
  }

  establishBases () {
    let that = this;
    Object.keys(this.countries).forEach((countryName,i) => {
      let newBoat = new Boat({
        width: DIM_X, height: DIM_Y, game: that,
        visible: true, position: "offMap",
        destination: countryName,
        countries: that.countries,
        purpose: "establish"
      });
      that.allMoveableObjects.push(newBoat);
    });
  }

  establish(country) {
    country.view.upgradeBuilding();
  }

  step () {
    this.moveObjects ();
  }

  setStage (stage) {
    switch (stage) {
      case "startGame":
        this.interface.startGame();
        this.infoScreen.startGame();
        this.logicBridge.advanceGeneration();
        break;
      case "instructions":
        this.infoScreen.show();
        this.interface.giveInstructions();
        this.infoScreen.giveInstructions();
        break;
      case "resumeGame":
        this.interface.resumeGame();
        this.infoScreen.resumeGame();
        break;
      case "offerDecision":
        this.infoScreen.show();
        this.infoScreen.offerDecision();
        break;
      case "betweenAges":
        this.infoScreen.show();
        this.interface.goBetweenAges();
        this.infoScreen.goBetweenAges();
        break;
      case "bringUpCouncil":
        this.infoScreen.show();
        this.infoScreen.bringUpCouncil();
        break;
      default:

    }
  }

  applyModifier() {
    if (this.infoScreen.text.betweenAges) {
      this.setStage("resumeGame");
      this.modifier = this.interface.selected;
    }
  }

  selectPerk (perkNo) {
    this.humanPlayer.setPerk(["str","int","devious","average"][perkNo]);
    this.setStage("startGame");
  }

  setSelectedInterface(command) {
    if (this.infoScreen.text.betweenAges) {
      this.interface.setSelected(command);
    }
  }

  ageUp() {
    this.currentAge += 1;
  }

  moveObjects () {
    this.allMoveableObjects.forEach((object) => object.move());
  }

  remove (object) {
    this.allMoveableObjects.splice(this.allMoveableObjects.indexOf(object),1);
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], (DIM_X - 50) * 0.7), Util.wrap(pos[1], (DIM_Y))
    ];
  }
}



module.exports = Game;
