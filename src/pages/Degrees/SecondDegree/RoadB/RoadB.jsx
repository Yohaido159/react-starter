import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ItemInRow from "../../ItemInRow/ItemInRow";
import YeshivaYears from "../../YeshivaYears/YeshivaYears";
import AttachFile from "../../AttachFile/AttachFile";
import { mapItemToText } from "../../mapItemToText";
import Diploma from "../../Diploma/Diploma";

const RoadB = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  return (
    <div className={`${className} `} style={style}>
      <ItemInRow label="א.">
        <AttachFile
          idForPassData={idForPassData}
          pathState="secondDegree.roadB.ravZvei"
          label={mapItemToText.ravZvei}
        />
      </ItemInRow>
      <ItemInRow label="ב.">
        <YeshivaYears
          pathState="secondDegree.roadB.yeshiva"
          years={8}
          idForPassData={idForPassData}
        />
      </ItemInRow>{" "}
      <ItemInRow label="ג.">
        <Diploma
          pathState="secondDegree.roadB.diploma"
          idForPassData={idForPassData}
        />
      </ItemInRow>
    </div>
  );
};

export default RoadB;
