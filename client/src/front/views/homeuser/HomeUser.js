// flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AnimatedView,
  StatsCard,
  EarningGraph,
  Panel,
  Notifications,
  WorkProgress,
  TwitterFeed,
  TodoListDemo,
  TeamMatesDemo,
} from '../../components';
import BarChart from '../../models/BarChart';
import PieChart from '../../models/PieChart';
import MapChart from '../../models/MapChart';
import Chart from 'react-google-charts';

class HomeUser extends PureComponent {
  constructor() {
    super();
    this.state = {
      no_of_nodes: 0,
      no_of_clusters: 0,
      no_of_sensors: 0,
    };
  }

  static propTypes = {
    earningGraphLabels: PropTypes.array,
    earningGraphDatasets: PropTypes.array,
    teamMatesIsFetching: PropTypes.bool,
    teamMates: PropTypes.arrayOf(
      PropTypes.shape({
        picture: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        profile: PropTypes.string,
        profileColor: PropTypes.oneOf(['danger', 'warning', 'info', 'success']),
      }),
    ),
    actions: PropTypes.shape({
      enterHome: PropTypes.func,
      leaveHome: PropTypes.func,
      fetchEarningGraphDataIfNeeded: PropTypes.func,
      fetchTeamMatesDataIfNeeded: PropTypes.func,
    }),
  };

  async componentDidMount() {
    const {
      actions: {
        enterHome,
        fetchEarningGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded,
      },
    } = this.props;
    let user_id = JSON.parse(localStorage.getItem('user_id'));
    try {
      var url =
        process.env.REACT_APP_SERVER_URL +
        '/api/infrastructure/getdetails/user/totalnodes/' +
        user_id;
      console.log(url);
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log('Here');
          console.log(json.message);
          var data = json.message; //gets data in string
          data = JSON.parse(data);
          this.setState({ no_of_nodes: data, no_of_sensors: data * 4 });
        });
    } catch (error) {
      console.log('Error');
    }

    try {
      url =
        process.env.REACT_APP_SERVER_URL +
        '/api/infrastructure/getdetails/user/totalclusters/' +
        user_id;
      console.log(url);
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log('Here');
          console.log(json.message);
          var data = json.message; //gets data in string
          data = JSON.parse(data);
          this.setState({ no_of_clusters: data });
        });
    } catch (error) {
      console.log('Error');
    }
    enterHome();
    fetchEarningGraphDataIfNeeded();
    fetchTeamMatesDataIfNeeded();
  }

  componentWillUnmount() {
    const {
      actions: { leaveHome },
    } = this.props;
    leaveHome();
  }

  render() {
    const {
      teamMates,
      teamMatesIsFetching,
      earningGraphLabels,
      earningGraphDatasets,
    } = this.props;

    return (
      <AnimatedView>
        <div className="row" style={{ marginBottom: '5px' }}>
          <div className="col-md-3">
            <StatsCard
              statValue={this.state.no_of_clusters}
              statLabel={'Total Clusters  '}
              icon={<i className="fa fa-wifi" />}
              backColor={'red'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={this.state.no_of_nodes}
              statLabel={'Total Nodes'}
              icon={<i className="fa fa-map-marker" />}
              backColor={'violet'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={this.state.no_of_sensors}
              statLabel={'Total Sensors'}
              icon={<i className="fa fa-dot-circle-o" />}
              backColor={'blue'}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6">
            <EarningGraph
              labels={earningGraphLabels}
              datasets={earningGraphDatasets}
            />
          </div>
          <div className="col-xs-6">
            <Panel
              title="Sensor Availability"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}
            >
              <BarChart />
            </Panel>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            <Panel
              title="My Infrastructure"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}
            >
              {/* <PieChart /> */}
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Cluster Id</th>
                    <th>Cluster Name</th>
                    <th>Active Nodes</th>
                    <th>Active Sensors</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>3</td>
                    <td>Cluster3</td>
                    <td>1</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>101</td>
                    <td>Cluster7</td>
                    <td>3</td>
                    <td>12</td>
                  </tr>
                  <tr>
                    <td>102</td>
                    <td>Cluster8</td>
                    <td>2</td>
                    <td>8</td>
                  </tr>
                </tbody>
              </table>
            </Panel>
          </div>
          <div className="col-xs-6">
            <Panel
              title="Cluster Distribution Area"
              hasTitle={true}
              bodyBackGndColor={'#F4F5F6'}
            >
              {/* <MapChart /> */}
              <Chart
                width={'600px'}
                height={'325px'}
                chartType="GeoChart"
                data={[
                  ['State', 'No. of Clusters'],
                  ['Alabama', 0],
                  ['Alaska', 0],
                  ['Arizona', 0],
                  ['Arkansas', 0],
                  ['California', 4],
                  ['Colorado', 0],
                  ['Connecticut', 0],
                  ['Delaware', 0],
                  ['District of Columbia', 0],
                  ['Florida', 0],
                  ['Georgia', 0],
                  ['Hawaii', 0],
                  ['Idaho', 0],
                  ['Illinois', 0],
                  ['Indiana', 0],
                  ['Iowa', 0],
                  ['Kansas', 0],
                  ['Kentucky', 0],
                  ['Louisiana', 0],
                  ['Maine', 0],
                  ['Maryland', 0],
                  ['Massachusetts', 0],
                  ['Michigan', 0],
                  ['Minnesota', 0],
                  ['Mississippi', 0],
                  ['Missouri', 0],
                  ['Montana', 0],
                  ['Nebraska', 0],
                  ['Nevada', 0],
                  ['New Hampshire', 0],
                  ['New Jersey', 0],
                  ['New Mexico', 0],
                  ['New York', 0],
                  ['North Carolina', 0],
                  ['North Dakota', 0],
                  ['Ohio', 0],
                  ['Oklahoma', 0],
                  ['Oregon', 0],
                  ['Pennsylvania', 0],
                  ['Rhode Island', 0],
                  ['South Carolina', 0],
                  ['South Dakota', 0],
                  ['Tennessee', 0],
                  ['Texas', 0],
                  ['Utah', 0],
                  ['Vermont', 0],
                  ['Virginia', 0],
                  ['Washington', 0],
                  ['West Virginia', 0],
                  ['Wisconsin', 0],
                  ['Wyoming', 0],
                ]}
                options={{
                  region: 'US', // Africa
                  displayMode: 'regions',
                  resolution: 'provinces',
                  colorAxis: { colors: ['#fcf3cf', '#B9FF33', '#2ecc71'] },
                  backgroundColor: '#81d4fa',
                  datalessRegionColor: '#f8bbd0',
                  defaultColor: '#f5f5f5',
                }}
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                mapsApiKey="AIzaSyDA4flhFYUHU9vGI07L2LVZpnbY7QFqSMs"
                rootProps={{ 'data-testid': '4' }}
              />
            </Panel>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

export default HomeUser;
