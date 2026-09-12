/**
 * Real star data (J2000): right ascension in hours, declination in degrees,
 * apparent visual magnitude. Values from standard bright-star catalogue figures.
 */
export type Star = {
  name: string;
  ra: number; // hours
  dec: number; // degrees
  mag: number;
};

export type ConstellationFigure = {
  name: string;
  stars: Star[];
  /** Index pairs into `stars` describing the traditional stick figure. */
  lines: [number, number][];
};

export const constellations: ConstellationFigure[] = [
  {
    name: "Orion",
    stars: [
      { name: "Betelgeuse", ra: 5.9195, dec: 7.407, mag: 0.5 },
      { name: "Bellatrix", ra: 5.4188, dec: 6.3497, mag: 1.64 },
      { name: "Alnitak", ra: 5.6793, dec: -1.9426, mag: 1.77 },
      { name: "Alnilam", ra: 5.6036, dec: -1.2019, mag: 1.69 },
      { name: "Mintaka", ra: 5.5334, dec: -0.2991, mag: 2.23 },
      { name: "Saiph", ra: 5.7959, dec: -9.6696, mag: 2.06 },
      { name: "Rigel", ra: 5.2423, dec: -8.2016, mag: 0.18 },
      { name: "Meissa", ra: 5.5855, dec: 9.9342, mag: 3.39 },
    ],
    lines: [
      [0, 2],
      [2, 3],
      [3, 4],
      [4, 1],
      [1, 6],
      [6, 4],
      [2, 5],
      [0, 7],
      [7, 1],
    ],
  },
  {
    name: "Ursa Major",
    stars: [
      { name: "Dubhe", ra: 11.0621, dec: 61.751, mag: 1.79 },
      { name: "Merak", ra: 11.0307, dec: 56.3824, mag: 2.37 },
      { name: "Phecda", ra: 11.8972, dec: 53.6948, mag: 2.44 },
      { name: "Megrez", ra: 12.2571, dec: 57.0326, mag: 3.31 },
      { name: "Alioth", ra: 12.9005, dec: 55.9598, mag: 1.77 },
      { name: "Mizar", ra: 13.3988, dec: 54.9254, mag: 2.27 },
      { name: "Alkaid", ra: 13.7923, dec: 49.3133, mag: 1.86 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [3, 4],
      [4, 5],
      [5, 6],
    ],
  },
  {
    name: "Cassiopeia",
    stars: [
      { name: "Caph", ra: 0.1529, dec: 59.1498, mag: 2.27 },
      { name: "Schedar", ra: 0.6751, dec: 56.5373, mag: 2.24 },
      { name: "Gamma Cas", ra: 0.9451, dec: 60.7167, mag: 2.47 },
      { name: "Ruchbah", ra: 1.4304, dec: 60.2353, mag: 2.68 },
      { name: "Segin", ra: 1.9066, dec: 63.6701, mag: 3.38 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    name: "Lyra",
    stars: [
      { name: "Vega", ra: 18.6156, dec: 38.7837, mag: 0.03 },
      { name: "Sheliak", ra: 18.8347, dec: 33.3627, mag: 3.52 },
      { name: "Sulafat", ra: 18.9824, dec: 32.6896, mag: 3.24 },
      { name: "Delta Lyr", ra: 18.9089, dec: 36.8986, mag: 4.3 },
      { name: "Zeta Lyr", ra: 18.7461, dec: 37.605, mag: 4.36 },
    ],
    lines: [
      [0, 4],
      [4, 3],
      [3, 2],
      [2, 1],
      [1, 4],
    ],
  },
  {
    name: "Crux",
    stars: [
      { name: "Acrux", ra: 12.4433, dec: -63.0991, mag: 0.77 },
      { name: "Mimosa", ra: 12.7953, dec: -59.6888, mag: 1.25 },
      { name: "Gacrux", ra: 12.5194, dec: -57.1132, mag: 1.63 },
      { name: "Imai", ra: 12.2524, dec: -58.7489, mag: 2.79 },
    ],
    lines: [
      [0, 2],
      [1, 3],
    ],
  },
  {
    name: "Cygnus",
    stars: [
      { name: "Deneb", ra: 20.6905, dec: 45.2803, mag: 1.25 },
      { name: "Sadr", ra: 20.3705, dec: 40.2567, mag: 2.23 },
      { name: "Albireo", ra: 19.5121, dec: 27.9597, mag: 3.05 },
      { name: "Gienah", ra: 20.7702, dec: 33.9703, mag: 2.46 },
      { name: "Delta Cyg", ra: 19.7496, dec: 45.1308, mag: 2.87 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
      [1, 4],
    ],
  },
];

/** Additional bright catalogue stars used to fill the sky (no figure lines). */
export const fieldStars: Star[] = [
  { name: "Sirius", ra: 6.7525, dec: -16.7161, mag: -1.46 },
  { name: "Canopus", ra: 6.3992, dec: -52.6957, mag: -0.74 },
  { name: "Arcturus", ra: 14.261, dec: 19.1825, mag: -0.05 },
  { name: "Rigil Kentaurus", ra: 14.6601, dec: -60.8339, mag: -0.01 },
  { name: "Capella", ra: 5.2782, dec: 45.998, mag: 0.08 },
  { name: "Procyon", ra: 7.655, dec: 5.225, mag: 0.34 },
  { name: "Achernar", ra: 1.6286, dec: -57.2367, mag: 0.46 },
  { name: "Hadar", ra: 14.0637, dec: -60.373, mag: 0.61 },
  { name: "Altair", ra: 19.8464, dec: 8.8683, mag: 0.76 },
  { name: "Aldebaran", ra: 4.5987, dec: 16.5093, mag: 0.85 },
  { name: "Antares", ra: 16.4901, dec: -26.4319, mag: 1.09 },
  { name: "Spica", ra: 13.4199, dec: -11.1613, mag: 1.04 },
  { name: "Pollux", ra: 7.7553, dec: 28.0262, mag: 1.14 },
  { name: "Fomalhaut", ra: 22.9608, dec: -29.6222, mag: 1.16 },
  { name: "Regulus", ra: 10.1395, dec: 11.9672, mag: 1.36 },
  { name: "Castor", ra: 7.5763, dec: 31.8883, mag: 1.58 },
  { name: "Shaula", ra: 17.5601, dec: -37.1038, mag: 1.62 },
  { name: "Elnath", ra: 5.4381, dec: 28.6075, mag: 1.65 },
  { name: "Alnair", ra: 22.1372, dec: -46.9609, mag: 1.74 },
  { name: "Kaus Australis", ra: 18.4029, dec: -34.3846, mag: 1.85 },
  { name: "Polaris", ra: 2.5303, dec: 89.2641, mag: 1.98 },
  { name: "Alphard", ra: 9.4597, dec: -8.6586, mag: 1.98 },
  { name: "Denebola", ra: 11.8177, dec: 14.5721, mag: 2.14 },
  { name: "Alphecca", ra: 15.5781, dec: 26.7147, mag: 2.22 },
  { name: "Menkalinan", ra: 5.9922, dec: 44.9474, mag: 1.9 },
  { name: "Mirach", ra: 1.1622, dec: 35.6206, mag: 2.05 },
  { name: "Almach", ra: 2.0649, dec: 42.3297, mag: 2.1 },
  { name: "Hamal", ra: 2.1195, dec: 23.4624, mag: 2.0 },
  { name: "Algol", ra: 3.1361, dec: 40.9556, mag: 2.09 },
  { name: "Mirfak", ra: 3.4054, dec: 49.8612, mag: 1.79 },
  { name: "Alderamin", ra: 21.3097, dec: 62.5856, mag: 2.45 },
  { name: "Rasalhague", ra: 17.5822, dec: 12.5601, mag: 2.08 },
  { name: "Eltanin", ra: 17.9434, dec: 51.4889, mag: 2.23 },
  { name: "Nunki", ra: 18.9211, dec: -26.2967, mag: 2.05 },
  { name: "Sabik", ra: 17.1729, dec: -15.7249, mag: 2.43 },
  { name: "Diphda", ra: 0.7265, dec: -17.9866, mag: 2.04 },
  { name: "Markab", ra: 23.0793, dec: 15.2053, mag: 2.49 },
  { name: "Scheat", ra: 23.0629, dec: 28.0828, mag: 2.42 },
  { name: "Algenib", ra: 0.2206, dec: 15.1836, mag: 2.83 },
  { name: "Enif", ra: 21.7364, dec: 9.875, mag: 2.39 },
];

/** Convert equatorial coordinates to a point on a sphere of the given radius. */
export function raDecToVector(
  ra: number,
  dec: number,
  radius: number,
): [number, number, number] {
  const raRad = (ra / 24) * Math.PI * 2;
  const decRad = (dec * Math.PI) / 180;
  const x = radius * Math.cos(decRad) * Math.cos(raRad);
  const y = radius * Math.sin(decRad);
  const z = -radius * Math.cos(decRad) * Math.sin(raRad);
  return [x, y, z];
}
