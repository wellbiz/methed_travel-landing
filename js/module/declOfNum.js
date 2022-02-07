// возвращает число и слово
export const arrHours = ["час", "часа", "часов"];
export const arrDays = ["день", "дня", "дней"];
export const arrMinutes = ["минута", "минуты", "минут"];
export const arrSeconds = ["секунда", "секунды", "секунд"];

export const declOfNum = (n, titles) => {
  return titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];
};
