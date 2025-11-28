import "./index.css";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import YouTubeFavorites from "./components/YouTubeFavorites";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Fase del efecto de escritura/borrado
  const [phase, setPhase] = useState<"writing" | "erasing">("writing");
  const [cycleKey, setCycleKey] = useState(0);

  // Timings del bloque animado
  const lineCount = 6;
  const writePerLine = 1800;
  const erasePerLine = 1600;
  const pauseAfterWrite = 800;

  const totalWriteTime = lineCount * writePerLine;
  const totalEraseTime = lineCount * erasePerLine;
  const cycleTotal = totalWriteTime + pauseAfterWrite + totalEraseTime;

  useEffect(() => {
    const toErase = setTimeout(() => setPhase("erasing"), totalWriteTime + pauseAfterWrite);
    const toRestart = setTimeout(() => {
      setPhase("writing");
      setCycleKey((k) => k + 1);
    }, cycleTotal);

    return () => {
      clearTimeout(toErase);
      clearTimeout(toRestart);
    };
  }, [cycleKey, totalWriteTime, pauseAfterWrite, cycleTotal]);

  // Fondo de estrellas decorativas
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }, (_, index) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        key: index,
      })),
    []
  );

  const infoItems = [
    { label: "Sobre mí", content: "Soy estudiante y técnico de audio, apasionado por la tecnología." },
    { label: "Cursos", content: "HTML, Diseño 3D, Ofimática, Python, Audio y grabación." },
    { label: "GitHub Org", content: "Frontend en bufferring.org, proyectos open source." },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Fondo de estrellas */}
      {stars.map((star) => (
        <div
          key={star.key}
          className="star"
          style={{ position: "absolute", top: star.top, left: star.left, animationDelay: star.animationDelay }}
          aria-hidden="true"
        />
      ))}

      {/* Header superior */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur border-b border-gray-800">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="font-bold hover:text-cyan-400 transition">
            Yorbys Montilla
          </Link>
          <nav className="flex items-center gap-6" aria-label="Navegación principal">
            <Link to="/contacto" className="hover:text-cyan-400">Contacto</Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-2xl hover:text-cyan-400"
              aria-label={sidebarOpen ? "Cerrar lista de canciones" : "Abrir lista de canciones"}
              aria-expanded={sidebarOpen}
              aria-controls="songs-sidebar"
              type="button"
            >
              🎵
            </button>
          </nav>
        </div>
      </header>

      {/* Sidebar de canciones debajo del header (no tapa contenido) */}
      <aside
        id="songs-sidebar"
        className={`fixed top-14 right-0 w-80 bg-gray-900 z-40 transform transition-transform duration-500 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } max-h-[calc(100%-3.5rem)] overflow-y-auto shadow-lg`}
        aria-label="Lista de canciones"
      >
        <div className="p-6 flex flex-col gap-6">
          <h2 className="text-2xl font-bold">🎵 Lista de reproducción</h2>
          <YouTubeFavorites />
        </div>
      </aside>

      {/* Backdrop para cerrar el panel */}
      {sidebarOpen && (
        <button
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
          aria-label="Cerrar panel"
          type="button"
        />
      )}

      {/* Contenido principal */}
      <main className="flex flex-col items-center justify-start min-h-screen z-10 relative text-center px-4 pt-20">
        <img
          src="/yorbys.jpeg"
          alt="Foto de perfil de Yorbys Montilla"
          className="w-48 h-48 rounded-full border-4 border-white shadow-lg object-cover mb-4"
          loading="lazy"
          width={192}
          height={192}
        />

        <h1 className="text-5xl font-bold mb-2">Yorbys Montilla</h1>
        <p className="text-xl text-gray-300 mb-6">
          Estudiante de ingeniería de sistemas | Explorador del universo digital
        </p>

        {/* Círculos: columna en móvil, fila en escritorio; empujan contenido */}
        <section
          className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mt-8 w-full max-w-3xl justify-center"
          aria-label="Información personal"
        >
          {infoItems.map((item, index) => {
            const isOpen = expandedIndex === index;
            return (
              <div key={item.label} className="flex flex-col items-center w-full md:w-auto">
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                  className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold hover:bg-gray-400 hover:scale-110 transition-all duration-300 shadow-md"
                  aria-expanded={isOpen}
                  aria-controls={`info-panel-${index}`}
                  type="button"
                >
                  {item.label}
                </button>
                {isOpen && (
                  <div
                    id={`info-panel-${index}`}
                    className="mt-4 bg-gray-800 text-sm text-gray-200 p-4 rounded shadow-lg w-full"
                  >
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Botón de contacto */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/contacto"
            className="bg-gray-600 hover:bg-gray-400 text-white font-semibold py-2 px-6 rounded-full transition shadow-md hover:scale-110"
          >
            Contáctame
          </Link>
        </div>

        {/* Terminal con efecto de escritura: legible en móvil */}
        <section className="w-full md:w-2/3 text-left mt-12" aria-label="Bloque de código animado">
          <div className="bg-gray-900 border border-cyan-400 rounded-lg p-4 shadow-xl font-mono text-xs sm:text-sm md:text-base overflow-x-auto break-words">
            <pre
              key={cycleKey}
              className={`typing-block whitespace-pre-wrap leading-relaxed ${phase === "erasing" ? "erasing" : "writing"}`}
              style={
                {
                  "--write-per-line": `${writePerLine}ms`,
                  "--erase-per-line": `${erasePerLine}ms`,
                } as React.CSSProperties
              }
            >
              <span className="typing-line">
                <span className="text-pink-400 neon-text">const</span>{" "}
                <span className="text-green-400 neon-text">yorbys</span>{" "}
                <span className="text-pink-400 neon-text">=</span>{" "}
                <span className="text-yellow-400 neon-text">&#123;</span>
              </span>
              {"\n"}
              <span className="typing-line">
                <span className="text-blue-400 neon-text">frontend</span>:{" "}
                <span className="text-yellow-300 neon-text">"React + Tailwind"</span>,
              </span>
              {"\n"}
              <span className="typing-line">
                <span className="text-blue-400 neon-text">audioTech</span>:{" "}
                <span className="text-yellow-300 neon-text">"Mezcla y grabación profesional"</span>,
              </span>
              {"\n"}
              <span className="typing-line">
                <span className="text-blue-400 neon-text">proyectos</span>:{" "}
                <span className="text-yellow-300 neon-text">["bufferring.org", "portfolios interactivos"]</span>,
              </span>
              {"\n"}
              <span className="typing-line">
                <span className="text-blue-400 neon-text">skills</span>:{" "}
                <span className="text-yellow-300 neon-text">["React", "TypeScript", "APIs públicas"]</span>
              </span>
              {"\n"}
              <span className="typing-line">
                <span className="text-yellow-400 neon-text">&#125;</span>
              </span>
            </pre>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-sm text-gray-400 text-center">
          <div className="flex justify-center space-x-8 mb-4">
            <SocialLink href="https://www.instagram.com/soyyorby" label="Instagram" />
            <SocialLink href="https://github.com/onweb-kym" label="GitHub" />
          </div>
          <p>© {new Date().getFullYear()} Yorbys Montilla. Todos los derechos reservados.</p>
        </footer>
      </main>
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  const icons: Record<string, React.ReactNode> = {
    Instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.88a1.13 1.13 0 1 1-2.26 0 1.13 1.13 0 0 1 2.26 0z" />
      </svg>
    ),
    GitHub: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.6 1.7 2.9 1.2.1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.2a11.7 11.7 0 0 1 6.2 0c2.4-1.5 3.4-1.2 3.4-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-white transition inline-flex items-center gap-2"
      aria-label={label}
      title={label}
    >
      {icons[label] ?? null}
      <span className="sr-only">{label}</span>
    </a>
  );
}

export default App;
