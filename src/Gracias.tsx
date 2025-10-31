function Gracias() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        ¡Mensaje enviado exitosamente!
      </h1>
      <p className="text-lg mb-6 text-center">
        Gracias por contactarme. Te responderé pronto.
      </p>
      <a
        href="/"
        className="bg-gray-600 hover:bg-gray-400 text-white font-semibold py-2 px-6 rounded-full transition shadow-md hover:scale-110"
      >
        Volver al inicio
      </a>
    </div>
  );
}

export default Gracias;
