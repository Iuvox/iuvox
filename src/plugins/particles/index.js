// import { tsParticles } from "tsparticles"; // this is the new common package

import lines from './lines'
import presetCircles from './preset-circles'

const particles = () => {
  return lines
  //  tsParticles.load('tsparticles', lines)
}

const hexagons = () => {
  // tsParticles.load('tsparticles', presetCircles)
}

export { lines, presetCircles }