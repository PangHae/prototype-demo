import React from "react";

interface FeedbackProps {
  feedback: string[];
  overall: string;
}

const Feedback: React.FC<
  FeedbackProps
> = ({
  feedback,
  overall,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
          <i className="ri-user-voice-line text-primary"></i>
        </div>
        <h3 className="text-lg sm:text-xl font-bold">
          트레이너 피드백
        </h3>
      </div>

      <div className="bg-gray-50 rounded-lg p-5">
        {feedback.map(
          (
            paragraph,
            index
          ) => (
            <p
              key={index}
              className="text-gray-700 leading-relaxed"
            >
              {paragraph
                .split(" ")
                .map(
                  (
                    word,
                    wordIndex
                  ) => {
                    if (
                      word.startsWith(
                        "**"
                      )
                    ) {
                      return (
                        <span
                          key={
                            wordIndex
                          }
                          className="font-semibold text-primary"
                        >
                          {word.replace(
                            /\*\*/g,
                            ""
                          )}{" "}
                        </span>
                      );
                    }
                    return (
                      <span
                        key={
                          wordIndex
                        }
                      >
                        {word}{" "}
                      </span>
                    );
                  }
                )}
            </p>
          )
        )}
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-blue-800 font-medium">
            종합 평가:{" "}
            {overall}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            이 피드백이 도움이
            되었나요?
          </span>
          <button className="!rounded-button px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm flex items-center gap-1 whitespace-nowrap">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-thumb-up-line"></i>
            </div>
            유용해요
          </button>
        </div>
        <button className="!rounded-button px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm flex items-center gap-1 whitespace-nowrap">
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-share-line"></i>
          </div>
          공유하기
        </button>
      </div>
    </div>
  );
};

export default Feedback;
