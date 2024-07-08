export enum StatName {
  PUBLIC_TRANSPORT_COMMUTE_PERCENTS = 'public-transport-commute-percents',
  UNDER_5S = 'under-5s',
  VOLUNTEERISM = 'volunteerism',
}

export const ADDRESS_BBOX = {
  SYDNEY: {
    minLon: 150.502229,
    minLat: -34.118347,
    maxLon: 151.343021,
    maxLat: -33.57814,
  },
  MELBOURNE: {
    minLon: 144.593742,
    minLat: -38.433859,
    maxLon: 145.512528,
    maxLat: -37.511273,
  },
} as const;
