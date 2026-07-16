import { motion } from "framer-motion";
import { logoUrl } from "../assets";

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Главный экран">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__forest" aria-hidden="true" />
      <div className="container hero__content">
        <motion.div
          className="hero__brand"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={logoUrl} alt="Еврофлаг" className="hero__logo" />
          <span className="hero__season">Новогодняя коллекция 2027</span>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          Подарки, которые остаются с брендом
        </motion.h1>

        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          Корпоративные новогодние наборы Еврофлаг — с вашим логотипом, в едином стиле и под
          любой тираж.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <a className="btn btn-primary" href="#gifts">
            Смотреть наборы
          </a>
          <a className="btn btn-ghost" href="#contact">
            Связаться с менеджером
          </a>
        </motion.div>
      </div>
    </section>
  );
}
