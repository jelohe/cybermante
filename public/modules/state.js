import { glyphs, colors } from './style.js'
import { createMap, randomPosition, randomIndex } from './map.js'

export default function createState() {
  const scheduler = new ROT.Scheduler.Simple();
  const map = createMap();

  const state = {
    engine: new ROT.Engine(scheduler),
    scheduler,
    display: createDisplay(),
    console: createConsole(),
    map,
    characters: {
      player: {
        ...randomPosition(map),
        glyph: glyphs.player,
        color: colors.yellow,
      },
      pedro: {
        ...randomPosition(map),
        direction: 'right',
        glyph: glyphs.pedro,
        color: colors.red,
      },
    },
  };

  return state
}

function createDisplay(width, height) {
  ROT.DEFAULT_WIDTH = 80;
  ROT.DEFAULT_HEIGHT = 25;

  const display = new ROT.Display();
  document
    .getElementById("canvasWrapper")
    .appendChild(display.getContainer());

  return display;
}

function createConsole() {
  const el = document.getElementById('console');
  const con = {
    clear: () => el.value = '',
    write: text => {
      el.value += text;
      el.scrollTop = el.scrollHeight;
    },
    writeLine: text => con.write(`\r\n${text}`),
  }

  return con;
};


