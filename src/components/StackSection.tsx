import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDesktopParallax } from "../hooks/useDesktopParallax";

type Props = {
  id?: string;
  className?: string;
  /** Stack order — higher covers lower. */
  index: number;
  children: ReactNode;
};

/**
 * Desktop sticky-stack: each panel pins at 100vh, the next slides over it
 * with a soft scale/fade. Tall content scrolls inside the panel.
 */
export function StackSection({ id, className, index, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const desktop = useDesktopParallax();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], desktop ? [1, 0.92] : [1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], desktop ? [1, 0.9, 0.6] : [1, 1, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    desktop ? ["brightness(1)", "brightness(0.7)"] : ["none", "none"],
  );

  return (
    <section
      ref={ref}
      id={id}
      className={[
        "stack-section",
        desktop ? "stack-section--desktop stack-section--active" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={desktop ? { zIndex: index } : undefined}
    >
      <motion.div
        className="stack-section__panel"
        style={desktop ? { scale, opacity, filter } : undefined}
      >
        <div className="stack-section__content">{children}</div>
      </motion.div>
    </section>
  );
}
