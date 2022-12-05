export interface StatisticsByMunicipalityDto {
  id: number;
  key: string;
  name: string;
  key_coneval: string;
  statistics: Statistic[];
}

export interface Statistic {
  id: number;
  name: string;
  data: never[];
  municipality_id: number;
  created_at: Date;
  updated_at: Date;
}
