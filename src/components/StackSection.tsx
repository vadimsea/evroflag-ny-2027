import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDesktopParallax } from "../hooks/useDesktopParallax";

type Props = {
  id?: string;
  className?: string;
  /** Stack order — higher covers lower. */
  index?: number;
  /**
   * Pin section while the next one covers it.
   * Disable for tall content (e.g. catalog) so it can scroll fully.
   */
  pin?: boolean;
  children: ReactNode;
};

/**
 * Desktop sticky-stack panels: the section pins, then the next one slides over it
 * while this one gently scales down. Mobile keeps normal document flow.
 */
export function StackSection({ id, className, index = 1, pin = true, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const desktop = useDesktopParallax();
  const pinned = desktop && pin;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], pinned ? [1, 0.9] : [1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], pinned ? [1, 0.85, 0.55] : [1, 1, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    pinned ? ["brightness(1)", "brightness(0.72)"] : ["none", "none"],
  );

  return (
    <section
      ref={ref}
      id={id}
      className={[
        "stack-section",
        desktop ? "stack-section--desktop" : "",
        pinned ? "stack-section--active" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={desktop ? { zIndex: index + 1 } : undefined}
    >
      <motion.div
        className="stack-section__panel"
        style={pinned ? { scale, opacity, filter } : undefined}
      >
        {children}
      </motion.div>
    </section>
  );
}
