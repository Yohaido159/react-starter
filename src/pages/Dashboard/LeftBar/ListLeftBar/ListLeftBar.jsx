import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NestedListIcons from "../../../../reuse/NestedListIcons/NestedListIcons";

const ListLeftBar = (props) => {
  const { className, items } = props;

  return (
    <div className={className}>
      <NestedListIcons items={items} />
    </div>
  );
};

export default ListLeftBar;
