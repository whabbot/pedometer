import React, { useCallback, useState, useMemo } from "react";
import "./App.css";
import { filterData } from "./filterData";
import { LineChart } from "./components/LineChart";

interface DataPoint {
  index: number;
  x: number;
  y: number;
  z: number;
}

function App() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [filteredData, setFilteredData] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const parseFileContent = useCallback((content: string): DataPoint[] => {
    try {
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

      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const parsedData = parseFileContent(content);
          const filteredData = await filterData(content);
          setData(parsedData);
          setFilteredData(filteredData);
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

  // Prepare chart data for the LineChart component
  const chartData = useMemo(() => {
    if (data.length === 0) return null;

    return {
      x: data.map((d) => d.index),
      series: [
        { values: data.map((d) => d.x), label: "X Axis", color: "#8884d8" },
        { values: data.map((d) => d.y), label: "Y Axis", color: "#82ca9d" },
        { values: data.map((d) => d.z), label: "Z Axis", color: "#ff7300" },
      ],
    };
  }, [data]);

  const filteredChartData = useMemo(() => {
    if (filteredData.length === 0) return null;

    return {
      x: filteredData.map((_, index) => index),
      series: [
        {
          values: filteredData.map((d) => d),
          label: "X Axis",
          color: "#8884d8",
        },
      ],
    };
  }, [filteredData]);

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

      {chartData && (
        <div>
          <LineChart
            data={{
              x: chartData.x,
              series: chartData.series,
            }}
            title="All Axes"
            height={500}
          />
          {filteredChartData && (
            <LineChart
              data={{
                x: filteredChartData.x,
                series: filteredChartData.series,
              }}
              title="Filtered Data"
              height={500}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
