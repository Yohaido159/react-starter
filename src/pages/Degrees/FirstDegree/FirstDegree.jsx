import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setPassData } from "../../../redux/global/global.actions";

import Grid from "@mui/material/Grid";

import BaseCardBody from "../../../reuse/BaseCardBody/BaseCardBody";
import RadioWithChild from "../../../reuse/RadioWithChild/RadioWithChild";
import SmallTitle from "../../../reuse/SmallTitle/SmallTitle";

import RoadA from "./RoadA/RoadA";
import RoadB from "./RoadB/RoadB";

const FirstDegree = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  const a = (
    <BaseCardBody>
      <h3>
        מסלול א - <small>יורה יורה מהרה"ר + 5 שנות ישיבה</small>
      </h3>
    </BaseCardBody>
  );
  console.log("a", a);
  return (
    <div className={`${className} `} style={style}>
      <BaseCardBody className="mt-3  ">
        <SmallTitle>מסלולים אפשריים</SmallTitle>
        <hr />
        <Grid container className="" style={{}}>
          <Grid item xs={12} className="">
            <RadioWithChild
              id="chooseRoad"
              idForPassData={idForPassData}
              variant="column"
              items={{
                roadA: {
                  name: "roadA",
                  label: (
                    <BaseCardBody>
                      <h3>
                        מסלול א - <small>יורה יורה מהרה"ר + 5 שנות ישיבה</small>
                      </h3>
                    </BaseCardBody>
                  ),
                  value: "link",
                  comp: <RoadA idForPassData={idForPassData} />,
                },

                roadB: {
                  name: "roadB",
                  label: (
                    <BaseCardBody>
                      <h3>
                        מסלול ב -{" "}
                        <small>
                          יורה יורה מרב עיר \ דיין \ חבר מועצת הרה"ר \ רה"י + 2
                          בחינות כושר לרב צבאי \ 2 מבחני הרה"ר \ תעודת השכלה
                          תורנית גבוהה מהרה"ר + 5 שנות ישיבה
                        </small>
                      </h3>
                    </BaseCardBody>
                  ),
                  value: "link",
                  comp: <RoadB idForPassData={idForPassData} />,
                },
              }}
            />
          </Grid>
        </Grid>
      </BaseCardBody>
    </div>
  );
};

export default FirstDegree;
