export const RATE_FLAT = 40;
export const RATE_SMALL = 20;
export const RATE_MEDIUM = 60;
export const RATE_LARGE = 100;
export const RATE_OVERNIGHT = 5000;

enum Size {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

export interface ParkingSpot {
  size: Size;
  distances: number[];
}

interface ParkingLot {
  rateFlat: number;
  rateSmall: number;
  rateMedium: number;
  rateLarge: number;
  rateOvernight: number;
  spots: ParkingSpot[];
}

export default ParkingLot;
