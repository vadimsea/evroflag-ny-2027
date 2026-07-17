import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Gift } from "../data";

type Props = {
  gift: Gift | null;
  open: boolean;
  onClose: () => void;
  onOrder: (gift: Gift) => void;
};

export function GiftDetailsModal({ gift, open, onClose, onOrder }: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && gift && (
        <motion.div
          className="modal-root gift-details-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            className="modal-backdrop"
            aria-label="Закрыть"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="modal-panel gift-details"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gift-details-title"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.85 }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Закрыть">
              <X size={20} />
            </button>

            <div className="gift-details__media">
              <img src={gift.image} alt={gift.name} />
            </div>

            <div className="gift-details__body">
              <p className="section-label">{gift.tagline}</p>
              <h2 id="gift-details-title" className="modal-title">
                {gift.name}
              </h2>
              <p className="modal-lead">{gift.description}</p>

              <p className="gift-details__subtitle">Состав набора</p>
              <ul className="gift__list gift-details__list">
                {gift.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="gift-details__meta">
                <span>
                  Тираж от <strong>{gift.minQty} шт.</strong>
                </span>
                <span>
                  Срок <strong>{gift.leadDays}</strong>
                </span>
              </div>

              <div className="gift-details__footer">
                <span className="gift__price">{gift.priceLabel}</span>
                <div className="gift-details__actions">
                  <button type="button" className="btn btn-ghost" onClick={onClose}>
                    Закрыть
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      onClose();
                      onOrder(gift);
                    }}
                  >
                    Заказать
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
