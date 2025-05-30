import { useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion"

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"]
const COLORS_BOTTOM = ["#0D4B3C", "#0A2342", "#4A1942", "#3D0E21"]

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

export default AnimatedBackground 