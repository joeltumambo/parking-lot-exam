import ParkingLot from "../types/ParkingLot";

const ParkingLotDetails: React.FC<ParkingLot> = (parkingLot) => (
  <code
    style={{
      whiteSpace: "pre",
    }}
  >
    {JSON.stringify({ parkingLot }, null, 2)}
  </code>
);

export default ParkingLotDetails;
