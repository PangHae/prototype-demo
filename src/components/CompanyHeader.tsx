import React from "react";

interface CompanyHeaderProps {
  name: string;
  code: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
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
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3 sm:gap-0">
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-2xl font-bold">
            {name} ({code})
          </h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {sector}
          </span>
        </div>
        <div className="flex items-center mt-2 space-x-4">
          <p className="text-xl font-semibold">
            ₩
            {price.toLocaleString()}
          </p>
          <p
            className={`$ {
              change >= 0 ? "text-green-600" : "text-red-600"
            } font-medium flex items-center`}
          >
            <span className="w-4 h-4 flex items-center justify-center mr-1">
              <i
                className={`ri-arrow-${
                  change >= 0
                    ? "up"
                    : "down"
                }-line`}
              ></i>
            </span>
            {Math.abs(
              change
            ).toLocaleString()}{" "}
            (
            {changePercent >=
            0
              ? "+"
              : ""}
            {changePercent}%)
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto sm:ml-6">
        <button className="w-full sm:w-auto !rounded-button bg-white border border-gray-200 px-6 py-3 flex items-center gap-2 hover:bg-gray-50 whitespace-nowrap text-base sm:text-lg font-medium transition">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-star-line text-gray-600"></i>
          </div>
          관심기업 추가
        </button>
        <button className="w-full sm:w-auto !rounded-button bg-primary text-white px-6 py-3 flex items-center gap-2 hover:bg-primary/90 whitespace-nowrap text-base sm:text-lg font-medium transition">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-add-line text-white"></i>
          </div>
          <span>
            투자 메모 작성
          </span>
        </button>
      </div>
    </div>
  );
};

export default CompanyHeader;
