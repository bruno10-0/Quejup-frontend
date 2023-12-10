export const Footer = () => {
  return (
      <footer className="bg-white text-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <p>&copy; 2023 Quej-Up. Todos los derechos reservados.</p>
            <div className="flex space-x-4">
              <a href="#">Política de privacidad</a>
              <a href="#">Términos y condiciones</a>
            </div>
          </div>
        </div>
      </footer>
  );
};
