import { Room } from "./room";

export interface Floor {
  id:          number;
  piso:        string;
  created_at?: string;
  updated_at?: string;
  cuarto?:     Room[];
}
