import ParkingLot from "../types/ParkingLot";

const ParkingLotDetails: React.FC<ParkingLot> = (parkingLot) => (
  <div>
    <code
      style={{
        whiteSpace: "pre-wrap",
      }}
    >
      {JSON.stringify({ parkingLot }, null, 2)}
    </code>
  </div>
);

export default ParkingLotDetails;
