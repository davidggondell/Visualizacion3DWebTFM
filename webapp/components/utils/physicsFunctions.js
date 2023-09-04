import BigNumber from "bignumber.js";

export const blueStarMinTemp = 12000;
export const brightBlueStarMinTemp = 10000;
export const whiteStarMinTemp = 7500;
export const brightYellowStarMinTemp = 6000;
export const yellowStarMinTemp = 5200;
export const orangeStarMinTemp = 3700;

export const starClasses = {
  O: "O",
  B: "B",
  A: "A",
  F: "F",
  G: "G",
  K: "K",
  M: "M",
};

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
    return starClasses.O;
  } else if (temperature > brightBlueStarMinTemp) {
    return starClasses.B;
  } else if (temperature > whiteStarMinTemp) {
    return starClasses.A;
  } else if (temperature > brightYellowStarMinTemp) {
    return starClasses.F;
  } else if (temperature > yellowStarMinTemp) {
    return starClasses.G;
  } else if (temperature > orangeStarMinTemp) {
    return starClasses.K;
  } else if (temperature > 0) {
    return starClasses.M;
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

export const kmInParsec = 3.08567758128e13;

export const applySpaceMotion = (x, y, z, pm_ra, pm_dec, radialVelocity, timePassed) => {
  if (pm_ra == undefined || pm_ra == null || pm_dec == undefined || pm_dec == null) {
    return { x, y, z };
  }
  const radialVelocityExistent = radialVelocity ? radialVelocity : 0;
  // Calcular desplazamiento angular debido al movimiento propio
  const deltaRA = (pm_ra * timePassed) / 3600000; // Convertir mas/año a grados
  const deltaDec = (pm_dec * timePassed) / 3600000; // Convertir mas/año a grados

  // Convertir las coordenadas cartesianas a coordenadas esféricas
  const distance = Math.sqrt(x * x + y * y + z * z);
  const ra = Math.atan2(y, x);
  const dec = Math.asin(z / distance);

  // Calcular cambio en las coordenadas esféricas debido al movimiento propio
  const newRA = deltaRA + ra;
  const newDec = deltaDec + dec;

  // Calcular cambio en la distancia debido a la velocidad radial pasandola de km/s a parsecs/s y pasando los años transcurridos a segundos
  const deltaDistance = (radialVelocityExistent * timePassed * 3600 * 24 * 365.25) / kmInParsec;

  // Calcular nuevas coordenadas cartesianas
  const newDistance = deltaDistance + distance;
  const newX = newDistance * Math.cos(newDec) * Math.cos(newRA);
  const newY = newDistance * Math.cos(newDec) * Math.sin(newRA);
  const newZ = newDistance * Math.sin(newDec);

  return {
    x: newX,
    y: newY,
    z: newZ,
  };
};

export const cartesianCoordinatesToRenderCoordinates = (x, y, z, massCenter) => {
  return { x: (x - massCenter.x) * 200, y: (y - massCenter.y) * 200, z: (z - massCenter.z) * 200 };
};
