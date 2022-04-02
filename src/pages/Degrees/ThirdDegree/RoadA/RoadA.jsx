import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { passDataSelector } from "../../../../redux/global/global.selectors";
import { setPassData } from "../../../../redux/global/global.actions";
import { funcBetweenDate } from "../../../../utils/utils";

import ItemInRow from "../../ItemInRow/ItemInRow";
import AttachFile from "../../AttachFile/AttachFile";
import FinishArmy from "../../FinishArmy/FinishArmy";
import YeshivaYears from "../../YeshivaYears/YeshivaYears";
import { mapItemToText } from "../../mapItemToText";
import Diploma from "../../Diploma/Diploma";

import FormTextField from "../../../../reuse/FormTextField/FormTextField";

import Typography from "@mui/material/Typography";
import get from "lodash.get";
import set from "lodash.set";

const RoadA = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  console.log("idForPassData", idForPassData);

  const dispatch = useDispatch();

  return (
    <div className={`${className} `} style={style}>
      <ItemInRow label="א.">
        <AttachFile
          idForPassData={idForPassData}
          label="כושר לרב עיר"
          pathState="thirdDegree.roadA.ravCity"
        />
      </ItemInRow>
      <ItemInRow label="ב.">
        <YeshivaYears
          pathState="thirdDegree.roadA.yeshiva"
          years={8}
          idForPassData={idForPassData}
        />
      </ItemInRow>
      <ItemInRow label="ג.">
        <FinishArmy idForPassData={idForPassData} road="roadA" />
      </ItemInRow>
      <ItemInRow label="ד.">
        <Diploma
          pathState="thirdDegree.roadA.diploma"
          idForPassData={idForPassData}
        />
      </ItemInRow>
    </div>
  );
};

export default RoadA;
