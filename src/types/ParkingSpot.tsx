export enum Size {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

interface ParkingSpot {
  id: number;
  size: Size;
  distances: number[];
}

export default ParkingSpot;
