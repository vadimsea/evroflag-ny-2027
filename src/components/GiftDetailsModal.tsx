import { useEffect } from "react";
import { createPortal } from "react-dom";
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

  return createPortal(
    <AnimatePresence>
      {open && gift && (
        <motion.div
          className="modal-root gift-details-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button className="modal-backdrop" aria-label="Закрыть" onClick={onClose} />
          <motion.div
            className="gift-details"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gift-details-title"
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
          >
            <button className="gift-details__close" onClick={onClose} aria-label="Закрыть">
              <X size={18} />
            </button>

            <div className="gift-details__media">
              <img src={gift.image} alt={gift.name} />
            </div>

            <div className="gift-details__content">
              <p className="gift-details__tag">{gift.tagline}</p>
              <h2 id="gift-details-title" className="gift-details__title">
                {gift.name}
              </h2>
              <p className="gift-details__text">{gift.description}</p>

              <div className="gift-details__block">
                <p className="gift-details__subtitle">Состав набора</p>
                <ul className="gift-details__list">
                  {gift.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="gift-details__meta">
                <div>
                  <span>Тираж</span>
                  <strong>от {gift.minQty} шт.</strong>
                </div>
                <div>
                  <span>Срок</span>
                  <strong>{gift.leadDays}</strong>
                </div>
              </div>
            </div>

            <div className="gift-details__footer">
              <span className="gift-details__price">{gift.priceLabel}</span>
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
