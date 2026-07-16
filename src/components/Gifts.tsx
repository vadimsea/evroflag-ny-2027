import { motion } from "framer-motion";
import { gifts, type Gift } from "../data";
import { StackSection } from "./StackSection";

type Props = {
  onOrder: (gift: Gift) => void;
};

export function Gifts({ onOrder }: Props) {
  return (
    <StackSection id="gifts" className="section gifts" index={4}>
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Каталог</p>
          <h2 className="section-title">Новогодние наборы под ваш бренд</h2>
          <p className="section-lead">
            Готовые форматы — или соберём свой состав. Цены ориентировочные: зависят от тиража,
            нанесения и упаковки. Срок и точную смету подтвердит менеджер.
          </p>
        </motion.div>

        <div className="gifts-grid">
          {gifts.map((gift, index) => (
            <motion.article
              key={gift.id}
              className="gift"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <div className="gift__media">
                <img src={gift.image} alt={gift.name} loading="lazy" />
              </div>
              <div className="gift__body">
                <p className="gift__tag">{gift.tagline}</p>
                <h3 className="gift__name">{gift.name}</h3>
                <p className="gift__desc">{gift.description}</p>
                <ul className="gift__list">
                  {gift.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="gift__meta">
                  от {gift.minQty} шт. · {gift.leadDays}
                </p>
                <div className="gift__footer">
                  <span className="gift__price">{gift.priceLabel}</span>
                  <button type="button" className="btn btn-primary" onClick={() => onOrder(gift)}>
                    Заказать
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </StackSection>
  );
}
