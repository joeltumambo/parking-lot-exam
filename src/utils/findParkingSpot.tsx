import ParkingSpot, { Size } from "../types/ParkingSpot";

type SizeDictionary = {
  [key in Size]: Size[];
};

// S vehicles can park in S, M, L,
// M vehicles in M, L
// L vehicles in L
const sizeFilters: SizeDictionary = {
  [Size.S]: [Size.S, Size.M, Size.L],
  [Size.M]: [Size.M, Size.L],
  [Size.L]: [Size.L],
};

const findParkingSpot = (
  size: Size,
  entry: number,
  spots: ParkingSpot[]
): ParkingSpot =>
  spots
    .filter((spot) => sizeFilters[size].includes(spot.size))
    .sort((a, b) => a.distances[entry] - b.distances[entry])[0];

export default findParkingSpot;
