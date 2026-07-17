import { useMemo } from "react";

type Flake = {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  opacity: number;
  drift: string;
  spin: string;
  variant: 0 | 1 | 2;
};

function SnowflakeIcon({ variant }: { variant: 0 | 1 | 2 }) {
  if (variant === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2v20M4.5 6.5l15 11M4.5 17.5l15-11M12 2l-2.2 3.8M12 2l2.2 3.8M12 22l-2.2-3.8M12 22l2.2-3.8M4.5 6.5l4.1.2M4.5 6.5l1.5 3.7M19.5 17.5l-4.1-.2M19.5 17.5l-1.5-3.7M4.5 17.5l4.1-.2M4.5 17.5l1.5-3.7M19.5 6.5l-4.1.2M19.5 6.5l-1.5 3.7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v18M5 7.5l14 9M5 16.5l14-9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 3l-1.8 2.2M12 3l1.8 2.2M12 21l-1.8-2.2M12 21l1.8-2.2M5 7.5l2.6-.8M5 7.5l1.2 2.4M19 16.5l-2.6.8M19 16.5l-1.2-2.4M5 16.5l2.6.8M5 16.5l1.2-2.4M19 7.5l-2.6-.8M19 7.5l-1.2 2.4"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 1.8v20.4M3.8 6.8l16.4 10.4M3.8 17.2l16.4-10.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 1.8 9.4 5.2M12 1.8l2.6 3.4M12 22.2 9.4 18.8M12 22.2l2.6-3.4M3.8 6.8l3.6.8M3.8 6.8l1.8 3.2M20.2 17.2l-3.6-.8M20.2 17.2l-1.8-3.2M3.8 17.2l3.6-.8M3.8 17.2l1.8-3.2M20.2 6.8l-3.6.8M20.2 6.8l-1.8 3.2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

function createFlakes(count: number): Flake[] {
  return Array.from({ length: count }, (_, id) => {
    const direction = id % 2 === 0 ? 1 : -1;
    return {
      id,
      left: `${(id * 37) % 100}%`,
      size: 12 + ((id * 17) % 16),
      duration: `${12 + ((id * 13) % 10)}s`,
      delay: `${-((id * 11) % 14)}s`,
      opacity: 0.35 + ((id * 7) % 30) / 100,
      drift: `${direction * (16 + (id % 22))}px`,
      spin: `${direction * (40 + (id % 50))}deg`,
      variant: (id % 3) as 0 | 1 | 2,
    };
  });
}

export function Snow() {
  const flakes = useMemo(() => createFlakes(34), []);

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
            ["--snow-spin" as string]: flake.spin,
          }}
        >
          <SnowflakeIcon variant={flake.variant} />
        </span>
      ))}
    </div>
  );
}
