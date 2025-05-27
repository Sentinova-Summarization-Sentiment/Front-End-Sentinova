import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../js/auth";
import { NotificationProvider, useNotification } from "./NotificationContext";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form.username, form.email, form.password);
      addNotification("Registrasi berhasil!");
      navigate("/login");
    } catch (error) {
      addNotification("Gagal registrasi: " + error.message);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black font-poppins px-4 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center w-full">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-200 mb-6">Register</motion.h2>
        <div className="bg-white/90 p-8 rounded-2xl shadow-xl flex flex-col justify-center w-full max-w-md backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-3 border-2 text-black border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border-2 text-black border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 border-2 text-black border-gray-300 bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <Link
              to="/login"
              className="block text-sm text-blue-700 mt-2 hover:underline transition"
            >
              Sudah punya akun? Login di sini
            </Link>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg mt-4 transition hover:bg-blue-800 shadow-md text-lg"
            >
              Register
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
