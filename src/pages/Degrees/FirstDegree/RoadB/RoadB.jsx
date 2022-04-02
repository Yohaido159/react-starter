import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextField from "../../../../reuse/FormTextField/FormTextField";
import RadioWithChild from "../../../../reuse/RadioWithChild/RadioWithChild";

import AttachFile from "../../AttachFile/AttachFile";
import YeshivaYears from "../../YeshivaYears/YeshivaYears";
import ItemInRow from "../../ItemInRow/ItemInRow";
import { mapItemToText } from "../../mapItemToText";
import Diploma from "../../Diploma/Diploma";

const RoadB = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  const dispatch = useDispatch();

  return (
    <div className={`${className} `} style={style}>
      <Grid container>
        <ItemInRow label="א.">
          <AttachFile
            label={mapItemToText.YoreYorePrivate}
            pathState="firstDegree.roadB.YoreYorePrivate"
            idForPassData={idForPassData}
          />
        </ItemInRow>
        <ItemInRow label="ב.">
          <RadioWithChild
            id="firstDegree.roadB.quizRav"
            idForPassData={idForPassData}
            variant="column"
            className="mr-3"
            items={{
              ravZvei: {
                name: "ravZvei",
                label: (
                  <Typography variant="h6">
                    2 בחינות כושר לרב צבאי - הרה"ר
                  </Typography>
                ),
                comp: (
                  <AttachFile
                    options={{ onlyUpload: true }}
                    pathState="firstDegree.roadB.ravZvei"
                    idForPassData={idForPassData}
                  />
                ),
              },
              ravIsrael: {
                name: "ravIsrael",
                label: (
                  <Typography variant="h6">2 מבחני הרבנות הראשית</Typography>
                ),
                comp: (
                  <AttachFile
                    options={{ onlyUpload: true }}
                    pathState="firstDegree.roadB.ravIsrael"
                    idForPassData={idForPassData}
                  />
                ),
              },
              ravPaperHigh: {
                name: "ravPaperHigh",
                label: (
                  <Typography variant="h6">
                    תעודת השכלה תורנית גבוהה מהרה"ר
                  </Typography>
                ),
                comp: (
                  <AttachFile
                    options={{ onlyUpload: true }}
                    pathState="firstDegree.roadB.ravPaperHigh"
                    idForPassData={idForPassData}
                  />
                ),
              },
            }}
          />
        </ItemInRow>
        <ItemInRow label="ג.">
          <YeshivaYears
            idForPassData={idForPassData}
            pathState="firstDegree.roadB.yeshiva"
          />
        </ItemInRow>
        <ItemInRow label="ד.">
          <Diploma
            pathState="firstDegree.roadB.diploma"
            idForPassData={idForPassData}
          />
        </ItemInRow>
      </Grid>
    </div>
  );
};

export default RoadB;
