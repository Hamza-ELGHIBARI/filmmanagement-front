import { Actor } from "./actor.model";
import { Director } from "./director.model";


export interface Film {
  id: number;
  title: string;
  description: string;
  poster?: string;
  posterFile?: File;
  releaseDate: string;
  director: Director;
  actors: Actor[];
}
