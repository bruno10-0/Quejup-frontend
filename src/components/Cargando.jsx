import { ImSpinner9 } from 'react-icons/im';

export const Cargando = () => {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-700 bg-opacity-60 backdrop-blur-lg z-50'>
      <div className='flex items-center px-8 py-3 bg-slate-900 rounded-lg'>
        <ImSpinner9 className='w-10 h-10 animate-spin text-blue-500 mr-6' />
        <p className='text-white text-4xl'>Cargando...</p>
      </div>
    </div>
  );
}

