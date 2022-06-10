import { useState } from "react";
import ParkingLot from "./types/ParkingLot";
import createParkingLot from "./utils/createParkingLot";
import ParkingLotDetails from "./components/ParkingLotDetails";

const App = () => {
  const [parkingLot, setParkingLot] = useState<ParkingLot>(
    createParkingLot({})
  );

  return (
    <div>
      <ParkingLotDetails {...parkingLot} />
    </div>
  );
};

export default App;
