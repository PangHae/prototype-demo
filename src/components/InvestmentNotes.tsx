import React from "react";

interface Note {
  id: string;
  type:
    | "매수"
    | "홀딩"
    | "매도";
  date: string;
  content: string;
  tags: string[];
}

interface InvestmentNotesProps {
  notes: Note[];
}

const InvestmentNotes: React.FC<
  InvestmentNotesProps
> = ({ notes }) => {
  const getTypeColor = (
    type: string
  ) => {
    switch (type) {
      case "매수":
        return "blue";
      case "홀딩":
        return "green";
      case "매도":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
            <i className="ri-sticky-note-line text-primary"></i>
          </div>
          <h3 className="text-lg sm:text-xl font-bold">
            내 투자 메모
          </h3>
        </div>
        <button className="!rounded-button bg-primary text-white px-4 py-2 flex items-center gap-2 hover:bg-primary/90 whitespace-nowrap">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-add-line text-white"></i>
          </div>
          새 메모 작성
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 bg-${getTypeColor(
                    note.type
                  )}-100 text-${getTypeColor(
                    note.type
                  )}-800 rounded-full text-xs`}
                >
                  {note.type}
                </span>
                <span className="text-sm text-gray-500">
                  {note.date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                  <i className="ri-edit-line text-gray-600"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                  <i className="ri-delete-bin-line text-gray-600"></i>
                </button>
              </div>
            </div>
            <p className="text-gray-700">
              {note.content}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {note.tags.map(
                (
                  tag,
                  index
                ) => (
                  <span
                    key={
                      index
                    }
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentNotes;
