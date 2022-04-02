import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import useModelDegrees from "../../models/degrees/degrees.models";
import { passDataSelector } from "../../redux/global/global.selectors";
import { selectorDegreeItems } from "../../redux/degrees/degrees.selectors";
import { withReturnArray } from "../../utils/utils";
import { mapItemToText } from "../Degrees/mapItemToText";

import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import { styled } from "@mui/material/styles";

import BaseCardBody from "../../reuse/BaseCardBody/BaseCardBody";
import RadioWithChild from "../../reuse/RadioWithChild/RadioWithChild";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    textAlign: "right",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--color-background-control-checked)",
    color: theme.palette.common.white,
    fontSize: 20,
    textAlign: "right",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
    textAlign: "right",
  },
}));

const CheckDegrees = (props) => {
  const idForPassData = "CheckDegrees";
  const { className = "", style = {} } = props;
  const ModelDegrees = useModelDegrees();
  const chooseStatus = useSelector(
    passDataSelector(`${idForPassData}.chooseStatus`, "IN_PROGRESS")
  );

  let degreeItems = useSelector((state) =>
    selectorDegreeItems(state, `degrees.${chooseStatus}`)
  );
  console.log("degreeItems", degreeItems);
  degreeItems = withReturnArray(degreeItems) || [];

  console.log("chooseStatus", chooseStatus);

  useEffect(() => {
    ModelDegrees.retrieveItem({
      params: [`status=${chooseStatus}`],
    });
  }, [chooseStatus]);

  const handleClick = (options) => () => {
    const { id: degree_id, type } = options;
    if (type === "changeStatus") {
      ModelDegrees.updateItem({
        id: degree_id,
        payload: {
          status: "COMPLETE",
        },
      });
    } else if (type === "delete") {
      ModelDegrees.deleteItem({
        id: degree_id,
      });
    }
  };

  return (
    <div className={`${className} `} style={style}>
      <BaseCardBody>
        <RadioWithChild
          id="chooseStatus"
          idForPassData={idForPassData}
          variant="row"
          initValue="IN_PROGRESS"
          items={{
            IN_PROGRESS: {
              name: "IN_PROGRESS",
              label: "בתהליך",
            },
            COMPLETE: {
              name: "COMPLETE",
              label: "הושלמו",
            },
          }}
        />
        <div className="w-100 mt-5">
          <TableContainer>
            <TableHead>
              <TableRow>
                <StyledTableCell>שם</StyledTableCell>
                <StyledTableCell>תואר</StyledTableCell>
                <StyledTableCell>מסלול</StyledTableCell>
                <StyledTableCell>קבצים מצורפים</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {degreeItems.map((item) => (
                <StyledTableRow>
                  <StyledTableCell>{item.user}</StyledTableCell>
                  <StyledTableCell>
                    {mapItemToText[item.degree]}
                  </StyledTableCell>
                  <StyledTableCell>{mapItemToText[item.road]}</StyledTableCell>
                  <StyledTableCell className="lrt text-left">
                    {item.files.map((file) => (
                      <div>
                        <a target="_blank" rel="noreferrer" href={file.file}>
                          {file.name}
                        </a>
                      </div>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      onClick={handleClick({
                        id: item.id,
                        type: "changeStatus",
                      })}
                      variant="contained"
                    >
                      הושלם
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button
                      onClick={handleClick({ id: item.id, type: "delete" })}
                      variant="contained"
                    >
                      מחק
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </TableContainer>
        </div>
      </BaseCardBody>
    </div>
  );
};

export default CheckDegrees;
