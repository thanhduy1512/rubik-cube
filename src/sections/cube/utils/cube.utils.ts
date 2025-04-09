import {
  CubeState,
  FacePosition,
  MoveDirection,
  CubeMove,
  FaceColor,
} from '../types/cube.types';
import { CUBE_SIZE } from '../constants/cube.constants';

export function rotateFace(
  state: CubeState,
  face: FacePosition,
  direction: MoveDirection
): CubeState {
  const newState = { ...state };
  const faceArray = [...state[face]];

  // Rotate the face array
  const rotatedFace =
    direction === 'clockwise'
      ? faceArray.map((_, i) => faceArray.map((row) => row[i]).reverse())
      : faceArray.map((_, i) => faceArray.map((row) => row[CUBE_SIZE - 1 - i]));

  newState[face] = rotatedFace;

  // Rotate the adjacent edges
  // This is a simplified version - we'll need to implement the full edge rotation logic
  return newState;
}

export function applyMove(state: CubeState, move: CubeMove): CubeState {
  return rotateFace(state, move.face, move.direction);
}

export function isSolved(state: CubeState): boolean {
  return Object.values(state).every((face) => {
    const firstColor = face[0][0];
    return face.every((row: FaceColor[]) =>
      row.every((color: FaceColor) => color === firstColor)
    );
  });
}

export function getAdjacentFaces(face: FacePosition): FacePosition[] {
  const adjacencyMap: Record<FacePosition, FacePosition[]> = {
    front: ['up', 'right', 'down', 'left'],
    back: ['up', 'left', 'down', 'right'],
    left: ['up', 'front', 'down', 'back'],
    right: ['up', 'back', 'down', 'front'],
    up: ['back', 'right', 'front', 'left'],
    down: ['front', 'right', 'back', 'left'],
  };

  return adjacencyMap[face];
}
