import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ icon, title, description, className }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / rect.height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / rect.width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className={className ? className : "relative h-96 w-72 rounded-xl bg-gradient-to-br"}
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 flex flex-col items-center justify-center rounded-xl bg-white/70 backdrop-blur-md p-4 shadow-lg text-center"
      >
        {icon && (
          <div className="text-4xl mb-4" style={{ transform: "translateZ(60px)" }}>
            {icon}
          </div>
        )}
        <p className="text-2xl text-black font-bold" style={{ transform: "translateZ(50px)" }}>
          {title}
        </p>
        <p className="mt-2 text-gray-700 text-sm px-2" style={{ transform: "translateZ(40px)" }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default TiltCard;
