import createState from './modules/state.js'
import createPlayer from './modules/player.js'
import createEnemy from './modules/enemy.js'
import render from './modules/render.js'

document.body.onload = function startGame() {
  game()
}

function game() {
  const state = createState()

  const player = createPlayer(state)
  const pedro = createEnemy(state)

  const repeater = true
  state.scheduler.add(player, repeater)
  state.scheduler.add(pedro, repeater)
  state.engine.start()

  render(state)
}
