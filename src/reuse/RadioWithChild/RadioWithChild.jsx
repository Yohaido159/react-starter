import React, { useState, useEffect, useCallback } from "react";
import get from "lodash.get";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { setPassData } from "../../redux/global/global.actions";
import { withReturnArray, useBreakpoints } from "../../utils/utils";
// import { useSetValue } from "../../hooks/manyHooks";

// import FormControl from "@mui/material/FormControl";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";

import Option from "./Option/Option";

const RadioWithChild = (props) => {
  let {
    title,
    variant,
    defaultRadio,
    initValue = false,
    className = "",
    style = {},
    id,
    idForPassData,
    styleOptions = {},
    options = {},
    outputs = {},
    items = {},
  } = props;

  const { labelClick = true } = options;
  const { className2 = "", style2 = {} } = styleOptions;
  const { itemName = "" } = outputs;
  const dispatch = useDispatch();
  const [value, setValue] = useState(initValue);
  const bp = useBreakpoints();

  const actionFunc = (value) => {
    dispatch(
      setPassData({
        path: `${idForPassData}.${id}`,
        data: value,
        effect: "replace",
      })
    );
  };
  const dispatch_setPassData = useCallback(debounce(actionFunc, 300), []);

  const handleChange = (name) => (e) => {
    dispatch_setPassData(name);
    setValue(name);
  };

  useEffect(() => {
    dispatch_setPassData(initValue);
  }, [initValue]);
  console.log("bp.isPhone", bp.isPhone);

  const injectRadio = (option) => (comp) => {
    return bp.isPhone
      ? React.cloneElement(comp, undefined, [
          <div className="d-flex align-items-start">
            {/* <Radio
              value={option.name}
              id={option.name}
              onChange={handleChange(option.name)}
              checked={value === option.name}
            /> */}
            {typeof comp.props.children === "object"
              ? React.cloneElement(comp.props.children, undefined, [
                  <Radio
                    value={option.name}
                    id={option.name}
                    onChange={handleChange(option.name)}
                    checked={value === option.name}
                  />,
                  typeof comp.props.children === "object"
                    ? comp.props.children.props.children
                    : [comp.props.children.props.children],
                ])
              : [
                  <Radio
                    value={option.name}
                    id={option.name}
                    onChange={handleChange(option.name)}
                    checked={value === option.name}
                  />,
                  comp.props.children,
                ]}
          </div>,
        ])
      : comp;
  };
  return (
    <div style={style} className={`${className} `}>
      {variant === "row" && (
        <React.Fragment>
          <div>
            <Grid container spacing={2} className="radio-row">
              {withReturnArray(items, "values", { withIds: true }).map(
                (option) => (
                  <Grid
                    onClick={option.onClick}
                    key={option.id}
                    item
                    xs
                    className="flex-grow-0 nowrap"
                  >
                    <label htmlFor={option.name} className="d-block">
                      <Card
                        className="radio-row__item ml-2 cursor-pointer"
                        style={{
                          maxWidth: "10rem",
                          minWidth: "10rem",
                          maxHeight: "10rem",
                          minHeight: "10rem",
                          backgroundColor: "var(--color-grey-opaque-90)",
                        }}
                      >
                        <CardContent className="rtl">
                          <div className=" fs-32 d-flex justify-content-between align-items-center mb-2">
                            {option.label}
                            <Radio
                              checked={value === option.name}
                              value={option.name}
                              id={option.name}
                              onChange={handleChange(option.name)}
                            />
                          </div>
                          <span className="fs-33">{option.description}</span>
                        </CardContent>
                      </Card>
                    </label>
                  </Grid>
                )
              )}
            </Grid>
          </div>
          <div className="">{get(items, `${value}.comp`)}</div>
        </React.Fragment>
      )}
      {variant === "column" && (
        <div>
          {withReturnArray(items, "values", { withIds: true }).map((option) => (
            <React.Fragment key={option.id}>
              <div className="d-flex ">
                <div className="">
                  {!bp.isPhone && (
                    <Radio
                      value={option.name}
                      id={option.name}
                      onChange={handleChange(option.name)}
                      checked={value === option.name}
                    />
                  )}
                </div>
                <div className="flex-column flex-grow-1 d-flex justify-content-center ">
                  <label
                    className={`${labelClick ? "cursor-pointer" : ""}`}
                    htmlFor={labelClick ? option.name : ""}
                  >
                    {injectRadio(option)(option.label)}
                  </label>
                </div>
              </div>
              {value === option.name && (
                <div className="d-flex">
                  {!bp.isPhone && (
                    <Radio className="mr-1" style={{ visibility: "hidden" }} />
                  )}
                  {get(items, `${value}.comp`)}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
/*
  const {
    title,
    variant,
    defaultRadio,
    className,
    idForPassData,
    id,
    withoutMarginTitle,
    className2
  } = props;
  const { value, setValue, setValueState } = useSetValue();

  const handleChange = name => e => {
    getOrUpdateLocalStorage(id, name, "set");
    setValue(e);
  };

  const dispatch = useDispatch();
  let optionsArr = { ...props };
  delete optionsArr["id"];
  delete optionsArr["className"];
  delete optionsArr["className2"];
  delete optionsArr["title"];
  delete optionsArr["defaultRadio"];
  delete optionsArr["withoutMarginTitle"];
  delete optionsArr["variant"];
  delete optionsArr["idForPassData"];

  optionsArr = withReturnArray(optionsArr, "values", { withIds: true });

  useEffect(() => {
    dispatch(setPassData(idForPassData, `RadioWithChild.${id}`, value, "replace"));
  }, [value]);

  useEffect(() => {
    //console.log("defaultRadio", defaultRadio);
    setValueState(defaultRadio);
  }, [defaultRadio]);

  const handleChangeRadio = (e, newValue) => {
    setValueState(newValue);
  };
  return (
    <div className={className}>
      <div>
        <FormControl className="w-100" component="fieldset">
          <span className={`${withoutMarginTitle ? "" : "mt-3 mb-2"} ${className2} `}>{title}</span>
          {variant === "row" ? (
            <div>
              <Grid container className="radio-row">
                {optionsArr.map(option => (
                  <Grid
                    onClick={option.onClick}
                    key={option.id}
                    item
                    xs
                    className="flex-grow-0 nowrap"
                  >
                    <label htmlFor={option.name} className="d-block">
                      <Card
                        className="radio-row__item ml-2"
                        style={{ minWidth: "10rem", minHeight: "10rem" }}
                      >
                        <CardContent className="rtl">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            {option.label}
                            <Radio
                              checked={value === option.name}
                              value={option.name}
                              id={option.name}
                              onChange={handleChange(option.name)}
                            />
                          </div>
                          <span className="fs-36">{option.description}</span>
                        </CardContent>
                      </Card>
                    </label>
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <div>
              {optionsArr.map(option => (
                <Option
                  onChange={handleChange(option.name)}
                  value={value}
                  option={option}
                  key={option.id}
                />
              ))}
            </div>
          )}
        </FormControl>
      </div>
      {get(props, `${value}.comp`)}
    </div>
  );

*/

export default RadioWithChild;
