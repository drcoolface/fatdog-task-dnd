import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Person } from "@/types/types";

type DroppableAreaProps = {
  id: string;
};

type DraggableItemProps = {
  id: string;
  person: Person;
};

export const DroppableArea: React.FC<DroppableAreaProps> = ({ id }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[100px] p-2 bg-gray-200 rounded mt-2 border-dashed border-2 border-gray-400 font-extralight flex items-center justify-center"
    >
      Drag and drop users here.
    </div>
  );
};

export const DraggableItem: React.FC<DraggableItemProps> = ({ id, person }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { person },
  });

  const isDragging = transform !== null;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition: isDragging ? "none" : "transform 200ms ease",
        opacity: isDragging ? 0.7 : 1,
        cursor: isDragging ? "grabbing" : "pointer",
        zIndex: isDragging ? 1000 : 0,
      }}
      className={`p-2 border rounded mb-2 flex gap-2 ${
        isDragging
          ? "bg-blue-300 border-blue-600"
          : "bg-blue-100 border-blue-500"
      }`}
    >
      <button {...listeners} className="cursor-grab p-1">
        <img src="/public/grip.svg" alt="drag" height={20} width={20} />
      </button>
      <div>
        {person.name}
        <br />
        &#128188; {person.role}
      </div>
    </div>
  );
};
