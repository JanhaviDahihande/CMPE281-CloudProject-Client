import React from "react";
// import ReactDOM from "react-dom";
import Chart from "react-google-charts";

export default class BarChart extends React.Component {

  render() {
    return (
      <div className="App">
       <Chart
  width={'270px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Status', 'Number'],
    ['Active', 76],
    ['Inactive', 12],
  ]}
  options={{
    legend: 'none',
    pieSliceText: 'label',
    title: 'Sensor Status',
    pieStartAngle: 100,
  }}
  rootProps={{ 'data-testid': '4' }}
/>
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
// export default ColumnChart;
