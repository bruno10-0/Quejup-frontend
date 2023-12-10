import axios from "./axios.js";

export const getPublicaciones = () => axios.get("/publicacion");
export const getQuejasInfraestructura = () => axios.get("/publicacionInfraestuctura");
export const getQuejasComunitario = () => axios.get("/publicacionComunitario");
export const getQuejasServicios = () => axios.get("/publicacionServicios");
export const getQuejasOtro = () => axios.get("/publicacionOtro");

export const verificarToken = () => axios.get("/verificacion");
export const verificarEmailConfirmado = (email) => axios.post("/emailConfirmado",email)

export const registrarse = (user) => axios.post("/user", user);
export const iniciarSesion = (user) => axios.post("/user/login", user);
export const setQueja = (formdata) => axios.post("/queja", formdata);
export const cerrarSesion = () => axios.post("/user/logout")

export const updateQueja = (queja) => axios.put("/queja",queja);