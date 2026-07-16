export type Gift = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  priceLabel: string;
};

export const gifts: Gift[] = [
  {
    id: "northern-light",
    name: "Северный свет",
    tagline: "Тёплый старт сезона",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Набор для клиентов, которым важен уют и узнаваемый бренд.",
    includes: ["Шарф с логотипом", "Носки брендированные", "Открытка"],
    priceLabel: "от 2 900 ₽",
  },
  {
    id: "corporate-cozy",
    name: "Корпоративный уют",
    tagline: "Для команды и партнёров",
    description:
      "Sed do eiusmod tempor incididunt ut labore. Практичные текстильные позиции с вашим логотипом в праздничной упаковке.",
    includes: ["Плед / худи", "Термокружка", "Фирменная упаковка"],
    priceLabel: "от 4 500 ₽",
  },
  {
    id: "business-fest",
    name: "Деловой праздник",
    tagline: "Лаконично и статусно",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation. Аккуратный набор аксессуаров для деловых поздравлений.",
    includes: ["Блокнот", "Ручка с логотипом", "Ланъярд / шопер"],
    priceLabel: "от 3 200 ₽",
  },
  {
    id: "team-of-year",
    name: "Команда года",
    tagline: "Единый стиль для всех",
    description:
      "Duis aute irure dolor in reprehenderit. Корпоративная одежда и аксессуары, которые соберут сотрудников в одном визуальном коде.",
    includes: ["Худи или поло", "Кепка / шапка", "Бейдж-лента"],
    priceLabel: "от 5 800 ₽",
  },
  {
    id: "premium-winter",
    name: "Премиум зима",
    tagline: "VIP-поздравление",
    description:
      "Excepteur sint occaecat cupidatat non proident. Расширенный премиальный комплект для ключевых клиентов и руководства.",
    includes: ["Премиум текстиль", "Подарочная коробка", "Персональное письмо"],
    priceLabel: "от 9 900 ₽",
  },
  {
    id: "mini-fest",
    name: "Мини-праздник",
    tagline: "Массовый тираж",
    description:
      "Sunt in culpa qui officia deserunt mollit. Компактный и бюджетный вариант для больших списков получателей.",
    includes: ["Сувенир с логотипом", "Открытка", "Крафт-упаковка"],
    priceLabel: "от 1 490 ₽",
  },
];

export const contacts = {
  phone: "+7 (499) 212-01-32",
  phoneHref: "tel:+74992120132",
  email: "24@evroflag24.ru",
  emailHref: "mailto:24@evroflag24.ru",
  address: "214000, г. Смоленск, ул. Докучаева, дом 9, офис 1",
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
