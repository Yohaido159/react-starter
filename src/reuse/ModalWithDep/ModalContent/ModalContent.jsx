import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { withReturnArray } from "../../../utils/utils";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const ModalContent = (props) => {
  const { style, subTitle, title, deps, clearAction, modelPayload } = props;
  const items = withReturnArray(deps);
  console.log("items", items);
  const dispatch = useDispatch();
  // const modelPayload = useSelector(selectModalPayload) || {};

  useEffect(() => {
    return () => {
      clearAction.forEach((action) => action.func());
    };
  }, []);

  return (
    <Card className="p-3" style={style}>
      <CardContent>
        <h3 className="rtl">{title}</h3>
        <hr className="w-100 m-0 my-2 mb-2" />
        {typeof subTitle === "string" && (
          <h6 className="rtl mt-2">{subTitle}</h6>
        )}
        {Array.isArray(subTitle) && (
          <div className="mt-2">
            {subTitle.map((item) => (
              <h6 className="rtl">{item}</h6>
            ))}
          </div>
        )}
        <Grid container>
          {items.map((item) => {
            const newItem = { size: 12, item: {}, ...item };
            return (
              <React.Fragment>
                <Grid item xs={newItem.size}>
                  {newItem.func(modelPayload)}
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ModalContent;
