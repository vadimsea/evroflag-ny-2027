import { useEffect, useMemo, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

async function initParticles(engine: Engine) {
  await loadSlim(engine);
}

export function Snow() {
  const [particleCount, setParticleCount] = useState(110);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const update = () => setParticleCount(mq.matches ? 45 : 110);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: true, zIndex: 2 },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: {
          value: particleCount,
          density: { enable: true, width: 1100, height: 800 },
        },
        color: { value: ["#ffffff", "#eef6ff", "#f0c56e", "#ffe8a8"] },
        opacity: {
          value: { min: 0.25, max: 0.85 },
          animation: {
            enable: true,
            speed: 0.6,
            sync: false,
          },
        },
        size: { value: { min: 1.2, max: 5 } },
        move: {
          enable: true,
          direction: "bottom",
          speed: { min: 0.5, max: 2.2 },
          straight: false,
          drift: { min: -0.3, max: 0.3 },
          outModes: { default: "out" },
        },
        rotate: {
          value: { min: 0, max: 360 },
          direction: "random",
          animation: { enable: true, speed: 4 },
        },
        shape: {
          type: ["circle", "star"],
          options: {
            star: {
              sides: 6,
            },
          },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.08,
            opacity: 1,
          },
        },
        shadow: {
          enable: true,
          color: "#ffffff",
          blur: 4,
        },
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
