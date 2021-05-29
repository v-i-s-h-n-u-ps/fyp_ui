import React from "react";

import s from "./index.module.scss";

const ActivityIndicator = props => {

  const {
    show, strokeWidth = 4, r = 15, color = "#93bfec",
    viewBox = "0 0 50 50", cx = "25", cy = "25", height = 18,
    width = 18
  } = props;

  return (
    <>
      {show &&
        <>
          <svg
            className={`${s.spinner} spinner`}
            viewBox={viewBox}
          >
            <circle
              className={`${s.path} path`}
              fill="none"
              cx={cx}
              cy={cy}
              r={r}
              strokeWidth={strokeWidth}
            />
          </svg>
          <style jsx>{`
              .spinner .path {
                  stroke: ${color};
              }
              .spinner {
                  height: ${height}px;
                  width: ${width}px;
              }
          `}</style>
        </>
      }
    </>
  )
}

export default ActivityIndicator;