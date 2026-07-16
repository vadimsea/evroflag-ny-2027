import { deadline } from "../data";

export function DeadlineBanner() {
  return (
    <div className="deadline-banner" role="status">
      <div className="container deadline-banner__inner">
        <div className="deadline-banner__text">
          <span className="deadline-banner__pulse" aria-hidden="true" />
          <p>
            <span className="deadline-banner__full">
              Чтобы успеть к <strong>{deadline.shipWindow}</strong>, тираж{" "}
              <strong>{deadline.minQtyHint}</strong> лучше зафиксировать до{" "}
              <strong>{deadline.lockBy}</strong>
            </span>
            <span className="deadline-banner__short">
              Успеть к <strong>{deadline.shipWindow}</strong> → заказ до{" "}
              <strong>{deadline.lockBy}</strong>
            </span>
          </p>
        </div>
        <a href="#contact" className="deadline-banner__cta">
          Зафиксировать тираж
        </a>
      </div>
    </div>
  );
}
