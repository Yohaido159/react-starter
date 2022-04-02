import React from "react";

import MyModal from "./MyModal/MyModal";
import ForProps from "./ForProps/ForProps";

const BaseModal = (props) => {
  const { modelId } = props;
  return (
    <MyModal modelId={modelId}>
      <ForProps modelId={modelId} />
    </MyModal>
  );
};

export default BaseModal;
