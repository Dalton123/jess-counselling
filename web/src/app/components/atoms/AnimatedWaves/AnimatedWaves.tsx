"use client";
import { motion } from "framer-motion";

export const AnimatedWaves = () => {
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
        d="M0,200 C300,100 600,300 900,200 C1200,100 1500,300 1800,200 L1800,900 L0,900 Z"
        fill="url(#paint0_linear)"
        opacity="0.3"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M0,300 C300,200 600,400 900,300 C1200,200 1500,400 1800,300 L1800,900 L0,900 Z"
        fill="url(#paint1_linear)"
        opacity="0.2"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.path
        d="M0,400 C300,300 600,500 900,400 C1200,300 1500,500 1800,400 L1800,900 L0,900 Z"
        fill="url(#paint2_linear)"
        opacity="0.2"
        animate={{
          y: [0, -25, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      {/* Bottom gradient mask - this doesn't animate */}
      <rect
        x="0"
        y="700"
        width="1800"
        height="200"
        fill="url(#bottomMask)"
      />
      
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0"
          y1="0"
          x2="1440"
          y2="900"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF88B3" />
          <stop offset="1" stopColor="#8794FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="0"
          y1="0"
          x2="1440"
          y2="900"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#A288FF" />
          <stop offset="1" stopColor="#87CDFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="0"
          y1="0"
          x2="1440"
          y2="900"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF88D1" />
          <stop offset="1" stopColor="#87FFEE" />
        </linearGradient>
        
        {/* Gradient for the bottom mask - from transparent to pink */}
        <linearGradient
          id="bottomMask"
          x1="0"
          y1="700"
          x2="0"
          y2="900"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFF5F9" stopOpacity="0" />
          <stop offset="1" stopColor="#FFF5F9" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
}; 