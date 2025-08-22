// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().
const runInteractiveConsole = require('./keyboard')
const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const {User} = require('../db/models')

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
    this.kills = 0;
    this.regenerateTrack();
    this.intervalId = null;
    this.kills = 0
  }



  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = []
    for (let i = 0 ; i < this.trackLengthY; i++){
    const trackLine = new Array(this.trackLength).fill(' ')
    this.track.push(trackLine)
    }
    this.track[this.hero.positionY][this.hero.positionX] = this.hero.skin;
    this.track[this.enemy.positionY][this.enemy.positionX] = this.enemy.skin;
    this.track[this.hero.boomerang.positionY][this.hero.boomerang.positionX] = this.hero.boomerang.skin;
  }


 async check(fullName, kills) {
    if (this.hero.positionX === this.enemy.positionX && this.hero.positionY === this.enemy.positionY && this.intervalId !== null) {
      this.hero.die();
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('Игра окончена! Герой погиб.');
      await User.create({fullName, kills})
      process.exit();
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
      this.kills += 1
      this.enemy.die()
      this.enemy = new Enemy();
      this.hero.boomerang.direction = 'Left'
      this.kills +=1
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

  play(fullName) {
    runInteractiveConsole(this)
     if (this.intervalId === null) { 
      this.intervalId = setInterval(() => {
        if (this.intervalId !== null) { 
          this.check(fullName, this.kills);
          if (this.intervalId !== null) { 
            this.regenerateTrack();
            this.view.render(this.track,this.kills);
          }
        }}, 100);
  }
}
}

module.exports = Game;
