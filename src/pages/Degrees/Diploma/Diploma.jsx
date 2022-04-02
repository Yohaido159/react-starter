import { Link } from "react-router-dom";

import Button from "@mui/material/Button";

import AttachFile from "../AttachFile/AttachFile";
import { mapItemToText } from "../mapItemToText";

const Diploma = (props) => {
  const { className = "", style = {}, idForPassData, pathState } = props;
  return (
    <div className={`${className} `} style={style}>
      <AttachFile
        label={mapItemToText.diploma}
        pathState={pathState}
        idForPassData={idForPassData}
      />
      <div className="mb-3">
        <Link className="p-4  " to="/diploma.jpeg" target="_blank" download>
          <Button variant="contained">הורד דיפלומה</Button>
        </Link>
      </div>
    </div>
  );
};

export default Diploma;
