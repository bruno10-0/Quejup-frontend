/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {createCustomIcon} from "../functions/custonIcon.js"
const Modal = ({ isOpen, closeModal, latitud, longitud, publicacion }) => {

  return (
    <>
      {isOpen && (
        <div className="bg-gray-500 bg-opacity-50 backdrop-blur-lg fixed inset-0 flex items-center justify-center z-50 w-full h-full">
          <div className="w-full lg:w-3/4 relative"> {/* Cambiamos relative para que el botón de cerrar esté posicionado con respecto a este div */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-1"
              >
                X
              </button>
              <div className="bg-black p-4 text-white text-center">
                <h2 className="text-2xl font-semibold text-white">Ubicación</h2>
              </div>
              <div className='w-full h-96'>
                <MapContainer
                  center={[latitud, longitud]}
                  zoom={20}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  <Marker position={[latitud, longitud]} icon={createCustomIcon(publicacion)}>
                    
                  </Marker>
                </MapContainer>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
