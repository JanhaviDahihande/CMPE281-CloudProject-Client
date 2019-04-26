import React from 'react';
// import ReactDOM from "react-dom";
import Chart from 'react-google-charts';

export default class BarChart extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          width={'580px'}
          height={'685px'}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={[
            ['Sensor', 'Percentage'],
            ['Temperature', 90],
            ['Humidity', 95],
            ['Airflow', 97],
            ['pH', 92],
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
