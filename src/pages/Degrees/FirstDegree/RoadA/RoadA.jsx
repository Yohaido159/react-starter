import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextField from "../../../../reuse/FormTextField/FormTextField";

import AttachFile from "../../AttachFile/AttachFile";
import ItemInRow from "../../ItemInRow/ItemInRow";
import YeshivaYears from "../../YeshivaYears/YeshivaYears";
import Diploma from "../../Diploma/Diploma";
import { mapItemToText } from "../../mapItemToText";

const RoadA = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  const dispatch = useDispatch();

  return (
    <div className={`${className} `} style={style}>
      <Grid container>
        <ItemInRow label="א.">
          <AttachFile
            label={mapItemToText.YoreYore}
            pathState="firstDegree.roadA.YoreYore"
            idForPassData={idForPassData}
          />
        </ItemInRow>
        <ItemInRow label="ב.">
          <YeshivaYears
            pathState="firstDegree.roadA.yeshiva"
            idForPassData={idForPassData}
          />
        </ItemInRow>
        <ItemInRow label="ג.">
          <Diploma
            pathState="firstDegree.roadA.diploma"
            idForPassData={idForPassData}
          />
        </ItemInRow>
      </Grid>
    </div>
  );
};

export default RoadA;
