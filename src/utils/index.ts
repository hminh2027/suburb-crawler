import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

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

export const writeSuburbToFile = (data, council) => {
  // Check root directory existence
  existsSync('crawler') || mkdirSync('crawler');

  // Write data to file
  const jsonData = JSON.stringify(data, null, 2);
  writeFileSync(`crawler/${council}.json`, jsonData);
};

export const readSuburbFromFile = (council) => {
  try {
    const rawData = readFileSync(`crawler/${council}.json`, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    return {};
  }
};

export const transformData = (data: any[], statName: string) => {
  const resObj = {};
  data.forEach((item) => {
    // return {
    //   id: item.id,
    //   name: item.name,
    //   [statName]: item.stat_value,
    // };
    resObj[item.id] = {
      name: item.name,
      [statName]: item.stat_value,
    };
  });
  return resObj;
};

export const mergeData = (data1, data2) => {
  const resObj = {};
  // Normal merge if data1 or data2 is empty
  if (!Object.keys(data1).length || !Object.keys(data2).length) {
    return {
      ...data1,
      ...data2,
    };
  }

  // Merge two objects
  Object.keys(data1).forEach((key) => {
    resObj[key] = {
      ...data1[key],
      ...data2[key],
    };
  });
  return resObj;
};
