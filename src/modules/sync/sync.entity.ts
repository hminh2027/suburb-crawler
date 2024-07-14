export class Sync {
  id: string;
  name: string;
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
  syncedAt: Date;

  // Statistics
  publicTransportCommutePercents: number;
  under5s: number;
  volunteerism: number;
}
