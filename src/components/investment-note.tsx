"use client";

import type { InvestmentNote } from "../types";

interface InvestmentNoteProps {
  note: InvestmentNote;
  onEdit: (
    id: string
  ) => void;
  onDelete: (
    id: string
  ) => void;
}

export default function InvestmentNoteCard({
  note,
  onEdit,
  onDelete,
}: InvestmentNoteProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 ${note.typeBg} ${note.typeColor} rounded-full text-xs`}
          >
            {note.type}
          </span>
          <span className="text-sm text-gray-500">
            {note.date}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              onEdit(note.id)
            }
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <i className="ri-edit-line text-gray-600"></i>
          </button>
          <button
            onClick={() =>
              onDelete(
                note.id
              )
            }
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <i className="ri-delete-bin-line text-gray-600"></i>
          </button>
        </div>
      </div>
      <p className="text-gray-700">
        {note.content}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {note.tags.map(
          (tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </div>
  );
}
