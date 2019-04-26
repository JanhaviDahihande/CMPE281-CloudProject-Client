// flow

import React, { PureComponent } from 'react';
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
        <div className="row">
          <div className="col-xs-6">
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
                  <tbody>
                    <tr>
                      <th>1</th>
                      <th>1</th>
                      <th>1</th>
                      <th>Temperature</th>
                      <th>Active</th>
                      <th>2019-04-25</th>
                    </tr>
                  </tbody>
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
        </div>
      </AnimatedView>
    );
  }
}

export default HomeIOT;
