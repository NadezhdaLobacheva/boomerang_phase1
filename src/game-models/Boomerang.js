// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.position = undefined;
  }

  fly() {
    this.moveRight();
    // this.moveLeft();
  }

  // moveLeft() {
  //   // Идём влево.
  //   this.position -= 1;
  // }

  moveRight() {
    // Идём вправо.
    this.position += 1;
  }
}

module.exports = Boomerang;
