let Country = require('./countries');
let Being = require('./beings');

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
