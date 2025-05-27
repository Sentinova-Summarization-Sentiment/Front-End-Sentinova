import React, { useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { FiArrowRight } from "react-icons/fi"
import { Link } from "react-router-dom";
import TiltCard from "./tiltcard";
import { FiTarget, FiSmile, FiLock, FiLink } from "react-icons/fi";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion"

import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle
} from "flowbite-react";


const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0])

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    })
  }, [])

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`
  const border = useMotionTemplate`1px solid ${color}`
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl md:text-7xl">
          SENTINOVA
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg">
          Meringkas ulasan dan menganalisis sentimen dengan hasil yang akurat. Platform AI untuk memahami review pelanggan Anda dengan mudah dan cepat.
        </p>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  )
}

export default function Home() {
  const [openPanel, setOpenPanel] = useState(null);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-20 bg-black/40 backdrop-blur-md shadow-none">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <Link to="/" className="flex items-center space-x-3">
            <img src="/image/Sentinova.png" className="h-9" alt="Sentinova Logo" />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:mt-0">
              <li>
                <Link
                  to="/login"
                  className="text-white font-poppins text-sm px-5 py-2.5 me-2 mb-2 transition inline-block text-center"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/Register" 
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-poppins rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition inline-block text-center"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Aurora Hero Section */}
      <AuroraHero />

      {/* Accordion FAQ Section */}
      <div className="bg-black mt-12 py-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-2xl font-bold text-white text-left mb-6">Pertanyaan Umum</motion.h2>
          <Accordion collapseAll open={openPanel}>
            <AccordionPanel
              open={openPanel === 0}
              onMouseEnter={() => setOpenPanel(0)}
              onMouseLeave={() => setOpenPanel(null)}
            >
              <AccordionTitle tabIndex={-1}>Apa itu Sentinova?</AccordionTitle>
              <AccordionContent>
                <p className="mb-2 text-gray-300">
                  Sentinova adalah platform AI yang membantu Anda menganalisis sentimen dan meringkas ulasan pelanggan secara otomatis dan akurat.
                </p>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel
              open={openPanel === 1}
              onMouseEnter={() => setOpenPanel(1)}
              onMouseLeave={() => setOpenPanel(null)}
            >
              <AccordionTitle tabIndex={-1}>Seberapa akurat Sentinova?</AccordionTitle>
              <AccordionContent>
                <p className="mb-2 text-gray-300">
                  Sentinova menggunakan model AI terkini yang telah diuji pada ribuan data ulasan, sehingga mampu memberikan hasil analisis sentimen dengan tingkat akurasi tinggi.
                </p>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel
              open={openPanel === 2}
              onMouseEnter={() => setOpenPanel(2)}
              onMouseLeave={() => setOpenPanel(null)}
            >
              <AccordionTitle tabIndex={-1}>Apa fungsi utama Sentinova?</AccordionTitle>
              <AccordionContent>
                <p className="mb-2 text-gray-300">
                  Sentinova dapat menganalisis sentimen, menampilkan distribusi sentimen, menampilkan kata yang sering muncul, dan memberikan insight dari ulasan pelanggan Anda.
                </p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>

      {/* Card Grid Section */}
      <div className="bg-black py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-2xl font-bold text-white text-left mb-10">
            Fitur Utama
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="w-full">
              <TiltCard
                icon={<FiTarget className="text-green-400 text-3xl" />}
                title="Akurasi Tinggi"
                description="Didukung AI mutakhir untuk analisis sentimen dan ringkasan ulasan yang presisi."
                className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="w-full">
              <TiltCard
                icon={<FiSmile className="text-yellow-300 text-3xl" />}
                title="Mudah Digunakan"
                description="Antarmuka sederhana, hasil instan tanpa perlu keahlian teknis."
                className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-blue-300 to-cyan-300"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="w-full">
              <TiltCard
                icon={<FiLock className="text-blue-400 text-3xl" />}
                title="Privasi Terjamin"
                description="Data Anda aman dan tidak dibagikan ke pihak ketiga."
                className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-pink-300 to-fuchsia-300"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="w-full">
              <TiltCard
                icon={<FiLink className="text-pink-400 text-3xl" />}
                title="Integrasi Mudah"
                description="Anda dapat terhubung dengan sistem hanya dalam beberapa langkah."
                className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-emerald-300 to-lime-300"
              />
            </motion.div>
          </div>
          <div className="h-32 md:h-48" />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-12">
        <p className="text-sm">&copy; 2025 Sentinova. All rights reserved.</p>
      </footer>
    </>
  )
}
