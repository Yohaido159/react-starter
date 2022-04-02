import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTransition, animated } from "react-spring";

import { modelsSelector } from "../../../redux/UI/UI.selectors";
import { useUIActions } from "../../../redux/UI/UI.actions";
import Box from "@mui/material/Box";

const ModalWrapper = (props) => {
  const {
    children,
    modelId,
    whatTypeProps,
    withSave,
    deps: orginalDeps = {},
    title: orginalTitle = "הפעולה מתבצעת",
    actionOnStart: orginalActionOnStart = [],
    clearAction: orginalClearAction = [],
    overflowHidden = true,
  } = props;
  const dispatch = useDispatch();
  const UIActions = useUIActions();

  const model = useSelector((state) => modelsSelector(state, modelId));
  const openModal = model.status || "close";
  const modelPayload = model.payload || {};

  // const whatType = useSelector(selectModalWhatType);
  // const openModal = useSelector(selectModalOpen);
  // const modalPayload = useSelector(selectModalPayload) || {};

  let {
    title: titlePayload = "",
    clearAction: clearActionPayload = [],
    actionOnStart: actionOnStartPayload = [],
    deps: depsPayload = {},
    payload: payloadPayload = {},
    data: dataPayload = {},
  } = modelPayload;

  let title = titlePayload ? titlePayload : orginalTitle;
  let clearAction = [...orginalClearAction, ...clearActionPayload];
  let actionOnStart = [...orginalActionOnStart, ...actionOnStartPayload];
  let deps = { ...orginalDeps, ...depsPayload };
  let payload = payloadPayload ? payloadPayload : {};

  const handleClickOnBackground = (e) => {
    if (e.target === e.currentTarget) {
      if (!withSave) {
        UIActions.modifyModel({
          id: modelId,
          path: "status",
          data: "close",
          effect: "replace",
        });
      }
    }
  };

  useEffect(() => {
    // if (openModal && whatType === whatTypeProps) {
    if (openModal === "open") {
      if (overflowHidden) {
        document.body.style.overflow = "hidden";
      }
    } else {
      console.log("document.body.style.overflow", document.body.style.overflow);
    }
    return () => {};
    // }, [openModal, whatTypeProps, whatType]);
  }, [openModal]);

  const modalSpring = useTransition(openModal === "open", {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });

  const isUse = useRef(false);

  useEffect(() => {
    if (isUse.current === false) {
      // if (openModal && whatType === whatTypeProps) {
      if (openModal === "open") {
        actionOnStart.forEach((action) => {
          action.func(payload);
        });
        isUse.current = true;
      }
    }
    // }, [openModal, whatType, modalPayload, isUse]);
  }, [openModal, isUse]);

  useEffect(() => {
    if (openModal === "close") {
      isUse.current = false;
    }
  }, [openModal, isUse]);

  return (
    <React.Fragment>
      {/* {openModal && whatType === whatTypeProps && ( */}
      {openModal === "open" && (
        <Box
          position="fixed"
          style={{ height: "100%", width: "100%", zIndex: 10000 }}
          top="0"
          left="0"
        >
          {modalSpring((style, item) => (
            <animated.div style={style}>
              {item && (
                <React.Fragment>
                  <div
                    className="bg-all-gray"
                    onClick={handleClickOnBackground}
                  >
                    <Box
                      className="d-flex align-items-center justify-content-center"
                      position="fixed"
                      left="50%"
                      top="50%"
                      style={{ transform: "translate(-50% , -50%)" }}
                    >
                      <React.Fragment>
                        {React.cloneElement(children, {
                          title,
                          clearAction,
                          deps,
                          modelPayload,
                        })}
                      </React.Fragment>
                    </Box>
                  </div>
                </React.Fragment>
              )}
            </animated.div>
          ))}
        </Box>
      )}
    </React.Fragment>
  );
};

export default ModalWrapper;
