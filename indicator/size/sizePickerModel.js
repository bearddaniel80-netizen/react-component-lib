export const sizeModel = Array.from(
  { length: 11 },
  (_, index) => {
    const value = 25 + index * 25;

    return {
      name: String(value),
      value,
    };
  }
);