import { Floor } from "./floor";

export interface Room {
  id:     number;
  floor:  Floor;
  cuarto: string;
}
