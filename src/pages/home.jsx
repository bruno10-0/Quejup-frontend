import { Link } from "react-router-dom"
import { NavBar2 } from "../components/navBAR2"

export const Bienvenida = () => {
    const backgroundImageUrl =
        'https://cdn1.wonenbijgeno.nl/templates/images-2022/twister-contact.png';

    const containerStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    return (
        <div className="flex-row w-full h-auto" style={containerStyle}>
            <NavBar2 />
            <div className='w-full h-16 bg-white'></div>

            <div className='flex h-screen w-full'>
                <div className='m-auto text-center'>
                    <h1 className='text-6xl font-bold mb-4 text-orange-400'>Bienvenido a <img src="https://res.cloudinary.com/dzemdgvqo/image/upload/v1699554059/resources/lc9kwvzsioeizhgcpyzn.png" alt="Logo" /></h1>
                    <p className='text-xl mb-8'>Donde tu opinión cuenta</p>

                    {/* Puedes agregar más contenido aquí según las características de tu plataforma */}

                    <Link to={'/ingresar'} className='bg-blue-500 text-white py-4 px-4 rounded-lg hover:scale-110 transition-all'>Comienza a compartir tus quejas</Link>
                </div>
            </div>
        </div>
    )
}
