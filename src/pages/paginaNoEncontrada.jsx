import { BiSolidErrorAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom'; 
import {Footer} from "../components/Footer"
export const PaginaNoEncontrada = () => {
    return (
        <>
        <div className="h-screen flex flex-col justify-center items-center text-center">
          <BiSolidErrorAlt className="text-red-500 text-6xl" />
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">Página no encontrada</h1>
          <p className="text-gray-700 mb-4">Lo sentimos, la página que estás buscando no existe.</p>
          <Link to="/" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Ir a la página de inicio
          </Link>
        </div>
        <Footer/>
        </>
      );
}
