import { useMemo } from "react";

type Flake = {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
  opacity: number;
  drift: string;
};

function createFlakes(count: number): Flake[] {
  return Array.from({ length: count }, (_, id) => {
    const size = 2 + ((id * 17) % 29) / 10;
    const direction = id % 2 === 0 ? 1 : -1;
    const driftAmount = 12 + (id % 18);
    return {
      id,
      left: `${(id * 37) % 100}%`,
      size: `${size}px`,
      duration: `${10 + ((id * 13) % 14)}s`,
      delay: `${-((id * 11) % 16)}s`,
      opacity: 0.22 + ((id * 7) % 20) / 100,
      drift: `${direction * driftAmount}px`,
    };
  });
}

export function Snow() {
  const flakes = useMemo(() => createFlakes(48), []);

  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snow__flake"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            ["--snow-drift" as string]: flake.drift,
          }}
        />
      ))}
    </div>
  );
}
