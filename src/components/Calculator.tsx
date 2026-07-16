import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { calcSegments, formatMoney, getGiftById } from "../data";
import { StackSection } from "./StackSection";

type Props = {
  onRequest: (payload: { segment: string; qty: number; totalFrom: number; totalTo: number }) => void;
};

export function Calculator({ onRequest }: Props) {
  const [segmentId, setSegmentId] = useState<(typeof calcSegments)[number]["id"]>("standard");
  const [qty, setQty] = useState(100);

  const estimate = useMemo(() => {
    const segment = calcSegments.find((item) => item.id === segmentId)!;
    const gift = getGiftById(segment.giftId)!;
    const safeQty = Math.max(gift.minQty, qty || gift.minQty);
    const volumeFactor = safeQty >= 500 ? 0.88 : safeQty >= 200 ? 0.93 : 1;
    const from = gift.priceFrom * volumeFactor;
    const to = gift.priceTo * volumeFactor;
    return {
      gift,
      segment,
      qty: safeQty,
      unitFrom: from,
      unitTo: to,
      totalFrom: from * safeQty,
      totalTo: to * safeQty,
    };
  }, [segmentId, qty]);

  return (
    <StackSection id="calculator" className="section calculator" index={4}>
      <div className="container calculator__grid">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Ориентир по бюджету</p>
          <h2 className="section-title">Калькулятор тиража</h2>
          <p className="section-lead">
            Тираж × сегмент → вилка стоимости. Это ориентир для планирования; точную смету посчитает
            менеджер после макета и состава.
          </p>
        </motion.div>

        <motion.div
          className="calculator__panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <div className="field">
            <label htmlFor="calc-segment">Сегмент набора</label>
            <select
              id="calc-segment"
              value={segmentId}
              onChange={(e) => setSegmentId(e.target.value as typeof segmentId)}
            >
              {calcSegments.map((segment) => (
                <option key={segment.id} value={segment.id}>
                  {segment.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="calc-qty">Тираж, шт.</label>
            <input
              id="calc-qty"
              type="number"
              min={estimate.gift.minQty}
              step={10}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
            <p className="calculator__hint">
              Минимум для «{estimate.gift.name}»: {estimate.gift.minQty} шт. · срок{" "}
              {estimate.gift.leadDays}
            </p>
          </div>

          <div className="calculator__result">
            <p>
              Ориентир за набор:{" "}
              <strong>
                {formatMoney(estimate.unitFrom)} – {formatMoney(estimate.unitTo)}
              </strong>
            </p>
            <p className="calculator__total">
              На тираж {estimate.qty} шт.:{" "}
              <strong>
                {formatMoney(estimate.totalFrom)} – {formatMoney(estimate.totalTo)}
              </strong>
            </p>
          </div>

          <button
            type="button"
            className="btn btn-gold"
            onClick={() =>
              onRequest({
                segment: estimate.segment.label,
                qty: estimate.qty,
                totalFrom: estimate.totalFrom,
                totalTo: estimate.totalTo,
              })
            }
          >
            Запросить точный расчёт
          </button>
        </motion.div>
      </div>
    </StackSection>
  );
}
