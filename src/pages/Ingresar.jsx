import Ingresar from "../components/Formulario.Ingreso";
import { NavBar2 } from "../components/navBAR2";
export default function Login_Logo() {
  return (
    <>
      <div className="flex-row w-full h-auto">
        <NavBar2 />
        <div className="w-full h-16  bg-white"></div>

        <div className="flex">
          <div className="w-full flex items-center justify-center lg:w-1/2">
            <Ingresar />
          </div>
          <div className="hidden lg:flex h-full w-2/4 items-center justify-center">
            <img
              src="https://radiotupambae.com.ar/wp-content/uploads/2023/07/turismo-posadas-2-1.jpeg"
              alt="imagen"
              style={{ width: "100%", height: "calc(86vh + 30px)" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
