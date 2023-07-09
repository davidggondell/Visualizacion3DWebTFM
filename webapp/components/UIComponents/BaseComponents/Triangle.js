import React from "react";

export const Triangle = ({
  direction = "up",
  height,
  halfBase,
  color = "transparent",
  borderColor = "transparent",
  borderWidth = 0,
  shadow = false,
}) => {
  const base = halfBase * 2;
  let points = "";
  let viewportWidth = base + 2 * borderWidth;
  let viewportHeight = height + 2 * borderWidth;

  if (direction === "up") {
    points = `0,${height} ${halfBase},0 ${base},${height}`;
  } else if (direction === "down") {
    points = `0,0 ${halfBase},${height} ${base},0`;
  } else if (direction === "right") {
    points = `0,0 ${height},${halfBase} 0,${base}`;
    const auxWidth = viewportWidth;
    viewportWidth = viewportHeight;
    viewportHeight = auxWidth;
  } else if (direction === "left") {
    points = `0,${halfBase} ${height},0 ${height},${base}`;
    const auxWidth = viewportWidth;
    viewportWidth = viewportHeight;
    viewportHeight = auxWidth;
  } else {
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${viewportWidth}px`}
      height={`${viewportHeight}px`}
      style={
        shadow && borderColor
          ? {
              WebkitFilter: `drop-shadow(0 0 2px ${borderColor})`,
              filter: `drop-shadow(0 0 2px ${borderColor})`,
            }
          : {}
      }
    >
      <polygon
        transform={`translate(${borderWidth},${borderWidth})`}
        points={points}
        fill={color}
        stroke={borderColor}
        strokeWidth={borderWidth}
        paintOrder="stroke"
      />
    </svg>
  );
};
