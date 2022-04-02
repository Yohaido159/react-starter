import React, { lazy, Suspense, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import set from "lodash.set";
import setWith from "lodash.setwith";
import get from "lodash.get";
import merge from "lodash.merge";
import has from "lodash.has";
import omit from "lodash.omit";
import filter from "lodash.filter";
import unset from "lodash.unset";
import pickBy from "lodash.pickby";
import includes from "lodash.includes";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const processSetAddToRedux = (action, state) => {
  const path = action.payload.path;
  const data = action.payload.data;
  const effect = action.payload.effect;
  const nestedList = action.payload.nestedList;

  let arr = [];

  switch (effect) {
    case "replace":
      set(state, path, data);
      break;
    case "push":
      arr = get(state, path);
      arr.push(data);
      setWith(state, path, arr, Object);
      break;
    case "modify":
      let obj = get(state, path);
      let new_obj = { ...obj, ...data };
      setWith(state, path, new_obj, Object);
      break;
    case "calc":
      let number = get(state, path);
      let newNumber = number + data;
      set(state, path, newNumber);
      break;
    case "modifyNested":
      for (let item of nestedList) {
        setWith(state, `${path}.${item}`, get(data, item), Object);
      }
      break;
    case "modifyList":
      arr = get(state, path);
      console.log("arr", arr);
      if (typeof arr === "object" && isObjEmpty(arr)) {
        arr = [];
        set(state, path, arr);
      }
      arr.push(...data);
      set(state, path, arr);
      // let currentList = get(state, path);
      // let newList = merge(currentList, data);
      // set(state, path, newList);
      break;
    case "deleteNested":
      for (let item of nestedList) {
        unset(state, `${path}.${item}`);
      }
      break;
    case "removeFromList":
      arr = get(state, path);
      arr = filter(arr, (value, index) => index !== data);
      set(state, path, arr);
      break;
    case "delete":
      unset(state, path);
      break;
    default:
      break;
  }
};

export const removeUserToken = () => {
  window.localStorage.removeItem("token");
  window.sessionStorage.removeItem("token");
  window.localStorage.setItem("logout", Date.now().toString());
  window.localStorage.removeItem("logout");
};

export const getUserToken = () => {
  let token =
    window.localStorage.getItem("token") ||
    window.sessionStorage.getItem("token") ||
    null;
  return token;
};

export const setUserToken = (token) => {
  window.localStorage.setItem("token", token);
};

export const getFromState = (data, path, defaultReturn) => {
  if (path === "" || !path) {
    return data || defaultReturn;
  }
  const res = get(data, path);
  return res === undefined ? defaultReturn : res;
};

export const useGetPathname = () => {
  const location = useLocation();
  return location.pathname.split("/")[location.pathname.split.length];
};

export const withReturnArray = (obj, type = "values", config = {}) => {
  let array = [];
  if (obj === undefined || obj === null) {
    array = [];
  } else {
    //console.log("bbbelse");
    if (type === "values") {
      array = Object.values(obj);
      //console.log("bbbarray", array);
    } else if (type === "keys") {
      array = Object.keys(obj);
    } else if (type === "entries") {
      array = Object.entries(obj);
    }
  }
  if (config.withIds) {
    array = withIds(array);
  }
  return array;
};

export const withIds = (array) => {
  array = array.reduce((arr, currentValue, index) => {
    arr.push({ ...currentValue, id: index });
    return arr;
  }, []);
  return array;
};

export const getNameExt = (name) => {
  console.log("name", name);
  let newName = name;
  newName = newName.split(".");
  const ext = newName.splice(-1, 1)[0];
  newName = newName.join(".");
  return [newName, ext];
};

// export const compressImage = async (file, quality = 0.15) => {
//   const options = {
//     maxSizeMB: quality,
//     maxWidthOrHeight: 1920,
//     maxIteration: 100,
//   };
//   const compressedFile = await imageCompression(file, options);
//   return compressedFile;
// };
// export const checkIfLogin = (Wrap) => {
//   console.log("HOC");
//   const HOC = (props) => {
//     const userDraft = useSelector(selectUserIsDraft);
//     const token = getUserToken();
//     return (
//       <React.Fragment>
//         <MainPageForUnLog />
//       </React.Fragment>
//     );
//   };
//   return HOC;
// };
export const makeArrayObj = (array, id = "id") => {
  let newArray = array.reduce((acc, item) => {
    acc[item["id"]] = item;
    return acc;
  }, {});
  return newArray;
};
export const withReturnObj = (obj) => {
  if (obj === undefined || obj === null) {
    return {};
  } else {
    return obj;
  }
};

export const withReturnArrayErr = (obj) => {
  if (obj === undefined || obj === null || typeof obj !== "object") {
    return ["אירעה שגיאה"];
  } else {
    return Object.values(obj);
  }
};
export const withReturnObjFirst = (obj) => {
  if (!obj) {
    return {};
  } else if (isObjEmpty(obj)) {
    return {};
  } else {
    return Object.values(obj)[0];
  }
};
export const withReturnArrayFirst = (obj) => {
  if (obj === undefined || obj === null) {
    return [];
  } else {
    return Object.values(obj)[0];
  }
};
export const withReturnArrayFlatFromObj = (obj) => {
  if (obj === undefined || obj === null) {
    return [];
  } else {
    let arr = Object.values(obj);
    arr = arr.reduce((acc, cur) => {
      const currentItem = withReturnArray(cur);
      acc.push(...currentItem);
      return acc;
    }, []);
    return arr;
  }
};
// export const changeTheme = (path) => {
//   if (path.includes("/course/") || path.includes("/users/")) {
//     return editTheme;
//   } else {
//     return normalTheme;
//   }
// };
export const isObjEmpty = (obj) => {
  if (obj === undefined || obj === null) {
    return true;
  }
  return Object.keys(obj).length === 0;
};
export const isArrayEmpty = (arr) => {
  return arr.length === 0;
};
export const isObjFull = (obj) => {
  if (!obj) return false;
  return withReturnArray(obj, "keys").length > 0;
};
export const isObjEmptyOrNull = (obj) => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};
export const isArrEmpty = (arr) => {
  //////console.log("arr", arr);
  if (!arr) return;
  return arr.length === 0;
};
export const checkIfHtmlFull = (htmlObj) => {
  //console.log("htmlObj", htmlObj);
  if (isObjEmptyOrNull(htmlObj)) return;
  for (let block of htmlObj.blocks) {
    if (Boolean(block.text)) {
      return true;
    } else {
      continue;
    }
  }
  return false;
};
export const withSpace = (func) => (e) => {
  //////console.log("e", e.keyCode);
  if (e.keyCode === 32) {
    func();
  } else return func;
};
export const withSpaceEnter = (func) => (e) => {
  if (e.keyCode === 32 || e.keyCode === 13) {
    func();
  } else return func;
};
export const withEnter = (func) => (e) => {
  if (e.keyCode === 13) {
    func();
  } else return func;
};
export const withEsc = (func) => (e) => {
  if (e.keyCode === 27) {
    func();
  } else return func;
};
export const withRandomArr = (arr, type = null) => {
  if (arr.length === 0) return [];
  const randomNum = Math.floor(Math.random() * arr.length);
  let randomImg = null;
  if (type) {
    //console.log("type", type);
    //console.log("arr[randomNum]", arr[randomNum]);
    randomImg = arr[randomNum][type];
  } else {
    randomImg = arr[randomNum];
  }
  return randomImg;
};
export const withCurrentTarget = (func) => (e) => {
  //console.log("e.target === e.currentTarget", e.target, e.currentTarget);
  if (e.target === e.currentTarget) return func;
  return null;
};
export const setNameWithExt = (name, nameWithExt) => {
  let newName = nameWithExt;
  newName = newName.split(".");
  const ext = newName.splice(-1, 1)[0];
  newName = newName.join(".");
  return `${name}.${ext}`;
};
export const withLowerQuality = (url) => {
  if (!url) return;
  const [newName, ext] = getNameExt(url);
  return `${newName}=lower.${ext}`;
};
// export const uploadWithQuality = async (file, type, action) => {
//   const orginalName = action.orginalName;
//   const courseUuid = action.courseUuid;
//   let quality = null;
//   for (let i = 0; i < 2; i++) {
//     if (i === 0) {
//       file = await compressImage(file);
//       file.name_without_change = orginalName;
//       if (type === "avatar" || type === "avatarBig") {
//         store.dispatch({
//           type: uploadCourseTypes.START_UPLOAD_TO_S3,
//           payload: { file_type: type, file },
//         });
//       } else if (type === "courseImage") {
//         store.dispatch({
//           type: uploadCourseTypes.START_UPLOAD_TO_S3,
//           payload: { file_type: type, file, unique_id: courseUuid },
//         });
//       }
//     } else if (i === 1) {
//       quality = 0.02;
//       file = await compressImage(file, quality);
//       //console.log("file", file);
//       file.name_without_change = orginalName;
//       const [name, ext] = getNameExt(file.name);
//       file.name = `${orginalName}=lower.${ext}`;
//       if (type === "avatar" || type === "avatarBig") {
//         store.dispatch({
//           type: uploadCourseTypes.START_UPLOAD_TO_S3,
//           payload: { file_type: type, file, isLower: true },
//         });
//       } else if (type === "courseImage") {
//         store.dispatch({
//           type: uploadCourseTypes.START_UPLOAD_TO_S3,
//           payload: {
//             file_type: type,
//             file,
//             unique_id: courseUuid,
//             isLower: true,
//           },
//         });
//       }
//     }
//   }
// };
// export const parseHtml = (obj) => {
//   if (!obj) return "<div></div>";
//   const parsed = draftToHtml(obj);
//   return parsed;
// };
export const withEmptyInfo = (arrays, info, payload = {}) => {
  ////console.log("arrays", arrays);
  if (arrays.length === 0)
    return (
      <div
        style={payload.style}
        className={`d-flex justify-content-center flex-grow-2  `}
      >
        <div className="w-100 d-flex justify-content-center align-items-center color-info mh-9">
          <h5>{info}</h5>
        </div>
      </div>
    );
  else return arrays;
};

