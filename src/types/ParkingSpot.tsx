export enum Size {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

interface ParkingSpot {
  size: Size;
  distances: number[];
}

export default ParkingSpot;
