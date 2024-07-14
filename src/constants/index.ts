export const STAT_NAME = {
  CONVENIENCE: {
    PUBLIC_TRANSPORT_COMMUTERS: 'public-transport-commute-percents',
    WALK_COMMUTERS: 'walk-only-percents',
    BICYLE_COMMUTERS: 'bicycle-only-percents',
  },
  TRANQUILLITY: {
    AGED_15_24: 'aged-16-25',
    POPULATION_DENSITY: 'population-density',
    TENANT_RATE: 'tenant-rate',
    DWELLING_TYPE: {
      HOUSES: 'dt-houses',
      UNITS: 'dt-units',
      TERRACES: 'dt-terraces',
      OTHER: 'dt-other',
    },
    TENURE_TYPE: {
      PUBLIC_HOUSING: 'tt-public-housing',
      PRIVATE_TENANT: 'tt-private-tenant',
      MORTGAGED: 'tt-mortgaged',
      OWNED_OUTRIGHT: 'tt-owned-outright',
    },
    FAMILY: {
      UNDER_5S: 'under-5s',
      AGED_5_14: 'primary-school-children',
      AGED_15_19: 'teenagers',
      FERTILITY_RATE: 'fertility',
      FAMILY_COMPOSITION: {
        ONE_PARENT_FAMILIES: 'fc-one-parent-families',
        COUPLE_FAMILY_KIDS_OVER_15: 'fc-couple-family-kids-over-15',
        COUPLE_FAMILY_KIDS_UNDER_15: 'fc-couple-family-kids-under-15',
        CHILDLESS_COUPLE: 'fc-childless-couples',
      },
    },
    COMMUNITY: {
      VOLUNTEERISM: 'volunteerism',
      LONG_TERM_RESIDENTS: 'long-term-residents',
    },
    ETHNICITY: {
      LANGUAGE_SPOKEN: {},
    },
  },
} as const;

export const ADDRESS_BBOX = {
  SYDNEY: {
    minLon: 150.5,
    minLat: -34.118,
    maxLon: 151.343,
    maxLat: -33.578,
  },
  MELBOURNE: {
    minLon: 144.5,
    minLat: -38.5,
    maxLon: 145.6,
    maxLat: -37.5,
  },
  BRISBANE: {
    minLon: 152.8,
    minLat: -28.3,
    maxLon: 153.4,
    maxLat: -27.1,
  },
  PERTH: {
    minLon: 115.7,
    minLat: -32.4,
    maxLon: 116.8,
    maxLat: -31.5,
  },
  ADELAIDE: {
    minLon: 138.5,
    minLat: -35.5,
    maxLon: 139.1,
    maxLat: -34.8,
  },
  CANBERRA: {
    minLon: 149.0,
    minLat: -35.5,
    maxLon: 149.5,
    maxLat: -35.0,
  },
  HOBART: {
    minLon: 147.2,
    minLat: -43.3,
    maxLon: 147.8,
    maxLat: -42.9,
  },
  DARWIN: {
    minLon: 130.8,
    minLat: -12.5,
    maxLon: 131.5,
    maxLat: -12.0,
  },
} as const;
