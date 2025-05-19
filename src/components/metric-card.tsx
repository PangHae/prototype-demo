import GaugeChart from "./gauge-chart";
import type { FinancialMetric } from "../types";

interface MetricCardProps {
  metric: FinancialMetric;
  chartColors: string[][];
}

export default function MetricCard({
  metric,
  chartColors,
}: MetricCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 flex items-center justify-center ${metric.iconBg} rounded-full`}
          >
            <i
              className={`${metric.icon} ${metric.iconColor}`}
            ></i>
          </div>
          <h4 className="font-medium">
            {metric.title}{" "}
            <i
              className={`${metric.icon} ${metric.iconColor} ml-1`}
            ></i>
          </h4>
        </div>
        <span
          className={`text-sm px-2 py-0.5 ${metric.statusBg} ${metric.statusColor} rounded-full`}
        >
          {metric.status}
        </span>
      </div>

      <GaugeChart
        id={metric.chartId}
        min={metric.chartMin}
        max={metric.chartMax}
        data={{
          value:
            metric.chartValue,
          name: metric.title,
        }}
        colors={chartColors}
        unit={
          metric.chartUnit
        }
      />

      <div className="mt-2">
        <div className="flex justify-between text-sm">
          <span>
            {
              metric.currentValue
            }
          </span>
          <span className="text-gray-500">
            {
              metric.industryAvg
            }
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {metric.description}
        </p>
      </div>
    </div>
  );
}
