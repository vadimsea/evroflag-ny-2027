import { motion } from "framer-motion";
import { imageUrl } from "../assets";

const shots = [
  {
    src: imageUrl("unbox.jpg"),
    title: "Момент открытия",
    text: "Коробка, которую хочется разобрать — и оставить на столе.",
  },
  {
    src: imageUrl("tag.jpg"),
    title: "Бирка с логотипом",
    text: "Бренд остаётся на виду, а не прячется в пакете.",
  },
  {
    src: imageUrl("gift-2.jpg"),
    title: "Фирменная упаковка",
    text: "Единый стиль для всей партии — от 50 до нескольких тысяч штук.",
  },
  {
    src: imageUrl("gift-1.jpg"),
    title: "Праздничная подача",
    text: "Тёплый свет, аккуратный текстиль, ощущение заботы о получателе.",
  },
];

export function Showcase() {
  return (
    <section className="section showcase" id="showcase" aria-label="Как выглядят наборы">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Как это выглядит</p>
          <h2 className="section-title">Упаковка, бирка, wow при открытии</h2>
          <p className="section-lead">
            Новогодний подарок работает, когда его приятно получить. Мы делаем не «сувенир в пакете»,
            а комплект, который запоминается вместе с вашим брендом.
          </p>
        </motion.div>

        <div className="showcase__grid">
          {shots.map((shot, index) => (
            <motion.figure
              key={shot.title}
              className={`showcase__shot showcase__shot--${index + 1}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <img src={shot.src} alt={shot.title} loading="lazy" />
              <figcaption>
                <strong>{shot.title}</strong>
                <span>{shot.text}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
