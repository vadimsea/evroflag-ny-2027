import { motion } from "framer-motion";
import { HeroMotion } from "./HeroMotion";

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Главный экран">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__forest" aria-hidden="true" />
      <HeroMotion />

      <div className="container hero__content">
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
      </div>
    </section>
  );
}
