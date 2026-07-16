import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gifts, quizOptions, type Audience, type Gift } from "../data";
import { StackSection } from "./StackSection";

type Props = {
  onOrder: (gift: Gift) => void;
};

export function Quiz({ onOrder }: Props) {
  const [audience, setAudience] = useState<Audience | null>(null);

  const recommended = useMemo(() => {
    if (!audience) return [];
    return gifts.filter((gift) => gift.audiences.includes(audience)).slice(0, 3);
  }, [audience]);

  return (
    <StackSection id="quiz" className="section quiz" index={2}>
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Быстрый подбор</p>
          <h2 className="section-title">Кому дарите?</h2>
          <p className="section-lead">
            Выберите аудиторию — покажем 2–3 набора, которые обычно берут под этот сценарий.
          </p>
        </motion.div>

        <div className="quiz__options" role="list">
          {quizOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              role="listitem"
              className={`quiz__option${audience === option.id ? " is-active" : ""}`}
              onClick={() => setAudience(option.id)}
            >
              <strong>{option.label}</strong>
              <span>{option.hint}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {audience && (
            <motion.div
              key={audience}
              className="quiz__results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="quiz__results-label">Рекомендуем</p>
              <div className="quiz__cards">
                {recommended.map((gift) => (
                  <article key={gift.id} className="quiz__card">
                    <img src={gift.image} alt={gift.name} loading="lazy" />
                    <div>
                      <h3>{gift.name}</h3>
                      <p>{gift.tagline}</p>
                      <span>{gift.priceLabel}</span>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => onOrder(gift)}>
                      Заказать
                    </button>
                  </article>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StackSection>
  );
}
