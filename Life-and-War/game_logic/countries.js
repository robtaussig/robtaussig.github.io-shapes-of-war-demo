let Being = require('./beings');

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
