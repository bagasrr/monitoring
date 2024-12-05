import { useSpring } from "@react-spring/web";

const useAnimateValue = (start, end) => {
  return useSpring({
    from: { number: start },
    number: end,
    delay: 0,
    config: { duration: 2000 },
  });
};

export default useAnimateValue;
