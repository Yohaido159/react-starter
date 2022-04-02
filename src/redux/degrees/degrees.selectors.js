import { factorySelector } from "../../redux/global/global.selectors";

export const selectorDegreeItems = factorySelector({
  baseId: "degrees_main.items",
});
export const degreeMainCheckItem = factorySelector({
  baseId: "degrees_main.checkItem",
});
