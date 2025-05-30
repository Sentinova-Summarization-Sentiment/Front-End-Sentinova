import { motion } from "framer-motion"
import { FiUpload, FiArrowRight } from "react-icons/fi"

const AnalysisContent = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Analisis Baru</h1>
          <p className="text-gray-400 mt-1">Upload data ulasan untuk dianalisis</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Upload File</h2>
            <p className="text-gray-400">Unggah file CSV atau Excel yang berisi ulasan pelanggan untuk dianalisis</p>
          </div>

          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <FiUpload className="text-blue-400 text-4xl mb-4" />
              <p className="text-white mb-2">Drag & drop file di sini atau</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Pilih File
              </button>
              <p className="text-gray-400 text-sm mt-4">Format yang didukung: CSV, XLSX, XLS (Maks. 10MB)</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-white mb-4">Opsi Analisis</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="sentiment" className="w-4 h-4 rounded" defaultChecked />
                <label htmlFor="sentiment" className="text-gray-300">
                  Analisis Sentimen
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="summary" className="w-4 h-4 rounded" defaultChecked />
                <label htmlFor="summary" className="text-gray-300">
                  Ringkasan Ulasan
                </label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="keywords" className="w-4 h-4 rounded" defaultChecked />
                <label htmlFor="keywords" className="text-gray-300">
                  Ekstraksi Kata Kunci
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              Mulai Analisis
              <FiArrowRight />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisContent 