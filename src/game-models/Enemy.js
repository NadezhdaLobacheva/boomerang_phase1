// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.positionX = 59;
    this.positionY = Math.floor(Math.random()*10)
  }

  generateSkin() {
    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.positionX -= 1;
  }

  die() {
    this.skin = '💀'
    // this.generateSkin()
    // this.position = 59;
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
