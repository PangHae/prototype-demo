import React, {
  useEffect,
  useRef,
} from "react";
import * as echarts from "echarts";

export interface HealthMetric {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
  status: string;
  statusColor: string;
  current: number;
  average: number;
  unit: string;
  description: string;
  chartColors: [
    number,
    string
  ][];
  max: number;
}

interface HealthProfileProps {
  metrics: HealthMetric[];
  lastUpdated: string;
}

const HealthProfile: React.FC<
  HealthProfileProps
> = ({
  metrics,
  lastUpdated,
}) => {
  const chartRefs = useRef<{
    [
      key: string
    ]: echarts.ECharts | null;
  }>({});

  useEffect(() => {
    console.log(metrics);
    metrics.forEach(
      (metric) => {
        const chartDom =
          document.getElementById(
            metric.id
          );
        if (chartDom) {
          const chart =
            echarts.init(
              chartDom
            );
          chartRefs.current[
            metric.id
          ] = chart;

          const option = {
            animation: false,
            series: [
              {
                type: "gauge",
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: metric.max,
                radius:
                  "100%",
                center: [
                  "50%",
                  "80%",
                ],
                progress: {
                  show: true,
                  width: 18,
                },
                pointer: {
                  show: false,
                },
                axisLine: {
                  lineStyle: {
                    width: 18,
                    color:
                      metric.chartColors,
                  },
                },
                axisTick: {
                  show: false,
                },
                splitLine: {
                  show: false,
                },
                axisLabel: {
                  show: false,
                },
                title: {
                  show: false,
                },
                detail: {
                  valueAnimation:
                    true,
                  fontSize: 20,
                  offsetCenter:
                    [0, "0%"],
                  formatter: `{value}${metric.unit}`,
                  color:
                    "#1f2937",
                },
                data: [
                  {
                    value:
                      metric.current,
                    name: metric.title,
                  },
                ],
              },
            ],
          };

          chart.setOption(
            option
          );
        }
      }
    );

    const handleResize =
      () => {
        Object.values(
          chartRefs.current
        ).forEach((chart) => {
          chart?.resize();
        });
      };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
      Object.values(
        chartRefs.current
      ).forEach((chart) => {
        chart?.dispose();
      });
    };
  }, [metrics]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg sm:text-xl font-bold">
          재무 헬스 프로필
        </h3>
        <div className="flex items-center gap-2 hidden sm:flex">
          <span className="text-sm text-gray-500">
            최근 업데이트:{" "}
            {lastUpdated}
          </span>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
            <i className="ri-refresh-line text-gray-600"></i>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(
          (metric) => (
            <div
              key={metric.id}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center bg-${metric.iconColor}-100 rounded-full`}
                  >
                    <i
                      className={`${metric.icon} text-${metric.iconColor}-600`}
                    ></i>
                  </div>
                  <h4 className="font-medium">
                    {
                      metric.title
                    }
                    <i
                      className={`${metric.icon} text-${metric.iconColor}-600 ml-1`}
                    ></i>
                  </h4>
                </div>
                <span
                  className={`text-sm px-2 py-0.5 bg-${metric.statusColor}-100 text-${metric.statusColor}-800 rounded-full`}
                >
                  {
                    metric.status
                  }
                </span>
              </div>
              <div
                className="gauge-chart"
                id={metric.id}
              ></div>
              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span>
                    현재:{" "}
                    {
                      metric.current
                    }
                    {
                      metric.unit
                    }
                  </span>
                  <span className="text-gray-500">
                    업계 평균:{" "}
                    {
                      metric.average
                    }
                    {
                      metric.unit
                    }
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {
                    metric.description
                  }
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HealthProfile;
