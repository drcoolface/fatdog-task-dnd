import { Dialog, DialogOverlay, DialogContent } from "../ui/dialog";
import { City, Role, Person, Assignments } from "@/types/types";
import React, { useState } from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CityDialogProps extends DialogProps {
  cities: City[];
  setCities: React.Dispatch<React.SetStateAction<City[]>>;
  setAssignments: React.Dispatch<React.SetStateAction<Assignments>>;
}
interface RoleDialogProps extends DialogProps {
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
}
interface UserDialogProps extends DialogProps {
  roles: Role[];
  cities: City[];
  setUsers: React.Dispatch<React.SetStateAction<Person[]>>;
}
export const CityDialog: React.FC<CityDialogProps> = ({
  open,
  onOpenChange,
  cities,
  setAssignments,
  setCities,
}) => {
  const [newCityName, setNewCityName] = useState("");

  const handleAddCity = () => {
    if (newCityName.trim() !== "") {
      const newCity: City = {
        id: cities.length + 1,
        name: newCityName.trim(),
      };
      setCities([...cities, newCity]);
      setAssignments((prevAssignments) => ({
        ...prevAssignments,
        [newCity.name]: [],
      }));
      onOpenChange(false);

      setNewCityName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" />
      <DialogContent className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New City</h2>
        <input
          type="text"
          value={newCityName}
          onChange={(e) => setNewCityName(e.target.value)}
          className="border rounded p-2 w-full mb-4"
          placeholder="City Name"
        />
        <button
          onClick={handleAddCity}
          className="p-2 bg-green-500 text-white rounded w-full hover:bg-green-600 transition"
        >
          Add City
        </button>
      </DialogContent>
    </Dialog>
  );
};

export const RoleDialog: React.FC<RoleDialogProps> = ({
  open,
  onOpenChange,
  roles,
  setRoles,
}) => {
  const [newRoleName, setNewRoleName] = useState("");

  const handleAddRole = () => {
    if (newRoleName.trim()) {
      const newRole: Role = newRoleName;
      setRoles([...roles, newRole]);
      setNewRoleName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" />
      <DialogContent className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Role</h2>
        <input
          type="text"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          className="border rounded p-2 w-full mb-4"
          placeholder="Role Name"
        />
        <button
          onClick={handleAddRole}
          className="p-2 bg-green-500 text-white rounded w-full"
        >
          Add Role
        </button>
      </DialogContent>
    </Dialog>
  );
};

export const UserDialog: React.FC<UserDialogProps> = ({
  open,
  onOpenChange,
  roles,
  cities,
  setUsers,
}) => {
  const [newUserName, setNewUserName] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null | undefined>(
    undefined
  );
  const [selectedCities, setSelectedCities] = useState<number[]>([]);

  const handleCreateUser = () => {
    if (newUserName.trim() && selectedRole) {
      const newUser: Person = {
        id: Date.now().toString(),
        name: newUserName,
        role: selectedRole,
        preferredCity: cities.filter((city) =>
          selectedCities.includes(city.id)
        ),
      };
      setUsers((previousUsers) => [...previousUsers, newUser]);
      setNewUserName("");
      setSelectedRole(null);
      setSelectedCities([]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" />
      <DialogContent className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          className="border rounded p-2 w-full mb-4"
          placeholder="User Name"
        />
        <select
          value={selectedRole || ""}
          onChange={(e) => setSelectedRole(e.target.value as Role)}
          className="border rounded p-2 w-full mb-4"
        >
          <option value="" disabled>
            Select Role
          </option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <div className="mb-4">
          {cities.map((city) => (
            <label key={city.id} className="block">
              <input
                type="checkbox"
                checked={selectedCities.includes(city.id)}
                onChange={(e) =>
                  setSelectedCities((prev) =>
                    e.target.checked
                      ? [...prev, city.id]
                      : prev.filter((id) => id !== city.id)
                  )
                }
                className="mr-2"
              />
              {city.name}
            </label>
          ))}
        </div>
        <button
          onClick={handleCreateUser}
          className="p-2 bg-green-500 text-white rounded w-full"
        >
          Add User
        </button>
      </DialogContent>
    </Dialog>
  );
};
