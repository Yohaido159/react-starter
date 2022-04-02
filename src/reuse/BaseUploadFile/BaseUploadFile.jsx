import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import uniqueId from "lodash.uniqueid";
import { FileIcon, defaultStyles } from "react-file-icon";

import { setPassData } from "../../redux/global/global.actions";
import { getNameExt, withIds } from "../../utils/utils";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

import useModelUpload from "../../models/global/upload/upload.models";

import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BaseUploadFile = (props) => {
  const {
    className,
    id,
    idForPassData,
    actions = (policyData, file) => [],
    label,
    payload,
    options = {},
    dataFromState = [],
    ...other
  } = props;

  console.log("dataFromState", dataFromState);
  const { showItems = true, deleteItem = true } = options;
  const dispatch = useDispatch();
  const uploaderId = uniqueId();
  const ModelUpload = useModelUpload();

  const dispatch_action = (urlObjects, effect) =>
    dispatch(
      setPassData({
        path: `${idForPassData}.${id}`,
        data: urlObjects,
        effect: effect ? effect : "modifyList",
      })
    );

  const handleUploadFiles = async (e) => {
    const files = e.target.files;

    const urlObjects = [];
    for (let file of files) {
      if (!file) continue;
      const urlObject = URL.createObjectURL(file);
      const item = {
        url: urlObject,
        name: file.name,
        size: file.size,
      };
      urlObjects.push(item);
    }
    dispatch_action(urlObjects);
  };

  const handleOnClick = (index) => () => {
    const urlObjects = dataFromState.filter((item, i) => i !== index);
    dispatch_action(urlObjects, "replace");
  };

  return (
    <div className={className}>
      <Button
        variant="contained"
        className="mt-2"
        component="label"
        htmlFor={uploaderId}
      >
        {label}
      </Button>
      {showItems && dataFromState.length > 0 && (
        <Stack style={{ width: "min-content" }} className="mt-3" spacing={2}>
          {dataFromState.map((file, index) => (
            <div className="d-flex" key={file.size}>
              {deleteItem && (
                <div className="flex-grow-0 nowrap">
                  <IconButton onClick={handleOnClick(index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              )}
              <Item className="d-flex justify-content-center align-items-center ">
                <div
                  className="d-flex"
                  style={{ height: "3rem", width: "3rem" }}
                >
                  <FileIcon
                    {...defaultStyles.docx}
                    extension={getNameExt(file.name)[1]}
                    className="h-15"
                  />
                </div>
                <strong>{file.name}</strong>
              </Item>
            </div>
          ))}
        </Stack>
      )}
      <input
        type="file"
        id={uploaderId}
        className="d-none"
        onChange={handleUploadFiles}
        {...other}
      />
    </div>
  );
};

export default BaseUploadFile;
