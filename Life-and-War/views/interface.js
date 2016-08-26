const Utils = require('./utils.js');

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
