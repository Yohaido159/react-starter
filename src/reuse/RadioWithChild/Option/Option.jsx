import React from "react";

import Radio from "@mui/material/Radio";

const Option = (props) => {
  const { id, option, value, onChange } = props;
  //console.log("option", option);

  return (
    <div className="d-flex ">
      <div className="">
        <Radio
          value={option.name}
          id={option.name}
          onChange={onChange}
          checked={value === option.name}
        />
      </div>
      <div className="flex-column flex-grow-1 d-flex justify-content-center ">
        {option.label}
      </div>
    </div>
  );
};

export default Option;
