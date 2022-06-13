import { flow } from "lodash";
import styles from "./styles/App.module.css";
import ParkingLot from "./types/ParkingLot";
import createParkingLot from "./utils/createParkingLot";
import createParkingSpots from "./utils/createParkingSpots";
import ParkingLotDetails from "./components/ParkingLotDetails";
import ParkForm from "./components/ParkForm";
import findParkingSpot from "./utils/findParkingSpot";

const App = () => {
  const entriesCount = 4;
  const spotsCount = 9;
  const parkingLot: ParkingLot = createParkingLot({
    spots: createParkingSpots(entriesCount, spotsCount),
  });

  return (
    <div className={styles["dashboard"]}>
      <span>
        <ParkingLotDetails {...parkingLot} />
      </span>
      <span>
        <ParkingLotDetails {...parkingLot} />
      </span>
      <span>
        <ParkForm
          entriesCount={entriesCount}
          onPark={(data) => {
            console.log("park input", data);
            flow(
              () => findParkingSpot(data.size, data.entry, parkingLot.spots),
              (spots) => console.log(spots)
            )();
          }}
        />
      </span>
    </div>
  );
};

export default App;
