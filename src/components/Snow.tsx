import { useMemo } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

async function initParticles(engine: Engine) {
  await loadSlim(engine);
}

export function Snow() {
  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: { value: 55, density: { enable: true, width: 1200, height: 800 } },
        color: { value: ["#f4efe6", "#d4a85c", "#ffffff"] },
        opacity: { value: { min: 0.15, max: 0.55 } },
        size: { value: { min: 1, max: 3.2 } },
        move: {
          enable: true,
          direction: "bottom",
          speed: { min: 0.4, max: 1.4 },
          straight: false,
          outModes: { default: "out" },
        },
        shape: { type: "circle" },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <ParticlesProvider init={initParticles}>
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}
