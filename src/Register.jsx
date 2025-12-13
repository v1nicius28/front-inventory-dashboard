import { useState } from "react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("https://api-inventory-dashboard.onrender.com/auth/register", { name, email, password });

      const { data } = await axios.post("https://api-inventory-dashboard.onrender.com/auth/login", { email, password });

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        alert(`Erro: ${error.response.data.message || "Algo deu errado!"}`);
      } else {
        console.error(error);
        alert("Erro ao conectar ao servidor.");
      }
    }
  }

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle,#171A57_0%,#060B26_100%)] fixed inset-0 flex justify-center items-center">
      
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="
          w-11/12 max-w-[1100px]
          h-[60vh] sm:h-[65vh] md:h-[70vh]
          rounded-2xl shadow-2xl
          bg-linear-to-br from-[#0F123B]
          from-0% via-[#090D2E] via-59%
          to-[#020515] to-100%"
          ></div>
      </div>

      <div className="relative z-10 w-11/12 sm:w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="backdrop-blur-xl bg-linear-to-bl from-transparent to-white/10
                        radial-border 
                        p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl text-white">

          <h2 className="text-3xl font-semibold text-center mb-6">Registrar</h2>

          <form className="space-y-6 flex flex-col items-center w-full" onSubmit={handleSubmit}>

            {/* Nome */}
            <div className="w-full max-w-sm">
              <label className="block text-sm font-medium mb-1">Nome</label>
              <div className="flex items-center bg-white/10 border border-white/30 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-900 transition">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome"
                  className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
                  required
                />
                <UserIcon className="w-5 h-5 text-white/70 ml-2" />
              </div>
            </div>

            {/* Email */}
            <div className="w-full max-w-sm">
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="flex items-center bg-white/10 border border-white/30 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-900 transition w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
                  required
                />
                <EnvelopeIcon className="w-5 h-5 text-white/70 ml-2" />
              </div>
            </div>

            {/* Senha */}
            <div className="w-full max-w-sm">
              <label className="block text-sm font-medium mb-1">Senha</label>
              <div className="flex items-center bg-white/10 border border-white/30 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-900 transition">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Botão Registrar */}
            <button
              type="submit"
              className="
                w-full max-w-sm py-3 mt-6 rounded-xl
                bg-linear-to-r from-[#30375c] to-[#171A57]
                text-white font-semibold
                transform transition-all duration-150
                hover:scale-105 hover:shadow-2xl hover:from-[#464c69] hover:to-[#171A57]
                active:scale-95 
              "
            >
              Registrar
            </button>

            {/* Link para login */}
            <p className="w-full max-w-sm text-center text-white/70 text-base">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-white underline">
                Faça login
              </Link>
            </p>

          </form>

        </div>
      </div>
    </div>
  );
}


