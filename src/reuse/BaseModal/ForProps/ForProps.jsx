import React from "react";
import { useDispatch } from "react-redux";

import { useUIActions } from "../../../redux/UI/UI.actions";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ForProps = (props) => {
  const dispatch = useDispatch();
  const UIActions = useUIActions();

  const {
    payload = { content: { title: "ללא כותרת", actions: [] } },
    newRef,
    modelId,
  } = props;
  const { withCloseButton = false } = payload || {};
  const handelOnClick = (item) => () => {
    item.close &&
      UIActions.clearModel({
        id: modelId,
      });
    item.onClick && item.onClick();
  };

  const handleClose = () => {
    UIActions.clearModel({
      id: modelId,
    });
  };

  return (
    <Card
      className="p-3 d-flex flex-column align-items-center"
      style={payload.style}
    >
      <CardContent className="w-100">
        <Grid
          container
          className="d-flex justify-content-center align-items-center"
        >
          <Grid item xs className="flex-grow-0 nowrap">
            {withCloseButton ? (
              <IconButton onClick={handleClose}>
                <HighlightOffIcon />
              </IconButton>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs>
            <h3 className="rtl">{payload.content.title}</h3>
          </Grid>
        </Grid>
        {typeof payload.content.subTitle === "string" && (
          <h6 className="rtl mt-2">{payload.content.subTitle}</h6>
        )}
        {Array.isArray(payload.content.subTitle) && (
          <div className="mt-2">
            {payload.content.subTitle.map((item) => (
              <h6 className="rtl">{item}</h6>
            ))}
          </div>
        )}
      </CardContent>
      <CardActions className="w-100 d-flex justify-content-around">
        <Grid container>
          {payload.content.actions?.map((item) => {
            let newItem = { close: true, type: "button", size: 6, ...item };
            return (
              <React.Fragment>
                <Grid item xs={newItem.size}>
                  {newItem.type === "button" ? (
                    <Button
                      size="medium"
                      variant="outlined"
                      className="w-100"
                      onClick={handelOnClick(newItem)}
                    >
                      {newItem.label}
                    </Button>
                  ) : (
                    <newItem.comp newRef={newRef} />
                  )}
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </CardActions>
    </Card>
  );
};

export default ForProps;
