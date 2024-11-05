export type Role = string;
export type City = { id: number; name: string };
export type Person = {
  id: string;
  name: string;
  role: Role;
  preferredCity: City[];
};
export type Assignments = { [city: string]: Person[] };
