import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
          <i className="ri-bar-chart-grouped-line text-4xl text-primary"></i>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-gray-900">
          재무헬스장에 오신
          것을 환영합니다!
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-4">
          기업의 재무 건강을
          한눈에, 쉽고
          재미있게 분석하세요.
          <br />
          <span className="text-primary font-semibold">
            ZaeMuGym
          </span>
          에서 기업의 재무
          체질을
          트레이닝하세요.
        </p>
      </div>
      <div className="mt-8 text-gray-400 text-sm">
        <span className="inline-flex items-center gap-1">
          <i className="ri-dumbbell-line text-lg"></i>
          재무 체력도 키우고,
          투자 실력도
          키우세요!
        </span>
      </div>
    </div>
  );
};

export default Home;
