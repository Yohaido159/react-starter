import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { mapItemToText } from "../../mapItemToText";

import Typography from "@mui/material/Typography";

import ItemInRow from "../../ItemInRow/ItemInRow";
import AttachFile from "../../AttachFile/AttachFile";
import YeshivaYears from "../../YeshivaYears/YeshivaYears";
import Diploma from "../../Diploma/Diploma";

import RadioWithChild from "../../../../reuse/RadioWithChild/RadioWithChild";

const RoadD = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  return (
    <div className={`${className} `} style={style}>
      <ItemInRow label="א.">
        <RadioWithChild
          id="secondDegree.roadD.quizRav"
          idForPassData={idForPassData}
          variant="column"
          items={{
            YoreYore: {
              name: "YoreYore",
              label: (
                <Typography variant="h6">{mapItemToText.YoreYore}</Typography>
              ),
              comp: (
                <AttachFile
                  options={{ onlyUpload: true }}
                  pathState="secondDegree.roadD.YoreYore"
                  idForPassData={idForPassData}
                />
              ),
            },
            ravZvei: {
              name: "ravZvei",
              label: (
                <Typography variant="h6">{mapItemToText.ravZvei}</Typography>
              ),
              comp: (
                <AttachFile
                  options={{ onlyUpload: true }}
                  pathState="secondDegree.roadD.ravZvei"
                  idForPassData={idForPassData}
                />
              ),
            },
          }}
        />
      </ItemInRow>
      <ItemInRow label="ב.">
        <AttachFile
          pathState="secondDegree.roadD.books"
          label={mapItemToText.books}
          idForPassData={idForPassData}
        />
      </ItemInRow>
      <ItemInRow label="ב.">
        <YeshivaYears
          pathState="secondDegree.roadD.yeshiva"
          idForPassData={idForPassData}
        />
      </ItemInRow>
      <ItemInRow label="ג.">
        <Diploma
          pathState="secondDegree.roadD.diploma"
          idForPassData={idForPassData}
        />
      </ItemInRow>
    </div>
  );
};

export default RoadD;
