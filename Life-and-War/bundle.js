/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	const Game = __webpack_require__(17);
	const GameView = __webpack_require__(22);
	
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


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Utils = __webpack_require__(21);
	
	const DEFAULTS = {
	  color: "#41a277",
	  width: 1200,
	  height: 800
	};
	
	class Interface {
	  constructor (options = {}) {
	    let settings = Object.assign(DEFAULTS,options);
	    this.width = settings.width;
	    this.height = settings.height;
	    this.color = settings.color;
	    this.unselectedColor = "black";
	    this.instructions = false;
	    this.game = settings.game;
	    this.stage = "beginning";
	    this.messages = ["Welcome, my liege. Your first task as our new leader is "+
	    "to pick a country on which to establish a base. The countries can vary "+
	    "in three relevant attributes: climate, size, and usable land. The former "+
	    "two can be deduced from maps that we have recovered, where the color "+
	    "(from white to orange) reflects the climate, coldest to hottest. We can "+
	    "only guess how much of the land is actually usable.", "Also, before I "+
	    "forget, you shouldn't be too quick to pick the greenest pastures. "+
	    "Victory is measured not by mere survival, but by thriving in your " +
	    "environment. With harsh conditions, our people will become stronger than "+
	    "they would in an environment where nothing is testing for desirable "+
	    "traits. Those with negative traits will be just as likely to multiply "+
	    "as those fortunate in the genetic lottery. While our short-term "+
	    "prospects of survival in a harsh climate will be challenged, I have no "+
	    "doubt that the brave will eventually be rewarded for their endurance."];
	    this.milText = ["Start war","Fortify defenses", "Draft soldiers", "Increase funding"];
	    this.domText = ["Encourage \"multiplication\"","Increase taxes", "Increase production", "Improve morale"];
	    this.techText = ["Next age","Military research", "Domestic research", "Shady research"];
	    this.shadyText = ["Kidnap Princess","Frame enemy King", "Send Trojan Cube", "Spread propaganda"];
	    this.selected = "";
	  }
	
	  giveInstructions () {
	    this.stage = "instructions";
	  }
	
	  setMessage (msg) {
	    this.message = msg;
	  }
	
	  setMilText (array) {
	    this.milText = array;
	  }
	
	  setDomText (array) {
	    this.domText = array;
	  }
	
	  goBetweenAges () {
	    this.stage = "betweenAges";
	    this.unselectedColor = this.game.currentAge === 0 ? "grey" : "black";
	  }
	
	  setTechText (array) {
	    this.techText = array;
	  }
	
	  setShadyText (array) {
	    this.shadyText = array;
	  }
	
	  resumeGame () {
	    this.stage = "";
	    this.unselectedColor = "grey";
	  }
	
	  setSelected (text) {
	    if (text !== "ignore") {
	      this.selected = text;
	    }
	  }
	
	  startGame () {
	    this.stage = "pickCountry";
	  }
	
	  checkFunc() {
	    return this.message;
	  }
	
	  draw (ctx) {
	    // Sidebar
	    ctx.beginPath();
	    ctx.rect(this.width * 0.70, this.height / 10 + 2, this.width * 0.30, this.height * 0.9 - 2);
	    ctx.fillStyle = "#a4f1eb";
	    ctx.lineWidth = 5;
	    ctx.strokeStyle = 'black';
	    ctx.stroke();
	    ctx.fill();
	
	    if (this.stage === "beginning") {
	      ctx.font = `${this.height * 0.008 + 3}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = 'black';
	      ctx.fillText("Shapes of War - Designed and coded by Robert Taussig.", this.width * 0.85 + 3,this.height * 0.95);
	      ctx.fillText("I sincerely hope you enjoy the game.", this.width * 0.85 + 3,this.height * 0.975);
	    } else if (this.stage === "instructions") {
	      ctx.font = `${this.height * 0.0125 + 3}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = 'black';
	      ctx.fillText("Instructions to be added here", this.width * 0.85 + 3,this.height * 0.125);
	
	      //start button
	      ctx.beginPath();
	      ctx.rect(this.width * 0.8, this.height * 0.8, this.width * 0.1, this.height * 0.1);
	      ctx.fillStyle = "limegreen";
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.stroke();
	      ctx.fill();
	
	      ctx.font = `${this.height * 0.015 + 4}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = 'black';
	      ctx.fillText("Got it!", this.width * 0.85,this.height * 0.86);
	
	      //footer
	      ctx.font = `${this.height * 0.008 + 3}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = 'black';
	      ctx.fillText("Shapes of War - Designed and coded by Robert Taussig.", this.width * 0.85 + 3,this.height * 0.95);
	      ctx.fillText("I sincerely hope you enjoy the game.", this.width * 0.85 + 3,this.height * 0.975);
	    } else if (this.stage === "pickCountry") {
	      let firstLines = Utils.fragmentText(this.messages[0],
	        this.width * 0.31 - parseInt(this.height * 0.018,0), ctx);
	
	      let secondLines = Utils.fragmentText(this.messages[1],
	        this.width * 0.31 - parseInt(this.height * 0.018,0), ctx);
	
	      ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = '#3e3838';
	      firstLines.forEach((line, i) => {
	        ctx.fillText(line, this.width * 0.85, (i + 1) *
	        parseInt(this.height * 0.025 + 5,0) + this.height * 0.15);
	      });
	
	      ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = '#3e3838';
	      secondLines.forEach((line, i) => {
	        ctx.fillText(line, this.width * 0.85, (i + 1) *
	        parseInt(this.height * 0.025 + 5,0) + this.height * 0.5);
	      });
	    } else if (this.game.currentAge > 0){
	      // Military Move
	      ctx.beginPath();
	      ctx.rect(this.width * 0.85 + 2, this.height / 6, this.width * 0.15 - 2, this.height * 0.3);
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.stroke();
	      ctx.fillStyle = "white";
	      ctx.fill();
	
	    //Military Text
	      //Title
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = "black";
	      ctx.fillText("Military Move", this.width * 0.925, this.height / 6 - this.height * 0.015);
	      //Option1
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "military-1") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.milText[0], this.width * 0.925, this.height / 6 + this.height * 0.03);
	      //Option2
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "military-2") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.milText[1], this.width * 0.925, this.height / 6 + this.height * 0.1);
	      //Option3
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "military-3") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.milText[2], this.width * 0.925, this.height / 6 + this.height * 0.17);
	      //Option4
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "military-4") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.milText[3], this.width * 0.925, this.height / 6 + this.height * 0.24);
	
	      // Domestic Move
	      ctx.beginPath();
	      ctx.rect(this.width * 0.70, this.height / 6, this.width * 0.15, this.height * 0.3);
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.stroke();
	      ctx.fillStyle = "white";
	      ctx.fill();
	
	    //Domestic Text
	      //Title
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = "black";
	      ctx.fillText("Domestic Move", this.width * 0.775, this.height / 6 - this.height * 0.015);
	      //Option1
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "domestic-1") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.domText[0], this.width * 0.775, this.height / 6 + this.height * 0.03);
	      //Option2
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "domestic-2") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.domText[1], this.width * 0.775, this.height / 6 + this.height * 0.1);
	      //Option3
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "domestic-3") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.domText[2], this.width * 0.775, this.height / 6 + this.height * 0.17);
	      //Option4
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "domestic-4") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.domText[3], this.width * 0.775, this.height / 6 + this.height * 0.24);
	
	      //Request Council
	      ctx.beginPath();
	      ctx.rect(this.width * 0.70, this.height *0.5, this.width * 0.30, this.height * 0.07);
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.stroke();
	      ctx.fillStyle = "gold";
	      ctx.fill();
	      //Request text
	      ctx.font = `${this.height * 0.02}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = this.game.currentAge === 0 ? "grey" : "black";
	      ctx.fillText("Send a request for council", this.width * 0.85, this.height * 0.545);
	
	      // Technology Move
	      ctx.beginPath();
	      ctx.rect(this.width * 0.70, this.height / 6 + this.height * 0.45, this.width * 0.15, this.height * 0.3);
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.stroke();
	      ctx.fillStyle = "white";
	      ctx.fill();
	
	    //Technology Text
	      //Title
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = "black";
	      ctx.fillText("Technology Move", this.width * 0.775, this.height / 6 + this.height * 0.45 - this.height * 0.015);
	      //Option1
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "technology-1") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.techText[0], this.width * 0.775, this.height / 6 + this.height * 0.48);
	      //Option2
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "technology-2") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.techText[1], this.width * 0.775, this.height / 6 + this.height * 0.55);
	      //Option3
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "technology-3") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.techText[2], this.width * 0.775, this.height / 6 + this.height * 0.62);
	      //Option4
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "technology-4") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.techText[3], this.width * 0.775, this.height / 6 + this.height * 0.69);
	
	      // Shady Move
	      ctx.beginPath();
	      ctx.rect(this.width * 0.85 + 2, this.height / 6 + this.height * 0.45, this.width * 0.15 - 2, this.height * 0.3);
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.stroke();
	      ctx.fillStyle = "white";
	      ctx.fill();
	    //Shady Text
	      //Title
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = "black";
	      ctx.fillText("Shady Move", this.width * 0.925, this.height / 6 + this.height * 0.45 - this.height * 0.015);
	      //Option1
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "shady-1") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.shadyText[0], this.width * 0.925, this.height / 6 + this.height * 0.48);
	      //Option2
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "shady-2") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.shadyText[1], this.width * 0.925, this.height / 6 + this.height * 0.55);
	      //Option3
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "shady-3") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.shadyText[2], this.width * 0.925, this.height / 6 + this.height * 0.62);
	      //Option4
	      ctx.font = `${this.height * 0.015}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = `${(this.selected === "shady-4") ? 'green' : this.unselectedColor}`;
	      ctx.fillText(this.shadyText[3], this.width * 0.925, this.height / 6 + this.height * 0.69);
	
	      //submit command button
	
	      ctx.beginPath();
	      ctx.rect(this.width * 0.81,this.height * 0.928, this.width * 0.08, this.height * 0.06);
	      ctx.fillStyle = 'limegreen';
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.stroke();
	      ctx.fill();
	
	      ctx.font = `${this.height * 0.0125 + 5}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = this.game.currentAge === 0 ? 'grey' : 'black';
	      ctx.fillText("Make it so!", this.width * 0.85 + 3,this.height * 0.965);
	    }
	
	    // Header
	    ctx.beginPath();
	    ctx.rect(0, 0, this.width, this.height / 10);
	    ctx.fillStyle = this.color;
	    ctx.lineWidth = 5;
	    ctx.strokeStyle = 'black';
	    ctx.stroke();
	    ctx.fill();
	
	
	    //for testing
	    ctx.font = `${this.height * 0.008 + 3}pt helvetica`;
	    ctx.textAlign = 'center';
	    ctx.fillStyle = 'black';
	    ctx.fillText("For testing only", this.width * 0.03, this.height * 0.055);
	
	    ctx.font = `${this.height * 0.008 + 3}pt helvetica`;
	    ctx.textAlign = 'center';
	    ctx.fillStyle = 'black';
	    ctx.fillText("start game", this.width * 0.10, this.height * 0.055);
	
	    ctx.font = `${this.height * 0.008 + 3}pt helvetica`;
	    ctx.textAlign = 'center';
	    ctx.fillStyle = 'black';
	    ctx.fillText("instructions", this.width * 0.15, this.height * 0.055);
	
	    ctx.font = `${this.height * 0.008 + 3}pt helvetica`;
	    ctx.textAlign = 'center';
	    ctx.fillStyle = 'black';
	    ctx.fillText("make decision", this.width * 0.2, this.height * 0.055);
	
	    ctx.font = `${this.height * 0.008 + 3}pt helvetica`;
	    ctx.textAlign = 'center';
	    ctx.fillStyle = 'black';
	    ctx.fillText("between ages", this.width * 0.26, this.height * 0.055);
	
	    ctx.font = `${this.height * 0.008 + 3}pt helvetica`;
	    ctx.textAlign = 'center';
	    ctx.fillStyle = 'black';
	    ctx.fillText("resume game", this.width * 0.33, this.height * 0.055);
	
	    // Header Text
	
	    ctx.font = `${this.height * 0.025}pt helvetica`;
	    ctx.textAlign = 'center';
	    ctx.fillStyle = 'black';
	    ctx.fillText(this.message, this.width * 0.5, this.height * 0.06);
	  }
	}
	
	
	
	module.exports = Interface;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(6);
	
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(21);
	
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


/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(6);
	
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const Utils = __webpack_require__(21);
	
	const DEFAULTS = {
	  color: "#fff",
	  width: 1200,
	  height: 800
	};
	
	class InfoScreen {
	  constructor (options = {}) {
	    let settings = Object.assign(DEFAULTS,options);
	    this.width = settings.width;
	    this.height = settings.height;
	    this.color = settings.color;
	    this.kingColor = "red";
	    this.game = settings.game;
	    this.revealed = true; //for testing
	    this.xPos = this.width * 0.7 + 2;
	    this.kingPos = {
	      action: "",
	      leftArm: [0,0],
	      rightArm: [0,0],
	      leftLeg: [0,0],
	      rightLeg: [0,0],
	      pole: [0,0],
	      body: [0,0]
	    };
	    this.agePos = {
	      10: [0,0],
	      20: [0,0],
	      30: [0,0],
	      50: [0,0]
	    };
	    this.text = {
	      header: "Age 1",
	      beginning: true,
	      startGame: false,
	      instructions: false,
	      betweenAges: false,
	      inGame: false,
	      council: false,
	      colors: true,
	      showAges: false,
	      ageMove: false,
	      ageSelect: "20",
	      ageSelected: false,
	      begin: false,
	      decision: false,
	      kingReveal: true,
	      showAge: false,
	      betweenAgeMessage: ["Before you begin, you must pick a specialty for"+
	      " your kingdom:", this.currentBetweenAgeMessage],
	      firstContent: "Thank you for playing Shapes of War. You will play as "+
	      "the ruler of the Circle Kingdom. Please pick a color...",
	      colorChoices: ["blue", "green", "yellow", "red"],
	      currentBetweenAgeMessage: [
	        "Strength will mostly affect your subjects' ability to harvest food "+
	        "and engage in warfare. Strength is best utilized with large populations.",
	        "Intelligence addresses future needs over more pressing issues. Disease "+
	        "control, technology advancement, and efficient management of food are "+
	        "all affected by intelligence.", "The deceitful leader doesn't worry "+
	        "about internal prosperity. Winning is measured against others, and through "+
	        "devious schemes, deceitful leaders excel in comparison by bringing "+
	        "down those around them.", "A jack of all trades, but master of none. "+
	        "Mediocrity is to some what general excellence is to others. Have no "+
	        "weaknesses and only you can hold yourself back."
	      ],
	      currentBetweenAgeMessageSelected: 0,
	      positiveChoice: "",
	      negativeChoice: "",
	      population: "10",
	      size: "big",
	      climate: "hot",
	      diseaseRate: "minimal",
	      foodStorage: "plenty",
	      powerLevel: "strong",
	      events: {
	        culled: "a few",
	        born: "a lot",
	        disease: "a few",
	        oldAge: "a few",
	        starved: "a bit"
	      },
	      avgInt: 100,
	      avgStr: 100,
	      avgHealth: 100
	    };
	  }
	
	  show (options) {
	    this.revealed = true;
	  }
	
	  resetScreens (exceptFor) {
	    this.text.beginning = exceptFor === "beginning" ? true : false;
	    this.text.council = exceptFor === "council" ? true : false;
	    this.text.instructions = exceptFor === "instructions" ? true : false;
	    this.text.betweenAges = exceptFor === "betweenAges" ? true : false;
	    this.text.decision = exceptFor === "decision" ? true : false;
	    this.text.startGame = exceptFor === "startGame" ? true : false;
	  }
	
	  bringUpCouncil () {
	    this.resetScreens("council");
	    this.kingReveal = true;
	  }
	
	  goBetweenAges () {
	    this.resetScreens("betweenAges");
	    this.text.kingReveal = true;
	  }
	
	  hide () {
	    this.text.showAge = false;
	    this.revealed = false;
	    this.kingReveal = false;
	    this.xPos = this.width * 0.7 + 2;
	  }
	
	  selectKingColor (color) {
	    this.kingColor = color;
	  }
	
	  selectAge (age) {
	    this.text.ageSelect = age;
	  }
	
	  resumeGame () {
	    this.hide();
	    this.resetScreens();
	  }
	
	  hideIfAllowed () {
	    if (this.council) {
	      this.hide();
	    }
	  }
	
	  setAge () {
	    this.text.ageSelected = true;
	    this.text.showAges = false;
	    this.text.showAge = true;
	    this.text.ageMove = true;
	
	    this.token = window.setTimeout(()=> {
	      this.offerDecision();
	      this.text.firstContent = "Ahh, brave. Brave, indeed. Quite brave. Are you " +
	      "ready to begin your journey, or would you like me to remind you how " +
	      "to lead a kingdom?";
	      this.text.positiveChoice = "'Yes, I am ready to conquer the Polygons. "+
	      "They will be nothing but lines and points after I'm finished "+
	      "with them!'";
	      this.text.negativeChoice = "'Of course I bloody know how to run a "+
	      "kingdom!.. but... I want you to prove to me that you do, as well.'";
	    },1250);
	
	    this.ageXDis = this.width * (0.22 + ((parseInt(this.text.ageSelect ===
	      "50" ? "40" : this.text.ageSelect) / 10) * 0.08)) - 135;
	    this.ageYDis = this.height / 3 - this.height * 0.1 - 90;
	
	    if (this.text.ageSelect === "10" && Math.abs(this.agePos[10][0]) <
	      this.ageXDis) {
	      this.agePos[10][0] -= 4;
	      if (Math.abs(Math.abs(this.agePos[10][1])) < this.ageYDis) {
	        this.agePos[10][1] -= 1;
	      }
	    } else if (this.text.ageSelect === "20" && Math.abs(this.agePos[20][0]) <
	      this.ageXDis) {
	        this.agePos[20][0] -= 5;
	        if (Math.abs(Math.abs(this.agePos[20][1])) < this.ageYDis) {
	          this.agePos[20][1] -= 1;
	        }
	    } else if (this.text.ageSelect === "30" && Math.abs(this.agePos[30][0]) <
	      this.ageXDis) {
	        this.agePos[30][0] -= 6;
	        if (Math.abs(Math.abs(this.agePos[30][1])) < this.ageYDis) {
	          this.agePos[30][1] -= 1;
	        }
	    } else if (this.text.ageSelect === "50" && Math.abs(this.agePos[50][0]) <
	      this.ageXDis) {
	        this.agePos[50][0] -= 7;
	        if (Math.abs(Math.abs(this.agePos[50][1])) < this.ageYDis) {
	          this.agePos[50][1] -= 1;
	        }
	    } else {
	      this.text.ageMove = false;
	    }
	  }
	
	  setColor () {
	    window.setTimeout(()=>{
	      this.text.colors = false;
	      this.text.firstContent = "Thank you, my liege. I have a good feeling "+
	      "about you. Now, how many ages would you like to play?";
	      this.showAges();
	    },1500);
	    this.kingPos.action = "jumpDown";
	  }
	
	  showAges () {
	    this.text.showAge = true;
	    this.text.showAges = true;
	  }
	
	  selectChoice(choice) {
	    if (choice === "positive-beginning") {
	      this.game.setStage("betweenAges");
	    } else if (choice === "negative-beginning") {
	      this.game.setStage("instructions");
	      this.giveInstructions();
	    }
	  }
	
	  giveInstructions () {
	    this.resetScreens('instructions');
	  }
	
	  offerDecision () {
	    this.resetScreens("decision");
	  }
	
	  startGame () {
	    this.hide();
	    this.resetScreens();
	  }
	
	  kingJumpDown () {
	    //pushing up
	    if (this.kingPos.body[0] >= -8 && this.kingPos.body[1] <= 0) {
	      this.kingPos.body[0] -= 1;
	      this.kingPos.body[1] -= 1;
	      this.kingPos.rightArm[0] -= 1;
	      this.kingPos.rightArm[1] -= 1;
	      this.kingPos.pole[0] -= 1;
	      this.kingPos.pole[1] -= 1;
	      //falling down
	    } else if (this.kingPos.body[0] > -15 && this.kingPos.body[1] <= 0) {
	        this.kingPos.body[0] -= 1;
	        this.kingPos.body[1] += 1;
	        this.kingPos.leftArm[0] -= 3;
	        this.kingPos.pole[0] -= 1;
	        this.kingPos.rightArm[0] -= 1;
	        this.kingPos.rightArm[1] += 1;
	        this.kingPos.pole[1] += 1;
	        this.kingPos.leftLeg[0] -= 1;
	        this.kingPos.leftLeg[1] += 1;
	        this.kingPos.rightLeg[0] -= 1;
	        this.kingPos.rightLeg[1] += 1;
	        //falling down straight
	
	    } else if (this.kingPos.body[0] === -15 && this.kingPos.body[1] < 170) {
	        this.kingPos.body[1] += 3;
	        if (this.kingPos.body[1] > 40) {
	          this.kingPos.leftArm[1] += 3;
	        }
	        this.kingPos.rightArm[1] += 3;
	        this.kingPos.pole[1] += 3;
	        this.kingPos.leftLeg[1] += 3;
	        this.kingPos.rightLeg[1] += 3;
	        //pumping arm
	
	    } else if (this.kingPos.body[1] > 167 &&
	      this.kingPos.rightArm[0] > -25 &&
	      this.kingPos.rightArm[1] < 185) {
	        this.kingPos.rightArm[0] -= 1;
	        this.kingPos.rightArm[1] += 2;
	        if (this.kingPos.leftArm[1] < 170) {
	          this.kingPos.leftArm[1] += 3;
	        }
	        this.kingPos.pole[0] -= 1;
	        this.kingPos.pole[1] += 2;
	        if (this.kingPos.rightLeg[1] < 210) {
	          this.kingPos.rightLeg[1] += 1;
	        }
	        //raising arm
	
	      } else if (this.kingPos.leftArm[1] < 170) {
	        this.kingPos.leftArm[1] += 3;
	        if (this.kingPos.rightLeg[1] < 210) {
	          this.kingPos.rightLeg[1] += 1;
	        }
	      } else if (this.kingPos.rightArm[0] < -14 &&
	        this.kingPos.rightArm[1] > 120) {
	        this.kingPos.rightArm[0] -= 1;
	        this.kingPos.rightArm[1] -= 5;
	        this.kingPos.pole[0] -= 1;
	        this.kingPos.pole[1] -= 5;
	      }
	
	  }
	
	  setSelectedTextDescription (type,selected) {
	    if (type === "selectPerk"){
	      this.text.currentBetweenAgeMessageSelected = selected;
	    }
	  }
	
	  draw (ctx) {
	    let yPos = this.height * 0.10 + 2;
	    if (this.revealed && this.xPos > 0) {
	      this.xPos -= 10;
	    }
	    if (this.text.beginning) {
	      this.xPos = 0;
	    }
	
	    if (this.kingPos.action === "jumpDown") {
	      this.kingJumpDown();
	    }
	
	    if (this.text.ageMove) {
	      this.setAge();
	    }
	
	    ctx.beginPath();
	    ctx.rect(this.xPos, yPos, this.width, this.height * 0.9 - 2);
	    ctx.fillStyle = "lightgrey";
	    ctx.lineWidth = 5;
	    ctx.strokeStyle = 'black';
	    ctx.stroke();
	    ctx.fill();
	
	    if (this.text.kingReveal) {
	      //throne back
	      ctx.beginPath();
	      ctx.moveTo(this.xPos + 50,yPos + 18);
	      ctx.lineTo(this.xPos + 55,yPos + 248);
	      ctx.lineTo(this.xPos + 215,yPos + 248);
	      ctx.lineTo(this.xPos + 220,yPos + 18);
	      ctx.closePath();
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "#672c00";
	      ctx.fill();
	      ctx.stroke();
	
	      //throne seat
	      ctx.beginPath();
	      ctx.moveTo(this.xPos + 55,yPos + 248);
	      ctx.lineTo(this.xPos + 45,yPos + 268);
	      ctx.lineTo(this.xPos + 225,yPos + 268);
	      ctx.lineTo(this.xPos + 215,yPos + 248);
	      ctx.closePath();
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "#290d0d";
	      ctx.fill();
	      ctx.stroke();
	
	      //throne base
	      ctx.beginPath();
	      ctx.moveTo(this.xPos + 44,yPos + 270);
	      ctx.lineTo(this.xPos + 44,yPos + 470);
	      ctx.lineTo(this.xPos + 226,yPos + 470);
	      ctx.lineTo(this.xPos + 226,yPos + 270);
	      ctx.closePath();
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "#672c00";
	      ctx.fill();
	      ctx.stroke();
	
	      //throne arm rests
	      ctx.beginPath();
	      ctx.moveTo(this.xPos + 44,yPos + 268);
	      ctx.lineTo(this.xPos + 44,yPos + 208);
	      ctx.lineTo(this.xPos + 64,yPos + 208);
	      ctx.lineTo(this.xPos + 64,yPos+268);
	      ctx.closePath();
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "brown";
	      ctx.fill();
	      ctx.stroke();
	
	      //king
	      ctx.beginPath();
	      ctx.arc(
	        this.xPos + 135 + this.kingPos.body[0],
	        yPos + 190 + this.kingPos.body[1], 75,0,2*Math.PI
	      );
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = this.kingColor;
	      ctx.fill();
	      ctx.stroke();
	
	      //eyes
	      ctx.beginPath();
	      ctx.ellipse(
	        this.xPos + 105 + this.kingPos.body[0],
	        yPos + 160 + this.kingPos.body[1],
	        15, 20, -20 * Math.PI/180, 0, 2 * Math.PI
	      );
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "white";
	      ctx.fill();
	      ctx.stroke();
	
	      ctx.beginPath();
	      ctx.arc(
	        this.xPos + 107 + this.kingPos.body[0],
	        yPos + 165 + this.kingPos.body[1], 5,0,2*Math.PI
	      );
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "black";
	      ctx.fill();
	      ctx.stroke();
	
	      ctx.beginPath();
	      ctx.ellipse(
	        this.xPos + 165 + this.kingPos.body[0],
	        yPos + 160 + this.kingPos.body[1],
	        15, 20, 20 * Math.PI/180, 0, 2 * Math.PI
	      );
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "white";
	      ctx.fill();
	      ctx.stroke();
	
	      ctx.beginPath();
	      ctx.arc(
	        this.xPos + 163 + this.kingPos.body[0],
	        yPos + 165 + this.kingPos.body[1], 5,0,2*Math.PI
	      );
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "black";
	      ctx.fill();
	      ctx.stroke();
	
	      //king arms
	      ctx.beginPath();
	      ctx.moveTo(
	        this.xPos + 68 + this.kingPos.body[0],
	        yPos + 205 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 50 + this.kingPos.leftArm[0],
	        yPos + 205 + this.kingPos.leftArm[1]
	      );
	      ctx.lineTo(
	        this.xPos + 50 + this.kingPos.leftArm[0],
	        yPos + 197 + this.kingPos.leftArm[1]
	      );
	      ctx.lineTo(
	        this.xPos + 68 + this.kingPos.body[0],
	        yPos + 197 + this.kingPos.body[1]
	      );
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = this.kingColor;
	      ctx.fill();
	      ctx.stroke();
	
	      //king hands
	      ctx.beginPath();
	      ctx.ellipse(
	        this.xPos + 50 + this.kingPos.leftArm[0],
	        yPos + 200 + this.kingPos.leftArm[1],
	        10, 15, Math.PI/180, 0, 2 * Math.PI
	      );
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "white";
	      ctx.fill();
	      ctx.stroke();
	
	      //king armrest
	      ctx.beginPath();
	      ctx.moveTo(this.xPos + 206,yPos + 268);
	      ctx.lineTo(this.xPos + 206,yPos + 208);
	      ctx.lineTo(this.xPos + 226,yPos + 208);
	      ctx.lineTo(this.xPos + 226,yPos+268);
	      ctx.closePath();
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "brown";
	      ctx.fill();
	      ctx.stroke();
	
	      //king arms
	      ctx.beginPath();
	      ctx.moveTo(
	        this.xPos + 206 + this.kingPos.body[0],
	        yPos + 205 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 236 + this.kingPos.rightArm[0],
	        yPos + 205 + this.kingPos.rightArm[1]
	      );
	      ctx.lineTo(
	        this.xPos + 236 + this.kingPos.rightArm[0],
	        yPos + 197 + this.kingPos.rightArm[1]
	      );
	      ctx.lineTo(
	        this.xPos + 206 + this.kingPos.body[0],
	        yPos + 197 + this.kingPos.body[1]
	      );
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = this.kingColor;
	      ctx.fill();
	      ctx.stroke();
	
	      //king staff
	      ctx.beginPath();
	      ctx.moveTo(
	        this.xPos + 232 + this.kingPos.pole[0],
	        yPos + 280 + this.kingPos.pole[1]
	      );
	      ctx.lineTo(
	        this.xPos + 232 + this.kingPos.pole[0],
	        yPos + 150 + this.kingPos.pole[1]
	      );
	      ctx.lineTo(
	        this.xPos + 240 + this.kingPos.pole[0],
	        yPos + 150 + this.kingPos.pole[1]
	      );
	      ctx.lineTo(
	        this.xPos + 240 + this.kingPos.pole[0],
	        yPos + 280 + this.kingPos.pole[1]
	      );
	      ctx.closePath();
	      ctx.lineWidth = 3;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "gold";
	      ctx.fill();
	      ctx.stroke();
	
	      //staff gem
	      ctx.beginPath();
	      ctx.arc(
	        this.xPos + 236 + this.kingPos.pole[0],
	        yPos + 145 + this.kingPos.pole[1],10,0,2*Math.PI
	      );
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = this.kingColor;
	      ctx.fill();
	      ctx.stroke();
	
	      //king hand right
	      ctx.beginPath();
	      ctx.ellipse(
	        this.xPos + 236 + this.kingPos.rightArm[0],
	        yPos + 200 + this.kingPos.rightArm[1],
	        10, 15, Math.PI/180, 0, 2 * Math.PI
	      );
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "white";
	      ctx.fill();
	      ctx.stroke();
	
	      //king crown
	      ctx.beginPath();
	      ctx.moveTo(
	        this.xPos + 95 + this.kingPos.body[0],yPos + 95 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 100 + this.kingPos.body[0],yPos + 70 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 120 + this.kingPos.body[0],yPos + 95 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 150 + this.kingPos.body[0],yPos + 95 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 170 + this.kingPos.body[0],yPos + 70 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 175 + this.kingPos.body[0],yPos + 95 + this.kingPos.body[1]
	      );
	      ctx.closePath();
	      ctx.lineWidth = 5;
	      ctx.lineJoin = "miter";
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "#b76b04";
	      ctx.fill();
	      ctx.stroke();
	
	      ctx.beginPath();
	      ctx.moveTo(
	        this.xPos + 100 + this.kingPos.body[0],yPos + 120 + this.kingPos.body[1]
	      );
	      ctx.bezierCurveTo(
	        this.xPos + 123 + this.kingPos.body[0],
	        yPos + 125 + this.kingPos.body[1],
	        this.xPos + 146 + this.kingPos.body[0],
	        yPos + 125 + this.kingPos.body[1],
	        this.xPos + 170 + this.kingPos.body[0],
	        yPos + 120 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 190 + this.kingPos.body[0],yPos + 70 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 165 + this.kingPos.body[0],yPos + 95 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 135 + this.kingPos.body[0],yPos + 70 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 105 + this.kingPos.body[0],yPos + 95 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 80 + this.kingPos.body[0],yPos + 70 + this.kingPos.body[1]
	      );
	      ctx.closePath();
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "gold";
	      ctx.fill();
	      ctx.stroke();
	
	      //Ruby on crown
	      ctx.beginPath();
	      ctx.arc(this.xPos + 135 + this.kingPos.body[0],yPos + 100 +
	        this.kingPos.body[1],10,0,2*Math.PI);
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "red";
	      ctx.fill();
	      ctx.stroke();
	
	      //king shoes
	      ctx.beginPath();
	      ctx.ellipse(this.xPos + 150 + this.kingPos.rightLeg[0], yPos + 300 +
	        this.kingPos.rightLeg[1], 15, 20, 90 * Math.PI/180, 0, 2 * Math.PI);
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "white";
	      ctx.fill();
	      ctx.stroke();
	
	      ctx.beginPath();
	      ctx.ellipse(this.xPos + 85 + this.kingPos.leftLeg[0], yPos + 300 +
	        this.kingPos.leftLeg[1], 15, 20, 90 * Math.PI/180, 0, 2 * Math.PI);
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "white";
	      ctx.fill();
	      ctx.stroke();
	
	      //king legs
	      ctx.beginPath();
	      ctx.moveTo(
	        this.xPos + 95 + this.kingPos.body[0],
	        yPos + 240 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 85 + this.kingPos.leftLeg[0],
	        yPos + 270 + this.kingPos.leftLeg[1]
	      );
	      ctx.lineTo(
	        this.xPos + 85 + this.kingPos.leftLeg[0],
	        yPos + 290 + this.kingPos.leftLeg[1]
	      );
	      ctx.bezierCurveTo(
	        this.xPos + 88 + this.kingPos.leftLeg[0],
	        yPos + 292 + this.kingPos.leftLeg[1],
	        this.xPos + 92 + this.kingPos.leftLeg[0],
	        yPos + 292 + this.kingPos.leftLeg[1],
	        this.xPos + 95 + this.kingPos.leftLeg[0],
	        yPos + 290 + this.kingPos.leftLeg[1]
	      );
	      ctx.lineTo(
	        this.xPos + 95 + this.kingPos.leftLeg[0],
	        yPos + 270 + this.kingPos.leftLeg[1]
	      );
	      ctx.lineTo(
	        this.xPos + 105 + this.kingPos.body[0],
	        yPos + 250 + this.kingPos.body[1]
	      );
	      ctx.lineWidth = 5;
	      ctx.lineJoin = 'round';
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = this.kingColor;
	      ctx.fill();
	      ctx.stroke();
	
	      ctx.beginPath();
	      ctx.moveTo(
	        this.xPos + 155 + this.kingPos.body[0],
	        yPos + 240 + this.kingPos.body[1]
	      );
	      ctx.lineTo(
	        this.xPos + 145 + this.kingPos.rightLeg[0],
	        yPos + 270 + this.kingPos.rightLeg[1]
	      );
	      ctx.lineTo(
	        this.xPos + 145 + this.kingPos.rightLeg[0],
	        yPos + 290 + this.kingPos.rightLeg[1]
	      );
	      ctx.bezierCurveTo(
	        this.xPos + 148 + this.kingPos.rightLeg[0],
	        yPos + 292 + this.kingPos.rightLeg[1],
	        this.xPos + 152 + this.kingPos.rightLeg[0],
	        yPos + 292 + this.kingPos.rightLeg[1],
	        this.xPos + 155 + this.kingPos.rightLeg[0],
	        yPos + 290 + this.kingPos.rightLeg[1]
	      );
	      ctx.lineTo(
	        this.xPos + 155 + this.kingPos.rightLeg[0],
	        yPos + 270 + this.kingPos.rightLeg[1]
	      );
	      ctx.lineTo(
	        this.xPos + 165 + this.kingPos.body[0],
	        yPos + 250 + this.kingPos.body[1]
	      );
	      ctx.lineWidth = 5;
	      ctx.lineJoin = 'round';
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = this.kingColor;
	      ctx.fill();
	      ctx.stroke();
	    }
	
	    if (this.text.beginning) {
	      //Intro text - pick a color
	      let linesFirst = Utils.fragmentText(this.text.firstContent,this.width *
	        0.8 - 275 - parseInt(this.height * 0.018,0), ctx);
	      ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = 'black';
	      linesFirst.forEach((line, i) => {
	        ctx.fillText(line, this.xPos + this.width * 0.26 + 250, (i + 1) *
	        parseInt(this.height * 0.025 + 5,0) + this.height * 0.12);
	      });
	
	      //colors
	      if (this.text.colors) {
	        ctx.beginPath();
	        ctx.arc(this.xPos + this.width * 0.3,this.height / 3,this.height *
	          0.05 + 10,0,2*Math.PI);
	        ctx.lineWidth = 5;
	        ctx.strokeStyle = 'black';
	        ctx.fillStyle = "red";
	        ctx.fill();
	        ctx.stroke();
	
	        ctx.beginPath();
	        ctx.arc(this.xPos + this.width * 0.38,this.height / 3,this.height *
	          0.05 + 10,0,2*Math.PI);
	        ctx.lineWidth = 5;
	        ctx.strokeStyle = 'black';
	        ctx.fillStyle = "lightblue";
	        ctx.fill();
	        ctx.stroke();
	
	        ctx.beginPath();
	        ctx.arc(this.xPos + this.width * 0.46,this.height / 3,this.height *
	          0.05 + 10,0,2*Math.PI);
	        ctx.lineWidth = 5;
	        ctx.strokeStyle = 'black';
	        ctx.fillStyle = "green";
	        ctx.fill();
	        ctx.stroke();
	
	        ctx.beginPath();
	        ctx.arc(this.xPos + this.width * 0.54,this.height / 3,this.height *
	          0.05 + 10,0,2*Math.PI);
	        ctx.lineWidth = 5;
	        ctx.strokeStyle = 'black';
	        ctx.fillStyle = "purple";
	        ctx.fill();
	        ctx.stroke();
	      }
	
	      //submit button
	      if (!this.text.decision) {
	        ctx.beginPath();
	        ctx.rect(this.xPos + this.width * 0.371,this.height * 0.455,this.width *
	          0.1,this.height * 0.05 + 10);
	        ctx.lineWidth = 5;
	        ctx.strokeStyle = 'black';
	        ctx.fillStyle = "limegreen";
	        ctx.fill();
	        ctx.stroke();
	
	        ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = 'black';
	        ctx.fillText(
	          "Decide", this.xPos + this.width * 0.425,this.height * 0.493
	        );
	      }
	
	    } else if (this.text.instructions) {
	      ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	      ctx.textAlign = 'left';
	      ctx.fillStyle = 'black';
	      ctx.fillText(
	        "Instructions will go here", this.xPos +
	        this.width * 0.35,this.height * 0.15
	      );
	    } else if (this.text.betweenAges) {
	      ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = 'black';
	      ctx.fillText(
	        `Age ${this.game.currentAge}`, this.xPos +
	        this.width * 0.42,this.height * 0.15
	      );
	      if (this.game.currentAge === 0) {
	        ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = 'black';
	        ctx.fillText(
	          this.text.betweenAgeMessage[0], this.xPos +
	          this.width * 0.40,this.height * 0.20
	        );
	
	        ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = this.text.currentBetweenAgeMessageSelected === 0 ?
	          'limegreen' : 'black';
	        ctx.fillText(
	          "Brute Strength", this.xPos +
	          this.width * 0.3,this.height * 0.35
	        );
	
	        ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = this.text.currentBetweenAgeMessageSelected === 1 ?
	        'limegreen' : 'black';
	        ctx.fillText(
	          "Raw Intelligence", this.xPos +
	          this.width * 0.5,this.height * 0.35
	        );
	
	        ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = this.text.currentBetweenAgeMessageSelected === 2 ?
	          'limegreen' : 'black';
	        ctx.fillText(
	          "Conniving Instinct", this.xPos +
	          this.width * 0.3,this.height * 0.5
	        );
	
	        ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = this.text.currentBetweenAgeMessageSelected === 3 ?
	          'limegreen' : 'black';
	        ctx.fillText(
	          "A little bit of everything", this.xPos +
	          this.width * 0.5,this.height * 0.5
	        );
	
	        let selectedPerkDescription = Utils.fragmentText(
	          this.text.currentBetweenAgeMessage[this.text.currentBetweenAgeMessageSelected],
	          this.width * 0.45 - parseInt(this.height * 0.018,0), ctx
	        );
	
	        ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = 'black';
	        selectedPerkDescription.forEach((line, i) => {
	          ctx.fillText(line, this.xPos + this.width * 0.41, (i + 1) *
	          parseInt(this.height * 0.025 + 5,0) + this.height * 0.65);
	        });
	
	        ctx.beginPath();
	        ctx.rect(this.xPos + this.width * 0.315,this.height * 0.79,this.width *
	          0.2,this.height * 0.05 + 10);
	        ctx.lineWidth = 5;
	        ctx.strokeStyle = 'black';
	        ctx.fillStyle = "limegreen";
	        ctx.fill();
	        ctx.stroke();
	
	        ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = 'black';
	        ctx.fillText(
	          "Ok, let's play already!", this.xPos + this.width * 0.42,this.height * 0.83
	        );
	      }
	    }
	
	    //ages select
	    if (this.text.showAge) {
	      //10
	      if (this.text.showAges || this.text.ageSelect === "10") {
	        ctx.beginPath();
	        ctx.arc(this.xPos + this.width * 0.3 + this.agePos[10][0],
	          this.height / 3 + this.agePos[10][1],this.height * 0.05 +
	          10,0,2*Math.PI);
	        ctx.lineWidth = 5;
	        ctx.strokeStyle = 'black';
	        ctx.fillStyle = this.text.ageSelect === "10" ? "turquoise" : "grey";
	        ctx.fill();
	        ctx.stroke();
	
	        ctx.font = `${this.height * 0.025}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = "black";
	        ctx.fillText("10", this.width * 0.30 + this.agePos[10][0],
	        this.height / 3 + this.agePos[10][1] + this.height * 0.0125);
	      }
	
	      //20
	      if (this.text.showAges || this.text.ageSelect === "20") {
	        ctx.beginPath();
	        ctx.arc(this.xPos + this.width * 0.38 + this.agePos[20][0],
	          this.height / 3 + this.agePos[20][1],this.height * 0.05 +
	          10,0,2*Math.PI);
	        ctx.lineWidth = 5;
	        ctx.strokeStyle = 'black';
	        ctx.fillStyle = this.text.ageSelect === "20" ? "turquoise" :  "grey";
	        ctx.fill();
	        ctx.stroke();
	
	        ctx.font = `${this.height * 0.02 + 5}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = "black";
	        ctx.fillText("20", this.width * 0.38 + this.agePos[20][0],
	        this.height / 3 + this.agePos[20][1] + this.height * 0.0125);
	      }
	
	      //30
	      if (this.text.showAges || this.text.ageSelect === "30") {
	        ctx.beginPath();
	        ctx.arc(this.xPos + this.width * 0.46 + this.agePos[30][0],
	          this.height / 3 + this.agePos[30][1],this.height * 0.05 +
	          10,0,2*Math.PI);
	        ctx.lineWidth = 5;
	        ctx.strokeStyle = 'black';
	        ctx.fillStyle = this.text.ageSelect === "30" ? "turquoise" :  "grey";
	        ctx.fill();
	        ctx.stroke();
	
	        ctx.font = `${this.height * 0.02 + 5}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = "black";
	        ctx.fillText("30", this.width * 0.46 + this.agePos[30][0],
	        this.height / 3 + this.agePos[30][1] + this.height * 0.0125);
	      }
	
	      //50
	      if (this.text.showAges || this.text.ageSelect === "50") {
	        ctx.beginPath();
	        ctx.arc(this.xPos + this.width * 0.54 + this.agePos[50][0],
	          this.height / 3 + this.agePos[50][1],this.height * 0.05 +
	          10,0,2*Math.PI);
	        ctx.lineWidth = 5;
	        ctx.strokeStyle = 'black';
	        ctx.fillStyle = this.text.ageSelect === "50" ? "turquoise" :  "grey";
	        ctx.fill();
	        ctx.stroke();
	
	        ctx.font = `${this.height * 0.02 + 5}pt helvetica`;
	        ctx.textAlign = 'center';
	        ctx.fillStyle = "black";
	        ctx.fillText("50", this.width * 0.54 + this.agePos[50][0],
	        this.height / 3 + this.agePos[50][1] + this.height * 0.0125);
	      }
	    }
	
	    if (this.text.decision) {
	      //decision
	      //affirmative button
	      ctx.beginPath();
	      ctx.rect(this.xPos + this.width * 0.58,this.height * 0.3,this.width *
	        0.1,this.height * 0.05 + 10);
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "limegreen";
	      ctx.fill();
	      ctx.stroke();
	
	      //negative button
	      ctx.beginPath();
	      ctx.rect(this.xPos + this.width * 0.58,this.height * 0.455,this.width *
	        0.1,this.height * 0.05 + 10);
	      ctx.lineWidth = 5;
	      ctx.strokeStyle = 'black';
	      ctx.fillStyle = "#900606";
	      ctx.fill();
	      ctx.stroke();
	
	      ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = 'black';
	      ctx.fillText(
	        "Select", this.xPos + this.width * 0.63,this.height * 0.34
	      );
	
	      ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = 'black';
	      ctx.fillText(
	        "Select", this.xPos + this.width * 0.63,this.height * 0.493
	      );
	
	      let linesFirst = Utils.fragmentText(this.text.firstContent,this.width *
	        0.6 - 275 - parseInt(this.height * 0.018,0), ctx);
	      ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	      ctx.textAlign = 'center';
	      ctx.fillStyle = 'black';
	      linesFirst.forEach((line, i) => {
	        ctx.fillText(line, this.xPos + this.width * 0.26 + 250, (i + 1) *
	        parseInt(this.height * 0.025 + 5,0) + this.height * 0.12);
	      });
	
	      // affirmative response
	      let positiveLines = Utils.fragmentText(this.text.positiveChoice,
	        this.width * 0.4 - parseInt(this.height * 0.018,0), ctx);
	
	      ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	      ctx.textAlign = 'left';
	      ctx.fillStyle = '#3e3838';
	      positiveLines.forEach((line, i) => {
	        ctx.fillText(line, this.xPos + this.width * 0.185, (i + 1) *
	        parseInt(this.height * 0.025 + 5,0) + this.height * 0.30);
	      });
	
	      //negative response
	      let negativeLines = Utils.fragmentText(this.text.negativeChoice,
	        this.width * 0.4 - parseInt(this.height * 0.018,0), ctx);
	
	      ctx.font = `${this.height * 0.012 + 5}pt helvetica`;
	      ctx.textAlign = 'left';
	      ctx.fillStyle = '#3e3838';
	      negativeLines.forEach((line, i) => {
	        ctx.fillText(line, this.xPos + this.width * 0.185, (i + 1) *
	        parseInt(this.height * 0.025 + 5,0) + this.height * 0.455);
	      });
	    }
	
	  }
	
	}
	
	module.exports = InfoScreen;


