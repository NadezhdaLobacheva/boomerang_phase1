const chalk = require('chalk').default;
const figlet = require('figlet');
// Сделаем отдельный класс для отображения игры в консоли.

class View {
  render(track, kills, name) {
    const yourTeamName = 'Werewolves';

    // Тут всё рисуем.
    console.clear();
    figlet('Welcome to the poopies battle', (_, data) => {
      console.log(chalk.yellowBright(data));
    });
    console.log('\n');
    console.log(
      chalk.greenBright('┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓'),
    );
    console.log('\n');
    console.log(track.map((el) => el.join('')).join('\r\n'));
    console.log('\n');
    console.log(
      chalk.greenBright('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'),
    );
    console.log('\n');
    console.log(chalk.yellowBright('Твое имя: ', name));
    console.log(chalk.yellowBright(`Убито врагов: ${kills} 💩`));
    console.timeLog(chalk.yellowBright('Ты жив уже'));
    console.log('\n');
    console.log(chalk.greenBright(`Created by "${yourTeamName} 🐺" with love ❤`));
  }
}

module.exports = View;
