import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useDesktopParallax } from "../hooks/useDesktopParallax";
import { HeroMotion } from "./HeroMotion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const enabled = useDesktopParallax();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], enabled ? [0, 120] : [0, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], enabled ? [0, 180] : [0, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], enabled ? [0, 70] : [0, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], enabled ? [1, 0.35] : [1, 1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 0.4 });
  const sceneTransform = useMotionTemplate`translate3d(${springX}px, calc(${sceneY}px + ${springY}px), 0)`;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx * 28);
    mouseY.set(ny * 18);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      className="hero"
      id="top"
      aria-label="Главный экран"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div className="hero__glow" aria-hidden="true" style={{ y: glowY }} />
      <div className="hero__forest" aria-hidden="true" />

      <motion.div className="hero__scene-layer" style={{ transform: sceneTransform }} aria-hidden="true">
        <HeroMotion />
      </motion.div>

      <motion.div className="container hero__content" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.p
          className="hero__season"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          Новогодние наборы · сезон 2027
        </motion.p>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Корпоративные подарки, которые не стыдно дарить
        </motion.h1>

        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          Соберём наборы с вашим логотипом под бюджет и тираж — от сувениров для всей
          команды до премиум-комплектов для ключевых клиентов. Сделаем вовремя и отправим
          по России.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <a className="btn btn-primary" href="#gifts">
            Смотреть наборы
          </a>
          <a className="btn btn-ghost" href="#contact">
            Получить предложение
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