/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	let Country = __webpack_require__(12);
	let Being = __webpack_require__(13);
	
	function World (maxSize = 1000) {
	  this.generation = 0;
	  this.cycle = 0;
	  this.maxSize = maxSize;
	
	  let countryNames = [
	    'top-left',
	    'bottom-left',
	    'top-right',
	    'bottom-right'
	  ];
	
	  this.countries = this.establishCountries(countryNames);
	  this.populateCountries(this.countries);
	  this.setupCountries();
	}
	
	World.prototype.establishCountries = function (countries) {
	  const allCountries = [];
	  let that = this;
	  countries.forEach(country => {
	    let thisCountry = new Country(country);
	    thisCountry.setSize(this.maxSize / countries.length);
	    thisCountry.setClimate(50,100);
	    thisCountry.setEnvironment(Math.random()*100);
	    allCountries.push(thisCountry);
	  });
	  return allCountries;
	};
	
	World.prototype.setupCountries = function () {
	  let that = this;
	  this.countries.forEach(country => country.setupCountry(that));
	};
	
	function generateBeings(numBeings, gender, country) {
	  let beings = [];
	  for (var i = 0; i < numBeings; i++) {
	    let int = 90 + Math.random() * 20;
	    let str = 90 + Math.random() * 20;
	    let health = 90 + Math.random() * 20;
	    let races = ['red', 'yellow', 'green', 'blue'];
	    let race = races[Math.floor(Math.random()*4)];
	    beings.push(new Being(gender, int, str, health, country, race, name));
	  }
	  return beings;
	}
	
	World.prototype.populateCountries = function () {
	  this.countries.forEach(country => {
	    country.males = (generateBeings(10,'male',country));
	    country.females = (generateBeings(10,'female',country));
	  });
	};
	
	World.prototype.cycleUp = function () {
	  this.cycle += 1;
	
	  if (this.cycle === 5) {
	    this.cycle = 0;
	    this.generationUp();
	  }
	  let self = this;
	  this.countries.forEach(country => {
	    country.updateCycle(self);
	  });
	
	};
	
	World.prototype.generationUp = function () {
	  let self = this;
	  this.countries.forEach(country => {
	    country.updateGen(self);
	  });
	  this.generation += 1;
	};
	
	World.prototype.run = function (generations) {
	  let that = this;
	  while (this.generation < generations) {
	    that.cycleUp();
	  }
	  this.countries.forEach(country => {
	    console.log(country);
	    console.log(`avgStr: ${country.avgStr}; avgInt: ${country.avgInt};
	      avgHealth: ${country.avgHealth}`);
	
	  });
	};
	
	module.exports = World;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	let Being = __webpack_require__(13);
	
	function Country (name) {
	
	  this.name = name;
	
	  this.males = [];
	  this.females = [];
	
	  this.population = 0;
	  this.generation = 0;
	
	  this.size = 0;
	  this.climate = 0;
	  this.diseaseRate = 0;
	  this.farmableLand = 0;
	  this.foodStorage = 0;
	  this.powerLevel = 0;
	  this.warLevel = 0;
	  this.events = {
	    numCulled: 0,
	    numBorn: 0,
	    health: 0,
	    oldAge: 0,
	    starving: 0
	  };
	  this.messages = [];
	
	  this.avgInt = 0;
	  this.avgStr = 0;
	  this.avgHealth = 0;
	}
	
	Country.prototype.setSize = function (maxSize) {
	  let minSize = maxSize / 2;
	  this.size = minSize + Math.random() * (maxSize - minSize);
	};
	
	Country.prototype.setClimate = function (minTemp, maxTemp) {
	  this.climate = minTemp + Math.random() * (maxTemp - minTemp);
	};
	
	Country.prototype.setEnvironment = function (farmableLandPercentage) {
	  //farmableLand function of random percentage of total land and climate
	  this.farmableLand = this.size * (farmableLandPercentage / 100) *
	    (this.climate / 100) * 4;
	};
	
	Country.prototype.setDisease = function (world) {
	  let worldTemp = 0;
	  world.countries.forEach(country => {
	    worldTemp += country.climate;
	  });
	  let avgTemp = worldTemp / world.countries.length;
	  // Disease rate determined by relative climate to world climate and
	  // population density
	  this.diseaseRate = (this.climate / avgTemp) * 2*(this.population / this.size);
	};
	
	Country.prototype.generateFood = function () {
	  let population = this.males.concat(this.females);
	  let foodProduced = 0;
	  population.forEach(being => {
	    // amount of food produced based on indiviual being strength, and capped by
	    // farmable land.
	    foodProduced += being.harvestFood();
	  });
	  // Food storage capacity increased by country intelligence
	  let moddedFarmableLand = this.farmableLand * (this.avgInt / 100);
	  this.foodStorage = foodProduced > moddedFarmableLand ?
	    moddedFarmableLand : foodProduced;
	};
	
	Country.prototype.handleFood = function () {
	  let population = this.males.concat(this.females);
	  // Sort population by strongest (in strenght and intelligence) to weakest
	  let sortedBeings = population.sort((b,a) => {
	    return (a.str + a.int) - (b.str + b.int);
	  });
	  let self = this;
	  // Strongest eat first
	  sortedBeings.forEach(being => {
	    if (self.foodStorage > 0) {
	      self.foodStorage -= 0.5;
	      being.daysStarving = 0;
	      being.health += 1;
	    } else {
	      // Consequences of not eating
	      self.events.starving += 1;
	      being.daysStarving += 1;
	      being.health -= 5;
	    }
	  });
	};
	
	Country.prototype.setPower = function () {
	  let sumPowerLevel = this.males.concat(this.females).reduce((sum, el) => {
	    let indivPower = (el.int + el.str);
	    return sum + indivPower;
	  },0);
	  // Power level is a simple aggregation of population's str + int
	  this.powerLevel = sumPowerLevel;
	};
	
	Country.prototype.setupCountry = function (world) {
	  this.setPower();
	  this.getInfo();
	  this.setDisease(world);
	};
	
	Country.prototype.cullWeak = function (modifier) {
	  let that = this;
	  let pop = this.males.concat(this.females).filter(human => {
	    return human.age > 10;
	  });
	  let ordered = pop.sort((a,b) => {
	    return a.str - b.str;
	  });
	  // After ordering population by str, set weakest to not alive.
	  // This percentage is affected by a modifier, determined by country Int.
	  let weakest = ordered.slice(0,Math.ceil(pop.length / (20 * modifier)));
	  weakest.forEach(being => {
	    being.alive = false;
	    that.events.numCulled += 1;
	    that.population -= 1;
	  });
	
	  this.cleanseDead();
	};
	
	Country.prototype.randomEvents = function () {
	
	};
	
	Country.prototype.simulateWars = function () {
	
	};
	
	Country.prototype.initiateBirthing = function () {
	  // Order males and females by 'attractiveness' and filter by acceptable
	  // birthing age.
	  let sortedMales = this.males.sort((b,a) => {
	    return (a.str + a.int + a.health) - (b.str + b.int + b.health);
	  }).filter(male => {
	    return male.age >= 5 && male.age < 30;
	  });
	
	  let sortedFemales = this.females.sort((b,a) => {
	    return (a.str + a.int + a.health) - (b.str + b.int + b.health);
	  }).filter(female => {
	    return female.age >= 5 && female.age < 30;
	  });
	
	  // Breed available males with available females within similar attractiveness
	  // range.
	  if (sortedMales.length > 0 && sortedFemales.length > 0) {
	    const smallestGroupSize = sortedMales.length < sortedFemales.length ?
	      sortedMales.length : sortedFemales.length;
	    for (var i = 0; i < smallestGroupSize; i++) {
	      let newBeing = sortedMales[i].breedWith(sortedFemales[i]);
	      sortedMales[i].offspring.push(newBeing);
	      sortedFemales[i].offspring.push(newBeing);
	      if (newBeing.gender === 'male') {
	        this.males.push(newBeing);
	      } else {
	        this.females.push(newBeing);
	      }
	      this.events.numBorn += 1;
	    }
	  }
	};
	
	Country.prototype.cleanseDead = function () {
	  // Search through population for beings with a false alive attribute, and
	  // and remove them from population array
	  this.males = this.males.filter(male => {
	    return male.alive === true;
	  });
	
	  this.females = this.females.filter(female => {
	    return female.alive === true;
	  });
	};
	
	Country.prototype.getInfo = function () {
	  // Generational census (can invoke it cyclically depending on computing power)
	  let population = this.males.concat(this.females);
	
	  this.avgInt = population.reduce((sum, el) => {
	    return sum + el.int;
	  },0)/population.length;
	
	  this.avgStr = population.reduce((sum, el) => {
	    return sum + el.str;
	  },0)/population.length;
	
	  this.avgHealth = population.reduce((sum, el) => {
	    return sum + el.health;
	  },0)/population.length;
	
	  this.population = population.length;
	};
	
	Country.prototype.updateCycle = function (world) {
	  // Invoke every cycle: disease handling, citizen updates, culling of the weak,
	  // food management.
	  this.setDisease(world);
	  let population = this.males.concat(this.females);
	  let self = this;
	  population.forEach(being => {
	    being.updateCycle(self.avgInt, self.diseaseRate);
	  });
	  // Every cycle, cull about 5% of the population, affected by intMod
	  this.cullWeak(this.avgInt/100);
	
	  if (world.cycle % 5 === 0) {
	    // Beings give birth twice a generation
	    this.initiateBirthing();
	  }
	  this.generateFood();
	  this.handleFood();
	};
	
	Country.prototype.printEvents = function (world) {
	
	  let events = this.events;
	
	  console.log(`${world.generation}: ${this.name}: ${events.numCulled} beings culled;
	    ${events.numBorn} beings born; ${events.health} beings succumbed to
	    disease; ${events.oldAge} beings succumbed to old age; ${events.starving}
	    starved this generation.`);
	    if (this.messages.length > 0) {
	      this.messages.forEach(message => {
	        console.log(message);
	      });
	    }
	  this.events = {
	    numCulled: 0,
	    numBorn: 0,
	    health: 0,
	    oldAge: 0,
	    starving: 0
	  };
	  this.messages = [];
	};
	
	Country.prototype.updateGen = function (world) {
	  // Updates that occur generationally.
	  this.getInfo();
	  this.randomEvents();
	  this.simulateWars();
	  this.cleanseDead();
	  this.printEvents(world);
	  this.generation += 1;
	};
	
	module.exports = Country;


