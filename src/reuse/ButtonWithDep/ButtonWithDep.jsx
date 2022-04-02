import React, { useReducer, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import uniqueId from "lodash.uniqueid";

import { withReturnArray } from "../../utils/utils";
import Button from "@mui/material/Button";

const ButtonWithDep = (props) => {
  const {
    className,
    deps = {},
    onClick,
    variant = "outlined",
    label,
    steps,
    style: styleOrginal,
    ...other
  } = props;

  console.log("styleOrginal", styleOrginal);
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [isDisabled, setIsDisabled] = useReducer(reducer, {});
  const [style, setStyle] = useState(styleOrginal);
  const [uniqueIdClick, setUniqueIdClick] = useState(uniqueId);

  const dispatch = useDispatch();
  //console.log("buttonSteps", buttonSteps);

  const checkIfDisabled = (deps) => {
    let newDeps = withReturnArray(deps, "keys");
    for (let itemKey of newDeps) {
      let itemValue = deps[itemKey];

      if (!itemValue.valid) {
        itemValue.valid = (item) => Boolean(item);
      }
      if (itemValue.valid(itemValue.value) === true) {
        setIsDisabled({ [itemKey]: true });
      } else {
        setIsDisabled({ [itemKey]: false });
      }
    }
  };

  const checkIfDisabledFinal = () => {
    let res = withReturnArray(isDisabled).every(
      (item) => Boolean(item) === true
    );
    res = !res;
    console.log("res", res);
    return res;
  };

  useEffect(() => {
    checkIfDisabled(deps);
  }, [deps]);

  useEffect(() => {
    const res = checkIfDisabledFinal();

    if (res) {
      setStyle({
        ...styleOrginal,
        backgroundColor: undefined,
        color: undefined,
      });
    } else {
      setStyle({ ...styleOrginal });
    }
  }, [isDisabled]);

  useEffect(() => {
    setStyle({ ...styleOrginal, ...style });
  }, [styleOrginal]);

  const factorGen = (steps = []) => {
    //console.log("steps", steps);
    function* makeGenerator(steps = []) {
      for (let step of steps) {
        yield step;
      }
    }
    const gen = makeGenerator(steps);
    //console.log("gen", gen);
    return gen;
  };

  let gen = factorGen(steps);
  let gen1 = useRef(gen);

  const handleStepOnClick = () => {
    setUniqueIdClick(uniqueId);
    const action = gen1.current.next();
    if (!action.done) {
      action.value.func();
    }
  };

  useEffect(() => {
    gen1.current = factorGen(steps);
  }, [uniqueIdClick]);
  console.log("style", style);
  return (
    <Button
      className={className}
      disabled={checkIfDisabledFinal()}
      onClick={steps ? handleStepOnClick : onClick}
      variant={variant}
      style={style}
      {...other}
    >
      {label}
    </Button>
  );
};

export default ButtonWithDep;
