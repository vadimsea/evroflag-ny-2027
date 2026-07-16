import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Gift } from "../data";

export type OrderRequest = {
  title: string;
  presetMessage?: string;
  defaultQty?: number;
  gift?: Gift | null;
};

type Props = {
  request: OrderRequest | null;
  open: boolean;
  onClose: () => void;
};

export function OrderModal({ request, open, onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      return;
    }
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  return (
    <AnimatePresence>
      {open && request && (
        <motion.div
          className="modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="modal-backdrop" aria-label="Закрыть" onClick={onClose} />
          <motion.div
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Закрыть форму">
              <X size={20} />
            </button>

            {status === "idle" ? (
              <>
                <p className="section-label">Заявка менеджеру</p>
                <h2 id="order-title" className="modal-title">
                  {request.title}
                </h2>
                <p className="modal-lead">
                  Укажите контакты — менеджер Еврофлаг свяжется, уточнит детали и подготовит
                  коммерческое предложение. Ответ в рабочее время обычно за 30–60 минут.
                </p>
                <form className="modal-form" onSubmit={handleSubmit} key={request.title}>
                  <input type="hidden" name="request" value={request.title} />
                  <div className="field">
                    <label htmlFor="order-name">Имя</label>
                    <input id="order-name" name="name" required placeholder="Как к вам обращаться" />
                  </div>
                  <div className="field">
                    <label htmlFor="order-phone">Телефон</label>
                    <input
                      id="order-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="order-email">E-mail</label>
                    <input
                      id="order-email"
                      name="email"
                      type="email"
                      required
                      placeholder="name@company.ru"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="order-qty">Количество наборов</label>
                    <input
                      id="order-qty"
                      name="qty"
                      type="number"
                      min={1}
                      defaultValue={request.defaultQty ?? request.gift?.minQty ?? 50}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="order-deadline">Дедлайн</label>
                    <input
                      id="order-deadline"
                      name="deadline"
                      placeholder="Например, отгрузка к 20 декабря"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="order-msg">Комментарий</label>
                    <textarea
                      id="order-msg"
                      name="message"
                      defaultValue={request.presetMessage ?? ""}
                      placeholder="Логотип, город доставки, особые пожелания…"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Отправить заявку
                  </button>
                </form>
              </>
            ) : (
              <div className="modal-success">
                <p className="section-label">Готово</p>
                <h2 className="modal-title">Заявка отправлена</h2>
                <p className="modal-lead">
                  Спасибо! Мы получили запрос «{request.title}». Менеджер свяжется с вами в рабочее
                  время.
                </p>
                <button type="button" className="btn btn-ghost" onClick={onClose}>
                  Закрыть
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
