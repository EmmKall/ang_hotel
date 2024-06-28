import { Floor } from "./floor";

export interface Room {
  id:          number;
  piso?:       Floor;
  cuarto:      string;
  piso_id:     number;
  created_at?: string;
  updated_at?: string;
}
