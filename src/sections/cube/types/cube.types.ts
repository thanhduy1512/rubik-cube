export type FaceColor =
  | 'white'
  | 'yellow'
  | 'red'
  | 'orange'
  | 'blue'
  | 'green';

export type FacePosition = 'front' | 'back' | 'left' | 'right' | 'up' | 'down';

export type MoveDirection = 'clockwise' | 'counterclockwise';

export interface CubeMove {
  face: FacePosition;
  direction: MoveDirection;
  layer?: number; // For slice moves
}

export interface CubeState {
  front: FaceColor[][];
  back: FaceColor[][];
  left: FaceColor[][];
  right: FaceColor[][];
  up: FaceColor[][];
  down: FaceColor[][];
}

export interface CubePiece {
  position: {
    x: number;
    y: number;
    z: number;
  };
  colors: {
    front?: FaceColor;
    back?: FaceColor;
    left?: FaceColor;
    right?: FaceColor;
    up?: FaceColor;
    down?: FaceColor;
  };
}
