import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Gifts } from "./components/Gifts";
import { Benefits } from "./components/Benefits";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { OrderModal } from "./components/OrderModal";
import { Snow } from "./components/Snow";
import type { Gift } from "./data";
import "./App.css";

export default function App() {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  function handleOrder(gift: Gift) {
    setSelectedGift(gift);
    setModalOpen(true);
  }

  return (
    <>
      <Snow />
      <Header />
      <main>
        <Hero />
        <Gifts onOrder={handleOrder} />
        <Benefits />
        <Contact />
      </main>
      <Footer />
      <OrderModal
        gift={selectedGift}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
