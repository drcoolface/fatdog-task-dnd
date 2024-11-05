// JsonDisplay.tsx
import { Assignments } from "@/types/types";
import { useState } from "react";

interface JsonDisplayProps {
  assignments: Assignments;
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ assignments }) => {
  const [json, setJson] = useState<string>("");
  const handleCreateUserByCity = () => {
    setJson(JSON.stringify(assignments, null, 2));
  };
  const handleCopy = () => {
    if (json) {
      navigator.clipboard
        .writeText(json)
        .then(() => {
          alert("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };
  return (
    <div className="mt-4">
      <button
        onClick={handleCreateUserByCity}
        className="my-2 p-2 bg-green-500 text-white rounded "
      >
        Create User by City
      </button>
      {json && (
        <pre className="bg-gray-100 p-4 rounded-lg relative flex flex-col">
          {json}
          <button
            onClick={handleCopy}
            className="mt-2 self-end p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Copy
          </button>
        </pre>
      )}
    </div>
  );
};

export default JsonDisplay;
