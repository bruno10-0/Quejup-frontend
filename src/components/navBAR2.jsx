import { BsArrowUpRight } from "react-icons/bs"
import { Link } from "react-router-dom"
export const NavBar2 = () => {
    return (
        <nav className="w-full h-16 bg-white bg-opacity-60 backdrop-blur-lg flex justify-between items-center fixed z-20">
            <Link to={'/'} className="w-1/4 h-16 flex items-center">
                <img
                    src="https://res.cloudinary.com/dzemdgvqo/image/upload/v1699554059/resources/lc9kwvzsioeizhgcpyzn.png"
                    alt="Logo"
                    className="hidden sm:block m-2 h-3/4 w-auto"
                />
                <img
                    src="https://res.cloudinary.com/dzemdgvqo/image/upload/v1699554522/resources/sqjg04rk2maydinoc5gh.png"
                    alt="Logo"
                    className="sm:hidden m-2 h-3/4 w-auto"
                />
            </Link>

            <div className="flex justify-around items-center">
                <Link to={'/ingresar'} className="h-3/4 font-semibold flex items-center mx-2 p-2 text-blue-500 border-b-2 border-transparent hover:border-blue-500 transition">
                    Iniciar sesión
                    <BsArrowUpRight className="ml-1" />
                </Link>

                <Link to={'/registrar'} className="h-3/4 font-semibold flex items-center border-2 mx-2 p-2 hover:bg-orange-400 hover:text-white text-blue-500 rounded-lg border-blue-500 hover:border-white">
                    Registrarme
                    <BsArrowUpRight className="ml-1" />
                </Link>
            </div>
        </nav>
    )
}
