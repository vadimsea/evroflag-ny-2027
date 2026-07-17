import { useMemo } from "react";

const glyphs = ["❄", "❅", "❆"] as const;

type Flake = {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
  opacity: number;
  drift: string;
  glyph: (typeof glyphs)[number];
  spin: string;
};

function createFlakes(count: number): Flake[] {
  return Array.from({ length: count }, (_, id) => {
    const direction = id % 2 === 0 ? 1 : -1;
    const driftAmount = 18 + (id % 24);
    const size = 10 + ((id * 17) % 14);
    return {
      id,
      left: `${(id * 37) % 100}%`,
      size: `${size}px`,
      duration: `${11 + ((id * 13) % 12)}s`,
      delay: `${-((id * 11) % 16)}s`,
      opacity: 0.28 + ((id * 7) % 25) / 100,
      drift: `${direction * driftAmount}px`,
      glyph: glyphs[id % glyphs.length],
      spin: `${direction * (20 + (id % 25))}deg`,
    };
  });
}

export function Snow() {
  const flakes = useMemo(() => createFlakes(36), []);

  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snow__flake"
          style={{
            left: flake.left,
            fontSize: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            ["--snow-drift" as string]: flake.drift,
            ["--snow-spin" as string]: flake.spin,
          }}
        >
          {flake.glyph}
        </span>
      ))}
    </div>
  );
}
