import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ItemInRow from "../../ItemInRow/ItemInRow";
import AttachFile from "../../AttachFile/AttachFile";
import { mapItemToText } from "../../mapItemToText";
import Diploma from "../../Diploma/Diploma";

const RoadC = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  return (
    <div className={`${className} `} style={style}>
      <ItemInRow label="א.">
        <AttachFile
          idForPassData={idForPassData}
          pathState="secondDegree.roadC.ravCity"
          label={mapItemToText.ravCity}
        />
      </ItemInRow>
      <ItemInRow label="ב.">
        <Diploma
          pathState="secondDegree.roadC.diploma"
          idForPassData={idForPassData}
        />
      </ItemInRow>
    </div>
  );
};

export default RoadC;
