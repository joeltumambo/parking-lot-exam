import { flow } from "lodash";

const getDuration = (start: Date, end: Date): number =>
  flow(
    () => new Date(end).valueOf() - new Date(start).valueOf(),
    (difference) => difference / (1000 * 60 * 60),
    (hours) => Math.ceil(hours) // round up
  )();

export default getDuration;
