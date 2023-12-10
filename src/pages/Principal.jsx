import { useState, useEffect } from 'react';
import Publicacion from '../components/Publicacion';
import Nav from '../components/Barra.Navegacion';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext'
import {
  getPublicaciones,
  getQuejasInfraestructura,
  getQuejasComunitario,
  getQuejasServicios,
  getQuejasOtro
} from '../api/auth.js';
import { AlDia } from '../components/AlDia.jsx';
import { NoHay } from '../components/noHay';
import { GrRadialSelected, GrRadial } from 'react-icons/gr'

function Principal() {

  const backgroundImageUrl =
    'https://pglex.it/wp-content/uploads/2023/07/PG_soci.png';

  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };



  const [publicacion, setPublicacion] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, filtro, setFiltro } = useAuth();

  const Listado = async () => {
    try {
      switch (filtro) {
        case 1:
          setPublicacion((await getPublicaciones()).data);
          //console.log(publicacion);
          break;
        case 2:
          setPublicacion((await getQuejasInfraestructura()).data);
          //console.log(publicacion);
          break;
        case 3:
          setPublicacion((await getQuejasComunitario()).data);
          //console.log(publicacion);
          break;
        case 4:
          setPublicacion((await getQuejasServicios()).data);
          //console.log(publicacion);
          break;
        case 5:
          setPublicacion((await getQuejasOtro()).data);
          //console.log(publicacion);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarFiltro = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
  };

  useEffect(() => {
    Listado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtro]);


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/ingresar");
    }
  }, [isAuthenticated, navigate]);


  return (
    <>
      <div className=" w-auto h-auto flex justify-center"  style={containerStyle}>

        <Nav />
        <div className='sm:w-screen mb-4 md:mt-0 md:mb-0 md:w-1/2 sm:mt-20  sm:items-center'>

          <div className='bg-transparent w-full h-20 md:hidden'></div>
          {publicacion.map((publicacion) => (
            <Publicacion key={publicacion.id} publicacion={publicacion} />
          ))}
          {publicacion.length > 0 ? <AlDia /> : <NoHay />}
        </div>

        <div className="hidden md:inline-block fixed top-0 right-0 w-52 h-screen  border-2 border-gray-300 shadow-blu p-2 bg-white">
          <h1 className='mt-5 font-bold text-orange-400 text-center text-lg flex '>
            Filtra
            <p className='text-4xl ml-3 text-blue-500'>Quejas</p>
          </h1>
          <div className='h-4/5 w-full my-10 flex flex-col items-center justify-start'>

            <button
              className={`mb-5 w-full h-16 rounded-md flex items-center justify-start hover:scale-105 ${filtro === 1 ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'
                }`}
              onClick={() => actualizarFiltro(1)}
            >
              {filtro === 1 ? <GrRadialSelected className='h-full w-6 ml-2 group-hover:scale-110' /> : <GrRadial className='h-full w-6 ml-2 group-hover:scale-110' />}
              <p className='ml-2'>Todo</p>
            </button>

            <button
              className={`mb-5 w-full h-16 rounded-md flex items-center justify-start hover:scale-105 ${filtro === 2 ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'
                }`}
              onClick={() => actualizarFiltro(2)}
            >
              {filtro === 2 ? <GrRadialSelected className='h-full w-6 ml-2 group-hover:scale-110' /> : <GrRadial className='h-full w-6 ml-2 group-hover:scale-110' />}
              <p className='ml-2'>Infraestructura</p>
            </button>

            <button
              className={`mb-5 w-full h-16 rounded-md flex items-center justify-start hover:scale-105 ${filtro === 3 ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'
                }`}
              onClick={() => actualizarFiltro(3)}
            >
              {filtro === 3 ? <GrRadialSelected className='h-full w-6 ml-2 group-hover:scale-110' /> : <GrRadial className='h-full w-6 ml-2 group-hover:scale-110' />}
              <p className='ml-2'>Comunitario</p>
            </button>

            <button
              className={`mb-5 w-full h-16 rounded-md flex items-center justify-start hover:scale-105 ${filtro === 4 ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'
                }`}
              onClick={() => actualizarFiltro(4)}
            >
              {filtro === 4 ? <GrRadialSelected className='h-full w-6 ml-2 group-hover:scale-110' /> : <GrRadial className='h-full w-6 ml-2 group-hover:scale-110' />}
              <p className='ml-2'>Servicios</p>
            </button>

            <button
              className={`mb-5 w-full h-16 rounded-md flex items-center justify-start hover:scale-105 ${filtro === 5 ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'
                }`}
              onClick={() => actualizarFiltro(5)}
            >
              {filtro === 5 ? <GrRadialSelected className='h-full w-6 ml-2 group-hover:scale-110' /> : <GrRadial className='h-full w-6 ml-2 group-hover:scale-110' />}
              <p className='ml-2'>Otro</p>
            </button>
          </div>

        </div>

      </div>
    </>
  );
}

export default Principal;
