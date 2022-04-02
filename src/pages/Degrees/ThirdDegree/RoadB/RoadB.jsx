import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { mapItemToText } from "../../mapItemToText";
import ItemInRow from "../../ItemInRow/ItemInRow";
import AttachFile from "../../AttachFile/AttachFile";
import YeshivaYears from "../../YeshivaYears/YeshivaYears";
import Diploma from "../../Diploma/Diploma";
import FinishArmy from "../../FinishArmy/FinishArmy";

const RoadB = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  return (
    <div className={`${className} `} style={style}>
      <ItemInRow label="א.">
        <AttachFile
          idForPassData={idForPassData}
          label={mapItemToText.books}
          pathState="thirdDegree.roadB.books"
        />
      </ItemInRow>
      <ItemInRow label="ב.">
        <YeshivaYears
          pathState="thirdDegree.roadB.yeshiva"
          years={8}
          idForPassData={idForPassData}
        />
      </ItemInRow>
      <ItemInRow label="ג.">
        <Diploma
          pathState="thirdDegree.roadB.diploma"
          idForPassData={idForPassData}
        />
      </ItemInRow>
      <ItemInRow label="ג.">
        <FinishArmy idForPassData={idForPassData} road="roadB" />
      </ItemInRow>
    </div>
  );
};

export default RoadB;
