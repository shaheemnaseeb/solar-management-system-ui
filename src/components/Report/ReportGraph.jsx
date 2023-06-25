import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ReportGraph = ({ report }) => {
  const dataPoints = report?.map(data => ({
    x: new Date(data.date),
    y: data.powerPeak,
  }));

  const options = {
    title: {
      text: 'Power Peak Graph',
    },
    axisX: {
      valueFormatString: 'MMM DD, YYYY',
    },
    axisY: {
      title: 'Power Peak',
    },
    data: [
      {
        type: 'line',
        dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default ReportGraph;
