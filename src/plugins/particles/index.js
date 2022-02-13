import {tsParticles} from 'tsparticles'
import lines from './lines'
import presetCircles from './preset-circles'



const particles = () => {
   tsParticles.load('tsparticles', lines)
}

const hexagons = () => {
  tsParticles.load('tsparticles', presetCircles)
}

export { particles, hexagons }