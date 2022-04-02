import React from "react";

import ModalWrapper from "./ModalWrapper/ModalWrapper";
import ModalContent from "./ModalContent/ModalContent";

const ModalWithDep = (props) => {
  const {
    style,
    modalType,
    deps,
    title,
    actionOnStart,
    clearAction = [],
    modelId,
  } = props;

  return (
    <ModalWrapper
      modelId={modelId}
      deps={deps}
      title={title}
      actionOnStart={actionOnStart}
      clearAction={clearAction}
      whatTypeProps={modalType}
    >
      <ModalContent style={style} />
    </ModalWrapper>
  );
};

export default React.memo(ModalWithDep);
