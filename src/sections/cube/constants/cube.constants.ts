import { FaceColor, CubeState } from '../types/cube.types';

export const CUBE_SIZE = 3;

export const INITIAL_CUBE_STATE: CubeState = {
  front: Array(CUBE_SIZE).fill(Array(CUBE_SIZE).fill('red')),
  back: Array(CUBE_SIZE).fill(Array(CUBE_SIZE).fill('orange')),
  left: Array(CUBE_SIZE).fill(Array(CUBE_SIZE).fill('blue')),
  right: Array(CUBE_SIZE).fill(Array(CUBE_SIZE).fill('green')),
  up: Array(CUBE_SIZE).fill(Array(CUBE_SIZE).fill('white')),
  down: Array(CUBE_SIZE).fill(Array(CUBE_SIZE).fill('yellow')),
};

export const FACE_COLORS: Record<FaceColor, string> = {
  white: '#FFFFFF',
  yellow: '#FFFF00',
  red: '#FF0000',
  orange: '#FFA500',
  blue: '#0000FF',
  green: '#00FF00',
};

export const FACE_POSITIONS = [
  'front',
  'back',
  'left',
  'right',
  'up',
  'down',
] as const;
