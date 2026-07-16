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
 * Desktop sticky-stack panels: the section pins, then the next one slides over it
 * while this one gently scales down. Mobile keeps normal document flow.
 */
export function StackSection({ id, className, index, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const enabled = useDesktopParallax();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], enabled ? [1, 0.9] : [1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], enabled ? [1, 0.85, 0.55] : [1, 1, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    enabled ? ["brightness(1)", "brightness(0.72)"] : ["none", "none"],
  );

  return (
    <section
      ref={ref}
      id={id}
      className={`stack-section ${enabled ? "stack-section--active" : ""} ${className ?? ""}`.trim()}
      style={enabled ? { zIndex: index + 1 } : undefined}
    >
      <motion.div
        className="stack-section__panel"
        style={enabled ? { scale, opacity, filter } : undefined}
      >
        {children}
      </motion.div>
    </section>
  );
}
