import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTransition, animated } from "react-spring";

import { modelsSelector } from "../../../redux/UI/UI.selectors";
import { useUIActions } from "../../../redux/UI/UI.actions";
import Box from "@mui/material/Box";

const MyModal = (props) => {
  const {
    children,
    modelId,
    withSave,
    customLocation,
    overflowHidden = true,
  } = props;
  const UIActions = useUIActions();

  // const dispatch = useDispatch();
  const newRef = React.useRef();

  const model = useSelector((state) => modelsSelector(state, modelId));
  console.log("model", model);
  const openModal = model.status || "close";
  const modelPayload = model.payload || {};

  const config = modelPayload.config || { stickTop: false };
  const stickTop = config.stickTop;

  const { withoutClickClose = false } = modelPayload;

  const handleClickOnBackground = (e) => {
    if (withoutClickClose) return;

    if (e.target === e.currentTarget) {
      if (!withSave) {
        UIActions.clearModel({
          id: modelId,
        });
      }
    }
  };
  useEffect(() => {
    if (openModal === "open") {
      if (overflowHidden) {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {};
  }, [openModal]);

  const modalSpring = useTransition(openModal === "open", {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });

  return (
    <React.Fragment>
      {openModal === "open" && (
        <React.Fragment>
          {customLocation ? (
            <React.Fragment>
              {modelPayload
                ? React.cloneElement(children, { payload: modelPayload })
                : children}
            </React.Fragment>
          ) : (
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
                        ref={newRef}
                        className="bg-all-gray"
                        onClick={handleClickOnBackground}
                      >
                        <Box
                          className="d-flex align-items-center justify-content-center"
                          position="absolute"
                          left="50%"
                          top={stickTop ? "unset" : "50%"}
                          style={
                            stickTop
                              ? { transform: "translateX(-50%)" }
                              : { transform: "translate(-50% , -50%)" }
                          }
                        >
                          <React.Fragment>
                            {modelPayload
                              ? React.cloneElement(children, {
                                  payload: modelPayload,
                                  newRef,
                                })
                              : children}
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
      )}
    </React.Fragment>
  );
};

export default MyModal;
