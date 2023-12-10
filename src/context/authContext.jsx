import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie"
import { registrarse, iniciarSesion, verificarToken, cerrarSesion, verificarEmailConfirmado } from "../api/auth.js";
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar dentro del AuthProvider");
    } else {
        return context;
    }
}
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [cargando, setCargando] = useState(true)
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setError] = useState(null)
    const [registro,SetRegistro] = useState(false)
    const [filtro, setFiltro] = useState(1);    

    const singUp = async (user) => {
        try {
            await registrarse(user);
            SetRegistro(true);
          } catch (error) {
            setError(error.response.data.error);
            SetRegistro(false);
          }    
    };

    const singIn = async (user) => {
        try {
            const res = await verificarEmailConfirmado(user);
            if (res.data.result === true) {
  
                const res = await iniciarSesion(user); // email y contraseña
                setUser(res.data);
                setIsAuthenticated(true);
            } else {
                return; 
            }
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    const logOut = async () => {
        try {
            const response = await cerrarSesion();
            if (response.status === 200) {
                setUser(null);
                setIsAuthenticated(null)
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };


    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setError(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false);
                setUser(null)
                setCargando(false)
                return;
            }
            try {
                const res = await verificarToken(cookies.token)

                if (!res.data) {
                    setIsAuthenticated(false);
                    setUser(null);
                    setCargando(false)
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setCargando(false)


            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setCargando(false)
            }

        }
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={{
            singIn,
            singUp,
            user,
            errors,
            isAuthenticated,
            cargando,
            logOut,
            registro,
            SetRegistro,
            filtro,
            setFiltro
        }}>
            {children}
        </AuthContext.Provider >
    )

}