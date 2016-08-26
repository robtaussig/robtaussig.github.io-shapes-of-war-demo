const Utils = require('./utils.js');

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
