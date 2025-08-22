import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import { SortOption, SortField } from "../lib/types";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  X,
  GripVertical,
  User,
  Calendar,
  Hash,
  ArrowUpAZ,
  ArrowDownZA,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface SortPanelProps {
  sortOptions: SortOption[];
  setSortOptions: React.Dispatch<React.SetStateAction<SortOption[]>>;
  onApply: () => void;
  onClear: () => void;
}

/** Field meta to control labels & icons */
const FIELD_META: Record<
  SortField,
  {
    label: string;
    icon: React.ReactNode;
    // Left and right chips + which direction they map to
    left: { text: string; direction: "asc" | "desc"; icon?: React.ReactNode };
    right: { text: string; direction: "asc" | "desc"; icon?: React.ReactNode };
  }
> = {
  name: {
    label: "Client Name",
    icon: <User className="w-4 h-4 text-gray-500" />,
    left: { text: "A–Z", direction: "asc", icon: <ArrowUpAZ className="w-3.5 h-3.5" /> },
    right: { text: "Z–A", direction: "desc", icon: <ArrowDownZA className="w-3.5 h-3.5" /> },
  },
  createdAt: {
    label: "Created At",
    icon: <Calendar className="w-4 h-4 text-gray-500" />,
    // For dates, "Newest to Oldest" = desc
    left: { text: "Newest to Oldest", direction: "desc", icon: <ArrowUp className="w-3.5 h-3.5" /> },
    right: { text: "Oldest to Newest", direction: "asc", icon: <ArrowDown className="w-3.5 h-3.5" /> },
  },
  updatedAt: {
    label: "Updated At",
    icon: <Calendar className="w-4 h-4 text-gray-500" />,
    left: { text: "Newest to Oldest", direction: "desc", icon: <ArrowUp className="w-3.5 h-3.5" /> },
    right: { text: "Oldest to Newest", direction: "asc", icon: <ArrowDown className="w-3.5 h-3.5" /> },
  },
  id: {
    label: "Client ID",
    icon: <Hash className="w-4 h-4 text-gray-500" />,
    left: { text: "A–Z", direction: "asc", icon: <ArrowUpAZ className="w-3.5 h-3.5" /> },
    right: { text: "Z–A", direction: "desc", icon: <ArrowDownZA className="w-3.5 h-3.5" /> },
  },
};

/** Small chip-like button used for the options */
function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "text-sm px-3 py-1.5 rounded-md border transition-colors",
        active
          ? "bg-blue-100 text-blue-700 border-blue-200"
          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/** Draggable row for ACTIVE sort criteria */
function ActiveRow({
  option,
  onSetDirection,
  onRemove,
}: {
  option: SortOption;
  onSetDirection: (id: string, dir: "asc" | "desc") => void;
  onRemove: (id: string) => void;
}) {
  const meta = FIELD_META[option.field];
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: option.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between rounded-lg border bg-white px-3 py-2"
    >
      <div className="flex items-center gap-2">
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-400 hover:text-gray-600"
          title="Drag to change priority"
        >
          <GripVertical className="w-4 h-4" />
        </span>
        {meta.icon}
        <span className="font-medium">{meta.label}</span>
      </div>

      <div className="flex items-center gap-2">
        <Chip
          active={option.direction === meta.left.direction}
          onClick={() => onSetDirection(option.id, meta.left.direction)}
        >
          <span className="inline-flex items-center gap-1">
            {meta.left.icon}
            {meta.left.text}
          </span>
        </Chip>

        <Chip
          active={option.direction === meta.right.direction}
          onClick={() => onSetDirection(option.id, meta.right.direction)}
        >
          <span className="inline-flex items-center gap-1">
            {meta.right.icon}
            {meta.right.text}
          </span>
        </Chip>

        <button
          onClick={() => onRemove(option.id)}
          className="ml-1 text-gray-400 hover:text-gray-600"
          aria-label={`Remove ${meta.label}`}
          title="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/** Static row for INACTIVE fields (clicking a chip adds it) */
function InactiveRow({
  field,
  onAdd,
}: {
  field: SortField;
  onAdd: (field: SortField, dir: "asc" | "desc") => void;
}) {
  const meta = FIELD_META[field];
  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-500">
      <div className="flex items-center gap-2">
        {/* no drag handle for inactive rows */}
        <span className="w-4 h-4" />
        {meta.icon}
        <span>{meta.label}</span>
      </div>
      <div className="flex items-center gap-2">
        <Chip onClick={() => onAdd(field, meta.left.direction)}>
          <span className="inline-flex items-center gap-1 opacity-80">
            {meta.left.icon}
            {meta.left.text}
          </span>
        </Chip>
        <Chip onClick={() => onAdd(field, meta.right.direction)}>
          <span className="inline-flex items-center gap-1 opacity-80">
            {meta.right.icon}
            {meta.right.text}
          </span>
        </Chip>
      </div>
    </div>
  );
}

const SortPanel: React.FC<SortPanelProps> = ({
  sortOptions,
  setSortOptions,
  onApply,
  onClear,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  // Reorder active options
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortOptions.findIndex((s) => s.id === active.id);
    const newIndex = sortOptions.findIndex((s) => s.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      setSortOptions((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const setDirection = (id: string, dir: "asc" | "desc") => {
    setSortOptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, direction: dir } : s))
    );
  };

  const removeOption = (id: string) => {
    setSortOptions((prev) => prev.filter((s) => s.id !== id));
  };

  const addOption = (field: SortField, direction: "asc" | "desc") => {
    setSortOptions((prev) => {
      // if already active, just update direction
      const exists = prev.find((s) => s.field === field);
      if (exists) {
        return prev.map((s) =>
          s.field === field ? { ...s, direction } : s
        );
      }
      return [...prev, { id: uuidv4(), field, direction }];
    });
  };

  const allFields: SortField[] = ["name", "createdAt", "updatedAt", "id"];
  const activeFields = new Set(sortOptions.map((s) => s.field));
  const inactiveFields = allFields.filter((f) => !activeFields.has(f));

  return (
    <Card className="w-[440px] p-4 shadow-xl rounded-2xl">
      <h3 className="text-lg font-semibold mb-4">Sort By</h3>

      {/* Active (draggable) */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortOptions.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sortOptions.map((opt) => (
              <ActiveRow
                key={opt.id}
                option={opt}
                onSetDirection={setDirection}
                onRemove={removeOption}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Divider */}
      <div className="my-3 h-px bg-gray-100" />

      {/* Inactive (non-draggable) */}
      <div className="space-y-2">
        {inactiveFields.map((field) => (
          <InactiveRow key={field} field={field} onAdd={addOption} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={onClear}
          className="text-sm text-gray-500 hover:underline"
        >
          Clear all
        </button>
        <Button onClick={onApply} className="px-4">
          Apply Sort
        </Button>
      </div>
    </Card>
  );
};

export default SortPanel;
