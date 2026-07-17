import { useEffect, useMemo, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

async function initParticles(engine: Engine) {
  await loadSlim(engine);
}

export function Snow() {
  const [particleCount, setParticleCount] = useState(55);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const update = () => setParticleCount(mq.matches ? 28 : 55);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: true, zIndex: 1 },
      background: { color: { value: "transparent" } },
      fpsLimit: 45,
      particles: {
        number: {
          value: particleCount,
          density: { enable: true, width: 1200, height: 800 },
        },
        color: { value: "#ffffff" },
        opacity: {
          value: { min: 0.18, max: 0.38 },
        },
        size: { value: { min: 1, max: 2.8 } },
        move: {
          enable: true,
          direction: "bottom",
          speed: { min: 0.35, max: 1.1 },
          straight: false,
          drift: { min: -0.2, max: 0.2 },
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
