function lineOfSight(map, character) {
  const { direction } = character
  let cells = [];

  if (direction === 'right') {
    cells = map.filter(({ x, y }) => 
      ((x === character.x + 1) && (character.y === y))
      || ((x === character.x + 2) && (character.y === y - 1))
      || ((x === character.x + 2) && (character.y === y    ))
      || ((x === character.x + 2) && (character.y === y + 1))
      || ((x === character.x + 3) && (character.y === y - 1))
      || ((x === character.x + 3) && (character.y === y    ))
      || ((x === character.x + 3) && (character.y === y + 1))
    )
  }
  if (direction === 'left') {
    cells = map.filter(({ x, y }) => 
      ((x === character.x - 1) && (character.y === y))
      || ((x === character.x - 2) && (character.y === y - 1))
      || ((x === character.x - 2) && (character.y === y    ))
      || ((x === character.x - 2) && (character.y === y + 1))
      || ((x === character.x - 3) && (character.y === y - 1))
      || ((x === character.x - 3) && (character.y === y    ))
      || ((x === character.x - 3) && (character.y === y + 1))
    )
  }
  if (direction === 'up') {
    cells = map.filter(({ x, y }) => 
      ((character.y === y + 1) && (x === character.x + 0))
      || ((character.y === y + 2) && (x === character.x - 1))
      || ((character.y === y + 2) && (x === character.x    ))
      || ((character.y === y + 2) && (x === character.x + 1))
      || ((character.y === y + 3) && (x === character.x - 1))
      || ((character.y === y + 3) && (x === character.x    ))
      || ((character.y === y + 3) && (x === character.x + 1))
    )
  }
  if (direction === 'down') {
    cells = map.filter(({ x, y }) => 
      ((character.y === y - 1) && (x === character.x))
      || ((character.y === y - 2) && (x === character.x - 1))
      || ((character.y === y - 2) && (x === character.x    ))
      || ((character.y === y - 2) && (x === character.x + 1))
      || ((character.y === y - 3) && (x === character.x - 1))
      || ((character.y === y - 3) && (x === character.x    ))
      || ((character.y === y - 3) && (x === character.x + 1))
    )
  }

  cells.forEach(cell => cell.color = 'cyan')
}

function clearLineOfSight(map) {
  map.forEach(cell => cell.color = 'white')
}

export default function createEnemy(state) {
  const { engine, map } = state
  const { pedro, player } = state.characters

  lineOfSight(map, pedro)

  pedro.act = function() {
    const path = calculatePath(pedro, player, map)
    const isNextToPlayer = path.length <= 1

    if (isNextToPlayer) {
      state.console.writeLine("Te han capturado! :(")
      engine.lock()
    } else {
      const prevX = pedro.x
      const prevY = pedro.y

      pedro.x = path[0][0] 
      pedro.y = path[0][1] 

      const diffX = pedro.x - prevX
      const diffY = pedro.y - prevY

      let { direction } = pedro
      if (diffX === 1) direction = 'right'
      if (diffY === -1) direction = 'up'
      if (diffX === -1) direction = 'left'
      if (diffY === 1) direction = 'down'

      pedro.direction = direction
    }

    clearLineOfSight(map)
    lineOfSight(map, pedro)
  }

  return pedro
}

function calculatePath(origin, destination, map) {
  const walkable = (x, y) =>
    map.find(tile => x == tile.x && y == tile.y) !== undefined

  const astar = new ROT.Path.AStar(
    destination.x,
    destination.y,
    walkable,
    { topology: 4 }
  )

  let path = []
  astar.compute(origin.x, origin.y, (x, y) => path.push([x, y]))
  path.shift()
  return path
}