/***/ },
/* 13 */
/***/ function(module, exports) {

	function Being (gender, intelligence,
	  strength, health, home, race, parents) {
	  this.gender = gender;
	  this.int = intelligence;
	  this.str = strength;
	  this.health = health;
	  this.home = home;
	  this.race = race;
	  this.parents = parents;
	  this.name = name;
	  this.offspring = [];
	  this.age = 0;
	  this.alive = true;
	  this.daysStarving = 0;
	  this.home.population += 1;
	  this.name = `${this.home.name}${this.home.population}`;
	}
	
	function plusOrNeg(degree) {
	  // Returns negative/positive degree (even weight)
	  return degree * (Math.random() >0.5 ? 1 : -1);
	}
	
	Being.prototype.breedWith = function (partner) {
	  // Take average trait of both partners
	  let offSpringInt = (this.int + partner.int) / 2;
	  let offSpringStr = (this.str + partner.str) / 2;
	  let offSpringHealth = (this.health + partner.health) / 2;
	  let attrs = [offSpringHealth, offSpringInt, offSpringStr].map(attr => {
	    // Genetic trait fluctuation of +/- 20%.
	    return attr + plusOrNeg(0.2) * attr;
	  });
	  let gender = plusOrNeg(1) > 0 ? 'male' : 'female';
	  let race = plusOrNeg(1) > 0 ? this.race : partner.race;
	  let parents = [this, partner];
	  return new Being(gender, ...attrs, this.home, race, parents);
	};
	
	Being.prototype.harvestFood = function () {
	  return (this.str / 100) * 2;
	};
	
	Being.prototype.updateCycle = function (countryInt,diseaseRate) {
	  // Being health increases by 1 each cycle, and decreases by country
	  // diseaseRate
	  this.health -= (diseaseRate - 1);
	
	  if (this.health < 20 || this.daysStarving >= 7) {
	    this.alive = false;
	    this.home.events.health += 1;
	    this.home.population -= 1;
	    return;
	  }
	  // Old age limit determined by individual health and aggregate country
	  // intelligence
	  if (this.age > (40 * (this.health / 100) * (countryInt / 100))) {
	    this.alive = false;
	    this.home.events.oldAge += 1;
	    this.home.population -= 1;
	    return;
	  }
	
	  this.age += 1;
	
	  this.int += 1;
	  this.str += this.age < 30 ? 1 : -1;
	};
	
	module.exports = Being;


/***/ },
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	const GameMap = __webpack_require__(2);
	const Interface = __webpack_require__(3);
	const Country = __webpack_require__(4);
	const Wave = __webpack_require__(5);
	const Util = __webpack_require__(21);
	const Boat = __webpack_require__(8);
	const InfoScreen = __webpack_require__(9);
	const LogicBridge = __webpack_require__(19);
	const Player = __webpack_require__(20);
	
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


