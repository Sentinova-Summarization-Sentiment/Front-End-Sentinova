import { motion } from "framer-motion"
import { FiUser } from "react-icons/fi"

const SettingsContent = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Pengaturan</h1>
        <p className="text-gray-400 mt-1">Kelola preferensi dan pengaturan akun Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sticky top-6">
            <h2 className="text-xl font-bold text-white mb-6">Kategori</h2>
            <div className="space-y-2">
              {["Profil", "Notifikasi", "Keamanan", "Integrasi", "API", "Tema"].map((item, i) => (
                <button
                  key={i}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    i === 0 ? "bg-blue-600/30 text-white" : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Profil</h2>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-blue-600/30 flex items-center justify-center text-3xl font-bold text-white">
                    U
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                    <FiUser size={14} />
                  </button>
                </div>
              </div>

              <div className="flex-grow space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Nama</label>
                    <input
                      type="text"
                      defaultValue="Username"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue="user@example.com"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
                    placeholder="Tulis bio singkat tentang diri Anda..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Simpan Perubahan
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Notifikasi</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Email Notifikasi</h3>
                  <p className="text-gray-400 text-sm">Terima notifikasi via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Laporan Mingguan</h3>
                  <p className="text-gray-400 text-sm">Terima laporan mingguan via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Notifikasi Analisis Selesai</h3>
                  <p className="text-gray-400 text-sm">Dapatkan notifikasi saat analisis selesai</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsContent 