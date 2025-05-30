import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { FiBarChart2, FiUpload, FiList, FiFileText, FiSettings, FiLogOut } from "react-icons/fi"
import { signOut } from "firebase/auth"
import { auth } from "../../js/firebase-init"

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

export default Sidebar 