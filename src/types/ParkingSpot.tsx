export enum Size {
  S = "Small",
  M = "Medium",
  L = "Large",
}

interface ParkingSpot {
  id: string;
  size: Size;
  distances: number[];
}

export default ParkingSpot;
