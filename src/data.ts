import { imageUrl } from "./assets";

export type Audience = "employees" | "clients" | "vip" | "mass";

export type Gift = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  priceLabel: string;
  priceFrom: number;
  priceTo: number;
  minQty: number;
  leadDays: string;
  audiences: Audience[];
  image: string;
};

export const deadline = {
  shipWindow: "20–25 декабря",
  lockBy: "15 ноября",
  minQtyHint: "от 50 шт.",
};

export const gifts: Gift[] = [
  {
    id: "northern-light",
    name: "Северный свет",
    tagline: "Тёплый старт сезона",
    description:
      "Уютный набор для сотрудников и партнёров: вещи, которые носят, а не оставляют в шкафу. Логотип на текстиле — аккуратно и в ваших цветах.",
    includes: ["Шарф с логотипом", "Носки брендированные", "Открытка"],
    priceLabel: "от 2 900 ₽",
    priceFrom: 2900,
    priceTo: 3900,
    minQty: 50,
    leadDays: "12–18 раб. дней",
    audiences: ["employees", "clients"],
    image: imageUrl("gift-1.jpg"),
  },
  {
    id: "corporate-cozy",
    name: "Корпоративный уют",
    tagline: "Для команды и партнёров",
    description:
      "Практичный комплект «на каждый день»: плед или худи, кружка и фирменная упаковка. Хорошо заходит на корпоратив и клиентскую рассылку.",
    includes: ["Плед / худи", "Термокружка", "Фирменная упаковка"],
    priceLabel: "от 4 500 ₽",
    priceFrom: 4500,
    priceTo: 6200,
    minQty: 30,
    leadDays: "14–20 раб. дней",
    audiences: ["employees", "clients"],
    image: imageUrl("gift-2.jpg"),
  },
  {
    id: "business-fest",
    name: "Деловой праздник",
    tagline: "Лаконично и статусно",
    description:
      "Сдержанный набор для деловых поздравлений: ничего лишнего, всё с логотипом, удобно дарить клиентам и подрядчикам.",
    includes: ["Блокнот", "Ручка с логотипом", "Ланъярд / шопер"],
    priceLabel: "от 3 200 ₽",
    priceFrom: 3200,
    priceTo: 4500,
    minQty: 50,
    leadDays: "10–16 раб. дней",
    audiences: ["clients", "employees"],
    image: imageUrl("gift-3.jpg"),
  },
  {
    id: "team-of-year",
    name: "Команда года",
    tagline: "Единый стиль для всех",
    description:
      "Одежда и аксессуары в одном визуальном коде — чтобы команда выглядела цельно на мероприятиях и в офисе.",
    includes: ["Худи или поло", "Кепка / шапка", "Бейдж-лента"],
    priceLabel: "от 5 800 ₽",
    priceFrom: 5800,
    priceTo: 7900,
    minQty: 20,
    leadDays: "16–22 раб. дня",
    audiences: ["employees"],
    image: imageUrl("gift-4.jpg"),
  },
  {
    id: "premium-winter",
    name: "Премиум зима",
    tagline: "VIP-поздравление",
    description:
      "Расширенный комплект для ключевых клиентов и руководства: премиум-текстиль, коробка и персональное письмо.",
    includes: ["Премиум текстиль", "Подарочная коробка", "Персональное письмо"],
    priceLabel: "от 9 900 ₽",
    priceFrom: 9900,
    priceTo: 14900,
    minQty: 10,
    leadDays: "18–25 раб. дней",
    audiences: ["vip", "clients"],
    image: imageUrl("unbox.jpg"),
  },
  {
    id: "mini-fest",
    name: "Мини-праздник",
    tagline: "Массовый тираж",
    description:
      "Компактный и бюджетный формат, когда список получателей большой. Быстро собирается, легко масштабируется.",
    includes: ["Сувенир с логотипом", "Открытка", "Крафт-упаковка"],
    priceLabel: "от 1 490 ₽",
    priceFrom: 1490,
    priceTo: 2200,
    minQty: 100,
    leadDays: "8–14 раб. дней",
    audiences: ["mass", "employees", "clients"],
    image: imageUrl("tag.jpg"),
  },
];

export const quizOptions: { id: Audience; label: string; hint: string }[] = [
  { id: "employees", label: "Сотрудникам", hint: "Команда, филиалы, корпоратив" },
  { id: "clients", label: "Клиентам", hint: "Партнёры и деловые поздравления" },
  { id: "vip", label: "VIP", hint: "Ключевые клиенты и руководство" },
  { id: "mass", label: "Массовая рассылка", hint: "Большой тираж, единый бюджет" },
];

export const calcSegments = [
  { id: "mass", label: "Массовый", giftId: "mini-fest" },
  { id: "standard", label: "Стандарт", giftId: "northern-light" },
  { id: "business", label: "Деловой", giftId: "business-fest" },
  { id: "team", label: "Команда", giftId: "team-of-year" },
  { id: "premium", label: "Премиум", giftId: "premium-winter" },
] as const;

export const contacts = {
  phone: "+7 (499) 212-01-32",
  phoneHref: "tel:+74992120132",
  email: "24@evroflag24.ru",
  emailHref: "mailto:24@evroflag24.ru",
  address: "214000, г. Смоленск, ул. Верхне-Сенная, д. 4, офис 231",
  hours: "пн–пт: 9:00–18:00",
  site: "https://evroflag24.ru/",
  telegram: "https://t.me/evroflag24",
  whatsapp: "https://wa.me/79107634472",
};

export const benefits = [
  {
    title: "Своё производство",
    text: "Печать, пошив и комплектация под ключ — без посредников и задержек на стыках.",
  },
  {
    title: "Логотип как надо",
    text: "Точное попадание в фирменные цвета и качество нанесения, к которому привыкли ваши клиенты.",
  },
  {
    title: "Доставка по РФ",
    text: "Соберём партии под ваши сроки и отправим новогодние наборы в нужные города.",
  },
];

export function formatMoney(value: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(value)) + " ₽";
}

export function getGiftById(id: string) {
  return gifts.find((gift) => gift.id === id);
}
