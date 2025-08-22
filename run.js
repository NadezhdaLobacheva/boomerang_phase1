// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const readline = require('node:readline');

// Инициализация игры с настройками.
function runIn() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  console.clear();
  rl.question('Please, enter your name: ', async (input) => {
    process.argv[2] = input;
    const userName = process.argv[2];

    const game = new Game({
      trackLength: 60,
      name: userName,
    });

    game.play(userName);
  });
}
runIn()