import { useState } from "react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("https://api-inventory-dashboard.onrender.com/auth/login", { email, password });

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Email ou senha inválidos!");
      } else {
        console.error(error);
        alert("Erro ao conectar ao servidor.");
      }
    }
  }

  function entrarComoConvidado() {
    navigate("/dashboard");
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

          <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>

          <form 
            className="space-y-6 flex flex-col items-center w-full"
            onSubmit={handleSubmit}
          >

            {/* Input Email */}
            <div className="w-full max-w-sm">
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="flex items-center bg-white/10 border border-white/30 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-900 transition">
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

            {/* Input Senha */}
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

            {/* Botão Entrar */}
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
              Entrar
            </button>

            <p className="w-full max-w-sm text-center text-white/70 text-base">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-white underline">
                Registre-se aqui
              </Link>
            </p>

            {/* Botão Convidado */}
            <button
              type="button"
              onClick={entrarComoConvidado}
              className="
                w-full max-w-sm py-3 rounded-xl
                bg-linear-to-r from-[#30375c] to-[#171A57]
                text-white font-semibold
                transform transition-all duration-150
                hover:scale-105 hover:shadow-2xl hover:from-[#464c69] hover:to-[#171A57]
                active:scale-95 
              "
            >
              Convidado
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}