export const deeptest = (string, obj) => {
  let stringArr = string.split(".");
  let startObj = obj;
  let currentItem = null;
  let allProblems = [];
  let stringCurrect = [];

  while (startObj && stringArr.length) {
    currentItem = stringArr.shift();
    startObj = startObj[currentItem];
    if (startObj) {
      stringCurrect.push(currentItem);
    }
    if (!startObj) {
      stringCurrect = stringCurrect.join(".");
      stringArr = [currentItem, ...stringArr];
      allProblems = setArrOfProb(stringCurrect, stringArr);
    }
  }
  return allProblems;
};
const setArrOfProb = (problemPath, arr) => {
  const arrProblems = [];
  let idx = 0;
  let probItem = `${problemPath}.${arr[idx]}`;
  arrProblems.push(probItem);
  for (let item of arr) {
    if (idx > 0) {
      arrProblems.push(`${arrProblems[idx - 1]}.${item}`);
    }
    idx += 1;
  }
  return arrProblems;
};

export function memoizeSelector(f) {
  return function () {
    const args = Array.prototype.slice.call(arguments);
    f.memoize = f.memoize || {};
    return args in f.memoize
      ? f.memoize[args]
      : (f.memoize[args] = f.apply(this, args));
  };
}
export const myIsEqualArr = (input) => (a, b) => {
  return JSON.stringify(a[input]) === JSON.stringify(b[input]);
};
export const myIsEqualObj = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};
export const myIsEqualStr = (input) => (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const makeDeepTest = (isExsist, state) => {
  const problems = deeptest(isExsist, state);
  console.log("problems", problems);
  for (let item of problems) {
    set(state, item, {});
  }
};
export const withJsonParse = (obj) => {
  //console.log("obj", obj);
  if (typeof obj === "string") {
    return JSON.parse(obj);
  }
  //console.log("obj", obj);
  return obj;
};

export const flatObjToObjByPath = (obj, path) => {
  //console.log("obj11", obj);
  const newObj = withReturnArray(obj).reduce((acc, item) => {
    acc = { ...acc, ...get(item, path) };
    return acc;
  }, {});
  return newObj;
};
export const filterObjByList = (obj, list) => {
  let newObj = {};
  newObj = pickBy(obj, (value, key) => {
    const idx = list.indexOf(key);
    if (idx !== -1) {
      return { [key]: value };
    }
  });
  return newObj;
};
export const returnProperties = (obj, properties) => {
  let newObj = {};
  for (let item of properties) {
    newObj[item] = obj[item];
  }
  return newObj;
};
export const returnPropertiesNested = (obj, properties) => {
  let newObj = {};
  for (let innerObjKey of withReturnArray(obj, "keys")) {
    let innerObj = returnProperties(obj[innerObjKey], properties);
    newObj[innerObjKey] = innerObj;
  }
  return newObj;
};
export const makeArrayPathFromObj = (obj) => {
  if (!obj) return [];
  let paths = {};
  const makePathFromObj = (obj, path = "", nested = false) => {
    const oldPath = path;
    for (let itemKey of Object.keys(obj)) {
      // if (nested) {
      path = oldPath;
      // }
      if (path) {
        path = `${path}.${itemKey}`;
      } else {
        path = `${itemKey}`;
      }
      paths[path] = path;
      const itemValue = obj[itemKey];
      if (typeof itemValue === "object") {
        delete paths[path];
        makePathFromObj(itemValue, path, true);
      }
    }
  };
  makePathFromObj(obj);
  return withReturnArray(paths);
};
export const getTime = (sec) => {
  let hours = Math.floor(sec / 3600);
  sec %= 3600;
  let mins = Math.floor(sec / 60);
  let secs = Math.floor(sec % 60);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (mins < 10) {
    mins = "0" + mins;
  }
  if (secs < 10) {
    secs = "0" + secs;
  }
  const stringSec = `${hours > 0 ? `${hours}:` : ""}${mins}:${secs} `;
  return stringSec;
};
export const makeLoginEvent = (accessToken, rememberMe) => {
  console.log("rememberMe accessToken", { rememberMe, accessToken });
  if (rememberMe) {
    window.localStorage.setItem("token", accessToken);
    let event = new Event("storage");
    event.key = "token_storage_create_allways";
    event.oldValue = accessToken;
    window.dispatchEvent(event);
    window.localStorage.setItem("passTokenToTabs", Date.now().toString());
  } else {
    window.sessionStorage.setItem("token", accessToken);
    let event = new Event("storage");
    event.key = "2_token_storage_create";
    event.oldValue = accessToken;
    window.dispatchEvent(event);
    window.localStorage.setItem("passTokenToTabs", Date.now().toString());
  }
};
export const showIconPlayPause = (type) => {
  if (type === "play") {
    return { showIconPlayPause: { status: true, type: "play" } };
  } else {
    return { showIconPlayPause: { status: true, type: "false" } };
  }
};
export const getOrUpdateLocalStorage = (key, value, type = "getOrUpdate") => {
  if (type === "getOrUpdate") {
    let new_value = window.localStorage.getItem(key);
    if (new_value === null) {
      window.localStorage.setItem(key, value);
      new_value = value;
    }
    return new_value;
  } else if (type === "set") {
    window.localStorage.setItem(key, value);
  } else if (type === "get") {
    return JSON.parse(window.localStorage.getItem(key));
  }
};
export const get_percent_of_div = (e, ref, offsetX = e.offsetX) => {
  let x_is_small_of_width = offsetX - ref.current.offsetWidth;
  let x_remain = ref.current.offsetWidth + x_is_small_of_width;
  return x_remain / ref.current.offsetWidth;
};
export const get_percent_of_div_touch = (e, ref) => {
  var rect = e.target.getBoundingClientRect();
  var offsetX = e.targetTouches[0].pageX - rect.left;
  let x_is_small_of_width = offsetX - ref.current.offsetWidth;
  let x_remain = ref.current.offsetWidth + x_is_small_of_width;
  return x_remain / ref.current.offsetWidth;
};
export const getData = (data, pathData) => {
  if (!pathData) {
    return data;
  }
  return get(data, pathData);
};

var modifyNested = (item, newItem) => {
  let modifyItem = null;
  if (typeof item === "object" && !Array.isArray(item)) {
    for (let [key, value] of Object.entries(item)) {
      if (typeof value === "object" && !Array.isArray(value)) {
        set(modifyItem, key, { ...value, ...get(newItem, key) });
      } else if (typeof value === "object") {
        set(modifyItem, key, [...value, ...get(newItem, key)]);
      } else {
        set(modifyItem, key, get(newItem, key));
      }
    }
  } else if (typeof item === "object") {
    modifyItem = [];
    for (let idx = 0; idx < item.length; idx++) {
      let currentItem = item[idx];
      modifyItem.push({ ...currentItem, ...newItem[idx] });
    }
  } else {
    modifyItem = newItem;
  }
  return item;
};
export const withoutDataWrap = (data, resPath = "data") => {
  //console.log("# resPath", resPath);
  //console.log("# data", data);
  if (!data) return;
  const keys = Object.keys(data);
  if (includes(keys, "data") || includes(keys, "more_data")) {
    return getFromState(data, resPath);
  }
  return data;
};
export const hasFromPath = (data) => {
  let res = Boolean(data);
  return res;
};
export const filterNested = (data, videoName) => {
  data.forEach((course_sub_list) => {
    let course_video_list = course_sub_list.course_video_list;
    withReturnArray(course_video_list).filter((course_video_list) => {
      return course_video_list.name.includes(videoName);
    });
  });
};
export const margeCustomizerQuestions = (
  objValue,
  srcValue,
  key,
  object,
  source,
  stack
) => {
  //console.log("!!\n");
  //console.log("!!--start--");
  //console.log("!!objValue", objValue);
  //console.log("!!srcValue", srcValue);
  //console.log("!!key", key);
  //console.log("!!object", object);
  //console.log("!!source", source);
  //console.log("!!--end--");
  //console.log("!!\n");
  if (key === "with_answer") {
    return objValue;
  }
};
export const makeObjFlatByProp = (obj, props) => {
  let res = {};
  for (let prop of props) {
    res = { ...res, ...get(obj, prop) };
  }
  return res;
};
export const addProperyToIterableOrObj = (iterable, props) => {
  //console.log("@iterable", iterable);
  const addProperyFucntion = (obj, props) => {
    let newObj = JSON.parse(JSON.stringify(obj));
    for (let prop of props) {
      newObj[prop.key] = prop.value;
    }
    return newObj;
  };
  if (Array.isArray(iterable)) {
    let newIterable = [];
    for (let innerObj of iterable) {
      //console.log("@innerObj", innerObj);
      innerObj = addProperyFucntion(innerObj, props);
      newIterable.push(innerObj);
    }
    return newIterable;
  }
  return addProperyFucntion(iterable, props);
};

// export const checkIsVideoCoursestar = (url) => {
//   if (!url) return true;
//   return (
//     url.includes(urls.CLOUD_FRONT_AMAZON) ||
//     url.includes(urls.OLD_CLOUD_FRONT_AMAZON)
//   );
// };
export const fromCourseSlugToId = (slug) => {
  let newSlug = [];
  newSlug = slug.split("-");
  let lastItem = newSlug[newSlug.length - 1];
  return lastItem;
};

export const roundPartial = (value, resolution) => {
  return (value / resolution) * resolution;
};
export const isNeedToUpdate = (state, list) => {
  //console.log("# state", state);
  //console.log("# list", list);
  const base = 30;
  const value = state.playedSeconds;
  //console.log("# value", value);

  const res = base * Math.floor(value / base);
  //console.log("# res", res);

  const item = {
    last_sec: res,
  };

  if (list.filter((item) => item.last_sec === res).length === 0) {
    getOrUpdateLocalStorage("timing", res, "set");
    list.push(item);
  }

  if (list.length >= 2) {
    //console.log("# JSON.stringify(list)", JSON.stringify(list));
    return list;
  }
};

export const useBreakpoints = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const xsUp = useMediaQuery(theme.breakpoints.up("xs"));
  const sm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));

  return {
    xs,
    xsUp,
    sm,
    smUp,
    md,
    mdUp,
    lg,
    lgUp,
    xl,
    isPhone: xs || sm,
    isTablet: md,
    isLaptop: lg || xl,
  };
};

export const funcBetweenDate = (idForPassData, id) => (state) => {
  const path = `passData.${idForPassData}.${id}`;
  const startDate = get(
    state,
    `${path.split(".").slice(0, -1).join(".")}.startDate`
  );
  const endDate = get(
    state,
    `${path.split(".").slice(0, -1).join(".")}.endDate`
  );
  if (startDate && endDate) {
    let betweenDate = endDate - startDate;
    betweenDate = betweenDate / (1000 * 60 * 60 * 24 * 30);
    set(
      state,
      `${path.split(".").slice(0, -1).join(".")}.betweenDate`,
      betweenDate
    );
  }
};

export const parseDateString = (dateStr) => {
  if (!dateStr) return;
  var dateParts = dateStr.split("/");
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
};
