import { motion } from "framer-motion";
import { benefits } from "../data";
import { StackSection } from "./StackSection";

export function Benefits() {
  return (
    <StackSection id="why" className="section why" index={2}>
      <div className="container why__grid">
        <motion.div
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

        <div className="why__list">
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
        </div>
      </div>
    </StackSection>
  );
}
