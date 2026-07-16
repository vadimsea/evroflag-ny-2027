import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Header } from "./components/Header";
import { DeadlineBanner } from "./components/DeadlineBanner";
import { Hero } from "./components/Hero";
import { Quiz } from "./components/Quiz";
import { Calculator } from "./components/Calculator";
import { Gifts } from "./components/Gifts";
import { Benefits } from "./components/Benefits";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { MobileCta } from "./components/MobileCta";
import { OrderModal, type OrderRequest } from "./components/OrderModal";
import { Snow } from "./components/Snow";
import { formatMoney, type Gift } from "./data";
import "./App.css";

export default function App() {
  const [request, setRequest] = useState<OrderRequest | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia(
      "(min-width: 961px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );

    if (!desktop.matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onChange = () => {
      if (!desktop.matches) {
        cancelAnimationFrame(frame);
        lenis.destroy();
      }
    };
    desktop.addEventListener("change", onChange);

    return () => {
      desktop.removeEventListener("change", onChange);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  function openRequest(next: OrderRequest) {
    setRequest(next);
    setModalOpen(true);
  }

  function handleOrder(gift: Gift) {
    openRequest({
      title: `Заказать «${gift.name}»`,
      gift,
      defaultQty: gift.minQty,
    });
  }

  return (
    <>
      <Snow />
      <Header />
      <DeadlineBanner />
      <main className="site-main">
        <Hero
          onUrgent={() =>
            openRequest({
              title: "Срочный тираж",
              presetMessage:
                "Нужен срочный тираж к Новому году. Город доставки, желаемая дата отгрузки:",
              defaultQty: 100,
            })
          }
          onCustom={() =>
            openRequest({
              title: "Нужен свой состав",
              presetMessage:
                "Хотим собрать свой состав набора. Бюджет на 1 шт., пожелания к позициям:",
              defaultQty: 50,
            })
          }
        />
        <Quiz onOrder={handleOrder} />
        <Gifts onOrder={handleOrder} />
        <Calculator
          onRequest={({ segment, qty, totalFrom, totalTo }) =>
            openRequest({
              title: "Точный расчёт по калькулятору",
              defaultQty: qty,
              presetMessage: `Сегмент: ${segment}. Тираж: ${qty} шт. Ориентир бюджета: ${formatMoney(totalFrom)} – ${formatMoney(totalTo)}.`,
            })
          }
        />
        <Benefits />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
      <OrderModal request={request} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
