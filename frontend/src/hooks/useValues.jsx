import useAnimateValue from "./useAnimateValue";

export const useValues = (prevData, data) => {
  const tempRotation = useAnimateValue(prevData.temperature ?? 0, data?.temperature ?? 0);
  const humRotation = useAnimateValue(prevData.humidity ?? 0, data?.humidity ?? 0);
  const pressRotation = useAnimateValue(prevData.pressure ?? 0, data?.pressure ?? 0);

  let tempValue, humValue, pressValue;

  tempRotation.number.to((n) => {
    tempValue = n;
  });

  humRotation.number.to((n) => {
    humValue = n;
  });

  pressRotation.number.to((n) => {
    pressValue = n;
  });

  return { tempValue, humValue, pressValue, tempRotation, humRotation, pressRotation };
};
