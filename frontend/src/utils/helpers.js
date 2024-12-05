export const getColor = (value, rules) => {
  const [min, warnMin, max, warnMax] = rules;

  if (value <= min || value >= max) {
    return "text-red-500";
  } else if (value <= warnMin || value >= warnMax) {
    return "text-yellow-500";
  } else {
    return "text-white";
  }
};

export const formatNumber = (number) => {
  if (number % 1 === 0) {
    return number.toFixed(0);
  }
  return number.toFixed(1);
};
