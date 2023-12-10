import { PiNumberCircleOneLight } from "react-icons/pi";
import { PiNumberCircleTwoLight } from "react-icons/pi";
import { PiNumberCircleThreeLight } from "react-icons/pi";
import { PiNumberCircleFourLight } from "react-icons/pi";
import { CiCircleAlert } from "react-icons/ci"
import { SlLocationPin } from 'react-icons/sl';

import { useState, useEffect } from 'react';
import Nav from "../components/Barra.Navegacion";
import { useFormik } from "formik";
import * as Yup from "yup";

import Modal from '../components/Modal';
import { setQueja } from "../api/auth.js"
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/authContext'
import {Cargando} from "../components/Cargando"

export default function Queja() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mostrarCoordenadas, setMostrarCoordenadas] = useState(false);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setSelectedFile(selectedFile);
            setImageUrl(imageUrl);
            formik.handleChange(e);
        }
    };

    const { isAuthenticated, user } = useAuth();
    const formik = useFormik({
        initialValues: {
            opcion: "",
            descripcionProblema: "",
            lat: "",
            lon: "",
            UsuarioId: user.id
        },
        validationSchema: Yup.object({
            opcion: Yup.string().required("No se registro un tipo de queja."),
            imagen: Yup.mixed().test('fileRequired', 'Debe cargar una imagen', (value) => {
                return value !== null && value !== undefined;
            }),
            lon: Yup.string().required("No se registro una Ubicación."),
            lat: Yup.string().required("No se registro una Ubicación."),
            descripcionProblema: Yup.string().required("No se registro una descripcion del problema.")
                .min(20, "La descripción debe ser mayor un poco mayor")
        }),
        onSubmit: async (data) => {
            setIsLoading(true);
            // Crea un nuevo FormData
            const formdata = new FormData();
            // Agrega la imagen
            formdata.append("imagen", selectedFile);
            // Agrega otros datos al FormData, excluyendo "imagen"
            for (const key in data) {
                // eslint-disable-next-line no-prototype-builtins
                if (data.hasOwnProperty(key) && key !== "imagen") {
                    formdata.append(key, data[key]);
                }
            }
            try {
                await setQueja(formdata);
                alert("EXITO: Se subio tú queja.");
                navigate("/inicio");
            } catch (error) {
                console.error("Error al realizar la solicitud:", error);
                alert("ERROR: No se pudo subir tú queja.");
            } finally {
                setIsLoading(false);
                navigate("/inicio");
            }
        }
        ,
    });

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const [coordenadas, setCoordenadas] = useState({ lat: null, lon: null });


    const obtenerCoordenadas = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setCoordenadas({ lat, lon });
                    formik.setFieldValue("lat", lat);
                    formik.setFieldValue("lon", lon);
                    setMostrarCoordenadas(true);
                },
                function (error) {
                    if (error.code === error.PERMISSION_DENIED) {
                        alert("No has permitido el acceso a la ubicación. Por favor, permite el acceso para obtener las coordenadas.");
                    } else {
                        alert("Error al obtener las coordenadas: " + error.message);
                    }
                }
            );
        } else {
            alert("Geolocalización no está disponible en tu navegador.");
        }
    };

    const handleObtenerCoordenadasClick = (event) => {
        event.preventDefault();
        obtenerCoordenadas();
    };

    const navigate = useNavigate();


    useEffect(() => {
        if (!isAuthenticated) {
            return navigate("/ingresar")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])
    return (
        <>

            <div className="w-full h-auto flex justify-around mx-auto md:w-3/4">
                <Nav />
                <div className='w-full h-auto mt-12 mb-4 md:mt-0 md:mb-0 md:w-5/6 md:ml-10 lg:w-9/12 lg:ml-56'>
                    <div className='bg-transparent w-full h-20 md:hidden'></div>
                    <form onSubmit={formik.handleSubmit} className='w-full h-auto flex-col my-1 flex items-center'>
                        {isLoading ? (<Cargando className="fixed top-0 left-0 w-screen h-screen z-50" />) : null}
                        <div>
                            <h1 className="mb-5 text-2xl font-bold text-center text-orange-400 flex">Formulario para Presentación de<p className="text-blue-500 ml-1">Quejas.</p></h1>
                            <h2 className="text-gray-500 my-3">Por favor, completa el formulario con cuidado para que podamos atender tus inquietudes de la mejor manera posible. Tu opinión es importante para nosotros.</h2>
                        </div>


                        <div className="w-full h-14 border-2 rounded-lg  m-5 flex items-center">
                            <PiNumberCircleOneLight className="h-8 w-10 text-orange-400" />
                            <h1 className="text-blue-500 font-bold">Elija el tipo de queja.</h1>
                        </div>

                        <select
                            name="opcion"
                            className="cursor-pointer w-full h-14 border-2 rounded-lg text-blue-500 font-bold"
                            onChange={(e) => {
                                formik.handleChange(e);
                                formik.setFieldValue("opcion", e.target.value);
                            }}
                            value={formik.values.opcion}
                        >
                            <option value="" className="text-blue-500 font-bold">Tipos de queja:</option>
                            <option value="Infraestructura" className="text-blue-500 font-bold">Infraestructura</option>
                            <option value="Comunitario" className="text-blue-500 font-bold">Comunitario</option>
                            <option value="Servicios" className="text-blue-500 font-bold">Servicios</option>
                            <option value="Otro" className="text-blue-500 font-bold">Otro</option>
                        </select>

                        {formik.errors.opcion && (
                            <div className="mt-5 flex items-center w-full h-14 border-2 border-red-600 rounded-lg text-center text-red-600">
                                <CiCircleAlert className="h-8 w-10" />
                                {formik.errors.opcion}</div>
                        )}

                        <div className="w-full h-14 border-2 rounded-lg m-5 flex items-center ">
                            <PiNumberCircleTwoLight className="h-8 w-10 text-orange-400" />
                            <h1 className="text-blue-500 font-bold">Elija la imagen de su publicación </h1>
                        </div>

                        <input
                            className='cursor-pointer'
                            name="imagen"
                            type='file'
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFileChange}
                        />

                        {formik.errors.imagen && (
                            <div className="mt-5 flex items-center w-full h-14 border-2 border-red-600 rounded-lg text-center text-red-600">
                                <CiCircleAlert className="h-8 w-10" />
                                {formik.errors.imagen}</div>
                        )}


                        <div
                            className={`overflow-hidden my-5 flex justify-center items-center w-full h-1/2 rounded-lg md:w-4/5 md:h-1/4 ${imageUrl ? 'block' : 'hidden'}`}>
                            {imageUrl && <img src={imageUrl}
                                alt="Vista previa de la imagen"
                                className='w-full h-full object-cover' />}
                        </div>

                        <div className="w-full h-14 border-2 rounded-lg m-5 flex items-center">
                            <PiNumberCircleThreeLight className="h-8 w-10 text-orange-400" />
                            <h1 className="text-blue-500 font-bold">Coordenadas de la ubicación</h1>

                        </div>
                        {mostrarCoordenadas && (
                            <div
                                className=' bg-blue-500 hover:bg-blue-600 text-white mb-5 flex items-center w-full h-14 border-2 rounded-lg cursor-pointer'
                                onClick={openModal}>
                                <SlLocationPin className='h-7 w-10 text-orange-400' />
                                <div className="flex-1"> {/* Agregamos un div contenedor para el texto */}
                                    <div className="flex items-center justify-center">
                                        <h1 className="font-bold">Ver la ubicación obtenida</h1>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Modal
                            isOpen={modalOpen}
                            closeModal={closeModal}
                            latitud={coordenadas.lat}
                            longitud={coordenadas.lon} />

                        {!mostrarCoordenadas && (
                            <button
                                className="w-full h-14 border-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={handleObtenerCoordenadasClick}
                            >
                                Obtener coordenadas actuales
                            </button>
                        )}
                        {formik.errors.lat && formik.errors.lon && (
                            <div className="mt-5 flex items-center w-full h-14 border-2 border-red-600 rounded-lg  text-red-600">
                                <CiCircleAlert className="h-8 w-10" />
                                <p>{formik.errors.lat}</p>
                            </div>
                        )}
                        <div className="w-full h-14 border-2 rounded-lg m-5 flex items-center ">
                            <PiNumberCircleFourLight className="h-8 w-10 text-orange-400" />
                            <h1 className="text-blue-500 font-bold">Adjunte una descripción detallando el problema</h1>
                        </div>

                        <textarea
                            name="descripcionProblema"
                            rows="4"
                            placeholder="Ingrese la descripción aquí"
                            className="w-full mb-5  p-2 border-2 rounded-lg text-center"
                            onChange={formik.handleChange}
                            value={formik.values.descripcionProblema}
                        ></textarea>


                        {formik.errors.descripcionProblema && (
                            <div className="mb-5 flex items-center w-full h-14 border-2 border-red-600 rounded-lg text-center text-red-600">
                                <CiCircleAlert className="h-8 w-10" />
                                {formik.errors.descripcionProblema}</div>
                        )}

                        {formik.isValid && (
                            <button
                                type="submit"
                                className="mb-10 w-full h-14 border-2 rounded-lg bg-green-500 hover:bg-green-600 text-white md:mb-0 lg:mb-5"
                            >Subir</button>
                        )}

                    </form>
                </div>
            </div>
        </>
    )
}
