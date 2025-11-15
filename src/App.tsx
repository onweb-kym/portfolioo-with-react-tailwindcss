import "./index.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import YouTubeFavorites from "./components/YouTubeFavorites"; // Componente de músicas favoritas

function App() {
  const [hoveringCircle, setHoveringCircle] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para abrir/cerrar sidebar

  const stars = Array.from({ length: 100 }, (_, index) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    key: index,
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
      {/* Fondo de estrellas */}
      {stars.map((star) => (
        <div
          key={star.key}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.animationDelay,
          }}
        />
      ))}

      {/* Botón hamburguesa */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-50 p-2 bg-gray-700 rounded hover:bg-gray-500 transition"
        aria-label="Abrir barra lateral"
      >
        <div className="space-y-1">
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-6 h-0.5 bg-white" />
        </div>
      </button>

      {/* Barra lateral */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 z-40 transform transition-transform duration-500 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto shadow-lg`}
      >
        <div className="p-6 flex flex-col items-center text-center pl-14">
          <h2 className="text-2xl font-bold mb-4"> 🎵 Gaitas Favoritas</h2>
          <YouTubeFavorites />
        </div>
      </aside>

      {/* Capa oscura al abrir sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenido principal */}
      <div className="flex flex-col items-center justify-start min-h-screen z-10 relative text-center px-4 pt-8">
        <img
          src="/yorbys.jpeg"
          alt="Foto de perfil"
          className="w-48 h-48 rounded-full border-4 border-white shadow-lg object-cover mb-4"
        />

        <h1 className="text-5xl font-bold mb-2">Yorbys Montilla</h1>
        <p className="text-xl text-gray-300 mb-6">
          Estudiante de ingeniería de sistemas | Explorador del universo digital
        </p>

        {/* Botones circulares con información */}
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

        {/* Botón de contacto. */}
        <div
          className={`mt-8 flex justify-center transition-all duration-500 ${
            hoveringCircle ? "translate-y-20" : ""
          }`}
        >
          <Link
            to="/contacto"
            className="bg-gray-600 hover:bg-gray-400 text-white font-semibold py-2 px-6 rounded-full transition shadow-md hover:scale-110"
          >
            Contáctame
          </Link>
        </div>

        {/* Footer con redes sociales */}
        <footer className="mt-24 text-sm text-gray-400">
          <div className="flex justify-center space-x-8 mb-4">
            <SocialLink
              href="https://www.instagram.com/soyyorby"
              label="Instagram"
            />
            <SocialLink href="https://github.com/onweb-kym" label="GitHub" />
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

function SocialLink({ href, label }: { href: string; label: string }) {
  const icons: Record<string, JSX.Element> = {
    Instagram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.88a1.13 1.13 0 1 1-2.26 0 1.13 1.13 0 0 1 2.26 0z" />
      </svg>
    ),
    GitHub: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.6 1.7 2.9 1.2.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.2a11.7 11.7 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-white transition"
      aria-label={label}
    >
      {icons[label]}
    </a>
  );
}

export default App;
