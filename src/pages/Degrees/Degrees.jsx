import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import RadioWithChild from "../../reuse/RadioWithChild/RadioWithChild";
import BaseCard from "../../reuse/BaseCard/BaseCard";

import FirstDegree from "./FirstDegree/FirstDegree";
import SecondDegree from "./SecondDegree/SecondDegree";
import ThirdDegree from "./ThirdDegree/ThirdDegree";
import CheckDegreeSection from "./CheckDegreeSection/CheckDegreeSection";

const Degrees = (props) => {
  const { className = "", style = {}, idForPassData } = props;
  return (
    <div className={`${className} `} style={style}>
      <BaseCard title="בדיקת זכאות לתארים">
        <RadioWithChild
          id="chooseDegree"
          idForPassData={idForPassData}
          variant="row"
          initValue="firstDegree"
          items={{
            firstDegree: {
              name: "firstDegree",
              label: "תואר ראשון",
              comp: <FirstDegree idForPassData={idForPassData} />,
            },
            secondDegree: {
              name: "secondDegree",
              label: "תואר שני",
              comp: <SecondDegree idForPassData={idForPassData} />,
            },
            thirdDegree: {
              name: "thirdDegree",
              label: "תואר שלישי",
              comp: <ThirdDegree idForPassData={idForPassData} />,
            },
          }}
        />
        <CheckDegreeSection />
      </BaseCard>
    </div>
  );
};

export default Degrees;
