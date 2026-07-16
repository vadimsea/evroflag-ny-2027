import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Gift as GiftIcon } from "lucide-react";
import { gifts, type Gift } from "../data";
import { useDesktopParallax } from "../hooks/useDesktopParallax";
import { ParallaxSection } from "./ParallaxSection";

type Props = {
  onOrder: (gift: Gift) => void;
};

function GiftCard({
  gift,
  index,
  onOrder,
}: {
  gift: Gift;
  index: number;
  onOrder: (gift: Gift) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const enabled = useDesktopParallax();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lag = (index % 3) * 12;
  const y = useTransform(scrollYProgress, [0, 1], enabled ? [48 + lag, -(32 + lag)] : [0, 0]);

  return (
    <motion.article
      ref={ref}
      className="gift"
      style={{ y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <div className="gift__media" aria-hidden="true">
        <div className="gift__placeholder">
          <GiftIcon size={36} strokeWidth={1.4} />
          <span>Фото набора</span>
        </div>
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
        <div className="gift__footer">
          <span className="gift__price">{gift.priceLabel}</span>
          <button type="button" className="btn btn-primary" onClick={() => onOrder(gift)}>
            Заказать
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function Gifts({ onOrder }: Props) {
  return (
    <ParallaxSection id="gifts" className="section gifts" distance={40}>
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
            Выберите готовый формат или соберите свой. Пока вместо фото — плейсхолдеры; состав и
            цены уточнит менеджер под ваш тираж.
          </p>
        </motion.div>

        <div className="gifts-grid">
          {gifts.map((gift, index) => (
            <GiftCard key={gift.id} gift={gift} index={index} onOrder={onOrder} />
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
