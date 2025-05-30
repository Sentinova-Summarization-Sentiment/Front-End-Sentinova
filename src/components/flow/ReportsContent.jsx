import { motion } from "framer-motion"
import { FiArrowRight, FiPlus, FiBarChart2, FiDownload } from "react-icons/fi"

const ReportsContent = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Laporan</h1>
          <p className="text-gray-400 mt-1">Buat dan kelola laporan analisis sentimen</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FiPlus />
          Buat Laporan Baru
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/40 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-white">Laporan Mingguan</h2>
            <span className="text-gray-400 text-sm">Terakhir: 25 Mei 2025</span>
          </div>
          <p className="text-gray-300 mb-6">
            Laporan ringkasan analisis sentimen mingguan dengan visualisasi tren dan perbandingan.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">8 laporan tersedia</span>
            <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              Lihat Semua
              <FiArrowRight className="text-xs" />
            </button>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/40 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-white">Laporan Bulanan</h2>
            <span className="text-gray-400 text-sm">Terakhir: Mei 2025</span>
          </div>
          <p className="text-gray-300 mb-6">
            Laporan komprehensif bulanan dengan analisis mendalam dan rekomendasi tindakan.
          </p>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">4 laporan tersedia</span>
            <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              Lihat Semua
              <FiArrowRight className="text-xs" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Laporan Terbaru</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="flex justify-between items-center p-4 border border-white/10 rounded-lg hover:bg-black/40 duration-200 transition-colors"
            >
              <div>
                <h3 className="text-white font-medium">Laporan Analisis Sentimen #{i}</h3>
                <p className="text-gray-400 text-sm">Dibuat pada 2{i} Mei 2025</p>
              </div>
              <div className="flex gap-3">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-blue-400 hover:text-blue-300 transition-colors">
                  <FiBarChart2 />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-blue-400 hover:text-blue-300 transition-colors">
                  <FiDownload />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReportsContent 