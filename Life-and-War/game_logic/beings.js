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
