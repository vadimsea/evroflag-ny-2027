import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { logoUrl } from "../assets";
import { contacts } from "../data";

const links = [
  { href: "#quiz", label: "Подбор" },
  { href: "#gifts", label: "Наборы" },
  { href: "#calculator", label: "Расчёт" },
  { href: "#contact", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function goTo(href: string) {
    setMenuOpen(false);
    window.location.hash = href;
  }

  return (
    <motion.header
      className={`site-header${scrolled || menuOpen ? " is-scrolled" : ""}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container site-header__inner">
        <a className="brand-lockup" href="#top" aria-label="Еврофлаг — наверх">
          <img src={logoUrl} alt="Еврофлаг" width={148} height={40} />
        </a>
        <nav className="site-nav" aria-label="Разделы страницы">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="header-phone" href={contacts.phoneHref}>
          {contacts.phone}
        </a>
        <button
          type="button"
          className="header-menu-btn"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Мобильное меню"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <button key={link.href} type="button" onClick={() => goTo(link.href)}>
                {link.label}
              </button>
            ))}
            <a className="btn btn-primary" href={contacts.phoneHref} onClick={() => setMenuOpen(false)}>
              {contacts.phone}
            </a>
            <a className="btn btn-gold" href="#contact" onClick={() => setMenuOpen(false)}>
              Оставить заявку
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
