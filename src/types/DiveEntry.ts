export interface DiveLocation {
  type: string;
  coordinates: number[];
  name: string;
}

export interface BottomTime {
  minutes: number;
  seconds: number;
}

export interface DiveEntry {
  _id?: string;
  diver?: string;
  create_date?: string;
  update_date?: string;
  depth?: number;
  location?: DiveLocation;
  bottom_time?: BottomTime;
  nitrox?: boolean;
  summary?: string;
  in_time?: string;
  out_time?: string;
}
