import render from './render.js'

export default function createPlayer(state) {
  let movementKeys = [
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeft',
  ]
  const actionKey = ' '

  const { characters: { player }, engine } = state

  player.act = () => {
    engine.lock()
    window.addEventListener("keydown", player)
  }

  player.handleEvent = (e) => {
    if (!e) return
    const { key } = e
    if (movementKeys.indexOf(key) !== -1)
      move(state, movementKeys, key)
    else if (key === actionKey) 
      openBox(state)
  }

  return player
}

function move(state, movementKeys, key) {
  const { characters: { player }, map, engine } = state
  const playerDir = movementKeys.indexOf(key)
  const diff = ROT.DIRS[4][playerDir]
  const newX = player.x + diff[0]
  const newY = player.y + diff[1]
  const isInMap = ({x, y}) => x == newX && y == newY
  const canMove = map.find(isInMap) !== undefined

  if (canMove) {
    player.x = newX
    player.y = newY

    window.removeEventListener("keydown", player)

    render(state)
    engine.unlock()
  }
}

function openBox(state) {
  const { map, engine, characters: { player }} = state
  const { hasAnanas } = map.find(({ x, y }) => 
    x === player.x && y === player.y
  )

  if (hasAnanas === undefined)
    state.console.writeLine("Nada interesante.")
  else if (!hasAnanas) {
    state.console.writeLine("Basura")
  } else if (hasAnanas) {
    state.console.writeLine("Encuentras una pistola!")

    window.removeEventListener("keydown", player)
    engine.lock()
  }
}
