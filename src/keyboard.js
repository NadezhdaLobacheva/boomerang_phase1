// Умеешь работать с keypress? Попробуй разобраться в этом файле.
// Вместо keypress можно использовать и стандартный readline.
// Главное не используй всё вместе!

const keypress = require('keypress');

// Управление.
// Настроим соответствия нажатий на клавиши и действий в игре.

// Какая-то функция.

function runInteractiveConsole(game) {
  const keyboard = {
  w: () => {if (game.hero.positionY > 0) {
      game.hero.moveUp()
    }
  },
  a: () => {
    if (game.hero.positionX > 0) {
      game.hero.moveLeft()
    }
  },
  s: () => {if (game.hero.positionY < 9) {
      game.hero.moveDown()
    }
  },
  d: () => {
    if(game.hero.positionX < 59) {
      game.hero.moveRight()
    }
  },
  f: () => console.log('f'),
  space: () => game.hero.attack(),
};
  keypress(process.stdin);
  process.stdin.on('keypress', (ch, key) => {
    if (key) {
      if (key.name in keyboard) {
        keyboard[key.name]();
      }
      // Прерывание программы.
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
    }
  });
  process.stdin.setRawMode(true);
}

// Давай попробуем запустить этот скрипт!

// runInteractiveConsole();

module.exports = runInteractiveConsole