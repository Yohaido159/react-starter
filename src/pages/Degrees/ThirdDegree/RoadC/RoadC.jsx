import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ItemInRow from "../../ItemInRow/ItemInRow";
import AttachFile from "../../AttachFile/AttachFile";
import { mapItemToText } from "../../mapItemToText";
import Diploma from "../../Diploma/Diploma";
import FinishArmy from "../../FinishArmy/FinishArmy";

const RoadC = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  return (
    <div className={`${className} `} style={style}>
      <ItemInRow label="א.">
        <AttachFile
          idForPassData={idForPassData}
          label={mapItemToText.ravCity}
          pathState="thirdDegree.roadC.ravCity"
        />
      </ItemInRow>
      <ItemInRow label="ב.">
        <AttachFile
          idForPassData={idForPassData}
          label={mapItemToText.books}
          pathState="thirdDegree.roadC.books"
        />
      </ItemInRow>
      <ItemInRow label="ג.">
        <Diploma
          pathState="thirdDegree.roadC.diploma"
          idForPassData={idForPassData}
        />
      </ItemInRow>
      <ItemInRow label="ג.">
        <FinishArmy idForPassData={idForPassData} road="roadC" />
      </ItemInRow>
    </div>
  );
};

export default RoadC;
