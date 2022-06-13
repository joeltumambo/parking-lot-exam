import styles from "./styles/App.module.css";
import ParkingLot from "./types/ParkingLot";
import createParkingLot from "./utils/createParkingLot";
import createParkingSpots from "./utils/createParkingSpots";
import ParkingLotDetails from "./components/ParkingLotDetails";
import ParkForm from "./components/ParkForm";

const App = () => {
  const entriesCount = 3;
  const spotsCount = 12;
  const parkingLot: ParkingLot = createParkingLot({
    spots: createParkingSpots(entriesCount, spotsCount),
  });

  return (
    <div className={styles["dashboard"]}>
      <span>
        <ParkingLotDetails {...parkingLot} />
      </span>
      <span>
        <ParkForm
          entriesCount={3}
          onPark={(data) => {
            console.log("park input", data);
          }}
        />
      </span>
    </div>
  );
};

export default App;
