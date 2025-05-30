import { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import {
  FiArrowRight,
  FiUpload,
  FiBarChart2,
  FiPieChart,
  FiList,
  FiSettings,
  FiLogOut,
  FiUser,
  FiFileText,
  FiPlus,
  FiSearch,
  FiDownload,
  FiRefreshCw,
} from "react-icons/fi"
import { auth, db } from "../js/firebase-init"
import { doc, getDoc } from "firebase/firestore"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion"

// Reuse the same color palette from home.jsx
const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]
const COLORS_BOTTOM = ["#0D4B3C", "#0A2342", "#4A1942", "#3D0E21"]

// Animated background component
const AnimatedBackground = ({ children, className, speed = 12, colorIndex = 0 }) => {
  const color = useMotionValue(COLORS_TOP[colorIndex % COLORS_TOP.length])
  const bottomColor = useMotionValue(COLORS_BOTTOM[colorIndex % COLORS_BOTTOM.length])

  useEffect(() => {
    animate(color, [...COLORS_TOP], {
      ease: "easeInOut",
      duration: speed,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror",
    })

    animate(bottomColor, [...COLORS_BOTTOM], {
      ease: "easeInOut",
      duration: speed,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror",
    })
  }, [])

  const backgroundImage = useMotionTemplate`linear-gradient(to bottom, #020617 10%, ${color} 50%, ${bottomColor} 100%)`

  return (
    <motion.div style={{ backgroundImage }} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        </Canvas>
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// Mock data for dashboard
const mockRecentAnalyses = [
  { id: 1, title: "Ulasan Produk A", date: "2025-05-25", sentiment: "positive", score: 0.87, count: 124 },
  { id: 2, title: "Feedback Layanan", date: "2025-05-24", sentiment: "neutral", score: 0.52, count: 78 },
  { id: 3, title: "Review Aplikasi", date: "2025-05-22", sentiment: "negative", score: 0.23, count: 45 },
  { id: 4, title: "Komentar Media Sosial", date: "2025-05-20", sentiment: "positive", score: 0.91, count: 230 },
]

// Dashboard stat card component
const StatCard = ({ title, value, icon, color, change, isLoading }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 relative overflow-hidden hover:bg-black/40 transition-colors"
    >
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
          <div className="h-8 bg-white/20 rounded w-3/4"></div>
          <div className="h-4 bg-white/20 rounded w-1/4"></div>
        </div>
      ) : (
        <>
          <div className={`absolute top-0 right-0 w-24 h-24 ${color} rounded-full blur-3xl opacity-20`}></div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 font-medium">{title}</h3>
            <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>{icon}</div>
          </div>
          <p className="text-3xl font-bold text-white mb-2">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  change.startsWith("+") ? "text-green-400" : change.startsWith("-") ? "text-red-400" : "text-gray-400"
                }`}
              >
                {change}
              </span>
              <span className="text-gray-400 text-sm">dari bulan lalu</span>
            </div>
          )}
        </>
      )}
    </motion.div>
  )
}

// Recent analysis card component
const AnalysisCard = ({ analysis, isLoading }) => {
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
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 duration-300 hover:bg-black/40 transition-colors"
    >
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
          <div className="h-4 bg-white/20 rounded w-1/2"></div>
          <div className="flex justify-between mt-4">
            <div className="h-6 bg-white/20 rounded w-1/4"></div>
            <div className="h-6 bg-white/20 rounded w-1/4"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-white">{analysis.title}</h3>
            <span className="text-gray-400 text-sm">{analysis.date}</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-3 h-3 rounded-full ${getSentimentColor(analysis.sentiment)}`}></span>
            <span className="text-gray-300 text-sm">
              {getSentimentText(analysis.sentiment)} ({Math.round(analysis.score * 100)}%)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">{analysis.count} ulasan</span>
            <Link
              to={`/analysis/${analysis.id}`}
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors"
            >
              Lihat Detail
              <FiArrowRight className="text-xs" />
            </Link>
          </div>
        </>
      )}
    </motion.div>
  )
}