/***/ },
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	let World = __webpack_require__(11);
	
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


/***/ },
/* 20 */
/***/ function(module, exports) {

	class Player {
	  constructor (type, name, country = null) {
	    this.computer = type === "ai" ? true : false;
	    this.name = name;
	    this.country = country;
	  }
	
	  setPerk (perk) {
	    this.perk = perk;
	  }
	
	  setColor (color) {
	    this.color = color;
	  }
	
	  setCountry (country) {
	    this.country = country;
	  }
	}
	
	module.exports = Player;


/***/ },
/* 21 */
/***/ function(module, exports) {

	const Util = {
	
	  wrap (coord, max) {
	    if (coord < 0) {
	      return max - (coord % max);
	    } else if (coord > max) {
	      return coord % max;
	    } else {
	      return coord;
	    }
	  },
	
	  distance (objOne, objTwo) {
	    let x = Math.pow(objOne.pos[0] - objTwo.pos[0],2);
	    let y = Math.pow(objOne.pos[1] - objTwo.pos[1],2);
	    return Math.sqrt(x + y);
	  },
	
	  fragmentText (text, maxWidth, ctx) {
	    let words = text.split(' '),
	      lines = [],
	      line = "";
	    if (ctx.measureText(text).width < maxWidth) {
	      return [text];
	    }
	    while (words.length > 0) {
	      while (ctx.measureText(words[0]).width >= maxWidth) {
	        let tmp = words[0];
	        words[0] = tmp.slice(0, -1);
	        if (words.length > 1) {
	            words[1] = tmp.slice(-1) + words[1];
	        } else {
	            words.push(tmp.slice(-1));
	        }
	      }
	      if (ctx.measureText(line + words[0]).width < maxWidth) {
	        line += words.shift() + " ";
	      } else {
	        lines.push(line);
	        line = "";
	      }
	      if (words.length === 0) {
	        lines.push(line);
	      }
	    }
	    return lines;
	  }
	};
	
	module.exports = Util;


/***/ },
/* 22 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map