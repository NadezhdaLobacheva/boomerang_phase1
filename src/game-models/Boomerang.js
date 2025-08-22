// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = '💩';
    this.direction = 'Right'
    this.positionX = undefined;
    this.positionY = 0;
  }

  // fly() {
  //   this.moveRight();
  //   this.moveLeft();
  // }

  moveLeft() {
    // Идём влево.
    this.positionX -= 1;
  }

  moveRight() {
    // Идём вправо.
    this.positionX += 1;
  }
}

module.exports = Boomerang;