// Sidebar navigation component
const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FiBarChart2 /> },
    { id: "analysis", label: "Analisis Baru", icon: <FiUpload /> },
    { id: "history", label: "Riwayat Analisis", icon: <FiList /> },
    { id: "reports", label: "Laporan", icon: <FiFileText /> },
    { id: "settings", label: "Pengaturan", icon: <FiSettings /> },
  ]

  return (
    <div className="bg-black/30 backdrop-blur-md border-r border-white/10 h-full flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <img src="/image/Sentinova.png" className="h-8" alt="Sentinova Logo" />
        </Link>
      </div>

      <div className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id ? "bg-blue-600/30 text-white" : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
            {activeTab === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

// Main dashboard content
const DashboardContent = ({ username, isLoading }) => {
  return (
    <div className="p-6 space-y-8">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {isLoading ? (
              <div className="h-9 bg-white/20 rounded w-64 animate-pulse"></div>
            ) : (
              <>
                Selamat datang, <span className="text-blue-400">{username}</span>
              </>
            )}
          </h1>
          <p className="text-gray-400 mt-1">Berikut adalah ringkasan aktivitas analisis Anda</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FiPlus />
            Analisis Baru
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FiRefreshCw />
            Refresh
          </motion.button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Analisis"
          value="24"
          icon={<FiBarChart2 className="text-blue-400" />}
          color="bg-blue-500"
          change="+4"
          isLoading={isLoading}
        />
        <StatCard
          title="Sentimen Positif"
          value="68%"
          icon={<FiPieChart className="text-green-400" />}
          color="bg-green-500"
          change="+12%"
          isLoading={isLoading}
        />
        <StatCard
          title="Sentimen Negatif"
          value="18%"
          icon={<FiPieChart className="text-red-400" />}
          color="bg-red-500"
          change="-5%"
          isLoading={isLoading}
        />
        <StatCard
          title="Ulasan Dianalisis"
          value="1,248"
          icon={<FiList className="text-purple-400" />}
          color="bg-purple-500"
          change="+248"
          isLoading={isLoading}
        />
      </div>

      {/* Recent analyses */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Analisis Terbaru</h2>
          <Link to="/history" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            Lihat Semua
            <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, i) => <AnalysisCard key={i} isLoading={true} />)
            : mockRecentAnalyses.map((analysis) => <AnalysisCard key={analysis.id} analysis={analysis} />)}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
            className="bg-white/10 hover:bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 transition-all duration-300"
          >
            <div className="p-3 rounded-full bg-blue-500/20">
              <FiUpload className="text-blue-400 text-xl" />
            </div>
            <span className="text-white font-medium">Upload CSV</span>
          </motion.button>
          <motion.button
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
            className="bg-white/10 hover:bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 transition-all duration-300"
          >
            <div className="p-3 rounded-full bg-green-500/20">
              <FiFileText className="text-green-400 text-xl" />
            </div>
            <span className="text-white font-medium">Buat Laporan</span>
          </motion.button>
          <motion.button
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
            className="bg-white/10 hover:bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 transition-all duration-300"
          >
            <div className="p-3 rounded-full bg-purple-500/20">
              <FiSearch className="text-purple-400 text-xl" />
            </div>
            <span className="text-white font-medium">Cari Analisis</span>
          </motion.button>
          <motion.button
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
            className="bg-white/10 hover:bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 transition-all duration-300"
          >
            <div className="p-3 rounded-full bg-yellow-500/20">
              <FiDownload className="text-yellow-400 text-xl" />
            </div>
            <span className="text-white font-medium">Download Data</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// Analysis tab content
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

// History tab content
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

// Reports tab content
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

// Settings tab content
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

export default function Flow() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [greetingError, setGreetingError] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const navigate = useNavigate()

  useEffect(() => {
    const greetingUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          window.location.href = "/login"
          return
        }
        const uid = user.uid
        try {
          const docSnap = await getDoc(doc(db, "users", uid))
          if (docSnap.exists() && docSnap.data().username) {
            setUsername(docSnap.data().username)
          } else {
            setUsername("User")
          }
          setGreetingError("")
        } catch (err) {
          setGreetingError("Gagal mengambil data user.")
          setUsername("User")
        }
        setIsLoading(false)
      })
    }
    greetingUser()
  }, [])

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent username={username} isLoading={isLoading} />
      case "analysis":
        return <AnalysisContent />
      case "history":
        return <HistoryContent />
      case "reports":
        return <ReportsContent />
      case "settings":
        return <SettingsContent />
      default:
        return <DashboardContent username={username} isLoading={isLoading} />
    }
  }

  return (
    <AnimatedBackground className="min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 hidden md:block">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Mobile header */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/image/Sentinova.png" className="h-8" alt="Sentinova Logo" />
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-white">
                {isLoading ? "Loading..." : greetingError ? greetingError : `Halo, ${username}`}
              </span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto pt-16 md:pt-0">{renderContent()}</div>
      </div>
    </AnimatedBackground>
  )
}
