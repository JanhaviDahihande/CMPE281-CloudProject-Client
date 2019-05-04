// flow

import React, { PureComponent, Button } from 'react';
import PropTypes from 'prop-types';
import {
  AnimatedView,
  StatsCard,
  EarningGraph,
  Notifications,
  WorkProgress,
  TwitterFeed,
  TodoListDemo,
  TeamMatesDemo,
} from '../../components';
import BarChart from '../../models/BarChart';

class HomeIOT extends PureComponent {
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

  state = { data: [] };

  componentDidMount() {
    const {
      actions: {
        enterHome,
        fetchEarningGraphDataIfNeeded,
        fetchTeamMatesDataIfNeeded,
      },
    } = this.props;

    enterHome();
    fetchEarningGraphDataIfNeeded();
    fetchTeamMatesDataIfNeeded();
  }

  async componentWillMount() {
    try {
      var url =
        process.env.REACT_APP_SERVER_URL + '/api/manageinfrastruture/sensorstatus/view';
      await fetch(url)
        .then(res => res.json())
        .then(json => {
          console.log(json.message);
          var data = json.message; //gets data in string
          // console.log(typeof data);
          data = JSON.parse(data);
          console.log(data);
          this.setState({ data: data });
        });
    } catch (error) {
      console.log(error);
    }
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

    let rows = this.state.data.map(request => {
      return <RequestRow key={request.cluster_id} data={request} />;
    });

    return (
      <AnimatedView>
        <div className="row" style={{ marginBottom: '5px' }}>
          <div className="col-md-3">
            <StatsCard
              statValue={'6'}
              statLabel={'Total Clusters  '}
              icon={<i className="fa fa-wifi" />}
              backColor={'red'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={'23'}
              statLabel={'Total Nodes'}
              icon={<i className="fa fa-map-marker" />}
              backColor={'violet'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={'88'}
              statLabel={'Total Sensors'}
              icon={<i className="fa fa-dot-circle-o" />}
              backColor={'blue'}
            />
          </div>
          <div className="col-md-3">
            <StatsCard
              statValue={'23'}
              statLabel={'Registered Farmers'}
              icon={<i className="fa fa-users" />}
              backColor={'green'}
            />
          </div>
        </div>
        <div>
          <div className="col-xs-12">
            <div className="panel">
              <header className="panel-heading">Infrastructure Status</header>
              <div className="panel-body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Cluster ID</th>
                      <th>Node ID</th>
                      <th>Sensor ID</th>
                      <th>Sensor Type</th>
                      <th>Status</th>
                      <th>Last Online</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-xs-6">
            <EarningGraph
              labels={earningGraphLabels}
              datasets={earningGraphDatasets}
            />
          </div>
          <div className="col-md-6">
            <BarChart />
          </div>
        </div>
      </AnimatedView>
    );
  }
}

const RequestRow = props => {
  return (
    <tr>
      <td>{props.data.clusterId}</td>
      <td>{props.data.nodeId}</td>
      <td>{props.data.sensorId}</td>
      <td>{props.data.sensorType}</td>
      <td>{props.data.status ? 'Active' : 'Inactive'}</td>
      <td>{props.data.last_online}</td>
      <td>
        <form name="f2">
          <input
            id="edit"
            type="submit"
            name="edit"
            value="Delete"
            className="form-group"
          />
          <input
            id="edit"
            type="submit"
            name="edit"
            value="Modify"
            className="form-group"
          />
        </form>
      </td>
    </tr>
  );
};

export default HomeIOT;
