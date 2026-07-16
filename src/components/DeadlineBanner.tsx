import { deadline } from "../data";

export function DeadlineBanner() {
  return (
    <div className="deadline-banner" role="status">
      <div className="container deadline-banner__inner">
        <div className="deadline-banner__text">
          <span className="deadline-banner__pulse" aria-hidden="true" />
          <p>
            Чтобы успеть к <strong>{deadline.shipWindow}</strong>, тираж{" "}
            <strong>{deadline.minQtyHint}</strong> лучше зафиксировать до{" "}
            <strong>{deadline.lockBy}</strong>
          </p>
        </div>
        <a href="#contact" className="deadline-banner__cta">
          Зафиксировать тираж
        </a>
      </div>
    </div>
  );
}
