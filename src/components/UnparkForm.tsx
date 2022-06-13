import { useState } from "react";
import styles from "../styles/ParkForm.module.css";
import ParkingRecord from "../types/ParkingRecord";
import isoDate from "../utils/isoDate";

export interface UnparkInputData {
  record: string;
  time: Date;
}

type ChangeHandler<T> = React.ChangeEventHandler<T>;

interface UnparkFormProps {
  records: ParkingRecord[];
  onSubmit(data: UnparkInputData): void;
}

const UnparkForm: React.FC<UnparkFormProps> = ({ records, onSubmit }) => {
  const [values, setValues] = useState<UnparkInputData>({
    record: "",
    time: new Date(),
  });

  const handleRecordChange: ChangeHandler<HTMLInputElement> = (e) => {
    setValues((oldValues) => ({
      ...oldValues,
      record: e.target.value,
    }));
  };

  const handleTimeChange: ChangeHandler<HTMLInputElement> = (e) => {
    setValues((oldValues) => ({
      ...oldValues,
      time: new Date(e.target.value),
    }));
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <span className={styles["form-row"]}>
        <label>Record</label>
        <input
          name="record"
          value={values.record}
          onChange={handleRecordChange}
        />
      </span>
      <span className={styles["form-row"]}>
        <label>Time</label>
        <input
          name="time"
          type="datetime-local"
          value={isoDate(values.time)}
          onChange={handleTimeChange}
        />
      </span>
      <button type="submit">Unpark</button>
    </form>
  );
};

export default UnparkForm;
