import { useNavigate } from "react-router-dom"
import {GiLongLeggedSpider} from "react-icons/gi"
export const NoHay = () => {
  const navigate=useNavigate()

  const handleButton = ()  =>{
    navigate("/queja")
  }

    return (
<aside className="sm:mb-16 md:mb-0 bg-white w-full h-72 flex flex-col items-center justify-center -mt-5 rounded-lg shadow-lg">
  <GiLongLeggedSpider className="text-blue-500 text-5xl m-4" />
  <p className="font-bold text-2xl text-blue-500">No se encontraron publicaciones</p>
  <p className="text-slate-700 text-center">¿Tienes algo que te molesta? Sé el primero en expresar tus quejas y trabajemos juntos para resolverlo.</p>
  <button onClick={handleButton} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 transform hover:scale-105 transition-transform">
    ¡Vamos!
  </button>
</aside>


    )
}
