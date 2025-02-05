export default function render(game) {
  renderMap(game);
  renderCharacters(game);
}

function renderMap({ map, display }) {
  map.forEach(tile => {
    const { x, y, glyph, color } = tile;
    display.draw(x, y, glyph, color);
  });
}

function renderCharacters({ display, characters }) {
  Object.values(characters).forEach(({ x, y, glyph, color }) => {
    display.draw(x, y, glyph, color);
  });
}
