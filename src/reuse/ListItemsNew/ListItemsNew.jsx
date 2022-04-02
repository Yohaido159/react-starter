import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";

import BaseCardBody from "../BaseCardBody/BaseCardBody";
import { setPassData } from "../../redux/global/global.actions";
const ListItemsNew = (props) => {
  let {
    id,
    initItem,
    withoutMargin,
    idForPassData,
    withoutButton = false,
    list = [],
  } = props;
  const dispatch = useDispatch();

  const [items, setItems] = useState(list);
  console.log("items", items);
  const [idx, setIdx] = useState(list.length);

  const handleAddToList = () => {
    const nextId = idx + 1;
    setItems([...items, { id: nextId }]);
    setIdx(nextId);
  };

  const handleRemoveFromList = (itemId) => () => {
    const newItems = items.filter((item) => item.id !== itemId);
    dispatch(
      setPassData({
        path: `${idForPassData}.${id}.${itemId}`,
        effect: "delete",
      })
    );
    setItems(newItems);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {items.map((item) => (
        <BaseCardBody
          className={`${withoutMargin ? "" : "mb-3"}`}
          options={{
            withDelete: true,
            deleteButton: { onClick: handleRemoveFromList(item.id) },
          }}
          key={item.id}
        >
          {initItem(item.id)}
        </BaseCardBody>
      ))}

      <Button onClick={handleAddToList} className="mt-3" variant="outlined">
        הוסף פריט
      </Button>
    </div>
  );
};

export default ListItemsNew;
