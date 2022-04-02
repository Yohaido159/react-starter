import { factorySelector } from "../../redux/global/global.selectors";

export const UIMain = factorySelector({ baseId: "UI_main" });

export const modelsSelector = factorySelector({ baseId: "UI_main.models" });
export const modelsKeysSelector = factorySelector({
  baseId: "UI_main.models",
  func: (state) => {
    return Object.keys(state);
  },
});
