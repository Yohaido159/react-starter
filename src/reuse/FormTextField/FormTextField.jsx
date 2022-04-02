import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import get from "lodash.get";
import set from "lodash.set";
import uniqueId from "lodash.uniqueid";

import { withIds } from "../../utils/utils";
import { setPassData } from "../../redux/global/global.actions";
import { RTL } from "../../styles/ThemeProviderNew";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import DatePicker from "@mui/lab/DatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
const FormTextField = (props) => {
  let {
    className = "",
    style = {},
    id,
    idForPassData,
    initText = "",
    textFromState,
    options = {},
    variant,
    styleOptions = {},
    outputs = {
      itemName: undefined,
      isSend: false,
      setIsSend: () => {},
    },
    ...other
  } = props;

  let {
    Comp = undefined,
    rtl = true,
    type = "text",
    isTime = true,
    addComp = undefined,
    propsComp = {},
    withDispatch = true,
    buttons = [],
    func,
  } = options;
  const {
    label = "",
    labelSub = undefined,
    defaultLabel = undefined,
    className2 = "",
    style2 = {},
    dateType = "normal",
    withPadding = true,
  } = styleOptions;

  console.log("initText", initText);
  const [text, setText] = useState(initText);

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const actionFunc = (options = {}) => {
    const { func, value } = options;
    dispatch(
      setPassData({
        path: `${idForPassData}.${id}`,
        data: outputs.itemName ? { [outputs.itemName]: value } : value,
        effect: "replace",
        func,
      })
    );
  };

  const dispatch_setPassData = useCallback(debounce(actionFunc, 300), []);

  const handleTextChange = (e) => {
    console.log("e", e);
    if (type === "text") {
      setText(e.target.value);
      dispatch_setPassData({ value: e.target.value });
    } else if (type === "checkbox") {
      setText(e.target.checked);
      dispatch_setPassData({ value: e.target.checked });
    } else if (type === "date") {
      dispatch_setPassData({
        value: e,
        func,
      });
    } else if (Comp) {
      setText(e);
      dispatch_setPassData()(e);
    }
  };

  useEffect(() => {
    if (textFromState || textFromState === "") {
      setText(textFromState);
    }
  }, [textFromState]);

  const isEnter = useRef(false);

  useEffect(() => {
    if (isEnter.current === false) {
      dispatch_setPassData({
        value: outputs.itemName ? { [outputs.itemName]: initText } : initText,
      });
      setText(initText);
      isEnter.current = true;
    }
  }, [initText]);

  let dispatch = useDispatch();
  let idForLabel = uniqueId();

  return (
    <div className={`${className} ${withPadding ? "p-3" : ""}`} style={style}>
      <RTL>
        <div className="">
          {type === "checkbox" && (
            <div className="d-flex flex-column align-items-start">
              <label
                className="d-flex flex-column align-items-start"
                htmlFor={idForLabel}
              >
                {React.cloneElement(label, undefined, [
                  <Checkbox
                    key={1}
                    id={idForLabel}
                    checked={text}
                    onChange={handleTextChange}
                  />,
                  ...(typeof label.props.children === "object"
                    ? label.props.children
                    : [label.props.children]),
                ])}
              </label>
              {addComp && text && <div className="mr-3 w-100">{addComp}</div>}
            </div>
          )}

          {type === "text" && (
            <div className="">
              <div className="mb-2">{label}</div>
              <TextField
                className="w-100 "
                label={defaultLabel}
                InputProps={{ ...other.InputProps }}
                id={id}
                variant={variant}
                onChange={handleTextChange}
                value={text}
                onClick={handleStopPropagation}
                {...other}
              />
            </div>
          )}

          {type === "date" && (
            <div className="">
              <div className="mb-2">{label}</div>
              {dateType === "normal" ? (
                <DatePicker
                  label={defaultLabel}
                  value={text}
                  onChange={handleTextChange}
                  renderInput={(params) => (
                    <TextField className="w-100" {...params} />
                  )}
                />
              ) : (
                <MobileDatePicker
                  label={defaultLabel}
                  value={text}
                  onChange={handleTextChange}
                  renderInput={(params) => (
                    <TextField className="w-100" {...params} />
                  )}
                />
              )}
            </div>
          )}
        </div>
      </RTL>
    </div>
  );

  /**
   * <div className={`${className} ${customMargin ? customMargin : "mb-2 mt-2"}  `}>
      <div
        className={`${className2} ${
          buttonRow ? "d-flex flex-row align-items-center " : "d-flex flex-column"
        }  `}
      >

      //
        <Grid container>
          {label && !labelRow && (
            <Grid item xs className="d-flex align-items-center ">
              <label htmlFor={id} className="mb-3">
                {label}
                {labelSub && (
                  <span className="fs-36 " style={{ whiteSpace: "normal" }}>
                    {labelSub}
                  </span>
                )}
              </label>
            </Grid>
          )}
          {!buttonsInLine &&
            withIds(buttons).map(button => (
              <Grid
                key={button.id}
                item
                xs
                className="flex-grow-0 nowrap d-flex justify-content-center align-items-center "
              >
                <IconButton onClick={handleOnClick(button)}>{button.icon}</IconButton>
              </Grid>
            ))}
          {labelRow && label && (
            <div className={`w-100 text-right ${buttonRow ? "" : ""}`}>
              <label htmlFor={id} className="mb-3">
                {label}
              </label>
            </div>
          )}
          <div className="">
            {labelSub && (
              <span className="fs-36 " style={{ whiteSpace: "normal" }}>
                {labelSub}
              </span>
            )}
          </div>
        </Grid>
//
        <RTL withRtl={withRtl}>
          {Comp ? (
            isCheckbox ? (
              <div className="">
                <Comp {...propsComp} id={id} checked={text} onChange={handleTextChange} />
              </div>
            ) : (
              <div className="">
                <Comp {...propsComp} id={id} onChange={handleTextChange} value={text} />
              </div>
            )
          ) : (
            <React.Fragment>
              <Grid item xs container>
                <Grid item xs container>
                  {isEdit ? (
                    <TextField
                      className="w-100 "
                      label={defaultLabel}
                      InputProps={{ ...other.InputProps }}
                      id={id}
                      variant={variant}
                      onChange={handleTextChange}
                      value={text}
                      onClick={handleStopPropagation}
                      {...other}
                    />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center">{text}</div>
                  )}
                </Grid>
                {buttonsInLine &&
                  withIds(buttons).map(button => (
                    <Grid
                      key={button.id}
                      item
                      xs
                      className="flex-grow-0 nowrap d-flex justify-content-center align-items-center "
                    >
                      <IconButton onClick={handleOnClick(button)}>{button.icon}</IconButton>
                    </Grid>
                  ))}
              </Grid>
            </React.Fragment>
          )}
        </RTL>
      </div>
    </div>
   * 
   */
};

