import { factorySelector } from "../global/global.selectors";

let selectorState = {};
console.log("selectorState", selectorState);
export const cacheForSelector = (fn) => (path, returnDefault) => {
  if (selectorState[path]) {
    return selectorState[path];
  }
  return fn(path, returnDefault);
};
export const usersSelector = cacheForSelector((path, returnDefault) => {
  const selector = factorySelector({
    baseId: `users_main.${path}`,
    returnDefault: returnDefault === undefined ? {} : returnDefault,
  });
  selectorState[path] = selector;
  return selector;
});
