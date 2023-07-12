import React from "react";
import { Box } from "@mui/material";

const Shape = ({ closed, ...props }) => {
  if (closed) {
    return <polygon {...props} />;
  } else {
    return <polyline {...props} />;
  }
};

const getPoints = (bigBase, offsetSmallBase, height, direction) => {
  if (direction === "up") {
    return `0,${height} ${offsetSmallBase},0 ${bigBase - offsetSmallBase},0 ${bigBase},${height} `;
  } else if (direction === "down") {
    return `0,0 ${offsetSmallBase},${height} ${bigBase - offsetSmallBase},${height} ${bigBase},0`;
  } else if (direction === "right") {
    return `0,0 ${height},${offsetSmallBase} ${bigBase - offsetSmallBase} 0,${bigBase}`;
  } else if (direction === "left") {
    return `${height},0 0,${offsetSmallBase} 0,${bigBase - offsetSmallBase} ${height},${bigBase} `;
  } else {
    return "";
  }
};

const getViewPortSize = (bigBase, height, borderWidth, direction, closed) => {
  let viewportWidth = bigBase + 2 * borderWidth;
  let viewportHeight = height + 2 * borderWidth;
  if (!closed) {
    viewportHeight = viewportHeight - borderWidth;
  }
  if (direction == "left" || direction == "right") {
    const auxWidth = viewportWidth;
    viewportWidth = viewportHeight;
    viewportHeight = auxWidth;
  }
  return { viewportWidth, viewportHeight };
};

const getInnerBoxMeasures = (bigBase, offsetSmallBase, height, borderWidth, direction) => {
  let boxWidth = bigBase - 2 * offsetSmallBase;
  let boxHeight = height;
  let horizontalOffset = borderWidth + offsetSmallBase;
  let verticalOffset = borderWidth;
  if (direction == "left" || direction == "right") {
    const auxWidth = boxWidth;
    const auxOffset = verticalOffset;
    boxWidth = boxHeight;
    boxHeight = auxWidth;
    verticalOffset = horizontalOffset;
    horizontalOffset = auxOffset;
  }
  return { boxWidth, boxHeight, horizontalOffset, verticalOffset };
};

export const TrapezeBox = ({
  direction = "up",
  height,
  bigBase,
  offsetSmallBase,
  color = "transparent",
  borderColor = "transparent",
  borderWidth = 0,
  minHeight,
  minWidth,
  closed = true,
  shadow = false,
  children,
  sx = {},
  ...props
}) => {
  const actualHeight = minHeight > height ? minHeight : height;
  const actualBigBase = minWidth > bigBase - offsetSmallBase ? minWidth + offsetSmallBase : bigBase;
  const points = getPoints(actualBigBase, offsetSmallBase, actualHeight, direction);
  const { viewportWidth, viewportHeight } = getViewPortSize(
    actualBigBase,
    actualHeight,
    borderWidth,
    direction,
    closed,
  );
  const { boxWidth, boxHeight, horizontalOffset, verticalOffset } = getInnerBoxMeasures(
    actualBigBase,
    offsetSmallBase,
    actualHeight,
    borderWidth,
    direction,
  );

  return (
    <Box
      sx={{
        height: viewportHeight,
        width: viewportWidth,
        minHeight: minHeight ? minHeight : 0,
        minWidth: minWidth ? minWidth : 0,
        ...sx,
      }}
      {...props}
    >
      <svg
        viewBox={`0 0 ${viewportWidth} ${viewportHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        width={`${viewportWidth}px`}
        height={`${viewportHeight}px`}
      >
        <defs>
          <filter id="filter_shadow">
            <feDropShadow id="node_shadow" dx="0" dy="0" stdDeviation="2" floodColor={borderColor} />
          </filter>
        </defs>
        <Shape transform={`translate(${borderWidth},${borderWidth})`} points={points} fill={color} closed={closed} />
        <Shape
          filter={shadow ? "url(#filter_shadow)" : ""}
          transform={`translate(${borderWidth},${borderWidth})`}
          points={points}
          fill="transparent"
          stroke={borderColor}
          strokeWidth={borderWidth}
          closed={closed}
        />
      </svg>
      <Box
        sx={{
          position: "absolute",
          top: verticalOffset,
          left: horizontalOffset,
          right: horizontalOffset,
          bottom: verticalOffset,
          width: boxWidth,
          height: boxHeight,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
