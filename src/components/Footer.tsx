import { logoUrl } from "../assets";
import { contacts } from "../data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <a href="#top" className="brand-lockup">
          <img src={logoUrl} alt="Еврофлаг" width={168} height={46} />
        </a>
        <p>
          © {new Date().getFullYear()} Еврофлаг. Новогодние корпоративные наборы.
          <br />
          <a href={contacts.site} target="_blank" rel="noreferrer">
            evroflag24.ru
          </a>
        </p>
        <a href={contacts.phoneHref}>{contacts.phone}</a>
      </div>
    </footer>
  );
}
