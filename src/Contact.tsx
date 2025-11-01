function Contact() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <a
          href="/"
          className="text-white bg-gray-700 hover:bg-gray-500 px-4 py-2 rounded-full shadow transition"
        >
          ← Volver
        </a>
      </div>

      <form
        action="https://formsubmit.co/yorbysxd@gmail.com"
        method="POST"
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Contáctame</h2>

        <input type="hidden" name="_captcha" value="false" />
        <input
          type="hidden"
          name="_next"
          value="https://lyq7dk-5173.csb.app/gracias"
        />

        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          required
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <input
          type="email"
          name="email"
          placeholder="Tu correo"
          required
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <textarea
          name="message"
          placeholder="Tu mensaje"
          required
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 h-32"
        />
        <button
          type="submit"
          className="w-full bg-gray-600 hover:bg-gray-400 text-white font-semibold py-2 rounded transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Contact;
