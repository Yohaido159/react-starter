import React from "react";
import { useDispatch } from "react-redux";

import { closeModalConfirm } from "../../../redux/UI/UI.actions";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import MyModal from "../../../reuse-components/MyModal/MyModal";

const ConfirmModal = props => {
  const dispatch = useDispatch();
  const handleSave = () => {
    // dispatch(closeModalConfirm());
  };
  const handleClose = () => {
    dispatch(closeModalConfirm());
  };

  return (
    <MyModal whatTypeProps="confirmModal">
      <Card className="p-3">
        <CardContent>
          <h3>האם סיימת לשמור וברצונך לצאת</h3>
        </CardContent>
        <CardActions className="d-flex justify-content-around">
          <Button size="medium" variant="outlined" className="w-100" onClick={handleSave}>
            כן
          </Button>
          <Button size="medium" variant="outlined" className="w-100" onClick={handleClose}>
            לא
          </Button>
        </CardActions>
      </Card>
    </MyModal>
  );
};

export default ConfirmModal;
