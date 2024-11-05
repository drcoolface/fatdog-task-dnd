import React from "react";
import { DroppableArea } from "./DnD";
import { Person } from "@/types/types";

interface CitySectionProps {
  city: string;
  people: Person[];
  expandedCity: string | null;
  onExpandCity: (city: string) => void;
  onRemovePerson: (city: string, personId: string) => void;
}

const CitySection: React.FC<CitySectionProps> = ({
  city,
  people,
  expandedCity,
  onExpandCity,
  onRemovePerson,
}) => {
  return (
    <div className="border-2 p-2 rounded border-cyan-600 my-2">
      <button
        onClick={() => onExpandCity(city)}
        className="font-bold w-full transition-all"
      >
        <div className=" w-full flex justify-between">
          <span>
            <strong>City: </strong>
            {city}
          </span>
          <div> &#128119; {people.length} Users</div>
        </div>
      </button>
      <div
        className={`transition-all duration-500 ease-in overflow-hidden ${
          expandedCity === city ? "max-h-screen" : "max-h-0"
        }`}
      >
        {expandedCity === city && (
          <>
            {people.map((person) => (
              <div
                key={person.id}
                className="p-2 bg-white border rounded my-2 flex justify-between"
              >
                <div>
                  <h1>{person.name}</h1>
                  <h1> &#128188; {person.role}</h1>
                </div>
                <button
                  onClick={() => onRemovePerson(city, person.id)}
                  className="mt-2 p-1 text-white border rounded"
                >
                  <img
                    src="/public/trash.svg"
                    alt="remove"
                    height={20}
                    width={20}
                  />
                </button>
              </div>
            ))}
            <DroppableArea id={city} />
          </>
        )}
      </div>
    </div>
  );
};

export default CitySection;
