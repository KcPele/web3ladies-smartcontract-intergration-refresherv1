import React, { useEffect, useState } from "react";

const List = ({ getItems }) => {
  const [items, setItems] = useState();
  useEffect(() => {
    console.log("List component");
    setItems(getItems());
  }, [getItems]);
  return (
    <div>
      <ul>
        {getItems().map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
