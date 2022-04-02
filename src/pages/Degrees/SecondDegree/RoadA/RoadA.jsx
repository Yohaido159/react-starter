import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@mui/material/Grid";

import AttachFile from "../../AttachFile/AttachFile";
import ItemInRow from "../../ItemInRow/ItemInRow";
import YeshivaYears from "../../YeshivaYears/YeshivaYears";
import { mapItemToText } from "../../mapItemToText";
import Diploma from "../../Diploma/Diploma";

const RoadA = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  return (
    <div className={`${className} `} style={style}>
      <Grid container>
        <ItemInRow label="א.">
          <AttachFile
            idForPassData={idForPassData}
            label={mapItemToText.YoreYore}
            pathState="secondDegree.roadA.YoreYore"
          />
        </ItemInRow>
        <ItemInRow label="ב.">
          <YeshivaYears
            pathState="secondDegree.roadA.yeshiva"
            years={8}
            idForPassData={idForPassData}
          />
        </ItemInRow>
        <ItemInRow label="ג.">
          <Diploma
            pathState="secondDegree.roadA.diploma"
            idForPassData={idForPassData}
          />
        </ItemInRow>
      </Grid>
    </div>
  );
};

export default RoadA;
