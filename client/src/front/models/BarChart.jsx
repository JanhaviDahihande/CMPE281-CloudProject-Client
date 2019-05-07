import React from 'react';
// import ReactDOM from "react-dom";
import Chart from 'react-google-charts';

export default class BarChart extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          width={'580px'}
          height={'325px'}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={[
            ['Sensor', 'Percentage', { role: 'style' }],
            ['Temperature', 90, '#b87333'],
            ['Humidity', 95, 'color: rgb(51, 102, 204)'],
            ['Airflow', 97, 'gold'],
            ['pH', 92, '#e5e4e3'],
          ]}
          options={{
            // Material design options
            chart: {
              // title: 'Cloud Connectivity',
              subtitle: 'Sensor availability percentage',
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
