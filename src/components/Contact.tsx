import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { contacts, gifts } from "../data";
import { StackSection } from "./StackSection";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  return (
    <StackSection id="contact" className="section contact" index={3}>
      <div className="container contact__grid">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Контакты</p>
          <h2 className="section-title">Оставьте заявку — соберём предложение</h2>
          <p className="section-lead">
            Расскажите о тираже, городе и дедлайне. Менеджер уточнит детали и пришлёт КП — обычно в
            рабочее время за 30–60 минут.
          </p>

          <ul className="contact__details">
            <li>
              <Phone size={18} />
              <a href={contacts.phoneHref}>{contacts.phone}</a>
            </li>
            <li>
              <Mail size={18} />
              <a href={contacts.emailHref}>{contacts.email}</a>
            </li>
            <li>
              <MapPin size={18} />
              <span>
                {contacts.address}
                <br />
                {contacts.hours}
              </span>
            </li>
          </ul>

          <div className="contact__messengers">
            <a className="btn btn-ghost" href={contacts.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <a className="btn btn-ghost" href={contacts.telegram} target="_blank" rel="noreferrer">
              <Send size={18} />
              Telegram
            </a>
          </div>
        </motion.div>

        <motion.div
          className="contact__form-wrap"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          {status === "idle" ? (
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="contact-name">Имя</label>
                <input id="contact-name" name="name" required placeholder="Иван Иванов" />
              </div>
              <div className="contact__row">
                <div className="field">
                  <label htmlFor="contact-phone">Телефон</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">E-mail</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.ru"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="contact-gift">Интересующий набор</label>
                <select id="contact-gift" name="gift" defaultValue="">
                  <option value="">Не выбран / нужна консультация</option>
                  {gifts.map((gift) => (
                    <option key={gift.id} value={gift.name}>
                      {gift.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="contact-msg">Сообщение</label>
                <textarea
                  id="contact-msg"
                  name="message"
                  required
                  placeholder="Тираж, город, дедлайн, пожелания к составу…"
                />
              </div>
              <button type="submit" className="btn btn-gold">
                Отправить менеджеру
              </button>
            </form>
          ) : (
            <div className="contact__success">
              <p className="section-label">Спасибо</p>
              <h3 className="section-title" style={{ fontSize: "1.85rem" }}>
                Заявка принята
              </h3>
              <p className="section-lead">
                Мы свяжемся с вами по указанным контактам в рабочее время отдела продаж.
              </p>
              <button type="button" className="btn btn-ghost" onClick={() => setStatus("idle")}>
                Отправить ещё одну
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </StackSection>
  );
}
