export const blueStarMinTemp = 12000;
export const brightBlueStarMinTemp = 10000;
export const whiteStarMinTemp = 7500;
export const brightYellowStarMinTemp = 6000;
export const yellowStarMinTemp = 5200;
export const orangeStarMinTemp = 3700;

export const deg2rad = (degrees) => degrees * (Math.PI / 180);

export const getStarSize = (radius) => {
  var adjustedRadius = radius;
  if (radius >= 4) {
    adjustedRadius = 4 + 3 * Math.log10(radius - 3) * Math.log10(10, radius);
  }
  return 1.5 * adjustedRadius;
};

export const getStarClass = (temperature) => {
  if (temperature > blueStarMinTemp) {
    return "O";
  } else if (temperature > brightBlueStarMinTemp) {
    return "B";
  } else if (temperature > whiteStarMinTemp) {
    return "A";
  } else if (temperature > brightYellowStarMinTemp) {
    return "F";
  } else if (temperature > yellowStarMinTemp) {
    return "G";
  } else if (temperature > orangeStarMinTemp) {
    return "K";
  } else if (temperature > 0) {
    return "M";
  } else {
    return "";
  }
};

export const calculateMassCenter = (starCluster) => {
  var sumMass = 0;
  var xCD = 0;
  var yCD = 0;
  var zCD = 0;
  starCluster.forEach((star) => {
    sumMass = sumMass + parseFloat(star.mass_i);

    xCD = xCD + star.x * star.mass_i;
    yCD = yCD + star.y * star.mass_i;
    zCD = zCD + star.z * star.mass_i;
  });
  if (sumMass != 0) {
    return { x: xCD / sumMass, y: yCD / sumMass, z: zCD / sumMass };
  } else {
    return { x: 0, y: 0, z: 0 };
  }
};
