import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  PlusCircleIcon,
  ArrowUpCircleIcon,
  XCircleIcon,
  ArrowLeftStartOnRectangleIcon,
  PencilSquareIcon,
  TrashIcon,
  TagIcon,
  CubeIcon,
  Squares2X2Icon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export default function Dashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    brand: "",
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://api-inventory-dashboard.onrender.com/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bodyData = {
      ...form,
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity),
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, bodyData);
      } else {
        await axios.post(API_URL, bodyData);
      }

      setForm({ name: "", price: "", quantity: "", category: "", brand: "" });
      setEditingId(null);

      const { data } = await axios.get(API_URL);
      setProducts(data);
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      brand: product.brand,
    });
    setEditingId(product.id);
  };

  const handleCancelEdit = () => {
    setForm({ name: "", price: "", quantity: "", category: "", brand: "" });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const { data } = await axios.get(API_URL);
      setProducts(data);
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
    }
  };

  const voltarParaLogin = () => navigate("/login");

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle,#0085FF_0%,#002243_100%)] flex items-center justify-center p-6 relative">
      {/* CARD DE FUNDO */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <div className="w-11/12 max-w-[1400px] h-[90vh] sm:h-[65vh] md:h-[85vh] rounded-2xl shadow-2xl bg-linear-to-br from-[#003465] to-[#006dd3]"></div>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="relative z-10 w-full max-w-7xl h-auto lg:h-[75vh] bg-white/10 border-2 border-white/20 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        {/* FORMULÁRIO */}
        <div className="lg:w-1/3 w-full bg-white/5 p-6 lg:p-8 flex flex-col gap-6">
          <h2 className="text-2xl text-white font-bold text-center">
            {editingId ? "Editar Produto" : "Novo Produto"}
          </h2>

          <form className="flex flex-col gap-4 sm:gap-6" onSubmit={handleSubmit}>
            {/* Nome */}
            <div className="relative">
              <CubeIcon className="w-5 h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={form.name}
                onChange={handleChange}
                className="pl-10 p-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
                required
              />
            </div>

            {/* Preço */}
            <div className="relative">
              <CurrencyDollarIcon className="w-5 h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                name="price"
                placeholder="Preço"
                value={form.price}
                onChange={handleChange}
                className="pl-10 p-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
                required
              />
            </div>

            {/* Quantidade */}
            <div className="relative">
              <Squares2X2Icon className="w-5 h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                name="quantity"
                placeholder="Quantidade"
                value={form.quantity}
                onChange={handleChange}
                className="pl-10 p-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
                required
              />
            </div>

            {/* Categoria */}
            <div className="relative">
              <TagIcon className="w-5 h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="category"
                placeholder="Categoria"
                value={form.category}
                onChange={handleChange}
                className="pl-10 p-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
              />
            </div>

            {/* Marca */}
            <div className="relative">
              <BuildingStorefrontIcon className="w-5 h-5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="brand"
                placeholder="Marca"
                value={form.brand}
                onChange={handleChange}
                className="pl-10 p-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
              />
            </div>

            {/* Botão Criar / Atualizar */}
            <button
              type="submit"
              className="w-full max-w-sm py-3 mt-5 rounded-xl bg-linear-to-r from-[#0ba517] to-[#168100] text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 hover:shadow-2xl transition"
            >
              {editingId ? (
                <>
                  <ArrowUpCircleIcon className="w-6 h-6" /> Atualizar
                </>
              ) : (
                <>
                  <PlusCircleIcon className="w-6 h-6" /> Criar
                </>
              )}
            </button>

            {/* Cancelar */}
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full max-w-sm py-3 mt-2 rounded-xl bg-orange-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition"
              >
                <XCircleIcon className="w-6 h-6" /> Cancelar
              </button>
            )}

            {/* Sair */}
            <button
              type="button"
              onClick={voltarParaLogin}
              className="w-full max-w-sm py-3 mt-2 rounded-xl bg-linear-to-r from-red-700 to-red-900 text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 hover:shadow-2xl transition"
            >
              <ArrowLeftStartOnRectangleIcon className="w-6 h-6" /> Sair
            </button>
          </form>
        </div>

        {/* LISTA DE PRODUTOS */}
        <div className="lg:w-2/3 w-full p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 overflow-auto custom-scrollbar max-h-[75vh]">
          {products.length === 0 ? (
            <p className="text-white text-center col-span-full">Nenhum produto encontrado</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg max-h-[220px] flex flex-col justify-between text-white"
              >
                <div className="mb-4 overflow-auto">
                  <h3 className="text-lg font-bold">{product.name}</h3>

                  <p className="flex items-center gap-2">
                    <CurrencyDollarIcon className="w-5 h-5 text-blue-300" />
                    Preço: R$ {product.price}
                  </p>

                  <p className="flex items-center gap-2">
                    <Squares2X2Icon className="w-5 h-5 text-blue-300" />
                    Quantidade: {product.quantity}
                  </p>

                  <p className="flex items-center gap-2">
                    <TagIcon className="w-5 h-5 text-blue-300" />
                    Categoria: {product.category}
                  </p>

                  <p className="flex items-center gap-2">
                    <BuildingStorefrontIcon className="w-5 h-5 text-blue-300" />
                    Marca: {product.brand}
                  </p>
                </div>

                <div className="flex justify-between mt-auto">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-orange-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-orange-600 transition font-semibold"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                    Editar
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Tem certeza que deseja deletar "${product.name}"?`)) {
                        handleDelete(product.id);
                      }
                    }}
                    className="bg-red-500 px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600 transition font-semibold"
                  >
                    <TrashIcon className="w-5 h-5" />
                    Deletar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


