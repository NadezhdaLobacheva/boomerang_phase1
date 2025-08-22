// Наш герой.

class Hero {
  constructor({boomerang}) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.positionX = 0;
    this.boomerang = boomerang;
    this.positionY = 0;
  }

  moveUp() {
    // Идём влево.
    this.positionY -= 1;
  }
  moveDown() {
    // Идём влево.
    this.positionY += 1;
  }
  moveLeft() {
    // Идём влево.
    this.positionX -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.positionX += 1;
  }

  attack() {
    // Атакуем.
    this.boomerang.positionX = this.positionX + 1;
    this.boomerang.positionY = this.positionY;
  }

  die() {
    this.skin = '💀';
    console.log('YOU ARE DEAD!💀');
    process.exit();
  }
}

module.exports = Hero;
