/* eslint-disable react/prop-types */
import { GrStatusCriticalSmall } from 'react-icons/gr'
import { BsHeart } from 'react-icons/bs'
import { BsHeartFill } from 'react-icons/bs'
import { SlLocationPin } from 'react-icons/sl'
import { useEffect, useState } from 'react';
import Modal from "./Modal"
import { mensajeTiempo } from '../functions/calcularTiempo';
import { useAuth } from '../context/authContext';
import { updateQueja } from '../api/auth';

const Publicacion = ({ publicacion }) => {
  //console.log(publicacion);
  const { user } = useAuth();

  const [liked, setLiked] = useState(publicacion.usuariosMegusta && user.id ? publicacion.usuariosMegusta.includes(user.id) : false);
  //console.log(liked);

  const toggleLike = async () => {
    if (!publicacion.usuariosMegusta) {
      publicacion.usuariosMegusta = []; // Inicializa como un array vacío si es null o undefined
    }
  
    if (!liked) {
      // El usuario actual está dando "me gusta" a la publicación
      // Agregar el ID del usuario actual a la matriz publicacion.usuariosMegusta
      publicacion.usuariosMegusta.push(user.id);
    } else {
      // El usuario actual está quitando su "me gusta" de la publicación
      // Filtrar la matriz para eliminar el ID del usuario actual
      publicacion.usuariosMegusta = publicacion.usuariosMegusta.filter((id) => id !== user.id);
    }
  
    // Realiza la solicitud PUT con el objeto de queja
    try {
      const res = await updateQueja(publicacion);
      console.log(res);
    } catch (error) {
      console.log("ERROR:" + error);
    }
  
    setLiked(!liked); // Cambiar el estado liked después de la operación
  };
  

  function obtenerLongitudUsuariosMegusta(publicacion) {
    if (publicacion.usuariosMegusta === null) {
      return 0;
    } else {
      return publicacion.usuariosMegusta.length;
    }
  }

  const longitud = obtenerLongitudUsuariosMegusta(publicacion);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [apiValue, setApiValue] = useState(null);

  useEffect(() => {
    setApiValue(publicacion.estado);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let colorClass = '';
  let message = '';

  switch (apiValue) {
    case 1:
      colorClass = 'text-red-500';
      message = 'Pendiente';
      break;
    case 2:
      colorClass = 'text-yellow-500';
      message = 'En proceso';
      break;
    case 3:
      colorClass = 'text-green-500';
      message = 'Resuelta';
      break;
    default:
      colorClass = 'text-gray-500';
      message = 'Valor desconocido';
  }

  return (

    <div className='h-auto flex justify-center items-center  mb-5'>
      <div className="h-full w-full bg-white overflow-hidden md:w-3/4 border-2 border-gray-300 shadow-blu">
        <div className="flex items-center m-3">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
            <img
              src={user.img_perfil}
              alt="Foto de perfil del usuario"
              className="w-full h-full object-cover"
            />
          </div>
          <div className=''>
            <div className="flex items-center">
              <div className="font-semibold text-base mr-2">{publicacion.Usuario.name}</div>
              <div className="w-1 h-1 rounded-full bg-gray-500 mr-2"></div>
              <div className="text-xs text-gray-500">{mensajeTiempo(publicacion.createdAt)}</div>
            </div>


            <h1 className='text-xs '>{publicacion.titulo}</h1>
          </div>
        </div>

        {/* Imagen de la publicación */}
        <div className="py-4">
          {/* Imagen de la publicación con altura ajustable */}
          <img
            src={publicacion.secure_URL}
            alt="Descripción de la imagen"
            className="w-11/12 md:h-96 m-auto"
          />

        </div>

        {/* Información de la publicación */}
        <div className="px-6 py-4">
          <p className="text-sm">
            {publicacion.cuerpo}
          </p>
        </div>

        {/* Botones de interacción*/}
        <div className="px-6 py-2 flex justify-between items-center">
          {/* Contenedor para las imágenes */}
          <div className="flex">

            {/* Botón de corazón */}
            <div>
              {liked ? (
                <BsHeartFill
                  alt="Me gusta"
                  className="animate-spin w-6 h-6 cursor-pointer text-red-600 transform transition-transform duration-300 hover:scale-125 mr-2"
                  onClick={toggleLike}
                />
              ) : (
                <BsHeart
                  alt="Me gusta"
                  className="w-6 h-6 cursor-pointer text-black transform transition-transform duration-300 hover:scale-125 hover:text-red-500 mr-2"
                  onClick={toggleLike}
                />
              )}
            </div>


            {/* Botón de ubicación */}
            <div onClick={openModal}>
              <SlLocationPin
                alt="Ubicación"
                className="w-6 h-6 cursor-pointer transform transition-transform duration-300 hover:scale-125 hover:text-orange-400 mr-2"
              />
            </div>
          </div>
          <div className='flex'>
            <GrStatusCriticalSmall className={`w-6 h-6 ${colorClass}`} />
            <p className="mx-5text-sm">{message}</p>
          </div>
        </div>
        <div className="h-7 my-3 w-full mb-5">
          <p className='text-base ml-5'>{`${longitud} Me gusta`}</p>
        </div>
      </div>
      <Modal isOpen={modalOpen} closeModal={closeModal} latitud={publicacion.lat} longitud={publicacion.lon} publicacion={publicacion}  />
    </div>

  );
}

export default Publicacion;