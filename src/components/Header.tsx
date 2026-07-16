import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { logoUrl } from "../assets";
import { contacts } from "../data";

const links = [
  { href: "#gifts", label: "Наборы" },
  { href: "#why", label: "Почему мы" },
  { href: "#contact", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
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
      </div>
    </motion.header>
  );
}
