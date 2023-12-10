import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const ValidatedMessage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-green-100">
      <FaCheck className="text-green-500 text-7xl" />
      <p className="font-bold text-3xl text-green-500 mt-4">Cuenta Validada</p>
      <p className="text-slate-700 text-center mt-4">
        ¡Felicidades! Tu cuenta ha sido exitosamente validada.
      </p>
      <button
        onClick={handleButtonClick}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transform hover:scale-110 transition-transform duration-300 ease-in-out"
      >
        ¡GENIAL!
      </button>
    </div>
  );
};

export default ValidatedMessage;
