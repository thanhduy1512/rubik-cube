import { Cube } from './sections/cube/components/Cube';
import { useCube } from './sections/cube/hooks/useCube';
import { FacePosition } from './sections/cube/types/cube.types';

function App() {
  const { cubeState, makeMove, resetCube, undoMove, isSolved } = useCube();

  const handleFaceClick = (face: string) => {
    makeMove({
      face: face as FacePosition,
      direction: 'clockwise',
    });
  };

  return (
    <div className='w-full h-full bg-gray-100 flex flex-col items-center justify-center'>
      <div className='w-full max-w-4xl mx-auto text-center'>
        <h1 className='text-4xl font-bold text-gray-800 mb-8'>Rubik's Cube</h1>
        <div className='flex justify-center'>
          <Cube state={cubeState} onFaceClick={handleFaceClick} />
        </div>
        <div className='flex flex-wrap gap-4 justify-center my-8'>
          <button
            onClick={() => makeMove({ face: 'front', direction: 'clockwise' })}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
          >
            Rotate Front
          </button>
          <button
            onClick={() => makeMove({ face: 'back', direction: 'clockwise' })}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
          >
            Rotate Back
          </button>
          <button
            onClick={() => makeMove({ face: 'left', direction: 'clockwise' })}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
          >
            Rotate Left
          </button>
          <button
            onClick={() => makeMove({ face: 'right', direction: 'clockwise' })}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
          >
            Rotate Right
          </button>
          <button
            onClick={() => makeMove({ face: 'up', direction: 'clockwise' })}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
          >
            Rotate Up
          </button>
          <button
            onClick={() => makeMove({ face: 'down', direction: 'clockwise' })}
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
          >
            Rotate Down
          </button>
          <button
            onClick={undoMove}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
          >
            Undo
          </button>
          <button
            onClick={resetCube}
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
          >
            Reset
          </button>
        </div>
        {isSolved && (
          <div className='mt-8 p-4 bg-green-500 text-white rounded animate-fade-in'>
            Cube is solved! 🎉
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
