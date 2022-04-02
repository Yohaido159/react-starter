import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { passDataSelector } from "../../../redux/global/global.selectors";

import Typography from "@mui/material/Typography";

import FormTextField from "../../../reuse/FormTextField/FormTextField";
import BaseUploadFile from "../../../reuse/BaseUploadFile/BaseUploadFile";

const AttachFile = (props) => {
  const {
    className = "",
    style = {},
    idForPassData,
    label,
    pathState,
    options = {},
  } = props;

  const { onlyUpload = false } = options;
  const itemState = useSelector(
    passDataSelector(`${idForPassData}.${pathState}`, false)
  );

  const itemStateAttach = useSelector(
    passDataSelector(`${idForPassData}.${pathState}Attach`, [])
  );

  return (
    <div className={`${className} `} style={style}>
      {onlyUpload ? (
        <BaseUploadFile
          dataFromState={itemStateAttach}
          idForPassData={idForPassData}
          multiple={true}
          id={`${pathState}Attach`}
          label="העלה קובץ"
          payload={{}}
        />
      ) : (
        <FormTextField
          idForPassData={idForPassData}
          textFromState={itemState}
          initText={false}
          id={pathState}
          options={{
            type: "checkbox",
            addComp: (
              <div>
                <BaseUploadFile
                  dataFromState={itemStateAttach}
                  idForPassData={idForPassData}
                  multiple={true}
                  id={`${pathState}Attach`}
                  label="העלה קובץ"
                  payload={{}}
                />
              </div>
            ),
          }}
          styleOptions={{
            label: <Typography variant="h6">{label}</Typography>,
          }}
        />
      )}
    </div>
  );
};

export default AttachFile;
