// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 59;
  }

  generateSkin() {
    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  moveLeft() {
    // Идём влево.
    this.position -= 1;
  }

  die() {
    this.skin = '💀'
    // this.generateSkin()
    // this.position = 59;
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
