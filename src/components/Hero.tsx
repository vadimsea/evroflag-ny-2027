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

type Props = {
  onUrgent: () => void;
  onCustom: () => void;
};

export function Hero({ onUrgent, onCustom }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const enabled = useDesktopParallax();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const stackScale = useTransform(scrollYProgress, [0, 1], enabled ? [1, 0.9] : [1, 1]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.85, 1], enabled ? [1, 0.9, 0.55] : [1, 1, 1]);
  const stackFilter = useTransform(
    scrollYProgress,
    [0, 1],
    enabled ? ["brightness(1)", "brightness(0.72)"] : ["none", "none"],
  );

  const sceneY = useTransform(scrollYProgress, [0, 1], enabled ? [0, 80] : [0, 0]);

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
      className={`hero stack-section ${enabled ? "stack-section--active" : ""}`}
      id="top"
      aria-label="Главный экран"
      style={enabled ? { zIndex: 1 } : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="stack-section__panel hero__panel"
        style={enabled ? { scale: stackScale, opacity: stackOpacity, filter: stackFilter } : undefined}
      >
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__forest" aria-hidden="true" />
        <div className="hero__paper" aria-hidden="true" />

        <motion.div
          className="hero__scene-layer"
          style={{ transform: sceneTransform }}
          aria-hidden="true"
        >
          <HeroMotion />
        </motion.div>

        <div className="container hero__content">
          <motion.p
            className="hero__season"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Еврофлаг · Новогодняя коллекция 2027
          </motion.p>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Брендированные наборы к Новому году — от расчёта до отгрузки по РФ
          </motion.h1>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Когда сроки жмут, а логотип должен быть идеальным: соберём состав под бюджет,
            согласуем макет и отправим тираж вовремя — сотрудникам, клиентам или VIP.
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
            <a className="btn btn-gold" href="#quiz">
              Подобрать за 1 минуту
            </a>
          </motion.div>

          <motion.div
            className="hero__alt-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <button type="button" onClick={onUrgent}>
              Срочный тираж
            </button>
            <span aria-hidden="true">·</span>
            <button type="button" onClick={onCustom}>
              Нужен свой состав
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
