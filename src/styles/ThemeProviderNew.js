import { createTheme } from "@mui/material/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

export function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}

export const theme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: "MPLUSRounded1c-Medium",
  },
  // direction: "rtl",
});

// xs 0 -600 phone1
// sm 600 - 900 phone2
// md 900 - 1200 tablet
// lg 1200 - 1536 laptop
// xl 1536+ desktop
