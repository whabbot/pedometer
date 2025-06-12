import React, { useEffect, useRef } from 'react';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';

export interface LineChartProps {
  data: {
    x: number[];
    series: {
      values: number[];
      label: string;
      color: string;
    }[];
  };
  title?: string;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  height = 500,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<uPlot | null>(null);

  // Initialize and update chart
  useEffect(() => {
    // Prepare the series configuration
    const series = [
      {},
      ...data.series.map((s) => ({
        label: s.label,
        stroke: s.color,
        width: 1,
      })),
    ];

    // Prepare the chart options
    const options: uPlot.Options = {
      width: chartRef.current?.offsetWidth || 800,
      height,
      scales: {
        x: { time: false },
      },
      series,
      axes: [
        {
          label: 'Index',
          grid: { show: true },
        },
        {
          label: 'Value',
          grid: { show: true },
        },
      ],
      legend: {
        show: true,
      },
    };
    if (!chartRef.current) return;

    // Prepare data for uPlot
    const chartData: uPlot.AlignedData = [
      data.x,
      ...data.series.map((s) => s.values),
    ];

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    chartInstance.current = new uPlot(options, chartData, chartRef.current);

    // Handle window resize
    const handleResize = () => {
      if (chartInstance.current && chartRef.current) {
        chartInstance.current.setSize({
          width: chartRef.current.offsetWidth,
          height,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data, height]);

  return (
    <div className="chart-container">
      {title && <h2>{title}</h2>}
      <div ref={chartRef} style={{ width: '100%', height: `${height}px` }} />
    </div>
  );
};

export default LineChart;
