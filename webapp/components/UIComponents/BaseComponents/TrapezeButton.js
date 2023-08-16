import React, { useRef } from "react";
import { styled } from "@mui/system";
import { themeValues } from "../../utils/themeValues";

function createRipple(event, ref) {
  const button = ref.current;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.minWidth = circle.style.minHeight = `${diameter}px`;
  const { top, left } = button.getBoundingClientRect();
  const clickX = event.pageX - left;
  const clickY = event.pageY - top;

  circle.style.left = `${clickX - radius}px`;
  circle.style.top = `${clickY - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const getRotation = (direction) => {
  switch (direction) {
    case "left":
      return "rotateX(0deg) rotateY(-20deg)";
    case "top":
      return "rotateX(20deg) rotateY(0deg)";
    case "bottom":
      return "rotateX(-20deg) rotateY(0deg)";
    case "right":
      return "rotateX(0deg) rotateY(20deg)";
    default:
      return "";
  }
};

const Trapeze = styled("div")(() => ({
  width: "40px",
  height: "150px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "static",
  perspective: "130px",
  cursor: "pointer",
  touchAction: "manipulation",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
}));

const TrapezeShape = styled("div")(({ direction }) => ({
  position: "absolute",
  overflow: "hidden",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 248, 248, 0.1)",
  border: `2px solid ${themeValues.palette.primary.main}`,
  boxShadow: `${themeValues.palette.primary.main} 0px 0px 2px`,
  content: '""',
  left: direction == "left" ? -1 : 0,
  top: direction == "top" ? -1 : 0,
  bottom: direction == "bottom" ? -1 : 0,
  right: direction == "right" ? -1 : 0,
  zIndex: -1,
  transform: getRotation(direction),
  userSelect: "none",
  "&:active": {
    boxShadow: `${themeValues.palette.primary.main} 0px 0px 5px`,
  },
  "&:hover": {
    backgroundColor: "rgba(0, 30, 30, 0.6)",
    "@media (hover: none)": {
      backgroundColor: "rgba(0, 248, 248, 0.1)",
    },
  },
}));

export const TrapezeButton = ({ onClick = () => {}, direction = "top", shapeChildren, children, ...props }) => {
  const shapeRef = useRef();
  return (
    <Trapeze
      {...props}
      onTouchStart={() => {}}
      onClick={(event) => {
        createRipple(event, shapeRef);
        onClick(event);
      }}
    >
      {children}
      <TrapezeShape direction={direction} ref={shapeRef}>
        {shapeChildren}
      </TrapezeShape>
    </Trapeze>
  );
};
