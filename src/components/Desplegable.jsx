import { AiOutlineClose } from "react-icons/ai"
import { GrRadialSelected, GrRadial } from 'react-icons/gr'
import { useAuth } from "../context/authContext";
// eslint-disable-next-line react/prop-types
export const Desplegable = ({ cerrarDesplegable }) => {
    const { filtro, setFiltro } = useAuth();

    const actualizarFiltro = (nuevoFiltro) => {
        setFiltro(nuevoFiltro);
    };

    return (
        <div className='fixed w-full h-screen bg-slate-200 bg-opacity-60 backdrop-blur-lg z-50 flex flex-col items-center'>
            <nav className=' my-5 flex justify-end w-full h-6'>
                <AiOutlineClose
                    className='mr-5 w-auto h-full cursor-pointer text-red-500'
                    onClick={cerrarDesplegable}
                />
            </nav>
            <div className="flex">
                <h1 className="text-orange-400 text-lg">Filtar</h1>
                <h2 className="text-blue-500 text-3xl ml-2">Quejas</h2>
            </div>


            <button
                className={`w-2/3 h-16 mt-5 rounded-lg flex items-center ${filtro === 1 ? 'bg-blue-600' : 'bg-blue-400'
                    }`}
                onClick={() => actualizarFiltro(1)}
            >
                {filtro === 1 ? <GrRadialSelected className='w-auto h-full p-5 text-white' /> : <GrRadial className='w-auto h-full p-5 text-white' />}
                <h1 className='text-white text-lg hover:scale-100'>Todo</h1>
            </button>

            <button
                className={`w-2/3 h-16 mt-5 rounded-lg flex items-center ${filtro === 2 ? 'bg-blue-600' : 'bg-blue-400'
                    }`}
                onClick={() => actualizarFiltro(2)}
            >
                {filtro ===  2 ? <GrRadialSelected className='w-auto h-full p-5 text-white' /> : <GrRadial className='w-auto h-full p-5 text-white' />}
                <h1 className='text-white text-lg hover:scale-100'>Infraestructura</h1>
            </button>

            <button
                className={`w-2/3 h-16 mt-5 rounded-lg flex items-center ${filtro === 3 ? 'bg-blue-600' : 'bg-blue-400'
                    }`}
                onClick={() => actualizarFiltro(3)}
            >
                {filtro === 3 ? <GrRadialSelected className='w-auto h-full p-5 text-white' /> : <GrRadial className='w-auto h-full p-5 text-white' />}
                <h1 className='text-white text-lg hover:scale-100'>Comunitario</h1>
            </button>

            <button
                className={`w-2/3 h-16 mt-5 rounded-lg flex items-center ${filtro === 4 ? 'bg-blue-600' : 'bg-blue-400'
                    }`}
                onClick={() => actualizarFiltro(4)}
            >
                {filtro === 4 ? <GrRadialSelected className='w-auto h-full p-5 text-white' /> : <GrRadial className='w-auto h-full p-5 text-white' />}
                <h1 className='text-white text-lg hover:scale-100'>Servicios</h1>
            </button>

            <button
                className={`w-2/3 h-16 mt-5 rounded-lg flex items-center ${filtro === 5 ? 'bg-blue-600' : 'bg-blue-400'
                    }`}
                onClick={() => actualizarFiltro(5)}
            >
                {filtro === 5 ? <GrRadialSelected className='w-auto h-full p-5 text-white' /> : <GrRadial className='w-auto h-full p-5 text-white' />}
                <h1 className='text-white text-lg hover:scale-100'>Otro</h1>
            </button>
        </div>

    );
};
