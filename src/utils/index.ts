export const genBboxString = (bboxArea) => {
  const { minLon, minLat, maxLon, maxLat } = bboxArea;
  return `${minLat},${minLon},${maxLat},${maxLon}`;
};
export const genRawPayload = ({ bboxArea, statName }) => {
  const rawPayload = `stat_name=${statName}&bbox=${genBboxString(
    bboxArea,
  )}&obj_type=ssc&ids=`;
  return rawPayload;
};
