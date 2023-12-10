import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Nav from '../components/Barra.Navegacion';
import { useState, useEffect } from 'react';
import { createCustomIcon } from "../functions/custonIcon.js"
import {
  getPublicaciones,
  getQuejasInfraestructura,
  getQuejasComunitario,
  getQuejasServicios,
  getQuejasOtro
} from '../api/auth.js';
import { useAuth } from '../context/authContext.jsx';

export const Mapa = () => {
  const posadasCoordinates = [-27.3671, -55.8961]; // Coordenadas de Posadas, Misiones, Argentina
  const [markerCoordinates, setMarkerCoordinates] = useState([]);
  const { filtro, setFiltro } = useAuth();

  const Listado = async () => {
    try {
      switch (filtro) {
        case 1:
          setMarkerCoordinates((await getPublicaciones()).data);
          break;
        case 2:
          setMarkerCoordinates((await getQuejasInfraestructura()).data);
          break;
        case 3:
          setMarkerCoordinates((await getQuejasComunitario()).data);
          break;
        case 4:
          setMarkerCoordinates((await getQuejasServicios()).data);
          break;
        case 5:
          setMarkerCoordinates((await getQuejasOtro()).data);
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

  return (
    <div className="w-auto h-auto flex">
      <Nav />
      <div className="w-full h-screen md:flex">
        <div className="w-full h-20 md:hidden"></div>
        <div className="hidden md:block w-12 h-full lg:w-2/12"></div>
        <div className="w-full h-full md:mx-auto md:w-11/12 lg:w-4/5">
          <div className='hidden md:flex md:w-full h-10 justify-between items-center my-1 border-2 rounded-lg '>

            <button
              className={`h-full w-1/5 rounded-md flex justify-center items-center ${filtro === 1 ? 'bg-blue-100' :null
                }`}
              onClick={() => actualizarFiltro(1)}
            >
              <img
                src="https://res.cloudinary.com/dzemdgvqo/image/upload/v1699558874/resources/qiemxfgznvtczn7arord.png"
                alt=""
                className='h-full w-auto'
              />
              <p>Todo</p>
            </button>

            <button
              className={`h-full w-1/5 rounded-md flex justify-center items-center ${filtro === 2 ? 'bg-blue-100' :null
            }`}
              onClick={() => actualizarFiltro(2)}
            >
              <img
                src="https://res.cloudinary.com/dzemdgvqo/image/upload/v1699553250/resources/vefmcfkikelooasz5nvd.png"
                alt=""
                className='h-full w-auto'
              />
              <p>Infraestructura</p>
            </button>

            <button
              className={`h-full w-1/5 rounded-md flex justify-center items-center ${filtro === 3 ? 'bg-blue-100' :null
            }`}
              onClick={() => actualizarFiltro(3)}
            >
              <img
                src="https://res.cloudinary.com/dzemdgvqo/image/upload/v1699553250/resources/kfht1h0vfzqtiwvsg69f.png"
                alt=""
                className='h-full w-auto'
              />
              <p>Comunitario</p>
            </button>

            <button
             className={`h-full w-1/5 rounded-md flex justify-center items-center ${filtro === 4 ? 'bg-blue-100' :null
            }`}
              onClick={() => actualizarFiltro(4)}
            >
              <img
                src="https://res.cloudinary.com/dzemdgvqo/image/upload/v1699553250/resources/or2jtgccqrlpbvplvlmx.png"
                alt=""
                className='h-full w-auto'
              />
              <p>Servicios</p>
            </button>

            <button
             className={`h-full w-1/5 rounded-md flex justify-center items-center ${filtro === 5 ? 'bg-blue-100' :null
            }`}
              onClick={() => actualizarFiltro(5)}
            >
              <img
                src="https://res.cloudinary.com/dzemdgvqo/image/upload/v1699553250/resources/uur2w8klqlfslgn8p1dn.png"
                alt=""
                className='h-full w-auto'
              />
              <p>Otro</p>
            </button>
          </div>
          <MapContainer
            center={posadasCoordinates}
            zoom={12}
            style={{ width: '100%', height: '90%', position: 'relative', zIndex: 10 }}
          >

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {markerCoordinates.map((ubi) => (
              <Marker key={ubi.id} position={[ubi.lat, ubi.lon]} icon={createCustomIcon(ubi)}>
                <Popup>
                  Tipo: {ubi.titulo}
                  <br />
                  Usuario: {ubi.Usuario.name}
                  <br />
                  Celular: {ubi.Usuario.phoneNumber}
                </Popup>
              </Marker>
            ))}

          </MapContainer>
        </div>
      </div>
    </div>
  );
};
