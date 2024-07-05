import { Guest } from "./guest";
import { Room } from "./room";

export interface Book {
  id:          number;
  huesped_id:  number;
  cuarto_id:   number;
  in:          string;
  out:         string;
  check_in:    number;
  created_at?: string;
  updated_at?: string;
  guest?:       Guest;
  room?:        Room;
}

