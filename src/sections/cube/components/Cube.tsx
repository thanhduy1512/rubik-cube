import React, { useRef, useEffect } from 'react';
import { CubeState } from '../types/cube.types';
import { FACE_COLORS } from '../constants/cube.constants';

interface CubeProps {
  state: CubeState;
  onFaceClick?: (face: string, row: number, col: number) => void;
}

export const Cube: React.FC<CubeProps> = ({ state, onFaceClick }) => {
  const [rotation, setRotation] = React.useState({ x: -20, y: -30 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [startPosition, setStartPosition] = React.useState({ x: 0, y: 0 });
  const cubeRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPosition.x;
    const deltaY = e.clientY - startPosition.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));

    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const renderFace = (face: string, colors: string[][]) => {
    const transformClasses = {
      front: 'translate-z-[75px] sm:translate-z-[60px] md:translate-z-[75px]',
      back: 'translate-z-[-75px] sm:translate-z-[-60px] md:translate-z-[-75px] rotate-y-180',
      left: 'translate-x-[-75px] sm:translate-x-[-60px] md:translate-x-[-75px] rotate-y-[-90deg]',
      right:
        'translate-x-[75px] sm:translate-x-[60px] md:translate-x-[75px] rotate-y-[90deg]',
      up: 'translate-y-[-75px] sm:translate-y-[-60px] md:translate-y-[-75px] rotate-x-[90deg]',
      down: 'translate-y-[75px] sm:translate-y-[60px] md:translate-y-[75px] rotate-x-[-90deg]',
    };

    return (
      <div
        className={`absolute w-[150px] sm:w-[175px] md:w-[200px] h-[150px] sm:h-[175px] md:h-[200px] border-2 border-black bg-black/10 ${
          transformClasses[face as keyof typeof transformClasses]
        }`}
      >
        {colors.map((row, rowIndex) => (
          <div key={rowIndex} className='flex justify-between p-1'>
            {row.map((color, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className='w-[45px] sm:w-[52px] md:w-[60px] h-[45px] sm:h-[52px] md:h-[60px] border-2 border-black cursor-pointer transition-transform hover:scale-110'
                style={{
                  backgroundColor:
                    FACE_COLORS[color as keyof typeof FACE_COLORS],
                }}
                onClick={() => onFaceClick?.(face, rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] h-[400px] sm:h-[500px] md:h-[600px] mx-auto my-8 perspective-1000 border-4 border-gray-800 rounded-lg bg-gray-200 p-4 sm:p-6 md:p-8 flex items-center justify-center'>
      <div
        ref={cubeRef}
        className='relative w-[300px] sm:w-[350px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[400px] preserve-3d'
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {renderFace('front', state.front)}
        {renderFace('back', state.back)}
        {renderFace('left', state.left)}
        {renderFace('right', state.right)}
        {renderFace('up', state.up)}
        {renderFace('down', state.down)}
      </div>
    </div>
  );
};
