import { motion } from "framer-motion";

const sparks = [
  { x: "12%", y: "18%", delay: 0.1, size: 3 },
  { x: "28%", y: "42%", delay: 0.8, size: 2 },
  { x: "48%", y: "14%", delay: 0.3, size: 4 },
  { x: "62%", y: "36%", delay: 1.2, size: 2.5 },
  { x: "78%", y: "22%", delay: 0.5, size: 3.5 },
  { x: "86%", y: "48%", delay: 1.5, size: 2 },
  { x: "18%", y: "58%", delay: 0.9, size: 2.5 },
  { x: "70%", y: "62%", delay: 0.2, size: 3 },
];

export function HeroMotion() {
  return (
    <div className="hero-motion" aria-hidden="true">
      <motion.div
        className="hero-motion__aurora hero-motion__aurora--a"
        animate={{ x: ["-8%", "6%", "-8%"], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-motion__aurora hero-motion__aurora--b"
        animate={{ x: ["10%", "-6%", "10%"], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <svg className="hero-motion__scene" viewBox="0 0 640 520" fill="none">
        <defs>
          <linearGradient id="giftBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a4668" />
            <stop offset="100%" stopColor="#132538" />
          </linearGradient>
          <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0c57a" />
            <stop offset="100%" stopColor="#de6464" />
          </linearGradient>
          <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          filter="url(#softGlow)"
          animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "320px 280px" }}
        >
          <rect x="220" y="210" width="200" height="160" rx="10" fill="url(#giftBody)" stroke="rgba(244,239,230,0.18)" />
          <rect x="300" y="210" width="40" height="160" fill="url(#ribbon)" opacity="0.95" />
          <rect x="220" y="270" width="200" height="40" fill="url(#ribbon)" opacity="0.95" />

          <motion.path
            d="M300 210 C270 160 250 150 235 165 C220 180 250 205 300 210 Z"
            fill="url(#ribbon)"
            animate={{ d: [
              "M300 210 C270 160 250 150 235 165 C220 180 250 205 300 210 Z",
              "M300 210 C268 150 240 140 228 160 C218 178 248 208 300 210 Z",
              "M300 210 C270 160 250 150 235 165 C220 180 250 205 300 210 Z",
            ] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M340 210 C370 160 390 150 405 165 C420 180 390 205 340 210 Z"
            fill="url(#ribbon)"
            animate={{ d: [
              "M340 210 C370 160 390 150 405 165 C420 180 390 205 340 210 Z",
              "M340 210 C372 148 400 138 412 158 C424 176 392 208 340 210 Z",
              "M340 210 C370 160 390 150 405 165 C420 180 390 205 340 210 Z",
            ] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
        </motion.g>

        <motion.g
          animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="430" y="120" width="110" height="88" rx="8" fill="#1a3352" stroke="rgba(212,168,92,0.35)" />
          <rect x="474" y="120" width="22" height="88" fill="#de6464" />
          <rect x="430" y="152" width="110" height="22" fill="#d4a85c" />
        </motion.g>

        <motion.g
          animate={{ y: [0, 16, 0], x: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <rect x="110" y="300" width="96" height="76" rx="8" fill="#1a3352" stroke="rgba(222,100,100,0.3)" />
          <rect x="148" y="300" width="20" height="76" fill="#d4a85c" />
          <rect x="110" y="328" width="96" height="20" fill="#de6464" />
        </motion.g>

        <motion.circle
          cx="500"
          cy="280"
          r="3"
          fill="#f4efe6"
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.6, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="160"
          cy="180"
          r="2.5"
          fill="#d4a85c"
          animate={{ opacity: [0.15, 0.9, 0.15], scale: [1, 1.8, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        />
      </svg>

      {sparks.map((spark, i) => (
        <motion.span
          key={i}
          className="hero-motion__spark"
          style={{
            left: spark.x,
            top: spark.y,
            width: spark.size,
            height: spark.size,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.4, 0.6], y: [0, -12, 0] }}
          transition={{
            duration: 3.2 + (i % 3) * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: spark.delay,
          }}
        />
      ))}
    </div>
  );
}
