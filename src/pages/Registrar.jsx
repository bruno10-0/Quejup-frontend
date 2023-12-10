import Registrar from '../components/Fromulario.Registro'
import { NavBar2 } from "../components/navBAR2"
export default function Register() {
    return (
        <>
            <div className="flex-row w-full h-auto">
                <NavBar2 />
                <div className='w-full h-16  bg-white'></div>

                <div className='flex'>
                    <div className="w-full flex items-center justify-center lg:w-2/4">
                        <Registrar />
                    </div>
                    <div className="hidden lg:flex h-full w-2/4 items-center justify-center">
                        <img
                            src="https://hablemosdeargentina.com/wp-content/uploads/2018/04/Posadas-Misiones-15.jpg"
                            alt="Mi imagen"
                            style={{ width: '100%', height: 'calc(100vh + 320px)' }}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}