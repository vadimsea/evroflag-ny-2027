import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDesktopParallax } from "../hooks/useDesktopParallax";

type Props = {
  id?: string;
  className?: string;
  /** Max vertical shift in px while the section crosses the viewport. */
  distance?: number;
  children: ReactNode;
};

export function ParallaxSection({ id, className, distance = 56, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const enabled = useDesktopParallax();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], enabled ? [distance, -distance] : [0, 0]);

  return (
    <section ref={ref} id={id} className={`parallax-section ${className ?? ""}`.trim()}>
      <motion.div className="parallax-section__inner" style={{ y }}>
        {children}
      </motion.div>
    </section>
  );
}
