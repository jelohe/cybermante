import render from './render.js'

export default function createPlayer(state) {
  let movementKeys = []
  const [up, right, down, left] = [0, 1, 2, 3]
  const [k, l, j, h] = [75, 76, 74, 72]
  const space = 32

  movementKeys[k] = up
  movementKeys[l] = right
  movementKeys[j] = down
  movementKeys[h] = left

  const { characters: { player }, engine } = state

  player.act = () => {
    engine.lock()
    window.addEventListener("keydown", player)
  }

  player.handleEvent = ({ keyCode }) => {
    if (movementKeys[keyCode] !== undefined)
      move(state, movementKeys, keyCode)
    else if (keyCode == space) 
      openBox(state)
  }

  return player
}

function move(state, movementKeys, keyCode) {
  const { characters: { player }, map, engine } = state
  const diff = ROT.DIRS[4][movementKeys[keyCode]]
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
    state.console.writeLine("Nothing interesting.")
  else if (!hasAnanas) {
    state.console.writeLine("That's just trash.")
  } else if (hasAnanas) {
    state.console.writeLine("It's your smartphone, it appears to be charged.")

    window.removeEventListener("keydown", player)
    engine.lock()
  }
}
