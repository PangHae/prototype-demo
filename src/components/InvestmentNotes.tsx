import React, {
  useState,
} from "react";

interface Note {
  id: string;
  type:
    | "매수"
    | "매도"
    | "홀딩";
  date: string;
  content: string;
  tags: string[];
}

interface InvestmentNotesProps {
  notes: Note[];
  isModalOpen: boolean;
  onCloseModal: () => void;
  onAddNote: (note: {
    type:
      | "매수"
      | "매도"
      | "홀딩";
    content: string;
    tags: string[];
  }) => void;
}

const InvestmentNotes: React.FC<
  InvestmentNotesProps
> = ({
  notes,
  isModalOpen,
  onCloseModal,
  onAddNote,
}) => {
  const [
    newNote,
    setNewNote,
  ] = useState<{
    type:
      | "매수"
      | "매도"
      | "홀딩";
    content: string;
    tags: string[];
  }>({
    type: "매수",
    content: "",
    tags: [],
  });

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (
      newNote.content.trim()
    ) {
      onAddNote(newNote);
      setNewNote({
        type: "매수",
        content: "",
        tags: [],
      });
    }
  };

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

      {/* Note Writing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <h3 className="text-xl font-bold mb-4">
              투자 메모 작성
            </h3>
            <form
              onSubmit={
                handleSubmit
              }
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  투자 유형
                </label>
                <select
                  value={
                    newNote.type
                  }
                  onChange={(
                    e
                  ) =>
                    setNewNote(
                      (
                        prev
                      ) => ({
                        ...prev,
                        type: e
                          .target
                          .value as
                          | "매수"
                          | "매도"
                          | "홀딩",
                      })
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="매수">
                    매수
                  </option>
                  <option value="매도">
                    매도
                  </option>
                  <option value="홀딩">
                    홀딩
                  </option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  메모 내용
                </label>
                <textarea
                  value={
                    newNote.content
                  }
                  onChange={(
                    e
                  ) =>
                    setNewNote(
                      (
                        prev
                      ) => ({
                        ...prev,
                        content:
                          e
                            .target
                            .value,
                      })
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary h-32"
                  placeholder="투자 판단 근거나 특이사항을 작성해주세요."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  태그 (쉼표로
                  구분)
                </label>
                <input
                  type="text"
                  value={newNote.tags.join(
                    ", "
                  )}
                  onChange={(
                    e
                  ) =>
                    setNewNote(
                      (
                        prev
                      ) => ({
                        ...prev,
                        tags: e.target.value
                          .split(
                            ","
                          )
                          .map(
                            (
                              tag
                            ) =>
                              tag.trim()
                          ),
                      })
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="예: 실적 호조, 배당, 성장성"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={
                    onCloseModal
                  }
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                  onClick={
                    onCloseModal
                  }
                >
                  작성하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentNotes;
