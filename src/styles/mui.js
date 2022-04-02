import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { normalTheme } from "../styles/ThemeProvider";

export const theme = createMuiTheme({
  ...normalTheme,
  direction: "rtl"
});

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export const RTL = props => {
  const { children, withRtl = true } = props;
  return (
    <React.Fragment>
      {withRtl ? (
        <ThemeProvider theme={theme}>
          <StylesProvider jss={jss}>{props.children}</StylesProvider>
        </ThemeProvider>
      ) : (
        children
      )}
    </React.Fragment>
  );
};
