import React from "react";

const RenderIfTrue = props => {
  const { condition } = props
  return (
    <>
      {condition ? props.children : null}
    </>
  );
};

export default RenderIfTrue;