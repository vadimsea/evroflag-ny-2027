import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDesktopParallax } from "../hooks/useDesktopParallax";

type Props = {
  id?: string;
  className?: string;
  /** Stack order — higher covers lower. */
  index: number;
  /**
   * Sticky pin for short sections. Disable for tall catalog so page has
   * a single scroll and content is not clipped.
   */
  pin?: boolean;
  children: ReactNode;
};

/**
 * Desktop sticky-stack for viewport-sized sections.
 * Tall sections use pin={false}: normal scroll, still covers previous panels.
 */
export function StackSection({ id, className, index, pin = true, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const desktop = useDesktopParallax();
  const pinned = desktop && pin;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], pinned ? [1, 0.92] : [1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], pinned ? [1, 0.9, 0.6] : [1, 1, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    pinned ? ["brightness(1)", "brightness(0.7)"] : ["none", "none"],
  );

  return (
    <section
      ref={ref}
      id={id}
      className={[
        "stack-section",
        desktop ? "stack-section--desktop" : "",
        pinned ? "stack-section--active" : "",
        desktop && !pin ? "stack-section--flow" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={desktop ? { zIndex: index } : undefined}
    >
      <motion.div
        className="stack-section__panel"
        style={pinned ? { scale, opacity, filter } : undefined}
      >
        <div className="stack-section__content">{children}</div>
      </motion.div>
    </section>
  );
}
