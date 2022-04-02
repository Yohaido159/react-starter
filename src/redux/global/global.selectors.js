import { createCachedSelector } from "re-reselect";
import { createSelectorCreator, defaultMemoize } from "reselect";
import isEqual from "lodash.isequal";
import get from "lodash.get";
import setWith from "lodash.setwith";
import has from "lodash.has";

import { getFromState } from "../../utils/utils";
import { store } from "../../redux/store";

const selectById = (state, id) => id;
const selectById2 = (state, id, id2) => [id, id2];
const selectState = (state) => state;
const strEqual = (value, other) => {
  return JSON.stringify(value) === JSON.stringify(other);
};
export const strEqualSelector = createSelectorCreator(defaultMemoize, strEqual);

const getChunkState = (baseId) => (state) => {
  return get(state, baseId);
};

let selectorState = {};

export const factorySelector = (options) => {
  const { baseId, type = "quick", func, returnDefault } = options;
  const stateById = getChunkState(baseId);
  const cacheSelector = createCachedSelector(
    stateById,
    selectById2,
    (state, ids) => {
      const id1 = ids[0];
      const id2 = ids[1];
      if (func) {
        const stateChunk = getFromState(state, id1);
        if (typeof id2 === "object" && id2.type === "state") {
          const state = store.getState();
          const stateById = getFromState(state, id2.path, returnDefault);
          return func(stateChunk, stateById);
        } else {
          return func(stateChunk, id2);
        }
      }

      return getFromState(state, id1, id2 !== undefined ? id2 : returnDefault);
    }
  )({
    keySelector: (state, id) => `${baseId}.${id}_${type}`,
    selectorCreator: strEqualSelector,
  });

  return cacheSelector;
};

export const cacheForSelector = (fn) => (path, returnDefault) => {
  if (selectorState[path]) {
    return selectorState[path];
  }
  return fn(path, returnDefault);
};

let passDataSelectorRaw = (path, returnDefault) => {
  const selector = factorySelector({
    baseId: `global_main.passData.${path}`,
    returnDefault: returnDefault === undefined ? {} : returnDefault,
  });
  selectorState[path] = selector;
  return selector;
};

export const passDataSelector = cacheForSelector(passDataSelectorRaw);

export const dashboardSelector = factorySelector({
  baseId: "global_main.passData.Dashboard",
});
