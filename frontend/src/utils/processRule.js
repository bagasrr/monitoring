export const processRules = (rules) => {
  let ruleArray = [];
  rules.forEach((rule) => {
    ruleArray.push(rule.minLimit, rule.minAlert, rule.maxLimit, rule.maxAlert);
  });
  return {
    tempArray: ruleArray.slice(0, 4),
    humArray: ruleArray.slice(4, 8),
    pressArray: ruleArray.slice(8, 12),
  };
};
