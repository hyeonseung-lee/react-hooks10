import React from "react";

function List({ name, children }) {
  return (
    <>
      <h1>{name}</h1>
      <ul>{children}</ul>
    </>
  );
}

export default List;
