import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setPassData } from "../../../redux/global/global.actions";

import Grid from "@mui/material/Grid";

import BaseCardBody from "../../../reuse/BaseCardBody/BaseCardBody";
import RadioWithChild from "../../../reuse/RadioWithChild/RadioWithChild";
import SmallTitle from "../../../reuse/SmallTitle/SmallTitle";

import RoadA from "./RoadA/RoadA";
import RoadB from "./RoadB/RoadB";
import RoadC from "./RoadC/RoadC";
import RoadD from "./RoadD/RoadD";

const SecondDegree = (props) => {
  const { className = "", style = {}, idForPassData } = props;
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
                        מסלול א - <small>יורה יורה מהרה"ר + 8 שנות ישיבה</small>
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
                        <small>תעודת כושר רב צבאי + 8 שנות ישיבה</small>
                      </h3>
                    </BaseCardBody>
                  ),
                  value: "link",
                  comp: <RoadB idForPassData={idForPassData} />,
                },
                roadC: {
                  name: "roadC",
                  label: (
                    <BaseCardBody>
                      <h3>
                        מסלול ג - <small>תעודת כושר רב עיר</small>
                      </h3>
                    </BaseCardBody>
                  ),
                  value: "link",
                  comp: <RoadC idForPassData={idForPassData} />,
                },
                roadD: {
                  name: "roadD",
                  label: (
                    <BaseCardBody>
                      <h3>
                        מסלול ד -{" "}
                        <small>
                          יורה יורה מהרה"ר / תעודת כושר רב צבאי + אישור ועדת
                          רבנים מטעם משרד הדתות על פרסום ספר תורני / פרסום 3
                          מאמרי הלכה + 5 שנות ישיבה{" "}
                        </small>
                      </h3>
                    </BaseCardBody>
                  ),
                  value: "link",
                  comp: <RoadD idForPassData={idForPassData} />,
                },
              }}
            />
          </Grid>
        </Grid>
      </BaseCardBody>
    </div>
  );
};

export default SecondDegree;
