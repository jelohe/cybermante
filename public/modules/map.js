import { glyphs } from './style.js'

export function createMap() {
  // return custom()
  return addBoxes(
    dungeon(glyphs.floor),
    glyphs.box
  )
}

function custom() {
  const shape = [
    '                                                                 '.split(''),
    '                                                                 '.split(''),
    '                                                                 '.split(''),
    '                                                                 '.split(''),
    '                    #########################################    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #.......................................#    '.split(''),
    '                    #########################################    '.split(''),
    '                                                                 '.split(''),
  ]

  let map = []
  shape.forEach((row, y) => 
    row.forEach((glyph, x) => 
      map.push({ glyph, x, y, color: 'white' })))

  return map
}

function cellular(glyph) {
  let generator = new ROT.Map.Cellular(80, 25, {
    born: [4, 5, 6, 7, 8],
    survive: [2, 3, 4, 5]
  })

  generator.randomize(0.9)
  generator.connect()

  for (let i=49; i>=0; i--) {
    generator.create()
  }

  let map = []
  generator._map.forEach(
    (row, x) => row.forEach(
      (cell, y) => {
        if (!cell) map.push({ x, y, glyph })}))

  return map
}

function dungeon(glyph) {
  const map = []

  new ROT.Map.Digger().create((x, y, wall) => {
    if (!wall) map.push({ x, y, glyph })
  })

  return map
}

function addBoxes(map, glyph) {
  const newMap = [...map]

  for (let i=0; i<10; i++) {
    const index = randomIndex(map)
    const hasAnanas = i === 0
    newMap[index] = { ...newMap[index], glyph, hasAnanas }
  }

  return newMap
}

export function randomPosition(map) {
  if (!map || map.length === 0) return { x: 0, y: 0 }

  const { x, y } = map[randomIndex(map)]
  return { x, y }
}

export function randomIndex(map) {
  return Math.floor(ROT.RNG.getUniform() * map.length)
}
