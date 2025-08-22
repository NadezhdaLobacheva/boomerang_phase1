// Умеешь работать с keypress? Попробуй разобраться в этом файле.
// Вместо keypress можно использовать и стандартный readline.
// Главное не используй всё вместе!

const keypress = require('keypress');

// Управление.
// Настроим соответствия нажатий на клавиши и действий в игре.

// Какая-то функция.

function runInteractiveConsole(game) {
  const keyboard = {
  w: () => console.log('w'),
  a: () => {
    if (game.hero.position > 0) {
      game.hero.moveLeft()
    }
  },
  s: () => console.log('s'),
  d: () => {
    if(game.hero.position < game.enemy.position) {
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