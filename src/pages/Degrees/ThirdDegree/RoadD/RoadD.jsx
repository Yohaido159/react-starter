import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ItemInRow from "../../ItemInRow/ItemInRow";
import AttachFile from "../../AttachFile/AttachFile";
import { mapItemToText } from "../../mapItemToText";
import Diploma from "../../Diploma/Diploma";
import FinishArmy from "../../FinishArmy/FinishArmy";

const RoadD = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  return (
    <div className={`${className} `} style={style}>
      <ItemInRow label="א.">
        <AttachFile
          idForPassData={idForPassData}
          label={mapItemToText.dayan}
          pathState="thirdDegree.roadD.dayan"
        />
      </ItemInRow>
      <ItemInRow label="ב.">
        <Diploma
          pathState="thirdDegree.roadD.diploma"
          idForPassData={idForPassData}
        />
      </ItemInRow>
      <ItemInRow label="ג.">
        <FinishArmy idForPassData={idForPassData} road="roadD" />
      </ItemInRow>
    </div>
  );
};

export default RoadD;
