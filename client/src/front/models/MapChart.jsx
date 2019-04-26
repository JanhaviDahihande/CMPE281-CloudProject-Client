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
  chartType="GeoChart"
  data={[
    ['Country', 'Nodes'],
    ['Germany', 0],
    ['United States', 23],
    ['Brazil', 0],
    ['Canada', 0],
    ['France', 0],
    ['RU', 0],
  ]}
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  mapsApiKey="YOUR_KEY_HERE"
  rootProps={{ 'data-testid': '1' }}
/>
      </div>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
// export default ColumnChart;
