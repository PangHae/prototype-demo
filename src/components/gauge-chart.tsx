"use client";

import {
  useEffect,
  useRef,
} from "react";
import * as echarts from "echarts";
import type { ChartData } from "../types";

interface GaugeChartProps {
  id: string;
  min: number;
  max: number;
  data: ChartData;
  colors: string[][];
  unit: string;
}

export default function GaugeChart({
  id,
  min,
  max,
  data,
  colors,
  unit,
}: GaugeChartProps) {
  const chartRef =
    useRef<HTMLDivElement>(
      null
    );

  useEffect(() => {
    if (!chartRef.current)
      return;

    const chart =
      echarts.init(
        chartRef.current
      );

    const option = {
      animation: false,
      series: [
        {
          type: "gauge",
          startAngle: 180,
          endAngle: 0,
          min,
          max,
          radius: "100%",
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
              color: colors,
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
            offsetCenter: [
              0,
              "0%",
            ],
            formatter: `{value}${unit}`,
            color: "#1f2937",
          },
          data: [data],
        },
      ],
    };

    chart.setOption(option);

    const handleResize =
      () => {
        chart.resize();
      };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      chart.dispose();
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    id,
    min,
    max,
    data,
    colors,
    unit,
  ]);

  return (
    <div
      ref={chartRef}
      className="gauge-chart"
    />
  );
}
