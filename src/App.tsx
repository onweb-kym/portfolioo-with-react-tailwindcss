import "./index.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [hoveringCircle, setHoveringCircle] = useState(false);

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

        <footer className="mt-24 text-sm text-gray-400">
          <div className="flex justify-center space-x-8 mb-4">
            <SocialLink
              href="https://www.instagram.com/tu_usuario"
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
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-white transition font-medium"
    >
      {label}
    </a>
  );
}

export default App;
