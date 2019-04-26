import React from "react";
// import ReactDOM from "react-dom";
import Chart from "react-google-charts";

export default class BarChart extends React.Component {

  render() {
    return (
      <div className="App">
       <Chart
  width={'500px'}
  height={'685px'}
  chartType="Bar"
  loader={<div>Loading Chart</div>}
  data={[
    ['Sensor', 'Count'],
    ['Temperature', 20],
    ['Humidity', 24],
    ['Airflow', 16],
    ['pH', 28],
  ]}
  options={{
    // Material design options
    chart: {
      title: 'Cloud Connectivity',
      subtitle: 'Sensors availability per cluster',
    },
  }}
  // For tests
  rootProps={{ 'data-testid': '2' }}
/>
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
// export default ColumnChart;
