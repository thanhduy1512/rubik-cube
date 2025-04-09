import { useState, useCallback } from 'react';
import { CubeState, CubeMove, FaceColor } from '../types/cube.types';
import { INITIAL_CUBE_STATE, FACE_COLORS } from '../constants/cube.constants';
import { applyMove, isSolved } from '../utils/cube.utils';

export const useCube = () => {
  const [cubeState, setCubeState] = useState<CubeState>(INITIAL_CUBE_STATE);
  const [moveHistory, setMoveHistory] = useState<CubeMove[]>([]);

  const makeMove = useCallback((move: CubeMove) => {
    setCubeState((prevState) => {
      const newState = applyMove(prevState, move);
      setMoveHistory((prev) => [...prev, move]);
      return newState;
    });
  }, []);

  const resetCube = useCallback(() => {
    setCubeState(INITIAL_CUBE_STATE);
    setMoveHistory([]);
  }, []);

  const undoMove = useCallback(() => {
    if (moveHistory.length === 0) return;

    setMoveHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
    });

    setCubeState(() => {
      let currentState = INITIAL_CUBE_STATE;
      moveHistory.slice(0, -1).forEach((move) => {
        currentState = applyMove(currentState, move);
      });
      return currentState;
    });
  }, [moveHistory]);

  const rotateFace = (face: string, row: number, col: number) => {
    setCubeState((prevState) => {
      const newState = { ...prevState };
      const currentColor = newState[face as keyof CubeState][row][col];
      const colors = Object.keys(FACE_COLORS) as FaceColor[];
      const currentIndex = colors.indexOf(currentColor as FaceColor);
      const nextIndex = (currentIndex + 1) % colors.length;
      const nextColor = colors[nextIndex];

      const newFace = [...newState[face as keyof CubeState]];
      newFace[row] = [...newFace[row]];
      newFace[row][col] = nextColor;

      return {
        ...newState,
        [face]: newFace,
      };
    });
  };

  return {
    cubeState,
    moveHistory,
    makeMove,
    resetCube,
    undoMove,
    isSolved: isSolved(cubeState),
    rotateFace,
  };
};
