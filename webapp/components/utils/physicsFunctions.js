export const deg2rad = (degrees) => degrees * (Math.PI / 180);

export const getStarSize = (radius) => {
  var adjustedRadius = radius;
  if (radius >= 4) {
    adjustedRadius = 4 + 3 * Math.log10(radius - 3) * Math.log10(10, radius);
  }
  return 1.5 * adjustedRadius;
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
