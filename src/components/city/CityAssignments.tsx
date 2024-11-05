import React, { useCallback, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { DraggableItem } from "./DnD";
import { Role, City, Person, Assignments } from "@/types/types";
import { CityDialog, RoleDialog, UserDialog } from "../dialog/Dialogs";
import CitySection from "./CitySection";
import JsonDisplay from "./JsonDisplay";

const initialRole: Role[] = [
  "Business Development",
  "Research",
  "Training",
  "Recruitment",
  "Procurement",
  "Logistics",
  "Facilities",
];

const initialCity: City[] = [
  { id: 1, name: "Kathmandu" },
  { id: 2, name: "Lalitpur" },
];

const initialPeople: Person[] = [
  {
    id: "1",
    name: "Person A",
    role: initialRole[3],
    preferredCity: [initialCity[0]],
  },
  {
    id: "2",
    name: "Person B",
    role: initialRole[4],
    preferredCity: [initialCity[1]],
  },
  { id: "3", name: "Person C", role: initialRole[0], preferredCity: [] },
  { id: "4", name: "Person D", role: initialRole[2], preferredCity: [] },
];

const CityAssignment: React.FC = () => {
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [assignments, setAssignments] = useState<Assignments>({
    Kathmandu: [],
    Lalitpur: [],
  });
  const [cities, setCities] = useState<City[]>(initialCity);
  const [roles, setRoles] = useState<Role[]>(initialRole);

  const [expandedCity, setExpandedCity] = useState<string | null>("Kathmandu");
  const handleExpandCity = useCallback(
    (city: string) => {
      setExpandedCity(expandedCity === city ? null : city);
    },
    [expandedCity]
  );

  const [isCityDialogOpen, setIsCityDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active && active.data.current) {
      const person = active.data.current.person as Person;
      const city = over.id as string;

      if (!assignments[city].find((p) => p.id === person.id)) {
        setAssignments({
          ...assignments,
          [city]: [...assignments[city], person],
        });
        setPeople(people.filter((p) => p.id !== person.id));
      }
    }
  };

  const handleRemovePerson = useCallback((city: string, personId: string) => {
    setAssignments((prevAssignments) => {
      const updatedAssignments = {
        ...prevAssignments,
        [city]: prevAssignments[city].filter((p) => p.id !== personId),
      };
      const removedPerson = prevAssignments[city].find(
        (p) => p.id === personId
      );
      if (removedPerson) {
        setPeople((prevPeople) => [...prevPeople, removedPerson]);
      }
      return updatedAssignments;
    });
  }, []);

  const filteredPeople = expandedCity
    ? people.filter(
        (person) =>
          person.preferredCity.some((city) => city.name === expandedCity) ||
          person.preferredCity.length === 0
      )
    : people;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-2/3  bg-white m-8 rounded-md p-4 ">
        <div className="flex justify-between items-center my-4">
          <h1 className="text-3xl">Create User by City</h1>
          <button
            onClick={() => setIsCityDialogOpen(true)}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Add City
          </button>
        </div>

        {cities.map((city) => (
          <CitySection
            key={city.name}
            city={city.name}
            people={assignments[city.name]}
            expandedCity={expandedCity}
            onExpandCity={handleExpandCity}
            onRemovePerson={handleRemovePerson}
          />
        ))}

        <JsonDisplay assignments={assignments} />
      </div>
      <div className="w-1/3 min-h-screen bg-white  mx-auto p-4  ">
        <h1 className=" text-3xl mt-6">User List</h1>
        <div className="flex justify-center gap-4 p-4">
          <button
            onClick={() => setIsRoleDialogOpen(true)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add Role
          </button>
          <button
            onClick={() => setIsUserDialogOpen(true)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Add User
          </button>
        </div>
        {filteredPeople.map((person) => (
          <DraggableItem key={person.id} id={person.id} person={person} />
        ))}
      </div>

      <CityDialog
        open={isCityDialogOpen}
        onOpenChange={setIsCityDialogOpen}
        cities={cities}
        setCities={setCities}
        setAssignments={setAssignments}
      />
      <RoleDialog
        open={isRoleDialogOpen}
        onOpenChange={setIsRoleDialogOpen}
        roles={roles}
        setRoles={setRoles}
      />
      <UserDialog
        open={isUserDialogOpen}
        onOpenChange={setIsUserDialogOpen}
        roles={roles}
        cities={cities}
        setUsers={setPeople}
      />
    </DndContext>
  );
};

export default CityAssignment;
