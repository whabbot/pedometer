import React, { useCallback, useState } from "react";
import type { AlignedData, Options } from "uplot";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import "./App.css";
import { filterData } from "./filterData";

interface DataPoint {
  index: number;
  x: number;
  y: number;
  z: number;
}

function App() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  const parseFileContent = useCallback((content: string): DataPoint[] => {
    try {
      filterData(content).then((data) => {
        console.log("filteredData", data);
        return data;
      });

      // Split by semicolon to get individual data points
      const points = content.trim().split(";");

      const dataPoints = points.map((point, index) => {
        const [x, y, z] = point.split(",").map(Number);
        return { index, x, y, z };
      });

      console.log("dataPoints", dataPoints);

      return dataPoints;
    } catch (err) {
      console.error("Error parsing file:", err);
      setError(
        "Error parsing file. Please ensure the format is: x1,y1,z1;x2,y2,z2;..."
      );
      return [];
    }
  }, []);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsedData = parseFileContent(content);
          setData(parsedData);
          setError(null);
        } catch (err) {
          setError("Failed to process the file. Please check the format.");
          console.error("File processing error:", err);
        }
      };

      reader.onerror = () => {
        setError("Error reading file");
      };

      reader.readAsText(file);
    },
    [parseFileContent]
  );

  // Create a ref for the chart container
  const chartRef = React.useRef<HTMLDivElement>(null);
  const [chart, setChart] = React.useState<uPlot | null>(null);

  // Update chart when data changes
  React.useEffect(() => {
    if (data.length === 0 || !chartRef.current) return;

    // Prepare data for uPlot
    const xData = data.map((d) => d.index);
    const xSeries = data.map((d) => d.x);
    const ySeries = data.map((d) => d.y);
    const zSeries = data.map((d) => d.z);

    const chartData: AlignedData = [xData, xSeries, ySeries, zSeries];

    const options: Options = {
      width: chartRef.current.offsetWidth,
      height: 500,
      scales: {
        x: {
          time: false,
        },
      },
      series: [
        {},
        {
          label: "X Series",
          stroke: "#8884d8",
          width: 1,
        },
        {
          label: "Y Series",
          stroke: "#82ca9d",
          width: 1,
        },
        {
          label: "Z Series",
          stroke: "#ff7300",
          width: 1,
        },
      ],
      axes: [
        {
          label: "Data Point Index",
          grid: { show: true },
        },
        {
          label: "Value",
          grid: { show: true },
        },
      ],
      legend: {
        show: true,
      },
    };

    // Destroy previous chart if it exists
    if (chart) {
      chart.destroy();
    }

    // Create new chart
    const newChart = new uPlot(options, chartData, chartRef.current);
    setChart(newChart);

    // Cleanup function
    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Handle window resize
  React.useEffect(() => {
    const currentChart = chart;
    if (!currentChart) return;

    const handleResize = () => {
      if (chartRef.current) {
        currentChart.setSize({
          width: chartRef.current.offsetWidth,
          height: 500,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chart]);

  return (
    <div
      className="app"
      style={{ flex: 1, display: "flex", flexDirection: "column" }}
    >
      <h1 style={{ margin: "0 0 1rem 0" }}>3D Data Visualizer</h1>
      <div className="upload-container">
        <input
          type="file"
          accept=".txt,.csv"
          onChange={handleFileUpload}
          className="file-input"
        />
        <p className="file-format">
          Expected format: x1,y1,z1;x2,y2,z2;x3,y3,z3;...
        </p>
      </div>

      {error && <div className="error">{error}</div>}

      {data.length > 0 && (
        <div className="chart-container">
          <h2>Data Visualization</h2>
          <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
        </div>
      )}
    </div>
  );
}

export default App;
