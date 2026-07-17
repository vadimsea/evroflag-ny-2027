import { useEffect, useMemo, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

async function initParticles(engine: Engine) {
  await loadSlim(engine);
}

export function Snow() {
  const [particleCount, setParticleCount] = useState(36);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const update = () => setParticleCount(mq.matches ? 16 : 36);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      background: { color: { value: "transparent" } },
      fpsLimit: 45,
      particles: {
        number: {
          value: particleCount,
          density: { enable: true, width: 1200, height: 800 },
        },
        color: { value: ["#ffffff", "#e8eef8"] },
        opacity: {
          value: { min: 0.08, max: 0.22 },
        },
        size: { value: { min: 0.8, max: 2.2 } },
        move: {
          enable: true,
          direction: "bottom",
          speed: { min: 0.25, max: 0.9 },
          straight: false,
          drift: { min: -0.15, max: 0.15 },
          outModes: { default: "out" },
        },
        shape: { type: "circle" },
      },
      detectRetina: true,
    }),
    [particleCount],
  );

  return (
    <ParticlesProvider init={initParticles}>
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}
