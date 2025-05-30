import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../js/firebase-init"
import { Link, useNavigate } from "react-router-dom"

import AnimatedBackground from "../components/flow/AnimatedBackground"
import Sidebar from "../components/flow/Sidebar"
import DashboardContent from "../components/flow/DashboardContent"
import AnalysisContent from "../components/flow/AnalysisContent"
import HistoryContent from "../components/flow/HistoryContent"
import ReportsContent from "../components/flow/ReportsContent"
import SettingsContent from "../components/flow/SettingsContent"

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