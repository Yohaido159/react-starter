import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useBreakpoints } from "../../../utils/utils";

import Grid from "@mui/material/Grid";

const ItemInRow = (props) => {
  const { className = "", style = {}, label, children } = props;
  const bp = useBreakpoints();

  return (
    <Grid
      className={`d-flex  ${bp.isPhone ? "flex-column mt-2" : "flex-row"}`}
      item
      container
      xs={12}
    >
      <Grid
        item
        xs
        className="d-flex justify-content-center align-items-center flex-grow-0 nowrap fs-3"
      >
        <strong>{label}</strong>
      </Grid>
      <Grid item xs>
        {children}
      </Grid>
    </Grid>
  );
};

export default ItemInRow;
