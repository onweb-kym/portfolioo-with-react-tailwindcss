import "./index.css";
import { useState } from "react";

function App() {
  const [hoveringCircle, setHoveringCircle] = useState(false);

  // Estrellas animadas
  const stars = Array.from({ length: 100 }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
  }));

  const infoItems = [
    {
      label: "Sobre mí",
      content:
        "Soy estudiante y técnico de audio, apasionado por la tecnología, enfocado en aprender siempre un poco más.",
    },
    {
      label: "Cursos",
      content: "HTML, Diseño 3D, Ofimática, Python, Audio y grabación.",
    },
    {
      label: "GitHub Org",
      content:
        "Miembro de división Frontend en bufferring.org, colaborando en proyectos open source.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Fondo animado de estrellas */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.animationDelay,
          }}
        />
      ))}

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-start min-h-screen z-10 relative text-center px-4 pt-8">
        {/* Imagen de perfil */}
        <img
          src="/yorbys.jpeg"
          alt="Foto de perfil"
          className="w-48 h-48 rounded-full border-4 border-white shadow-lg object-cover mb-4"
        />

        {/* Nombre y título */}
        <h1 className="text-5xl font-bold mb-2">Yorbys Montilla</h1>
        <p className="text-xl text-gray-300 mb-6">
          Estudiante de ingeniería de sistemas | Explorador del universo digital
        </p>

        {/* Círculos interactivos */}
        <div className="flex space-x-6 mt-4">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center relative"
              onMouseEnter={() => setHoveringCircle(true)}
              onMouseLeave={() => setHoveringCircle(false)}
            >
              <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold cursor-pointer hover:bg-gray-400 hover:scale-110 transition-all duration-300 shadow-md">
                {item.label}
              </div>
              <div className="absolute top-24 w-72 bg-gray-800 text-sm text-gray-200 p-4 rounded shadow-lg opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transform origin-top transition-all duration-500">
                {item.content}
              </div>
            </div>
          ))}
        </div>

        {/* Botón de contacto con animación */}
        <div
          className={`mt-8 flex justify-center transition-all duration-500 ${
            hoveringCircle ? "translate-y-20" : ""
          }`}
        >
          <a
            href="/contacto"
            className="bg-gray-600 hover:bg-gray-400 text-white font-semibold py-2 px-6 rounded-full transition shadow-md hover:scale-110"
          >
            Contáctame
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-sm text-gray-400">
          <div className="flex justify-center space-x-8 mb-4">
            {/* Instagram */}
            <SocialLink
              href="https://www.instagram.com/tu_usuario"
              label="Instagram"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.75a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                </svg>
              }
            />

            {/* GitHub */}
            <SocialLink
              href="https://github.com/onweb-kym"
              label="GitHub"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.71.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.61-3.37-1.37-3.37-1.37-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05a9.3 9.3 0 015 0c1.9-1.32 2.74-1.05 2.74-1.05.56 1.4.21 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.26 10.26 0 0022 12.26C22 6.58 17.52 2 12 2z" />
                </svg>
              }
            />
          </div>
          <p>
            © {new Date().getFullYear()} Yorbys Montilla. Todos los derechos
            reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}

// Componente reutilizable para enlaces sociales
function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-blue-400 hover:text-white transition"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

export default App;
