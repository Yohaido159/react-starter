import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
export const createBreakpoints = breakpoints => {
  const {
    values = {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    },
    unit = "px",
    step = 5,
    ...other
  } = breakpoints;

  const keys = Object.keys(values);

  function up(key) {
    const value = typeof values[key] === "number" ? values[key] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key) {
    const endIndex = keys.indexOf(key) + 1;
    const upperbound = values[keys[endIndex]];

    if (endIndex === keys.length) {
      // xl down applies to all sizes
      return up("xs");
    }

    const value = typeof upperbound === "number" && endIndex > 0 ? upperbound : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }

  function between(start, end) {
    const endIndex = keys.indexOf(end);

    if (endIndex === keys.length - 1) {
      return up(start);
    }

    return (
      `@media (min-width:${
        typeof values[start] === "number" ? values[start] : start
      }${unit}) and ` +
      `(max-width:${(endIndex !== -1 && typeof values[keys[endIndex + 1]] === "number"
        ? values[keys[endIndex + 1]]
        : end) -
        step / 100}${unit})`
    );
  }

  function only(key) {
    return between(key, key);
  }

  let warnedOnce = false;

  function width(key) {
    if (process.env.NODE_ENV !== "production") {
      if (!warnedOnce) {
        warnedOnce = true;
        console.warn(
          [
            "Material-UI: The `theme.breakpoints.width` utility is deprecated because it's redundant.",
            "Use the `theme.breakpoints.values` instead."
          ].join("\n")
        );
      }
    }

    return values[key];
  }

  return {
    keys,
    values,
    up,
    down,
    between,
    only,
    width,
    ...other
  };
};

export const breakpointsNumber = {
  xs: 0,
  xssm: 576,
  sm: 620,
  smmd: 768,
  md: 939,
  lg: 1199,
  xl: 1920
};
export const breakpoints = createBreakpoints({
  values: breakpointsNumber
});

export const normalTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#313131"
    },
    secondary: {
      main: "#313131"
    }
  }
});

export const editTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff"
    },
    secondary: {
      main: "rgb(53, 53, 53)"
    }
  }
});

// values: {
//   xs: 0,
//   sm: 600,
//   md: 960,
//   lg: 1280,
//   xl: 1920
// }
