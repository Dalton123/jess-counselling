"use client";
import { motion } from "framer-motion";

export const RealisticWaves = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,200 C120,160 180,240 240,220 C300,200 360,160 420,180 C480,200 540,260 600,240 C660,220 720,140 780,140 C840,140 900,200 960,220 C1020,240 1080,220 1140,200 C1200,180 1260,160 1320,180 C1380,200 1440,260 1500,240 L1500,900 L0,900 Z"
        fill="url(#paint0_linear)"
        opacity="0.3"
        animate={{
          d: [
            "M0,200 C120,160 180,240 240,220 C300,200 360,160 420,180 C480,200 540,260 600,240 C660,220 720,140 780,140 C840,140 900,200 960,220 C1020,240 1080,220 1140,200 C1200,180 1260,160 1320,180 C1380,200 1440,260 1500,240 L1500,900 L0,900 Z",
            "M0,220 C120,260 180,180 240,160 C300,140 360,200 420,220 C480,240 540,200 600,180 C660,160 720,220 780,240 C840,260 900,180 960,160 C1020,140 1080,180 1140,220 C1200,260 1260,220 1320,180 C1380,140 1440,160 1500,200 L1500,900 L0,900 Z",
            "M0,200 C120,160 180,240 240,220 C300,200 360,160 420,180 C480,200 540,260 600,240 C660,220 720,140 780,140 C840,140 900,200 960,220 C1020,240 1080,220 1140,200 C1200,180 1260,160 1320,180 C1380,200 1440,260 1500,240 L1500,900 L0,900 Z",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M0,200 C120,160 180,240 240,220 C300,200 360,160 420,180 C480,200 540,260 600,240 C660,220 720,140 780,140 C840,140 900,200 960,220 C1020,240 1080,220 1140,200 C1200,180 1260,160 1320,180 C1380,200 1440,260 1500,240 L1500,900 L0,900 Z"
        fill="url(#paint1_linear)"
        opacity="0.3"
        animate={{
          d: [
            "M0,200 C120,160 180,240 240,220 C300,200 360,160 420,180 C480,200 540,260 600,240 C660,220 720,140 780,140 C840,140 900,200 960,220 C1020,240 1080,220 1140,200 C1200,180 1260,160 1320,180 C1380,200 1440,260 1500,240 L1500,900 L0,900 Z",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />
      {/* Add similar motion.path elements for other waves with different paths and delays */}
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF0000" />
          <stop offset="1" stopColor="#0000FF" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF0000" />
          <stop offset="1" stopColor="#0000FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};