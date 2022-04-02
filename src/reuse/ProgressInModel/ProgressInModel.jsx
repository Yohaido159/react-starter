import { useSelector } from "react-redux";
import { modelsSelector } from "../../redux/UI/UI.selectors";

import CircularProgress from "@mui/material/CircularProgress";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckIcon from "@mui/icons-material/Check";

import BaseIconCircle from "../../reuse/BaseIconCircle/BaseIconCircle";
import React from "react";

const ProgressInModel = (props) => {
  const { className = "", style = {} } = props;
  const modelProgressStatus = useSelector((state) =>
    modelsSelector(state, "progress.payload.status")
  );
  const modelProgressError = useSelector((state) =>
    modelsSelector(state, "progress.payload.detail")
  );
  console.log("modelProgressError", modelProgressError);
  return (
    <React.Fragment>
      <div
        className={`${className} d-flex justify-content-between align-items-center `}
        style={style}
      >
        {modelProgressStatus === "start" ? (
          <React.Fragment>
            <div className="p-4">אנא המתן, הפעולה מתבצעת...</div>
            <CircularProgress />
          </React.Fragment>
        ) : modelProgressStatus === "success" ? (
          <BaseIconCircle
            icon={<CheckIcon />}
            backgroundColor="green"
            size="3"
            fs="fs-2"
          />
        ) : modelProgressStatus === "fail" ? (
          <div className="d-flex justify-content-center flex-column align-items-center">
            <BaseIconCircle
              icon={<HighlightOffIcon />}
              backgroundColor="red"
              size="3"
              fs="fs-2"
            />
            <div className="">
              {typeof modelProgressError === "string" && (
                <p>{modelProgressError}</p>
              )}
              {typeof modelProgressError === "object" &&
                Object.entries(modelProgressError).map(([key, value]) => (
                  <p key={key}>
                    {key} : {value}
                  </p>
                ))}
            </div>
          </div>
        ) : (
          "unset"
        )}
      </div>
    </React.Fragment>
  );
};

export default ProgressInModel;
