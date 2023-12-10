import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from "react-router-dom"
import {Cargando} from '../components/Cargando';
export default function Form() {


  const { singUp, errors: RegisterErrors, registro, SetRegistro, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  

  //set campos del formulario
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      password2: "",
    },
    //validacion
    validationSchema: Yup.object({
      name: Yup.string().required("Debe ingresar su Nombre"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "El número de teléfono debe contener 10 dígitos")
        .required("Debe ingresar su número de teléfono"),
      email: Yup.string()
        .email("Debe ingresar un correo electrónico válido")
        .required("Debe ingresar su correo")
        .matches(
          /^(?=.*[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|icloud)\.(com|es|co|uk|...))/,
          "Ingrese una dirección de correo electrónico válido (gmail, hotmail, outlook, icloud)"
        ),
      password: Yup.string()
        .required("Debe ingresar su contraseña")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
        )
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
      password2: Yup.string()
        .required("Debe confirmar su contraseña")
        .oneOf(
          [Yup.ref("password"), null],
          "Las contraseñas deben coincidir"
        ),
    }),
    //Evento submit
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await singUp(values);
      } catch (error) {
        setIsLoading(false);
        console.log("Ocurrió un error inesperado: " + error);
      }
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (registro) {
      navigate('/confirmarEmail');
      SetRegistro(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registro]);
  //Funcion para la barra de que indica la seguridad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) {
      strength += 30;
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      strength += 30;
    }

    if (/\d/.test(password)) {
      strength += 20;
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength += 20;
    }

    return strength;
  };

  // Esta función maneja eventos de cambio en el campo de contraseña del formulario.
  const handlePasswordChange = (event) => {
    // Extraer el valor de la contraseña ingresada por el usuario.
    const password = event.target.value;

    // Calcular la fortaleza de la contraseña y almacenarla en 'strength'.
    const strength = calculatePasswordStrength(password);

    // Actualizar el estado interno con la fortaleza calculada para mostrar al usuario.
    setPasswordStrength(strength);

    // Utilizar 'formik' para gestionar el cambio en el valor del campo del formulario.
    formik.handleChange(event);
  };
  useEffect(() => {
    if (isAuthenticated) {
      return navigate("/inicio")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])
  //formulario:

  return (

    <form onSubmit={formik.handleSubmit} className="h-auto">
      {isLoading ? (<Cargando className="fixed top-0 left-0 w-screen h-screen z-50" />) : null}
      <div className=" px-20">
      <h1 className="font-bold text-center text-5xl text-orange-400">Registro</h1> 
        <p className="font-medium text-lg text-gray-500 mt-5 text-center">
          A continuación, ingrese sus datos:
        </p>
        <div className="mt-8">
          <div>
            <label className="text-lg font-medium">Nombre</label>
            <input
              type="text"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Ingrese su nombre"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600 mt-2">{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <label className="text-lg font-medium">Correo electronico</label>
            <input
              type="text"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Ingrese su correo electronico."
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 mt-2">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label className="text-lg font-medium">Numero de celular</label>
            <input
              type="number"
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Ingrese su numero de telefono."
              name="phoneNumber"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-600 mt-2">{formik.errors.phoneNumber}</div>
            ) : null}
          </div>

          <div>
            <label className="text-lg font-medium">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Ingrese su contraseña."
                name="password"
                onChange={handlePasswordChange} // Utiliza handlePasswordChange para calcular la fortaleza
                value={formik.values.password}
              />
              <button
                type="button"
                className="absolute right-4 top-6 text-gray-600 hover:text-gray-900"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600 mt-2">
                {formik.errors.password}
              </div>
            ) : null}
            <div className="mt-2"></div>
          </div>

          <div>
            <label className="text-lg font-medium">Confirmar Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Repita su contraseña."
                name="password2"
                onChange={formik.handleChange}
                value={formik.values.password2}
              />

              <div className="m-5 text-sm text-gray-600">
                Fortaleza de la contraseña:
              </div>
              <div className="w-full h-2 mt-1 bg-gray-300 rounded-full">
                <div
                  className={`h-full rounded-full ${strengthColor(
                    passwordStrength
                  )}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
              <button
                type="button"
                className="absolute right-4 top-6 text-gray-600 hover:text-gray-900"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {formik.touched.password2 && formik.errors.password2 ? (
              <div className="text-red-600 mt-2">
                {formik.errors.password2}
              </div>
            ) : null}
          </div>
          {RegisterErrors && <div className="text-red-600 my-5">{RegisterErrors}</div>}
          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all  py-3 rounded-xl  bg-blue-500 text-white text-lg font-bold  hover:bg-blue-600"
            >
              Registrarme
            </button>
          </div>
          <div className="mt-8 pb-5 flex justify-center items-center">
            <p className="font-medium text-base">¿Ya tienes una cuenta?</p>
            <Link to={'/ingresar'} className="text-blue-400 text-base font-medium ml-2 hover:text-blue-600">Ingresar</Link>
          </div>
        </div>
      </div>
    </form>
  );
}
// Función para determinar el color de la barra de fortaleza de la contraseña
function strengthColor(strength) {
  if (strength >= 70) {
    return "bg-green-500";
  } else if (strength >= 40) {
    return "bg-yellow-500";
  } else {
    return "bg-red-500";
  }
}
