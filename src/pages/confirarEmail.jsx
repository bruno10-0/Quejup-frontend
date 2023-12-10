import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
export const ConfirarEmail = () => {

    const navigate = useNavigate();

    const toggletClick = () => {
        navigate("/")
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <AiOutlineMail className="text-blue-500 text-7xl" />
                <p className="font-bold text-3xl text-blue-500 mt-4">Confirma tu correo electrónico</p>
                <p className="text-slate-700 text-center mt-4">
                    Por favor, revisa tu bandeja de entrada y haz clic en el enlace de confirmación que te enviamos a tu dirección de correo electrónico para activar tu cuenta.
                </p>
                <button onClick={toggletClick} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transform hover:scale-110 transition-transform duration-300 ease-in-out">
                    Entendido
                </button>
            </div>
            <Footer />
        </>
    );
};
