import React from "react";

interface CompanyHeaderProps {
  name: string;
  code: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onAddNote: () => void;
}

const CompanyHeader: React.FC<
  CompanyHeaderProps
> = ({
  name,
  code,
  sector,
  price,
  change,
  changePercent,
  isFavorite,
  onFavoriteToggle,
  onAddNote,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">
              {code}
            </span>
            <span className="text-sm text-gray-500">
              •
            </span>
            <span className="text-sm text-gray-500">
              {sector}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={
              onFavoriteToggle
            }
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? "bg-yellow-100 text-yellow-500"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <i
              className={`ri-star-${
                isFavorite
                  ? "fill"
                  : "line"
              } text-xl`}
            ></i>
          </button>
          <button
            onClick={
              onAddNote
            }
            className="p-2 rounded-full bg-primary text-white transition-colors hover:bg-primary/90 flex items-center gap-1"
          >
            <i className="ri-add-line text-xl"></i>
            <span className="text-xs">
              새 메모 작성
            </span>
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-gray-900">
          {price.toLocaleString()}
          원
        </div>
        <div
          className={`text-sm ${
            change >= 0
              ? "text-red-500"
              : "text-blue-500"
          }`}
        >
          {change >= 0
            ? "+"
            : ""}
          {change.toLocaleString()}
          원 ({changePercent}
          %)
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;
