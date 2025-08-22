// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().
const runInteractiveConsole = require('./keyboard')
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength }) {
    this.trackLength = trackLength;
    this.trackLengthY = 10;
    this.hero = new Hero({boomerang: new Boomerang()}); // Герою можно аргументом передать бумеранг.
    this.enemy = new Enemy();
    this.view = new View();
    this.track = [];
    this.regenerateTrack();
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = []
    for (let i = 0 ; i < this.trackLengthY; i++){
    let trackLine = new Array(this.trackLength).fill(' ')
    this.track.push(trackLine)
    }
    this.track[this.hero.positionY][this.hero.positionX] = this.hero.skin;
    this.track[this.enemy.positionY][this.enemy.positionX] = this.enemy.skin;
    this.track[this.hero.boomerang.positionY][this.hero.boomerang.positionX] = this.hero.boomerang.skin;
  }

  check() {
    if (this.hero.positionX === this.enemy.positionX && this.hero.positionY === this.enemy.positionY) {
      this.hero.die();
    }
    
    if(this.hero.boomerang.positionX < this.trackLength - 1 && this.hero.boomerang.direction === 'Right') {
      this.hero.boomerang.moveRight()
    }

    if (this.hero.boomerang.positionX > 0 && this.hero.boomerang.direction === 'Left') {
      this.hero.boomerang.moveLeft()
    } 

    if ((this.hero.positionX === this.hero.boomerang.positionX && this.hero.positionY === this.hero.boomerang.positionY) || (this.hero.boomerang.positionX === 0) ) {
      this.hero.boomerang.positionX = undefined
      this.hero.boomerang.direction = 'Right'
    }

    if(this.hero.boomerang.positionX === this.trackLength -1) {
      this.hero.boomerang.direction = 'Left'
    }

    if ((this.enemy.positionX === this.hero.boomerang.positionX ||this.enemy.positionX === this.hero.boomerang.positionX - 1) && this.enemy.positionY === this.hero.boomerang.positionY) {
      this.enemy.die()
      this.enemy = new Enemy();
      this.hero.boomerang.direction = 'Left'
    }

    // if (this.hero.boomerang === this.trackLength - 1 || this.hero.boomerang.position === this.enemy.position){
    //   this.hero.boomerang.position = undefined
    // }
    if(this.enemy.positionX  === 0){
      this.enemy = new Enemy();
    }    
    if (this.enemy.positionX > 0) {
      this.enemy.moveLeft()
    }
  }

  play() {
    runInteractiveConsole(this)
    setInterval(() => {
      // Let's play!
      this.check();
      this.regenerateTrack();
      this.view.render(this.track);
    }, 100);
  }
}

module.exports = Game;
