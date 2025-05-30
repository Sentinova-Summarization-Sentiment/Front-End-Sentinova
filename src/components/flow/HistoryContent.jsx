import { useState } from "react"
import { FiSearch, FiBarChart2, FiDownload } from "react-icons/fi"

const HistoryContent = () => {
  const [filter, setFilter] = useState("all")

  const historyData = [
    { id: 1, title: "Ulasan Produk A", date: "2025-05-25", sentiment: "positive", score: 0.87, count: 124 },
    { id: 2, title: "Feedback Layanan", date: "2025-05-24", sentiment: "neutral", score: 0.52, count: 78 },
    { id: 3, title: "Review Aplikasi", date: "2025-05-22", sentiment: "negative", score: 0.23, count: 45 },
    { id: 4, title: "Komentar Media Sosial", date: "2025-05-20", sentiment: "positive", score: 0.91, count: 230 },
    { id: 5, title: "Ulasan Produk B", date: "2025-05-18", sentiment: "positive", score: 0.76, count: 89 },
    { id: 6, title: "Feedback Pelanggan", date: "2025-05-15", sentiment: "negative", score: 0.34, count: 56 },
    { id: 7, title: "Survey Kepuasan", date: "2025-05-12", sentiment: "neutral", score: 0.49, count: 112 },
    { id: 8, title: "Ulasan E-commerce", date: "2025-05-10", sentiment: "positive", score: 0.82, count: 178 },
  ]

  const filteredData = filter === "all" ? historyData : historyData.filter((item) => item.sentiment === filter)

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Riwayat Analisis</h1>
          <p className="text-gray-400 mt-1">Lihat dan kelola analisis yang telah dilakukan</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari analisis..."
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
            />
          </div>
          <select
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Semua</option>
            <option value="positive">Positif</option>
            <option value="neutral">Netral</option>
            <option value="negative">Negatif</option>
          </select>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Judul</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Tanggal</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Sentimen</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Skor</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Jumlah</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-300">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => {
              const getSentimentColor = (sentiment) => {
                switch (sentiment) {
                  case "positive":
                    return "bg-green-500"
                  case "negative":
                    return "bg-red-500"
                  default:
                    return "bg-blue-500"
                }
              }

              const getSentimentText = (sentiment) => {
                switch (sentiment) {
                  case "positive":
                    return "Positif"
                  case "negative":
                    return "Negatif"
                  default:
                    return "Netral"
                }
              }

              return (
                <tr key={item.id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-6 py-4 text-white">{item.title}</td>
                  <td className="px-6 py-4 text-gray-300">{item.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getSentimentColor(item.sentiment)}`}></span>
                      <span className="text-gray-300">{getSentimentText(item.sentiment)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{Math.round(item.score * 100)}%</td>
                  <td className="px-6 py-4 text-gray-300">{item.count}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors">
                        <FiBarChart2 />
                      </button>
                      <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors">
                        <FiDownload />
                      </button>
                      <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-400">
          Menampilkan {filteredData.length} dari {historyData.length} analisis
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors">Prev</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors">2</button>
          <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}

export default HistoryContent 