import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/authContext"
import {Cargando} from "./components/Cargando"
export default function RutaProtegida() {
  
  const { isAuthenticated,cargando } = useAuth()

  if(cargando) return <Cargando/>

  if (!cargando && !isAuthenticated) {
    return <Navigate to='/' replace/>
  }

  return (
    <Outlet />
  )
}