import {
  applySpaceMotion,
  calculateMassCenter,
  cartesianCoordinatesToRenderCoordinates,
  getStarClass,
  starClasses,
} from "../components/utils/physicsFunctions";
import {
  centroDeMasasPrueba1,
  centroDeMasasPrueba2,
  centroDeMasasPrueba3,
  centroDeMasasPrueba4,
} from "./physicsTestData";

test("Calculo del centro de masas de un cúmulo", () => {
  expect(calculateMassCenter(centroDeMasasPrueba1.prueba)).toStrictEqual(centroDeMasasPrueba1.resultado);
  expect(calculateMassCenter(centroDeMasasPrueba2.prueba)).toStrictEqual(centroDeMasasPrueba2.resultado);
  expect(calculateMassCenter(centroDeMasasPrueba3.prueba)).toStrictEqual(centroDeMasasPrueba3.resultado);
  expect(calculateMassCenter(centroDeMasasPrueba4.prueba)).toStrictEqual(centroDeMasasPrueba4.resultado);
});

test("Obtención de la clase estelar", () => {
  expect(getStarClass(34000)).toStrictEqual(starClasses.O);
  expect(getStarClass(12000)).toStrictEqual(starClasses.B);
  expect(getStarClass(5500)).toStrictEqual(starClasses.G);
  expect(getStarClass(1000)).toStrictEqual(starClasses.M);
});

test("Paso de coordenadas cartesianas a render", () => {
  expect(cartesianCoordinatesToRenderCoordinates(1, 2, 3, { x: 0, y: 0, z: 0 })).toStrictEqual({
    x: 200,
    y: 400,
    z: 600,
  });

  expect(cartesianCoordinatesToRenderCoordinates(5, 5, 5, { x: 2, y: 3, z: 4 })).toStrictEqual({
    x: 600,
    y: 400,
    z: 200,
  });

  expect(cartesianCoordinatesToRenderCoordinates(-1, -1, -1, { x: -2, y: -3, z: -4 })).toStrictEqual({
    x: 200,
    y: 400,
    z: 600,
  });
});

test("Aplicar movimiento a una estrella", () => {
  const x = 10;
  const y = 20;
  const z = 30;
  const pm_ra = 16.5; // Movimiento propio en RA (en mas/año)
  const pm_dec = -31.0; // Movimiento propio en DEC (en mas/año)
  const radialVelocity = 500; // Velocidad radial (en km/s)

  expect(applySpaceMotion(x, y, z, pm_ra, pm_dec, radialVelocity, 10000)).toStrictEqual({
    x: 11.464935101547185,
    y: 25.824631576761362,
    z: 31.78767094446582,
  });

  expect(applySpaceMotion(x, y, z, pm_ra, pm_dec, radialVelocity, 20000)).toStrictEqual({
    x: 12.574952463045355,
    y: 32.231577873717164,
    z: 32.75542216214003,
  });
});
