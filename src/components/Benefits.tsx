import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { benefits } from "../data";
import { useDesktopParallax } from "../hooks/useDesktopParallax";
import { ParallaxSection } from "./ParallaxSection";

export function Benefits() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const enabled = useDesktopParallax();

  const { scrollYProgress: leftProgress } = useScroll({
    target: leftRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: rightProgress } = useScroll({
    target: rightRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(leftProgress, [0, 1], enabled ? [36, -48] : [0, 0]);
  const rightY = useTransform(rightProgress, [0, 1], enabled ? [64, -28] : [0, 0]);

  return (
    <ParallaxSection id="why" className="section why" distance={32}>
      <div className="container why__grid">
        <motion.div
          ref={leftRef}
          style={{ y: leftY }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Еврофлаг</p>
          <h2 className="section-title">Почему компании выбирают нас к Новому году</h2>
          <p className="section-lead">
            Более 20 лет производим фирменную продукцию с логотипом. Новогодние наборы — это тот же
            уровень качества, только в праздничной подаче.
          </p>
        </motion.div>

        <motion.div className="why__list" ref={rightRef} style={{ y: rightY }}>
          {benefits.map((item, index) => (
            <motion.div
              key={item.title}
              className="why__item"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <span className="why__num">0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ParallaxSection>
  );
}
