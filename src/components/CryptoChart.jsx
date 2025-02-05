import React from "react";
import Chart from "react-apexcharts";

const CryptoChart = ({ sparkline, priceChange }) => {
  // Define chart options
  const options = {
    chart: {
      type: "line",
      height: 150,
      toolbar: { show: false },
    },
    stroke: { curve: "smooth", width: 2 },
    grid: { show: false },
    xaxis: { labels: { show: false } },
    yaxis: { labels: { show: false } },
    tooltip: { enabled: false },
    colors: [priceChange > 0 ? "green" : "red"], // Green for positive, red for negative change
  };

  // Define chart series data
  const series = [
    {
      name: "Price",
      data: sparkline, // Spread sparkline data into the chart
    },
  ];

  return <Chart options={options} series={series} type="line" height={100} />;
};

export default CryptoChart;
