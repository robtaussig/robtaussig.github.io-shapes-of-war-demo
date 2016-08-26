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