export default FormTextField;

/*
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { withIds } from "../../../utils/utils";
import { setPassData } from "../../../redux/global/global.actions";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import TextField from "@material-ui/core/TextField";

import { RTL } from "../../../styles/mui";

const FormTextField = props => {
  const {
    className = "",
    className2 = "d-flex flex-column",
    initText,
    customMargin,
    isEdit: isEditOrgianl = true,
    buttons = [],
    buttonsInLine = false,
    variant = "outlined",
    idForPassData,
    label,
    labelSub,
    labelRow = false,
    buttonRow = false,
    id,
    itemName = "value",
    defaultLabel,
    withRtl = true,
    comp: Comp,
    isCheckbox,
    propsComp,
    withoutDispatch,
    textFromState,
    debug,
    isSend,
    setIsSend,
    ...other
  } = props;
  let dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(isEditOrgianl);
  const [text, setText] = useState(initText);
  console.log("buttons2", buttons);

  useEffect(() => {
    setIsEdit(isEditOrgianl);
  }, [isEditOrgianl]);

  useEffect(() => {
    setText(initText);
    dispatch(setPassData(idForPassData, id, { [itemName]: initText }));
  }, [initText]);

  useEffect(() => {
    //console.log("!text", text);
  }, [text]);

  const handleTextChange = e => {
    if (Comp) {
      if (isCheckbox) {
        setText(e.target.checked);
        dispatch(setPassData(idForPassData, id, { [itemName]: e.target.checked }));
      } else {
        setText(e);
        dispatch(setPassData(idForPassData, id, { [itemName]: e }));
      }
    } else {
      setText(e.target.value);
      dispatch_setPassData(e.target.value);
    }
  };

  const actionFunc = value => {
    dispatch(setPassData(idForPassData, id, { [itemName]: value }));
  };
  const dispatch_setPassData = useCallback(debounce(actionFunc, 300), []);

  const useEnter = useRef(false);

  useEffect(() => {
    if (withoutDispatch) return;
    if (useEnter.current === false) {
      dispatch(setPassData(idForPassData, id, { [itemName]: initText }));
      setText(initText);
      useEnter.current = true;
    }
  }, [initText]);

  useEffect(() => {
    console.log("textFromState", textFromState);
    if (textFromState || textFromState === "") {
      setText(textFromState);
    }
  }, [textFromState]);

  useEffect(() => {
    if (isSend) {
      dispatch(setPassData(idForPassData, `${id}.${itemName}`, "", "replace"));
      setIsSend(false);
    }
  }, [isSend]);

  const handleOnClick = button => e => {
    e.stopPropagation();
    if (button.type === "edit") {
      setIsEdit(prevState => !prevState);
    }
    button.onClick && button.onClick();
  };
  const handleStopPropagation = e => {
    e.stopPropagation();
  };
  return (
    <div className={`${className} ${customMargin ? customMargin : "mb-2 mt-2"}  `}>
      <div
        className={`${className2} ${
          buttonRow ? "d-flex flex-row align-items-center " : "d-flex flex-column"
        }  `}
      >
        <Grid container>
          {label && !labelRow && (
            <Grid item xs className="d-flex align-items-center ">
              <label htmlFor={id} className="mb-3">
                {label}
                {labelSub && (
                  <span className="fs-36 " style={{ whiteSpace: "normal" }}>
                    {labelSub}
                  </span>
                )}
              </label>
            </Grid>
          )}
          {!buttonsInLine &&
            withIds(buttons).map(button => (
              <Grid
                key={button.id}
                item
                xs
                className="flex-grow-0 nowrap d-flex justify-content-center align-items-center "
              >
                <IconButton onClick={handleOnClick(button)}>{button.icon}</IconButton>
              </Grid>
            ))}
          {labelRow && label && (
            <div className={`w-100 text-right ${buttonRow ? "" : ""}`}>
              <label htmlFor={id} className="mb-3">
                {label}
              </label>
            </div>
          )}
          <div className="">
            {labelSub && (
              <span className="fs-36 " style={{ whiteSpace: "normal" }}>
                {labelSub}
              </span>
            )}
          </div>
        </Grid>

        <RTL withRtl={withRtl}>
          {Comp ? (
            isCheckbox ? (
              <div className="">
                <Comp {...propsComp} id={id} checked={text} onChange={handleTextChange} />
              </div>
            ) : (
              <div className="">
                <Comp {...propsComp} id={id} onChange={handleTextChange} value={text} />
              </div>
            )
          ) : (
            <React.Fragment>
              <Grid item xs container>
                <Grid item xs container>
                  {isEdit ? (
                    <TextField
                      className="w-100 "
                      label={defaultLabel}
                      InputProps={{ ...other.InputProps }}
                      id={id}
                      variant={variant}
                      onChange={handleTextChange}
                      value={text}
                      onClick={handleStopPropagation}
                      {...other}
                    />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center">{text}</div>
                  )}
                </Grid>
                {buttonsInLine &&
                  withIds(buttons).map(button => (
                    <Grid
                      key={button.id}
                      item
                      xs
                      className="flex-grow-0 nowrap d-flex justify-content-center align-items-center "
                    >
                      <IconButton onClick={handleOnClick(button)}>{button.icon}</IconButton>
                    </Grid>
                  ))}
              </Grid>
            </React.Fragment>
          )}
        </RTL>
      </div>
    </div>
  );
};

export default FormTextField;

*/
